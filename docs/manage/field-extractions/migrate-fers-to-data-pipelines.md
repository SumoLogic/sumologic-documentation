---
id: migrate-fers-to-data-pipelines
title: Migrate FERs to Data Pipelines
sidebar_label: Migrate FERs to Data Pipelines
description: Move your ingest-time field extraction rules to Data Pipelines gradually, one rule at a time, with steps to test, publish, verify, and roll back.
keywords:
  - migrate field extraction rules
  - field extraction rules
  - data pipelines
  - FER migration
  - routing expression
---

You can move your ingest-time field extraction rules (FERs) to [Data Pipelines](/docs/manage/data-pipelines) gradually, one rule or one group of rules at a time. Pipelines run after your data passes through existing FERs, so your current processing keeps working while you build and test the replacement.

Pipelines are the best place to start for new processing. If your FERs already work, you do not have to migrate them. See [Should you migrate from FERs?](/docs/manage/data-pipelines/#should-you-migrate-from-fers) to decide.

:::note
Run-time FERs, which auto-parse JSON during a search, are not part of this migration. Only ingest-time FERs have a pipeline equivalent.
:::

## How FERs and pipelines work together

FERs run first, and pipelines add processing on top of them. Fields parsed by a pipeline are assigned at the same point in processing as FER fields, and pipelines take precedence over FERs in the [order of precedence for field assignment](/docs/manage/fields):

- If an FER parses a value as `FieldA` and a pipeline parses the same value as `FieldB`, the message ends up with both fields, each with the same value.
- If an FER and a pipeline use the same field name but extract different values, the pipeline value wins.

## Before you begin

- You need the **Manage Data Pipelines** role capability. To disable the FER afterward, you also need the **Manage field extraction rules** capability. See [Prerequisites](/docs/manage/data-pipelines/#prerequisites).
- Have sample log messages for each FER you plan to migrate.

## Migration steps

1. **List the FERs to migrate.** On the **Field Extraction Rules** page, note each rule's name, scope, and parse expression, and which rules apply to the same logs.
1. **Group the rules into pipelines.** If multiple FERs apply to the same logs, put them in one pipeline and create a processing group for each rule. A message is processed by only the first pipeline it matches, but FERs are additive, so several can apply to the same message.
1. **Create the pipeline.** Follow [Create a pipeline](/docs/manage/data-pipelines/#create-a-pipeline) and enter the FER scope as the **Routing Expression**. For example, a scope of `_sourceCategory=prod/abc/*` uses the same expression in the pipeline. If your scope includes keywords, click **Switch to Advanced** and write it as a query.
1. **Recreate the extraction.** In a [processing group](/docs/manage/data-pipelines/#configure-a-processing-group), add a processor that matches the FER's parse expression:
   - To reuse the expression as is, add a **SumoQL Parse** processor and paste in the FER's parse expression. It supports the same operators as an FER.
   - To use a dedicated processor, rebuild the extraction with a **JSON Parse**, **Regex Parse**, or **Anchor Parse** processor.
1. **Test the pipeline.** Turn on **Test Mode**, enter sample messages, and click **Run Test**. Compare the **Processed Output** with the fields the FER extracts today. Test mode does not check the routing expression. To confirm it matches your logs, run the same expression as a log search. Learn more about [testing a pipeline](/docs/manage/data-pipelines/#test-and-publish-a-pipeline).
1. **Publish the pipeline.** Click **Publish**. The FER stays active, so both the FER and the pipeline process matching logs.
1. **Verify the results.** Search the logs from the routed source and confirm the extracted fields are correct. On the **Data Pipelines** page, check the pipeline's input and output volume and its **Health** status. Learn more about [monitoring pipeline health](/docs/manage/data-pipelines/#monitor-pipeline-health).
1. **Disable the FER.** When the pipeline results are correct, disable the FER on the **Field Extraction Rules** page. Do not delete it yet.
1. **Monitor, then clean up.** After you are confident in the results, delete the FER. Deleting a rule does not delete the fields it extracted, so the fields from the pipeline remain. Remove fields you no longer need on the [**Fields**](/docs/manage/fields) page.

## Roll back a migration

If the pipeline does not produce the results you expect, re-enable the FER and disable the pipeline using the toggle in its row. Fields the pipeline already added stay on messages that were ingested while it was active.

If you already deleted the FER, you need to recreate it. This is why you should disable the FER and wait before deleting it.

## Considerations

- **Field limits.** Limits that apply to ingest-time FERs also apply to pipelines. See [Limitations](/docs/manage/data-pipelines/#limitations).
- **Pipeline order.** If you migrate several rules into separate pipelines, make sure their routing expressions do not overlap unexpectedly. Only the first matching pipeline processes a message.
- **Historical data.** Like FERs, pipelines apply to data going forward. Fields are not added to data that is already ingested.
- **Parse behavior.** All pipeline processors fail open, so a message that does not match a parse expression passes to the next step instead of stopping. In a SumoQL Parse processor, you still need to add `nodrop` to the expression, as you do in an FER. Without it, the expression itself does not keep messages that do not match.

## Additional information

- [Data Pipelines](/docs/manage/data-pipelines)
- [Field Extraction Rules](/docs/manage/field-extractions)
- [Fields](/docs/manage/fields)
