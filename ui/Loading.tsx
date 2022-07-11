import React from "react";
import { Box, SxProps, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

interface LoadingProps {
  title: string;
}

const style: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  border: "2px solid #000",
  boxShadow: 24,
  px: 4,
  pt: 2,
  pb: 3,
};

const Loading = ({ title }: LoadingProps) => (
  <Box sx={style}>
    <Typography
      variant="h4"
      gutterBottom
      component="h1"
      color={(theme) => theme.palette.text.primary}
    >
      {title}
    </Typography>
    <CircularProgress />
  </Box>
);

export default Loading;
