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

1. Identify a vendor who provides the data that should be ingested.
1. Follow their documentation to obtain the required configuration:
   - Authentication
   - Endpoint specific request information
   - Rate limit
   - Location of the log data from the API response
   - Pagination

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
  This section configures the request that is created for the first call to the vendor's API within the polling cycle. This component prepares, executes and makes it ready for the next polling cycle. For now we only support HTTP requests.
   1. **Method**. The HTTP method used in the request. Possible values: GET, POST. Default value: GET.
   1. **Endpoint**. The original api endpoint URL as a string that the requestor will append parameters to.
   1. **Body**. The HTTP body which is put through the Go template engine. If not specified, the default empty value will be used.
   1. **Params**. The url parameters where the key is a string and the value is also a string but is put through the Go template engine. If not specified, no params will be used.
   1. **Headers**. The HTTP request headers where the key is a string and the value is also a string but is put through the Go template engine. If not specified, no headers will be used.
  </div>
</details>
<details>
  <summary>Tracking Progression</summary>
  <div>
  This section configures how the source will track its progression over time. For now we only support Time Window.
   1. **Time Window**
      1. **Initial Lookback**. How far back from current time to start the window upon source creation. Must be between window size and 31d. If not specified, the default value 24h will be used.
      1. **Max Lookback**. How far back the window is allowed to go based on the third party APIs data retention policy. Must be between window size and 365d. If not specified, the default value 31d will be used.
      1. **Size**. The maximum size of the window chunk. Must be between 1m and 24h. If not specified, the default value 5m will be used.
  </div>
</details>
<details>
  <summary>HTTP Response Log Ingest Configuration</summary>
  <div>
   This section configures the location of the log data from the API response. For now we only support JSON data.
   1. **JSON**. Multiple result configurations can be added and at least one is required.
      For paths and locations we decided to go with the JSONPath standard.
      Different vendors are returning timestamps in different formats. For time parsing, we plan to add
      Time parsing functionality in the future to use sumo time. For now, time format needs to be provided using Golang time format.
      1. **Result Path**. JPath to the array of logs to ingest.
      1. **Timestamp Path**. JPath to the log timestamp. If not specified, the default value of current time will be used.
      1. **Time Format**. Log Timestamp Format. Has to be configured when Timestamp Path is provided.
  </div>
