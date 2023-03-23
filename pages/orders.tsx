import { Container, Grid, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OrderTypes from "../components/order/types";
import OrderCard from "../components/OrderCard";
import { useGetSelfQuery } from "../services/user";
import { Order } from "../types/order";
import { queryPublicOrders } from "../utils/query";
import { isUserPerformer } from "../utils/user";


interface OrdersPageProps {
    orders: Order[]
}

const OrdersPage = ({orders}: OrdersPageProps) => {
    const router = useRouter();
    const { data: user, isSuccess } = useGetSelfQuery(undefined);

    useEffect(() => {
        if (isSuccess && !isUserPerformer(user?.role)) {
            router.push("/");
        }
    }, [isSuccess, user?.role]);

    return (
        <Container>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} md={3}>
                    <OrderTypes />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Stack spacing={3}>
                        {orders.map(order => (
                            <OrderCard key={order.id} {...order}/>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
            <Stack spacing={3}>
                {orders.map(order => (
                    <OrderCard key={order.id} {...order}/>
                ))}
            </Stack>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async context => {
    const orders = await queryPublicOrders();

    return {
        props: { orders }
    };
};

export default OrdersPage;
