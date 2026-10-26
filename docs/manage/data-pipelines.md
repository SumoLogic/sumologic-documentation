---
id: data-pipelines
title: Data Pipelines
description: Learn how Data Pipelines give you one place to build, test, and publish rules that process and route your logs, and to monitor pipeline health in Sumo Logic.
keywords:
  - data pipelines
  - telemetry pipeline
  - processing rules
  - field extraction rules
  - masking
  - routing expression
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

Data Pipelines give you a single place to define how your logs are processed and routed in Sumo Logic. You build a pipeline on a visual graph, test it with sample data, and publish it when you are confident it works.

## About Data Pipelines

Processing capabilities in Sumo Logic, such as Field Extraction Rules (FERs), live in different places and follow different patterns. Data Pipelines bring these steps together so you can see how data flows and manage it in one place.

Compared to FERs, Data Pipelines:

- Apply only the first matching pipeline to each log message, instead of running every matching rule. This removes the need to manage the order of overlapping rules.
- Show your processing steps as a graph.
- Let you test the whole pipeline with sample data before you publish it.
- Show input and output data volume and health events for each pipeline.

Data Pipelines work with logs from any collection method, including installed Collectors, hosted Collectors, and Cloud-to-Cloud (C2C) sources. A message enters a pipeline if it matches the pipeline's routing expression.

:::note
Data Pipelines currently support logs only, and a pipeline can send data to one destination, Sumo Logic.
:::

## Key concepts

- **Pipeline**. A set of processing steps that applies to the logs matching its routing expression.
- **Routing expression**. A query-style condition that decides which logs enter the pipeline. For example, `_sourceCategory=prod/abc/*`.
- **Processing group**. An ordered group of processors. You can set a condition so the group runs only on messages that meet it.
- **Processor**. A single processing step, such as adding a field, masking text, or parsing JSON. Processors in a group run in sequence.
- **Router**. A node that sends a message to the next node based on a condition, such as the value of `_sourceHost`. A router can have a default route.
- **Destination**. Where processed data goes. Currently this is always Sumo Logic.

## How a pipeline processes data

A pipeline is a graph that starts at the routing expression and ends at the destination. A graph can contain the following nodes:

1. **Routing expression**. Selects the logs that enter the pipeline.
1. **Processing groups**. Transform, enrich, parse, or mask the data.
1. **Routers**. Split the flow into different branches based on a condition.
1. **Sumo Logic destination**. Receives the processed data.

Masking and routing by source are not separate node types. You configure masking as a processing group and routing by source as a router.

### First match

Pipelines are evaluated in order, and each log message passes through only the first pipeline whose routing expression it matches. Later pipelines never see that message, even if their routing expressions also match.

For example, if a pipeline at the top of the list matches everything with a wildcard, no pipeline below it receives any data. You can create multiple pipelines with the same or overlapping routing expressions, but only the first one in the order processes the message.

To change the order, drag a pipeline to a new position in the list and save.

### Processors

Within a processing group, you can add processors from the following categories:

- **Parse**. JSON Parse, Regex Parse, and Anchor Parse.
- **Transform**. Add Fields, Drop Fields, Replace Pattern, and Normalize. For example, Normalize can convert a value to lowercase or uppercase or trim whitespace.
- **Advanced**. SIEM Forwarding and SUMOQL Parse.

You can also mask sensitive data, such as email addresses, SSNs, and credit card numbers. \{TODO: confirm which category contains the built-in masking processors.\}

You can disable a processing group without deleting it.

## Pipeline states

Data Pipelines do not use versions. Each pipeline has a published version that processes live data, and can also have a draft version.

| State | Meaning |
|:--|:--|
| Draft | The pipeline was saved but is not processing live data. |
| Published | The pipeline is processing live data. It is read-only. |
| Published and draft | The pipeline has a live published version, and someone is editing a draft on top of it. The draft does not affect live data until it is published. |

## Prerequisites

- \{TODO: roles and capabilities required to view, create, edit, and publish pipelines.\}
- \{TODO: enablement requirements for the Private Preview.\}

## Create a pipeline

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Data Management** > **Data Pipelines**. You can also click the **Go To...** menu at the top of the screen and select **Data Pipelines**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Data Pipelines**.
1. The page shows the number of active pipelines, their health, and the overall data volume for the last 24 hours. Below that, it lists your pipelines in order. Click **Add Pipeline**.<br/><img src={useBaseUrl('img/manage/data-pipelines/pipelines-page.png')} alt="Data Pipelines page with the Add Pipeline button and Health column highlighted" style={{border: '1px solid gray'}} width="800"/>
1. Enter a **Pipeline Name** and optionally a **Description**.
1. Enter a **Routing Expression**. Select a **Key** and enter a **Value**, such as `prod/app/logs`. To write the expression as a query, click **Switch to Advanced**.<br/><img src={useBaseUrl('img/manage/data-pipelines/add-pipeline-dialog.png')} alt="Add Pipeline dialog" style={{border: '1px solid gray'}} width="450"/>
1. Click **Add Pipeline**. The pipeline opens in a graph view with a routing expression, one processing group, and the Sumo Logic destination.<br/><img src={useBaseUrl('img/manage/data-pipelines/pipeline-graph.png')} alt="New pipeline graph" style={{border: '1px solid gray'}} width="700"/>

## Configure a processing group

