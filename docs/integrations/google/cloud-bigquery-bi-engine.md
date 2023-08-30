---
id: cloud-bigquery-bi-engine
title: Google Cloud BigQuery BI Engine
sidebar_label: Google Cloud BigQuery BI Engine
description: Learn about the Sumo Logic collection process for the Google Cloud BigQuery BI Engine service.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/google/GoogleCloudBigQueryBIEngine.png')} alt="Thumbnail icon" width="50"/>

BigQuery BI Engine is a fast, in-memory analysis service that accelerates many SQL queries in BigQuery by intelligently caching the data you use most frequently. For more details, refer to the [GCP documentation](https://cloud.google.com/bigquery/docs/bi-engine-intro).

## Log types

* [Platform Logs](https://docs.aws.amazon.com/appflow/latest/userguide/monitoring-cloudwatch.html)

## Setup

You can collect the logs for Sumo Logic's Google Cloud Bigquery BI engine integration by following the below steps.

### Configure logs collection

* Collect **Platform Logs** using the [Google Cloud Platform source](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source). While creating the sync in GCP, as part of the **Choose logs to include in sink** section, you can use the following query:
   ```sql
   (resource.type="bigquery_biengine_model")
   ```

