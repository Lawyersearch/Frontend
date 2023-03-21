import { Container, Stack } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { User } from "../../types/user";
import UserDescription from "../../components/user/profileComponents/UserDescription";
import UserExperience from "../../components/user/profileComponents/UserExperience";
import UserQualification from "../../components/user/profileComponents/UserQualification";
import UserReviews from "../../components/user/profileComponents/UserReviews";
import React, { useMemo } from "react";
import { experienceString } from "../../utils/wordsEndings";
import { useGetSelfQuery } from "../../services/user";

const primaryBorder = {
  border: 1,
  borderColor: "primary.main",
  backgroundColor: "background.default",
};

interface UserProfilePageProps {
  user: User;
}

const UserProfilePage = ({ user }: UserProfilePageProps) => {
  const { data: me } = useGetSelfQuery();
  const isMyPage = useMemo(() => me?.id === user?.id, [user?.id, me?.id]);
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
          <UserExperience
            {...primaryBorder}
            workExpiriences={user?.workExpiriences}
            isMyPage={isMyPage}
          />
        ) : (
          <></>
        )}

        {user?.role ? (
          <UserQualification
            {...primaryBorder}
            educations={user?.educations}
            isMyPage={isMyPage}
          />
        ) : (
          <></>
        )}

        {user?.reviewsTo?.length ? (
          <UserReviews {...primaryBorder} reviews={user?.reviewsTo} />
        ) : (
          <></>
        )}
      </Stack>
    </Container>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const user = await fetch(
    `${process.env.BACK_SERVER_API}/user/id/${context!.params!.userId}`
  ).then((res) => res.json());
  return {
    notFound: !user.value,
    props: {
      user: user.value,
    },
    revalidate: 60,
  };
};

export default UserProfilePage;
