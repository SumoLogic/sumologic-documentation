import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Box, Button, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import bgImage from '../../static/img/reuse/hero-secondary-background.webp';
import heroImage from '../../static/img/reuse/hero-secondary-graphic.webp';
import SumoLogicDocsLogo from '../../static/img/reuse/sumo-logic-docs.svg';
import { Feature } from '../components/Feature';
import { features } from '../helper/features';
import ErrorBoundary from '../components/ErrorBoundary';

export const Home = () => {
  const [tab, setTab] = useState('0');

  return (
    <ErrorBoundary>
      <Layout
        description='Sumo Logic Docs - best-in-class cloud monitoring, log management, Cloud SIEM tools, and real-time insights for web and SaaS based apps.'
        title='Home'
      >
      {/* H1 hidden, but visible to crawlers */}
      <Typography
        component='h1'
        sx={{
          position: 'absolute',
          width: 1,
          height: 1,
          p: 0,
          m: -1,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          border: 0,
        }}
      >
        Sumo Logic Documentation
      </Typography>
        {/* Header */}
        <Typography
          bgcolor='#0045BE'
          color='#e3e3e3'
          fontSize={28}
          fontWeight={700}
          pt={3}
          px={2}
          pb={1}
          sx={{
            backgroundImage: 'linear-gradient(to right, rgb(0,0,153), rgb(0,70,190) 30%)',
            fontFamily:
              'var(--ifm-font-family-headings, var(--ifm-font-family-base, "Lab Grotesque", "Segoe UI", Roboto, Helvetica, Arial, sans-serif))',
          }}
          textAlign='center'
        >
          <Box
            component={SumoLogicDocsLogo}
            role='img'
            aria-label='Sumo Logic Docs logo'
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
            alt: 'hero image',
            backgroundPosition: {
              md: 'top',
              xs: 'left center',
            },
            backgroundRepeat: 'no-repeat',
            backgroundSize: {
              md: '100% 200%',
              xs: '100% 100%',
            },
            fontFamily:
              'var(--ifm-font-family-base, "Lab Grotesque", "Segoe UI", Roboto, Helvetica, Arial, sans-serif)',
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
                    fontSize={32}
                    fontWeight={700}
                    variant='h2'
                    sx={{
                      fontFamily:
                        'var(--ifm-font-family-headings, var(--ifm-font-family-base, "Lab Grotesque", "Segoe UI", Roboto, Helvetica, Arial, sans-serif))',
                    }}
                  >
                    New to Sumo?
                  </Typography>
                  <Typography
                    color='#e3e3e3'
                    pb={2}
                    textAlign='left'
                    component='p'
                    variant='body1'
                    sx={{ fontFamily: 'inherit' }}
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
                          textTransform: 'none',
                          width: {
                            md: 'auto',
                            xs: '100%',
                          },
                          fontFamily: 'inherit',
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

        {/* Main */}
        <Container maxWidth='xl'>

          {/* Product Guides */}
          <Stack
            alignItems='center'
            pb={5}
            pt={10}
            px={2}
          >
            <Typography
              component='h2'
              fontWeight={900}
              mb={{
                md: 'inherit',
                sm: 4,
                xs: 4,
              }}
              textAlign='center'
              variant='h4'
              sx={{
                fontFamily:
                  'var(--ifm-font-family-headings, var(--ifm-font-family-base, "Lab Grotesque", "Segoe UI", Roboto, Helvetica, Arial, sans-serif))',
              }}
            >
              Explore our product guides
            </Typography>
            <Typography
              component='p'
              mb={4}
              textAlign='center'
              variant='subtitle1'
              sx={{ fontFamily: 'inherit' }}
            >
              Ensure app reliability and security with modern cloud-native monitoring and observability.
            </Typography>

            <TabContext value={tab}>
              <Tabs
                centered
                onChange={(_, newTab) => setTab(newTab)}
                sx={{
                  '& .MuiTabs-flexContainer': {
                    flexWrap: {
                      sm: 'wrap',
                      xs: 'wrap',
                    },
                    justifyContent: {
                      sm: 'center',
                      xs: 'center',
                    },
                  },
                }}
                TabIndicatorProps={{
                  sx: {
                    display: {
                      sm: 'none',
                      xs: 'none'
                    }
                  }
                }}
                value={tab}
              >
                {[
                  {
                    label: 'Data Types',
                  },
                  {
                    label: 'Infrastructure Monitoring',
                  },
                  {
                    label: 'Multi-Cloud',
                  },
                  {
                    label: 'Security and Incidents',
                  },
                  {
                    label: 'Tools',
                  },
                  {
                    label: 'Other Solutions',
                  },
                ].map(({ label }, index) => (
                  <Tab
                    key={label}
                    value={String(index)}
                    label={label}
                    sx={{
                      color: 'grey.700',
                      fontWeight: 'bold',
                      fontFamily:
                        'var(--ifm-font-family-headings, var(--ifm-font-family-base, "Lab Grotesque", "Segoe UI", Roboto, Helvetica, Arial, sans-serif))',
                    }}
                  />
                ))}
              </Tabs>

              {features.map((feature, index) => (
                <TabPanel key={index} value={String(index)} sx={{ px: 0 }}>
                  <Grid container direction="row" justifyContent="center" spacing={4} py={6}>
                    {feature.map((config) => (
                      <Grid item key={config.link} lg={4} md={6} xs={12}>
                        <Feature length={feature.length} {...config} />
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>
              ))}
            </TabContext>
          </Stack>

        </Container>
      </Layout>
    </ErrorBoundary>
  );
};

export default Home;
