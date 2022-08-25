---
slug: /manage/data-forwarding
title: Data Forwarding
---


Data Forwarding is not currently supported for data in the [Infrequent Tier](../partitions-and-data-tiers/data-tiers.md).

Data Forwarding allows you to forward log data to an external server or supported storage service. There are two different types of data forwarding: 

* An [Installed Collector](../../send-data/installed-collectors/about-installed-collectors.md) can forward raw log data to an external destination at ingest time using the following protocols:
    * Syslog (TCP and UDP)
    * Generic REST API
    * Hitachi Data Systems HTTP REST API

    :::note
    [Archive](../archive.md) allows you to forward log data from [Installed Collectors](../../send-data/installed-collectors/about-installed-collectors.md) to AWS S3 buckets to collect at a later time.
    :::

* [Partitions](../partitions-and-data-tiers/about-partitions.md) or [Scheduled Views](/docs/manage/scheduled-views) can forward log data to an AWS S3 bucket. See [Forwarding Data from Sumo Logic to S3](data-forwarding-to-s3.md) for details.  

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we will introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
