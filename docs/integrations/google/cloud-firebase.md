
---
id: cloud-firebase
title: Google Cloud Firebase
sidebar_label: Google Cloud Firebase
description: Learn about the Sumo Logic collection process for the Google Cloud Firebase service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudFirebase.png')} alt="Thumbnail icon" width="50"/>

Firebase is Google's mobile development platform. For more details, refer to the [GCP documentation](https://firebase.google.com/docs)

## Log and Metric types

* [Google Cloud Metrics](https://cloud.google.com/monitoring/api/metrics_gcp)
* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup
You can collect the logs and metrics for Sumo Logic's Google Cloud Firebase integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). For details on roles and permission required to access audit logs and for enabling the audit log for respective service click on the service in the table below and refer section "Permissions and roles" and "Enable audit logging" respectively. You can also get the list of all the audited operations for the service in the section "Audited operations". Following is a table listing the Firebase service along with the resource type and service to be used in Cloud Logging query to fetch audit logs.

| Firebase Products | Resource Type |  Service Name |
| ----------- | ----------- |  ----------- |
| [Firebase Management](https://firebase.google.com/support/guides/cloud-audit-logging/firebase-management) | audited_resource | firebase.googleapis.com       |
| [Cloud Storage for Firebase](https://firebase.google.com/support/guides/cloud-audit-logging/firebase-storage)  | audited_resource | firebasestorage.googleapis.com        |
| [Firebase Cloud Messaging](https://firebase.google.com/support/guides/cloud-audit-logging/firebase-cloud-messaging) | audited_resource | gcmcontextualcampaign-pa.googleapis.com       |
| [Firebase App Check](https://firebase.google.com/support/guides/cloud-audit-logging/firebase-app-check)   | audited_resource | firebaseappcheck.googleapis.com        |
| [Firebase Security Rules](https://firebase.google.com/support/guides/cloud-audit-logging/firebase-rules) | audited_resource | firebaserules.googleapis.com       |
| [Firebase Realtime Database](https://firebase.google.com/support/guides/cloud-audit-logging/firebase-realtime-database) | audited_resource | firebasedatabase.googleapis.com       |

* Collect **Platform Logs** using [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). There are various platform logs which could be collected for Google Cloud Firebase. Here is a table listing these services with there respective resource type 

| Firebase Service | Resource Type |
| ----------- | ----------- |
| Auth Project | firebase_auth       |
| Hosting Site Domain   | firebase_domain        |
| Realtime Database | firebase_namespace       |
| Releases for Firebase Rules   | firebaserules_release        |
| Ruleset for Firebase Rules | firebaserules_ruleset       |

Note that while creating the sync as part of the **Choose logs to include in sink** section you can use the following query : 

```resource.type=<resource_type> resource.labels.service=<service_name>```

where resource_type can be replaced with resource type of respective firebase product to fetch platform logs. And to filter audit logs, resource_type can be replaced with "audited_resource" and service_name can be replaced with service name of respective firebase product. These queries can then be seperated by an "or" condition.

### Configure metrics collection

* Collect **GCP Metrics** using the [GCP Metric](/docs/send-data/hosted-collectors/google-source/gcp-metrics-source/) source. Note that in the Services dropdown, you'll need to select **Firebase**. For Google Firebase metrics and dimensions, refer to [Google Firebase metrics](https://cloud.google.com/monitoring/api/metrics_gcp#gcp-firebasedatabase).