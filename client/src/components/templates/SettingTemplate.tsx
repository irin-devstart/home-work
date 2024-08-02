import { Box, Paper, Tab, TabProps, Tabs, TabsProps } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

export interface TabListProps {}
interface SettingTemplateProps extends TabsProps {
  tabLists: Array<TabProps>;
}
const SettingTemplate = ({ tabLists, ...props }: SettingTemplateProps) => {
  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        rowGap: 2,
        width: '100%',
        minHeight: '100vh',
        p: '1em'
      }}
    >
      <Tabs
        {...props}
        orientation='vertical'
        aria-label='nav tabs example'
        role='navigation'
        sx={{ borderRight: 1, borderColor: 'divider', width: '13em' }}
      >
        {tabLists.map((tabList, index) => (
          <Tab key={index} {...tabList} />
        ))}
      </Tabs>
      <Box
        sx={{
          pl: '1em'
        }}
      >
        <Outlet />
      </Box>
    </Paper>
  );
};

export default SettingTemplate;
