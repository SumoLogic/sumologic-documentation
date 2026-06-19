---
id: data-masking
title: How to manage data masking rules in Sumo Logic
keywords:
  - data-masking
  - data-protection
  - regex-locator
description: Learn how to create, edit, disable, and delete data masking rules to protect sensitive data across your organization.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

Data Masking provides a centralized place to manage and review data masking rules across your organizational hierarchy, helping you enforce data protection standards and prevent sensitive information from appearing in your logs.

## How does data masking work?

:::tip
To mask data at ingest time before it is stored, use [Mask Rules](/docs/send-data/collection/processing-rules/mask-rules/) in Processing Rules.
:::

Data masking rules are applied at query processing time. Logs are stored in their original form, and masking is applied dynamically when you run a query. What you see depends on your assigned role:

- If you do **not** have the `View Unmasked Data` [role capability](/docs/manage/users-roles/roles/role-capabilities/), you see log data with all matching values replaced by the configured **Mask String**.
- If you have the `View Unmasked Data` capability, you can view log data in its original, unmasked form.

Once a rule is active, any portion of a log message that matches the rule's **Regex Locator** pattern is substituted with the configured or default **Mask String** if you do not have the `View Unmasked Data` capability.

For example, consider a log line that contains an IP address. You can [create a data masking rule](#how-to-create-a-data-masking-rule) with a regex pattern that targets IP addresses, so that every occurrence is replaced with a mask string of your choice.

**Before masking.** The IP address displayed in plain text:<br/><img src={useBaseUrl('img/manage/data-masking-rule/data-before-masking.png')} alt="Data Before Masking" style={{border: '1px solid gray'}} width="800"/>

**After masking.** The IP address is replaced with the configured mask string:<br/><img src={useBaseUrl('img/manage/data-masking-rule/data-after-masking.png')} alt="Data After Masking" style={{border: '1px solid gray'}} width="800"/>

:::note
Data masking rule is applied as the **last step** of query processing. This means that any string manipulations earlier in a query execute before masking runs, which may expose sensitive values within the query pipeline.
:::

## How to create a data masking rule?

You can create an data masking rule of your own from scratch by following the instructions below:

:::note
- You need the `Manage Data Masking Rules` [role capability](/docs/manage/users-roles/roles/role-capabilities/) to create, edit, or disable a data hiding rule. Whereas, `View Unmasked Data` [role capability](/docs/manage/users-roles/roles/role-capabilities/) helps you to just view the masked data.
- An organization can have a maximum of **50 data masking rules**.
:::

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Data Masking page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Data Masking**. You can also click the **Go To...** menu at the top of the screen and select **Data Masking**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Data Masking**. 
1. Click the **+ Add Data Masking Rule** button on the top right of the table.<br/><img src={useBaseUrl('img/manage/data-masking-rule/data-masking.png')} alt="Data Masking" style={{border: '1px solid gray'}} width="800"/>
1. On the **Create New Data Masking Rule** page, fill in the following fields:<br/><img src={useBaseUrl('img/manage/data-masking-rule/create-data-masking-rule.png')} alt="Create data masking rule" style={{border: '1px solid gray'}} width="400"/>
    1. **Name**. A unique, descriptive name for the rule. This cannot be changed after creation.
    1. (Optional) **Description**. An optional summary of what the rule masks and why. 
    1. **Regex Locator**. A regular expression pattern used to identify the segment of log data to mask. Sumo Logic evaluates this pattern against incoming log messages and applies masking to every match. Ensure your regex targets only the sensitive portion to avoid unintended masking.
    1. (Optional) **Mask String**. The replacement text that substitutes any content matched by the Regex Locator. If left blank, Sumo Logic replaces matched content with a default mask.
1. Click **Save** to activate the rule.

## What are the limitations of data masking?

| Area | Behavior |
|:--|:--|
| **Scheduled Search (Save to Lookup/Index)** | Results are masked or unmasked depending on the `View Unmasked Data` role capability of the user who created the scheduled search. |
| **Field names** | Masking applies to field values only, not field names. For example, when using the `transpose` operator, values that become field names are not masked. |
| **Timestamp** | The following timestamp fields are not eligible for data masking: `_messageTime`, `_receiptTime`, and `_searchableTime`. |
| **Metadata fields** | The following system metadata fields are not eligible for data masking: `_size`, `_collectorid`, `_orgid`, and `_sourceid`. |
| **Lookup UI page** | Results displayed on the Lookup UI page are always shown unmasked. |
| **Cloud SIEM (CSE) pages** | Data masking is not applied to any Cloud SIEM pages. |
| **Internal system queries** | Data masking is not applied to queries running under internal caller modules or system user contexts. |
| **Query assist suggestions** | Masking is not applied to query-assist suggestions, regardless of the user's role or data access level. |

## How to edit a data masking rule?

Follow the below steps to edit the data masking rule:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Data Masking page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Data Masking**. You can also click the **Go To...** menu at the top of the screen and select **Data Masking**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Data Masking**. 
1. Click the rule that you want to edit. Or, click the kebab icon against the selected rule and select **Edit** from the dropdown.<br/><img src={useBaseUrl('img/manage/data-masking-rule/edit-data-masking-rule.png')} alt="Edit data masking rule" style={{border: '1px solid gray'}} width="800"/>
1. In the right-pane panel, click **Edit**.<br/><img src={useBaseUrl('img/manage/data-masking-rule/edit-data-masking-rule-2.png')} alt="Edit data masking rule" style={{border: '1px solid gray'}} width="400"/>
1. Edit the fields as per your requirement.
    :::note
    The **Name** field cannot be edited after a rule is created.
    :::
1. Click **Save** to update the rule.

## How to disable a data masking rule?

Follow the below steps to disable the data masking rule:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Data Masking page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Data Masking**. You can also click the **Go To...** menu at the top of the screen and select **Data Masking**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Data Masking**. 
1. Click the rule that you want to disable. Or, click the kebab icon against the selected rule and select **Disable** from the dropdown.<br/><img src={useBaseUrl('img/manage/data-masking-rule/disable-data-masking-rule.png')} alt="Disable data masking rule" style={{border: '1px solid gray'}} width="800"/>
1. In the right-pane panel, click **More Actions** and select **Disable** from the dropdown.<br/><img src={useBaseUrl('img/manage/data-masking-rule/disable-data-masking-rule-2.png')} alt="Disable data masking rule" style={{border: '1px solid gray'}} width="400"/>
1. Click **Disable** in the confirmation dialog to confirm.<br/><img src={useBaseUrl('img/manage/data-masking-rule/disable-rule-confirmation-dialog.png')} alt="Disable Rule Confirmation Dialog" style={{border: '1px solid gray'}} width="400"/>

## How to delete a data masking rule?

Follow the below steps to delete the data masking rule:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Data Masking page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Data Masking**. You can also click the **Go To...** menu at the top of the screen and select **Data Masking**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Data Masking**. 
1. Click the rule that you want to delete. Or, click the kebab icon against the selected rule and select **Delete** from the dropdown.<br/><img src={useBaseUrl('img/manage/data-masking-rule/delete-data-masking-rule.png')} alt="Delete data masking rule" style={{border: '1px solid gray'}} width="800"/>
1. In the right-pane panel, click **More Actions** and select **Delete** from the dropdown.<br/><img src={useBaseUrl('img/manage/data-masking-rule/delete-data-masking-rule-2.png')} alt="Delete data masking rule" style={{border: '1px solid gray'}} width="400"/>
1. Click **Delete** in the confirmation dialog to confirm.<br/><img src={useBaseUrl('img/manage/data-masking-rule/delete-rule-confirmation-dialog.png')} alt="Delete Rule Confirmation Dialog" style={{border: '1px solid gray'}} width="400"/>

## Audit data masking events

The [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index/) records detailed JSON logs for all data masking activity. Sumo Logic captures two categories of audit events:

- **Rule management events**. Recorded whenever a data masking rule is created, updated, or deleted. Use these to track who changed masking rules and when.
- **Search results masking events**. Recorded each time a search query returns results where data was masked. Use these to audit when and how often sensitive data was hidden from query results.

Because these events are stored under different metadata in the audit index, you need separate queries to retrieve each category.

**To audit rule management activity** (create, update, delete), run:

```sumo
_index="sumologic_audit_events" _sourceCategory=datamasking
```

**To audit search results masking activity**, run:

```sumo
_index="sumologic_audit_events" _sourcename=SearchResultsMasked
```

## FAQs

### What is Data Masking in Sumo Logic?

Data Masking is a centralized feature that lets you create and manage rules to automatically redact or replace sensitive data in your logs. It helps enforce data protection standards consistently across your organizational hierarchy.

### What role capability is needed to manage data masking rules?

You need the `Manage Data Masking Rules` role capability to create, edit, or disable rules. If you have the `View Unmasked Data` capability, you can view log data in its original, unmasked form.

### What should be entered as the Mask String?

The **Mask String** is the text that replaces any content matched by your Regex Locator. It can be any string, such as `[MASKED]`, `****`, or `[REDACTED]`. If you leave it blank, Sumo Logic applies a default mask. Choose a value that clearly signals to viewers that data has been intentionally hidden.

### Can the rule name be edited after it's been created?

No. The **Name** field is locked after creation. If you need to rename a rule, you must delete the existing rule and create a new one with the desired name.

### What is the difference between disabling and deleting a rule?

Disabling a rule pauses masking while preserving the rule's configuration so it can be re-enabled later. Deleting a rule permanently removes it and cannot be undone.

### Is there a limit to how many data masking rules an organization can create?

Yes. An organization can have a maximum of **50 data masking rules**. To add a new rule once the limit is reached, an existing rule must be deleted first.

### At what point is a data masking rule applied?

Data masking rules are applied as the final step during query processing. Logs are stored in their original form, and masking is applied dynamically when a query runs. If you want to mask logs during ingestion itself, use [Mask Rules](/docs/send-data/collection/processing-rules/mask-rules/) within Processing Rules instead.
