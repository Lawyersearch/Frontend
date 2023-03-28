import { ChangeEvent, useState } from "react";
import { Button, FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Loading from "../../ui/components/Loading";
import { useRestorePassword } from "../../hooks/redux/useAuth";
import { isValidPassword } from "../../utils/validation";
import { invalidPasswordText, notMatchingPasswordText } from "../../ui/strings";
import { useRouter } from "next/router";

const PasswordRestorePage = () => {
    const router = useRouter();
    const { verifyId } = router.query;
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [submited, setSubmited] = useState(false);
    const [restore, { isLoading, isSuccess, isError }] = useRestorePassword();

    const handleNewPassword = (ev: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(ev.target.value);
    };
    const handleConfirmPassword = (ev: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(ev.target.value);
    };
    const isEqual = () => newPassword === confirmPassword;

    const submitRestore = async () => {
        setSubmited(true);
        if (isEqual() && isValidPassword(newPassword)) {
            restore({ token: verifyId as string, password: newPassword });
        }
    };

    if (isLoading) {
        return <Loading title="Сброс пароля" />;
    }
    if (isSuccess) {
        return router.push("/");
    }
    if (isError && submited) {
        setSubmited(false);
    }

    return (
        <FormControl>
            <TextField
                variant="standard"
                label="New password"
                type="password"
                value={newPassword}
                onChange={handleNewPassword}
                error={submited && (!isEqual() || !isValidPassword(newPassword))}
                sx={{ m: 1 }}
            />
            <TextField
                variant="standard"
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                error={submited && (!isEqual() || !isValidPassword(confirmPassword))}
                helperText={
                    submited &&
                    ((!isEqual() && notMatchingPasswordText) || (!isValidPassword(newPassword) && invalidPasswordText))
                }
                sx={{ m: 1 }}
            />
            <Button onClick={submitRestore} variant="outlined" sx={{ m: 1 }}>
                Восстановить
            </Button>
        </FormControl>
    );
};

export default PasswordRestorePage;
