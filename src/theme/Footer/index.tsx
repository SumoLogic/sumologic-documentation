/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import DocLink from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import { Stack } from '@mui/system';
import {
  Box,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

export const Footer = () => {
  const { footer } = useThemeConfig();
  const { copyright, links = [] } = footer ?? {};

  if (!footer) {
    return null;
  }

  return (
    <>
      <Grid
        bgcolor='#1A273F'
        component='footer'
        container
        justifyContent='center'
        mt={10}
        px={1}
        gap={6}
      >
        {!!links.length && links.map((category) => (
          <Grid
            item
            component={List}
            key={category.title}
            py={4}
            md='auto'
            xs={12}
          >
            <ListSubheader
              sx={{
                bgcolor: 'transparent',
                color: '#6c7993',
                fontFamily: 'Lab Grotesque',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.1rem',
              }}
            >
              {category.title}
            </ListSubheader>
            {category.items.map(({ href, label }) => (
              <Link
                component={DocLink}
                href={href}
                key={href}
                underline='none'
              >
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{
                      color: 'common.white',
                      fontFamily: 'Lab Grotesque',
                      fontSize: 14,
                    }}
                  >
                    {label}
                  </ListItemText>
                </ListItem>
              </Link>
            ))}
          </Grid>
        ))}
      </Grid>
      <Stack
        alignItems='center'
        bgcolor='#1A273F'
        borderTop='1px solid'
        borderColor='rgba(255,255,255,0.12)'
        component={Toolbar}
        direction='row'
        justifyContent='space-between'
      >
        <Stack
          alignItems='center'
          direction='row'
          spacing={2}
        >
          {[
            {
              alt: 'Sumo Logic YouTube',
              href: 'https://www.youtube.com/channel/UCI16kViradUnvH6DiQmwdqw',
              src: '/img/youtube-logo.png',
              width: 28,
            },
            {
              alt: 'Sumo Logic Twitter',
              href: 'https://twitter.com/SumoLogic',
              src: '/img/twitter-logo.png',
              width: 25,
            },
          ].map(({ alt, href, ...other }) => (
            <Tooltip title={alt}>
              <Link rel='noreferrer noopener'>
                <Box
                  alignItems='center'
                  alt={alt}
                  component='img'
                  display='flex'
                  {...other}
                />
              </Link>
            </Tooltip>
          ))}
        </Stack>
        <Stack
          alignItems='center'
          direction='row'
          spacing={2}
        >
          {[
            {
              label: 'Legal',
              href: 'https://www.sumologic.com/legal/',
            },
            {
              label: 'Privacy Statement',
              href: 'https://www.sumologic.com/privacy-statement/',
            },
            {
              label: 'Terms of Use',
              href: 'https://www.sumologic.com/terms-conditions/',
            }].map(({ href, label }) => (
              <>
                <Link
                  color='#6c7993'
                  fontFamily='Lab Grotesque'
                  fontSize={14}
                  href={href}
                >
                  {label}
                </Link>
                <Divider
                  flexItem
                  orientation='vertical'
                  sx={{
                    bgcolor: '#6c7993',
                    '&:last-of-type': {
                      display: {
                        md: 'block',
                        sm: 'none',
                        xs: 'none',
                      }
                    },
                  }}
                />
              </>
            ))}
          {copyright && (
            <Typography
              color='#6c7993'
              display={{
                md: 'block',
                sm: 'none',
                xs: 'none'
              }}
              fontFamily='Lab Grotesque'
              fontSize={14}
            >
              {copyright}
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default React.memo(Footer);
