---
id: source-api
title: Source API Methods and Examples
description: Source API methods allow you to create installed or hosted Sources of any type by specifying the sourceType parameter.
---

The Collector Management API allows you to manage Collectors and Sources from an HTTP endpoint. This topic describes the Source API methods, which you can use to create installed or hosted Sources of any type by specifying the `sourceType` parameter. When using [local configuration file management](/docs/send-data/use-json-configure-sources/local-configuration-file-management) you can no longer manage Sources through the Collector Management API.

You cannot use the Source API to create Microsoft Office 365 sources, Google Audit sources, or any other sources that require OAuth-based authentication with another vendor.

:::caution
Collector Management APIs are not yet built with OpenAPI specifications and therefore not included in our [Swagger docs](https://api.sumologic.com/docs/). Instead, refer to the below documentation.
:::

## Rate limiting

{@import ../../reuse/api-rate-limit.md}

## Response fields

See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for a description of Source parameters.


## GET methods

### List Sources

Gets information about all Sources for a specified Collector.

**Method:** `GET`

**Path:** `/collectors/[collectorId]/sources`


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

Gets information about a specified Collector and Source.

**Method:** `GET`

**Path:** `/collectors/[collectorId]/sources/[sourceId]`


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


### Create Source

Creates a new Source for a Collector. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for required fields for the request JSON file.

**Method**: `POST`

**Path**: `/collectors/[collectorId]/sources`


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


POST creates a single Source per request.


#### Example

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


Note that the filter value shown above is an example for excluding a keyword. Filter values are specified to do batch edits to Processing Rules for Sources. For details on the different types of filters available, see [Creating Processing Rules Using a JSON File](/docs/send-data/use-json-configure-sources/#creating-processing-rules-using-json).


## PUT methods


### Update Source

Updates an existing source. All modifiable fields must be provided, and all not modifiable fields must match those existing in the system.

You need to include the `id` parameter in your JSON file.

Updating a Source also requires the "If-Match" header to be specified with the "ETag" provided in the headers of a previous GET request.

**Method**: `PUT`

**Path**: `/collectors/[collectorId]/sources/[sourceId]`


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


Note that the filter value shown above is an example for excluding a keyword. Filter values are specified to do batch edits to Processing Rules for Sources. For details on the different types of filters available, see [Creating Processing Rules Using a JSON File](/docs/send-data/use-json-configure-sources/#creating-processing-rules-using-json).

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

**Method**: `DELETE`

**Path**: `/collectors/[collectorId]/sources/[sourceId]`


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

This example deletes a Source.


```bash
curl -u '<accessId>:<accessKey>' -X DELETE https://api.sumologic.com/api/v1/collectors/15/sources/101833059
```



Response: There will be no response body, only a 200 OK response code.


## Error Codes and Messages

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
