import React, { useState } from "react";
import { Button, FormControl, Stack, SxProps, Typography } from "@mui/material";
import ValidInput from "../ValidInput";
import { isValidEmail } from "../../utils/validation";
import { invalidMailText } from "../strings";
import { useForgetPassword } from "../../hooks/redux/useAuth";
import Loading from "../Loading";
import { useRouter } from "next/router";
import GenericModal from "./GenericModal";

interface ForgetPasswordProps {
    show: boolean;
    onClose: () => void;
}

const ForgetPasswordModal = ({ show, onClose, ...rest }: ForgetPasswordProps & SxProps) => {
    const [email, setEmail] = useState("");
    const [submited, setSubmited] = useState(false);
    const [forget, { isLoading, isError, isSuccess }] = useForgetPassword();
    const router = useRouter();

    const submit = () => {
        setSubmited(true);
        if (isValidEmail(email)) {
            forget({ email });
        }
    };

    if (isLoading) {
        return <Loading title="Восстановление пароля" />;
    }
    if (isSuccess) {
        router.push("/");
    }
    if (isError && submited) {
        setSubmited(false);
    }

    return (
        <GenericModal sx={rest} open={show} onClose={onClose}>
            <>
                <Typography variant="h5" component="h2" gutterBottom>
                    Восстановление пароля
                </Typography>
                <FormControl fullWidth>
                    <Stack spacing={2}>
                        <ValidInput
                            label="Email"
                            value={email}
                            bindChange={setEmail}
                            valid={isValidEmail}
                            invalidText={invalidMailText}
                            showError={submited}
                        />
                        <Button variant="outlined" onClick={submit}>
                            Восстановить пароль
                        </Button>
                    </Stack>
                </FormControl>
            </>
        </GenericModal>
    );
};

export default ForgetPasswordModal;
