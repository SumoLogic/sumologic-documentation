---
slug: /manage/data-forwarding
title: Data Forwarding
description: Data Forwarding allows you to forward selected data to an external server or Amazon S3.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Data Forwarding allows you to forward log data to an external server or supported storage service. There are two different types of data forwarding: 

* An [Installed Collector](/docs/send-data/installed-collectors) can forward raw log data to an external destination at ingest time using the following protocols:
   * Syslog (TCP and UDP)
   * Generic REST API
   * Hitachi Data Systems HTTP REST API
    :::note
    [Archive](../archive.md) allows you to forward log data from [Installed Collectors](/docs/send-data/installed-collectors) to AWS S3 buckets to collect at a later time.
    :::
* [Partitions](/docs/manage/partitions-data-tiers) or [Scheduled Views](/docs/manage/scheduled-views) can forward log data to an AWS S3 bucket. See [Forwarding Data from Sumo Logic to S3](amazon-s3-bucket.md) for details.
* Data Forwarding is not currently supported for data in the [Infrequent Tier](../partitions-data-tiers/data-tiers.md).

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/manage/data-forwarding/installed-collectors"><img src={useBaseUrl('img/icons/operations/send-data.png')} alt="icon" width="40"/><h4>Forward Data from an Installed Collector</h4></a>
  <p>Learn how to set up Data Forwarding destinations for Installed Collectors.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/manage/data-forwarding/amazon-s3-bucket"><img src={useBaseUrl('img/icons/operations/send-data.png')} alt="icon" width="40"/><h4>Forwarding Data from Sumo Logic to S3</h4></a>
  <p>Learn how to forward data from Sumo Logic to an S3 bucket.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/manage/data-forwarding/manage"><img src={useBaseUrl('img/icons/operations/send-data.png')} alt="icon" width="40"/><h4>Manage Data Forwarding</h4></a>
  <p>Learn how to view, edit, or delete a Data Forwarding destination.</p>
  </div>
</div>
</div>
