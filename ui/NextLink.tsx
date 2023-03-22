import styled from "@emotion/styled";
import Link, { LinkProps } from "next/link";
import React from "react";

const PointerLink = styled.a({'& *': {cursor: "pointer"}})

const NextLink = ({children, ...props}: LinkProps & {children: React.ReactNode}) => (
    <Link {...props}>
        <PointerLink>
            {children}
        </PointerLink>
    </Link>
)

export default NextLink;
