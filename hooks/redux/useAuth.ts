import { useSnackbar } from "notistack";
import Cookie from "js-cookie";
import {
    useLoginFromCredsMutation,
    useLoginFromVerificationMutation,
    useRegisterMutation,
    useRestoreMutation,
    useForgetPasswordMutation,
} from "../../services/auth";
import { UserCredentials } from "../../types/userCredentials";
import { RTKResponse } from "../../types/RTKResponse";
import { RTKStatus } from "../../types/RTKStatus";
import { mailVerifiedText, mailVerifySentText, passwordChangedText } from "../../ui/strings";
import { fetchSelf } from "../../store/actions";
import { AppDispatch } from "../../store";
import { useAppDispatch } from "./useTypedRedux";

const loginFromResponse = (dispatch: AppDispatch, { data: response }: RTKResponse<string>) => {
    if (response !== undefined) {
        const token = response.data;

        Cookie.set("token", token, {
            expires: 30,
            secure: true,
            sameSite: "strict",
        });

        dispatch(fetchSelf(token));
    }
};

export const useLoginFromCreds = (): [(credentials: UserCredentials) => void, RTKStatus] => {
    const dispatch = useAppDispatch();
    const [sendReq, result] = useLoginFromCredsMutation();
    const login = async (credentials: UserCredentials) => {
        const response = (await sendReq(credentials)) as RTKResponse<string>;
        loginFromResponse(dispatch, response);
    };
    return [login, result as RTKStatus];
};

export const useLoginFromVerification = (): [(token: string) => void, RTKStatus] => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [sendReq, result] = useLoginFromVerificationMutation();
    const login = async (token: string) => {
        const response = (await sendReq(token)) as RTKResponse<string>;
        if (response.error === undefined) {
            enqueueSnackbar(mailVerifiedText, { variant: "success" });
            loginFromResponse(dispatch, response);
        }
    };
    return [login, result as RTKStatus];
};

export const useRegistration = (): [(credentials: UserCredentials) => void, RTKStatus] => {
    const [sendReq, result] = useRegisterMutation();
    return [sendReq, result as RTKStatus];
};

export const useRestorePassword = (): [(restoreCredentials: UserCredentials) => void, RTKStatus] => {
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [sendReq, result] = useRestoreMutation();
    const restore = async (restoreCredentials: UserCredentials) => {
        const response = (await sendReq(restoreCredentials)) as RTKResponse<string>;
        if (response.error === undefined) {
            enqueueSnackbar(passwordChangedText, { variant: "success" });
            loginFromResponse(dispatch, response);
        }
    };
    return [restore, result as RTKStatus];
};

export const useForgetPassword = (): [(restoreMail: UserCredentials) => void, RTKStatus] => {
    const { enqueueSnackbar } = useSnackbar();
    const [sendReq, result] = useForgetPasswordMutation();
    const forget = async (restoreMail: UserCredentials) => {
        const response = (await sendReq(restoreMail)) as RTKResponse<null>;
        if (response.error === undefined) {
            enqueueSnackbar(mailVerifySentText(restoreMail.email), {
                variant: "success",
                autoHideDuration: 3000,
            });
        }
    };
    return [forget, result as RTKStatus];
};
