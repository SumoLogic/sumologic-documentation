/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Fragment } from 'react';
import DocLink from '@docusaurus/Link';
import { useThemeConfig } from '@docusaurus/theme-common';
import {
  FontAwesomeIcon,
} from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
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
        direction={{
          md: 'row',
          xs: 'column',
        }}
        justifyContent='space-between'
        py={{
          md: 0,
          xs: 4,
        }}
      >
        <Stack
          alignItems='center'
          direction='row'
          spacing={2}
          pb={{
            md: 0,
            xs: 2,
          }}
        >
          {[
            {
              alt: 'Sumo Logic YouTube',
              color: 'common.white',
              href: 'https://www.youtube.com/channel/UCI16kViradUnvH6DiQmwdqw',
              icon: faYoutube,
              size: 'lg',
              sx: {
                cursor: 'pointer',
                '&:hover': {
                  color: '#0045BE',
                },
              }
            },
            {
              alt: 'Sumo Logic Twitter',
              color: 'common.white',
              href: 'https://twitter.com/SumoLogic',
              icon: faTwitter,
              size: 'lg',
              sx: {
                cursor: 'pointer',
                '&:hover': {
                  color: '#0045BE',
                },
              }
            },
          ].map(({ alt, href, ...other }) => (
            <Tooltip key={href} title={alt}>
              <Link rel='noreferrer noopener'>
                <Box
                  component={FontAwesomeIcon}
                  {...other}
                />
              </Link>
            </Tooltip>
          ))}
        </Stack>
        <Stack
          alignItems='center'
          direction={{
            md: 'row',
            xs: 'column',
          }}
          spacing={{
            md: 2,
            xs: 0.5,
          }}
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
              <Fragment key={href}>
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
              </Fragment>
            ))}
          {copyright && (
            <Typography
              color='#6c7993'
              fontFamily='Lab Grotesque'
              fontSize={14}
              pt={{
                md: 0,
                xs: 1,
              }}
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
