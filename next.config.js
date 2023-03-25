const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

/** @type {import('next').NextConfig} */
const commonConfig = {
    reactStrictMode: true,
    /* redirects: async () => [
    {
      source: '/',
      destination: '/search',
      permanent: true
    }
  ], */
    env: {
        PORT: "3000",
        BACK_SERVER_API: "https://api.lawyersearch.ru/api",
    },
};

module.exports = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        /** @type {import('next').NextConfig} */
        return {
            ...commonConfig,
            env: {
                ...commonConfig.env,
                STATIC_REVALIDATE: 1,
                REDUX_DEBUG: 1,
            },
        };
    }
    /** @type {import('next').NextConfig} */
    return {
        // Production
        ...commonConfig,
        compress: true,
        env: {
            ...commonConfig.env,
            STATIC_REVALIDATE: 30,
            REDUX_DEBUG: 0,
        },
    };
};
