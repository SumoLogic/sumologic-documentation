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

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Data Masking provides a centralized place to manage and review data masking rules across your organizational hierarchy, helping you enforce data protection standards and prevent sensitive information from appearing in your logs.

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
    1. (Optional)**Decription**. An optional summary of what the rule masks and why. 
    1. **Regex Locator**. A regular expression pattern used to identify the segment of log data to mask. Sumo Logic evaluates this pattern against incoming log messages and applies masking to every match. Ensure your regex targets only the sensitive portion to avoid unintended masking.
    1. (Optional)**Mask String**. The replacement text that substitutes any content matched by the Regex Locator. If left blank, Sumo Logic replaces matched content with a default mask.
1. Click **Save** to activate the rule.

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

## FAQs

### What is Data Masking in Sumo Logic?

Data Masking is a centralized feature that lets you create and manage rules to automatically redact or replace sensitive data in your logs. It helps enforce data protection standards consistently across your organizational hierarchy.

### What role capability is needed to manage data masking rules?

You need the `Manage Data Masking Rules` role capability to create, edit, or disable rules. Users with the `View Unmasked Data` capability can view log data in its original, unmasked form.

### What should be entered as the Mask String?

The **Mask String** is the text that replaces any content matched by your Regex Locator. It can be any string, such as `[MASKED]`, `****`, or `[REDACTED]`. If you leave it blank, Sumo Logic applies a default mask. Choose a value that clearly signals to viewers that data has been intentionally hidden.

### Can the rule name be edited after it's been created?

No. The **Name** field is locked after creation. If you need to rename a rule, you must delete the existing rule and create a new one with the desired name.

### What is the difference between disabling and deleting a rule?

Disabling a rule pauses masking while preserving the rule's configuration so it can be re-enabled later. Deleting a rule permanently removes it and cannot be undone.

### Is there a limit to how many data masking rules an organization can create?

Yes. An organization can have a maximum of **50 data masking rules**. To add a new rule once the limit is reached, an existing rule must be deleted first.