import { useCallback, useEffect, useState } from "react";
import Cookie from "js-cookie";
import { isEmpty } from "lodash";
import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import OrderTypesList from "../components/order/TypesList";
import OrderCard from "../components/order/card";
import { ClientOrder, OrderStatus, OrderType, PerformerOrder } from "../types/order";
import { queryOrders, queryPrivateOrders } from "../utils/query";
import { isUserClient } from "../utils/user";
import { wrapper } from "../store";
import { useAppSelector } from "../hooks/redux/useTypedRedux";
import CreateOrderModal from "../ui/modal/order/Create";
import useCreateOrder from "../hooks/order/useCreateOrder";

interface OrdersPageProps {
    orders: { [key in OrderType]: ClientOrder[] | PerformerOrder[] }; // eslint-disable-line no-unused-vars
}

const OrdersPage = ({ orders: ordersProp }: OrdersPageProps) => {
    const [orders, setOrders] = useState(ordersProp);
    const user = useAppSelector(state => state.user.self);
    const [type, setType] = useState<OrderType>(
        isEmpty(orders[OrderType.PRIVATE]) ? OrderType.PUBLIC : OrderType.PRIVATE,
    );
    const [status, setStatus] = useState<OrderStatus | null>(null);

    useEffect(() => {
        setType(OrderType.PUBLIC);
        queryPrivateOrders(user?.role, Cookie.get("token")).then(privateOrders => {
            setOrders(orders => ({ ...orders, [OrderType.PRIVATE]: privateOrders }));
        });
    }, [user, setType, setOrders]);

    const getFilteredOrders = useCallback(() => {
        return type === OrderType.PRIVATE && status !== null
            ? (orders[type] as PerformerOrder[]).filter(({ orderStatus }) => orderStatus === status)
            : (orders[type] as PerformerOrder[]).filter(({ orderStatus }) => orderStatus !== OrderStatus.CLOSED);
    }, [type, status]);

    const shouldShowAddOrderButton = isUserClient(user?.role);

    const addNewOrder = useCallback(
        (order: ClientOrder) => {
            setOrders(orders => {
                const privateOrders = orders[OrderType.PRIVATE] as ClientOrder[];
                const publicOrders = orders[OrderType.PUBLIC] as ClientOrder[];

                privateOrders.unshift(order);
                publicOrders.unshift(order);

                return {
                    [OrderType.PRIVATE]: privateOrders,
                    [OrderType.PUBLIC]: publicOrders,
                };
            });
        },
        [setOrders],
    );

    const [showCreateModal, openCreateModal, closeCreateModal, create] = useCreateOrder(addNewOrder);

    return (
        <Container>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {Boolean(user) && (
                    <Grid item xs={12} md={3}>
                        <OrderTypesList onTypeClick={setType} onStatusClick={setStatus} orders={orders} />
                    </Grid>
                )}
                <Grid item xs={12} md={9 + Number(!user) * 3}>
                    {shouldShowAddOrderButton && (
                        <Button onClick={openCreateModal} fullWidth={true} variant="contained" sx={{ my: 2 }}>
                            Новый заказ
                        </Button>
                    )}
                    {orders[type]?.length ? (
                        <Stack spacing={3}>
                            {getFilteredOrders().map(order => (
                                <OrderCard key={order.id} order={order} orderType={type} />
                            ))}
                        </Stack>
                    ) : (
                        <Typography mt={10} textAlign="center" variant="h3">
                            Здесь ничего нет
                        </Typography>
                    )}
                </Grid>
            </Grid>
            <CreateOrderModal open={showCreateModal} onClose={closeCreateModal} create={create} />
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async context => {
    const { token } = context.req.cookies;
    const { self } = store.getState().user;
    const orders = await queryOrders(self?.role, token);

    return {
        props: { orders },
    };
});

export default OrdersPage;
