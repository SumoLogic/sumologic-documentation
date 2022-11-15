import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Box, Button, Container, Divider, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Helmet from 'react-helmet';
import bgImage from '../../static/img/landing/landing-hero.jpg';
import { Feature } from '../components/Feature';
import { features } from '../helper/features';

export const Home = () => {
  const { siteConfig = {} } = useDocusaurusContext();
  const [tab, setTab] = useState('0');

  return (
    <>
      <Helmet>
        <meta
          content='NnyORtv9AD24uCpytHXpAGxDxZ5OcIR5MwV5gJR4LKA'
          name='google-site-verification'
        />
      </Helmet>
      <Layout
        description='Sumo Logic docs - real-time alerting, security, dashboards, and machine-learning-powered analytics for all three types of telemetry — logs, metrics, and traces.'
        title='Home'
      >

        {/* Hero */}
        <Stack
          sx={{
            bgcolor: 'white',
            backgroundImage: `url(${bgImage})`,
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
          height={400}
          justifyContent='center'
          textAlign='center'
        >
          <Container maxWidth='md'>
            <Typography
              color='white'
              fontWeight={700}
              variant='h2'
            >
              {/* @ts-expect-error - augment siteConfig type */}
              {siteConfig.title}
            </Typography>
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
              fontFamily='Lab Grotesque'
              fontWeight={900}
              mb={{
                md: 'inherit',
                sm: 4,
                xs: 4,
              }}
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
                    flexWrap: {
                      sm: 'wrap',
                      xs: 'wrap',
                    },
                    justifyContent: {
                      sm: 'center',
                      xs: 'center',
                    }
                  },
                }}
                TabIndicatorProps={{
                  sx: {
                    display: {
                      sm: 'none',
                      xs: 'none',
                    },
                  },
                }}
                value={tab}
                variant='scrollable'
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
                ].map(({ label, ...rest }, index) => (
                  <Tab
                    key={label}
                    label={label}
                    sx={{
                      color: 'grey.700',
                      fontFamily: 'Lab Grotesque',
                      fontWeight: 'bold',
                    }}
                    value={String(index)}
                    {...rest}
                  />
                ))}
              </Tabs>
              {features.map((feature, index) => tab === String(index) && (
                <Grid
                  component={TabPanel}
                  container
                  direction='row'
                  justifyContent='center'
                  py={6}
                  spacing={4}
                  value={String(index)}
                >
                  {feature.map((config) => (
                    <Grid item lg={4} md={6} xs={12}>
                      <Feature
                        key={config.link}
                        length={feature.length}
                        {...config}
                      />
                    </Grid>
                  ))}
                </Grid>
              ))}
            </TabContext>
          </Stack>

          <Divider
            sx={{
              bgcolor: ({ palette }) => `${palette.divider} !important`,
              mb: 10,
            }}
          />

          {/* Get Started */}
          <Stack
            alignItems='center'
            px={2}
          >
            <Typography
              component='h2'
              fontFamily='Lab Grotesque'
              fontWeight={900}
              textAlign='center'
              variant='h4'
            >
              New to Sumo Products?
            </Typography>
            <Typography
              component='p'
              fontFamily='Lab Grotesque'
              mb={4}
              textAlign='center'
              variant='subtitle1'
            >
              Get started quickly with Sumo Logic search, visualization and analytics capabilities.
            </Typography>
            <Grid
              container
              justifyContent='center'
              spacing={2}
            >
              {[
                {
                  children: 'Set up account',
                  description: 'Set up account',
                  href: '/docs/get-started',
                },
                {
                  children: 'Send data',
                  description: 'Send data',
                  href: '/docs/send-data',
                },
                {
                  children: 'Explore insights',
                  description: 'Data insights',
                  href: '/docs/get-started/sumo-logic-ui',
                },
              ].map(({ children, ...rest }) => (
                <Grid item md='auto' xs={12}>
                  <Button
                    fullWidth
                    sx={{
                      borderRadius: 0,
                      '&:hover': {
                        color: 'common.white',
                      },
                    }}
                    variant='contained'
                    {...rest}
                  >
                    {children}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Layout>
    </>
  );
};

export default Home;
