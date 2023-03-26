import { useCallback } from "react";
import { useRespondOrderMutation } from "../../services/offer";
import { pushSnack } from "../../store/reducers/uiSlice";
import { Order } from "../../types/order";
import { useAppDispatch } from "../redux/useTypedRedux";
import useBoolean from "../useBoolean";

const useRespondOrder = (order: Order) => {
    const dispatch = useAppDispatch();
    const [respondOrder, { data: newOffer, isSuccess: isRespondSuccess }] = useRespondOrderMutation();
    const [showRespondModal, openRespondModal, closeRespondModal] = useBoolean(false);

    const onOrderRespond = useCallback(() => {
        openRespondModal();
    }, [openRespondModal]);

    const confirmOrderRespond = useCallback(
        ({ message, price }: { message: string; price: number }) => {
            respondOrder({ orderId: order.id, message, price });
            closeRespondModal();
            dispatch(pushSnack({ variant: "success", message: "Отклик успешно отправлен" }));
        },
        [respondOrder],
    );

    return { showRespondModal, closeRespondModal, onOrderRespond, confirmOrderRespond };
};

export default useRespondOrder;
