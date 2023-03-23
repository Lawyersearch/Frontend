import React from "react";
import { Collapse, Box, Stack, Typography, IconButton } from "@mui/material"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface CollapsedListProps {
    title: string
    children: React.ReactNode | React.ReactNode[]
    expanded: boolean
    onToggle: (curState: boolean) => void
}

const CollapsedList = ({title, children, onToggle, expanded}: CollapsedListProps) => (
    <Collapse
        collapsedSize={60}
        in={expanded}
        sx={{
            borderRadius: 4,
            display: { xs: "block", md: "contents" },
            backgroundColor: "background.paper",
            justifyContent: "center",
        }}
    >
        <Box
            sx={{
                w: 1,
                px: { xs: 3, md: 1 },
                py: 1.7,
                height: "fit-content",
            }}
        >
            <Stack direction="row" justifyContent="space-between" onClick={() => onToggle(!expanded)}>
                <Typography
                    variant="h6"
                    component="h3"
                    color="primary.contrastText"
                    ml={1}
                    mb={{ xs: 1, md: 0 }}
                >
                    {title}
                </Typography>
                <IconButton sx={{ display: { xs: "block", md: "none" }, mt: -1 }}>
                    {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
            </Stack>
            {children}
        </Box>
    </Collapse>
);

export default CollapsedList;
