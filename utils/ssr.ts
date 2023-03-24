export const runInBrowser = <T = void>(cb: () => T) => {
    if (typeof window !== "undefined") {
        return cb();
    }
};

export const runInServer = <T = void>(cb: () => T) => {
    if (typeof window === "undefined") {
        return cb();
    }
};
