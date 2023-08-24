---
id: cloud-bigtable
title: Google Cloud Bigtable
sidebar_label: Google Cloud Bigtable
description: Learn about the collection process for the Google Cloud Bigtable service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudBigtable.png')} alt="Thumbnail icon" width="50"/>

Bigtable is a fully managed wide-column and key-value NoSQL database service for large analytical and operational workloads. For further details refer [GCP documentation](https://cloud.google.com/bigtable/docs/overview).

## Log and Metric types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)
* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Bigtable integration by following the below steps.

### Configure logs collection

1. **Audit Logs**. [Here](https://cloud.google.com/bigtable/docs/audit-logging#audit_log_permissions) are the permission and roles required for collecting logs for Bigtable. Enable logging for Google BigTable follow the instruction [here](https://cloud.google.com/bigtable/docs/audit-logging#enabling_audit_logging). And [here](https://cloud.google.com/bigtable/docs/audit-logging#audited_operations) is the list of audited operation for Bigtable.
2. **Platform Logs**. Bigtable platform logs include logs related to bigtable instance, cluster, tables and backup. Logs from GCP can be ingested using Google Cloud Platform (GCP) Source, which uses a log sink with Pub/Sub to get the logs to Sumo Logic.

   Set up Google Cloud Platform source in Sumo Logic and Pub/Sub & Log sink in GCP by following instructions described [here](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source/). Note that while creating the sync as part of the **Choose logs to include in sink** section, you can use the following query:
     ```sql
     resource.type=(bigtable_instance or \
     bigtable_cluster or bigtable_table or \
     bigtable_backup) or (resource.type=audited_resource \
     and (resource.labels.service=bigtableadmin.googleapis.com or \
     resource.labels.service=bigtable.googleapis.com))
     ```

   Bigtable audit logs use the service name **bigtableadmin.googleapis.com** for admin operations and **bigtable.googleapis.com** for data operations.

### Configure metrics collection

Metrics for Cloud Bigtable can be ingested in Sumo Logic using GCP Metric Source. [Here](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) are the details for creating this source. Note that in the Services dropdown, you'll need to select **Bigtable**.

[Here](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-bigtable) is the list of metrics available for Cloud Bigtable.
