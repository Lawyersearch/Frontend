import { Chip, Stack, Typography } from "@mui/material";
import { emptyUserText } from "../strings";
import Avatar from "./Avatar";
import NextLink from "./NextLink";

interface ProfileLinkProps {
    id: string;
    userName: string;
    src: string;
}

const ProfileLink = ({ userName, src, id }: ProfileLinkProps) => {
    return (
        <NextLink href={`/userProfile/${id}`}>
            <Chip
                label={
                    <Stack direction="row" spacing={1}>
                        <Avatar src={src} width={20} height={20} />
                        <Typography
                            fontWeight={500}
                            color={theme => (theme.palette.mode === "dark" ? "primary.main" : "primary.dark")}
                            sx={{
                                ":hover": { textDecoration: "underline" },
                            }}
                        >
                            {userName?.trim?.() ? userName : emptyUserText}
                        </Typography>
                    </Stack>
                }
            />
        </NextLink>
    );
};

export default ProfileLink;
