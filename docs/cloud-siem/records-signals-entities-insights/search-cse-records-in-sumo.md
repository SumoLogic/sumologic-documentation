---
id: search-cse-records-in-sumo
---

# Searching for CSE Records in Sumo Logic

  
This topic has information about how to search the Sumo Logic platform for Records that have been forwarded from CSE. For more information about performing log searches in Sumo Logic, see Search Basics.

## Sumo Logic partitions that contain CSE Records

In CSE, normalized Records are categorized by [Record type](../CSE_Schema/05CSE_Record_Types.md "CSE Record Types"), for example Audit, Authentication, Network, NetworkDHCP, and so on.

In Sumo Logic, Records are stored in partitions, which are indexes that enable better search performance. The table below shows which partition each Record type is stored in. Note that some partitions contain multiple Record types.

| CSE Record type                   | Sumo Logic partition      |
|-----------------------------------|---------------------------|
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

| CSE Record Type | Sumo Logic partition |
|-----------------|----------------------|
| FailedRecord    | sec_record_failure   |

## About the Security Record Details view

When you query CSE Records in a Sumo Logic log search tab, the contents of each Record are presented in a field named **Security Record Details**. The **Security Record Details** is somewhat unique in that it can't be referenced in a query itself. It is a read-only field. Note however, that you can add subfields of the **Security Record Details** field as separate columns in the field browser. You can see an example of doing that in [Save a query with predefined display fields](./15Searching_for_CSE_Records_in_Sumo_Logic.md "Searching for CSE Records in Sumo Logic") below. And like any other field, you can hide the **Security Record Details** field, if desired.

![security-record-details.png](/img/cloud-siem-enterprise/security-record-details.png)

## Search CSE Records from the Partitions page

If you have the **View Partitions** role capability, you can search CSE partitions from the **Partitions** page in the Sumo Logic UI.

1. Go to **Manage Data \> Logs \> Partitions**.
1. The partitions that contain CSE Records begin with the string "sec_record".

    ![security-partitions.png](/img/cloud-siem-enterprise/security-partitions.png)
1. To search for all Records in the partition, click the icon that appears next to a Partition name when you hover over a row.  
1. A log search tab opens with a query, like `_index=PartitionName`, that returns all of the Records created within the currently selected time range, 15 minutes by default. For a description of the results, see [Search all Records in a partition](./15Searching_for_CSE_Records_in_Sumo_Logic.md "Searching for CSE Records in Sumo Logic"), below.

## Search CSE Records in a log search tab

To  search a Sumo Logic partition, you specify the name of the partition using `_index=\<index_nam\>`. The sections below provide instructions for scoping a search so that it returns the Records you’re interested in.

## Open a log search tab

To open a log search tab in Sumo Logic, click **+ New** and select **Log Search**.

![0.png](/img/cloud-siem-enterprise/open-log-search.png)

## Search all Records in a partition 

To return all the Records in a partition, all you need to include in your query is the partition name. For example, to search all Records in the `sec_record_network` partition, choose a time range, enter this query, and click **Start**:

`_index=sec_record_network`

![record-search-results.png](/img/cloud-siem-enterprise/record-search-results.png)

Note that:

* The query returns all of the Record types that are stored in the partition: Network, NetworkDHCP, NetworkDNS, NetworkFlow, NetworkHTTP, and NetworkProxy
* By default, two Record fields are displayed: `Time` and `Security Record Details`, which contains all of the data from the underlying Record.  You can display additional fields by checkmarking desired fields in the **Hidden Fields** area. You can also use the fields operator to specify the fields you want displayed and save the search as described in the following section. 

#### Save a query with predefined display fields

You can use the `fields` operator to choose the fields you want to be displayed when you run the search. You can add additional fields to those that are displayed by default. 

To add display fields:

This query adds the `objectType` (which contains the Record type) and the `user_username` fields to the displayed output:

```
_index = sec_record_audit
| fields objectType, user_username
```

![fields-added.png](/img/cloud-siem-enterprise/fields-added.png)

To save a search:

1. To save the query for future use, choose **Save As** from the three-dot more options menu in the search bar.

    ![save-as.png](/img/cloud-siem-enterprise/save-as.png)
1. On the **Save Item** popup, name the query, choose a folder location, and then click **Save**.

    ![save.png](/img/cloud-siem-enterprise/save.png)

## Search multiple partitions

You can search multiple partitions by using `OR` in the query. For example, to search all Records in the `sec_record_audit` and `sec_record_network` partitions: 

```
_index = sec_record_audit OR _index = sec_record_network
```

## Search all Record partitions

To search all Records in all of the in partitions that contain CSE Records, use an asterisk (\*)wildcard.

```
_index = sec_record_*
```

## Query by Record type

The `objectType` field in a Record indicates its Record type. To restrict results to a particular Record type, use `_index` to identify the partition that contains that Record type, and `objectType` to specify the Record type. For example, to search for NetworkHTTP Records in the `sec_record_network` partition:

```
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

The **Security Record Details** field contains a JSON object with all of the fields from the underlying Record. Some of the data is nested in the `fields` sub-object, shown expanded in the screenshot below–it has the content from the [fields](../CSE_Schema/01_Schema_Attributes.md "Schema Attributes")
field in the underlying Record, which is all of the unnormalized data from the original log message before it was normalized to the CSE schema.

![nested-fields.png](/img/cloud-siem-enterprise/nested-fields.png)

You can access the contents of the fields field using a where clause in your query, like this:  
  
```
_index=sec_record_authentication
| where %"fields.application" = "test_app"
```

![extracted-field.png](/img/cloud-siem-enterprise/extracted-field.png)

## Limitations

When you use wildcards for field values in a query scope, only Records in which those fields are present and not null will be returned. For example, the following query will only return Records if the `srcDevice_ip` is present and not null:

```
_index = sec_record_* srcDevice_ip=*
```  
 
