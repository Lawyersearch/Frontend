import _isEmpty from "lodash/isEmpty";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useCallback, useState } from "react";
import OrderTypesList from "../components/order/TypesList";
import OrderCard from "../components/order/card";
import { ClientOrder, OrderStatus, OrderType, PerformerOrder } from "../types/order";
import { queryPrivateOrders, queryPublicOrders, queryUserOrders } from "../utils/query";
import { isUserPerformer } from "../utils/user";
import { wrapper } from "../store";
import { useAppSelector } from "../hooks/redux/useTypedRedux";

interface OrdersPageProps {
    orders: { [key in OrderType]: ClientOrder[] | PerformerOrder[] }; // eslint-disable-line no-unused-vars
}

const OrdersPage = ({ orders }: OrdersPageProps) => {
    const isAuthorized = useAppSelector(state => Boolean(state.user.self));
    const [type, setType] = useState<OrderType>(
        _isEmpty(orders[OrderType.PRIVATE]) ? OrderType.PUBLIC : OrderType.PRIVATE,
    );
    const [status, setStatus] = useState<OrderStatus | null>(null);

    const getFilteredOrders = useCallback(() => {
        return type === OrderType.PRIVATE && status !== null
            ? (orders[type] as PerformerOrder[]).filter(({ orderStatus }) => orderStatus === status)
            : orders[type];
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
    const [privateOrders = [], publicOrders = []] = await Promise.all([
        isUserPerformer(self?.role) ? queryPrivateOrders(token) : queryUserOrders(token),
        queryPublicOrders(token),
    ]);
    const orders = {
        [OrderType.PRIVATE]: privateOrders,
        [OrderType.PUBLIC]: publicOrders,
    };

    return {
        props: { orders },
    };
});

export default OrdersPage;
