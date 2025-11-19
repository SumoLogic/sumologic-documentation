---
id: collection-overview
title: Collection Overview
sidebar_label: Collection Overview
description: Monitor all the collectors associated with the child orgs in single interface.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Collection Overview page provides a centralized view of all child org level collectors within your parent org. It enables all parent users to monitor collectors (Installed, Hosted, and OpenTelemetry) and sources across each child organization from a single interface. Additionally, this also helps you to identify and review collector health events, including stopped or inactive collectors.

To view collector details at the child org level, perform the following steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu select **Organizations**, and then select **Collection Overview**. You can also click the **Go To...** menu at the top of the screen and select **Collection Overview**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Organizations > Collection Overview**. <br/><img src={useBaseUrl('img/manage/subscriptions/collection-overview.png')} alt="collection-overview" style={{border: '1px solid gray'}} width="800" />
2. Navigate to **Collection** tab to view details of Installed and Hosted collectors or navigate to **OT Collection** tab view details of OpenTelemetry collectors associated with the child orgs.
    - **Collection**. Displays the total number of collectors and sources associated with the child orgs. Additionally, includes insights into the health events and stopped installed collectors for the respective child orgs level.
    - **OT Collection**. Displays the total number of collectors and source templates associated with the child orgs. Additionally, includes insights into the health events and stopped installed collectors for the respective child orgs level.

To drill down into a specific child org's details directly from the Collection Overview page, select **Open Organization** from the kebab menu for the selected collector. <br/><img src={useBaseUrl('img/manage/subscriptions/drill-down-open-organization.png')} alt="drill-down-open-organization" style={{border: '1px solid gray'}} width="800" />