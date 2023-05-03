---
slug: /manage/data-archiving
title: Data Archiving
description: Data Archiving allows you to archive selected data to an external server or Amazon S3.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/send-data.png')} alt="icon" width="50"/>

Archive allows you to forward log data from Installed Collectors to AWS S3 buckets to collect at a later time. If you have logs that you don't need to search immediately you can archive them for later use. You can ingest from your Archive on-demand with five-minute granularity.  

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
  <div className="box smallbox1 card">
    <div className="container">
      <a href="/docs/manage/data-archiving/archive">
        <img src={useBaseUrl('img/icons/operations/send-data.png')} alt="Thumbnail icon" width="45" />
        <h4>Archive Log Data to S3</h4>
      </a>
      <p>Learn to archive data to S3 for future ingestion and retrieval.</p>
    </div>
  </div>
  <div className="box smallbox2 card">
    <div className="container">
      <a href="/docs/manage/data-archiving/installed-collectors">
        <img src={useBaseUrl('img/icons/operations/send-data.png')} alt="Thumbnail icon" width="45" />
        <h4>Archive Log Data to other destinations</h4>
      </a>
      <p>Learn how to set up Data Archiving destinations.</p>
    </div>
  </div>
</div>
