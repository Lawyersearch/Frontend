import { useRouter } from "next/router";
import { useEffect } from "react";

const useDropdownAuth = (callback: () => void) => {
    const router = useRouter();

    useEffect(() => {
        if ((router.query.auth as string)?.startsWith("require")) {
            callback();
        }
    }, [router.query.auth]);
};

export default useDropdownAuth;
