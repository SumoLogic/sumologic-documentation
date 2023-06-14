---
id: infrequent-tier-data-forwarding
title: Infrequent Tier Support for Data Forwarding (Beta)
description: Learn how to forward log data in Infrequent data tier.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

Previously, data forwarding was only supported in Sumo Logic’s Continuous data tier. Now, you can forward log data from a [Partition](/docs/manage/partitions-data-tiers/) or [Scheduled View](/docs/manage/scheduled-views/) in Infrequent tier. This support helps debugging of rare issues by utilizing verbose log sources, ensuring effective troubleshooting for specific scenarios that occur infrequently.

## Infrequent data forwarding support

To enable data forwarding in the Infrequent tier, follow the steps:
1. In Sumo Logic, go to **Manage Data** > **Logs** > **Partitions**, or **Manage Data** > **Logs** > **Scheduled Views**, depending on whether you want to forward data from a Partition or a Scheduled View.
1. Click the Partition or View for which you want to enable data forwarding and click the **Edit** button. When editing, you'll see an option to **Enable Data Forwarding**. <br/> <img src={useBaseUrl('img/partitions-data-tiers/enable-infrequent.png')} alt="data-forwarding" width="400" />
1. Click **Enable Data Forwarding** checkbox.

For setting up **Forwarding destinations**, you can refer to the [Forward Data to S3](/docs/manage/data-forwarding/amazon-s3-bucket/#forward-datato-s3) section.
