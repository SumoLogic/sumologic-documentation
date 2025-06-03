import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Box, Button, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import bgImage from '../../static/img/hero-secondary-background.webp';
import heroImage from '../../static/img/hero-secondary-graphic.webp';
import SumoLogicDocsLogo from '../../static/img/sumo-logic-docs.svg';
import { Feature } from '../components/Feature';
import { features } from '../helper/features';
import ErrorBoundary from '../components/ErrorBoundary';

export const Home = () => {
  const [tab, setTab] = useState('0');

  return (
    <ErrorBoundary>
      <Layout
        description='Sumo Logic docs - real-time alerting, security, dashboards, and machine-learning-powered analytics for all three types of telemetry — logs, metrics, and traces.'
        title='Home'
      >
        {/* Header */}
        <Typography
          bgcolor='#0045BE'
          color='#e3e3e3'
          fontFamily='Lab Grotesque'
          fontSize={28}
          fontWeight={700}
          pt={3}
          px={2}
          pb={1}
          sx={{
            backgroundImage: 'linear-gradient(to right, rgb(0,0,153), rgb(0,70,190) 30%)',
          }}
          textAlign='center'
        >
          <Box
            component={SumoLogicDocsLogo}
            alt="Sumo Logic Docs logo"
            aria-hidden="true"
            height={{
              md: 36,
              xs: 28,
            }}
            width='100%'
          />
        </Typography>

        {/* Hero */}
        <Stack
          sx={{
            bgcolor: 'white',
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: {
              md: 'top',
              xs: 'left center',
            },
            backgroundRepeat: 'no-repeat',
            backgroundSize: {
              md: '100% 200%',
              xs: '100% 100%',
            },
          }}
          height={{
            md: 'auto',
            xs: '100%',
          }}
          py={4}
          textAlign='center'
        >
          <Container maxWidth='lg'>
            <Grid
              alignItems='center'
              container
              direction={{
                md: 'row',
                xs: 'column-reverse',
              }}
              justifyContent={{
                md: 'center',
                xs: 'flex-end',
              }}
              height='100%'
            >
              <Grid item md={6}>
                <Stack
                  alignItems={{
                    md: 'flex-start',
                    xs: 'center',
                  }}
                  justifyContent='center'
                  spacing={2}
                >
                  <Typography
                    color='white'
                    fontFamily='Lab Grotesque'
                    fontSize={32}
                    fontWeight={700}
                    variant='h2'
                  >
                    New to Sumo?
                  </Typography>
                  <Typography
                    color='#e3e3e3'
                    fontFamily='Lab Grotesque'
                    pb={2}
                    textAlign='left'
                    variant='p'
                  >
                    Get started quickly with our search, visualization, analytics, and security capabilities.
                  </Typography>
                  {[
                    {
                      children: '1. Set up collector and source',
                      description: 'Set up a Sumo Logic collector and source',
                      to: '/docs/get-started/quickstart#step-1-get-your-data-into-sumo',
                    },
                    {
                      children: '2. Explore your data insights',
                      description: 'Explore your insights',
                      to: '/docs/get-started/quickstart#step-2-search-and-analyze-your-data',
                    },
                    {
                      children: '3. Monitor and secure your environment',
                      description: 'Monitor, troubleshoot, and secure your environment',
                      to: '/docs/get-started/quickstart#step-3-monitor-and-troubleshoot-your-environment',
                    },
                  ].map(({ children, to }) => (
                    <Link key={to} to={to} style={{ textDecoration: 'none' }}>
                      <Button
                        sx={{
                          bgcolor: 'transparent',
                          border: '.5px solid',
                          borderColor: '#e3e3e3',
                          borderRadius: 2,
                          fontFamily: 'Lab Grotesque',
                          textTransform: 'none',
                          width: {
                            md: 'auto',
                            xs: '100%',
                          },
                          '&:hover': {
                            bgcolor: '#0045BE',
                            borderColor: '#0045BE',
                            color: '#e3e3e3',
                          },
                        }}
                        variant='contained'
                      >
                        {children}
                      </Button>
                    </Link>
                  ))}
                </Stack>
              </Grid>
              <Grid item md={6} pl={{ md: 13 }}>
                <Box
                  component='img'
                  alt='hero background image'
                  loading='lazy'
                  aria-hidden='true'
                  src={heroImage}
                  width={{
                    lg: 450,
                    md: 300,
                    xs: '85%',
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Stack>

        {/* Product Guides */}
        <Container maxWidth='xl'>
          <Stack
            alignItems='center'
            pb={5}
            pt={10}
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
              Ensure app reliability and security with modern cloud-native monitoring and observability.
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
                  'Observability | Application and Infrastructure Monitoring',
                  'Security | Alert Triage, Threat Detection, and Incident Response',
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
          </Stack>

        </Container>
      </Layout>
    </ErrorBoundary>
  );
};

export default Home;
