import React, { useState } from 'react';
import Layout from '@theme/Layout';
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
              <Typography component='p' className={styles.eyebrow}>
                Documentation for builders, operators, and defenders
              </Typography>
              <Typography component='h1' className={styles.heroTitle}>
                Turn your data into action.
              </Typography>
              <Typography component='p' className={styles.heroDescription}>
                Find clear guidance for AI-powered log analytics, observability, and security with Sumo Logic.
              </Typography>
              <Stack
                className={styles.heroActions}
                direction={{ sm: 'row', xs: 'column' }}
                spacing={0}
              >
                <Button
                  className={styles.primaryAction}
                  component={Link}
                  to='/docs/get-started/quickstart'
                  variant='contained'
                >
                  Get started with Sumo Logic
                </Button>
              </Stack>
            </Stack>

            <Grid container className={styles.quickLinks} spacing={2}>
              {[
                {
                  label: 'Collect',
                  description: 'Connect your data sources',
                  to: '/docs/send-data',
                },
                {
                  label: 'Analyze',
                  description: 'Search and investigate logs',
                  to: '/docs/search',
                },
                {
                  label: 'Monitor',
                  description: 'Observe apps and infrastructure',
                  to: '/docs/observability',
                },
                {
                  label: 'Secure',
                  description: 'Detect and respond to threats',
                  to: '/docs/security',
                },
              ].map(({ description, label, to }) => (
                <Grid item key={label} md={3} sm={6} xs={12}>
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
                alt='Mobot, the Dojo AI log assistant'
                className={styles.dojoIcon}
                component='img'
                src={MobotIcon}
              />
              <Box className={styles.dojoCopy}>
                <Typography component='p' className={styles.dojoEyebrow}>
                  Meet Dojo AI
                </Typography>
                <Typography component='h2' className={styles.dojoTitle}>
                  Ask questions. Investigate faster.
                </Typography>
                <Typography component='p' className={styles.dojoDescription}>
                  Use Mobot to turn plain-language questions into accurate log queries and actionable insights.
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
