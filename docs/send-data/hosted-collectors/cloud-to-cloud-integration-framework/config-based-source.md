---
id: config-based-source
title: Config Based Source
sidebar_label: STIX/TAXII 2 Client
tags:
  - cloud-to-cloud
  - config
  - based
description: Learn how to set up a Config Based C2C to collect data into the Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

Sumo Logic provides this configuration based cloud source to collect log data from vendor APIs with a modular configuration. The goal of this source is for Sumo Logic to expand the configuration modules over time giving greater compatibility with vendor APIs, but to acknowledge complex APIs will still require a specific cloud source and not be compatible with this source.

:::note
This source is available in the [Fed deployment](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

# Setup

Follow the sections below to gather the required vendor information and setup the source with a compatible configuration.

## Gather Vendor Requirements

There is various information you will need to gather from the third party vendor in order to configure collecting log data from their API using this source. Our goal is to support many of the common ways APIs expose functionality to retrieve log data, but we recognize we can't support every feature. We recommend gathering all of the requirements listed below. 

If this source is not able to be configured to support your vendor API, we can either take requests to add additional features to support it or take a request to build a dedicated source integration if needed. 

1. Locate the vendors API docs describing the API.
1. Identify how the API implements authentication.
1. Identify one API endpoint to collect logs from. You will need to create multiple Sumo sources if you wish to collect log data from more than one endpoint.
   - What is the endpoint URL?
   - Are there any required HTTP Headers?
   - What URL parameters are available to use? Which ones track progression such as ingest timestamps?
   - How is pagination implemented? 
   - Where in the response body is the array of logs to ingest?
   - Are there timestamps within the response array of logs indicating the individual log timestamp?
1. Identify API rate limits
   - Does the API specify a rate limit?
   - Is bursting allowed?

## Source Configuration

When you create an Config Based Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Config Based**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM.
1. (Optional) **Parser path**. If **Forward to SIEM** option is selected, provide a parser path if available.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   - ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   - ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Configuration Sections**. Expand each section to learn more about the options available for configuration. 
<details>
  <summary>Authentication</summary>
  <div>
    Choose the type of authentication the source will use based on the vendor API requirements and configure the details of that specific authentication type.

#### Basic

It is a default value. Select this authentication option if the vendor API requires basic HTTP authentication. The source will always add the `Authorization` HTTP request header with the base64 encoded `username:password` as the value.

- **Basic HTTP Username**: The username required by the vendor API.
- **Basic HTTP Password**: The password required by the vendor API.

#### API Key

Select this authentication option if the vendor API requires you to use a static API key.

- **Location Key**: The key value when using the API key. This is the header key if used in the headers and the URL parameter key if used in the URL parameters.
- **API Key**: Your secret API key credentials
- **API Key Prefix**: This is an optional prefix you can add to your API key. Some APIs require a text prefix, followed by a space and then your secret API key. For example: `SSWS {api-key}`. By default the value is empty and no prefix will be used.
- **How should we use your API key?**
  - **In HTTP Request Header**: The requests always include the API key in the HTTP headers. It is a default value.
  - **In HTTP Request URL Parameters**: The request always includes the API key as part of the URL query parameters.

#### Bearer

Select this authentication option if the vendor API requires bearer authentication. This is similar to the API Key option, but it is a common format many APIs use. The source will always add the `Authorization` HTTP request header with text `Bearer` followed by your API token. For example: `Authorization: Bearer <token>`.

- **Bearer Token**: Your secret API key credentials

#### None

Select this authentication option if the vendor API does not require any form of authentication.
  </div>
</details>
<details>
  <summary>HTTP Request</summary>
  <div>
  Configure how the HTTP requests are created for your source.

  :::danger
  Please do **NOT** include any sensitive information such as authentication secrets in this section. Please use the authentication section for any sensitive information such as keys and passwords.
  :::

  #### Method
  The HTTP method used in the request. The supported values are: `GET` and `POST` with `GET` as the default.

  #### Endpoint Url
  The endpoint URL should include the `https://` protocol, vendor domain, and the full path to the API endpoint hosting the log data. It should **NOT** include any URL parameters as that information can be included in a dedicated section below.
  
  | Valid Examples                           |
  |------------------------------------------|
  | `https://acme.org/api/v1/auditLogs`      |
  | `https://api.acme.org/v2/securityEvents` |

  Invalid Examples:
  - `acme.org/v1/auditLogs` Missing HTTPS protocol             
  - `http://acme.org/api/v1/auditLogs` Unsecure HTTP protocol not allowed 
  - `https://acme.org/api/v1/auditLogs?limit=100` Do not include URL parameters      

  #### Request Headers
  Include any HTTP request headers required by the vendor API. The key names are static text, but the values can access our [template feature](#template-dynamic-values) to make them dynamic. 
  
  | Example Header Key | Example Header Value         |
  |--------------------|------------------------------|
  | `Accept`           | `application/json`           |
  | `Accept-Encoding`  | `gzip`                       |
  | `User-Agent`       | `Vendor Required Agent Name` |


  #### Request Parameters
  Include any URL query parameters required by the vendor API. The key names are static text, but the values can access our [template feature](#template-dynamic-values) to make them dynamic. 

  | Example Header Key | Example Header Value                           |
  |--------------------|------------------------------------------------|
  | `limit`            | `1000`                                         |
  | `since`            | `{{ .WindowStartUTC "2006-01-02T15:04:05Z" }}` |
  | `until`            | `{{ .WindowEndUTC "2006-01-02T15:04:05Z" }}`   |

  Examples URL encoded: 
  `?limit=100&since=2024-02-01T08:15:00Z&until=2024-02-01T08:20:00Z`

  #### Request Body
  This is optional and only used if the HTTP `POST` method is configured above. You can use this field to include any information in the HTTP request body. The data included in this field can access our [template feature](#template-dynamic-values).

  </div>
</details>
<details>
  <summary>Tracking Progression</summary>
  <div>
  The source needs a way to keep track of it's progress to prevent data loss and duplication. Select the type of progression used and configure the details.

  #### Time Window
  The source will provide both a start and end timestamp for you to [dynamically](#template-dynamic-values) use in your HTTP request. The window will only move forward if no errors are raised when collecting logs from the vendor API for the current window.
  
  Use the [template feature](#template-dynamic-values) to include the window start and end timestamps within your HTTP request.
  
  The start time is inclusive and the end time is exclusive as that is the behavior of most APIs.

  | Setting          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
  |------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | Window Size      | This is the maximum size of the window between the start and end timestamp. The default is `5m` and we recommend leaving this setting unless there is a specific reason to adjust it. The source has 512MB of memory and processing data from the vendor API in small window sizes is ideal to work within the memory limits. Larger windows can be used if you need to make fewer API calls to the vendor and the data volume is low. The smallest window size is `1m` and the largest is `24h`. You must keep this setting less than or equal to your polling interval. |
  | Initial Lookback | This setting determines how far back from current time to start the window when the source is created. Adjusting this after source creation will not have an affect. This value must be greater than or equal to the `window size` and no further back than `31d`. The default value is `24h`.                                                                                                                                                                                                                                                                            |
  | Max Lookback     | This will determine how far back the window is allowed and should be set based on the vendors data retention policy. If the source encounters a repetitive error causing the window to not move forward for a period of time, the window will not be allowed to stagnate past this configured time. The default is `31d` and we recommend leaving the default unless the vendor specifically states their data retention policy. You can configure this setting between the `window size` and `365d`.                                                                     |
  
  </div>
</details>
<details>
  <summary>HTTP Response Log Ingest Configuration</summary>
  <div>
  Select the format of the data returned by the vendor and configure how the source should break down the response into into individual logs with the correct timestamp.

  #### JSON with JPath
  Use this option when the vendor API returns a JSON document with an array of log data somewhere inside the document. You will need to add one or more log location configurations telling the source where the array log are and how to parse their timestamps. In most cases vendor will only provide one array of log data and you only need to configure this once.

  The source follows the [JSON Path standard defined here](https://www.ietf.org/archive/id/draft-goessner-dispatch-jsonpath-00.html).

  **Logs JPath**: Provide the JPath to the location of the array of individual logs you want to ingest into Sumo Logic starting at the root of the JSON response. The destination of this path must be an array.  
  
  **Timestamp JPath**: Provide the JPath to the log timestamp, starting within an individual log. The source will use current time if this field is not populated.
  
  **Timestamp Format**: Provide the timestamp format the logs use in the Go programming language format. [See our time formatting section for more details](#timestamp-formatting).

  **JSON with JPath Examples**

```json title="Vendor API JSON Response Example"
{
    "meta": {
        "trace": "1234567890",
        "error": false
    },
    "events": [
        {
            "id": 45345,
            "ts": "2024-02-01T16:07:54Z",
            "type": "security",
            "msg": "some security event details"
        },
        {
            "id": 45346,
            "ts": "024-02-01T16:07:57Z",
            "type": "security",
            "msg": "some other security event details"
        }
    ],
    "pagination": {
        "nextUrl": "https://acme.org/api/v1/events?foo=bar"
    }
}
```
  | Setting          | Value                       |
  |------------------|-----------------------------|
  | Logs JPath       | `$.events[*]`               |
  | Timestamp JPath  | `$.ts`                      |
  | Timestamp Format | `2006-01-02T15:04:05Z07:00` |

  ```json title="Vendor API JSON Response Example with Only Logs"
[
    {
        "id": 45345,
        "ts": "2024-02-01T16:07:54.512Z",
        "type": "security",
        "msg": "some security event details"
    },
    {
        "id": 45346,
        "ts": "2024-02-01T16:07:57.452Z",
        "type": "security",
        "msg": "some other security event details"
    }
]
```
  | Setting          | Value                           |
  |------------------|---------------------------------|
  | Logs JPath       | `$[*]`                          |
  | Timestamp JPath  | `$.ts`                          |
  | Timestamp Format | `2006-01-02T15:04:05.999Z07:00` |

  </div>
</details>
<details>
  <summary>Pagination</summary>
  <div>
  Select how the source should handle pagination.

  #### RFC 8288 Link Headers
  Use this type of pagination if the vendor API provides a next URL in the response in the format `<URL>; rel="next"` outlined in [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288). Choose where in the vendor API response this next link is provided. 

  **Headers**: The source will look through all of the `Link` HTTP response headers from the vendor API and find the next url in the described format.
  
  **Body**: The source expects a JSON response body and you will need to provide the **Next Page URL JPath** as part of this configuration pointing the source to the location of the next link. [JPath](https://www.ietf.org/archive/id/draft-goessner-dispatch-jsonpath-00.html) is the standard used by the source.
  </div>
</details>
<details>
  <summary>HTTP Client Options</summary>
  <div>
  You can adjust some options specific to the HTTP client used to make calls to the vendor API. Please follow the vendors recommendations any of these settings.

  :::note
  The client will automatically handle HTTP 429 response status codes that include the [Retry-After](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) response header and back off as instructed by the vendor API.
  :::

  | Setting             | Value                                                                                                                                                                                                                                                                                |
  |---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
  | HTTP Timeout        | How long the source allows the HTTP connection to live before closing it and setting the health to a `context deadline exceeded` timeout error. This time includes receiving the server response and downloading all of the data returned in the response body. The default is `5m`. |
  | HTTP Client Retries | The source will automatically retry without waiting for the next poll interval this many times for some temporary service errors such as a 500 Internal Server. If not specified, the default value 5 will be used.                                                                  |
  | Rate Limit Requests | The number of HTTP requests the source is allowed to make within the `Rate Limit Duration`. The default is `1000` requests.                                                                                                                                                          |
  | Rate Limit Duration | The amount of time the source is allowed to make HTTP request to the vendor API using the `Rate Limit Requests`. The default is `1m`                                                                                                                                                 |
  | Rate Limit Burst    | The number of requests the source is allowed to burst. The default is `1000`. Set this value to `1` to disable bursting.                                                                                                                                                             |

  </div>
</details>
10. (Optional) **Polling Interval**. Set how frequently to poll for new data. It must be between 5 minutes and 48 hours
1. When you are finished configuring the Source, click **Save**.

### Configuration Object
Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter  | Type        | Value                                         | Required | Description                      |
|:-----------|:------------|:----------------------------------------------|:---------|:---------------------------------|
| schemaRef  | JSON Object | `{"type":"Config Based"}`                     | Yes      | Define the specific schema type. |
| sourceType | String      | `"Universal"`                                 | Yes      | Type of source.                  |
| config     | JSON Object | [Configuration object](#configuration-object) | Yes      | Source type specific values.     |

| Parameter                  | Type        | Required | Default           | Description                                                                                                                                                                                                                              | Examples                                                                                                                                                                                                                                                  |
|:---------------------------|:------------|:---------|:------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                       | String      | Yes      | `null`            | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`.                                | `"mySource"`                                                                                                                                                                                                                                              |
| description                | String      | No       | `null`            | Type a description of the source.                                                                                                                                                                                                        | `"Testing source"`                                                                                                                                                                                                                                        |
| category                   | String      | No       | `null`            | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`                                                                                                                                                                                                                                         |
| parserPath                 | String      | No       | `null`            | The path to a parser. name                                                                                                                                                                                                               |                                                                                                                                                                                                                                                           |
| fields                     | JSON Object | No       | `null`            | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.                                                                                          | `{"_siemForward": false, "fieldA": "valueA"}`                                                                                                                                                                                                             |
| authCategory               | String      | Yes      | `"Basic"`         | One of currently supported authentication types.                                                                                                                                                                                         | `"Basic"`, `"ApiKey"`, `"Bearer"`, `"NoAuth"`                                                                                                                                                                                                             |
| authBasicUsername          | String      | No       | `null`            | The HTTP basic authentication username.                                                                                                                                                                                                  | `"collection-user"`                                                                                                                                                                                                                                       |
| authBasicPassword          | String      | No       | `null`            | The HTTP basic authentication password.                                                                                                                                                                                                  |                                                                                                                                                                                                                                                           |
| authLocation               | String      | Yes      | `"headers"`       | The location to include the HTTP authentication information.                                                                                                                                                                             | `"headers"`, `"parameters"`                                                                                                                                                                                                                               |
| authKeyName                | String      | Yes      | `"Authorization"` | The key name used to provide the authentication secret                                                                                                                                                                                   | `"Authorization"`, `"X-API-Key"`                                                                                                                                                                                                                          |
| authKeyValue               | String      | Yes      | `null`            | The authentication secret value used for the `authKeyName` key.                                                                                                                                                                          |                                                                                                                                                                                                                                                           |
| authKeyValuePrefix         | String      | No       | `null`            | An optional non-secret text prefix prepended to the `authKeyValue` secret.                                                                                                                                                               | `"SSWS"`                                                                                                                                                                                                                                                  |
| authBearerToken            | String      | Yes      | `null`            | The authentication bearer secret token                                                                                                                                                                                                   |                                                                                                                                                                                                                                                           |
| requestMethod              | String      | Yes      | `GET`             | The HTTP method used in the request.                                                                                                                                                                                                     | `"GET"`, `"POST"`                                                                                                                                                                                                                                         |
| requestEndpoint            | String      | Yes      | `null`            | The API endpoint URL excluding the URL parameters                                                                                                                                                                                        | `"https://acme.org/api/v1/auditLogs"`                                                                                                                                                                                                                     |
| requestHeaders             | JSON Object | No       | `null`            | Any HTTP request headers to include.                                                                                                                                                                                                     | `"requestHeaders": [{"headerName": "Accept", "headerValue": "application/json"}, {"headerName": "Content-Type", "headerValue": "application/json"}]`                                                                                                      |
| requestParams              | JSON Object | No       | `null`            | Any HTTP URL parameters to include.                                                                                                                                                                                                      | `"requestParams": [{"paramName": "limit",  "paramValue": "1000"}, {"paramName": "since", "paramValue": "{{ .WindowStartUTC \"2006-01-02T15:04:05Z07:00\" }}"}, {"paramName": "until", "paramValue": "{{ .WindowEndUTC \"2006-01-02T15:04:05Z07:00\" }}"}` |
| requestBody                | String      | No       | `null`            | The data to include in the HTTP request body if the `POST` method is used.                                                                                                                                                               |                                                                                                                                                                                                                                                           |
| progressType               | String      | Yes      | `"window"`        | Select the type of progression the source will use to prevent data loss and duplication.                                                                                                                                                 | `"progressionType": "window"`                                                                                                                                                                                                                             |
| progressWindowSize         | String      | Yes      | `"5m"`            | The size of the time window.                                                                                                                                                                                                             | `"windowSize": "5m"`                                                                                                                                                                                                                                      |
| progressWindowInitLookback | String      | Yes      | `"24h"`           | How far back the source should start collecting data when created. This setting has no affect after the initial creation.                                                                                                                | `"windowInitialLookback": "24h"`                                                                                                                                                                                                                          |
| progressWindowMaxLookback  | String      | Yes      | `"31d"`           | How far the window is allowed to stagnate when encountering repetitive errors.                                                                                                                                                           | `"windowMaxLookback": "31d"`                                                                                                                                                                                                                              |
| responseLogsType           | String      | Yes      | `"json"`          | How the source should ingest logs from the response.                                                                                                                                                                                     | `"json"`                                                                                                                                                                                                                                                  |
| responseLogsJsonPaths      | JSON Object | Yes      | `null`            | The location of logs to ingest in the JSON response and how to handle event timestamps. See full documentation for details.                                                                                                              | `[{"logsPath": "$[*]", "logTimestampPath": "$.published", "logTimestampFormat": "2006-01-02T15:04:05.999Z"}]`                                                                                                                                             |
| paginationType             | String      | Yes      | `"LinkHeaders"`   | Pagination type.                                                                                                                                                                                                                         | `"LinkHeaders"`, `"None"`                                                                                                                                                                                                                                 |
| paginationLinkHeadersType  | String      | Yes      | `"headers"`       | Configures if the next page URL is included in the Link HTTP response header or in the response body.                                                                                                                                    | `"headers"`, `"body"`                                                                                                                                                                                                                                     |
| paginationLinkHeadersJPath | String      | No       | `null`            | A JSON Path to the appropriate body property.                                                                                                                                                                                            | `"$.link.next"`                                                                                                                                                                                                                                           |
| clientTimeoutDuration      | String      | Yes      | `"5m"`            | How long the source allows the HTTP connection to live before closing it and setting the health to a timeout error.                                                                                                                      | `"5m"`                                                                                                                                                                                                                                                    |
| clientTimeoutRetries       | Integer     | Yes      | `5`               | The source will automatically retry without waiting for the next poll interval this many times for some errors such as 500 Internal Server.                                                                                              | `5`                                                                                                                                                                                                                                                       |
| clientRateLimitReqs        | Integer     | Yes      | `1000`            | The number of HTTP requests the source is allowed to make within the rate limit duration.                                                                                                                                                | `1000`                                                                                                                                                                                                                                                    |
| clientRateLimitDuration    | String      | Yes      | `"1m"`            | The duration the rate limit requests, must be between 1s and 1h.                                                                                                                                                                         | `"1m"`                                                                                                                                                                                                                                                    |
| clientRateLimitBurst       | Integer     | Yes      | `1000`            | The number of requests the source is allowed to burst.                                                                                                                                                                                   | `1000`                                                                                                                                                                                                                                                    |
| pollingInterval            | String      | Yes      | `"5m"`            | Set how frequently to poll for new data. It must be between 5 minutes and 48 hours.                                                                                                                                                      | `"5m"`                                                                                                                                                                                                                                                    |

## Template Dynamic Values

The source has the ability to template in dynamic text into the values of certain fields providing flexibility in crafting the HTTP requests sent to the vendor API.

The following fields values are allowed to access dynamic text from the template functions described in this section:

- HTTP Request Header Values
- HTTP Request Parameter Values
- HTTP Request Body

To start using the template with one of the supported config values listed above, you will need to enclose the template logic inside double curly braces `{{}}`. Any text outside these double curly braces will be treated as normal unmodified text.

Here are some syntax examples calling functions with and without arguments:

```text title="Template Syntax Examples"
{{ .FunctionName }}
{{ .FunctionName "string argument 1" }}
{{ .FunctionName "string argument 1" "string argument 2" }}
```

**Available Template Functions**
- [WindowStartUTC](#windowstartutc)
- [WindowStartLocation](#windowstartlocation)
- [WindowEndUTC](#windowendutc)
- [WindowEndLocation](#windowendlocation)
 
### WindowStartUTC
This function will template in the `start timestamp` of the source window when source is configured to use the `Time Window` progression. The timestamp will always use `UTC` time and never adjust for a specific timezone.

The syntax for this function requires a timestamp format as a single argument. Please refer to the [Timestamp Formatting](#timestamp-formatting) section for more information on how to format the timestamp.

```{{ .WindowStartUTC "<timestamp format>" }}```

| Template Example                                                    | Output                                 |
|---------------------------------------------------------------------|----------------------------------------|
| `{{ .WindowStartUTC "2006-01-02T15:04:05Z" }}`                      | `2024-03-07T20:15:56Z`                 |
| `{{ .WindowStartUTC "2006-01-02T15:04:05.999999Z07:00" }}`          | `2024-03-07T20:15:56.905571Z`          |
| `greaterThan:{{ .WindowStartUTC "2006-01-02T15:04:05.999Z07:00" }}` | `greaterThan:2024-03-07T20:15:56.905Z` |

### WindowStartLocation
This function is the same as [WindowStartUTC](#windowstartutc) except it has an additional argument to specify the timezone location.

:::sumo[Best Practice]
We strongly recommend you always use `WindowStartUTC` instead of `WindowStartLocation`. Most vendors support and expect UTC timestamps when using their APIs.
:::

Please refer to the [TZ identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for specifying the time zone in the first argument and refer to the [Timestamp Formatting](#timestamp-formatting) section for more information on how to format the timestamp.

```{{ .WindowStartLocation "<time zone location>" "<timestamp format>" }}```

| Template Example                                                                         | Output                                      |
|------------------------------------------------------------------------------------------|---------------------------------------------|
| `{{ .WindowStartLocation "US/Eastern" "2006-01-02T15:04:05Z" }}`                         | `2024-03-07T15:15:56-05:00`                 |
| `{{ .WindowStartLocation "US/Pacific" "2006-01-02T15:04:05.999999Z07:00" }}`             | `2024-03-07T12:15:56.905-08:00`             |
| `greaterThan:{{ .WindowStartLocation "Europe/Berlin" "2006-01-02T15:04:05.999Z07:00" }}` | `greaterThan:2024-03-07T21:15:56.905+01:00` |

### WindowEndUTC
This function will template in the `end timestamp` of the source window when source is configured to use the `Time Window` progression. The timestamp will always use `UTC` time and never adjust for a specific timezone.

The syntax for this function requires a timestamp format as a single argument. Please refer to the [Timestamp Formatting](#timestamp-formatting) section for more information on how to format the timestamp.

```{{ .WindowEndUTC "<timestamp format>" }}```

| Template Example                                               | Output                              |
|----------------------------------------------------------------|-------------------------------------|
| `{{ .WindowEndUTC "2006-01-02T15:04:05Z" }}`                   | `2024-03-07T20:15:56Z`              |
| `{{ .WindowEndUTC "2006-01-02T15:04:05.999999Z07:00" }}`       | `2024-03-07T20:15:56.905571Z`       |
| `lessThan:{{ .WindowEndUTC "2006-01-02T15:04:05.999Z07:00" }}` | `lessThan:2024-03-07T20:15:56.905Z` |

### WindowEndLocation
This function is the same as [WindowEndUTC](#windowendutc) except it has an additional argument to specify the timezone location.

:::sumo[Best Practice]
We strongly recommend you always use `WindowEndUTC` instead of `WindowEndLocation`. Most vendors support and expect UTC timestamps when using their APIs.
:::

Please refer to the [TZ identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for specifying the time zone in the first argument and refer to the [Timestamp Formatting](#timestamp-formatting) section for more information on how to format the timestamp.

```{{ .WindowEndLocation "<time zone location>" "<timestamp format>" }}```

| Template Example                                                                    | Output                                   |
|-------------------------------------------------------------------------------------|------------------------------------------|
| `{{ .WindowEndLocation "US/Eastern" "2006-01-02T15:04:05Z" }}`                      | `2024-03-07T15:15:56-05:00`              |
| `{{ .WindowEndLocation "US/Pacific" "2006-01-02T15:04:05.999999Z07:00" }}`          | `2024-03-07T12:15:56.905-08:00`          |
| `lessThan:{{ .WindowEndLocation "Europe/Berlin" "2006-01-02T15:04:05.999Z07:00" }}` | `lessThan:2024-03-07T21:15:56.905+01:00` |


## Timestamp Formatting

The source uses the the [Go programming language timestamp formatting](https://go.dev/src/time/format.go). See the table below for references and examples.

### Format Reference
  | Date Format                                 | Reference Value                                                       |
  |---------------------------------------------|-----------------------------------------------------------------------|
  | Year                                        | `2006`                                                                |
  | Month Full Name                             | `January`                                                             |
  | Month Abbreviated Name                      | `Jan`                                                                 |
  | Month Zero Leading Number                   | `01`                                                                  |
  | Month Number                                | `1`                                                                   |
  | Day Zero Leading Number                     | `02`                                                                  |
  | Day Number                                  | `2`                                                                   |
  | Day Weekday Full Name                       | `Monday`                                                              |
  | Day Weekday Abbreviated Name                | `Mon`                                                                 |
  | 24 Hour Zero Leading Number                 | `15`                                                                  |
  | 12 Hour Zero Leading Number                 | `03`                                                                  |
  | 12 Hour Number                              | `3`                                                                   |
  | Minute Zero Leading Number                  | `04`                                                                  |
  | Minute Number                               | `4`                                                                   |
  | Second Zero Leading Number                  | `05`                                                                  |
  | Second Number                               | `5`                                                                   |
  | Fractional Seconds                          | `.999` Milliseconds, `.999999` Microseconds, `.999999999` Nanoseconds |
  | AM/PM Uppercase                             | `PM`                                                                  |
  | AM/PM Lowercase                             | `pm`                                                                  |
  | Timezone Offset without Colon Use Z for UTC | `Z0700`                                                               |
  | Timezone Offset with Colon Use Z for UTC    | `Z07:00`                                                              |
  | Timezone Offset without Colon               | `-0700`                                                               |
  | Timezone Offset wit Colon                   | `-07:00`                                                              |
  | Timezone Abbreviated Name                   | `MST`                                                                 |

### Format Examples
  | Standard              | Timestamp in Log                 | Timestamp Format                      |
  |-----------------------|----------------------------------|---------------------------------------|
  | RFC 3339              | `2024-02-01T16:07:57Z`           | `2006-01-02T15:04:05Z07:00`           |
  | RFC 3339 Nano Seconds | `2024-02-01T16:07:57.541468757Z` | `2006-01-02T15:04:05.999999999Z07:00` |

## FAQ

<details>
  <summary>What if I want to query multiple HTTP endpoints?</summary>
  <div>You will need to create a new source per endpoint for the data you wish to collect, even if the endpoint is within the same API.</div>
</details>
<details>
  <summary>Can I transform the data collected?</summary>
  <div>No, this source only collects the data. You can use the Sumo Logic platform features to parse/transform the data further after collection.</div>
</details>
<details>
  <summary>What timestamp is used for the data?</summary>
  <div>Logs without a timestamp or failed timestamp parsing will use current time. Be sure to configure the HTTP response log ingestion configuration section to ensure time parsing is correctly handled.</div>
</details>