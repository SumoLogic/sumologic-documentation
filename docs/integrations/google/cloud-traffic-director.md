---
id: cloud-traffic-director
title: Google Cloud Traffic Director
sidebar_label: Google Cloud Traffic Director
description: Learn about the Sumo Logic collection process for the Google Cloud Traffic Director service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudTrafficDirector.png')} alt="Thumbnail icon" width="50"/>

Traffic Director is Google Cloud's fully managed application networking platform and service mesh. For more details, refer to the [GCP documentation](https://cloud.google.com/traffic-director/docs).

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Traffic Director integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/traffic-director/docs/audit-logging#audit_log_permissions). To enable logging for Google Traffic Director, refer to [Google documentation](https://cloud.google.com/traffic-director/docs/audit-logging#enabling_audit_logging). For more detail on Traffic Director operations being audited, refer to [audited operations](https://cloud.google.com/traffic-director/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type="audited_resource" and resource.labels.service=("trafficdirector.googleapis.com" or "networkservices.googleapis.com" or "networksecurity.googleapis.com"))
   ```
* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Traffic Director log entries can provide important information for troubleshooting your service mesh, including records of successful connections and disconnections, error reports for misconfigured clients, and alerts about API resource conflicts. While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=("gateway_scope" or "mesh") logName="trafficdirector.googleapis.com/events")
   ```

:::note
Make sure that you replace older api `resource.type=("gateway_scope" or "mesh")` with `resource.type="gce_network"`.
:::
