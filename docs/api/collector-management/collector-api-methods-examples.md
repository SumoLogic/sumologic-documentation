---
id: collector-api-methods-examples
title: Collector API Methods and Examples
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Collector Management API gives you the ability to manage Collectors and Sources from HTTP endpoints.

:::caution
Collector Management APIs are not yet built with OpenAPI specifications and therefore not included in our [Swagger docs](https://api.sumologic.com/docs/). Instead, refer to the below documentation.
:::

## Before You Begin

:::info
You need the [Manage or View Collectors role capability](/docs/manage/users-roles/roles/role-capabilities/#data-management) to manage or view Collection configurations.
:::

See the following topics for additional information:

* [API Authentication](/docs/api/getting-started#Authentication) for information on API authentication options.
* [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for a list of API endpoints to use to connect your API client to the Sumo Logic API.
* [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for a description of Source parameters.
* [View or Download Collector or Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) for instructions on viewing or downloading the current JSON configuration file for a collector or source from the web application.
* [Troubleshooting APIs](/docs/api/troubleshooting.md)

There is a community-supported script available on GitHub that allows you to conduct bulk actions to Collectors. See [Collector Management Script](https://github.com/SumoLogic/collector-management-client).

{@import ../../reuse/api-endpoints.md}


## Collector API Methods and Examples

The Collector Management API allows you to manage Collectors and Sources from an HTTP endpoint. This topic describes the Collector API parameters, methods, and lists error codes.

## Rate limiting

{@import ../../reuse/api-rate-limit.md}

## Response fields  

The following table lists the API response fields for installed and hosted Collectors.

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Access</strong>
   </td>
  </tr>
  <tr>
   <td>alive
   </td>
   <td>Boolean
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>When a Collector is running it sends Sumo a heartbeat message every 15 seconds. If no heartbeat message is received after 30 minutes this becomes <code>false</code>.
   </td>
   <td>Transient
   </td>
  </tr>
  <tr>
   <td>category
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>Null
   </td>
   <td>The Category of the Collector, used as metadata when searching data.
   </td>
   <td>Modifiable
   </td>
  </tr>
  <tr>
   <td>collectorType
   </td>
   <td>String
   </td>
   <td>
   </td>
   <td>
   </td>
   <td>The Collector type: <code>Installable</code> or <code>Hosted</code>
   </td>
   <td>Not modifiable
   </td>
  </tr>
  <tr>
   <td>collectorVersion
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Version of the Collector software installed.
   </td>
   <td>Transient
   </td>
  </tr>
  <tr>
   <td>cutoffRelativeTime
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>
   </td>
   <td>Can be specified instead of <code>cutoffTimestamp</code> to provide a relative offset with respect to the current time. Example: use <code>"-1h"</code>, <code>"-1d"</code>, or <code>"-1w"</code> to collect data that's less than one hour, one day, or one week old, respectively.
   </td>
   <td>Not modifiable
   </td>
  </tr>
  <tr>
   <td>cutoffTimestamp
   </td>
   <td>Long
   </td>
   <td>No
   </td>
   <td>0 (collects all data)
   </td>
   <td>Only collect data from files with a modified date more recent than this timestamp, specified as milliseconds since epoch. (Note that if you set this property to a timestamp that overlaps with data that was previously ingested on a source, it may result in duplicated data to be ingested into Sumo Logic.)  
   </td>
   <td>Modifiable
   </td>
  </tr>
  <tr>
   <td>description
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>Null
   </td>
   <td>Description of the Collector.
   </td>
   <td>Modifiable
   </td>
  </tr>
  <tr>
   <td>ephemeral
   </td>
   <td>Boolean
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>When true, the collector will be deleted after 12 hours of inactivity. For more information, see <a href="/docs/send-data/installed-collectors/collector-installation-reference/set-collector-as-ephemeral">Setting a Collector as Ephemeral</a>.
   </td>
   <td>Modifiable
   </td>
  </tr>
  <tr>
   <td>fields
   </td>
   <td>JSON Object
   </td>
   <td>No
   </td>
   <td>
   </td>
   <td>JSON map of key-value <a href="/docs/manage/fields">fields</a> (metadata) to apply to the Collector. To assign an <a href="/docs/manage/ingestion-volume/ingest-budgets">Ingest Budget</a> to the Collector use the field <code>_budget</code> with the Field Value of the Ingest Budget to assign. For example, if you have a budget with a Field Value of <code>Dev_20GB</code>, you would add:
   <p><code>fields=_budget=Dev_20GB</code></p>
   </td>
   <td>Modifiable
   </td>
  </tr>
  <tr>
   <td>hostName
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>Null
   </td>
   <td>Host name of the Collector. The hostname can be a maximum of 128 characters.
   </td>
   <td>Modifiable
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>Long
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Identifier
   </td>
   <td>Not modifiable
   </td>
  </tr>
  <tr>
   <td>lastSeenAlive
   </td>
   <td>Long
   </td>
   <td>No
   </td>
   <td>
   </td>
   <td>The last time the Sumo Logic service received an active heartbeat from the Collector, specified as milliseconds since epoch.
   </td>
   <td>Transient
   </td>
  </tr>
  <tr>
   <td>name
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Name of the Collector. It must be unique on your account.
   </td>
   <td>Modifiable
   </td>
  </tr>
  <tr>
   <td>sourceSyncMode
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>UI
   </td>
   <td>For installed Collectors, whether the Collector is using local source configuration management (using a <code>JSON</code> file), or cloud management (using the <code>UI</code>)
   </td>
   <td>Modifiable
   <p>To assign to <code>JSON</code>, <a href="/docs/send-data/use-json-configure-sources/local-configuration-file-management/existing-collectors-and-sources">learn more</a>.</p>
   </td>
  </tr>
  <tr>
   <td>timeZone
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>Null
   </td>
   <td>Time zone of the Collector. For a list of possible values, refer to the "TZ" column in <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones">this Wikipedia article</a>.
   </td>
   <td>Modifiable
   </td>
  </tr>
  <tr>
   <td>targetCpu
   </td>
   <td>Long
   </td>
   <td>No
   </td>
   <td>Null
   </td>
   <td>When CPU utilization exceeds this threshold, the Collector will slow down its rate of ingestion to lower its CPU utilization. Currently only Local and Remote File Sources are supported. The value must be expressed as a whole number percentage. The collector will adjust resources to attempt to limit the CPU usage to at most 20%. For more information, see <a href="/docs/send-data/collection/set-collector-cpu-usage-target">Set the Collector CPU Usage Target</a>.
   </td>
   <td>Modifiable</td>
  </tr>
</table>

The following table lists additional response fields for Installed Collectors only.

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Access</strong>
   </td>
  </tr>
  <tr>
   <td>osName
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>Name of OS that Collector is installed on.
   </td>
   <td>Not modifiable
   </td>
  </tr>
  <tr>
   <td>osVersion
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>Version of the OS that Collector is installed on.
   </td>
   <td>Not modifiable
   </td>
  </tr>
  <tr>
   <td>osArch
   </td>
   <td>
   </td>
   <td>Yes
   </td>
   <td>Architecture of the OS that Collector is installed on.
   </td>
   <td>Not modifiable
   </td>
  </tr>
  <tr>
   <td>osTime
   </td>
   <td>Long
   </td>
   <td>Yes
   </td>
   <td>Time that the Collector has been running, in milliseconds.
   </td>
   <td>Not modifiable
   </td>
  </tr>
</table>



## GET methods  

### List Collectors   

Get a list of Collectors with an optional limit and offset.

**Method:** `GET Path: /collectors`

<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>filter
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>All Collectors
   </td>
   <td>Filter the Collectors returned using one of the available filter types:

<code>installed</code>, <code>hosted</code>, <code>dead</code>, or <code>alive</code>.
   </td>
  </tr>
  <tr>
   <td>limit
   </td>
   <td>Integer
   </td>
   <td>No
   </td>
   <td>1000
   </td>
   <td>Max number of Collectors to return.
   </td>
  </tr>
  <tr>
   <td>offset
   </td>
   <td>Integer
   </td>
   <td>No
   </td>
   <td>0
   </td>
   <td>Offset into the list of Collectors.
   </td>
  </tr>
</table>


#### Example  

In this example, setting `limit=10` limits the responses to 10.

Request:

```bash
curl -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors?limit=10
```


Response:

```json
{  
   "collectors":[  
      {  
         "id":2,
         "name":"OtherCollector",
         "collectorType":"Installable",
         "alive":true,
         "links":[  
            {  
               "rel":"sources",
               "href":"/v1/collectors/2/sources"
            }
         ],
         "collectorVersion":"19.33-28",
         "ephemeral":false,
         "description":"Local Windows Collection",
         "osName":"Windows 7",
         "osArch":"amd64",
         "osVersion":"6.1",
         "category":"local"
      },
      ...
   ]
}
```



### List Offline Collectors

Get a list of **Installed** Collectors last seen alive before a specified number of days with an optional limit and offset.

**Method:** `GET Path: /collectors/offline`


<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>aliveBeforeDays
   </td>
   <td>Integer
   </td>
   <td>No
   </td>
   <td>100
   </td>
   <td>Minimum number of days the Collectors have been offline.

Must be at least 1 day.
   </td>
  </tr>
  <tr>
   <td>limit
   </td>
   <td>Integer
   </td>
   <td>No
   </td>
   <td>1000
   </td>
   <td>Max number of Collectors to return.
   </td>
  </tr>
  <tr>
   <td>offset
   </td>
   <td>Integer
   </td>
   <td>No
   </td>
   <td>0
   </td>
   <td>Offset into the list of Collectors.
   </td>
  </tr>
</table>



#### Example

In this example, setting `aliveBeforeDays=10` returns a list of Installed Collectors that have been offline for at least 10 days.

Request:

```bash
curl -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors/offline?aliveBeforeDays=10
```


Response:


```json
{
  "collectors":[{
    "id":101622144,
    "name":"My Installed Collector",
    "timeZone":"Etc/UTC",
    "fields":{
      "_budget":"test_budget"
    },
    "links":[{
      "rel":"sources",
      "href":"/v1/collectors/101622144/sources"
    }],
    "ephemeral":false,
    "targetCpu":-1,
    "sourceSyncMode":"UI",
    "collectorType":"Installable",
    "collectorVersion":"19.162-12",
    "osVersion":"10.12.6",
    "osName":"Mac OS X",
    "osArch":"x86_64",
    "lastSeenAlive":1521143016128,
    "alive":false
  }]
}
```



### Get Collector by ID  

Get the Collector with the specified Identifier.

**Method:** `GET Path: /collectors/[id]`


<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>Integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique identifier of the Collector.
   </td>
  </tr>
</table>



#### Example  

This example gets the Collector with an ID of 25.

Request:

```sh
curl -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors/25
```


Response:


```json
{
  "collector":{
    "id":25,
    "name":"dev-host-1",
    "timeZone":"UTC",
    "ephemeral":false,
    "sourceSyncMode":"Json",
    "collectorType":"Installable",
    "collectorVersion":"19.162-12",
    "osVersion":"3.13.0-92-generic",
    "osName":"Linux",
    "osArch":"amd64",
    "lastSeenAlive":1471553524302,
    "alive":true
  }
}
```



### Get Collector by Name  

**Method:** `GET Path: /collectors/name/[name]`


<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>name
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Name of the Collector.
   </td>
  </tr>
</table>



#### Rules

* Names with special characters are not supported, such as `;` `/` `%` `\` even if they are URL encoded.
* Spaces in names are supported when they are URL encoded. A space character URL encoded is `%20`. For example, a Collector named `Staging Area` would be encoded as `https://api.sumologic.com/api/v1/collectors/name/Staging%20Area`.
* Names with a period `.` need to have a trailing forward slash `/` at the end of the request URL. For example, a Collector named `Staging.Area` should be provided as `https://api.sumologic.com/api/v1/collectors/name/Staging.Area/`.


#### Example  

This example gets the Collector with the name test.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors/name/test
```



Response:


```json
{
  "collector":{
    "id":31,
    "name":"test",
    "timeZone":"UTC",
    "ephemeral":false,
    "sourceSyncMode":"Json",
    "collectorType":"Installable",
    "collectorVersion":"19.162-12",
    "osVersion":"3.13.0-92-generic",
    "osName":"Linux",
    "osArch":"amd64",
    "lastSeenAlive":1471553524302,
    "alive":true
  }
}
```



## POST methods

### Create Hosted Collector

Use the POST method with a JSON file to create a new Hosted Collector. The required parameters can be referenced in the [Response fields](#Response_fields) table above. Note that "id" field should be omitted when creating a new Hosted Collector.

This method can only be used to create Hosted Collectors. You must [install a Collector manually](/docs/send-data/installed-collectors/sources) to create an Installed Collector.

**Method: `POST Path: /collectors`**


#### Example

This example creates a new Hosted Collector using the parameters in the JSON file.

Request:

```bash
curl -u '<accessId>:<accessKey>' -X POST -H "Content-Type: application/json" -T hosted_collector.json https://api.sumologic.com/api/v1/collectors
```

Request JSON (hosted_collector.json):


```json
{
  "collector":{
    "collectorType":"Hosted",
    "name":"My Hosted Collector",
    "description":"An example Hosted Collector",
    "category":"HTTP Collection",
    "fields": {
        "_budget":"test_budget"
    }
  }
}
```


Response:


```
{
  "collector":{
    "id":102087219,
    "name":"My Hosted Collector",
    "description":"An example Hosted Collector",
    "category":"HTTP Collection",
    "timeZone":"UTC",
    "fields":{
      "_budget":"test_budget"
    },
    "links":[{
      "rel":"sources",
      "href":"/v1/collectors/102087219/sources"
    }],
    "collectorType":"Hosted",
    "collectorVersion":"",
    "lastSeenAlive":1536618284387,
    "alive":true
  }
```



## PUT methods  


### Update a Collector  

Use the PUT method with your JSON file to update an existing Collector. Available parameters can be referenced in the [Response fields](#Response-fields) table above. The JSON request file must specify values for all required fields. Not modifiable fields must match their current values in the system. This is in accordance with HTTP 1.1 RFC-2616 Section 9.6.

Updating a Collector also requires the "If-Match" header to be specified with the "ETag" provided in the headers of a previous GET request.

**Method:** `PUT Path: /collectors/[id]`


<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>Integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>ID of the Collector.
   </td>
  </tr>
</table>



#### Example  

This example changes the Collector to set the parameter "ephemeral" to true.

First, use a GET request with -v flag to obtain the "ETag" header value.

Initial GET Request:


```bash
curl -v -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors/15
```

Initial `GET` Response:


```
< HTTP/1.1 200 OK
< ETag: "f58d12c6986f80d6ca25ed8a3943daa9"
...
{
  "collector":{
    "id":15,
    "name":"dev-host-1",
    "timeZone":"UTC",
    "ephemeral":false,
    "sourceSyncMode":"Json",
    "collectorType":"Installable",
    "collectorVersion":"19.162",
    "osVersion":"3.13.0-92-generic",
    "osName":"Linux",
    "osArch":"amd64",
    "lastSeenAlive":1471553974526,
    "alive":true
  }
* Connection #0 to host api.sumologic.com left intact
```


Next, modify the Collector's JSON attributes as needed (in this example, setting "ephemeral" to "true"), and use a PUT request, passing the "ETag" value obtained above with the "If-Match" header.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X PUT -H "Content-Type: application/json" -H "If-Match: \"f58d12c6986f80d6ca25ed8a3943daa9\"" -T updated_collector.json https://api.sumologic.net/api/v1/collectors/15
```


Request JSON (updated_collector.json):


```json
{
 "collector":{
    "id":15,
    "name":"dev-host-1",
    "timeZone":"UTC",
    "ephemeral":true,
    "sourceSyncMode":"Json",
    "collectorType":"Installable",
    "collectorVersion":"19.162",
    "osVersion":"3.13.0-92-generic",
    "osName":"Linux",
    "osArch":"amd64",
    "lastSeenAlive":1471553974526,
    "alive":true
  }
}
```


Response:


```json
{
  "collector":{
    "id":15,
    "name":"dev-host-1",
    "timeZone":"UTC",
    "ephemeral":true,
    "sourceSyncMode":"Json",
    "collectorType":"Installable",
    "collectorVersion":"19.162",
    "osVersion":"3.13.0-92-generic",
    "osName":"Linux",
    "osArch":"amd64",
    "lastSeenAlive":1471554424736,
    "alive":true
  }
}
```



## DELETE methods  
28



### Delete Collector by ID


Use the DELETE method to delete an existing Collector.

**Method:** `DELETE Path: /collectors/[id]`


<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>id
   </td>
   <td>Integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique identifier of the Collector.
   </td>
  </tr>
</table>


This example deletes the Collector with ID 15.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X DELETE https://api.sumologic.com/api/v1/collectors/15
```



Response: There will be no response body, only a 200 OK response code.


### Delete Offline Collectors

Delete **Installed** Collectors last seen alive before a specified number of days.

**Method:** `DELETE Path: /collectors/offline`


<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required?</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>aliveBeforeDays
   </td>
   <td>Integer
   </td>
   <td>No
   </td>
   <td>100
   </td>
   <td>The minimum number of days the Collectors have been offline.

Must be at least 1 day.
   </td>
  </tr>
</table>



#### Example


In this example, setting `aliveBeforeDays=10` deletes all the Installed Collectors that have been offline for at least 10 days.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X DELETE https://api.sumologic.com/api/v1/collectors/offline?aliveBeforeDays=10
```



Response:

There will be no response body, only a 200 OK response with the message "The delete task has been initiated.". To check the status make GET requests and see if the Collectors have been deleted.

Error Codes and Messages  


<table>
  <tr>
   <td>Code
   </td>
   <td>Message
   </td>
  </tr>
  <tr>
   <td>BadRequestCollectorId
   </td>
   <td>Request body contains an invalid Collector ID.
   </td>
  </tr>
  <tr>
   <td>CannotModifyCollector
   </td>
   <td>User is not authorized to modify the specified Collector.
   </td>
  </tr>
  <tr>
   <td>CollectorDescriptionTooLong
   </td>
   <td>Maximum description length is 1024 characters.
   </td>
  </tr>
  <tr>
   <td>CollectorNameTooLong
   </td>
   <td>Maximum name length is 128 characters.
   </td>
  </tr>
  <tr>
   <td>createValidationError
   </td>
   <td>The specified ID is invalid.
   </td>
  </tr>
  <tr>
   <td>DuplicateResourceName
   </td>
   <td>A resource with the same name already exists.
   </td>
  </tr>
  <tr>
   <td>InvalidCollector
   </td>
   <td>The specified Collector ID is invalid.
   </td>
  </tr>
  <tr>
   <td>InvalidCollectorType
   </td>
   <td>Invalid Collector type for the requested operation.
   </td>
  </tr>
</table>
