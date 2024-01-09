---
id: upgrade-downgrade-collectors
title: Upgrade or Downgrade Collectors Using the API
sidebar_label: Upgrade or Downgrade Collectors
---

View and manage the software versions of your Installed Collectors through HTTP endpoints. Use these HTTP endpoints to upgrade or downgrade Collectors. We recommend you follow our [best practices](/docs/send-data/collection/upgrade-collectors#collector-upgrade-best-practices) when you upgrade your Collectors.

The upgrade may automatically be done in increments. In this case, you may experience longer upgrade times.

There is a community-supported script available on GitHub that allows you to conduct bulk actions to Collectors, see [Collector Management Script](https://github.com/SumoLogic/collector-management-client).

:::caution
Collector Management APIs are not yet built with OpenAPI specifications and therefore not included in our [Swagger docs](https://api.sumologic.com/docs/). Instead, refer to the below documentation.
:::

## Timeout

If an upgrade task does not complete successfully after 30 minutes it will automatically timeout with a status of `failed`.

## GET methods

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


### Get upgrade task status

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



## POST Methods

### Create an upgrade or downgrade task

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
