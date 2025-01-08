import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { Box, Button, Container, Grid, Stack, Tab, Tabs, Typography, Switch } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { LightMode, DarkMode } from '@mui/icons-material'; // <-- Icons
import bgImage from '../../static/img/hero-secondary-background.webp';
import heroImage from '../../static/img/hero-secondary-graphic.webp';
import SumoLogicDocsLogo from '../../static/img/sumo-logic-docs.svg';
import { Feature } from '../components/Feature';
import { features } from '../helper/features';
import ErrorBoundary from '../components/ErrorBoundary';

export const Home = () => {
  const [tab, setTab] = useState('0');

  // Track whether we're in dark mode:
  const [isDark, setIsDark] = useState(false);

  const questions = [
    '✨ timestamps',
    '✨ how do you write a log search query?',
    '✨ how do I set up alerts?',
    '✨ what types of logs can I analyze?',
    '✨ what is copilot?',
    '✨ cloud siem',
    '✨ how do I change my password?',
    '✨ what is the parse operator?'
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
          parentElementId: 'inline-berry-chatbot-container',
          // If we want to start in dark mode by default, uncomment:
          // colorMode: 'dark',
        });
      };

      script.onerror = () => console.error('Failed to load Berry widget script');
    }
  }, []);

  // Send a question to Berry:
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

  // Toggle Berry's theme on switch change:
  const handleToggle = (event) => {
    const newValue = event.target.checked; // true = dark mode, false = light mode
    setIsDark(newValue);

    if (window.Berry && window.Berry.update) {
      window.Berry.update({
        colorMode: newValue ? 'dark' : 'light'
      });
    }
  };

  return (
    <ErrorBoundary>
      <Layout
        description='Sumo Logic docs - real-time alerting, security, dashboards, and machine-learning-powered analytics for all three types of telemetry — logs, metrics, and traces.'
        title='Home'
      >
        {/* Suggested Questions */}
        <Box sx={{ width: '100%', background: '#2a2a2a', color: '#fff', py: 4 }}>
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <Box
              component={SumoLogicDocsLogo}
              alt="Sumo Logic Docs logo"
              role="<img>"
              aria-hidden="true"
              height={{
                md: 30,
                xs: 22,
              }}
              width='100%'
            />
            <Typography
              fontFamily="Lab Grotesque"
              variant='h3'
              fontSize={32}
              fontWeight={700}
              mt={2}
              mb={2}
              sx={{
                background: 'linear-gradient(90deg, #9900ED, #C04CF4, #00C8E0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Our Docs Assistant is here to help!
            </Typography>
            <Typography
              fontFamily="Lab Grotesque"
              fontSize={13}
              fontWeight={300}
              mb={2}
            >
              Ask me anything! You can type full questions, sentences, or just keywords, and I'll help you find the information you need. Try these to get started:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              flexWrap="wrap"
              rowGap={1}
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
                    fontSize: '13px',
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
            <Box
              id="inline-berry-chatbot-container"
              sx={{ my: 4, p: 2, margin: '0 auto', textAlign: 'center' }}
            >
              {/* Berry chatbot will render here */}
            </Box>

            {/* Light/Dark Toggle Switch with icons */}
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              {/* Label: Light */}
              <Typography variant="body2" color="#fff">
                Light
              </Typography>
              <Switch
                checked={isDark}
                onChange={handleToggle}
                color="default"
                // Sun icon when off (light), moon icon when on (dark)
                icon={<LightMode />}      // Unchecked icon
                checkedIcon={<DarkMode />} // Checked icon
              />
              {/* Label: Dark */}
              <Typography variant="body2" color="#fff">
                Dark
              </Typography>
            </Stack>
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
                ].map(({ label }, index) => (
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
              {features.map((feature, index) => (
                tab === String(index) && (
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
                )
              ))}
            </TabContext>
          </Stack>
        </Container>
      </Layout>
    </ErrorBoundary>
  );
};

export default Home;
