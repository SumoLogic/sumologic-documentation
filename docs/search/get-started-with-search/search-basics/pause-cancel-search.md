---
id: pause-cancel-search
title: Pause or Cancel a Search
description: Pause a running search to hold its progress, or cancel it to stop and free resources, using the controls that appear while a search is in progress.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When a search is taking too long, or you want to check its progress, you can pause or cancel it. Canceling stops the search entirely so you can revise your query. Pausing lets you check timestamps in the **Messages** tab to see how much data has been searched so far.

After you start a log search, the **Log Search** page updates to show **Pause** and **Cancel** options.

<img src={useBaseUrl('img/search/get-started-search/build-search/pause-cancel-search.png')} alt="Pause and cancel" style={{border: '1px solid gray'}} width="300" />

## Pause a search

Search always retrieves and displays messages in reverse chronological order. Results are found walking backward in time from your most current data and progressing through older data. So, if you pause a search, you can check the timestamps for the messages in the **Messages** tab. If you reverse the sort order of the messages so that the oldest message is at the top, then all messages with more recent timestamps have been retrieved and processed.

You can resume a paused search; just click **Resume** under the **Start** button.

:::note
The maximum time you can pause a search is 30 minutes. If you do not resume the search within that time, it is automatically cancelled.
:::

### Cancel a search

When you cancel a search, you are stopping all progress on the current search and removing all results. Your query remains in the search query field.
