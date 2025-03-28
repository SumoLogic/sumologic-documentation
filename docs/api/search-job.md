---
id: search-job
title: Search Job APIs
sidebar_label: Search Job
description: Search Job APIs provides access to resources and log data from third-party scripts and applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ApiEndpoints from '../reuse/api-endpoints.md';
import ApiIntro from '../reuse/api-intro.md';
import ApiRoles from '../reuse/api-roles.md';

<img src={useBaseUrl('img/icons/search.png')} alt="Thumbnail icon" width="55"/>

The Search Job API provides third-party scripts and applications access to your log data through access key/access ID authentication.

:::warning
Search Job APIs are not yet built with OpenAPI specifications and therefore not included in our [Swagger docs](https://api.sumologic.com/docs). Instead, refer to the below documentation.
:::

## Prerequisites

The Search Job API is available to Enterprise accounts.

| Account Type | Account Level |
|:--|:--|
| Cloud Flex Legacy | Enterprise |
| Sumo Logic Credits | Trial, Enterprise Operations, Enterprise Security, Enterprise Suite |

## Documentation

<ApiIntro/>

## Required role capabilities

<ApiRoles/>

* Data Management
    * Download Search Results
    * View Collectors
* Security
    * Manage Access Keys


## Endpoints for API access

Sumo Logic has deployments that are assigned depending on the geographic location and the date an account is created. For API access, you must manually direct your API client to the correct Sumo Logic API URL.

See [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for the list of the URLs.

An `HTTP 301 Moved error` suggests that the wrong endpoint was specified.

## Session Timeout

While the search job is running you need to request the job status based on the search job ID. The API keeps the search job alive by either polling for status every 20 to 30 seconds or gathering results. If the search job is not kept alive by API requests, it is canceled. When a search job is canceled for inactivity, you will get a 404 status.

You should include the `ACCESSID:ACCESSKEY` pair in every Search Job API request. A 404 status (Page Not Found) on a follow-up request may occur if the request is missing a required cookie or if the `ACCESSID:ACCESSKEY` pair is incorrect or omitted.

There's a query timeout after eight hours, even if the API is polling and making requests. If you are running very few queries, you may be able to go a little longer, but you can expect most of your queries to end after eight hours.

So, a 404 status is generated in these two situations:

* When cookies are disabled.
* When a query session is canceled.

You can start requesting results asynchronously while the job is running and page through partial results while the job is in progress.

## Search Job Result Limits

| Data Tier | Non-aggregate Search |
| :- | :- |
| Continuous | Can return up to 100K messages per search. |
| Frequent  | Can return up to 100K messages per search. |
| Infrequent  | Can return up to 100K messages per search. |

:::info
Flex Licensing model can return up to 100K messages per search.
:::

If you need more results, you'll need to break up your search into several searches that span smaller blocks of the time range needed.

## Rate limit throttling  

import RateLimit from '../reuse/api-rate-limit.md';

<RateLimit/>

A limit of 200 active concurrent search jobs applies to your organization.

When searching the [Frequent Tier](/docs/manage/partitions/data-tiers), a rate limit of 20 concurrent search jobs applies to your organization.

When searching the [Flex data](/docs/manage/partitions/flex), a rate limit of 200 concurrent search jobs applies to your organization.

Once you reach the limit of 200 active searches, attempting an additional search will return a status code of `429 Too Many Requests`, indicating that you've exceeded the permitted search job limit.

This limit applies only to Search Job API searches, and does not take into account searches run from the Sumo UI, scheduled searches, or dashboard panel searches that are running at the same time. If the search job is not kept alive by API requests every 20-30 seconds, it is canceled.

You can reduce the number of active search jobs by explicitly deleting a search after you receive the results. Manual deletion of searches helps maintain a low count of active searches, of reaching the Search Job API throttling limit. See [Deleting a search job](#delete-a-search-job) for details.

## Process flow

The following figure shows the process flow for search jobs.

<img src={useBaseUrl('img/api/search_job_api_process_flow.png')} alt="search_job_api_process_flow" width="400"/>

1. **Request.** You request a search job, giving the query and time range.
2. **Response.** Sumo Logic responds with a job ID. If there’s a problem with the request, an error code is provided (see the list of error codes following the figure).
3. **Request.** Use the job ID to request search status. This needs to be done at least every 20-30 seconds so the search session is not canceled due to inactivity.
4. **Response.** Sumo Logic responds with job status. An error code (404) is returned if the request could not be completed. The status includes the current state of the search job (gathering results, done executing, etc.). It also includes the message and record counts based on how many results have already been found while executing the search. For non-aggregation queries, only the number of messages is reported. For aggregation queries, the number of records produced is also reported. The search job status provides access to an implicitly generated histogram of the distribution of found messages over the time range specified for the search job. During and after execution, the API can be used to request available messages and records in a paging fashion.
5. **Request.** You request results. It’s not necessary for the search to be complete for the user to request results; the process works asynchronously. You can repeat the request as often as needed to keep seeing updated results, keeping in mind the rate limits. The Search Job API can return 100K messages per search.
6. **Response.** Sumo Logic delivers JSON-formatted search results as requested. The API can deliver partial results that the user can start paging through, even as new results continue to come in. If there’s a problem with the results, an error code is provided (see the list of error codes following the figure).

## Errors

**Generic errors that apply to all APIs**

<table>
  <tr>
   <td><strong>Code</strong> </td>
   <td><strong>Error</strong> </td>
   <td><strong>Description</strong> </td>
  </tr>
  <tr>
   <td>301</td>
   <td>moved</td>
   <td>The requested resource SHOULD be accessed through returned URI in Location Header.</td>
  </tr>
  <tr>
   <td>401</td>
   <td>unauthorized</td>
   <td>Credential could not be verified.</td>
  </tr>
  <tr>
   <td>403</td>
   <td>forbidden</td>
   <td>This operation is not allowed for your account type.</td>
  </tr>
  <tr>
   <td>404</td>
   <td>notfound</td>
   <td>Requested resource could not be found.</td>
  </tr>
  <tr>
   <td>405</td>
   <td>method.unsupported</td>
   <td>Unsupported method for URL.</td>
  </tr>
  <tr>
   <td>415</td>
   <td>contenttype.invalid</td>
   <td>Invalid content type.</td>
  </tr>
  <tr>
   <td>429</td>
   <td>rate.limit.exceeded</td>
   <td>The API request rate is higher than 4 request per second or your organization has exceeded the 200 active concurrent search job limit.</td>
  </tr>
  <tr>
   <td>500</td>
   <td>internal.error</td>
   <td>Internal server error.</td>
  </tr>
  <tr>
   <td>503</td>
   <td>service.unavailable</td>
   <td>Service is currently unavailable.</td>
  </tr>
</table>


**Errors when creating the search query (#2 in the [process flow](#process-flow))**

<table>
  <tr>
   <td><strong>Code</strong></td>
   <td><strong>Error</strong> </td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>400</td>
   <td>generic</td>
   <td>Generic error.</td>
  </tr>
  <tr>
   <td>400</td>
   <td>invalid.timestamp.to</td>
   <td>The 'to' field contains an invalid time.</td>
  </tr>
  <tr>
   <td>400 </td>
   <td>invalid.timestamp.from</td>
   <td>The 'from' field contains an invalid time. </td>
  </tr>
  <tr>
   <td>400</td>
   <td>to.smaller.than.from</td>
   <td>The 'from' time cannot be larger than the 'to' time.</td>
  </tr>
  <tr>
   <td>400</td>
   <td>unknown.timezone</td>
   <td>The 'timezone' value is not a known time zone. See this <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">Wikipedia article</a> for a list of time zone codes.</td>
  </tr>
  <tr>
   <td>400</td>
   <td>empty.timezone</td>
   <td>The 'timezone' cannot be blank.</td>
  </tr>
  <tr>
   <td>400</td>
   <td>no.query</td>
   <td>No 'query' parameter was provided.</td>
  </tr>
  <tr>
   <td>400</td>
   <td>unknown.time.type</td>
   <td>Time type is not correct.</td>
  </tr>
  <tr>
   <td>400</td>
   <td>parse.error</td>
   <td>Unable to parse query.</td>
  </tr>
</table>


**Error when requesting status (#3 in the [process flow](#process-flow))**


<table>
  <tr>
   <td><strong>Code</strong></td>
   <td><strong>Error</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>404</td>
   <td>"jobid.invalid" </td>
   <td>"Job ID is invalid."</td>
  </tr>
</table>

**Errors when paging through the result set (#5 in the [process flow](#process-flow))**

<table>
  <tr>
   <td><strong>Code</strong> </td>
   <td><strong>Error</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>400</td>
   <td>"jobid.invalid"</td>
   <td>"Job ID is invalid."</td>
  </tr>
  <tr>
   <td>400</td>
   <td>"offset.missing"</td>
   <td>"Offset is missing."</td>
  </tr>
  <tr>
   <td>400</td>
   <td>"offset.negative"</td>
   <td>"Offset cannot be negative."</td>
  </tr>
  <tr>
   <td>400</td>
   <td>"limit.missing"</td>
   <td>"Limit is missing."</td>
  </tr>
  <tr>
   <td>400</td>
   <td>"limit.zero"</td>
   <td>"Limit cannot be 0."</td>
  </tr>
  <tr>
   <td>400</td>
   <td>"limit.negative"</td>
   <td>"Limit cannot be negative."</td>
  </tr>
  <tr>
   <td>400</td>
   <td>"no.records.not.an.aggregation.query"</td>
   <td>"No records; query is not an aggregation"</td>
  </tr>
</table>


## GET Methods

### Get the current Search Job status

<details>
<summary><span className="api get">GET</span><code>/v1/search/jobs/&#123;SEARCH_JOB_ID&#125;</code></summary>
<p/>

Use the search job ID to obtain the current status of a search job (step 4 in the process flow).

<details>
<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

#### Request parameters

<table>
  <tr>
   <td><strong>Parameter</strong></td>
   <td><strong>Type</strong></td>
   <td><strong>Required</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>searchJobId</td>
   <td>String</td>
   <td>Yes</td>
   <td>The ID of the search job.</td>
  </tr>
</table>

#### Result

The result is a JSON document containing the search job state, the number of messages found so far, the number of records produced so far, any pending warnings and errors, and any histogram buckets so far.

#### Sample session

```bash
curl -v --trace-ascii - -b cookies.txt -c cookies.txt -H 'Accept: application/json'
--user <ACCESSID>:<ACCESSKEY> https://api.sumologic.com/api/v1/search/jobs/37589506F194FC80
```

<details>
<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

This is the formatted result document:

```json
{
   "warning":"",
   "state":"DONE GATHERING RESULTS",
   "messageCount":90,
   "histogramBuckets":[
      {
         "length":60000,
         "count":1,
         "startTimestamp":1359404820000
      },
      {
         "length":60000,
         "count":1,
         "startTimestamp":1359405480000
      },
      {
         "length":60000,
         "count":1,
         "startTimestamp":1359404340000
      }
   ],
   "pendingErrors":[
   ],
   "pendingWarnings":[
   ],
   "recordCount":1,
   "usageDetails":{
      "dataScannedInBytes":0
      }
}
```

Notice that the state of the sample search job is DONE GATHERING RESULTS. The following table includes possible states.

| State | Description |
| :-- | :-- |
| NOT STARTED	| Search job has not been started yet.|
| GATHERING RESULTS	| Search job is still gathering more results, however results might already be available.|
| GATHERING RESULTS FROM SUBQUERIES | Search job is gathering results from the subqueries, before executing the main query.|
| FORCE PAUSED	| Query that is paused by the system. It is true only for non-aggregate queries that are paused at the limit of 100k. This limit is dynamic and may vary from customer to customer.|
| DONE GATHERING RESULTS	| Search job is done gathering results; the entire specified time range has been covered.|
| DONE GATHERING HISTOGRAM | Search job is done gathering results needed to build a histogram; the entire specified time range needed to build the histogram has been covered. |
| CANCELLED	| The search job has been canceled. Note the spelling has two L letters.|

#### More about results

The **warnings** value contains the detailed information about the warning while obtaining the current status of a search job.

The **messageCount** and **recordCount** values indicate the number of messages and records found or produced so far. Messages are raw log messages and records are aggregated data.

For queries that do not contain an aggregation operator, only messages are returned. If the query contains an aggregation, for example, **count by _sourceCategory**, then the messages are returned along with records resulting from the aggregation (similar to what a SQL database would return).

The **pendingErrors** and **pendingWarnings** values contain any pending error or warning strings that have accumulated since the last time the status was requested.

The **usageDetails** value contains the amount of data scanned in bytes details.

Errors and warnings are not cumulative. If you need to retain the errors and warnings, store them locally.

The **histogramBuckets** value returns a list of histogram buckets. A histogram bucket is defined by its timestamp, which is the start timestamp (in milliseconds) of the bucket, and a length, also in milliseconds, that expressed the width of the bucket. The **timestampplus** length is the end timestamp of the bucket, so the count is the number of messages in the bucket.

The histogram buckets correspond to the histogram display in the Sumo Logic interactive analytics API. The histogram buckets are not cumulative. Because the status API will return only the new buckets discovered since the last status call, the buckets need to be remembered by the client, if they are to be used. A search job in the Sumo Logic backend will always execute a query by finding and processing matching messages starting at the end of the specified time range, and moving to the beginning. During this process, histogram buckets are discovered and returned.

Fields are not returned in the specified order and are all lowercase.

</details>

---
### Paging through the messages found by a search job

<details>
<summary><span className="api get">GET</span><code>/v1/search/jobs/&#123;SEARCH_JOB_ID&#125;/messages?offset=&#123;OFFSET&#125;&limit=&#123;LIMIT&#125;</code></summary>
<p/>

The search job status informs the user about the number of found messages. The messages can be requested using a paging API call (step 6 in the process flow). Messages are always ordered by the latest `_messageTime` value.

<details>

<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

#### Request parameters

<table>
  <tr>
   <td><strong>Parameter</strong></td>
   <td><strong>Type</strong></td>
   <td><strong>Required</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>searchJobId</td>
   <td>String</td>
   <td>Yes</td>
   <td>The ID of the search job.</td>
  </tr>
  <tr>
   <td>offset </td>
   <td>Int</td>
   <td>Yes</td>
   <td>Return message starting at this offset.</td>
  </tr>
  <tr>
   <td>limit</td>
   <td>Int</td>
   <td>Yes</td>
   <td>The number of messages starting at offset to return. The maximum value for limit is 10,000 messages or 100 MB in total message size, which means the query may return less than 10,000 messages if you exceed the size limit. </td>
  </tr>
</table>



#### Sample session

```bash
curl -b cookies.txt -c cookies.txt -H 'Accept: application/json'
--user <ACCESSID>:<ACCESSKEY> 'https://api.sumologic.com/api/v1/search/jobs/37589506F194FC80/messages?offset=0&limit=10'
```

<details>
<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

<details>
<summary>This is the formatted result document (click to expand)</summary>

```json
{
   "warning": "",
   "fields":[
      {
         "name":"_messageid",
         "fieldType":"long",
         "keyField":false
      },
      {
         "name":"_sourceid",
         "fieldType":"long",
         "keyField":false
      },
      {
         "name":"_sourceName",
         "fieldType":"string",
         "keyField":false
      },
      {
         "name":"_sourceHost",
         "fieldType":"string",
         "keyField":false
      },
      {
         "name":"_sourceCategory",
         "fieldType":"string",
         "keyField":false
      },
      {
         "name":"_format",
         "fieldType":"string",
         "keyField":false
      },
      {
         "name":"_size",
         "fieldType":"long",
         "keyField":false
      },
      {
         "name":"_messagetime",
         "fieldType":"long",
         "keyField":false
      },
      {
         "name":"_receipttime",
         "fieldType":"long",
         "keyField":false
      },
      {
         "name":"_messagecount",
         "fieldType":"int",
         "keyField":false
      },
      {
         "name":"_raw",
         "fieldType":"string",
         "keyField":false
      },
      {
         "name":"_source",
         "fieldType":"string",
         "keyField":false
      },
      {
         "name":"_collectorId",
         "fieldType":"long",
         "keyField":false
      },
      {
         "name":"_collector",
         "fieldType":"string",
         "keyField":false
      },
      {
         "name":"_blockid",
         "fieldType":"long",
         "keyField":false
      }
   ],
   "messages":[
      {
         "map":{
            "_receipttime":"1359407350899",
            "_source":"service",
            "_collector":"local",
            "_format":"plain:atp:o:0:l:29:p:yyyy-MM-dd HH:mm:ss,SSS ZZZZ",
            "_blockid":"-9223372036854775669",
            "_messageid":"-9223372036854773763",
            "_messagetime":"1359407350333",
            "_collectorId":"1579",
            "_sourceName":"/Users/christian/Development/sumo/ops/assemblies/latest/service-20.1-SNAPSHOT/logs/service.log",
            "_sourceHost":"Chiapet.local",
            "_raw":"2013-01-28 13:09:10,333 -0800 INFO  [module=SERVICE] [logger=util.scala.zk.discovery.AWSServiceRegistry] [thread=pool-1-thread-1] FINISHED findRunningInstances(ListBuffer((Service: name: elasticache-1, defaultProps: Map()), (Service: name: userAndOrgCache, defaultProps: Map()), (Service: name: rds_cloudcollector, defaultProps: Map()))) returning Map((Service: name: elasticache-1, defaultProps: Map()) -> [], (Service: name: userAndOrgCache, defaultProps: Map()) -> [], (Service: name: rds_cloudcollector, defaultProps: Map()) -> []) after 1515 ms",
            "_size":"549",
            "_sourceCategory":"service",
            "_sourceid":"1640",
            "_messagecount":"2044"
         }
      },
      ...
      {
         "map":{
            "_receipttime":"1359407051885",
            "_source":"service",
            "_collector":"local",
            "_format":"plain:atp:o:0:l:29:p:yyyy-MM-dd HH:mm:ss,SSS ZZZZ",
            "_blockid":"-9223372036854775674",
            "_messageid":"-9223372036854773772",
            "_messagetime":"1359407049529",
            "_collectorId":"1579",
            "_sourceName":"/Users/christian/Development/sumo/ops/assemblies/latest/service-20.1-SNAPSHOT/logs/service.log",
            "_sourceHost":"Chiapet.local",
            "_raw":"2013-01-28 13:04:09,529 -0800 INFO  [module=SERVICE] [logger=com.netflix.config.sources.DynamoDbConfigurationSource] [thread=pollingConfigurationSource] Successfully polled Dynamo for a new configuration based on table:raychaser-chiapetProperties",
            "_size":"246",
            "_sourceCategory":"service",
            "_sourceid":"1640",
            "_messagecount":"2035"
         }
      }
   ]
}
```

</details>

#### More about results

The result contains two lists, **fields** and **messages**.

* ***warnings** contains the detailed information about the warning while paging through the messages found by a search job.
* **fields** contains a list of all the fields defined for each of the messages returned. For each field, the field name and field type are returned.
* **messages** contains a list of maps, one map per message. Each **map** maps from the fields described in the fields list to the actual value for the message.

For example, the field `_raw` contains the raw collected log message.

`_messageTime` is the number of milliseconds since the epoch of the timestamp extracted from the message itself.

`_receipttime` is the number of milliseconds since the epoch of the timestamp of arrival of the message in the Sumo Logic system.

The metadata fields `_sourceHost`, `_sourceName`, and `_sourceCategory`, which are also featured in Sumo Logic, are available here.

</details>

---
### Page through the records found by a Search Job

<details>
<summary><span className="api get">GET</span><code>/v1/search/jobs/&#123;SEARCH_JOB_ID&#125;/records?offset=&#123;OFFSET&#125;&limit=&#123;LIMIT&#125;</code></summary>
<p/>

The search job status informs the user as to the number of produced records, if the query performs an aggregation. Those records can be requested using a paging API call (step 6 in the process flow), just as the message can be requested.

<details>
<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

#### Request parameters

<table>
  <tr>
   <td><strong>Parameter</strong></td>
   <td><strong>Type</strong></td>
   <td><strong>Required</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>searchJobId</td>
   <td>String</td>
   <td>Yes</td>
   <td>The ID of the search job.</td>
  </tr>
  <tr>
   <td>offset</td>
   <td>Int</td>
   <td>Yes</td>
   <td>Return records starting at this offset.</td>
  </tr>
  <tr>
   <td>limit</td>
   <td>Int</td>
   <td>Yes</td>
   <td>The number of records starting at offset to return. The maximum value for limit is 10,000 records. </td>
  </tr>
</table>

#### Sample session

```bash
curl -b cookies.txt -c cookies.txt -H
'Accept: application/json' --user <ACCESSID>:<ACCESSKEY>
'https://api.sumologic.com/api/v1/search/jobs/37589506F194FC80/records?offset=0&limit=1'
```

This is the formatted result document:


```json
{
   "warning": "",
   "fields":[
      {
         "name":"_sourceCategory",
         "fieldType":"string",
         "keyField":true
      },
      {
         "name":"_count",
         "fieldType":"int",
         "keyField":false
      }
   ],
   "records":[
      {
         "map":{
            "_count":"90",
            "_sourceCategory":"service"
         }
      }
   ]
}
```

The returned document is similar to the one returned for the message paging API. The schema of the records returned is described by the list of fields as part of the fields element. The records themselves are a list of maps.

The ***warnings** contains the detailed information about the warning while paging through the records found by a Search Job.

</details>

## POST Methods

### Create a search job

<details>
<summary><span className="api post">POST</span><code>/v1/search/jobs</code></summary>
<p/>

To create a search job (step 1 in the [process flow](#process-flow)), send a JSON request to the search job endpoint. JSON files need to be UTF-8 encoded following [RFC 8259](https://tools.ietf.org/html/rfc8259).

<details>
<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

#### Headers

<table>
  <tr>
   <td><strong>Header</strong></td>
   <td><strong>Value</strong></td>
  </tr>
  <tr>
   <td>Content-Type</td>
   <td>application/json</td>
  </tr>
  <tr>
   <td>Accept</td>
   <td>application/json</td>
  </tr>
</table>


#### Request parameters

<table>
  <tr>
   <td><strong>Parameter</strong></td>
   <td><strong>Type</strong></td>
   <td><strong>Required</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>query</td>
   <td>String </td>
   <td>Yes</td>
   <td>The actual search expression. Make sure your query is valid JSON format following <a href="https://tools.ietf.org/html/rfc8259">RFC 8259</a>, you may need to escape certain characters.</td>
  </tr>
  <tr>
   <td>from </td>
   <td>String</td>
   <td>Yes</td>
   <td>The <a href="https://www.w3.org/TR/NOTE-datetime">ISO 8601</a> date and time of the time range to start the search. <p>For example, to specify July 16, 2017, use the form <code>YYYY-MM-DDTHH:mm:ss</code>, or <code>2017-07-16T00:00:00</code>.</p>
<p>Can also be milliseconds since epoch.</p></td>
  </tr>
  <tr>
   <td>to</td>
   <td>String</td>
   <td>Yes</td>
   <td>The <a href="https://www.w3.org/TR/NOTE-datetime">ISO 8601</a> date and time of the time range to end the search.<p>For example, to specify July 26, 2017, use the form <code>YYYY-MM-DDTHH:mm:ss</code>, or <code>2017-07-26T00:00:00</code>.</p><p>Can also be milliseconds since epoch.</p></td>
  </tr>
  <tr>
   <td>timeZone </td>
   <td>String </td>
   <td>Yes</td>
   <td>The time zone if from/to is not in milliseconds. See this <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">Wikipedia article</a> for a list of time zone codes. <br/><br/><p><strong>Note</strong> Alternatively, you can use the parameter timezone instead of timeZone.</p></td>
  </tr>
  <tr>
   <td>byReceiptTime</td>
   <td>Boolean</td>
   <td>No </td>
   <td>Define as <code>true</code> to run the search using<a href="/docs/search/get-started-with-search/build-search/use-receipt-time"> receipt time</a>. By default, searches do not run by receipt time. </td>
  </tr>
  <tr>
   <td>autoParsingMode </td>
   <td>String </td>
   <td>No</td>
   <td>This enables <a href="/docs/search/get-started-with-search/build-search/dynamic-parsing">dynamic parsing</a>. Values are: <br/><br/><code>AutoParse</code> - Sumo Logic will perform field extraction on JSON log messages when you run a search.<br/><br/><code>Manual</code> - (Default value) Sumo Logic will not autoparse JSON logs at search time. <br/><br/><strong>Note</strong> Previously, the supported values for this parameter were <code>performance</code>, <code>intelligent</code>, and <code>verbose</code>. These values still function, but are deprecated. Sumo Logic recommends the use of the new supported values: <code>AutoParse</code> and <code>Manual</code>. </td>
  </tr>
   <tr>
   <td>requiresRawMessages</td>
   <td>Boolean</td>
   <td>No </td>
   <td>Set as <code>false</code> to slightly improve the performance of aggregate queries as raw messages will not be generated. By default, the parameter value is set to <code>true</code>. </td>
  </tr>
</table>



#### Status codes

<table>
  <tr>
   <td><strong>Code</strong> </td>
   <td><strong>Text</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>202</td>
   <td>Accepted</td>
   <td>The search job has been successfully created.</td>
  </tr>
  <tr>
   <td>400</td>
   <td>Bad Request</td>
   <td>Generic request error by the client. </td>
  </tr>
  <tr>
   <td>415</td>
   <td>Unsupported Media Type</td>
   <td>Content-Type wasn't set to application/json.</td>
  </tr>
</table>



#### Response headers

<table>
  <tr>
   <td>Header</td>
   <td>Value</td>
  </tr>
  <tr>
   <td>Location</td>
   <td> <code>https://api.sumologic.com/api/v1/search/jobs/&#60;SEARCH_JOB_ID&#62;</code></td>
  </tr>
</table>



#### Result

A JSON document containing the ID of the newly created search job. The ID is a string to use for all API interactions relating to the search job.

Example error response:

```json
{
  "warning": "A 404 status (Page Not Found) on a follow-up request may be due to a cookie not accompanying the request",
  "id": "IUUQI-DGH5I-TJ045",
  "link": {
    "rel": "self",
    "href": "https://api.sumologic.com/api/v1/search/jobs/IUUQI-DGH5I-TJ045"
  }
}
```

#### Sample session

The following sample session uses cURL. The Search Job API requires cookies to be honored by the client. Use `curl -b cookies.txt -c cookies.txt` options to receive, store, and send back the cookies set by the API.

```bash
curl -b cookies.txt -c cookies.txt -H 'Content-type: application/json'
-H 'Accept: application/json' -X POST -T createSearchJob.json
--user <ACCESSID>:<ACCESSKEY> https://api.sumologic.com/api/v1/search/jobs
```

<details>
<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

The **createSearchJob.json** file looks like this:

```json
{
  "query": "| count _sourceCategory",
  "from": "2019-05-03T12:00:00",
  "to": "2019-05-03T12:05:00",
  "timeZone": "IST",
  "byReceiptTime": true
}
```

The response from Sumo Logic returns the Search Job ID as the “Location” header in the format: `https://api.sumologic.com/api/v1/search/jobs/[SEARCH_JOB_ID]`.

</details>


## DELETE Methods

### Delete a search job

<details>
<summary><span className="api delete">DELETE</span><code>/v1/search/jobs/&#123;SEARCH_JOB_ID&#125;</code></summary>
<p/>

Although search jobs ultimately time out in the Sumo Logic backend, it's a good practice to explicitly cancel a search job when it is not needed anymore.

<details>
<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

#### Request parameters

<table>
  <tr>
   <td><strong>Parameter</strong></td>
   <td><strong>Type</strong></td>
   <td><strong>Required</strong> </td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>searchJobId</td>
   <td>String</td>
   <td>Yes</td>
   <td>The ID of the search job. </td>
  </tr>
</table>

#### Sample session

```bash
curl -b cookies.txt -c cookies.txt -X DELETE
-H 'Accept: application/json' --user <ACCESSID>:<ACCESSKEY>
https://api.sumologic.com/api/v1/search/jobs/37589506F194FC80
```

<details>
<summary>Which API endpoint should I use?</summary>

<ApiEndpoints/>

</details>

</details>

## Bash this Search Job

You can use the following script to exercise the API. 

:::note
Ensure that you send ACCESSID/ACCESSKEY pair even if cookies are sent for the Search Job APIs.
:::

```bash
#!/bin/bash

# Variables.
PROTOCOL=$1    # HTTPS is the only acceptable PROTOCOL
HOST=$2        # Use your Sumo endpoint as the HOST
ACCESSID=$3    # Authenticate with an access id and key
ACCESSKEY=$4
OPTIONS="--silent -b cookies.txt -c cookies.txt"
OPTIONS="-v -b cookies.txt -c cookies.txt"
OPTIONS="-v --trace-ascii -b cookies.txt -c cookies.txt"

Create a search job from a JSON file.
#
RESULT=$(curl $OPTIONS  \
          -H "Content-type: application/json"   \
          -H "Accept: application/json"   \
          -d @createSearchJob.json   \
          --user $ACCESSID:$ACCESSKEY    \
          "$PROTOCOL://$HOST/api/v1/search/jobs")
JOB_ID=$(echo $RESULT | perl -pe 's|.*"id":"(.*?)"[,}].*|\1|')
echo Search job created, id: $JOB_ID

# Wait until the search job is done.

STATE=""
until [ "$STATE" = "DONE GATHERING RESULTS" ]; do
  sleep 5
  RESULT=$(curl $OPTIONS  \
            -H "Accept: application/json"  \
            --user $ACCESSID:$ACCESSKEY \
            "$PROTOCOL://$HOST/api/v1/search/jobs/$JOB_ID")
  STATE=$(echo $RESULT | sed 's/.*"state":"\(.*\)"[,}].*/\1/')
  MESSAGES=$(echo $RESULT | perl -pe 's|.*"messageCount":(.*?)[,}].*|\1|')
  RECORDS=$(echo $RESULT | perl -pe 's|.*"recordCount":(.*?)[,}].*|\1|')
  echo Search job state: $STATE, message count: $MESSAGES, record count: $RECORDS
done


# Get the first ten messages.

RESULT=$(curl $OPTIONS  \
          -H "Accept: application/json"   \
          --user $ACCESSID:$ACCESSKEY  \
          "$PROTOCOL://$HOST/api/v1/search/jobs/$JOB_ID/messages?offset=0&limit=10")
echo Messages:
echo $RESULT


# Get the first 2 records.

RESULT=$(curl $OPTIONS  \
          -H "Accept: application/json"  \
          --user $ACCESSID:$ACCESSKEY   \
          "$PROTOCOL://$HOST/api/v1/search/jobs/$JOB_ID/records?offset=0&limit=1")
echo Records:
echo $RESULT


# Delete the search job.

RESULT=$(curl $OPTIONS    \
          -X DELETE  \
          -H "Accept: application/json"  \
          --user $ACCESSID:$ACCESSKEY  \
          "$PROTOCOL://$HOST/api/v1/search/jobs/$JOB_ID")
JOB_ID=$(echo $RESULT | sed 's/^.*"id":"\(.*\)".*$/\1/')
echo Search job deleted, id: $JOB_ID
```


