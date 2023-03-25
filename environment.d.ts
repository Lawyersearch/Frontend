declare global {
    namespace NodeJS {
        interface ProcessEnv {
            STATIC_REVALIDATE: string;
            NODE_ENV: "development" | "production";
            PORT: string;
            BACK_SERVER_API: string;
            REDUX_DEBUG: string;
        }
    }
}

export {};
