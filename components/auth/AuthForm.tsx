import React, { useEffect, useState } from "react";
import { Button, FormControl, Stack, CircularProgress } from "@mui/material";
import ValidInput from "../../ui/components/ValidInput";
import { isValidEmail, isValidPassword } from "../../utils/validation";
import { invalidMailText, invalidPasswordText } from "../../ui/strings";
import { useLoginFromCreds, useRegistration } from "../../hooks/redux/useAuth";
import useBoolean from "../../hooks/utils/useBoolean";
import ForgetPasswordModal from "../../ui/modal/auth/ForgetPassword";
import { useRouter } from "next/router";
import useEnterPress from "../../hooks/utils/useEnterPress";

const AuthForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submited, setSubmited] = useState(false);
    const [showModal, setShow, setHide] = useBoolean(false);
    const [login, { isLoading: isLoginLoading, isSuccess: isLoginSuccess, isError: isLoginError }] =
        useLoginFromCreds();
    const [register, { isLoading: isRegLoading, isSuccess: isRegSuccess, isError: isRegError }] = useRegistration();

    useEnterPress(() => submit(false));

    useEffect(() => {
        if (isLoginError || isRegError) {
            setSubmited(false);
        }
    }, [isLoginError, isRegError]);

    useEffect(() => {
        if (isRegSuccess) {
            router.push("/registerDone");
        }
    }, [isRegSuccess]);

    const submit = (isRegister: boolean) => {
        setSubmited(true);
        setPassword("");
        if (isValidEmail(email) && isValidPassword(password)) {
            if (isRegister) {
                register({ email, password });
            } else {
                login({ email, password });
            }
        }
    };

    if (isRegLoading || isLoginLoading || isLoginSuccess) {
        return <CircularProgress />;
    }

    return (
        <>
            <ForgetPasswordModal show={showModal} onClose={setHide} />
            <FormControl>
                <Stack spacing={2}>
                    <ValidInput
                        label="Email"
                        value={email}
                        bindChange={setEmail}
                        valid={isValidEmail}
                        invalidText={invalidMailText}
                        showError={submited}
                    />
                    <ValidInput
                        label="Пароль"
                        type="password"
                        value={password}
                        bindChange={setPassword}
                        valid={isValidPassword}
                        invalidText={invalidPasswordText}
                        showError={submited}
                    />
                    <Stack spacing={2} direction="row" justifyContent="space-between">
                        <Button variant="outlined" onClick={() => submit(false)}>
                            Вход
                        </Button>
                        <Button variant="outlined" onClick={() => submit(true)}>
                            Регистрация
                        </Button>
                    </Stack>
                </Stack>
                <Button sx={{ mt: 1 }} size="small" variant="text" onClick={setShow}>
                    Забыли пароль?
                </Button>
            </FormControl>
        </>
    );
};

export default AuthForm;
