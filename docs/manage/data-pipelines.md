---
id: data-pipelines
title: Data Pipelines
description: Learn how Data Pipelines give you one place to configure, preview, and monitor how Sumo Logic collects, processes, and routes your logs and metrics.
keywords:
  - data pipelines
  - telemetry pipeline
  - field extraction rules
  - processing rules
  - partitions
  - OpenTelemetry
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

Data Pipelines give you a single, guided place to configure how your data moves through Sumo Logic, from collection through processing to routing and storage. {TODO: confirm one-sentence definition with PM/Eng.}

## About Data Pipelines

Configuring data collection today means working across several areas: OpenTelemetry receivers, processors, and exporters, and Sumo Logic sources, Field Extraction Rules (FERs), processors, ingest budgets, and forwarding. Data Pipelines bring these steps together so you can see and manage the full flow of your data in one place.

{TODO: describe what Data Pipelines is in the product, including where it appears in the UI and the Basic GA scope.}

With Data Pipelines, you can:

- {Configure all processing steps for your data in one place.}
- {See how data flows from collection to storage, and which rules apply to which data.}
- {Preview and validate your configuration before you scale it.}
- {Monitor pipeline health and troubleshoot issues.}

{TODO: confirm each capability with PM/Eng. Remove any that are not in scope for the Private Preview.}

## How data flows through a pipeline

A pipeline moves data through three stages.

| Stage | What happens | Examples |
|:--|:--|:--|
| Collection | You bring data into Sumo Logic. | {Sources, OpenTelemetry receivers, Cloud-to-Cloud integrations, cloud collection} |
| Processing | You parse, filter, mask, and enrich data. | {Field Extraction Rules, parsers, logs-to-metrics, source-level filters, masking rules} |
| Routing | You decide where data is stored or sent. | {Partitions, destinations, forwarding} |

{TODO: confirm the stages, the processing steps supported, and the order in which they run.}

## Prerequisites

- {Requirement 1, such as roles or capabilities needed.}
- {Requirement 2, such as supported collection methods.}

## Configure a data pipeline

{TODO: add steps once the UI and workflow are confirmed.}

1. {Step 1.}
1. {Step 2.}
1. {Step 3.}

## Monitor pipeline health

{TODO: describe the health events and visibility available for each pipeline stage.}

## Limitations

{TODO: list known limitations for the Private Preview.}

## Additional information

- [Health Events](/docs/manage/health-events)
- [Field Extraction Rules](/docs/manage/field-extractions)
- [Partitions](/docs/manage/partitions)
- [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets)
