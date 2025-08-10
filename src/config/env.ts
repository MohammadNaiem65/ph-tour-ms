import 'dotenv/config';

const envConfig: { [key: string]: string } = {};

function loadEnv() {
    // ! Required Envs
    const requiredEnvs = ['PORT', 'MONGODB_URI'];

    requiredEnvs.forEach((env) => {
        const value = process.env[env];
        if (!value) {
            throw new Error(`Missing env variable: ${env}`);
        }

        envConfig[env] = value;
    });

    // Rest Envs
}

loadEnv();

export default envConfig;
