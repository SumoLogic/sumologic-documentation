---
slug: /search/logreduce
title: LogReduce
description: The LogReduce algorithm uses fuzzy logic to cluster messages together based on string and pattern similarity. Use the LogReduce button and operator to quickly assess activity patterns for things like a range of devices or traffic on a website.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

The LogReduce&reg; algorithm uses fuzzy logic to cluster messages together based on string and pattern similarity. Use the LogReduce button and operator to quickly assess activity patterns for things like a range of devices or traffic on a website.

:::important
The summarize operator has been renamed the logreduce operator, to match the **LogReduce** button on the **Messages** tab. Both operators will continue to work in search queries as synonyms for a limited time. We recommend that you rewrite saved queries replacing summarize with LogReduce.
:::

Watch our video on LogReduce. 

<Iframe url="https://www.youtube.com/embed/NlnIZvfYO2w"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />


In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/logreduce/logreduce-operator"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>LogReduce Operator</h4></a>
  <p>Allows you to quickly assess activity patterns for things like a range of devices or traffic on a website.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/logreduce/detect-patterns-with-logreduce/"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>Detect Patterns with LogReduce</h4></a>
  <p>Group messages with similar structures and patterns, providing insight into specific keywords or time range.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/search/logreduce/influence-the-logreduce-outcome/"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>Influence the LogReduce Outcome</h4></a>
  <p>Influence the algorithm by editing a signature to increase or decrease your results granularity.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/search/logreduce/understand-the-logreduce-relevance-column/"><img src={useBaseUrl('img/icons/search.png')} alt="icon" width="35"/><h4>LogReduce Relevance Column</h4></a>
  <p>Displays a numerical score for a signature, predicting which signatures could be most meaningful.</p>
  </div>
</div>
</div>
