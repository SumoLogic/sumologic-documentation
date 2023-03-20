---
id: upload-logs
title: Upload Logs to an HTTP Source
sidebar_label: Uploading Logs
---

After you have added an [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source) to a [Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) you can begin uploading data. You can upload both logs and metrics to the same HTTP source, however not in the same HTTP request. This document provides instructions on uploading logs, if you are uploading metrics see [Upload Metrics to an HTTP Source](upload-metrics.md).

:::tip
To immediately validate the reception of log data use Live Tail. Data sent to an HTTP source may take some time to show up in Search due to indexing delay. If your source does not seem to be receiving data, see [Troubleshooting HTTP Sources](../troubleshooting.md).
:::

## Upload log data

:::note
Data needs to be in UTF-8 encoding.
:::

### Upload log data with a POST Request

To upload log data with a POST request, include the complete data payload as the request body. Any query parameters will be ignored.

:::important
We recommend that the POST data payload have a size, before compression, of 100KB to 1MB. See [data payload considerations](/docs/send-data/hosted-collectors/http-source/logs-metrics/#data-payload-considerations) for details.
:::

* Data payload:
  * Data line 1
  * Data line 2
  * Data line 3
* Method: POST
* URL: `https://[SumoEndpoint]/receiver/v1/http/[UniqueHTTPCollectorCode]` where
  * [SumoEndpoint] is your Sumo collection endpoint
  * [UniqueHTTPCollectorCode] is the string that follows the last forward slash (`/`) in the upload URL for the HTTP source
* Body
  * Data line 1
  * Data line 2
  * Data line 3

## Supported HTTP Headers

The following parameters can be specified via headers when sending data to an HTTP Source. The settings will apply to all messages in the request. For Source Name, Host, and Category, the header value will override any default value already specified for the source and/or collector.

You can configure your Source to process HTTP Headers into metadata fields. See [HTTP Source fields](/docs/manage/fields) for details.

:::note
Overridden metadata field values are not returned with [Search Autocomplete](/docs/search/get-started-with-search/search-basics/search-autocomplete).
:::

| Setting | Header Name | Header Value |
|:--|:--|:--|
| Compressed data | `Content-Encoding` | Values can be either `gzip` or `deflate`<br/>Required if you are uploading compressed data. |
| Custom Source Name | `X-Sumo-Name` | Desired source name.<br/>Useful if you want to override the source name configured for the source. |
| Custom Source Host | `X-Sumo-Host` | Desired host name.<br/>Useful if you want to override the source host configured for the source. |
| Custom Source Category | `X-Sumo-Category` | Desired source category.<br/>Useful if you want to override the source category configured for the source. |
| Fields as custom metadata | `X-Sumo-Fields` | [Fields](/docs/manage/fields.md) need to be in a comma separated list of key-value pairs.  |

## Command Line Examples

:::note
Data is ingested according to the configured [processing rules](/docs/send-data/collection/processing-rules). Messages blocked by filters will not be ingested.
:::

### cURL

When using cURL to POST data from a file: 

* Make sure to use the -T parameter to specify the file path, not -d. The -d parameter causes new lines to be removed from the content, which will interfere with message boundary detection.
* Make sure that each line in the file follows the format specified by the Content-Type header for the HTTP request.

**POST upload**

```bash
curl -v -X POST -T [local_file_name] https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]
```

**POST upload (gzip compressed data)** 

```bash
curl -v -X POST -H 'Content-Encoding:gzip' -T [local_file_name.gz] https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]
```

**POST upload with custom Source Category**

```bash
curl -v -X POST -H 'X-Sumo-Category:myNewCategory' -T [local_file_name] https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]
```

**POST upload with custom Fields**

```bash
curl -v -X POST -H 'X-Sumo-Fields:environment=dev,cluster=k8s' -T [local_file_name] https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]
```

### PowerShell

**POST upload**

```bash
Invoke-WebRequest -Method POST -InFile [local_file_name] 'https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]'
```

**POST upload (gzip compressed data)** 

```bash
Invoke-WebRequest -Method POST -Headers @{'Content-Encoding' = 'gzip'} -InFile [local_file_name.gz] 'https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]'
```

**POST upload with custom Source Category**

```bash
Invoke-WebRequest -Method POST -Headers @{'X-Sumo-Category' = 'myCustomCategory'} -InFile [local_file_name] 'https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]'
```

**POST upload with custom Field**

```bash
Invoke-WebRequest -Method POST -Headers @{'X-Sumo-Fields' = 'environment=dev'} -InFile [local_file_name] 'https://collectors.sumologic.com/receiver/v1/http/[UniqueHTTPCollectorCode]'
```
