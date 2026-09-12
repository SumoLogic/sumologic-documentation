import React, { useState } from 'react';
import Layout from '@theme/Layout';
import SearchBar from '@theme/SearchBar';
import Link from '@docusaurus/Link';
import { Box, Button, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import MobotIcon from '../../static/img/icons/operations/mobot.png';
import { Feature } from '../components/Feature';
import { features } from '../helper/features';
import ErrorBoundary from '../components/ErrorBoundary';
import styles from './index.module.css';

export const Home = () => {
  const [tab, setTab] = useState('0');

  return (
    <ErrorBoundary>
      <Layout
        description='Sumo Logic documentation for log analytics, cloud monitoring, security, observability, and AI-powered troubleshooting. Get started guides, API references, and release notes.'
        title='Home'
      >
        {/* Hero */}
        <Box component='header' className={styles.hero}>
          <Container maxWidth='lg' className={styles.heroContainer}>
            <Stack alignItems='center' className={styles.heroContent} spacing={0}>
              <Typography component='h1' className={styles.heroTitle}>
                Sumo Logic Documentation
              </Typography>
              <Typography component='p' className={styles.heroTagline}>
                Turn your data into action.
              </Typography>
              <Typography component='p' className={styles.heroDescription}>
                Find clear guidance for AI-powered log analytics, observability, and security with Sumo Logic. Search setup instructions, how-to guides, and API references.
              </Typography>
              <Box className={styles.heroSearch}>
                <SearchBar />
              </Box>
            </Stack>
          </Container>
        </Box>

        {/* Task-based entry points */}
        <Box component='section' className={styles.taskSection}>
          <Container maxWidth='lg'>
            <Stack
              alignItems='center'
              className={styles.taskIntro}
            >
              <Box>
                <Typography component='h2' className={styles.taskTitle}>
                  New to Sumo?
                </Typography>
                <Typography component='p' className={styles.taskDescription}>
                  Follow the guided quickstart.
                </Typography>
              </Box>
            </Stack>

            <Grid container className={styles.quickLinks} spacing={2}>
              {[
                {
                  label: '1. Set up collector',
                  description: 'Connect your data sources to Sumo Logic',
                  to: '/docs/get-started/quickstart/#step-1-get-your-data-into-sumo',
                },
                {
                  label: '2. Explore your data insights',
                  description: 'Search and analyze your data',
                  to: '/docs/get-started/quickstart/#step-2-search-and-analyze-your-data',
                },
                {
                  label: '3. Monitor and secure your environment',
                  description: 'Use apps, dashboards, and security tools',
                  to: '/docs/get-started/quickstart/#step-3-monitor-and-troubleshoot-your-environment',
                },
              ].map(({ description, label, to }) => (
                <Grid item key={label} md={4} xs={12}>
                  <Link className={styles.quickLink} to={to}>
                    <span>
                      <strong>{label}</strong>
                      <small>{description}</small>
                    </span>
                    <span aria-hidden='true' className={styles.arrow}>→</span>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Product Guides */}
        <Container maxWidth='xl'>
          <Stack
            alignItems='center'
            pb={7}
            pt={8}
            px={2}
          >
            <Typography
              component='h2'
              fontFamily='Lab Grotesque'
              fontWeight={900}
              mb={4}
              textAlign='center'
              variant='h4'
            >
              Explore our product guides
            </Typography>
            <Typography
              component='p'
              fontFamily='Lab Grotesque'
              mb={4}
              textAlign='center'
              variant='subtitle1'
            >
              Monitor, troubleshoot, and secure your environment with log analytics, observability, and AI-powered insights.
            </Typography>

            <TabContext value={tab}>
              <Tabs
                centered
                onChange={(_, newTab) => setTab(newTab)}
                sx={{
                  '& .MuiTabs-flexContainer': {
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  },
                }}
                TabIndicatorProps={{ sx: { display: 'none' } }}
                value={tab}
              >
                {[
                  'Security',
                  'Log Search',
                  'Dojo AI',
                  'Observability',
                  'Alerts, Apps, Dashboards',
                ].map((label, index) => (
                  <Tab
                    key={label}
                    label={label}
                    sx={{
                      color: 'grey.700',
                      fontFamily: 'Lab Grotesque',
                      fontWeight: 'bold',
                    }}
                    value={String(index)}
                  />
                ))}
              </Tabs>
              {features.map((featureGroup, index) => (
                <Grid
                  component={TabPanel}
                  container
                  justifyContent='center'
                  key={index}
                  spacing={4}
                  value={String(index)}
                >
                  {featureGroup.map((config) => (
                    <Grid
                      item
                      key={config.link}
                      lg={4}
                      md={6}
                      xs={12}
                    >
                      <Feature
                        length={featureGroup.length}
                        {...config}
                      />
                    </Grid>
                  ))}
                </Grid>
              ))}
            </TabContext>

            <Box className={styles.dojoCallout}>
              <Box
                alt='Mobot, the conversational interface for Dojo AI'
                className={styles.dojoIcon}
                component='img'
                src={MobotIcon}
              />
              <Box className={styles.dojoCopy}>
                <Typography component='p' className={styles.dojoEyebrow}>
                  Meet Dojo AI
                </Typography>
                <Typography component='h2' className={styles.dojoTitle}>
                  Ask questions. Get to evidence faster.
                </Typography>
                <Typography component='p' className={styles.dojoDescription}>
                  Use Mobot to analyze logs in plain language, investigate security incidents, and surface clear, actionable findings.
                </Typography>
              </Box>
              <Button
                className={styles.dojoAction}
                component={Link}
                to='/docs/search/mobot'
                variant='contained'
              >
                Explore Mobot
              </Button>
            </Box>
          </Stack>

        </Container>
      </Layout>
    </ErrorBoundary>
  );
};

export default Home;
