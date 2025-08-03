import 'dotenv/config';

interface EnvConfigs {
    PORT: string;
    MONGODB_URI: string;
    NODE_ENV: string;
}

function loadEnv(): EnvConfigs {
    const requiredVariables: string[] = [
        'PORT',
        'DB_CONNECTION_URI',
        'NODE_ENV',
    ];

    requiredVariables.forEach((variable) => {
        if (!process.env[variable]) {
            throw new Error(
                `Required environment variable missing: ${variable}`
            );
        }
    });

    return {
        PORT: process.env.PORT as string,
        MONGODB_URI: process.env.DB_CONNECTION_URI as string,
        NODE_ENV: process.env.NODE_ENV as string,
    };
}

const envConfigs: EnvConfigs = loadEnv();

export default envConfigs;
