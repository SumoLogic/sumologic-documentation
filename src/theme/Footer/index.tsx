/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { Fragment } from 'react';
import DocLink from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import { useThemeConfig } from '@docusaurus/theme-common';
import IconExternalLink from '@theme/Icon/ExternalLink';
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
  ListItemIcon,
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
                <ListItem sx={{ py: 0 }}>
                  <ListItemText
                    primaryTypographyProps={{
                      color: '#e3e3e3',
                      fontFamily: 'Lab Grotesque',
                      fontSize: 16,
                    }}
                  >
                    {label}
                  </ListItemText>
                  {!isInternalUrl(href) && (
                    <ListItemIcon
                      sx={{
                        minWidth: 'auto',
                        ml: 1,
                        '& svg': {
                          color: '#e3e3e3',
                        }
                      }}
                    >
                      <IconExternalLink />
                    </ListItemIcon>
                  )}
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
              color: '#e3e3e3',
              href: 'https://www.youtube.com/channel/UCI16kViradUnvH6DiQmwdqw',
              'aria-label': 'Sumo Logic YouTube',
              icon: 'faYoutube', 'aria-hidden': "true",
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
              color: '#e3e3e3',
              href: 'https://twitter.com/SumoLogic',
              'aria-label': 'Sumo Logic Twitter',
              icon: 'faTwitter', 'aria-hidden': "true",
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
