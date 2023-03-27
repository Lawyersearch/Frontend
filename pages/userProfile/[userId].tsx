import _isString from "lodash/isString";
import _isEmpty from "lodash/isEmpty";
import { Container, Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import { User } from "../../types/user";
import UserDescription from "../../components/user/profileComponents/UserDescription";
import UserExperience from "../../components/user/profileComponents/UserExperience";
import UserQualification from "../../components/user/profileComponents/UserQualification";
import UserReviews from "../../components/user/profileComponents/UserReviews";
import { experienceString } from "../../utils/wordsEndings";
import { queryUser, queryView } from "../../utils/query";
import { wrapper } from "../../store";
import { isUserPerformer } from "../../utils/user";
import { useCallback, useState } from "react";
import { useAppDispatch } from "../../hooks/redux/useTypedRedux";
import { setSelf } from "../../store/reducers/userSlice";
import { setCategoryView } from "../../store/reducers/uiSlice";

const primaryBorder = {
    border: 1,
    borderColor: "primary.main",
    backgroundColor: "background.default",
};

interface UserProfilePageProps {
    user: User;
    isMyPage: boolean;
}

const UserProfilePage = ({ user: userProp, isMyPage }: UserProfilePageProps) => {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState(userProp);

    const onSelfUpdate = useCallback(
        (updatedUserInfo: Partial<User>) => {
            const updatedUser = { ...user, ...updatedUserInfo };

            setUser(updatedUser);
            dispatch(setSelf(updatedUser));
        },
        [setUser],
    );

    return (
        <Container>
            <Stack spacing={3}>
                {user && (
                    <UserDescription
                        experience={experienceString(user.expirience)}
                        feedBacks={user?.reviewsTo?.length}
                        rating={user?.rating!}
                        tasks={user?.categories!}
                        avatar={user?.avatar!}
                        lastName={user?.lastName}
                        firstName={user?.firstName}
                        middleName={user?.middleName}
                        description={user?.description}
                        phone={user?.phone}
                        instagram={user?.instagram}
                        email={user?.email}
                        categories={user?.categories}
                        isMyPage={isMyPage}
                        onUserUpdate={onSelfUpdate}
                        {...primaryBorder}
                    />
                )}

                {isUserPerformer(user?.role) && (!_isEmpty(user?.workExpiriences) || isMyPage) ? (
                    <UserExperience {...primaryBorder} workExpiriences={user?.workExpiriences} isMyPage={isMyPage} />
                ) : (
                    <></>
                )}

                {isUserPerformer(user?.role) && (!_isEmpty(user?.workExpiriences) || isMyPage) ? (
                    <UserQualification {...primaryBorder} educations={user?.educations} isMyPage={isMyPage} />
                ) : (
                    <></>
                )}

                {user?.reviewsTo?.length ? <UserReviews {...primaryBorder} reviews={user?.reviewsTo} /> : <></>}
            </Stack>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async context => {
    if (!_isString(context?.params?.userId)) {
        return { notFound: true };
    }

    const user = await queryUser(context.params!.userId as string);
    const { self } = store.getState().user;
    const isMyPage = user?.id === self?.id;

    if (isMyPage && isUserPerformer(self?.role)) {
        const { view } = await queryView();

        store.dispatch(setCategoryView(view));
    }

    return {
        notFound: !user,
        props: {
            user,
            isMyPage,
        },
    };
});

export default UserProfilePage;
