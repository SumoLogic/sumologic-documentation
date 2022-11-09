---
slug: /search/search-query-language/transaction-analytics
title: Transaction Analytics
description: Find and group related log data.
---


Transaction Analytics provides insight into correlated events helping you identify issues and visualize the flow of data. There are a few operators that group your logs based on transaction information that you provide.

* **Merge** combines data based on a specified strategy. You can merge groups created by Transactionize. 
* **Transaction** groups logs by defined states that have a unique identifier. You have the option to group transactions by states or their flow (latency). This operator supports further aggregation and can show your transactions in a flow chart. There is a 10,000 group limit.
* **Transactionize** groups logs by specified fields. It provides the duration and number of logs in each group. You can reference these with other operators, such as [subquery](/docs/search/subqueries), to dive into their behavior. There is a 50MB size limit on the raw data that can be processed.

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
