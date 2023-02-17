---
slug: /send-data/hosted-collectors
title: Hosted Collectors
description: Hosted Collectors allow you to upload data stored in the cloud to Sumo Logic. You can configure Sources for Collectors that are hosted in Amazon Web Services (AWS), Microsoft, or other hosting services.
tags: [hosted collectors]
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
import Iframe from 'react-iframe';

With a **Hosted Collector**, Sumo Logic hosts the Collector and its Sources on our end (in AWS). No need to install it on a local system in your deployment. You can create Sources to collect data from a variety of services. A single Hosted Collector can be configured with any number of Sources.

Data collection flow for S3 buckets and HTTP requests:<br/>![team built hosted diagram.png](/img/send-data/team-built-hosted-diagram.png)

Just as Installed Collectors, you can monitor the activity of Hosted Collectors using the Status tab.

:::note
The maximum number of Collectors allowed per organization is 10,000.
:::

## Guides

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>


## Micro Lesson: Hosted Collector Overview

<Iframe url="https://www.youtube.com/embed/bjbTm3vR2nA"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
