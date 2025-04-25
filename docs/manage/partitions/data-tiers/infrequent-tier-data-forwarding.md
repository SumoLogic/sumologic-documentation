---
id: infrequent-tier-data-forwarding
title: Infrequent Tier Support for Data Forwarding (Beta)
description: Learn how to forward log data in the Infrequent data tier.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

Previously, data forwarding was only supported in Sumo Logic’s Continuous data tier. Now, you can forward log data from a [Partition](/docs/manage/partitions/) or [Scheduled View](/docs/manage/scheduled-views/) in Infrequent Tier. This support helps debugging of rare issues by utilizing verbose log sources, ensuring effective troubleshooting for specific scenarios that occur infrequently.

## Infrequent data forwarding support

To enable data forwarding in the Infrequent Tier, follow the steps:
1. Depending on whether you want to forward data from a Partition or a Scheduled View: 
    * Partition: <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. 
    * Scheduled View: <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Scheduled Views**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**. 
1. Click the Partition or View for which you want to enable data forwarding and click the **Edit** button. When editing, you'll see an option to **Enable Data Forwarding**. <br/> <img src={useBaseUrl('img/manage/partitions-data-tiers/enable-infrequent.png')} alt="data-forwarding" width="400" />
1. Click **Enable Data Forwarding** checkbox.

For setting up **Forwarding destinations**, you can refer to the [Forward data to an S3 forwarding destination](/docs/manage/data-forwarding/amazon-s3-bucket/#forward-datato-an-s3-forwarding-destination) section.
