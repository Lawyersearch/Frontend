import styled from "@emotion/styled";
import Link, { LinkProps } from "next/link";
import React from "react";

const PointerLink = styled.a({ "& *": { cursor: "pointer" } });

const NextLink = ({ children, href, ...rest }: LinkProps & { children: React.ReactNode }) => (
    <Link href={href} {...rest}>
        <PointerLink href={href.toString()}>{children}</PointerLink>
    </Link>
);

export default NextLink;
