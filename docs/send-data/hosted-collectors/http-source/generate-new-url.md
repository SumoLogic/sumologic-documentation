---
id: generate-new-url
title: Generate a New URL for an HTTP Source
sidebar_label: Regenerate URL
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can generate a new URL for an HTTP Source at any time. Generating a new URL completely invalidates the old URL.

To generate a new URL:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the **Manage Collection** page, click **Regenerate URL** next to the HTTP source.<br/> <img src={useBaseUrl('img/send-data/regenerate-url.png')} alt="HTTPregenURL"/>
1. In the **HTTP Source Address** dialog box, click **Generate**.<br/> <img src={useBaseUrl('img/send-data/generate-new-url.png')} alt="http_source_dialog_generate.png" width="350"/>
1. When asked to confirm the generation, click **OK**.
1. In the **HTTP Source Address** dialog box, the new URL is displayed. Copy and paste the URL, then click **OK**.<br/> <img src={useBaseUrl('img/send-data/http_source_dialog_with_button.png')} alt="http_source_dialog_generate.png" width="350"/>

:::note
If you see a 401 (failed to authenticate) error message right after generating a new URL, wait a few minutes, then try the new URL again.
:::
