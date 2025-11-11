import React, { useEffect } from 'react';
import { useParams, useHistory } from '@docusaurus/router';
import redirects from '../../../cid-redirects.json';

export default function CIDRedirect() {
  const { cid } = useParams();
  const history = useHistory();

  useEffect(() => {
    const target = redirects[`/cid/${cid}`];

    if (target) {
      history.replace(target);
    } else {
      history.replace('/404');
    }
  }, [cid]);

  return null;
}
