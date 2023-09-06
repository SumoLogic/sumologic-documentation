---
id: cloud-backup-for-gke
title: Google Cloud Backup for GKE
sidebar_label: Google Cloud Backup for GKE
description: Learn about the Sumo Logic collection process for the Google Cloud Backup for GKE service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudBackupforGKE.png')} alt="Thumbnail icon" width="50"/>

Backup for GKE is a service for backing up and restoring workloads in GKE clusters. For more details, refer to the [GCP documentation](https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/concepts/backup-for-gke).

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Backup for GKE integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/audit-logging#audit_log_permissions). To enable logging for Google Backup for GKE, refer to [Google documentation](https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/audit-logging). For more detail on Backup for GKE operations being audited, refer to [audited operations](https://cloud.google.com/kubernetes-engine/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=audited_resource AND resource.labels.service=gkebackup.googleapis.com)
   ```

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). Here are the details of [platforms logs for Backup for GKE](https://cloud.google.com/kubernetes-engine/docs/add-on/backup-for-gke/how-to/platform-logging-backup-for-gke). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type=(gkebackup.googleapis.com/BackupPlan or gkebackup.googleapis.com/RestorePlan))
   ```