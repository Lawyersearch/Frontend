import { useEffect } from "react";
import Loading from "../../ui/Loading";
import { useLoginFromVerification } from "../../hooks/redux/useAuth";
import { useRouter } from "next/router";

const MailVerifyPage = () => {
    const router = useRouter();
    const { verifyId } = router.query;
    const [login, { isLoading, isError, isSuccess }] = useLoginFromVerification();

    useEffect(() => {
        login(verifyId as string);
    }, []);

    if (isLoading) {
        return <Loading title="Верификация" />;
    }
    if (isSuccess || isError) {
        router.push("/");
    }
    return <></>;
};

export default MailVerifyPage;
