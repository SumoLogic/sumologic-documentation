---
slug: /search/search-query-language/group-aggregate-operators
title: Group or Aggregate Operators
description: Group and aggregate operators enable you to evaluate messages and place them into groups.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/avg')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>avg</h4></a>
  <p>Calculates the avg value of a numerical field being evaluated.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/count-count-distinct-and-count-frequent')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>count, count_distinct, count_frequent</h4></a>
  <p>Use with a group operator and field name.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/first-last')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>first, last</h4></a>
  <p>Return the first or last result relative to the sort order.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/median')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>median</h4></a>
  <p>Calculates the median value for a particular field.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/min-max')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>min, max</h4></a>
  <p>Use these functions to find the smallest or largest value in a set of values.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/most-recent-least-recent')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>most_recent, least_recent</h4></a>
  <p>Select the most or least recent value within a group.</p>
  </div>
</div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/pct-percentile')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>pct</h4></a>
      <p>Finds the specified percentiles of a given field.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/pct-sampling')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>pct_sampling</h4></a>
      <p>Finds the percentile of a given field.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/stddev')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>stddev</h4></a>
      <p>Finds the standard deviation for numerical values within a time range.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/sum')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>sum</h4></a>
      <p>Adds values of a numerical field being evaluated within a time range.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/search/search-query-language/group-aggregate-operators/values')}><img src={useBaseUrl('img/icons/operations/queries.png')} alt="icon" width="35"/><h4>values</h4></a>
      <p>Provides all the distinct values of a field.</p>
      </div>
    </div>
</div>

<br/>