1. In the graph, select a processing group.
1. Enter a name that describes its purpose, such as `Extract required fields`. To rename a group, click its name.
1. To run the group only on some messages, under **Filter Condition**, turn on **Filter Expression**. Select a **Key** and enter a **Value**. Messages that don't meet the condition skip the group. To write the condition as a query, click **Switch to Advanced**.<br/><img src={useBaseUrl('img/manage/data-pipelines/processor-group-filter-condition.png')} alt="Processor group Filter Condition and Add Processor button" style={{border: '1px solid gray'}} width="450"/>
1. Under **Processing Steps**, click **Add Processor**, choose a processor type, and click **Add**. Then configure it. For example, add a field named `environment` with a value.<br/><img src={useBaseUrl('img/manage/data-pipelines/add-processor-dialog.png')} alt="Add Processor dialog" style={{border: '1px solid gray'}} width="450"/>
1. Repeat to add more processors. They run in the order listed.
1. Click **Save**.

To add more groups or routers, insert them between existing nodes in the graph.

## Test and publish a pipeline

Use **Test Mode** to run sample messages through your draft before you publish it. Test mode is especially useful when your pipeline has many parse or masking expressions.

1. Open the pipeline in draft mode.
1. In the graph, click the node you want to test. For example, click a processing group.
1. In the right pane that shows the node details, turn on **Test Mode** at the top right.<br/><img src={useBaseUrl('img/manage/data-pipelines/test-node-test-mode.png')} alt="Node details pane with the Test Mode toggle highlighted" style={{border: '1px solid gray'}} width="450"/>
1. On the **Input Sample** tab, enter a sample log message. You can also set metadata fields for the message, such as `_sourceCategory`.
   * Instead of pasting a sample, you can click **Upload** and select a file. Supported file types are `.log`, `.txt`, and `.json`, up to 5 MB.<br/><img src={useBaseUrl('img/manage/data-pipelines/test-input-sample-upload.png')} alt="Input Sample tab with the Upload button highlighted" style={{border: '1px solid gray'}} width="800"/>
1. Click **Run Test**.
1. Open the **Processed Output** tab to compare the raw input with the processed output.
1. When you are satisfied with the results, click **Publish**.

Test mode shows the result of each step the message passed through, so you can see how a field changed. Point to a field in the output to see its processing history. For example, you can see a value change from lowercase to uppercase after a normalization step.

<img src={useBaseUrl('img/manage/data-pipelines/test-mode.png')} alt="Test mode showing processed output and processing history" style={{border: '1px solid gray'}} width="800"/>

If a message does not reach a node, test mode tells you why. For example, the message might not meet the condition on a router.

:::note
Test mode does not check the pipeline's routing expression. It assumes the sample message is meant for the pipeline you are testing. Make sure your sample message also meets the conditions of any routers and processing groups you want to reach.
:::

### Edit a published pipeline

You cannot change a published pipeline directly, which prevents accidental updates. A published pipeline opens as read-only, and the page shows which version you are viewing.

<img src={useBaseUrl('img/manage/data-pipelines/published-read-only.png')} alt="Read-only published pipeline with the Edit as draft button" style={{border: '1px solid gray'}} width="800"/>

1. Open the pipeline and click **Edit as draft**. This creates a draft.
1. Make your changes and test them.
1. Click **Publish** to replace the live version, or **Save** to keep working on the draft later.

## Manage pipelines

From the Data Pipelines page, you can:

- **Reorder** pipelines to control which pipeline matches first. Drag a pipeline by its handle, then confirm the change. Reordering takes effect immediately and changes which pipeline processes incoming data first.
- **Disable** a pipeline, or turn it back on, with the toggle in its row.
- **Duplicate** a pipeline.
- **Export as JSON** to export a pipeline configuration.
- **Import** a pipeline from a JSON file. \{TODO: confirm where the import option is and its label.\}
- **Delete** a pipeline.

To open the **Duplicate**, **Disable**, **Export as JSON**, and **Delete** options, select a pipeline in the list and click **More Actions**.

<img src={useBaseUrl('img/manage/data-pipelines/pipeline-details-panel.png')} alt="Pipeline details panel with More Actions menu" style={{border: '1px solid gray'}} width="350"/>

## Monitor pipeline health

The Data Pipelines page shows the status of each pipeline and its data volume. The **Health** column lists each pipeline as a green **Healthy** or a red **Error**. **Healthy** means the pipeline is working as expected. For each pipeline, you can see:

- Input and output data volume for the last 24 hours.
- The data type. Currently this is logs only.
- Health events, such as execution failures in a processing group, with the error message.

To investigate, select a pipeline in the list and click **View Health Details**. The dialog shows the latest open health events with their severity, resource name, event name, and the time they opened. Click **View All Health Events** to see the full list.

<img src={useBaseUrl('img/manage/data-pipelines/health-events-dialog.png')} alt="Health events dialog for a pipeline" style={{border: '1px solid gray'}} width="700"/>

You can also see where an error occurred in the pipeline graph. To find it, open a pipeline with a red **Error** in the **Health** column. A warning icon appears on the node that has the error. Point to the node to see the error details.

<img src={useBaseUrl('img/manage/data-pipelines/pipeline-health-error-node.png')} alt="Pipeline graph with a warning icon and error details on a processing group" style={{border: '1px solid gray'}} width="800"/>

## Limitations

- Pipelines process logs only.
- A pipeline can have only one destination, Sumo Logic.
- The [limitations that apply to Ingest Time FERs](/docs/manage/field-extractions/#limitations) also apply to Data Pipelines.
- \{TODO: maximum number of pipelines per organization.\}

## Additional information

- [Health Events](/docs/manage/health-events)
- [Field Extraction Rules](/docs/manage/field-extractions)
- [Partitions](/docs/manage/partitions)
- [Ingest Budgets](/docs/manage/ingestion-volume/ingest-budgets)
