---
slug: /manage/data-forwarding
title: Data Forwarding
description: Data Forwarding allows you to forward selected data to an external server or Amazon S3.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/send-data.png')} alt="icon" width="50"/>

Data Forwarding is not currently supported for data in the [Infrequent Tier](../partitions-data-tiers/data-tiers.md).

You can forward log data to an AWS S3 bucket through [Partitions](/docs/manage/partitions-data-tiers) or [Scheduled Views](/docs/manage/scheduled-views). See [Forwarding Data from Sumo Logic to S3](amazon-s3-bucket.md) for details.

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
  <div className="box smallbox1 card">
    <div className="container">
      <a href="/docs/manage/data-forwarding/amazon-s3-bucket">
        <img src={useBaseUrl('img/icons/operations/send-data.png')} alt="Thumbnail icon" width="45" />
        <h4>Forward Data from Sumo Logic to S3</h4>
      </a>
      <p>Learn step-by-step instructions of data forwarding from Sumo Logic to S3.</p>
    </div>
  </div>
  <div className="box smallbox2 card">
    <div className="container">
      <a href="/docs/manage/data-forwarding/manage">
        <img src={useBaseUrl('img/icons/operations/send-data.png')} alt="Thumbnail icon" width="45" />
        <h4>Manage Data Forwarding</h4>
      </a>
      <p>View, edit, delete, activate, and deactivate data forwarding destinations.</p>
    </div>
  </div>
  </div>
