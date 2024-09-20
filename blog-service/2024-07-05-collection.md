---
title: Upgrade Salesforce Source to Version 3.X.X (Collection)
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - collection
  - salesforce
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-service/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>

We're excited to announce the release of our new Salesforce Version 3.X.X source, which provides an upgraded authorization method to client credentials flow.

If you have the Salesforce source set up and choose to upgrade it, follow the instructions below to update your source configuration:

### Vendor configuration

1. Log in to the Salesforce platform.
1. From the left side menu, navigate to **Build** > **Create** > **Apps**.
1. Under the **Connected Apps** section, find your connected app and click **Edit**.
1. Click the **Enable Client Credentials Flow** checkbox under **API (Enable OAuth Settings)**.
1. If prompted, accept the warning once you understand the security risks and click **Save**.
1. Navigate back to **Build** > **Create** > **Apps** in the left side menu.
1. Find your connected app and click **Manage**. ([Learn more](https://help.salesforce.com/s/articleView?id=sf.connected_app_client_credentials_setup.htm&type=5)).
1. Click **Edit Policies**.
1. Under **Client Credentials Flow**, go to the **Run As** dropdown and click the search button. Find the user that you want to assign the client credentials flow.
    :::note
    For Enterprise Edition orgs, we recommend selecting an execution user who has the API Only User permission.
    :::
1. Click **Save** to save your changes.

### Source configuration

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. Search for the required source and click the **Upgrade** button.<img src={useBaseUrl('img/release-notes/service/upgrade-source.png')} alt="upgrade-source" style={{border:'1px solid gray'}} width="800"/>
1. You will be directed to the configuration page. Ensure you do not change any of the configurations set.
1. Click **Upgrade** at the bottom of the configuration page.
