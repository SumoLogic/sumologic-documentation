---
id: macro-beta
title: Macro Recommendations (Beta)
sidebar_label: Macro recommendations
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

<!-- Originally added as a beta article with DOCS-545. -->

Macro recommendations are automatically generated based on the most frequently run queries within your organization. By converting these recommended queries into macros, you can streamline repetitive tasks and improve overall efficiency.

:::note
Users with the **View Macro** capability can only view macro recommendations. To accept (**+ Add Macro**) or reject a recommendation, you must have the **Manage Macro** capability.
:::

Follow the below steps to view the macro recommendations:

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Data Management**, and then under **Logs**, select **Macros**. You can also click the **Go To...** menu at the top of the screen and select **Macros**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Logs** > **Macros**. 
1. Click on the <img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-recommendations-button.png')} alt="macro-recommendations-button"  width="30" /> button to open the **Macro Recommendation** page. This page displays recommendations based on most frequently run queries in your org. <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-recommendations.png')} alt="macro-recommendations" style={{border: '1px solid gray'}} width="600" />
    1. Click **Reject** to remove a macro recommendation from the list.
    1. Click **+ Add Macro** to accept the macro recommendation. You will be redirected to **Create Macro** page, where you can follow the instruction in the [Add a macro](/docs/manage/macro#add-a-macro) section to complete the macro creation process.