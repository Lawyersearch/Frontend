import React, { useRef, useState } from "react";
import { Box, IconButton, Stack, SxProps } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import useElementSize from "../hooks/useElementSize";
import { useBoolean } from "../hooks/useBoolean";

interface GalleryProps {
    children: JSX.Element | JSX.Element[];
    height?: number;
    pxPerClick?: number;
    scrollOnHover?: number;
    spacing?: number;
    sx?: SxProps;
}

const Gallery = ({ children, height = 500, pxPerClick = 300, scrollOnHover = 20, spacing = 0, sx }: GalleryProps) => {
    const [scroll, setScroll] = useState(0);
    const [leftHover, leftEnter, leftLeave] = useBoolean(false);
    const [rightHover, rightEnter, rightLeave] = useBoolean(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [boxRef, { width }] = useElementSize();

    const scrollLeft = () => {
        const ceil = 0;
        setScroll(scroll => Math.min(scroll + pxPerClick, ceil));
    };

    const scrollRight = () => {
        const floor = width - contentRef.current!.scrollWidth;
        setScroll(scroll => Math.max(scroll - pxPerClick, floor));
    };

    const leftDisabled = scroll >= 0;
    const rightDisabled = !!contentRef.current && contentRef.current.scrollWidth + scroll <= width;

    return (
        <Stack direction="row">
            <IconButton
                disabled={leftDisabled}
                onClick={scrollLeft}
                onMouseEnter={leftEnter}
                onMouseLeave={leftLeave}
                sx={{
                    opacity: +(!leftDisabled || !rightDisabled),
                    height,
                    borderRadius: 0,
                    px: { xs: 1, sm: 2 },
                    transition: ".25s background ease-in-out",
                    ":hover": {
                        background: "linear-gradient(90deg, rgba(100, 100, 100, 0.5), rgba(100, 100, 100, 0.01))",
                    },
                }}
            >
                <KeyboardArrowLeftIcon sx={{ height: 40, width: 40 }} />
            </IconButton>
            <Box height={height} ref={boxRef} sx={sx} mx={{ xs: "-56px", sm: "-64px" }} overflow="hidden">
                <Stack
                    spacing={spacing}
                    ref={contentRef}
                    direction="row"
                    height="inherit"
                    ml={scroll + (+leftHover - +rightHover) * scrollOnHover + "px"}
                    sx={{
                        transition: ".25s margin-left ease-in-out",
                        "& > *": { flexShrink: 0 },
                    }}
                >
                    {children}
                </Stack>
            </Box>
            <IconButton
                disabled={rightDisabled}
                onClick={scrollRight}
                onMouseEnter={rightEnter}
                onMouseLeave={rightLeave}
                sx={{
                    opacity: +(!leftDisabled || !rightDisabled),
                    height,
                    borderRadius: 0,
                    ml: "auto",
                    px: { xs: 1, sm: 2 },
                    ":hover": {
                        background: "linear-gradient(270deg, rgba(100, 100, 100, 0.5), rgba(100, 100, 100, 0.01))",
                    },
                }}
            >
                <KeyboardArrowRightIcon sx={{ height: 40, width: 40 }} />
            </IconButton>
        </Stack>
    );
};

export default Gallery;
