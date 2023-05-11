---
slug: /manage/partitions-data-tiers
title: Partitions and Data Tiers
description: Partitions speed the search process by allowing an Admin to filter a subset of the log messages in an index.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

Creating a partition allows you to improve search performance by searching over a smaller number of messages. Use the Partitions page to set up and manage partitions. To access the Partitions page, go to **Manage Data** > **Logs** > **Partitions**.

![partitions-page.png](/img/partitions-data-tiers/partitions-page.png)

A partition stores your data in an index separate from the rest of your account's data so you can [optimize searches](../../search/optimize-search-performance.md), [manage variable retention](manage-indexes-variable-retention.md), and specify certain [data to forward to S3](../data-forwarding/amazon-s3-bucket.md).

:::note
Data stored in a partition is not stored anywhere else. 
:::

Partitions route your data to an index becoming a separate subset of data in your account. Creating smaller and separate subsets of data is central to search optimization. When you run a search against an index, results are returned more quickly and efficiently because the search runs against a smaller data set.

After routing messages to a partition, you can reference it in your search by using the field `_index` with the partition's name. See [Optimizing Search with Partitions](/docs/search/optimize-search-partitions) for details.

Partitions ingest your messages in real time. They differ from scheduled views in that partitions don’t backfill with aggregate data. They begin building a non-aggregate index from the time the partition is created and index only the data moving forward. Scheduled views backfill with aggregate data, meaning that all data that extends back to the start date of the view query is added to the view.

You define the data that will reside in a partition by defining a routing expression, which is similar to a log query, but with certain restrictions in terms of the operators you can include. Each partition's routing expression is applied to all messages as they are ingested to Sumo Logic. If a message matches the partition’s routing expression, it is added to the partition.

## Limitations 

* To create and manage partitions, you must be an Admin or you must have the Manage Partitions [role capability](../users-roles/roles/role-capabilities.md). 
* There is a limit of 50 partitions per account.
* You can make the following edits to an existing partition:
   * You can change the routing expression, unless the partition is decommissioned.
* You cannot make the following changes to a partition: 
   * You can’t change or reuse a partition name.
   * You can’t change the data tier the partition resides in.
* Partitions cannot be deleted, although you can [decommission](decommission-partition.md) them. This is because a partition may include log messages that aren’t stored anywhere else, so if it’s deleted, messages will be lost. If you no longer need a partition, you can decommission it.
* Partition names cannot start with `sumologic_` or an underscore `_`. 

## Micro Lesson: Partitions Basics

<Iframe url="https://www.youtube.com/embed/kpQLFVT4uE8"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

## Guides

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/manage/partitions-data-tiers/create-edit-partition"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Create and Edit a Partition</h4></a>
  <p>Learn how to create and edit a Partition in an Index.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/manage/partitions-data-tiers/view-partition-details"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>View Details About a Partition</h4></a>
  <p>Learn how to view details about a Sumo Logic Partition.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/manage/partitions-data-tiers/run-search-against-partition"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Search a Partition</h4></a>
  <p>Learn how to run a search against data in a Partition.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/manage/partitions-data-tiers/edit-data-forwarding-destinations-partition"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Edit Data Forwarding Destinations for a Partition</h4></a>
  <p>Learn how to specify Data Forwarding settings for a Partition.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/manage/partitions-data-tiers/manage-indexes-variable-retention"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Manage Indexes with Variable Rentention</h4></a>
  <p>Learn how to create Index Partitions and Scheduled Views to store your data.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/manage/partitions-data-tiers/decommission-partition"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Decommission a Partition</h4></a>
  <p>Learn how to decommission a Partition to keep it from being started.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/manage/partitions-data-tiers/data-tiers"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Data Tiers</h4></a>
  <p>Get to know about Sumo Logic's Data Tiers feature.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/manage/partitions-data-tiers/data-tiers-faqs">  <img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Data Tiers FAQs</h4></a>
  <p>Get answers on various FAQs about Data Tiers.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/manage/partitions-data-tiers/searching-data-tiers"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Searching Data Tiers</h4></a>
  <p>Learn how to search specific Data Tiers.</p>
  </div>
</div>
</div>
