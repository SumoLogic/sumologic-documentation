import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  Box,
  Link,
  Stack,
  Typography,
} from '@mui/material';

export const Feature = ({
  description,
  length = 1,
  imageUrl,
  link,
  title,
}) => {
  const imgUrl = useBaseUrl(imageUrl);

  return (
    <Stack
      direction='row'
      spacing={2}
    >
      {imgUrl && (
        <Box
          alt={title}
          component='img'
          height={48}
          src={imgUrl}
          width={48}
        />
      )}
      <Box>
        <Link
          href={link}
          underline='hover'
        >
          <Typography
            color='var(--ifm-color-primary)'
            fontFamily='Lab Grotesque'
            fontSize={18}
            fontWeight={900}
          >
            {title}
          </Typography>
        </Link>
        <Typography
          fontFamily='Lab Grotesque'
        >
          {description}
        </Typography>
      </Box>
    </Stack>
  );
};
