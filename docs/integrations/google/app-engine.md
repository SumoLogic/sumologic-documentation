---
id: app-engine
title: Sumo Logic App for Google App Engine
sidebar_label: App Engine
description: The Sumo Logic App for Google App Engine helps you monitor the activities in your App Engine.
---

Google App Engine is a platform to build web and mobile apps that scale automatically. The Sumo Logic App for Google App Engine helps you monitor the activities in your App Engine. The pre-configured dashboards provide insight into the requests, applications, HTTP status codes, latency, and response time in your App Engine.

## Collect Logs for the Google App Engine App

This section describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services and provides instructions for configuring log collection for the Google App Engine App. A sample log message and query are also provided.

* content reuse link
* content reuse link
* content reuse link

### Log Types

The App uses:
* Google Cloud Audit Logs — These logs track events on multiple GCP services, including Compute Engine, IAM and App Engine
* App Engine Request Logs — These logs provide information about each request in App Engine, including the external IP address making the request

### Create export of App Engine logs from Stackdriver

In this step you export App Engine logs from Stackdriver to the Pub/Sub topic you created in the previous step.

1. Go to Logging and click Logs Router.

GCP_logging_1.png

2. Click Create Sink.

clipboard_e2f20e4ab6db14f6dd473208f84400de0.png

3. In the Edit Export pane on the right:

   * Set the Sink Name. For example, "gce-applications".
   * Set Sink Service to “Cloud Pub/Sub”.
   * Set Sink Destination to your Pub/Sub topic. For example, "pub-sub-logs".
   * Click Create Sink.

    GCP_logging_5.png

