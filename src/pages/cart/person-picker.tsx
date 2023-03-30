import React, { FC } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { phoneState, requestPhoneTriesState, userState } from "state";
import { Box, Icon, Text } from "zmp-ui";

export const PersonPicker: FC = () => {
  const user = useRecoilValue(userState);
  const phone = useRecoilValue(phoneState);

  if (!phone) {
    return <RequestPersonPickerPhone />;
  }

  return (
    <Box flex className="space-x-2">
      <Box className="flex-1 space-y-[2px]">
        <Text size="small" className="font-medium text-primary">
          {`${user.name} - ${phone}`}
        </Text>
        <Text size="xSmall" className="text-gray">
          Người nhận
        </Text>
      </Box>
      <Icon icon="zi-chevron-right" />
    </Box>
  );
};

export const RequestPersonPickerPhone: FC = () => {
  const retry = useSetRecoilState(requestPhoneTriesState);
  return (
    <Box flex>
      <Box className="flex-1 space-y-[2px]">
        <Text
          size="small"
          className="text-primary font-medium"
          onClick={() => retry((k) => k + 1)}
        >
          Chọn người nhận
        </Text>
        <Text size="xSmall" className="text-gray">
          Yêu cầu truy cập số điện thoại
        </Text>
      </Box>
      <Icon icon="zi-chevron-right" />
    </Box>
  );
};