</details>
<details>
  <summary>Pagination</summary>
  <div>
  This section configures the paginator component. It handles the API response data pagination and checks if there is a next page of results. For now we only support Link Headers pagination.
   1. **LinkHeaders**. This pagination is described in [RFC 8288](https://www.rfc-editor.org/rfc/rfc8288). It is used to handle pagination where the next page URL is included in the Link HTTP response header or in the response body.
      1. **Headers**. Next page URL is in the response headers.
      1. **Body**. Next page URL is in the response body.
         1. **JsonPath**. A JSON Path to the appropriate body property. If not specified, empty value weill be used.
  </div>
</details>
<details>
  <summary>HTTP Client Options</summary>
  <div>
  This section configures the HTTP Client used for API calls.
   1. **Timeout Duration**. How long the source allows the HTTP connection to live before closing it and setting the health to a timeout error. Must be between window size and 31d. If not specified, the default value 5m will be used.
   1. **Timeout Retries**. The source will automatically retry without waiting for the next poll interval this many times for some errors such as 500 Internal Server. If not specified, the default value 5 will be used.
   1. **Rate Limit Reqs**. The number of HTTP requests the source is allowed to make within the rate limit duration. If not specified, the default value 1000 will be used.
   1. **Rate Limit Duration**. The duration the rate limit requests, must be between 1s and 1h. If not specified, the default value 1m will be used.
   1. **Rate Limit Burst**. The number of requests the source is allowed to burst. If not specified, the default value 1000 will be used.
  </div>
</details>
10. (Optional) **Polling Interval**. Set how frequently to poll for new data. It must be between 5 minutes and 48 hours
1. When you are finished configuring the Source, click **Save**.

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter  | Type        | Value                                         | Required | Description                      |
|:-----------|:------------|:----------------------------------------------|:---------|:---------------------------------|
| schemaRef  | JSON Object | `{"type":"Config Based"}`                     | Yes      | Define the specific schema type. |
| sourceType | String      | `"Universal"`                                 | Yes      | Type of source.                  |
| config     | JSON Object | [Configuration object](#configuration-object) | Yes      | Source type specific values.     |

### Configuration Object

| Parameter               | Type        | Required | Default           | Description                                                                                                                                                                                                                              | Examples                                                                                                                                                                                                                                                  |
|:------------------------|:------------|:---------|:------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name                    | String      | Yes      | `null`            | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`.                                | `"mySource"`                                                                                                                                                                                                                                              |
| description             | String      | No       | `null`            | Type a description of the source.                                                                                                                                                                                                        | `"Testing source"`                                                                                                                                                                                                                                        |
| category                | String      | No       | `null`            | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`                                                                                                                                                                                                                                         |
| parserPath              | String      | No       | `null`            | The path to a parser. name                                                                                                                                                                                                               |                                                                                                                                                                                                                                                           |
| fields                  | JSON Object | No       | `null`            | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.                                                                                          | `{"_siemForward": false, "fieldA": "valueA"}`                                                                                                                                                                                                             |
| authCategory            | String      | Yes      | `"Basic"`         | One of currently supported authentication types.                                                                                                                                                                                         | `"Basic"`, `"ApiKey"`, `"Bearer"`, `"NoAuth"`                                                                                                                                                                                                             |
| authBasicUsername       | String      | No       | `null`            | The HTTP basic authentication username.                                                                                                                                                                                                  | `"collection-user"`                                                                                                                                                                                                                                       |
| authBasicPassword       | String      | No       | `null`            | The HTTP basic authentication password.                                                                                                                                                                                                  |                                                                                                                                                                                                                                                           |
| authLocation            | String      | Yes      | `"headers"`       | The location to include the HTTP authentication information.                                                                                                                                                                             | `"headers"`, `"parameters"`                                                                                                                                                                                                                               |
| authKeyName             | String      | Yes      | `"Authorization"` | The key name used to provide the authentication secret                                                                                                                                                                                   | `"Authorization"`, `"X-API-Key"`                                                                                                                                                                                                                          |
| authKeyValue            | String      | Yes      | `null`            | The authentication secret value used for the `authKeyName` key.                                                                                                                                                                          |                                                                                                                                                                                                                                                           |
| authKeyValuePrefix      | String      | No       | `null`            | An optional non-secret text prefix prepended to the `authKeyValue` secret.                                                                                                                                                               | `"SSWS"`                                                                                                                                                                                                                                                  |
| authBearerToken         | String      | Yes      | `null`            | The authentication bearer secret token                                                                                                                                                                                                   |                                                                                                                                                                                                                                                           |
| requestMethod           | String      | Yes      | `GET`             | The HTTP method used in the request.                                                                                                                                                                                                     | `"requestMethod": "GET"`                                                                                                                                                                                                                                  |
| requestEndpoint         | String      | Yes      | `null`            | The original api endpoint URL as a string that the requestor will append parameters to.                                                                                                                                                  | `"requestEndpoint": "endpoint"`                                                                                                                                                                                                                           |
| requestBody             | String      | No       | `null`            | The HTTP body which is put through the Go template engine.                                                                                                                                                                               |                                                                                                                                                                                                                                                           |
| requestHeaders          | JSON Object | No       | `null`            | HTTP basic authentication password                                                                                                                                                                                                       | `"requestHeaders": [{"headerName": "Accept", "headerValue": "application/json"}, {"headerName": "Content-Type", "headerValue": "application/json"}]`                                                                                                      |
| requestParams           | JSON Object | No       | `null`            | HTTP basic authentication password                                                                                                                                                                                                       | `"requestParams": [{"paramName": "limit",  "paramValue": "1000"}, {"paramName": "since", "paramValue": "{{ .WindowStartUTC \"2006-01-02T15:04:05Z07:00\" }}"}, {"paramName": "until", "paramValue": "{{ .WindowEndUTC \"2006-01-02T15:04:05Z07:00\" }}"}` |
| progressionType         | String      | Yes      | `null`            | Progression type.                                                                                                                                                                                                                        | `"progressionType": "window"`                                                                                                                                                                                                                             |
| windowInitialLookback   | String      | Yes      | `24h`             | How far back from current time to start the window upon source creation. Must be between window size and 31d.                                                                                                                            | `"windowInitialLookback": "24h"`                                                                                                                                                                                                                          |
| windowMaxLookback       | String      | Yes      | `31d`             | How far back the window is allowed to go based on the third party APIs data retention policy. Must be between window size and 365d.                                                                                                      | `"windowMaxLookback": "31d"`                                                                                                                                                                                                                              |
| windowSize              | String      | Yes      | `5m`              | The maximum size of the window chunk. Must be between 1m and 24h.                                                                                                                                                                        | `"windowSize": "5m"`                                                                                                                                                                                                                                      |
| clientTimeoutDuration   | String      | Yes      | `5m`              | How long the source allows the HTTP connection to live before closing it and setting the health to a timeout error. Must be between window size and 31d.                                                                                 | `"clientTimeoutDuration": "5m"`                                                                                                                                                                                                                           |
| clientTimeoutRetries    | Integer     | Yes      | 5                 | The source will automatically retry without waiting for the next poll interval this many times for some errors such as 500 Internal Server.                                                                                              | `"clientTimeoutRetries": 5`                                                                                                                                                                                                                               |
| clientRateLimitReqs     | Integer     | Yes      | 1000              | The number of HTTP requests the source is allowed to make within the rate limit duration.                                                                                                                                                | `"clientRateLimitReqs": 1000`                                                                                                                                                                                                                             |
| clientRateLimitDuration | String      | Yes      | `1m`              | The duration the rate limit requests, must be between 1s and 1h.                                                                                                                                                                         | `"clientRateLimitDuration": "1m"`                                                                                                                                                                                                                         |
| clientRateLimitBurst    | Integer     | Yes      | 1000              | The number of requests the source is allowed to burst.                                                                                                                                                                                   | `"clientRateLimitBurst": 1000`                                                                                                                                                                                                                            |
| dataProcessorType       | String      | Yes      | `json`            | Response Log Type.                                                                                                                                                                                                                       | `"dataProcessorType": "json"`                                                                                                                                                                                                                             |
| resultsConfig           | JSON Object | Yes      | `null`            | Configuration of the location of the log data from the API response.                                                                                                                                                                     | `"resultsConfig": [{"resultPath": "$[*]", "timestampPath": "$.published", "timestampFormat": "2006-01-02T15:04:05.999Z"}]`                                                                                                                                |
| paginationType          | String      | Yes      | `linkHeaders`     | Pagination type.                                                                                                                                                                                                                         | `"paginationType": "linkHeaders"`                                                                                                                                                                                                                         |
| linkHeadersType         | String      | Yes      | `headers`         | Configures if the next page URL is included in the Link HTTP response header or in the response body.                                                                                                                                    | `"linkHeadersType": "headers"`                                                                                                                                                                                                                            |
| linkHeadersJsonPath     | String      | No       | `null`            | A JSON Path to the appropriate body property.                                                                                                                                                                                            | `"linkHeadersJsonPath": "$.link.next"`                                                                                                                                                                                                                    |
| pollingInterval         | String      | Yes      | `5m`              | Set how frequently to poll for new data. It must be between 5 minutes and 48 hours.                                                                                                                                                      | `"pollingInterval": "5m"`                                                                                                                                                                                                                                 |

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