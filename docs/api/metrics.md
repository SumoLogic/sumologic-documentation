---
id: metrics
title: Metrics APIs
sidebar_label: Metrics
description: Use HTTP endpoints to access your metric data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/metrics.png')} alt="Thumbnail icon" width="50"/>

The Metrics Query API lets you execute Metrics queries from third-party scripts and applications so that you can reformat the results as desired.

{@import ../reuse/api-intro.md}

## Before You Begin

You will need:

* An Enterprise account. For more information, see [Cloud Flex](/docs/manage/manage-subscription/cloud-flex-accounts) or [Cloud Flex Credits](/docs/manage/manage-subscription/cloud-flex-credits-accounts), depending on the Sumo Logic packaging you have.
* An access key/access ID for authentication. Username/password are not supported.


## Endpoints for API access

Sumo Logic has deployments that are assigned depending on the geographic location and the date an account is created. For API access, you must manually direct your API client to the correct Sumo Logic API URL.

See [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for the list of the URLs.

An `HTTP 301 Moved` error suggests that the wrong endpoint was specified.

## Rate limiting

{@import ../reuse/api-rate-limit.md}

## Errors

{@import ../reuse/api-errors.md}

## API details

### Executing a query

To execute a metrics query, send a JSON request to the endpoint.

**Method:** POST

**Example endpoint:** [https://api.sumologic.com/api/v1/metrics/results](https://api.sumologic.com/api/v1/metrics/results)

<details><summary>Which API endpoint should I use?</summary>

{@import ../reuse/api-endpoints.md}

</details>


### Headers

<table>
  <tr>
   <td><strong>Header</strong>
   </td>
   <td><strong>Value</strong>
   </td>
  </tr>
  <tr>
   <td>Content-Type
   </td>
   <td>application/json
   </td>
  </tr>
  <tr>
   <td>Accept
   </td>
   <td>application/json
   </td>
  </tr>
</table>



### Query request parameters

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>query
   </td>
   <td>[QueryWithRowId]
   </td>
   <td>Yes
   </td>
   <td>The actual query expressions.
   </td>
  </tr>
  <tr>
   <td>startTime
   </td>
   <td>long
   </td>
   <td>Yes
   </td>
   <td>Start of the query time range, in milliseconds since epoch.
   </td>
  </tr>
  <tr>
   <td>endTime
   </td>
   <td>long
   </td>
   <td>Yes
   </td>
   <td>End of the query time range, in milliseconds since epoch.
   </td>
  </tr>
  <tr>
   <td>requestedDataPoints
   </td>
   <td>int
   </td>
   <td>No
   </td>
   <td>Desired number of data points returned per series.
   </td>
  </tr>
  <tr>
   <td>maxDataPoints
   </td>
   <td>Int
   </td>
   <td>No
   </td>
   <td>Upper bound on number of data points returned per series
   </td>
  </tr>
  <tr>
   <td>maxTotalDataPoints
   </td>
   <td>Int
   </td>
   <td>No
   </td>
   <td>Upper bound on sum total number of data points returned across all series.
   </td>
  </tr>
  <tr>
   <td>desiredQuantizationInSec
   </td>
   <td>Int
   </td>
   <td>No
   </td>
   <td>Desired granularity of temporal quantization in seconds. Note that this may be overridden by the backend in order to satisfy constraints on the number of data points returned.
   </td>
  </tr>
</table>



### QueryWithRowId object

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>query
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>The actual metrics search expression.
   </td>
  </tr>
  <tr>
   <td>rowId
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>Name or alias for this “row” of the query.
   </td>
  </tr>
</table>




### Status codes

<table>
  <tr>
   <td><strong>Code</strong>
   </td>
   <td><strong>Text</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>200
   </td>
   <td>Success
   </td>
   <td>The query has been successfully executed.
   </td>
  </tr>
  <tr>
   <td>400
   </td>
   <td>Bad Request
   </td>
   <td>Generic request error by the client.
   </td>
  </tr>
  <tr>
   <td>415
   </td>
   <td>Unsupported Media Type
   </td>
   <td>Content-Type wasn't set to application/json.
   </td>
  </tr>
</table>

### Query Result

The result will be a JSON document containing results (or an error) for each query row in the “query” argument.

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>response
   </td>
   <td>[MetricsErrorsOrResults]
   </td>
   <td>Results (or error) for each row-query.
   </td>
  </tr>
  <tr>
   <td>queryInfo
   </td>
   <td>MetricsQueryInfo
   </td>
   <td>Information about the original user query.
   </td>
  </tr>
</table>


### MetricsQueryInfo object

<table>
  <tr>
   <td>
    <strong>Parameter</strong>
   </td>
   <td>
    <strong>Type</strong>
   </td>
   <td>
    <strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>startTime
   </td>
   <td>long
   </td>
   <td>Start of the query time range, in milliseconds since epoch.
   </td>
  </tr>
  <tr>
   <td>endTime
   </td>
   <td>long
   </td>
   <td>End of the query time range, in milliseconds since epoch.
   </td>
  </tr>
  <tr>
   <td>desiredQuantizationInSecs
   </td>
   <td>int
   </td>
   <td>Original user-supplied desired granularity of temporal <a href="/docs/metrics/metric-charts/interacting-metric-charts#Adjust_the_quantization_interval">quantization</a> (if supplied).
   </td>
  </tr>
  <tr>
   <td>actualQuantizationInSecs
   </td>
   <td>int
   </td>
   <td>Actual granularity of temporal quantization used by the back-end for query.
   </td>
  </tr>
</table>



### MetricsDatapointsError object

#### (extends MetricsErrorsOrResults)

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>rowId
   </td>
   <td>String
   </td>
   <td>Name or alias for this “row” of the query.
   </td>
  </tr>
  <tr>
   <td>messageType
   </td>
   <td>String
   </td>
   <td>Error type.
   </td>
  </tr>
  <tr>
   <td>message
   </td>
   <td>String
   </td>
   <td>Error message.
   </td>
  </tr>
</table>



### MetricsDataPointsResult object

#### (extends MetricsErrorsOrResults)

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>rowId
   </td>
   <td>String
   </td>
   <td>Name or alias for this “row” of the query.
   </td>
  </tr>
  <tr>
   <td>results
   </td>
   <td>[MetricsRowResult]
   </td>
   <td>Actual retrieved and computed values for series returned by this row’s query.
   </td>
  </tr>
</table>


### MetricsRowResult

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>metric
   </td>
   <td>MetricDef
   </td>
   <td>Full metric definition for this result.
   </td>
  </tr>
  <tr>
   <td>datapoints
   </td>
   <td>MetricsDataPoints
   </td>
   <td>The actual results.
   </td>
  </tr>
</table>


### MetricDef

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>dimensions
   </td>
   <td>[MetricDim]
   </td>
   <td>Identifying dimensions for this metric.
   </td>
  </tr>
  <tr>
   <td>algoId
   </td>
   <td>long
   </td>
   <td>Internal identifier for the outlier detection algorithm used in these results.
   </td>
  </tr>
</table>



### MetricDim

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>key
   </td>
   <td>string
   </td>
   <td>Key name for this dimension.
   </td>
  </tr>
  <tr>
   <td>value
   </td>
   <td>string
   </td>
   <td>Associated value for this key.
   </td>
  </tr>
</table>



### MetricsDataPoints

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>timestamp
   </td>
   <td>[long]
   </td>
   <td>Timestamps (milliseconds since epoch) for each data point.
   </td>
  </tr>
  <tr>
   <td>value
   </td>
   <td>[float]
   </td>
   <td>Actual numerical values for reach data point.
   </td>
  </tr>
  <tr>
   <td>outlierParams
   </td>
   <td>
   </td>
   <td>Internal parameters for outlier detection.
   </td>
  </tr>
  <tr>
   <td>Max
   </td>
   <td>[float]
   </td>
   <td>Maximum aggregate.
   </td>
  </tr>
  <tr>
   <td>Min
   </td>
   <td>[float]
   </td>
   <td>Minimum aggregate.
   </td>
  </tr>
  <tr>
   <td>Avg
   </td>
   <td>[float]
   </td>
   <td>Average aggregate.
   </td>
  </tr>
  <tr>
   <td>Count
   </td>
   <td>[int]
   </td>
   <td>Count of raw observations
   </td>
  </tr>
</table>



#### Example Use

Example use of this API can be seen in [this Python script](https://gist.github.com/davidandrzej/60df21aaad0c868456ce422fb56d3e09), which queries the API and reformats the results into a [pandas time series DataFrame](http://pandas.pydata.org/pandas-docs/stable/timeseries.html).

To use this script, set the (user, pw) variables and run these commands from an IPython or Jupyter notebook:

```sql
df = exampleQuery(user, pw, query)
df.fillna(method='backfill').plot()
plt.show()
```

You should get a resulting plot like below, and df should contain your data nicely formatted as a time series pandas DataFrame.
