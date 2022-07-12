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
    BACK_SERVER: "https://api.kuznetsovlabs.me",
    PORT: "3000",
  },
};

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    /** @type {import('next').NextConfig} */
    return {
      ...commonConfig,
      env: {
        ...commonConfig.env,
        STATIC_REVALIDATE: 60,
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
      STATIC_REVALIDATE: 3600,
    },
  };
};
