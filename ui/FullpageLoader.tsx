import { CircularProgress } from "@mui/material";


const FullpageLoader = () => (
    <CircularProgress
        size={100}
        sx={{
            position: "absolute",
            mt: "calc(50vh - 90px)",
            ml: "calc(50vw - 50px)",
            color: "#ff9100",
        }}
    />
);

export default FullpageLoader;
