import { SxProps } from "@mui/material";
import { ImageProps } from "next/image";
import RoundedImage from "./RoundedImage";

const defaultAvatarUrl = "/static/avatars/default.png";

const Avatar = (props: ImageProps & { sx?: SxProps }) => (
    <RoundedImage {...props} src={props.src || defaultAvatarUrl} />
);

export default Avatar;
