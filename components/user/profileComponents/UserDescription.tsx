import React from "react";
import { Button, Card, Chip, Divider, Rating, Stack, SxProps, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MessageIcon from "@mui/icons-material/Message";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { feedBacksString } from "../../../utils/wordsEndings";
import { Category } from "../../../types/category";
import Avatar from "../../../ui/components/Avatar";
import NextLink from "../../../ui/components/NextLink";
import useUpdateGeneral from "../../../hooks/user/useUpdateGeneral";
import { User } from "../../../types/user";
import UpdateUserGeneralModal from "../../../ui/modal/user/UpdateGeneral";
import useUpdateCategories from "../../../hooks/user/useUpdateCategories";
import UpdateUserCategoriesModal from "../../../ui/modal/user/UpdateCategories";

interface UserProfileProps {
    avatar: string;
    lastName: string;
    firstName: string;
    middleName: string;
    isMyPage: boolean;
    tasks?: Category[];
    rating: number;
    feedBacks?: number;
    description?: string;
    experience: string;
    instagram?: string;
    phone?: string;
    email?: string;
    categories: Category[];
    onUserUpdate: (updatedSelf: Partial<User>) => void;
}

const UserDescription = ({
    avatar,
    lastName,
    firstName,
    middleName,
    tasks,
    rating,
    isMyPage,
    feedBacks,
    description,
    experience,
    instagram,
    phone,
    email,
    categories,
    onUserUpdate,
    ...rest
}: UserProfileProps & SxProps) => {
    const [showUpdateGeneral, openUpdateGeneral, closeUpdateGeneral, confirmUpdateGeneral] =
        useUpdateGeneral(onUserUpdate);
    const [showUpdateCategory, openUpdateCategory, closeUpdateCategory, confirmUpdateCategory] =
        useUpdateCategories(onUserUpdate);

    return (
        <Card sx={rest}>
            <Stack flexDirection={{ xs: "column", md: "row" }} p={2}>
                <Stack>
                    <Box alignSelf="center">
                        <Avatar src={avatar} height={250} width={250} />
                    </Box>
                    <Stack alignItems="center" spacing={1}>
                        <Stack direction={{ xs: "column", md: "row" }} alignItems="center" width="max-content" mt={2}>
                            <Rating
                                value={rating}
                                precision={0.5}
                                readOnly
                                sx={{ color: "primary.main" }}
                                size="large"
                            />
                            <Typography variant="body1" fontWeight={300}>
                                ({rating.toFixed(2)} / 5.0)
                            </Typography>
                        </Stack>
                        <Typography variant="body1" component="a" fontWeight={300} color="primary.main" href="#reviews">
                            {feedBacksString(feedBacks)}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack spacing={1} justifyContent="space-between" ml={2} width="100%">
                    <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography variant="h4">
                                {[lastName, firstName, middleName].filter(Boolean).join(" ") || "Аноним"}
                            </Typography>
                        </Stack>
                        <Typography variant="body1" fontWeight={300}>
                            Опыт: {experience}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Описание: {description}
                        </Typography>
                    </Stack>
                    <Stack alignItems="flex-end" spacing={2} mr={{ xs: "16px !important", md: 0 }}>
                        {instagram && (
                            <Stack direction="row">
                                <InstagramIcon sx={{ mr: 1 }} />
                                <Typography variant="body1" component="p">
                                    {instagram}
                                </Typography>
                            </Stack>
                        )}
                        {phone && (
                            <Stack direction="row">
                                <PhoneIcon sx={{ mr: 1 }} />
                                <Typography variant="body1" component="p">
                                    {phone}
                                </Typography>
                            </Stack>
                        )}
                        {email && (
                            <Stack direction="row">
                                <EmailIcon sx={{ mr: 1 }} />
                                <a href={`mailto:${email}`}>
                                    <Typography variant="body1" component="p">
                                        {email}
                                    </Typography>
                                </a>
                            </Stack>
                        )}
                        {isMyPage ? (
                            <Button variant="contained" color="info" onClick={openUpdateGeneral} endIcon={<EditIcon />}>
                                Изменить
                            </Button>
                        ) : (
                            <Button variant="contained" endIcon={<MessageIcon />}>
                                Написать
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Stack>
            {(tasks?.length || isMyPage) > 0 && (
                <>
                    <Divider />
                    <Stack
                        direction="row"
                        flexWrap="wrap"
                        alignItems="center"
                        justifyContent="space-evenly"
                        sx={{ px: 2, py: 1, bgcolor: "background.default" }}
                    >
                        {tasks?.map(task => (
                            <NextLink href={`/search?q=${task.id}`} key={task.id} shallow>
                                <Chip label={task.name} sx={{ m: 0.5, ":hover": { cursor: "pointer" } }} />
                            </NextLink>
                        ))}
                        {isMyPage && <Chip key={0} label="Изменить" color="info" onClick={openUpdateCategory} />}
                    </Stack>
                </>
            )}
            <UpdateUserGeneralModal
                userData={{ firstName, lastName, middleName, description }}
                open={showUpdateGeneral}
                onClose={closeUpdateGeneral}
                confirm={confirmUpdateGeneral}
            />
            <UpdateUserCategoriesModal
                pickedCategories={categories}
                open={showUpdateCategory}
                onClose={closeUpdateCategory}
                confirm={confirmUpdateCategory}
            />
        </Card>
    );
};

export default UserDescription;
