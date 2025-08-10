import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import envConfig from './config/env';

let server: Server;

async function bootstrap() {
    await mongoose.connect(envConfig.MONGODB_URI);

    server = app.listen(envConfig.PORT, () => {
        console.log(`Server running on http://localhost:${envConfig.PORT}`);
    });
}

bootstrap();

// Graceful shutdown
let isShuttingDown = false;

async function gracefulShutdown(signal: string) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`${signal}: Starting graceful shutdown...`);

    // Force exit after timeout
    const forceExitTimer = setTimeout(() => {
        console.error('Forcing exit - shutdown timeout');
        process.exit(1);
    }, 10000);

    try {
        // 1. Stop accepting new connections
        await new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) reject(err);
                else {
                    console.log('HTTP server closed');
                    resolve(undefined);
                }
            });
        });

        // 2. Close MongoDB connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed');

        clearTimeout(forceExitTimer);
        console.log('Graceful shutdown completed');
        process.exit(0);
    } catch (error) {
        console.error('Shutdown error:', error);
        clearTimeout(forceExitTimer);
        process.exit(1);
    }
}

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT')); // Ctrl+C

// Handle critical errors
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1); // Exit immediately for uncaught exceptions
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    process.exit(1); // Exit immediately for unhandled rejections
});
