import { useId, useRef } from "react";
import { Box, Button, Container, Typography, Card } from "@mui/material";
import { Order } from "../types/order";
import OrderCard from "../components/OrderCard";
import ProfileLink from "../ui/ProfileLink";
import OrderTypes from "../components/order/types";

const testingOrder: Order = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    creatorName: "Василий Пупкин",
    avatar: "",
    performerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    offerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    price: 0,
    description:
        "В описании будет более детально указана суть проблемы. Со всеми входными. Где то еще написать там, может быть, есть ли характеристика с работы, что вообще за человек, и вот в общем все такое. Тут еще можно про цену что нибудь, типа 'Давайте недорого, епт'",
    title: "Отмазать брата от армии",
    categoryId: 0,
    createdDate: "2023-03-22T12:26:07.424Z",
    orderStatus: 0,
    orderType: 0,
};

export const TestingComponent = () => {
    const fileRef = useRef<HTMLInputElement>(null);

    const id = useId();

    return (
        <>
            <ProfileLink id="some-id" src="" userName="Вахтанг Вахтангович" />
            <Box my={20} />
            <Container>
                <OrderCard {...testingOrder} />
            </Container>
            <Card></Card>
            <label htmlFor={id}>
                <Button variant="outlined" sx={{ textTransform: "none" }} component="div">
                    <Typography>Тут какой то текст</Typography>
                </Button>
                <input id={id} type="file" accept=".png,.jpg,.jpeg" hidden ref={fileRef} />
            </label>
        </>
    );
};

export default TestingComponent;
