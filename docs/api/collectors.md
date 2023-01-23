---
id: collectors
title: Sumo Logic Collector Management APIs
sidebar_label: Collector Management
description: The Collector Management API gives you the ability to manage Collectors and Sources from HTTP endpoints.
---


The Collector Management API gives you the ability to manage Collectors and Sources from HTTP endpoints. See the topics below for Collector API and Source API methods and examples, as well as upgrading and downgrading Collectors using the API.

:::note
Collector Management APIs are not yet built with OpenAPI specifications and therefore not documented with the rest of the APIs. Instead, refer to the instructions below for details.
:::

:::info
You need the Manage or View Collectors role capability to manage or view Collection configurations.
:::

## Before You Begin

See the following topics for additional information:

* [API Authentication](/docs/api/getting-started#Authentication) for information on API authentication options.
* [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for a list of API endpoints to use to connect your API client to the Sumo Logic API.
* [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for a description of Source parameters.
* [View or Download Collector or Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) for instructions on viewing or downloading the current JSON configuration file for a collector or source from the web application.
* [Troubleshooting APIs](/docs/api/troubleshooting.md)

There is a community-supported script available on GitHub that allows you to conduct bulk actions to Collectors, see [Collector Management Script](https://github.com/SumoLogic/collector-management-client).

Sumo Logic endpoints like `api.sumologic.com` are different in deployments outside us1. You need to specify your deployment in the endpoint. For example `api.<strong>YOUR_DEPLOYMENT</strong>.sumologic.com` you would specify <strong>`YOUR_DEPLOYMENT`</strong> as either `au`, `ca`, `de`, `eu`, `fed`, `in`, `jp`,` us1`, or `us2`. For us1, use `api.sumologic.com`. For the others, use `api.us2.sumologic.com`, and so on. For more information, see [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).

## Collector API Methods and Examples

The Collector Management API allows you to manage Collectors and Sources from an HTTP endpoint. This topic describes the Collector API parameters, methods, and lists error codes.

### Rate limiting

* A rate limit of four API requests per second (240 requests per minute) applies to all API calls from a user.
* A rate limit of 10 concurrent requests to any API endpoint applies to an access key.

If a rate is exceeded, a rate limit exceeded 429 status code is returned.


### Response fields  

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
   <td>Only collect data from files with a modified date more recent than this timestamp, specified as milliseconds since epoch
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
   <td>JSON map of key-value <a href="/docs/manage/fields">fields</a> (metadata) to apply to the Collector.

<p>To assign an <a href="/docs/manage/ingestion-volume/Ingest-Budgets">Ingest Budget</a> to the Collector use the field <code>_budget</code> with the Field Value of the Ingest Budget to assign. For example, if you have a budget with a Field Value of <code>Dev_20GB</code>, you would add:</p>

<code>fields=_budget=Dev_20GB</code>
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
<p>To assign to <code>JSON</code> see <a href="/docs/send-data/use-json-configure-sources/local-configuration-file-management/existing-collectors-and-sources">Local Configuration File Management for Existing Collectors and Sources</a>.</p>
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
   <td>When CPU utilization exceeds this threshold, the Collector will slow down its rate of ingestion to lower its CPU utilization.

Currently only Local and Remote File Sources are supported.

The value must be expressed as a whole number percentage. The collector will adjust resources to attempt to limit the CPU usage to at most 20%.

For more information, see <a href="/docs/send-data/collection/set-collector-cpu-usage-target">Set the Collector CPU Usage Target</a>.
   </td>
   <td>Modifiable
   </td>
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
13


This example gets the Collector with an ID of 25.

Request:


```
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
15


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
16




* Names with special characters are not supported, such as `;` `/` `%` `\` even if they are URL encoded.
* Spaces in names are supported when they are URL encoded. A space character URL encoded is `%20`. For example, a Collector named `Staging Area` would be encoded as `https://api.sumologic.com/api/v1/collectors/name/Staging%20Area`.
* Names with a period `.` need to have a trailing forward slash `/` at the end of the request URL. For example, a Collector named `Staging.Area` should be provided as `https://api.sumologic.com/api/v1/collectors/name/Staging.Area/`.


#### Example  
17


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
19



### Create Hosted Collector
20


Use the POST method with a JSON file to create a new Hosted Collector. The required parameters can be referenced in the [Response fields](#Response_fields) table above. Note that "id" field should be omitted when creating a new Hosted Collector.


21
This method can only be used to create Hosted Collectors. You must [install a Collector manually](/docs/send-data/installed-collectors/sources) to create an Installed Collector.

**Method: `POST Path: /collectors`**


#### Example
22


This example creates a new Hosted Collector using the parameters in the JSON file.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X POST -H "Content-Type: application/json" -T hosted_collector.json https://api.sumologic.com/api/v1/collectors
```



Request JSON (hosted_collector.json):


```
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
24



### Update a Collector  
25


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
26


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
29


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
31


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
32


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



## Source API Methods and Examples

The Collector Management API allows you to manage Collectors and Sources from an HTTP endpoint. This topic describes the Source API methods, which you can use to create installed or hosted Sources of any type by specifying the `sourceType` parameter. When using [local configuration file management](/docs/send-data/use-json-configure-sources/local-configuration-file-management) you can no longer manage Sources through the Collector Management API.

You cannot use the Source API to create Microsoft Office 365 sources, Google Audit sources, or any other sources that require OAuth-based authentication with another vendor.


### Rate limiting

* A rate limit of four API requests per second (240 requests per minute) applies to all API calls from a user.
* A rate limit of 10 concurrent requests to any API endpoint applies to an access key.

If a rate is exceeded, a rate limit exceeded 429 status code is returned.


### Response fields

See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for a description of Source parameters.


## GET methods

### List Sources

Gets information about all Sources for a specified Collector.

**Method:** `GET Path: /collectors/[collectorId]/sources`


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
   <td>collectorId
   </td>
   <td>integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique Collector identifier.
   </td>
  </tr>
  <tr>
   <td>download
   </td>
   <td>boolean
   </td>
   <td>No
   </td>
   <td>false
   </td>
   <td>When set to <code>true</code>, the response will be a JSON array of Sources that can be used to register a new Collector.
   </td>
  </tr>
</table>



#### Examples

This example gets all Sources for a Collector.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors/25/sources
```



Response:


```json
{
  "sources":[{
    "id":101792472,
    "name":"collector_logs",
    "category":"collector_logs",
    "hostName":"dev-host-1",
    "automaticDateParsing":true,
    "multilineProcessingEnabled":true,
    "useAutolineMatching":true,
    "forceTimeZone":false,
    "filters":[],
    "cutoffTimestamp":0,
    "encoding":"UTF-8",
    "pathExpression":"/usr/logs/collector/collector.log*",
    "denylist":[],
    "sourceType":"LocalFile",
    "alive":true
  },
  ...
  ]
}
```


This example gets a ready-to-go JSON configuration of the Sources of a Collector, which can be used to register a new Collector.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors/25/sources?download=true
```


Response:


```json
{
  "api.version": "v1",
  "sources":[{
    "name":"collector_logs",
    "category":"collector_logs",
    "hostName":"dev-host-1",
    "automaticDateParsing":true,
    "multilineProcessingEnabled":true,
    "useAutolineMatching":true,
    "forceTimeZone":false,
    "filters":[],
    "cutoffTimestamp":0,
    "encoding":"UTF-8",
    "pathExpression":"/usr/logs/collector/collector.log*",
    "denylist":[],
    "sourceType":"LocalFile"
  },
  ...
  ]
}
```



### Get Source by ID
42


Gets information about a specified Collector and Source.

**Method:** `GET Path: /collectors/[collectorId]/sources/[sourceId]`


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
   <td>collectorId
   </td>
   <td>integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique Collector identifier.
   </td>
  </tr>
  <tr>
   <td>sourceId
   </td>
   <td>integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique Source identifier.
   </td>
  </tr>
  <tr>
   <td>download
   </td>
   <td>boolean
   </td>
   <td>No
   </td>
   <td>false
   </td>
   <td>When set to <code>true</code>, the response will be a JSON Source object that can be used to create a new Source.
   </td>
  </tr>
</table>



#### Examples
43


This example gets data for a Source with a specified ID.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors/25/sources/101792472
```



Response:


```json
{
  "source":{
    "id":101792472,
    "name":"collector_gc",
    "category":"collector_gc",
    "hostName":"nite-receiver-1",
    "automaticDateParsing":true,
    "multilineProcessingEnabled":true,
    "useAutolineMatching":true,
    "forceTimeZone":false,
    "filters":[],
    "cutoffTimestamp":0,
    "encoding":"UTF-8",
    "pathExpression":"/usr/sumo/logs/collector/collector.gc.log*",
    "denylist":[],
    "sourceType":"LocalFile",
    "alive":true
  }
}
```


This example gets a ready-to-go JSON configuration of a Source with a specified ID, which can be used when managing a folder of multiple sources, or uploading a new source via the API.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors/25/sources/101792472?download=true
```


Response:


```json
{
  "api.version": "v1",
  "source":{
    "name":"collector_gc",
    "category":"collector_gc",
    "hostName":"nite-receiver-1",
    "automaticDateParsing":true,
    "multilineProcessingEnabled":true,
    "useAutolineMatching":true,
    "forceTimeZone":false,
    "filters":[],
    "cutoffTimestamp":0,
    "encoding":"UTF-8",
    "pathExpression":"/usr/sumo/logs/collector/collector.gc.log*",
    "denylist":[],
    "sourceType":"LocalFile"
  }
}
```



## POST methods
45



### Create Source
46


Creates a new Source for a Collector. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for required fields for the request JSON file.

**Method: `POST Path: /collectors/[collectorId]/sources`**


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
   <td>collectorId
   </td>
   <td>integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique Collector identifier.
   </td>
  </tr>
</table>



47
POST creates a single Source per request.


#### Example
48


This example creates a new Host Metrics Source on Collector with ID 10 using the parameters in the JSON file.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X POST -H "Content-Type: application/json" -T host_metrics.json https://api.sumologic.com/api/v1/collectors/10/sources
```



Request JSON (host_metrics.json):


```json
{
  "source":{
    "sourceType":"SystemStats",
    "name":"Host_Metrics",
    "interval":60000,
    "hostName":"my_host",
    "metrics":[
      "CPU_User",
      "CPU_Sys"
    ]
  }
}
```


Response:


```json
{
   "source": {
      "id": 101833059,
      "name": "Host_Metrics",
      "hostName": "my_host",
      "automaticDateParsing": true,
      "multilineProcessingEnabled": true,
      "useAutolineMatching": true,
      "contentType": "HostMetrics",
      "forceTimeZone": false,
      "filters": [
         {
            "filterType": "Exclude",
            "name": "Filter keyword",
            "regexp": "(?s).*EventCode = (?:700|701).*Logfile = \"Directory Service\".*(?s)"
         }
      ],
      "cutoffTimestamp": 0,
      "encoding": "UTF-8",
      "interval": 60000,
      "metrics": [
         "CPU_User",
         "CPU_Sys"
      ],
      "sourceType": "SystemStats",
      "alive": true
   }
}
```


Note that the filter value shown above is an example for excluding a keyword. Filter values are specified to do batch edits to Processing Rules for Sources. For details on the different types of filters available, see [Creating Processing Rules Using a JSON File](/docs/send-data/use-json-configure-sources#Creating_Processing_Rules_Using_a_JSON_File).


## PUT methods
50



### Update Source
51


Updates an existing source. All modifiable fields must be provided, and all not modifiable fields must match those existing in the system.


52
You need to include the `id` parameter in your JSON file.

Updating a Source also requires the "If-Match" header to be specified with the "ETag" provided in the headers of a previous GET request.

**Method: `PUT Path: /collectors/[collectorId]/sources/[sourceId]`**


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
   <td>collectorId
   </td>
   <td>integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique Collector identifier.
   </td>
  </tr>
  <tr>
   <td>sourceId
   </td>
   <td>integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique Source identifier.
   </td>
  </tr>
</table>



#### Example
53


This example updates the Host Metrics Source created in the previous example with "interval" = 15000.

First, use a GET request with -v flag to obtain the "ETag" header value.

Initial GET Request:


```bash
curl -v -u '<accessId>:<accessKey>' -X GET https://api.sumologic.com/api/v1/collectors/15/sources/101833059
```



Initial GET Response:


```
< HTTP/1.1 200 OK
< ETag: "5f6bbe49f8b5a19dd43c806411225a5f"
...
{
  "source":{
    "id":101833059,
    "name":"Host_Metrics",
    "hostName":"my_host",
    ...
```


Next, modify the Source's JSON attributes as needed (in this example, setting "interval" to "15000"), and use a PUT request, passing the "ETag" value obtained above with the "If-Match" header.

Request:


```bash
curl -u '<accessId>:<accessKey>' -X PUT -H "Content-Type: application/json" -H "If-Match: \"5f6bbe49f8b5a19dd43c806411225a5f\"" -T updated_host_metrics.json https://api.sumologic.com/api/v1/collectors/15/sources/101833059
```


Request JSON (updated_host_metrics.json)


```json
{
   "source": {
      "id": 101833059,
      "name": "Host_Metrics",
      "hostName": "my_host",
      "automaticDateParsing": true,
      "multilineProcessingEnabled": true,
      "useAutolineMatching": true,
      "contentType": "HostMetrics",
      "forceTimeZone": false,
      "filters": [
         {
            "filterType": "Exclude",
            "name": "Filter keyword",
            "regexp": "(?s).*EventCode = (?:700|701).*Logfile = \"Directory Service\".*(?s)"
         }
      ],
      "cutoffTimestamp": 0,
      "encoding": "UTF-8",
      "interval": 15000,
      "metrics": [
         "CPU_User",
         "CPU_Sys"
      ],
      "sourceType": "SystemStats",
      "alive": true
   }
}
```


Note that the filter value shown above is an example for excluding a keyword. Filter values are specified to do batch edits to Processing Rules for Sources. For details on the different types of filters available, see [Creating Processing Rules Using a JSON File](/docs/send-data/use-json-configure-sources#Creating_Processing_Rules_Using_a_JSON_File).

Response:


```json
{
   "source": {
      "id": 101833059,
      "name": "Host_Metrics",
      "hostName": "my_host",
      "automaticDateParsing": true,
      "multilineProcessingEnabled": true,
      "useAutolineMatching": true,
      "contentType": "HostMetrics",
      "forceTimeZone": false,
      "filters": [
         {
            "filterType": "Exclude",
            "name": "Filter keyword",
            "regexp": "(?s).*EventCode = (?:700|701).*Logfile = \"Directory Service\".*(?s)"
         }
      ],
      "cutoffTimestamp": 0,
      "encoding": "UTF-8",
      "interval": 15000,
      "metrics": [
         "CPU_User",
         "CPU_Sys"
      ],
      "sourceType": "SystemStats",
      "alive": true
   }
}
```



## DELETE methods

### Delete Source

Deletes the specified Source from the specified Collector.

Requests to delete Sources from the [Cloud-to-Cloud Integration Framework](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework) are asynchronous. When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector. Use a GET request to track the Source's state.

Method: `DELETE Path: /collectors/[collectorId]/sources/[sourceId]`


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
   <td>collectorId
   </td>
   <td>integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique Collector identifier.
   </td>
  </tr>
  <tr>
   <td>sourceId
   </td>
   <td>integer
   </td>
   <td>Yes
   </td>
   <td>NA
   </td>
   <td>Unique Source identifier.
   </td>
  </tr>
</table>



#### Example
58


This example deletes a Source.


```bash
curl -u '<accessId>:<accessKey>' -X DELETE https://api.sumologic.com/api/v1/collectors/15/sources/101833059
```



Response: There will be no response body, only a 200 OK response code.


## Error Codes and Messages for Source API


<table>
  <tr>
   <td>Code
   </td>
   <td>Message
   </td>
  </tr>
  <tr>
   <td>BadRequestBladeId
   </td>
   <td>Request body contains an invalid Source ID.
   </td>
  </tr>
  <tr>
   <td>CannotModifySources
   </td>
   <td>Collector is in JSON mode, user cannot create, delete, or update sources using the API.
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
   <td>EmptySourceType
   </td>
   <td>Need to specify a source type.
   </td>
  </tr>
  <tr>
   <td>InvalidSourceType
   </td>
   <td>Invalid Source type for the requested operation.
   </td>
  </tr>
</table>



## Upgrade or Downgrade Collectors Using the API

View and manage the software versions of your Installed Collectors through HTTP endpoints. Use these HTTP endpoints to upgrade or downgrade Collectors. We recommend you follow our [best practices](/docs/send-data/collection/upgrade-collectors#collector-upgrade-best-practices) when you upgrade your Collectors.

The upgrade may automatically be done in increments. In this case, you may experience longer upgrade times.

There is a community-supported script available on GitHub that allows you to conduct bulk actions to Collectors, see [Collector Management Script](https://github.com/SumoLogic/collector-management-client).


### Timeout

If an upgrade task does not complete successfully after 30 minutes it will automatically timeout with a status of `failed`.


### Get upgradable Collectors


Sends a request to get Collectors you can upgrade.

**Method: `GET`**

**Path:** `collectors/upgrades/collectors`

**Request Headers**


<table>
  <tr>
   <td><strong>Key</strong>
   </td>
   <td><strong>Value</strong>
   </td>
  </tr>
  <tr>
   <td>Content-Type
   </td>
   <td><code>application/json</code>
   </td>
  </tr>
  <tr>
   <td>Accept
   </td>
   <td><code>application/json</code>
   </td>
  </tr>
</table>


**Query Parameters**


<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>toVersion
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>Latest Version
   </td>
   <td>Collector build to upgrade (or downgrade) to. If not specified, upgrades to the latest version.
   </td>
  </tr>
  <tr>
   <td>offset
   </td>
   <td>Int
   </td>
   <td>No
   </td>
   <td>0
   </td>
   <td>Offset into the list of Collectors.
   </td>
  </tr>
  <tr>
   <td>limit
   </td>
   <td>Int
   </td>
   <td>No
   </td>
   <td>50
   </td>
   <td>Maximum number of Collectors to return.
   </td>
  </tr>
</table>


**Status Code**


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
   <td>OK
   </td>
   <td>Upgradable Collectors were retrieved and provided in the response payload.
   </td>
  </tr>
  <tr>
   <td>415
   </td>
   <td>Unsupported Media Type
   </td>
   <td>Content-Type wasn't set to <code>application/json</code>.
   </td>
  </tr>
  <tr>
   <td>400
   </td>
   <td>Bad Request
   </td>
   <td>A parameter wasn't valid.
   </td>
  </tr>
</table>


**Success Result**

A JSON document containing the upgradable collectors.

**Sample Session**

Sample request:


```bash
curl -i -u "<accessId>:<accessKey>" -X GET https://api.sumologic.com/api/v1/collectors/upgrades/collectors
```


Sample response:


```json
{
    "collectors": [
        {
            "id": 100000000,
            "name": "SumoCollector_Local",
            "hostName": "TestHost",
            "timeZone": "UTC",
            "links": [
                {
                    "rel": "sources",
                    "href": "/v1/collectors/100000000/sources"
                }
            ],
            "ephemeral": false,
            "sourceSyncMode": "UI",
            "collectorType": "Installable",
            "collectorVersion": "20.1-2749",
            "osVersion": "10.11.5",
            "osName": "Mac OS X",
            "osArch": "x86_64",
            "lastSeenAlive": 1465848876035,
            "alive": true
        }
    ]
}
```



### Get available builds
63


**Method: `GET`**

**Path: `/collectors/upgrades/targets`**

**Request Headers**


<table>
  <tr>
   <td><strong>Key</strong>
   </td>
   <td><strong>Value</strong>
   </td>
  </tr>
  <tr>
   <td>Content-Type
   </td>
   <td><code>application/json</code>
   </td>
  </tr>
  <tr>
   <td>Accept
   </td>
   <td><code>application/json</code>
   </td>
  </tr>
</table>


**Query Parameters**


    None

**Status Code**


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
   <td>OK
   </td>
   <td>The build information has been returned in the response payload.
   </td>
  </tr>
  <tr>
   <td>415
   </td>
   <td>Unsupported Media Type
   </td>
   <td>Content-Type wasn't set to <code>application/json</code>.
   </td>
  </tr>
</table>


**Success Result**

A JSON document containing the versions of collector builds, which includes the following fields


<table>
  <tr>
   <td><strong>Field</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>version
   </td>
   <td>(string) Version of the collector build.
   </td>
  </tr>
  <tr>
   <td>latest
   </td>
   <td>(boolean) Whether it's the latest version.
   </td>
  </tr>
</table>


**Sample Session**

Sample request:


```bash
curl -i -u "<accessId>:<accessKey>" -X GET https://api.sumologic.com/api/v1/collectors/upgrades/targets
```


Sample response:


```json
{
    "targets": [
        {
            "version": "19.115-37",
            "latest": false
        },
        ...
        {
            "version": "20.1-2749",
            "latest": true
        }
    ]
}
```



## Create an upgrade or downgrade task
64


**Method:** `POST`

**Path:** `/collectors/upgrades`

**Request Headers**


<table>
  <tr>
   <td><strong>Key</strong>
   </td>
   <td><strong>Value</strong>
   </td>
  </tr>
  <tr>
   <td>Content-Type
   </td>
   <td><code>application/json</code>
   </td>
  </tr>
  <tr>
   <td>Accept
   </td>
   <td><code>application/json</code>
   </td>
  </tr>
</table>


**Query Parameters**


    None

**JSON Payload Parameters**


<table>
  <tr>
   <td><strong>Parameter</strong>
   </td>
   <td><strong>Type</strong>
   </td>
   <td><strong>Required</strong>
   </td>
   <td><strong>Default</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>collectorId
   </td>
   <td>Long
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Identifier of the Collector to upgrade (or downgrade).
   </td>
  </tr>
  <tr>
   <td>toVersion
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>Latest version
   </td>
   <td>Collector build to upgrade (or downgrade) to. If not specified, upgrades to the latest version.
   </td>
  </tr>
</table>


**Status Code**


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
   <td>202
   </td>
   <td>Accepted
   </td>
   <td>The upgrade task has been created successfully.
   </td>
  </tr>
  <tr>
   <td>415
   </td>
   <td>Unsupported Media Type
   </td>
   <td><code>Content-Type</code> wasn't set to <code>application/json</code>.
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
</table>


**Success Result**

With success, a JSON document is returned containing the ID and link of the newly created upgrade task. This is an opaque string to use for following upgrade status checking API.

**Error Result**

A status code 400 will be returned with following error codes.


<table>
  <tr>
   <td><strong>Code</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>collector.invalid
   </td>
   <td>The Collector ID was not provided, doesn't exist, or the user doesn't have permission to use it.
   </td>
  </tr>
  <tr>
   <td>collector.type.invalid
   </td>
   <td>The Collector is not an Installed Collector (it is a Hosted Collector).
   </td>
  </tr>
  <tr>
   <td>collector.not.alive
   </td>
   <td>The Collector is not running.
   </td>
  </tr>
  <tr>
   <td>collector.in.upgrading
   </td>
   <td>The Collector is currently being upgraded.
   </td>
  </tr>
  <tr>
   <td>collector.version.invalid
   </td>
   <td>The upgrade version was not provided, or the version is not valid.
   </td>
  </tr>
</table>


**Sample Session**

Sample request:


```bash
curl -i -u "<accessId>:<accessKey>" -H "Content-Type: application/json" -X POST -d '{"collectorId":100000000,"toVersion":"19.152-1"}'
https://api.sumologic.com/api/v1/collectors/upgrades
```


Sample response:


```json
{
    "id": "12345",
    "link": {
        "rel": "self",
        "href": "/v1/collectors/upgrades/12345"
    }
}
```



## Get upgrade task status

After obtaining the upgrade job ID, you can obtain the status of the upgrade task from the status endpoint.

**Method:** `GET`

**Path:** `/collectors/upgrades/<upgradeTaskID>`

**Request Headers**


<table>
  <tr>
   <td><strong>Key</strong>
   </td>
   <td><strong>Value</strong>
   </td>
  </tr>
  <tr>
   <td>Content-Type
   </td>
   <td><code>application/json</code>
   </td>
  </tr>
  <tr>
   <td>Accept
   </td>
   <td><code>application/json</code>
   </td>
  </tr>
</table>


**Query Parameters**


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
   <td>upgradeTaskID
   </td>
   <td>Long
   </td>
   <td>Yes
   </td>
   <td>Task ID from the upgrade task.
   </td>
  </tr>
</table>


**Status Code**


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
   <td>OK
   </td>
   <td>The upgrade task status has been returned in the response.
   </td>
  </tr>
  <tr>
   <td>415
   </td>
   <td>Unsupported Media Type
   </td>
   <td>Content-Type wasn't set to <code>application/json</code>.
   </td>
  </tr>
  <tr>
   <td>404
   </td>
   <td>Not found
   </td>
   <td>The upgrade task ID was not found.
   </td>
  </tr>
</table>


**Success Result**

A success result generates a JSON document containing the upgrade task status, including the following fields.


<table>
  <tr>
   <td><strong>Field</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>collectorId
   </td>
   <td>Collector ID of this upgrade task (long).
   </td>
  </tr>
  <tr>
   <td>toVersion
   </td>
   <td>Target version of this upgrade task (string).
   </td>
  </tr>
  <tr>
   <td>requestedTime
   </td>
   <td>UNIX timestamp when the upgrade task is requested (long).
   </td>
  </tr>
  <tr>
   <td>status
   </td>
   <td>Status code for the upgrade task (integer):

0 - not started

1 - pending, the upgrade is issued awaiting a response from the Collector.

2 - succeeded

3 - failed

6 - Progressing, the upgrade is running on the Collector.
   </td>
  </tr>
  <tr>
   <td>message
   </td>
   <td>Any additional message, normally a failed reason (string).
   </td>
  </tr>
</table>


**Sample session**

Sample request:


```bash
curl -i -u "<accessId>:<accessKey>" -X GET https://api.sumologic.com/api/v1/collectors/upgrades/12345
```


Sample response:

```json
{
    "upgrade": {
        "id": 12345,
        "collectorId": 100000000,
        "toVersion": "19.152-1",
        "requestTime": 1465855411044,
        "status": 2,
        "message": ""
    }
}
```
