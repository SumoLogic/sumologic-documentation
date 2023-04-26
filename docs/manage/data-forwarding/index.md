---
slug: /manage/data-forwarding
title: Data Forwarding
description: Data Forwarding allows you to forward selected data to an external server or Amazon S3.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/send-data.png')} alt="icon" width="50"/>

Data Forwarding is not currently supported for data in the [Infrequent Tier](../partitions-data-tiers/data-tiers.md).

Data Forwarding allows you to forward log data to an external server or supported storage service. There are two different types of data forwarding: 

* An [Installed Collector](/docs/send-data/installed-collectors) can forward raw log data to an external destination at ingest time using the following protocols:
    * Syslog (TCP and UDP)
    * Generic REST API
    * Hitachi Data Systems HTTP REST API

    :::note
    [Archive](../archive.md) allows you to forward log data from [Installed Collectors](/docs/send-data/installed-collectors) to AWS S3 buckets to collect at a later time.
    :::

* [Partitions](/docs/manage/partitions-data-tiers) or [Scheduled Views](/docs/manage/scheduled-views) can forward log data to an Amazon S3 bucket. See [Forwarding Data from Sumo Logic to S3](amazon-s3-bucket.md) for details.  

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
