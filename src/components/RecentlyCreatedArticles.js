import React from 'react';
import Link from '@docusaurus/Link';
import { Box, Typography } from '@mui/material';
import recentCreated from '@generated/recent-docs-plugin/default/recent-created.json';

export default function RecentlyCreatedArticles() {
  return (
    <Box>
      <Typography
        component="h2"
        fontFamily="Lab Grotesque"
        fontSize={15}
        fontWeight={700}
        letterSpacing="0.08em"
        mb={1.5}
        pb={0.75}
        sx={{
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          color: 'text.secondary',
          textTransform: 'uppercase',
        }}
      >
        Recently Created Articles
      </Typography>

      {!recentCreated?.length ? (
        <Typography color="text.secondary" fontSize={14}>
          No recently created articles found.
        </Typography>
      ) : (
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {recentCreated.map((doc) => (
            <Box
              component="li"
              key={doc.id}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'grey.100',
                display: 'flex',
                flexDirection: 'column',
                py: 0.75,
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Link
                to={doc.path}
                style={{
                  color: 'inherit',
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  textDecoration: 'none',
                }}
              >
                {doc.title}
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}