import styled from "@emotion/styled";
import { Box, SxProps } from "@mui/material";
import Link, { LinkProps } from "next/link";
import React from "react";

const NextLink = ({ children, href, sx, ...rest }: LinkProps & { children: React.ReactNode } & { sx?: SxProps }) => (
    <Link href={href} {...rest}>
        <Box component="a" sx={{ ...sx, "& *": { cursor: "pointer" } }}>
            {children}
        </Box>
    </Link>
);

export default NextLink;
