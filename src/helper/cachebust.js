import { randomBytes } from 'node:crypto';
import useBaseUrl from '@docusaurus/useBaseUrl';

export const cachebust = (str) => {
  const bytes = randomBytes(4).toString('hex');
	const url = new URL(useBaseUrl(str));
	const params = new URLSearchParams(url.search);

	params.append('v', bytes);

	url.search = params;

	return url.toString();
};

export default cachebust;
