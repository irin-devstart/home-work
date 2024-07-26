import { Paper, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const SettingTemplate = () => {
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
        value={'value'}
        orientation='vertical'
        onChange={() => alert('fasfa')}
        aria-label='nav tabs example'
        role='navigation'
        sx={{ borderRight: 1, borderColor: 'divider', width: '11em' }}
      >
        <Tab label='Page One' />
        <Tab label='Page Two' />
        <Tab label='Page Three' />
      </Tabs>
      <Outlet />
    </Paper>
  );
};

export default SettingTemplate;
