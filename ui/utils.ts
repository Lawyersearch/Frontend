import { SxProps } from "@mui/material";

export const hideScrollbars: SxProps = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "::-webkit-scrollbar": { width: 0 },
};
