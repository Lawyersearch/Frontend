import { Grid, GridProps } from "@mui/material";
import React from "react";

const GridCenterItem = ({ children, ...rest }: { children: JSX.Element } & GridProps) => (
    <Grid container item justifyContent="center" {...rest}>
        {children}
    </Grid>
);

export default GridCenterItem;
