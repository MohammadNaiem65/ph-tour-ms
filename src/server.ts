import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import gracefulShutdown from './app/errorHelpers/gracefulShutdown';
import envConfigs from './config/env';

let server: Server;

async function bootstrap() {
    const dbUri = envConfigs.MONGODB_URI;

    try {
        if (!dbUri) {
            throw new Error(
                'DB_CONNECTION_URI is not defined in environment variables.'
            );
        }

        await mongoose.connect(dbUri);

        console.log('🚀 ~ server.ts ~ DB connected');

        server = app.listen(process.env.PORT, () => {
            console.log(
                `🚀 ~ server.ts ~ Server running on: http://localhost:${process.env.PORT}/`
            );
        });
    } catch (error) {
        console.log('🚀 ~ server.ts ~ error:', error);
    }
}

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM', server));
process.on('SIGINT', () => gracefulShutdown('SIGINT', server)); // Ctrl+C

// Handle critical errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit immediately for uncaught exceptions
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1); // Exit immediately for unhandled rejections
});

bootstrap();
