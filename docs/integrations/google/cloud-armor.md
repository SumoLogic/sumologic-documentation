---
id: cloud-armor
title: Google Cloud Armor
sidebar_label: Google Cloud Armor
description: Learn about the Sumo Logic collection process for the Google Cloud Armor service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudArmor.png')} alt="Thumbnail icon" width="50"/>

Google Cloud Armor helps you protect your Google Cloud deployments from multiple types of threats, including distributed denial-of-service (DDoS) attacks and application attacks like cross-site scripting (XSS) and SQL injection (SQLi). For more details, refer to the [GCP documentation](https://cloud.google.com/armor/docs/cloud-armor-overview)

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Armor integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/armor/docs/audit-logging#audit_log_permissions). To enable logging for Google Armor, refer to [Google documentation](https://cloud.google.com/armor/docs/audit-logging#enabling_audit_logging). For more detail on Cloud Armor operations being audited, refer to [audited operations](https://cloud.google.com/armor/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=(backendServices or securityPolicies) resource.labels.service=compute.googleapis.com)
   ```

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Google Cloud Armor logs are part of the Cloud Load Balancing logs. To enable these logs, follow the instruction [here](https://cloud.google.com/armor/docs/request-logging). For collecting request logs, copy the query from log explorer which you get after following [these](https://cloud.google.com/armor/docs/request-logging#view-logs) steps and while creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the same query.
