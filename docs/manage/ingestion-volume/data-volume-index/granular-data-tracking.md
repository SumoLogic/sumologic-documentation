---
id: granular-data-tracking
title: Granular Data Tracking (Beta)
description: Learn about Granular Data Tracking and how to disable and enable Granular Data Tracking.
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href="/docs/beta"><span className="beta">Closed Beta</span></a></p>

Granular Data Tracking is a part of usage management that allows you to proactively manage your systems’ behavior and to fine tune your data ingest with respect to the data plan for your Sumo Logic subscription. This should be manually enabled by an administrator if you are a user of Credits package accounts and this will be enabled by default for Flex package accounts. A set of messages within the index is created every five minutes. The data does not backfill and is provided to the index only when the option is enabled.

## Enable/Disable Granular Data Tracking

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Account**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account** select **Account Overview**. You can also click the **Go To...** menu at the top of the screen and select **Account Overview**. 
1. Click the gear icon <img src={useBaseUrl('/img/manage/account/gear-icon-accounts-page.png')} alt="gear-icon-accounts-page" width="40"/> in the top left panel of the **Account Overview** page.
1. Click **Enable Granular Data Tracking** or **Disable Granular Data Tracking**.<br/><img src={useBaseUrl('/img/manage/account/disable-granular-data-tracking.png')} alt="Disable Granular Data Tracking" style={{border:'1px solid gray'}} width="700"/> 