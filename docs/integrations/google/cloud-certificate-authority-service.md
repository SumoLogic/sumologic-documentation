
---
id: cloud-certificate-authority-service
title: Google Cloud Certificate Authority Service
sidebar_label: Google Cloud Certificate Authority Service
description: Learn about the Sumo Logic collection process for the Google Cloud Certificate Authority Service service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudCertificateAuthorityService.png')} alt="Thumbnail icon" width="50"/>

Certificate Authority Service enables you to simplify, automate, and customize the deployment, management, and security of private certificate authorities (CA). For more details, refer to the [GCP documentation](https://cloud.google.com/certificate-authority-service/docs/all-quickstarts)

## Log types

* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Certificate Authority Service integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/certificate-authority-service/docs/audit-logging#audit_log_permissions). To enable logging for Google Certificate Authority Service, refer to [Google documentation](https://cloud.google.com/certificate-authority-service/docs/audit-logging#enabling_audit_logging). For more detail on Certificate Authority Service operations being audited, refer to [audited operations](https://cloud.google.com/certificate-authority-service/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource resource.labels.service=privateca.googleapis.com)
   ```