---
id: cloud-alloydb-for-postgresql
title: Google Cloud AlloyDB for PostgreSQL
sidebar_label: Google Cloud AlloyDB for PostgreSQL
description: Learn about the Sumo Logic collection process for the Google Cloud AlloyDB for PostgreSQL service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudAlloyDBforPostgreSQL.png')} alt="Thumbnail icon" width="50"/>

AlloyDB for PostgreSQL is a fully managed, PostgreSQL-compatible database service that's designed for your most demanding workloads, including hybrid transactional and analytical processing. For more details, refer to the GCP [documentation](https://cloud.google.com/alloydb/docs/overview)

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)
* [Audit Logs](https://docs.aws.amazon.com/appflow/latest/userguide/appflow-cloudtrail-logs.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud AlloyDB for PostgreSQL integration by following the below steps.

### Configure logs collection

* Collect **Audit Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). These Audit Logs can be accessed based on the [permissions and roles](https://cloud.google.com/alloydb/docs/audit-logging#audit_log_permissions). To enable logging for Google AlloyDB, refer to [Google documentation](https://cloud.google.com/alloydb/docs/audit-logging#enabling_audit_logging). For more detail on AlloyDB operations being audited, refer to [audited operations](https://cloud.google.com/alloydb/docs/audit-logging#audited_operations). While creating the sync in GCP, as part of the **Choose logs to include in sink** section you can use the following query:
   ```sql
   (resource.type=audited_resource resource.labels.service=alloydb.googleapis.com)
   ```
 
* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). AlloyDB platform logs include logs related to [pgAudit](https://cloud.google.com/alloydb/docs/pgaudit/about) and instance log which includes - PostgreSQL database logs, container logs for dataplane agents, and internal dogfish logs. To enabled pgAudit logs, refer to the [GCP documentation](https://cloud.google.com/alloydb/docs/pgaudit/enable-audit). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the below query:
   ```sql
   (resource.type=alloydb.googleapis.com/Instance)
   ```