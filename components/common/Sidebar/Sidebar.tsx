import * as React from 'react';
import { Grid, TextField } from '@mui/material';
import EventNoteTwoToneIcon from '@mui/icons-material/EventNoteTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import PhotoSizeSelectActualTwoToneIcon from '@mui/icons-material/PhotoSizeSelectActualTwoTone';
import SearchIcon from '@mui/icons-material/Search';

import GlobalContext from '../../../context/GlobalContext';

import { SidebarMenuLink, SidebarRoot, SidebarMenuText } from './style';

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  const {
    state: { isDarkMode },
  } = React.useContext(GlobalContext);

  return (
    <SidebarRoot
      display={{ xs: 'block', md: 'none' }}
      $isDarkMode={isDarkMode}
      $isSidebarOpen={isSidebarOpen}
    >
      <Grid container rowSpacing={6}>
        <TextField
          color='secondary'
          fullWidth
          placeholder='Search drill-y'
          InputProps={{ startAdornment: <SearchIcon color='disabled' /> }}
        />
        <Grid item xs={12}>
          <SidebarMenuLink href='/'>
            <SidebarMenuText variant='h4'>
              <Grid container justifyContent='space-between'>
                Home
                <HomeTwoToneIcon />
              </Grid>
            </SidebarMenuText>
          </SidebarMenuLink>
        </Grid>
        <Grid item xs={12}>
          <SidebarMenuLink href='/photos'>
            <SidebarMenuText variant='h4'>
              <Grid container justifyContent='space-between'>
                Photos
                <PhotoSizeSelectActualTwoToneIcon />
              </Grid>
            </SidebarMenuText>
          </SidebarMenuLink>
        </Grid>
        <Grid item xs={12}>
          <SidebarMenuLink href='/'>
            <SidebarMenuText variant='h4'>
              <Grid container justifyContent='space-between'>
                Events
                <EventNoteTwoToneIcon />
              </Grid>
            </SidebarMenuText>
          </SidebarMenuLink>
        </Grid>
      </Grid>
    </SidebarRoot>
  );
};

export default Sidebar;
