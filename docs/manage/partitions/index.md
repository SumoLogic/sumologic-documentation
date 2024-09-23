---
slug: /manage/partitions
title: Partitions
description: Partitions speed the search process by allowing an Admin to filter a subset of the log messages in an index.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

Creating a partition enhances search performance by narrowing down the search scope to a smaller subset of messages. Use the Partitions page to set up and manage partitions. 

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To access the Partitions page, in the main Sumo Logic menu select **Manage Data > Logs > Partitions**. 

[**New UI**](/docs/get-started/sumo-logic-ui/). To access the Partitions page, in the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**. 
 

A partition stores your data in an index separate from the rest of your account's data so you can [optimize searches](../../search/optimize-search-performance.md), [manage variable retention](manage-indexes-variable-retention.md), and specify certain [data to forward to S3](../data-forwarding/amazon-s3-bucket.md).

:::note
Data stored in a partition is not stored anywhere else. 
:::

## About Partitions

Partitions route your data to an index becoming a separate subset of data in your account. Creating smaller and separate subsets of data is central to search optimization. When you run a search against an index, results are returned more quickly and efficiently because the search runs against a smaller data set.

After routing messages to a partition, you can reference it in your search by using the field `_index` with the partition's name. See [Optimizing Search with Partitions](/docs/search/optimize-search-partitions) for details.

Partitions ingest your messages in real time. They differ from scheduled views in that partitions don’t backfill with aggregate data. They begin building a non-aggregate index from the time the partition is created and index only the data moving forward. Scheduled views backfill with aggregate data, meaning that all data that extends back to the start date of the view query is added to the view.

You define the data that will reside in a partition by defining a routing expression, which is similar to a log query, but with certain restrictions in terms of the operators you can include. Each partition's routing expression is applied to all messages as they are ingested to Sumo Logic. If a message matches the partition’s routing expression, it is added to the partition.

## Micro Lesson: Partitions Basics

<Iframe url="https://www.youtube.com/embed/kpQLFVT4uE8"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />


## Limitations 

* There is a limit of 50 partitions per account. (This excludes [decommissioned partitions](decommission-partition.md).)
* Partitions cannot be deleted, although you can [decommission](decommission-partition.md) them. This is because a partition may include log messages that aren’t stored anywhere else, so if it’s deleted, messages will be lost. If you no longer need a partition, you can decommission it.
* Partition names cannot start with `sumologic_` or an underscore `_`.
* Partition routing rule length cannot exceed 2048 characters.

## Guides

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/partitions/run-search-against-partition"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Search a Partition</h4></a>
  <p>Learn how to run a search against data in a Partition.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/partitions/edit-data-forwarding-destinations-partition"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Edit Data Forwarding Destinations for a Partition</h4></a>
  <p>Learn how to specify Data Forwarding settings for a Partition.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/partitions/manage-indexes-variable-retention"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Manage Indexes with Variable Rentention</h4></a>
  <p>Learn how to create Index Partitions and Scheduled Views to store your data.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href="/docs/manage/partitions/decommission-partition"><img src={useBaseUrl('img/icons/logs.png')} alt="icon" width="40"/><h4>Decommission a Partition</h4></a>
  <p>Learn how to decommission a Partition to keep it from being started.</p>
  </div>
</div>
</div>

