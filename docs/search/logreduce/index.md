---
slug: /search/logreduce
title: LogReduce
description: The LogReduce algorithm uses fuzzy logic to cluster messages together based on string and pattern similarity. Use the LogReduce button and operator to quickly assess activity patterns for things like a range of devices or traffic on a website.
---

The LogReduce&reg; algorithm uses fuzzy logic to cluster messages together based on string and pattern similarity. Use the LogReduce button and operator to quickly assess activity patterns for things like a range of devices or traffic on a website.

:::important
The summarize operator has been renamed the logreduce operator, to match the **LogReduce** button on the **Messages** tab. Both operators will continue to work in search queries as synonyms for a limited time. We recommend that you rewrite saved queries replacing summarize with
LogReduce.
:::

Watch our video on LogReduce. 

<Iframe url="https://www.youtube.com/embed/bT02WPBToLk"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe';

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
