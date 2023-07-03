---
id: search-cse-records-in-sumo
title: Searching for CSE Records in Sumo Logic
sidebar_label: Search Sumo Logic for CSE Records
description: Learn how to search the Sumo Logic platform for CSE Records.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about how to search the Sumo Logic platform for Records and Signals that have been forwarded from CSE. For more information about performing log searches in Sumo Logic, see [Search Basics](/docs/search/get-started-with-search/search-basics).

## Partitions with CSE data
This section has information about the Sumo Logic partitions that contain CSE data.

### Partitions for CSE Records

In CSE, normalized Records are categorized by [Record type](/docs/cse/schema/cse-record-types/), for example, Audit, Authentication, Network, NetworkDHCP, and so on.

In Sumo Logic, Records are stored in partitions, which are indexes that enable better search performance. The table below shows which partition each Record type is stored in. Note that some partitions contain multiple Record types.

| CSE Record type                   | Sumo Logic partition      |
|:-----------------------------------|:---------------------------|
| Audit                             | sec_record_audit          |
| AuditChange                       | sec_record_audit          |
| AuditFile                         | sec_record_audit          |
| AuditResourceAccess               | sec_record_audit          |
| Authentication                    | sec_record_authentication |
| AuthenticationPrivilegeEscalation | sec_record_authentication |
| Email                             | sec_record_email          |
| Endpoint                          | sec_record_endpoint       |
| EndpointModuleLoad                | sec_record_endpoint       |
| EndpointProcess                   | sec_record_endpoint       |
| Network                           | sec_record_network        |
| NetworkDHCP                       | sec_record_network        |
| NetworkDNS                        | sec_record_network        |
| NetworkFlow                       | sec_record_network        |
| NetworkHTTP                       | sec_record_network        |
| NetworkProxy                      | sec_record_network        |
| Notification                      | sec_record_notification   |
| NotificationVulnerability         | sec_record_notification   |


There is a separate partition for forwarded raw messages for which Records were not created, because no log mapper was available.   

### Partition for unparsed or unmapped messages

| CSE Record Type | Sumo Logic partition |
|:-----------------|:----------------------|
| FailedRecord    | sec_record_failure   |

Within a FailedRecord, `fields.reason` will contain the reason why the FailedRecord was generated. The following query will extract the failure reason:

```
_index=sec_record_failure | fields %fields.reason
```

### Partition for CSE Signals

CSE Signals are retained in the **sec_signal** partition. Signals are saved in JSON format, and support search by keyword and nested attributes.

The **sec_signal** partition is automatically generated, and its contents are retained for two years, at no additional cost.

## About the Security Record Details view

When you query CSE Records or Signalsin a Sumo Logic log search tab, the contents of each Record or Signal are presented in a field named **Security Record Details**. The **Security Record Details** is somewhat unique in that it can't be referenced in a query itself. It is a read-only field. Note however, that you can add subfields of the **Security Record Details** field as separate columns in the field browser. You can see an example of doing that in [Save a query with predefined display fields](#save-a-query-with-predefined-display-fields) below. And like any other field, you can hide the **Security Record Details** field, if desired.

<img src={useBaseUrl('img/cse/security-record-details.png')} alt="Security records details" width="600"/>


## Search Records or from the Partitions page

If you have the **View Partitions** role capability, you can search CSE partitions from the **Partitions** page in the Sumo Logic UI.

