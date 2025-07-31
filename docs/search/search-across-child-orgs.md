---
id: search-across-child-orgs
title: Search Across Child Orgs (MSSPs)
description: Learn how to perform the search for the selected child org.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
 <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::info
This feature is in Beta. For more information, contact your Sumo Logic account executive.
:::

You can run a log search query in the selected child org under a parent org. All the results obtained from this search will have the data identified from the selected child org.

Follow the steps below to perform a child org-level search:

1. **Classic UI.** Go to the **Log Search** page.
	**New UI.** In the main Sumo Logic menu, select **Logs** > **Log Search**. You can also click the **Go To...** menu at the top of the screen and select **Log Search**.
1. Click the <img src={useBaseUrl('img/search/get-started-search/search-page/child-org-select-button.png')} alt="child-org-select-button" style={{border: '1px solid gray'}} width="30"/>    button to select the child org where you want to query. <br/><img src={useBaseUrl('img/search/get-started-search/search-page/child-org-dropdown.png')} alt="child-org-dropdown" style={{border: '1px solid gray'}} width="800"/>   
1. Enter the required query and click the search button to obtain the search results.

:::note
- We only support selecting *one* child org to perform the log search.
- All the searches that run via the child org in the parent org would be billed under the child org account.
- Currently, this search capability is limited only to **Log Search**.
- Audit logs for the completed searches would appear under the child org logs.
:::

For more information about the Log Search, refer to [Search Basics](/docs/search/get-started-with-search/search-basics/).
