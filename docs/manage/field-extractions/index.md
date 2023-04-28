---
slug: /manage/field-extractions
title: Field Extractions
description: Field Extraction speeds the search process by parsing fields as log messages are ingested.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Field extractions allow you to parse [fields](/docs/manage/fields.md) from your log messages at the time the messages are ingested, which eliminates the need to parse fields at the query level. With Field Extraction Rules (FERs) in place, users can use the pre-parsed fields for ad-hoc searches, scheduled searches, real-time alerts, and dashboards. In addition, field extraction rules help standardize field names and searches, simplify the search syntax and scope definition, and improve search performance. 

Fields are extracted from the time you create your FER moving forward. Therefore, set your FERs early on to take advantage of this automatic parsing mechanism.

For best practices on naming your fields, see [Field Naming Convention](field-naming-convention.md). 

:::important
You need the **Manage field extraction rules** [role capability](../users-roles/roles/role-capabilities.md) to create a field extraction rule. 
:::

![FER page.png](/img/field-extraction-rules/fer-page.png)

The **Manage Data** > **Logs** > **Field Extraction Rules** page displays the following information: 

When hovering over a row in the table there are icons that appear on the far right for editing, disabling and deleting the rule.

* **Status** shows a checkmark in a green circle ![check in green circle.png](/img/reuse/check-green-circle.png) to indicate if the Rule is actively being applied or an exclamation mark in a red circle ![exclamation in red circle.png](/img/reuse/exclamation-red-circle.png) to indicate if the Rule is disabled.
* **Rule Name**
* **Applied At** indicates when the field extraction process occurs, either at Ingest or Run time.
* **Scope** 
* **Created** date and time by user
* **Last Modified** date and time by user
* **Fields Capacity** (bottom of table) shows how many fields your account is using, out of the total available for use.

You can view the fields created in your account and what features are referencing them on the [Fields](/docs/manage/fields.md) page.

On the **Manage Data** > **Logs** > **Field Extraction Rules** page you can:

* Click **+ Add** to [create a Field Extraction Rule](create-field-extraction-rule.md).
* Search Field Extraction Rules by name and scope.
* [**Edit** a Field Extraction Rule](edit-field-extraction-rules.md).
* **Disable** a Field Extraction Rule.
* **Delete** a Field Extraction Rule.

## Limitations

{@import ../../reuse/fer-limitations.md}

## Micro Lesson: Field Extraction Rules Basics

<Iframe url="https://www.youtube.com/embed/Xv3pSwhVCN4"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe';

## Edit a Field Extraction Rule

Changes to Field Extraction Rules are implemented immediately.

1. In Sumo Logic, go to **Manage Data** > **Logs** > **Field Extraction Rules.**
1. Find the rule in the table and click it. A window appears on the right of the table, click the **Edit** button.
1. Make changes as needed and click **Save** when done.

## Delete a Field Extraction Rule

Deleting a Field Extraction Rule doesn't delete the fields it was parsing. You can delete any unwanted fields on the [Fields](/docs/manage/fields.md) page.

1. In Sumo Logic, go to **Manage Data** > **Logs** > **Field Extraction Rules.**
1. Find the rule to delete in the table and click it. A window appears on the right of the table, click the **More Actions** button, and select **Delete**.

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/manage/field-extractions/field-naming-convention"><img src={useBaseUrl('img/field-extraction-rules/admin.png')} alt="icon" width="40"/><h4>Field Naming Convention</h4></a>
  <p>Learn about the recommended naming conventions for standard fields in Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/manage/field-extractions/create-field-extraction-rule"><img src={useBaseUrl('img/field-extraction-rules/admin.png')} alt="icon" width="40"/><h4>Create a Field Extraction Rule</h4></a>
  <p>Learn how to instruct Sumo Logic to parse out fields automatically.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/manage/field-extractions/edit-field-extraction-rules"><img src={useBaseUrl('img/field-extraction-rules/admin.png')} alt="icon" width="40"/><h4>Edit Field Extraction Rules</h4></a>
  <p>Learn how to change Field Extraction Rules.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/manage/field-extractions/fer-templates"><img src={useBaseUrl('img/field-extraction-rules/admin.png')} alt="icon" width="40"/><h4>FER Templates</h4></a>
  <p>Learn how to use FER Templates to parse common fields for various applications.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/manage/field-extractions/parse-elb-logs"><img src={useBaseUrl('img/field-extraction-rules/admin.png')} alt="icon" width="40"/><h4>Parse AWS ELB Logs</h4></a>
  <p>Learn how to parse the common fields in AWS ELB logs.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/manage/field-extractions/safend-field-extraction"><img src={useBaseUrl('img/field-extraction-rules/admin.png')} alt="icon" width="40"/><h4>Sample Safend Field Extraction</h4></a>
  <p>Learn how to create Field Extraction Rules for Safend.</p>
  </div>
</div>
</div>
