---
id: partner-app-otel-doc
title: Partner App (OTEL) Template
sidebar_label: Partner App (OTEL) Template
description: Using the Sumo Logic Partner App (OTEL) Template.
---

<head>
  <meta name="robots" content="noindex" />
</head>

:::tip
Copy this file and edit it for your App integration.
:::

<img src={useBaseUrl('img/integrations/folder-name/app-name.png')} alt="icon" width="75"/>

Introduction

<img src='Architecture-S3-image-link' style={{border: '1px solid black'}} alt="<App Name> OTel Collection architecture" />

## Fields creation in Sumo Logic for \<App Name\>

Following are the tags which will be created as part of \<App Name\> App install if not already present. 

## Prerequisites

This section provides instructions for configuring metrics and log collection for the Sumo Logic app for \<App Name\>.

### Metric collection

### Log collection

## Collection configuration and app installation

{@import ../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up OpenTelemetry Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https:///App-Collector-S3-link.png' style={{border: '1px solid black'}} alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for the \<App Name\> collection.

<Add-information-about-the-location>

You can add any custom fields which you want to tag along with the data ingested in sumo.

Click on the Download YAML File button to get the yaml file.

### Step 3: Send logs and metrics to Sumo Logic

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

<Add-steps-to-start-receiving-data>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample log and metrics messages

### Log message

\<Get a sample from app developer and replace this text with it.\>

### Metric message

\<Get a sample from app developer and replace this text with it.\>

## Sample Query

### Log query

\<Get a sample from app developer and replace this text with it.\>

### Metric query

\<Get a sample from app developer and replace this text with it.\>

## Viewing \<App Name\> dashboards

{@import ../../reuse/filter-dashboards.md}

## \<Dashboard name\>

\<Copy, paste, and fill in this dashboard section for each dashboard. Enter a dashboard description from above.\> Use this dashboard to:

* Enter a list of features. Example below.

<!--
Use this dashboard to:

* Monitor high severity threats and scan attacks.
* Review \<fill in\> for troubleshooting configuration issues.
* Understand how to fine-tune \<fill in your product name\> based on \<fill in panel names\>.

\<Add your dashboard screenshot.\>
<img src='https://Dashboard-S3-link.png' style={{border: '1px solid black'}} alt="Dashboard-name" />
-->