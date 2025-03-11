---
slug: /search/search-query-language
title: Search Query Language
description: The extensive Sumo Logic query options help you gain valuable insight into your log messages.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';


In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/search-operators')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon showing magnifying glass hovering over a data symbol" width="40"/><h4>Search Operators</h4></a>
  <p>Available search operators in the Sumo Logic search query language.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/parse-operators')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon showing magnifying glass hovering over a data symbol" width="40"/><h4>Parse Operators</h4></a>
  <p>Sumo Logic provides a number of ways to parse fields in your log messages.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon showing magnifying glass hovering over a data symbol" width="40"/><h4>Group or Aggregate Operators</h4></a>
  <p>Evaluate messages and place them into groups.</p>
  </div>
</div>
<div className="box smallbox card">
   <div className="container">
   <a href={useBaseUrl('docs/search/search-query-language/field-expressions')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon showing magnifying glass hovering over a data symbol" width="40"/><h4>Field Expressions</h4></a>
   <p>Overview of the expressions that create user-defined numeric, boolean, or string fields.</p>
   </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/math-expressions')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon showing magnifying glass hovering over a data symbol" width="40"/><h4>Math Expressions</h4></a>
  <p>Use general mathematical expressions on numerical data extracted from log lines.</p>
  </div>
</div>
<div className="box smallbox card">
     <div className="container">
     <a href={useBaseUrl('docs/search/search-query-language/transaction-analytics')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon showing magnifying glass hovering over a data symbol" width="40"/><h4>Transaction Analytics</h4></a>
     <p>Find and group related log data.</p>
     </div>
</div>
</div>

<br/>


## Syntax style

Sumo Logic search query language syntax is written in the following styles.

### Code Font

Search syntax, queries, parameters, and filenames are displayed in `Regular Code Font`.

**Required and optional arguments:**

* A required argument is wrapped in angle brackets `< >`.
* An optional argument is wrapped in square brackets `[ ]`.

Example:

```sql
| parse [field=<field_name>] "<start_anchor>*<stop_anchor>" as <field> [nodrop]
```

The required arguments are `<start_anchor>`, `<stop_anchor>`, and `<field>`.
The optional arguments are `[field=<field_name>]` and the `[nodrop]` option.

**One or more arguments:**

* An argument that can be specified more than once has an ellipsis ... to indicate where you may add additional arguments.

Example:

```sql
concat(<field1>, <field2>[, <field3>, ...]) as <field>
```

:::sumo
For a collection of customer-created search queries and their use cases, see the [Community Query Library](https://support.sumologic.com/support/s/topiccatalog).
:::
