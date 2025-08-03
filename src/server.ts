import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
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

const closeServer = (error?: Error | unknown) => {
    console.log('🚀 ~ Uncaught Error:', error);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

// Local code error
process.on('uncaughtException', (error) => {
    closeServer(error);
});

// Promise error & rejections
process.on('unhandledRejection', (error) => {
    closeServer(error);
});

// Signal Termination
process.on('SIGTERM', () => {
    closeServer();
});

bootstrap();
