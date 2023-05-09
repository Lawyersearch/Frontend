import React, { useCallback, useState } from "react";
import { Card, IconButton, Rating, Stack, SxProps, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Gallery from "../../../ui/components/Gallery";
import { Review } from "../../../types/user";
import Avatar from "../../../ui/components/Avatar";
import { useAppSelector } from "../../../hooks/redux/useTypedRedux";
import { isUserClient, mkUserName } from "../../../utils/user";
import useLeaveReview from "../../../hooks/user/useLeaveReview";
import LeaveReviewModal from "../../../ui/modal/user/LeaveReview";

interface UserReviewsProps {
    userId: string;
    reviews: Review[];
}

const mkReview = (review: Review) => (
    <Stack key={review.id} bgcolor="background.paper" borderRadius="10px" p={1} width={350} spacing={1}>
        <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={review.avatar} height={40} width={40} />
            <Typography variant="h5" color="text.primary">
                {review.name}
            </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={review.rating} precision={0.25} sx={{ color: "primary.main" }} readOnly />
            <Typography variant="body2" color="text.secondary">
                {review.date}
            </Typography>
        </Stack>
        <Typography variant="body1" color="text.secondary">
            {review.comment}
        </Typography>
    </Stack>
);

const UserReviews = ({ userId, reviews: reviewsProp, ...rest }: UserReviewsProps & SxProps) => {
    const [reviews, setReviews] = useState(reviewsProp);
    const user = useAppSelector(state => state.user.self);

    const onNewReview = useCallback(
        (review: Review) => {
            review.name ||= mkUserName(user, { middleName: false });
            review.avatar ||= user!.avatar;
            review.userFromId ||= user!.id;

            setReviews(reviews => [review, ...reviews]);
        },
        [setReviews],
    );

    const shouldLeaveReview = isUserClient(user?.role) && reviews.every(review => review.userFromId !== user?.id);
    const [showLeaveReview, openLeaveReview, closeLeaveReview, confirmLeaveReview] = useLeaveReview(
        userId,
        onNewReview,
    );

    return (
        <Card id="reviews" sx={{ ...rest, p: 1 }}>
            <Typography gutterBottom variant="h4" component="h3">
                Отзывы
            </Typography>
            <Gallery height={250} spacing={2} pxPerClick={366}>
                <>
                    {shouldLeaveReview && (
                        <Stack
                            key={0}
                            width={350}
                            bgcolor="background.paper"
                            borderRadius="10px"
                            p={1}
                            justifyContent="center"
                            alignItems="center"
                        >
                            <IconButton onClick={openLeaveReview}>
                                <AddIcon color="success" sx={{ width: 100, height: 100 }} />
                            </IconButton>
                        </Stack>
                    )}
                    {reviews.map(mkReview)}
                </>
            </Gallery>
            <LeaveReviewModal open={showLeaveReview} onClose={closeLeaveReview} confirm={confirmLeaveReview} />
        </Card>
    );
};

export default UserReviews;
