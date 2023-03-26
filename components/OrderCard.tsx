import { Card, Stack, Box, Typography, Divider, Button } from "@mui/material";
import fnsFormat from "date-fns/format";
import _identity from "lodash/identity";
import useRespondOrder from "../hooks/order/useRespondOrder";
import { useAppSelector } from "../hooks/redux/useTypedRedux";
import { useChangeOrderStatusMutation } from "../services/order";
import { Order } from "../types/order";
import RespondOrderModal from "../ui/modal/RespondOrderModal";
import ProfileLink from "../ui/ProfileLink";
import { shouldShowCancell, shouldShowRespond } from "../utils/order";

interface OrderCardProps {
    order: Order;
    onOrderUpdate?: (order: Order) => void;
    onOrderDelete?: (order: Order) => void;
}

const OrderCard = ({ order }: OrderCardProps) => {
    const user = useAppSelector(store => store.user.self);

    const { showRespondModal, closeRespondModal, onOrderRespond, confirmOrderRespond } = useRespondOrder(order);
    const [changeStatus, { data: updatedStatusOrder, isSuccess: isChangeStatusSuccess }] =
        useChangeOrderStatusMutation();

    const showRespond = shouldShowRespond(user, order);
    const showCancell = shouldShowCancell(user, order);
    const showControls = [showRespond, showCancell].some(_identity);

    return (
        <Card sx={{ borderRadius: 4 }}>
            <Stack p={2} spacing={3}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="h3">{order.title}</Typography>
                    <Typography>{fnsFormat(new Date(order.createdDate), "dd.MM.yyyy")}</Typography>
                </Stack>
                <Box display="grid" gridTemplateColumns="auto 1fr" gap={2}>
                    <Typography fontWeight={550}>Автор</Typography>
                    <ProfileLink id={order.userId} userName={order.creatorName} src={order.avatar} />
                    {order.description && (
                        <>
                            <Typography fontWeight={550}>Описание</Typography>
                            <Typography>{order.description}</Typography>
                        </>
                    )}
                    {order.price && (
                        <>
                            <Typography fontWeight={550}>Цена</Typography>
                            <Typography fontWeight={600}>{order.price} ₽</Typography>
                        </>
                    )}
                </Box>
            </Stack>
            {showControls && (
                <>
                    <Divider />
                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        alignItems="center"
                        justifyContent="end"
                        bgcolor="background.default"
                        px={3}
                        py={1}
                    >
                        {showRespond && (
                            <Button variant="contained" onClick={onOrderRespond}>
                                Оставить отклик
                            </Button>
                        )}
                        {showCancell && <Button variant="contained">Отменить заказ</Button>}
                    </Stack>
                </>
            )}
            <RespondOrderModal
                startingPrice={order.price}
                open={showRespondModal}
                onClose={closeRespondModal}
                respond={confirmOrderRespond}
            />
        </Card>
    );
};

export default OrderCard;
