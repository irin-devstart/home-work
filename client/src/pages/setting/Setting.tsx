import { webRoute } from '@common/constants';
import { MainTemplate, SettingTemplate } from '@components/templates';
import { TabProps } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const tabLists: Array<TabProps> = [
  {
    label: 'User',
    value: webRoute.setting.user,
    sx: {
      alignItems: 'flex-start'
    }
  }
];
const Setting = () => {
  const navigate = useNavigate();
  return (
    <MainTemplate title='Settings' subTitle='Home'>
      <SettingTemplate
        value={webRoute.setting.user}
        tabLists={tabLists}
        onChange={(e, newValue) => navigate(newValue)}
      />
    </MainTemplate>
  );
};

export default Setting;
