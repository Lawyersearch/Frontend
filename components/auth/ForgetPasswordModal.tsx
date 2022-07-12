import React, { useState } from "react";
import {
  Button,
  FormControl,
  Modal,
  Stack,
  SxProps,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import ValidInput from "../../ui/ValidInput";
import { isValidEmail } from "../../utils/validation";
import { invalidMailText } from "../../ui/strings";
import { useForgetPassword } from "../../hooks/redux/useAuth";
import Loading from "../../ui/Loading";
import { useRouter } from "next/router";

interface ForgetPasswordProps {
  show: boolean;
  onClose: () => void;
}

const style: SxProps = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const ForgetPasswordModal = ({
  show,
  onClose,
  ...rest
}: ForgetPasswordProps & SxProps) => {
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
    <Modal sx={rest} open={show} onClose={onClose}>
      <Card sx={style}>
        <CardContent>
          <Typography variant="h5" component="h2" mb={2}>
            Восстановление пароля
          </Typography>
          <FormControl sx={{ width: "100%" }}>
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
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ForgetPasswordModal;
