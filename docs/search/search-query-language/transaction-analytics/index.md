---
slug: /search/search-query-language/transaction-analytics
title: Transaction Analytics
description: Find and group related log data.
---


Transaction Analytics provides insight into correlated events helping you identify issues and visualize the flow of data. There are a few operators that group your logs based on transaction information that you provide.

* **Merge** combines data based on a specified strategy. You can merge groups created by Transactionize. 
* **Transaction** groups logs by defined states that have a unique identifier. You have the option to group transactions by states or their flow (latency). This operator supports further aggregation and can show your transactions in a flow chart. There is a 10,000 group limit.
* **Transactionize** groups logs by specified fields. It provides the duration and number of logs in each group. You can reference these with other operators, such as [subquery](/docs/search/subqueries), to dive into their behavior. There is a 50MB size limit on the raw data that can be processed.

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/search/search-query-language/transaction-analytics/merge-operator"><img src={useBaseUrl('img/icons/operations/analytics.png')} alt="icon" width="40"/><h4>Merge Operator</h4></a>
  <p>Reduces a stream of events to a single event using a specified merge strategy.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/search/search-query-language/transaction-analytics/transaction-operator"><img src={useBaseUrl('img/icons/operations/analytics.png')} alt="icon" width="40"/><h4>Transaction Operator</h4></a>
  <p>Analyze transaction data such as website sign-ups and e-commerce activity.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/search/search-query-language/transaction-analytics/flow-diagrams"><img src={useBaseUrl('img/icons/operations/analytics.png')} alt="icon" width="40"/><h4>Flow Diagrams</h4></a>
  <p>Flow Diagrams can show the flow within a distributed system.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/search/search-query-language/transaction-analytics/transactionize-operator"><img src={useBaseUrl('img/icons/operations/analytics.png')} alt="icon" width="40"/><h4>Transactionize Operator</h4></a>
  <p>Groups log messages that match on any fields you specify.</p>
  </div>
</div>
</div>

<br/>
