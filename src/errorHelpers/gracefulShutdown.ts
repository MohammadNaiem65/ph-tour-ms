import { Server } from 'http';
import mongoose from 'mongoose';

// Graceful shutdown
let isShuttingDown = false;

async function gracefulShutdown(server: Server, signal: string) {
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

export default gracefulShutdown;
