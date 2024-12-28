import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { Box, Button, Container, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import bgImage from '../../static/img/hero-secondary-background.webp';
import heroImage from '../../static/img/hero-secondary-graphic.webp';
import SumoLogicDocsLogo from '../../static/img/sumo-logic-docs.svg';
import { Feature } from '../components/Feature';
import { features } from '../helper/features';
import ErrorBoundary from '../components/ErrorBoundary';
import { SvgIcon } from '@mui/material';

const ChatIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 27 27" sx={{ bgcolor: '#0045BE', borderRadius: '50%', padding: '3px' }}>
    <path
      fill="none"
      stroke="white"
      strokeWidth="2"
      d="M18 3H9C5.5 3 3 5.5 3 9V14C3 18 5.5 20.5 9 20.5H13.5L19 25V20.5H18C22 20.5 24.5 18 24.5 14V9C24.5 5.5 22 3 18 3Z"
    />
  </SvgIcon>
);

export const Home = () => {
  const [tab, setTab] = useState('0');

  const questions = [
    '✨ How do I set up alerts?',
    '✨ What types of logs can I analyze?',
    '✨ How do I secure my environment?',
    '✨ How to navigate dashboards.'
  ];

  useEffect(() => {
    if (!document.getElementById('berry-widget-script')) {
      const script = document.createElement('script');
      script.id = 'berry-widget-script';
      script.src = 'https://www.berryapp.io/js/berry-widget.min.js';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        const widgetJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MjU5NDg5MTcsImV4cCI6MTc0MTYwODkxNywiYXVkIjoiV2lkZ2V0SW5pdGlhbGl6YXRpb24iLCJvcmdhbml6YXRpb25JZCI6NjN9.oJEGkGq1q3uFD66J916f_ZBrqQjPHP9orUOKFxInG38';
        window.Berry.init({
          token: widgetJwt,
          primaryColor: '#021b9a',
          position: { side: 'right', offsetX: 25, offsetY: 100 },
          isOpenByDefault: true,
          botUrlPath: 'nova',
          showNewChat: true,
          parentElementId: 'inline-chatbot-container',
        });
      };

      script.onerror = () => console.error('Failed to load Berry widget script');
    }
  }, []);

  const handleQuestionClick = (question) => {
    if (window.Berry) {
      if (window.Berry.sendMessage) {
        window.Berry.sendMessage(question);
      }
      if (window.Berry.open) {
        window.Berry.open();
      }
    }
  };

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
            role="<img>"
            aria-hidden="true"
            height={{
              md: 36,
              xs: 28,
            }}
            width='100%'
          />
        </Typography>

        {/* Suggested Questions */}
        <Box sx={{ width: '100%', background: '#2a2a2a', color: '#fff', py: 4 }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" fontFamily="Lab Grotesque" fontWeight={600} mb={1} sx={{ background: 'linear-gradient(90deg, #9900ED, #C04CF4, #00C8E0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Your Sumo Docs assistant is here to help!
            </Typography>
            <Typography fontFamily="Lab Grotesque" fontSize={15} fontWeight={300} mb={2}>
              Ask me a question! Try these to get started:
            </Typography>
            <Stack
            direction="row"
            spacing={1} // Reduced horizontal spacing between buttons
            justifyContent="center"
            flexWrap="wrap"
            rowGap={1} // Reduced vertical spacing between rows
            >

    {questions.map((question, index) => (
      <Button
        key={index}
        onClick={() => handleQuestionClick(question)}
        variant="outlined"
        sx={{
          bgcolor: 'transparent',
          color: '#DDDDDD',
          fontFamily: 'Lab Grotesque',
          borderColor: '#808080',
          borderRadius: '5px',
          textTransform: 'lowercase',
          fontSize: '12px',
          fontWeight: '300',
          padding: '4px 6px',
          minWidth: 'auto',
          '&:hover': {
            bgcolor: '#2a2a2a',
            color: '#DDDDDD',
          },
        }}
      >
        {question}
      </Button>
    ))}
  </Stack>

            {/* Inline Chatbot Container */}
            <Box id="inline-chatbot-container" sx={{ my: 4, p: 2, margin: '0 auto', textAlign: 'center' }}>
            {/* The chatbot will render here */}
            </Box>
          </Container>
        </Box>
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
              <Grid
                item
                md={6}
              >
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
                      href: 'https://help.sumologic.com/docs/get-started/quickstart/#step-1-get-your-data-into-sumo',
                    },
                    {
                      children: '2. Explore your data insights',
                      description: 'Explore your insights',
                      href: 'https://help.sumologic.com/docs/get-started/quickstart/#step-2-search-and-analyze-your-data',
                    },
                    {
                      children: '3. Monitor and secure your environment',
                      description: 'Monitor, troubleshoot, and secure your environment',
                      href: 'https://help.sumologic.com/docs/get-started/quickstart/#step-3-monitor-and-troubleshoot-your-environment',
                    },
                  ].map(({ children, ...rest }) => (
                    <Button
                      key={rest.href}
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
                      {...rest}
                    >
                      {children}
                    </Button>
                  ))}
                </Stack>
              </Grid>
              <Grid
                item
                md={6}
                pl={{
                  md: 13,
                }}
              >
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
                  key={index}
                  py={6}
                  spacing={4}
                  value={String(index)}
                >
                  {feature.map((config) => (
                    <Grid
                      item
                      key={config.link}
                      lg={4}
                      md={6}
                      xs={12}
                    >
                      <Feature
                        length={feature.length}
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
