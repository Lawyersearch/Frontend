import _isEmpty from "lodash/isEmpty";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useCallback, useState } from "react";
import OrderTypesList from "../components/order/TypesList";
import OrderCard from "../components/order/card";
import { Order, OrderStatus, OrderType } from "../types/order";
import { queryPrivateOrders, queryPublicOrders, queryUserOrders } from "../utils/query";
import { isUserPerformer } from "../utils/user";
import { wrapper } from "../store";
import { useAppSelector } from "../hooks/redux/useTypedRedux";

interface OrdersPageProps {
    orders: [myOrders: Order[], allOrders: Order[]];
}

const OrdersPage = ({ orders }: OrdersPageProps) => {
    const isAuthorized = useAppSelector(state => Boolean(state.user.self));
    const [type, setType] = useState<OrderType>(orders.findIndex(order => !_isEmpty(order)));
    const [status, setStatus] = useState<OrderStatus | null>(orders.findIndex(order => !_isEmpty(order)));

    const getFilteredOrders = useCallback(() => {
        return type === OrderType.PRIVATE && status !== null
            ? orders[type].filter(({ orderStatus }) => orderStatus === status) ?? []
            : orders[type] ?? [];
    }, [type, status]);

    return (
        <Container>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {isAuthorized && (
                    <Grid item xs={12} md={3}>
                        <OrderTypesList onTypeClick={setType} onStatusClick={setStatus} orders={orders} />
                    </Grid>
                )}
                <Grid item xs={12} md={9 + Number(!isAuthorized) * 3}>
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
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async context => {
    const { token } = context.req.cookies;
    const { self } = store.getState().user;
    const orders = await Promise.all([
        isUserPerformer(self?.role) ? queryPrivateOrders(token) : queryUserOrders(token),
        queryPublicOrders(token),
    ]).then(orderLists => orderLists.map(orderList => orderList ?? []));

    return {
        props: { orders },
    };
});

export default OrdersPage;
