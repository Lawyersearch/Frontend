import { SxProps } from "@mui/material";
import { ImageProps } from "next/image";
import RoundedImage from "./RoundedImage";

const defaultAvatarUrl = "/static/avatars/default.png";

interface AvatarProps extends Omit<ImageProps, "src"> {
    sx?: SxProps;
    src?: string;
}

const Avatar = (props: AvatarProps) => <RoundedImage {...props} src={props.src || defaultAvatarUrl} />;

export default Avatar;