1. Go to **Manage Data > Logs > Partitions**.
1. The partitions that contain CSE Records begin with the string "sec_record".<br/><img src={useBaseUrl('img/cse/security-partitions.png')} alt="Security partitions" width="800"/>  
2. To search for all content in the partition, click the icon that appears next to a Partition name when you hover over a row.  
3. A log search tab opens with a query, like `_index=PartitionName`, that returns all of the logs created within the currently selected time range, 15 minutes by default. For a description of the results, see [Search all Records in a partition](#search-all-record-partitions), below.

## Search data in a log search tab

To  search a Sumo Logic partition, you specify the name of the partition using `_index= PartitionName`. The sections below provide instructions for scoping a search so that it returns the data you’re interested in.

## Open a log search tab

To open a log search tab in Sumo Logic, click **+ New** and select **Log Search**.

<img src={useBaseUrl('img/cse/open-log-search.png')} alt="Open log search" width="800"/>

## Search all Records or Signals in a partition 

To return all the Records or Signals in a partition, all you need to include in your query is the partition name. For example, to search all Records in the `sec_record_network` partition, choose a time range, enter this query, and click **Start**:

`_index=sec_record_network`

<img src={useBaseUrl('img/cse/record-search-results.png')} alt="Record search results" width="800"/>

Note that:

* The query returns all of the Record types that are stored in the partition: Network, NetworkDHCP, NetworkDNS, NetworkFlow, NetworkHTTP, and NetworkProxy
* By default, two Record fields are displayed: `Time` and `Security Record Details`, which contains all of the data from the underlying Record.  You can display additional fields by checkmarking desired fields in the **Hidden Fields** area. You can also use the fields operator to specify the fields you want displayed and save the search as described in the following section. 

#### Save a query with predefined display fields

You can use the `fields` operator to choose the fields you want to be displayed when you run the search. You can add additional fields to those that are displayed by default. 

To add display fields:

This query adds the `objectType` (which contains the Record type) and the `user_username` fields to the displayed output:

```sql
_index = sec_record_audit
| fields objectType, user_username
```
<img src={useBaseUrl('img/cse/fields-added.png')} alt="Fields added" width="800"/> 

**To save a search**

1. To save the query for future use, choose **Save As** from the three-dot more options menu in the search bar.<br/><img src={useBaseUrl('img/cse/save-as.png')} alt="Save as log search" width="800"/> 
2. On the **Save Item** popup, name the query, choose a folder location, and then click **Save**.<br/><img src={useBaseUrl('img/cse/save.png')} alt="Save" width="400"/> 

## Search multiple partitions

You can search multiple partitions by using `OR` in the query. For example, to search all Records in the `sec_record_audit` and `sec_record_network` partitions: 

```sql
_index = sec_record_audit OR _index = sec_record_network
```

## Search all Record partitions

To search all Records in all of the in partitions that contain CSE Records, use an asterisk (`*`)wildcard.

```sql
_index = sec_record_*
```

## Query by Record type

The `objectType` field in a Record indicates its Record type. To restrict results to a particular Record type, use `_index` to identify the partition that contains that Record type, and `objectType` to specify the Record type. For example, to search for NetworkHTTP Records in the `sec_record_network` partition:

```sql
_index = sec_record_network objectType=NetworkHTTP
```

## Return a count of Records by Record type 

You can use the count operator to aggregate your query results. In the following query, we use the asterisk wildcard to search across all partitions that contain CSE Records, and count the results by `objectType`, which contains the Record type. The following query returns the count of Records of each type. 

```
_index = sec_record_*
| count as Total _view, objectType
| order by Total
```

## Search by keyword

You can search CSE fields by keyword, for example:

`_index=sec_record_authentication kerberos`

### Referencing nested JSON fields

The **Security Record Details** field contains a JSON object with all of the fields from the underlying Record or Signal. Some of the data is nested in one or more sub-objects, like the `fields` object for Record., shown expanded in the screenshot below. The fields object contains the contents of the [fields](/docs/cse/schema/schema-attributes) field in the underlying Record, which is all of the unnormalized data from the original log message before it was normalized to the CSE schema.

<img src={useBaseUrl('img/cse/nested-fields.png')} alt="Nested fields" width="800"/>

You can access the contents of nested attributes, like `fields` in the example below, using a `where` clause:  

```
_index=sec_record_authentication
| where %"fields.application" = "test_app"
```
<img src={useBaseUrl('img/cse/extracted-field.png')} alt="Extracted field" width="800"/>

## Security index search limitations

* When you use wildcards for field values in a query scope, only Records in which those fields are present and not null will be returned. For example, the following query will only return Records if the `srcDevice_ip` is present and not null:
    ```
    _index = sec_record_* srcDevice_ip=*
    ```  
* The partitions that contain CSE Records and Signals are stored in a dedicated security data tier. You can’t access data in the security indexes and data in other data tiers (Continuous, Frequent, or Infrequent) in the same query.
