import _isEmpty from "lodash/isEmpty";
import { Container, Grid, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import { useState } from "react";
import OrderTypes from "../components/order/types";
import OrderCard from "../components/OrderCard";
import { Order, OrderType } from "../types/order";
import { queryPrivateOrders, queryPublicOrders, querySelf } from "../utils/query";
import { isUserPerformer } from "../utils/user";


interface OrdersPageProps {
    orders: Order[][]
}

const OrdersPage = ({orders}: OrdersPageProps) => {
    const [type, setType] = useState<number>(_isEmpty(orders[OrderType.PRIVATE]) ? OrderType.PUBLIC : OrderType.PRIVATE);

    return (
        <Container>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={3}>
                    <OrderTypes onTypeClick={setType} orders={orders}/>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Stack spacing={3}>
                        {orders[type].map(order => (
                            <OrderCard key={order.id} {...order}/>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const token = context.req.cookies["token"];
    const [self, privateOrders = [], publicOrders = []] = await Promise.all([
        querySelf(token), queryPrivateOrders(token), queryPublicOrders()
    ]);

    if (!isUserPerformer(self?.role)) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }

    return {
        props: { orders: [privateOrders, publicOrders] }
    };
};

export default OrdersPage;
