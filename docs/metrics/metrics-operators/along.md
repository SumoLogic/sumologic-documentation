---
id: along
title: along Metrics Operator
sidebar_label: along
keywords:
    - metrics
    - along
    - join
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The `along metrics` operator is useful when you join queries – it allows you to control what results are joined based on the value of one or more result fields. For more information, see [Join Query Results](docs/metrics/introduction/joins.md).

## Syntax
`<expression> [along <field>[, <field>, …]]`

## Example
Queries #A and #B return the `CPU_User` and `CPU_Sys` metrics for time series whose `_sourceHost` dimension starts with the string *splitter-*. Query #C performs a summation for the pairs of time series from #A and #B whose `_sourceHost`  value matches.

```
#A: metric=CPU_User _sourceHost=cplitter-*
#B: metric=CPU_Sys _sourceHost=cplitter-*
#C: #A + #B along _sourceHost
```
<img src={useBaseUrl('img/metrics/along-example.png')} alt="along-example.png"/>
