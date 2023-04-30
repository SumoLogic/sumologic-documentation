---
id: cloud-firewall
title: Google Cloud Firewall
sidebar_label: Google Cloud Firewall
description: The Google Cloud Firewall App enables you to monitor request activity and the effect of your firewall rules. Google Cloud Platform (GCP) firewall rules can allow or deny traffic to and from VMs in a Google VPC network.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/firewall.png')} alt="thumbnail icon" width="50"/>

The Google Cloud Firewall App enables you to monitor request activity and the effect of your firewall rules. Google Cloud Platform (GCP) firewall rules can allow or deny traffic to and from VMs in a Google VPC network.

The Google Cloud Firewall App preconfigured dashboards provide insight into ingress and egress request traffic, including the location of allowed and denied requests, allowed and denied requests over time, and the top networks, subnetworks, and VMs by allowed and denied ingress requests.

## Log Types

The Google Cloud Firewall App uses the following logs:
* [Google Cloud Audit Logs](https://cloud.google.com/logging/docs/audit/) - Logs events on multiple [GCP services](https://cloud.google.com/logging/docs/audit/#services), including Google Cloud Firewall.

### Sample Query

**Denied Ingress Traffic by Network Over Time**

```
_sourceCategory=*gcp* logName reference resource "\"type\":\"gce_subnetwork\"" "\"direction\":\"INGRESS\"" "\"disposition\":\"DENIED\""
| parse regex "\"logName\":\"(?<log_name>[^\"]+)\""
| parse regex "\"reference\":\"network:[^\"/]+/firewall:(?<rule_name>[^\"]+)\""
| where log_name matches "projects/*/logs/compute.googleapis.com%2Ffirewall"
| json "message.data.resource.labels", "message.data.jsonPayload" as labels, payload
| json field=labels "location","project_id","subnetwork_id","subnetwork_name" as zone,project,subnetwork_id,subnetwork_name nodrop
| json field=payload "disposition", "instance.vm_name", "vpc.vpc_name", "rule_details" as disposition, vm_instance, network, rule_details
| json field=rule_details "action", "priority", "direction"
| timeslice 1h
| count as denied by _timeslice, network, project
| transpose row _timeslice column network, project
```


## Collecting Logs for the Google Cloud Firewall App

This page describes the Sumo pipeline for ingesting logs from Google Cloud Platform (GCP) services, and provides instructions for configuring log collection for the Google Cloud Firewall App.

### Enable Logging for Firewall rules

Enable firewall rule logging individually for each firewall rule whose connections you want to log, by including `--enable-logging` in the rule definition. For example:

```
gcloud beta compute firewall-rules create rule-b \
    --network example-net \
    --action allow \
    --direction ingress \
    --rules tcp:80 \
    --source-ranges 10.10.0.99/32 \
    --priority 10 \
    --enable-logging
```

For more information, see [Firewall Rules Logging Overview](https://cloud.google.com/vpc/docs/firewall-rules-logging).


### Collection Process for GCP Services

The key components in the collection process for GCP services are Google Logs Export, Google Cloud Pub/Sub, and Sumo’s Google Cloud Platform (GCP) source running on a hosted collector.

The GCP service generates logs which are exported and published to a Google Pub/Sub topic through Stackdriver. You will then set up a Sumo Logic Google Cloud Platform source that subscribes to this topic and receives the exported log data.

<img src={useBaseUrl('img/integrations/google/GCP_Collection_Overview.png')} alt="Google integrations" />

### Configuring collection for GCP uses the following process:

1. Configure a GCP source on a hosted collector. You'll obtain the **HTTP URL for the source**.
2. Create a topic in Google Pub/Sub and subscribe the GCP source URL to that topic.
3. Create an export of GCP logs from Google Stackdriver Logging. Exporting involves writing a filter that selects the log entries you want to export, and choosing a Pub/Sub as the destination. The filter and destination are held in an object called a sink.

See the following sections for configuration instructions.

:::note
Logs from GCP services can be [exported](https://cloud.google.com/logging/docs/export/configure_export_v2) to any destination including Stackdriver. It is not required to push the GCP logs into Stackdriver for the Sumo Logic Apps to work. Any GCP logs can be [excluded](https://cloud.google.com/logging/docs/exclusions) from Stackdriver logging and still can be [exported](https://cloud.google.com/logging/docs/export/) to Sumo logic.
:::

### Configure a Google Cloud Platform Source

The Google Cloud Platform (GCP) Source receives log data from Google Pub/Sub.

:::note
You can use the same GCP Source to receive log data from multiple GCP services. For example, you can send logs collected from Google Cloud Application Engine, Google Cloud IAM, and Google Cloud Audit.

However, this is not recommended since you cannot define specific Source Category values to each GCP service. If you create a GCP Source for each service you can define a specific Source Category to each service.
:::

This Source will be a Google Pub/Sub-only Source, which means that it will only be usable for log data formatted as data coming from Google Pub/Sub.

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
2. Select an existing Hosted Collector upon which to add the Source. If you don't already have a Collector you'd like to use, create one, using the instructions on [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
3. Click **Add Source** next to the Hosted Collector and click **Google Cloud Platform**.
4. Enter a **Name** to display for the Source. A **Description** is optional.<br/><img src={useBaseUrl('img/integrations/google/google_cloud_platform_2022.png')} alt="Google integrations" />
5. **Source Host** (Optional). The Source Host value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called _sourceHost. Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 128 characters.
6. **Source Category** (Optional). The Source Category value is tagged to each log and stored in a searchable [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field called `_sourceCategory`. See our [Best Practices: Good Source Category, Bad Source Category](/docs/send-data/best-practices). Avoid using spaces so you do not have to quote them in [keyword search expressions](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md). This can be a maximum of 1,024 characters.
7. **Fields**. Click the **+Add Field** link to add custom log metadata [Fields](/docs/manage/fields.md), then define the fields you want to associate. Each field needs a name (key) and value. Look for one of the following icons and act accordingly:
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) If an orange triangle with an exclamation point is shown, use the option to automatically add or enable the nonexistent fields before proceeding to the next step. The orange icon indicates that the field doesn't exist, or is disabled, in the Fields table schema. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
   * ![green check circle.png](/img/reuse/green-check-circle.png) If a green circle with a checkmark is shown, the field exists and is already enabled in the Fields table schema. Proceed to the next step.
8. **Advanced Options for Logs**.<br/><img src={useBaseUrl('img/integrations/google/GCP-advanced-options-Jan-22.png')} alt="Google integrations" />
   * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
   * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs can't be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
   * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
9. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule.md).
10. When you are finished configuring the Source, click **Save**.


### Configure a Pub/Sub Topic for GCP

You need to configure a Pub/Sub Topic in GCP and add a subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. Once you configure the Pub/Sub, you can export data from Google Logging to the Pub/Sub. For example, you can export Google App Engine logs, as described on [Collect Logs for Google App Engine](/docs/integrations/google/app-engine#01Collect-Logs-for-the-Google-App-Engine-App).

1. Create a Pub/Sub Topic in GCP. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_a_topic) for the latest configuration steps.
2. Create a Pub/Sub subscription to the Source URL that belongs to the Sumo Logic Google Cloud Platform Source you created. See [Google Cloud documentation](https://cloud.google.com/pubsub/docs/admin#creating_subscriptions) for the latest configuration steps.
    * Use a **Push Delivery Method** to the Sumo Logic Source URL. To determine the URL, navigate to the Source on the** Collection** page in Sumo Logic and click **Show URL**.


### Limitations

Google limits the volume of data sent from a Topic. Our testing resulted in the following data limits:

| Topics | Megabytes per second | Payload size |
|:--------|:----------------------|:--------------|
| One    | 18 MBps (1.5 TB/day) | 100 KB       |
| One    | 6 MBps (0.5 TB/day)  | 2.5 KB       |

:::note
These limits may vary based on your setup and are based on our previous tests.
:::

We recommend the following:
* Shard messages across topics within the above data limits.
* Ask GCP to increase the allowable capacity for the topic.

### Create export of Google Cloud VPC logs from Google Logging

In this step you export logs to the Pub/Sub topic you created in the previous step.

1. Go to **Logging** and click **Logs Router**.<br/><img src={useBaseUrl('img/integrations/google/GCP_logging_1.png')} alt="Google integrations" />
2. Click **Create Sink**.<br/><img src={useBaseUrl('img/integrations/google/sink.png')} alt="Google integrations" />
3. As part of **Create logs routing sink**, add the following information.
   1. Enter a Sink Name. For example, "gce-vm-instance".
   2. Select "Cloud Pub/Sub" as the **Sink Service**.
   3. Set **Sink Destination** to the Pub/Sub topic you created in the Google Cloud Platform Source procedure. For example, "pub-sub-logs".
   4. In **Choose logs to include in sink** section for `resource_type`, replace `"<resource_variable>"` with `"gce_subnetwork"`.
   5. Click **Create Sync**.


## Installing the Google Cloud Firewall App

The section provides instructions for installing the Google Cloud Firewall App, and examples for each of the App dashboards.

Now that you have set up log collection, you can install the Google Cloud Firewall App to access the pre-configured Searches and dashboards that provide visibility into your environment for real-time analysis of overall usage.

{@import ../../reuse/app-install.md}

## Viewing Google Cloud Firewall Dashboards

This section provides examples of the Google Cloud Firewall App accompanied with descriptions.


### Overview

Presents an overview of request activity, including the geolocation of allowed and denied requests; percentage of requests denied; allowed and denied traffic over time; and the top remote request locations, requested networks, requested subnets, requested VMs, and rules used.

<img src={useBaseUrl('img/integrations/google/google-cloud-firewall-overview.png')} alt="Google Cloud Firewall dashboards" />

**Ingress Source Locations**. A geolocation map that shows the count of connection requests received by each location over the last 24 hours.

**Egress Destination Locations**. A geolocation map that shows the count of connection requests initiated from each location over the last 24 hours.

**Traffic Over Time**. A stacked column chart that shows the count of ingress and egress requests per timeslice over the last 24 hours.

**Allowed Request Remote Locations**. A geolocation map that shows the count of requests that were allowed at each location over the last 24 hours.  

**Denied Request Remote Locations**. A geolocation map that shows the count of requests that were denied at each location over the last 24 hours.  

**Traffic Disposition Over Time**. A stacked column chart that shows the count of accepted and denied requests per timeslice over the last 24 hours.

**Allowed Traffic by Network Over Time**. A line chart that shows the count of allowed requests per timeslice over the last 24 hours.

**Denied Traffic by Network Over Time**. A line chart that shows the count of denied requests per timeslice over the last 24 hours.

**Requests Denied (%)**. The percentage of requests that were denied over the last 24 hours.

**Top Remote Request Locations**. A table that lists the top external sources that have issued the most requests caught by the firewall over the last 24 hours.

**Top Requested Networks**. A table that lists the networks that have received the most requests over the last 24 hours.

**Top Rules Used**. A table that lists the firewall rules that have been invoked most over the last 24 hours.

**Top Requested Subnetworks**. A table that lists the subnetworks that have received the most requests over the last 24 hours.

**Top Requested VMs**. A table that lists the VMs that have received the most requests over the last 24 hours.


### Ingress

Presents information about ingress traffic; including allowed and denied traffic over time; allowed and denied traffic outliers; allowed and denied source locations; top networks, subnetworks, and VMs by ingress requests, and the top allowed and denied ingress rules.

<img src={useBaseUrl('img/integrations/google/google-cloud-firewall-ingress.png')} alt="Google Cloud Firewall dashboards" />

**Allowed Ingress Traffic by Network Over Time**. A line chart that shows the count of allowed ingress requests per timeslice for each network over the last 24 hours.

**Denied Ingress Traffic by Network Over Time**. A line chart that shows the count of denied ingress requests per timeslice for each network over the last 24 hours.

**Top Networks by Ingress Requests**. A table that lists the networks that had the most ingress requests over the last 24 hours.

**Allowed Ingress Traffic - Outlier**. A line chart that shows the count of allowed ingress requests per timeslice over the last 24 hours. The query uses the `outlier` operator to identify timeslices in which the count of allowed ingress requests was statistically significant, indicated by a pink triangle.

**Denied Ingress Traffic - Outlier**. A line chart that shows the count of denied ingress requests per timeslice over the last 24 hours. The query uses the `outlier` operator to identify timeslices in which the count of denied ingress requests was statistically significant, indicated by a pink triangle.

**Top Subnetworks by Ingress Requests**. A table that lists the subnetworks that had the most ingress requests over the last 24 hours.

**Top VMs by Ingress Requests**. A table that lists the VMs that had the most ingress requests over the last 24 hours.

**Allowed Destination Locations**. A geolocation map that shows the count of allowed ingress requests in each location over the last 24 hours.

**Denied Destination Locations**. A geolocation map that shows the count of denied ingress requests in each location over the last 24 hours.

**Top Destination Locations**. A table that lists the destinations with the most ingress requests over the last 24 hours.

**Top Allowed Ingress Rules**. A table that lists the ingress rules that were invoked the most, resulting in allowed requests over the last 24 hours.

**Top Denied Ingress Rules**. A table that lists the ingress rules that were invoked the most, resulting in denied requests over the last 24 hours.

**Top Denied Source IPs**. A table that lists the IP addresses from which the most requests were denied access.


### Egress

Presents information about egress traffic; including allowed and denied traffic over time; allowed and denied traffic outliers; allowed and denied source locations; top networks, subnetworks, and VMs by egress requests, and the top allowed and denied egress rules.

<img src={useBaseUrl('img/integrations/google/google-cloud-firewall-egress.png')} alt="Google Cloud Firewall dashboards" />

**Allowed Egress Traffic by Network Over Time**. A line chart that shows the count of allowed egress requests per timeslice for each network over the last 24 hours.

**Denied Egress Traffic by Network Over Time**. A line chart that shows the count of denied egress requests per timeslice for each network over the last 24 hours.

**Top Networks by Egress Requests**. A table that lists the networks that had the most egress requests over the last 24 hours.

**Allowed Egress Traffic - Outlier**. A line chart that shows the count of allowed egress requests per timeslice over the last 24 hours. The query uses the `outlier` operator to identify timeslices in which the count of allowed egress requests was statistically significant, indicated by a pink triangle.

**Denied Egress Traffic - Outlier**. A line chart that shows the count of denied egress requests per timeslice over the last 24 hours. The query uses the `outlier` operator to identify timeslices in which the count of denied egress requests was statistically significant, indicated by a pink triangle.

**Top Subnetworks by Egress Requests**. A table that lists the subnetworks that had the most egress requests over the last 24 hours.

**Top VMs by Egress Requests**. A table that lists the VMs that had the most egress requests over the last 24 hours.

**Allowed Destination Locations**. A geolocation map that shows the count of allowed egress requests in each location over the last 24 hours.

**Denied Destination Locations**. A geolocation map that shows the count of denied egress requests in each location over the last 24 hours.

**Top Destination Locations**. A table that lists the destinations with the most egress requests over the last 24 hours.

**Top Allowed Egress Rules**. A table that lists the egress rules that were invoked the most, resulting in allowed requests over the last 24 hours.

**Top Denied Egress Rules**. A table that lists the egress rules that were invoked the most, resulting in denied requests over the last 24 hours.

**Top Denied Destination IPs**. A table that lists the IP addresses to which the most requests were denied.
