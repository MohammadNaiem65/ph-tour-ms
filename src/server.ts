import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import envConfig from './config/env';
import gracefulShutdown from './errorHelpers/gracefulShutdown';

let server: Server;

async function bootstrap() {
    await mongoose.connect(envConfig.MONGODB_URI);

    server = app.listen(envConfig.PORT, () => {
        console.log(`Server running on http://localhost:${envConfig.PORT}`);
    });
}

bootstrap();

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown(server, 'SIGTERM'));
process.on('SIGINT', () => gracefulShutdown(server, 'SIGINT')); // Ctrl+C

// Handle critical errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit immediately for uncaught exceptions
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1); // Exit immediately for unhandled rejections
});
