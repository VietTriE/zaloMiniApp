import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { profileState } from "state";
import { Box, Header, Page, Text } from "zmp-ui";
import { Divider } from "components/divider";

const ProfileContext: FC = () => {
  const profile = useRecoilValue(profileState);
  return (
    <Box className="bg-background">
      <div className="p-4">
        <span className="text-slate-600">Đang cập nhật...</span>
      </div>
    </Box>
  );
};

const ProfilePage: FC = () => {
  return (
    <Page>
      <Header title="Cá nhân" showBackIcon={false} textColor="white" backgroundColor="#0068b2"/>
      <Divider />
      <ProfileContext />
    </Page>
  );
};

export default ProfilePage;