4. By default, GCP logs are stored within Stackdriver, but you can configure Stackdriver to exclude them as detailed here without affecting the export to Sumo Logic as outlined above. To understand how to exclude Stackdriver logs, follow the instructions in [this GCP document](https://cloud.google.com/logging/docs/exclusions#overview).


### Sample Log Message

```json
{
  "message": {
    "data": {
      "httpRequest": {
        "status": 200
      },
      "insertId": "5a0e593e000d3494692375e0",
      "labels": {
        "clone_id": "00c61b117c27a4ec1f60970fdd9db838ca7ce717bfea65f950122a708e22eff25699065ba561"
      },
      "logName": "projects/bmlabs-loggen/logs/appengine.googleapis.com%2Frequest_log",
      "operation": {
        "first": true,
        "id": "5a0e593e00ff07071f75c6d2240001737e776b2d6465760001626967736b7966343a363932382d30333566343662000100",
        "last": true,
        "producer": "appengine.googleapis.com/request_id"
      },
      "protoPayload": {
        "@type": "type.googleapis.com/google.appengine.logging.v1.RequestLog",
        "appEngineRelease": "1.9.54",
        "appId": "s~bmlabs-loggen",
        "cost": 9.957699999999999e-8,
        "endTime": "2018-01-26T11:35:11.374UTC",
        "finished": true,
        "first": true,
        "host": "bigskyf4.bmlabs-loggen.appspot.com",
        "httpVersion": "HTTP/1.1",
        "instanceId": "00c61b117c27a4ec1f60970fdd9db838ca7ce717bfea65f950122a708e22eff25699065ba561",
        "instanceIndex": -1,
        "ip": "0.1.0.2",
        "latency": "0.404415s",
        "line": [
          {
            "logMessage": "Setting in-memory RuntimeSettings:6928-035f46b.",
            "severity": "DEBUG",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/base/runtime_settings.py",
              "functionName": "_get_data",
              "line": "180"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          },
          {
            "logMessage": "TASK-INFO: {\"gae_latency_seconds\": 0.16422700881958008, \"task_eta\": 1510889790.3144629, \"execution_count\": 0, \"ran\": 1510889790.4786899, \"expected_eta\": 1510889790.3136301, \"retry_count\": 0, \"latency_seconds\": 0.16505980491638184}",
            "severity": "DEBUG",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/base/deferred/deferred.py",
              "functionName": "_log_task_info",
              "line": "752"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          },
          {
            "logMessage": "Deferred 8a3a365c-4ed3-40ae-8a1c-faff06a9464c running function audit.actions._write with args = () and kwargs = {'account': <authmodel.auth.Account object at 0xf46cae50>, 'entity_keys': [datastore_types.Key.from_path(u'Membership', 4674727938359296L, _app=u's~bmlabs-loggen')], 'timestamp': datetime.datetime(2017, 11, 17, 3, 36, 30, 307040), 'audit_type': 'account_deactivated', 'user': <authmodel.auth.WFUser object at 0xf41fd730>, 'message': u'Service Docs exited the service_docs account.', 'ip_address': '52.4.205.181'}.",
            "severity": "INFO",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/base/deferred/deferred.py",
              "functionName": "_run_function",
              "line": "574"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          },
          {
            "logMessage": "TASK-DONE: {\"queue_name\": \"audit-log\", \"worker_id\": \"8a3a365c-4ed3-40ae-8a1c-faff06a9464c\", \"task_name\": \"27563511594509108661\"}",
            "severity": "INFO",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/base/deferred/deferred.py",
              "functionName": "_run_deferred",
              "line": "921"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          },
          {
            "logMessage": "gstats: ['event'] messages are disabled by default.",
            "severity": "DEBUG",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/external_libs/gstats/client.py",
              "functionName": "__init__",
              "line": "424"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          },
          {
            "logMessage": "gstats: statsd sent 16 metric keys with 18 metric values in 2 udp packets in [17, 15] ms",
            "severity": "DEBUG",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/external_libs/gstats/listeners/statsd.py",
              "functionName": "send",
              "line": "362"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          },
          {
            "logMessage": "GSTATSDATA: eJytlU1v2zAMhv9KofPqWHJkOQF6G7Dr2u60oRAEm0uM+iOTqLRBkP8+Sh3W2d3QOPPNskTx4cvX9JFh3YJ2YGtwbH11ZHZXauzRNLrsfYfx3d40Pm5/O8bzDk27oyUTKVfXnF9z9SXN1lm+ztKk4ELl6Vf24eoljs6p08OJlmjc4w8PHhILaA+XJ5CKDxOkpwdatYCmMmjilTuDW3rofNOcQnJ4BiqM7o67vqsx5GOt+33PhAKFGubPlvItQSz1T4Sw47C3oPeZ/uxRV94arPtuBqSlSIdIXL2DRHtjjV4bFNTyAe3yJuViepNaaEtTbkF/glnVyfhyyCIo23mRMhvpem6kHOec3o+BYe58d+uBPps5XSNHrhF/adLZptkY0I1B6MoDTZSy7yo3ZLwEMc/FyEYJQReF4lLKTBRZvuITjHU/s7EKNTbWfzX5IzSAMGuLi5F+fDUNMfb43TxSqF9KlE0NcWKwDYWgu7lJk1WiIgJY91IVC+9S9i8OZnxVo276DXvFYQtttot4ZFHBd7AWqkU8mJgyqOUS/WRrhBCz7V1kcPrpUVewZ7GMwy7ejqRyG35BkTcMOAKLAIHYOxp6FSQ0US+Ze3z89yN7koo/AQ4fOc0=",
            "severity": "DEBUG",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/external_libs/gstats/listeners/log.py",
              "functionName": "send",
              "line": "190"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          },
          {
            "logMessage": "gstats: .send() took 36 ms",
            "severity": "DEBUG",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/external_libs/gstats/client.py",
              "functionName": "send",
              "line": "678"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          },
          {
            "logMessage": "PROFILE: eJyt0U9rwjAYBvCvUnL2YFpj586C180eZZSQPmKxaSB5WxTpd1+6DdY2sFXx9v6BXx7e3BguUDmVGuw1Sl7Wi4iZFvYEWfjB0rdKVpXz9eHGisZKKk3tu/hn40u2A2VXR9AZSXLMbxxsW6qeZO5r0w/N8ehAvdotoqdhyT/YRNDQSqoTRkY6Nfj9Bv8zSDYTEUGSVAyYt2bKFJKkI2ORt8mI2sRBnuVA2jf1ewN7ncvFafBrfDPwtqhAmK2F6cT9J0/Cm3MxOnpdTBwLbQi5M+r8/cYvJlYBtnoYS3n30X0CIfoHPA==",
            "severity": "INFO",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/external_libs/appstats_logger/middleware.py",
              "functionName": "_stop_recording",
              "line": "119"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          },
          {
            "logMessage": "appstats: http://bigskyf4.bmlabs-loggen.appspot.com/stats/details?time=1510889790466",
            "severity": "INFO",
            "sourceLocation": {
              "file": "/base/data/home/apps/s~bmlabs-loggen/bigskyf4:6928-035f46b.405569666796645761/lib/appstats/recording.py",
              "functionName": "save",
              "line": "739"
            },
            "time": "2018-01-26T11:35:11.374UTC"
          }
        ],
        "megaCycles": "196",
        "method": "POST",
        "moduleId": "bigskyf4",
        "referrer": "https://bmlabs-loggen.wdesk.org/auth/logout/",
        "requestId": "5a0e593e00ff07071f75c6d2240001737e776b2d6465760001626967736b7966343a363932382d30333566343662000100",
        "resource": "/_ah/queue/deferred/audit.actions._write",
        "responseSize": "117",
        "startTime": "2018-01-26T11:35:11.374UTC",
        "status": 200,
        "taskName": "27563511594509108661",
        "taskQueueName": "audit-log",
        "traceId": "a736a2573bd0d51cce823884cc2b3460",
        "urlMapEntry": "main.app",
        "userAgent": "AppEngine-Google; (+http://code.google.com/appengine)",
        "versionId": "6928-035f46b"
      },
      "receiveTimestamp": "2018-01-26T11:35:11.374UTC",
      "resource": {
        "labels": {
          "module_id": "bigskyf4",
          "project_id": "bmlabs-loggen",
          "version_id": "6928-035f46b",
          "zone": "us14"
        },
        "type": "gae_app"
      },
      "severity": "INFO",
      "timestamp": "2018-01-26T11:35:11.374UTC"
    },
    "attributes": {
      "logging.googleapis.com/timestamp": "2018-01-26T11:35:11.374UTC"
    },
    "message_id": "172694189887110",
    "messageId": "172694189887110",
    "publish_time": "2018-01-26T11:35:11.374UTC",
    "publishTime": "2018-01-26T11:35:11.374UTC"
  },
  "subscription": "projects/bmlabs-loggen/subscriptions/sumo-test"
}
```

### Query sample

Status codes over time

```
_collector="HTTP Source for GCP Pub/Sub" logName resource timestamp
| json "message.data.resource.type" as type
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| where type = "gae_app" | where log_name matches "projects/*/logs/appengine.googleapis.com%2Frequest_log"
| json "message.data.resource.labels" as labels
| json field=labels "module_id", "version_id", "zone", "project_id" as service, version, zone, project
| json "message.data.protoPayload.appId", "message.data.protoPayload.status" as app_id, status_code
| timeslice 30m
| if(status_code matches "20*", 1, 0) as resp_200
| if(status_code matches "30*", 1, 0) as resp_300
| if(status_code matches "40*", 1, 0) as resp_400
| if(status_code matches "50*", 1, 0) as resp_500
| if(!(status_code matches "20*" or status_code matches "30*" or status_code matches "40*" or status_code matches "50*"), 1, 0) as resp_others
| sum(resp_200) as tot_200, sum(resp_300) as tot_300, sum(resp_400) as tot_400, sum(resp_500) as tot_500, sum(resp_others) as tot_others by _timeslice
```


## Installing the Google App Engine App

This page provides instructions for installing the Google App Engine App, as well as an example of each of the App dashboards.


Now that you have set up collection for Google App Engine, install the Sumo Logic App to use the pre-configured searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

To install the app:

* content reuse link



### Viewing Google App Engine Dashboards

The preconfigured dashboards provide insight into the requests, applications, HTTP status codes, latency, and response time in your App Engine.


### Overview

See the overview of your App Engine including the requests, applications, and status codes.

image GoogleAppEngineOverview.png

**Request Location**. See the location of requests in the last 24 hours on a world map.

**Recent App Activity**. See the details of app activities in the last three hours including the timestamp, app, project, zone, method, status, and latency.

**Top Applications**. See the details of top applications by requests in the last 24 hours including the app, version, project, zone, and count of requests.

**Status Codes Over Time**. See the count of 200, 300, 400, 500, and other status codes for every 30 minutes in the last 24 hours on a stacked column chart.

**Status Codes**. See the count of 200, 300, 400, 500, and other status codes in the last 24 hours on a bar chart.


### Activity

See the details of App Engine activities including the projects, services, versions, and message severity.

image

**Top 10 Projects by Messages**. See the top 10 projects by message count in the last hour on a bar chart.

**Top 10 Services by Messages**. See the top 10 services by message count in the last hour on a bar chart.

**Top 10 Versions by Messages**. See the top 10 versions by message count in the last hour on a bar chat.

**Runtime Usage**. See the count of runtimes in the last 24 hours displayed in a table.

**Version Activity**. See the count of version updates, deletes, and creation in the last hour on a line chart.

**Severe Messages**. See the count of messages by severity in the last hour on a line chart.


### Request Activity

See the details of App Engine requests including the location, request methods, response status codes, latency, and response time.

image

**Request Location**. See the location of requests in the last 24 hours on a world map.

**Top 10 Active Request Locations**. See the details of top 10 active requests by location in the last 24 hours including the country name, region, city, and count of requests in a table.

**Request HTTP Methods**. See the count and trend of HTTP request methods GET, POST, PUT, DELETE, PATCH and other methods in the last six hours on a line chart.

**Response Status Codes**. See the count and trend of 200, 300, 400, 500, and other response status codes in the last six hours on a line chart.

**Average Latency**. See the average and trend of latency in the last hour on a line chart.

**Average Response Time**. See the average and trend of response time in the last hour on a line chart.
