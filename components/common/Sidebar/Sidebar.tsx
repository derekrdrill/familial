import * as React from 'react';
import { Grid } from '@mui/material';

import ActionButton from '../ActionButton/ActionButton';
import ComingSoon from '../../drill-y/ComingSoon/ComingSoon';
import Tooltip from '../Tooltip/Tooltip';

import { SidebarMenuLink, SidebarRoot, SidebarMenuText } from './style';

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
  return (
    <SidebarRoot display={{ xs: 'block', lg: 'none' }} $isSidebarOpen={isSidebarOpen}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <SidebarMenuLink href='/menu'>
            <SidebarMenuText>Menu</SidebarMenuText>
          </SidebarMenuLink>
        </Grid>
        <Tooltip tooltipTitle={<ComingSoon />} tooltipPlacement='right'>
          <Grid item xs={12}>
            <SidebarMenuText>Rewards</SidebarMenuText>
          </Grid>
        </Tooltip>
        <Tooltip tooltipTitle={<ComingSoon />} tooltipPlacement='right'>
          <Grid item xs={12}>
            <SidebarMenuText>Retail</SidebarMenuText>
          </Grid>
        </Tooltip>
        <Grid item xs={12}>
          <Grid container rowSpacing={2}>
            <Tooltip tooltipTitle={<ComingSoon />} tooltipPlacement='right'>
              <Grid item xs={12}>
                <ActionButton
                  buttonColor='#6a017f'
                  buttonHoverColor='#a501c6'
                  buttonWidth={'100%'}
                  size='large'
                  variant='contained'
                >
                  Join Rewards
                </ActionButton>
              </Grid>
            </Tooltip>
            <Tooltip tooltipTitle={<ComingSoon />} tooltipPlacement='right'>
              <Grid item xs={12}>
                <ActionButton
                  buttonColor='#6a017f'
                  buttonHoverColor='#a501c6'
                  buttonWidth={'100%'}
                  size='large'
                  variant='outlined'
                >
                  Sign In
                </ActionButton>
              </Grid>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </SidebarRoot>
  );
};

export default Sidebar;
