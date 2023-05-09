import { useCallback, useEffect } from "react";
import { useAcceptOrderMutation } from "../../services/order";
import { Order } from "../../types/order";
import { useSnackbar } from "notistack";

const useAcceptOrder = ({ id: orderId }: Order, onResponse: (order: Order) => void) => {
    const [trigger, { data: responseData, isSuccess }] = useAcceptOrderMutation();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (isSuccess) {
            enqueueSnackbar("Статус успешно изменен", { variant: "success" });
            onResponse && onResponse(responseData!);
        }
    }, [isSuccess]);

    const accept = useCallback(() => {
        trigger(orderId);
    }, [trigger, orderId]);

    return accept;
};

export default useAcceptOrder;
