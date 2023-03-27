const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const commonConfig = {
    env: {
        PORT: "3000",
        BACK_SERVER_API: "https://api.lawyersearch.ru/api",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lawyersearch.ru",
                port: "",
                pathname: "/static/**",
            },
        ],
    },
};

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        /** @type {import('next').NextConfig} */
        return {
            ...commonConfig,
            reactStrictMode: true,
            env: {
                ...commonConfig.env,
                STATIC_REVALIDATE: 1,
            },
        };
    }
    /** @type {import('next').NextConfig} */
    return {
        // Production
        ...commonConfig,
        reactStrictMode: false,
        compress: true,
        env: {
            ...commonConfig.env,
            STATIC_REVALIDATE: 30,
        },
    };
};
