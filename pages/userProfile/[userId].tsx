import _isString from "lodash/isString";
import { Container, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import { User } from "../../types/user";
import UserDescription from "../../components/user/profileComponents/UserDescription";
import UserExperience from "../../components/user/profileComponents/UserExperience";
import UserQualification from "../../components/user/profileComponents/UserQualification";
import UserReviews from "../../components/user/profileComponents/UserReviews";
import { experienceString } from "../../utils/wordsEndings";
import { querySelf, queryUser } from "../../utils/query";
import { wrapper } from "../../store";

const primaryBorder = {
    border: 1,
    borderColor: "primary.main",
    backgroundColor: "background.default",
};

interface UserProfilePageProps {
    user: User;
    isMyPage: boolean;
}

const UserProfilePage = ({ user, isMyPage }: UserProfilePageProps) => (
    <Container>
        <Stack spacing={3}>
            {user && (
                <UserDescription
                    experience={experienceString(user.expirience)}
                    feedBacks={user?.reviewsTo?.length}
                    rating={user?.rating!}
                    tasks={user?.categories!}
                    avatar={user?.avatar!}
                    userName={`${user?.lastName} ${user?.firstName} ${user?.middleName}`}
                    description={user?.description}
                    phone={user?.phone}
                    instagram={user?.instagram}
                    email={user?.email}
                    isMyPage={isMyPage}
                    {...primaryBorder}
                />
            )}

            {user?.role ? (
                <UserExperience {...primaryBorder} workExpiriences={user?.workExpiriences} isMyPage={isMyPage} />
            ) : (
                <></>
            )}

            {user?.role ? (
                <UserQualification {...primaryBorder} educations={user?.educations} isMyPage={isMyPage} />
            ) : (
                <></>
            )}

            {user?.reviewsTo?.length ? <UserReviews {...primaryBorder} reviews={user?.reviewsTo} /> : <></>}
        </Stack>
    </Container>
);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async context => {
    if (!_isString(context?.params?.userId)) {
        return { notFound: true };
    }

    const user = await queryUser(context.params!.userId as string);
    const { self } = store.getState().user;

    return {
        notFound: !user,
        props: {
            user,
            isMyPage: user?.id === self?.id,
        },
    };
});

export default UserProfilePage;
