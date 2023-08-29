
---
id: cloud-certificate-manager
title: Google Cloud Certificate Manager
sidebar_label: Google Cloud Certificate Manager
description: Learn about the Sumo Logic collection process for the Google Cloud Certificate Manager service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudCertificateManager.png')} alt="Thumbnail icon" width="50"/>

Certificate Manager lets you acquire and manage Transport Layer Security (TLS) certificates for use with Google Cloud load balancers. For more details, refer to the [GCP documentation](https://cloud.google.com/certificate-manager/docs/overview)

## Log types

* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Certificate Manager integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/certificate-manager/docs/audit-logging#audit_log_permissions). To enable logging for Google Certificate Manager, refer to [Google documentation](https://cloud.google.com/certificate-manager/docs/audit-logging#enabling_audit_logging). For more detail on Certificate Manager operations being audited, refer to [audited operations](https://cloud.google.com/certificate-manager/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   resource.type=audited_resource (resource.labels.service=certificatemanager.googleapis.com or resource.labels.service=publicca.googleapis.com)
   ```