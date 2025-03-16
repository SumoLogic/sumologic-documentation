---
slug: /metrics/metrics-operators
title: Metrics Operators
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This guide describes Sumo Logic metrics operators and provides usage examples.

<a href="/files/metrics-operators-cheat-sheet.pdf" target="_blank">Download a Metrics cheat sheet</a>


## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/accum')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>accum</h4></a>
  <p>Learn how to create a series of running totals for each metric time series.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/along')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>along</h4></a>
  <p>Learn how to control what results are joined based on the value of one or more result fields.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/avg')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>avg</h4></a>
  <p>Learn how to calculate the average of all matching time series.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/bottomk')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>bottomk</h4></a>
  <p>Learn how to apply a specified aggregation function to the time series that match the query selector.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/count')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>count</h4></a>
  <p>Learn how to count the total number of time series that match the query.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/delta/')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>delta</h4></a>
  <p>Learn how to compute the backward difference at each data point in the time series.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/eval')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>eval</h4></a>
  <p>Learn how to evaluate a time series based on a user-specified arithmetic or mathematical function.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/ewma')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>ewma</h4></a>
  <p>Learn how to compute an EWMA on the data points returned by the query for the selected time range.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/fillmissing')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>fillmissing</h4></a>
  <p>Learn how to fill empty time slices in metric query results with a derived data point.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/metrics/metrics-operators/filter')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>filter</h4></a>
  <p>Learn how to limit the results returned by a metric query.</p>
  </div>
</div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/histogram-quantile')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>histogram_quantile</h4></a>
    <p>Learn how to calculate the φ-quantile from the buckets of a histogram. </p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/in')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>in</h4></a>
    <p>Learn how to use this operator in a metrics query selector as shorthand for multiple OR conditions.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/max')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>max</h4></a>
    <p>Learn how to calculate the maximum value of the time series that match the query.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/min')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>min</h4></a>
    <p>Learn how to calculate the minimum value of the time series that match the query.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/outlier')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>outlier</h4></a>
    <p>Learn how to identify metrics data points that are outside the range of expected values.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/parse')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>parse</h4></a>
    <p>Learn how to parse the specified field to create new fields to use in the metrics query.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/predict')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>predict</h4></a>
    <p>Learn how to take a single time series metric to predict future values.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/pct')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>pct</h4></a>
    <p>Learn how to calculate the nth percentile of values of the input series for each time interval.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/quantize')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>quantize</h4></a>
    <p>Learn how to use this operator to control Sumo’s quantization behavior.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/rate')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>rate</h4></a>
    <p>Learn how to calculate the per-second rate of change between consecutive data points.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/stddev')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>stddev</h4></a>
    <p>Learn how to measure the magnitude of deviations between the values in a time series.</p>
    </div>
  </div>
  <div className="box smallbox card">
    <div className="container">
    <a href={useBaseUrl('docs/metrics/metrics-operators/sum')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>sum</h4></a>
    <p>Learn how to calculate the sum of the metrics values that match the query.</p>
    </div>
  </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/metrics/metrics-operators/timeshift')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>timeshift</h4></a>
      <p>Learn how to shift the time series from your metrics query by a specified period of time.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/metrics/metrics-operators/topk')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>topk</h4></a>
      <p>Learn to apply a specified aggregation function to the time series that match the query selector.</p>
      </div>
    </div>
    <div className="box smallbox card">
      <div className="container">
      <a href={useBaseUrl('docs/metrics/metrics-operators/where')}><img src={useBaseUrl('img/icons/metrics.png')} alt="icon" width="40"/><h4>where</h4></a>
      <p>Learn how to filter out entire time series, or individual data points within a time series.</p>
      </div>
    </div>
</div>





 



 
