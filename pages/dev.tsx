import { useId, useRef } from "react";
import { Box, Button, Container, Typography, Card } from "@mui/material";

import ProfileLink from "../ui/components/ProfileLink";

export const TestingComponent = () => {
    const fileRef = useRef<HTMLInputElement>(null);

    const id = useId();

    return (
        <>
            <ProfileLink id="some-id" src="" userName="Вахтанг Вахтангович" />
            <Box my={20} />
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
