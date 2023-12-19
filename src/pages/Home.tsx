import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Elementary from '../components/Elementary';
import HighSchool from '../components/HighSchool';
import SeniorHigh from '../components/SeniorHigh';
import College from '../components/College';
import WorkingYouth from '../components/WorkingYouth';
import CommunityYouth from '../components/CommunityYouth';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const Home = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          scrollButtons={true}
          allowScrollButtonsMobile
          variant="scrollable"
          aria-label="full width tabs example"
        >
          <Tab label="Elementary" {...a11yProps(0)} />
          <Tab label="High School" {...a11yProps(1)} />
          <Tab label="Senior High" {...a11yProps(2)} />
          <Tab label="College" {...a11yProps(3)} />
          <Tab label="Working Youth" {...a11yProps(4)} />
          <Tab label="Community Youth" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Elementary />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <HighSchool />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <SeniorHigh />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <College />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <WorkingYouth />
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <CommunityYouth />
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

export default Home;