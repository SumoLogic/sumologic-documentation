import React, { useEffect } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import redirects from '../../../cid-redirects.json';

export default function CIDRedirect() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Match /cid/<anything-not-slash>
    const match = location.pathname.match(/^\/cid\/([^/?#]+)/);
    const cid = match?.[1];
    const target = cid ? redirects[`/cid/${cid}`] : null;

    if (!target) {
      history.replace('/404');
      return;
    }

    // If it's an absolute URL, hand off to the browser (preserves hash/query)
    if (/^https?:\/\//i.test(target)) {
      window.location.replace(target);
      return;
    }

    // Build a URL relative to the current origin so we can split pathname/search/hash
    const url = new URL(target, window.location.origin);

    // React Router-compatible object — keeps #hash and ?query intact
    history.replace({
      pathname: url.pathname,
      search: url.search, // includes leading '?'
      hash: url.hash,     // includes leading '#'
    });
  }, [location, history]);

  return null;
}