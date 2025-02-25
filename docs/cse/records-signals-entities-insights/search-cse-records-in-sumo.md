---
id: search-cse-records-in-sumo
title: Searching for Cloud SIEM Records in Sumo Logic
sidebar_label: Search Sumo Logic for Cloud SIEM Records
description: Learn how to search the Sumo Logic platform for Cloud SIEM records.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about how to search the Sumo Logic platform for records and signals that have been forwarded from Cloud SIEM. For more information about performing log searches in Sumo Logic, see [Search Basics](/docs/search/get-started-with-search/search-basics).

## Partitions with Cloud SIEM data
This section has information about the Sumo Logic partitions that contain Cloud SIEM data.

### Partitions for Cloud SIEM records

In Cloud SIEM, normalized records are categorized by [record type](/docs/cse/schema/cse-record-types/), for example, Audit, Authentication, Network, NetworkDHCP, and so on.

In Sumo Logic, records are stored in partitions, which are indexes that enable better search performance. The table below shows which partition each record type is stored in. Note that some partitions contain multiple record types.

| Cloud SIEM record type                   | Sumo Logic partition      |
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


There is a separate partition for forwarded raw messages for which records were not created, because no log mapper was available.

:::tip
Inventory log data is not stored in any `sec_record*` partitions. You must use `_siemDataType=Inventory` in your query to find inventory data. See [Searching Inventory Data](/docs/cse/administration/inventory-sources-and-data/#searching-inventory-data).
:::

### Partition for unparsed or unmapped messages

| Cloud SIEM record type | Sumo Logic partition |
|:-----------------|:----------------------|
| FailedRecord    | sec_record_failure   |

Within a FailedRecord, `fields.reason` will contain the reason why the FailedRecord was generated. The following query will extract the failure reason:

```
_index=sec_record_failure | fields %fields.reason
```

### Partition for Cloud SIEM signals

Cloud SIEM signals are retained in the **sec_signal** partition. Signals are saved in JSON format, and support search by keyword and nested attributes.

The **sec_signal** partition is automatically generated, and its contents are retained for two years, at no additional cost.

## About the Security Record Details view

When you query Cloud SIEM records or signals in a Sumo Logic log search tab, the contents of each record or signal are presented in a field named **Security Record Details**. The **Security Record Details** is somewhat unique in that it cannot be referenced in a query itself. It is a read-only field. Note however, that you can add subfields of the **Security Record Details** field as separate columns in the field browser. You can see an example of doing that in [Save a query with predefined display fields](#save-a-query-with-predefined-display-fields) below. And like any other field, you can hide the **Security Record Details** field, if desired.

<img src={useBaseUrl('img/cse/security-record-details.png')} alt="Security records details" style={{border: '1px solid gray'}} width="600"/>


## Search records from the Partitions page

If you have the **View Partitions** role capability, you can search Cloud SIEM partitions from the **Partitions** page in the Sumo Logic UI.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Partitions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Partitions**. You can also click the **Go To...** menu at the top of the screen and select **Partitions**.
1. The partitions that contain Cloud SIEM records begin with the string "sec_record".<br/><img src={useBaseUrl('img/cse/security-partitions.png')} alt="Security partitions" style={{border: '1px solid gray'}} width="800"/>  
2. To search for all content in the partition, click the icon that appears next to a Partition name when you hover over a row.  
3. A log search tab opens with a query, like `_index=PartitionName`, that returns all of the logs created within the currently selected time range, 15 minutes by default. For a description of the results, see [Search all records in a partition](#search-all-record-partitions), below.

## Search data in a log search tab

To  search a Sumo Logic partition, you specify the name of the partition using `_index= PartitionName`. The sections below provide instructions for scoping a search so that it returns the data you’re interested in.

## Open a log search tab

To open a log search tab in Sumo Logic, go to the **Home** screen and select **Log Search**.

## Search all records or signals in a partition 

To return all the records or signals in a partition, all you need to include in your query is the partition name. For example, to search all records in the `sec_record_network` partition, choose a time range, enter the query below, and then click **Start**:

```sql
_index=sec_record_network
```

<img src={useBaseUrl('img/cse/record-search-results.png')} alt="Record search results" style={{border: '1px solid gray'}} width="800"/>

Note that:

* The query returns all of the record types that are stored in the partition: Network, NetworkDHCP, NetworkDNS, NetworkFlow, NetworkHTTP, and NetworkProxy
* By default, two record fields are displayed: `Time` and `Security Record Details`, which contains all of the data from the underlying record.  You can display additional fields by checkmarking desired fields in the **Hidden Fields** area. You can also use the fields operator to specify the fields you want displayed and save the search as described in the following section. 

#### Save a query with predefined display fields

You can use the `fields` operator to choose the fields you want to be displayed when you run the search. You can add additional fields to those that are displayed by default. 

To add display fields:

This query adds the `objectType` (which contains the record type) and the `user_username` fields to the displayed output:

```sql
_index = sec_record_audit
| fields objectType, user_username
```
<img src={useBaseUrl('img/cse/fields-added.png')} alt="Fields added" style={{border: '1px solid gray'}} width="800"/>

**To save a search**

1. To save the query for future use, choose **Save As** from the three-dot kebab menu in the search bar.<br/><img src={useBaseUrl('img/cse/save-as.png')} alt="Save as log search" style={{border: '1px solid gray'}} width="800"/>
2. On the **Save Item** popup, name the query, choose a folder location, and then click **Save**.<br/><img src={useBaseUrl('img/cse/save.png')} alt="Save" style={{border: '1px solid gray'}} width="400"/>

## Search multiple partitions

You can search multiple partitions by using `OR` in the query. For example, to search all records in the `sec_record_audit` and `sec_record_network` partitions: 

```sql
_index = sec_record_audit OR _index = sec_record_network
```

## Search all record partitions

To search all records in all of the in partitions that contain Cloud SIEM records, use an asterisk (`*`)wildcard.

```sql
_index = sec_record_*
```

## Query by record type

The `objectType` field in a record indicates its record type. To restrict results to a particular record type, use `_index` to identify the partition that contains that record type, and `objectType` to specify the record type. For example, to search for NetworkHTTP records in the `sec_record_network` partition:

```sql
_index = sec_record_network objectType=NetworkHTTP
```

## Return a count of records by record type 

You can use the count operator to aggregate your query results. In the following query, we use the asterisk wildcard to search across all partitions that contain Cloud SIEM records, and count the results by `objectType`, which contains the record type. The following query returns the count of records of each type. 

```
_index = sec_record_*
| count as Total _view, objectType
| order by Total
```

## Search by keyword

You can search Cloud SIEM fields by keyword, for example:

`_index=sec_record_authentication kerberos`

### Referencing nested JSON fields

The **Security Record Details** field contains a JSON object with all of the fields from the underlying record or signal. Some of the data is nested in one or more sub-objects, like the `fields` object for record., shown expanded in the screenshot below. The fields object contains the contents of the [fields](/docs/cse/schema/schema-attributes) field in the underlying record, which is all of the unnormalized data from the original log message before it was normalized to the Cloud SIEM schema.

<img src={useBaseUrl('img/cse/nested-fields.png')} alt="Nested fields" style={{border: '1px solid gray'}} width="800"/>

You can access the contents of nested attributes, like `fields` in the example below, using a `where` clause:  

```
_index=sec_record_authentication
| where %"fields.application" = "test_app"
```
<img src={useBaseUrl('img/cse/extracted-field.png')} alt="Extracted field" style={{border: '1px solid gray'}} width="800"/>

## Security index search limitations

* When you use wildcards for field values in a query scope, only records in which those fields are present and not null will be returned. For example, the following query will only return records if the `srcDevice_ip` is present and not null:
    ```
    _index = sec_record_* srcDevice_ip=*
    ```  
* The partitions that contain Cloud SIEM records and signals are stored in a dedicated security data tier. You can’t access data in the security indexes and data in other data tiers (Continuous, Frequent, or Infrequent) and flex in the same query.
