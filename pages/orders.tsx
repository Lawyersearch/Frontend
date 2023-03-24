import _isEmpty from "lodash/isEmpty";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useState } from "react";
import OrderTypes from "../components/order/types";
import OrderCard from "../components/OrderCard";
import { Order, OrderType } from "../types/order";
import { queryPrivateOrders, queryPublicOrders, querySelf, queryUserOrders } from "../utils/query";
import { isUserPerformer } from "../utils/user";

interface OrdersPageProps {
    orders: { [key in keyof typeof OrderType]: Order[] };
    isAuthorized: boolean;
}

const OrdersPage = ({ orders, isAuthorized }: OrdersPageProps) => {
    const [type, setType] = useState<number>(
        _isEmpty(orders[OrderType.PRIVATE]) ? OrderType.PUBLIC : OrderType.PRIVATE,
    );

    return (
        <Container>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {isAuthorized && (
                    <Grid item xs={12} md={3}>
                        <OrderTypes onTypeClick={setType} orders={orders} />
                    </Grid>
                )}
                <Grid item xs={12} md={9 + Number(!isAuthorized) * 3}>
                    {orders[type].length ? (
                        <Stack spacing={3}>
                            {orders[type].map(order => (
                                <OrderCard key={order.id} {...order} />
                            ))}
                        </Stack> 
                    ) : (
                        <Typography mt={10} textAlign="center" variant="h3"
                        >
                            Здесь ничего нет
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const token = context.req.cookies["token"];
    const self = await querySelf(token);

    const [privateOrders = [], publicOrders = []] = await Promise.all([
        isUserPerformer(self?.role) ? queryPrivateOrders(token) : queryUserOrders(token),
        queryPublicOrders(),
    ]);

    return {
        props: {
            orders: {
                [OrderType.PRIVATE]: privateOrders,
                [OrderType.PUBLIC]: publicOrders,
            },
            isAuthorized: Boolean(self),
        },
    };
};

export default OrdersPage;
