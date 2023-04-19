---
id: share-message-link
title: Share a Message Link to a Search
description: Share a message link to search query results. Copy and paste the a message link to share a search on table.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

:::important
Search results might vary depending on each user's permissions.
:::

Sumo Logic enables you to share links to specific messages in the search table. This is an extended functionality of the [Share a link to search](/docs/search/get-started-with-search/search-basics/share-link-to-search/) feature.

You can share a link to a specific message in the Sumo Logic search table, which allows you to quickly and easily share important information. To share a message link to a search, after your query has run, click **Messages** tab beneath the search query box.

This link will be available for three years after it is created. 

To share a message link to a search:

1. Run a search you'd like to share.
2. Once the search results are generated, navigate to the **Messages** tab. <br/> <img src={useBaseUrl('/img/search/get-started-search/search-basics/copy-message.png')} alt="copy-message" width="900"/>
3. Find the message you want to share and right-click on it. Then, select **Copy Link to Message**. <br/> <img src={useBaseUrl('/img/search/get-started-search/search-basics/select-message.png')} alt="icon" width="800"/>
4. You will see a notification at the bottom left of the page after the message link has been copied. <br/> <img src={useBaseUrl('/img/search/get-started-search/search-basics/message-notification.png')} alt="icon" width="300"/>.
5. You can now paste the link to the message on any platform to share it with others.
6. The message you shared will be highlighted in the search table. <br/> <img src={useBaseUrl('/img/search/get-started-search/search-basics/highlighted-message.png')} alt="icon" width="900"/>

## Limitation

 Note that only the first 100,000 messages will be included in your search results. If your time range includes more than 100,000 messages, it's possible that your source message may not be highlighted in the returned results. If you lose your place, you can click **Show Original Message** to return to the highlighted message.
