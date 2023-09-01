---
id: logreduce-keys
title: LogReduce Keys
description: Group by the keys of JSON or keyvalue logs.
---


The **LogReduce Keys** operator allows you to quickly explore JSON or key-value formatted logs by schemas. If you have a large volume of JSON or key-value logs with different formats and aren't sure which ones you need to focus on, this operator can process them into their object schemas so you can review which ones are relevant to your needs.

The operator accepts JSON and key-value data separated by `"=", ":", "\>", "\>"`. The keys are automatically parsed for you. 

The following table shows the fields that are returned in results.

| _signature_id | _schema | _count |
| :-- | :-- | :-- |
| The unique hash value assigned to the schema.<br/><br/>Unstructured logs will have a value of 0000000000000000. | The schema of the log message.<br/><br/>Unstructured logs will have a value of unknown.	| The number of logs that have the related schema.<br/><br/>The field is a clickable link that opens a new window with a query that drills down to the logs from the related schema. |

With the provided results you can:

* Explore logs from each schema by clicking the links provided in the `_count` response field.
* Compare results against a previous time range with [LogCompare](/docs/search/logcompare).
* Run subsequent searches.

## Syntax

```sql
| logreduce keys [parser <parser>] [maxdepth <maxdepth>] [field <fieldname>] [noaggregate]
```

| Parameter | Description | Default |
| :-- | :-- | :-- |
| parser | The parsing library to use, either `json` or `keyvalue`. | json |
| maxdepth | The maximum depth of the JSON parser. | 5 |
| field | The field to automatically parse. | Raw message ([`_raw`](/docs/search/get-started-with-search/search-basics/built-in-metadata)) |
| noaggregate | Use to return LogReduce results as raw messages. Using this option disables the aggregation process that runs by default. | Null |

Results can be returned in two ways:

* If the operator is last in the query (no operations follow it) it provides aggregate results by performing a [count by](/docs/search/search-query-language/group-aggregate-operators/count-count-distinct-and-count-frequent) operation.
* If you want to use operators after LogReduce you need to specify the `noaggregate` option so your results are returned non-aggregated.

## Limitations

* When not specifying a field with the `field=` option don't parse any fields. If you parse any fields they are excluded from the schema in your results. 
* A maximum of 100 keys are automatically parsed.
* Keys in arrays are not supported.
* The [Time Compare](../time-compare.md) button will not work on LogReduce Keys results, you need to manually input the [compare operator](/docs/search/search-query-language/search-operators/compare) instead.
* Response fields `_signature_id`, `_schema`, and `_count` are not supported with [Dashboard filters](../../dashboards-classic/edit-dashboards/use-filters-dashboards.md).

## _count link

* Searches opened by clicking the link provided in the `_count` response field:

    * are run against [message time](/docs/search/get-started-with-search/search-basics/built-in-metadata).
    * can return different results due to variations in your data.

* When provided in a Scheduled Search alert, the link from the `_count` response field is invalid and will not work.

## Examples

```sql
_sourcecategory = "Labs/AWS/GuardDuty_V8"
| json keys "region", "partition", "resource"
| logreduce keys field=resource
```

### Kubernetes

To get a summary of patterns in Kubernetes event logs you can quickly scan for unique schemas with LogReduce Keys:

```sql
_sourceCategory="primary-eks/events"
| logreduce keys
```

Returned schema:

```sql
object.apiversion, object.count, object.firsttimestamp, object.involvedobject.kind, object.involvedobject.name, object.involvedobject.namespace, object.kind, object.lasttimestamp, object.message, object.metadata.creationtimestamp, object.metadata.name, object.metadata.namespace, object.metadata.resourceversion, object.metadata.selflink, object.metadata.uid, object.reason, object.reportingcomponent, object.reportinginstance, object.source.component, object.type, timestamp, type, object.involvedobject.apiversion, object.involvedobject.resourceversion, object.involvedobject.uid, object.source.host, object.involvedobject.fieldpath
```

Next, use [LogReduce Values to explore the schema based on specific keys](logreduce-values.md).

### AWS CloudTrail

To get a summary of patterns in AWS CloudTrail logs that reference AccessDenied errors for AWS you'd use a query such as the following:

```sql {13}
_sourceCategory=*cloudtrail* *AccessDenied* 
| json field=_raw "userIdentity.userName" as userName nodrop
| json field=_raw "userIdentity.sessionContext.sessionIssuer.userName" as userName_role nodrop
| if (isNull(userName), if(!isNull(userName_role),userName_role, "Null_UserName"), userName) as userName 
| json field=_raw "eventSource" as eventSource
| json field=_raw "eventName" as eventName
| json field=_raw "awsRegion" as awsRegion
| json field=_raw "errorCode" as errorCode nodrop
| json field=_raw "errorMessage" as errorMessage nodrop
| json field=_raw "requestParameters.bucketName" as bucketName nodrop
| json field=_raw "recipientAccountId" as accountId
| where errorCode matches "*AccessDenied*" and eventSource matches "s3.amazonaws.com"  and accountId matches "*"
| logreduce keys 
| sort by _count desc
```

The schemas returned in your results are sorted based on the alphabetical ordering of keys to allow easy identification of changes in patterns.

![CloudTrail example LogReduce Keys.png](/img/search/behavior-insights/CloudTrail-example-LogReduce-Keys.png)

Next, use [LogReduce Values](logreduce-values.md) to explore the schema based on specific keys.
