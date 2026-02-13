---
id: generate-new-url
title: Generate a New URL for an HTTP Source
sidebar_label: Regenerate URL
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can generate a new URL for an HTTP Source at any time. Generating a new URL completely invalidates the old URL. 

Sumo Logic offers secure token-based authentication for the HTTPS Logs and Metrics Source. This capability allows you to authenticate using a unique token in the request header, maintaining the existing HTTPS endpoint behavior while adding token validation per source. Obtain the token to use in an auth header when you configure an HTTP source or regenerate the URL.

To generate a new URL:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the **Manage Collection** page, click **Regenerate URL** next to the HTTP source.<br/><img src={useBaseUrl('img/send-data/regenerate-url.png')} alt="Regenerate URL link" style={{border: '1px solid gray'}} width="800" />
1. In the **HTTP Source Address** dialog box, select one of the following to regenerate the URL where the source data will be stored:
   * **Presigned URL**. Select to copy a presigned URL with embedded authentication.<br/><img src={useBaseUrl('img/send-data/generate-new-url-new.png')} alt="Generate New URL" style={{border: '1px solid gray'}} width="600"/>
   * **Auth Header**. Select to copy the URL, as well as a separate authorization header that contains an authentication token. This option provides greater security than a presigned URL because placing the authentication token in the authorization header of a request prevents the token from being exposed in the URL.<br/><img src={useBaseUrl('img/send-data/generate-new-url-and-token.png')} alt="Generate New URL and token" style={{border: '1px solid gray'}} width="600"/>
1. Click **Generate**.
1. When asked to confirm the generation, click **OK**.
1. In the resulting dialog box, the newly-generated URL is displayed, as well as the authorization header if you selected **Auth Header**. Copy the URL (and header if applicable) and keep in a safe place. 
1. Use the copied URL (and header if appropriate) when you [upload data to your HTTP Logs and Metrics source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#upload-data-to-the-httplogs-and-metrics-source).

:::note
If you see a 401 (failed to authenticate) error message right after generating a new URL, wait a few minutes, then try the new URL again.
:::
