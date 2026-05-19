---
slug: /manage/field-extractions
title: Field Extraction Rules Overview
sidebar_label: Field Extractions
description: Field Extraction Rules in Sumo Logic parse fields from log messages at ingest time, eliminating the need to parse fields in every query and improving search performance.
keywords:
  - field-extraction-rules
  - FER
  - parse log fields
  - log field parsing
  - ingest time parsing
  - extract fields from logs
  - automatic log parsing
  - log search performance
head:
  - tagName: script
    attributes:
      type: application/ld+json
    innerHTML: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Field Extraction Rule in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Field Extraction Rule (FER) parses fields from log messages at the time they are ingested into Sumo Logic. Once a rule is in place, the pre-parsed fields are available for searches, alerts, scheduled searches, and dashboards without needing to parse fields in every query."
            }
          },
          {
            "@type": "Question",
            "name": "How to parse fields from logs automatically in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Create a Field Extraction Rule under Data Management > Logs > Field Extraction Rules. Define a scope to target the relevant log sources and a parse expression to extract the fields. The rule applies to all data ingested after it is created."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between ingest time and run time field extraction in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ingest Time rules parse fields when log data arrives, making those fields available immediately in searches, alerts, and dashboards without any query-level parsing. Run Time rules parse fields during a search query. Ingest Time rules improve search performance but only apply to data ingested after the rule is created."
            }
          },
          {
            "@type": "Question",
            "name": "How many field extraction rules can a Sumo Logic account have?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Accounts can have up to 50 Ingest Time field extraction rules and up to 200 fields total. Enterprise and Enterprise Suite accounts support up to 400 fields. Fields created from log metadata and Ingest Time rules share the same quota."
            }
          },
          {
            "@type": "Question",
            "name": "Do field extraction rules apply to historical log data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Ingest Time field extraction rules only apply to data ingested after the rule is created. To parse historical data, use parse operators in a query or create Scheduled Views to extract fields from data ingested before the rule existed."
            }
          },
          {
            "@type": "Question",
            "name": "What happens when a field extraction rule is deleted in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Deleting a Field Extraction Rule does not delete the fields it was parsing. Any unwanted fields must be deleted separately from the Fields page."
            }
          },
          {
            "@type": "Question",
            "name": "What permissions are needed to create a field extraction rule in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Manage field extraction rules role capability is required to create, edit, or delete field extraction rules."
            }
          }
        ]
      }
---


import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

Field extractions allow you to parse [fields](/docs/manage/fields) from your log messages at the time the messages are ingested, which eliminates the need to parse fields at the query level. With Field Extraction Rules (FERs) in place, users can use the pre-parsed fields for ad hoc searches, scheduled searches, real-time alerts, and dashboards. In addition, field extraction rules help standardize field names and searches, simplify the search syntax and scope definition, and improve search performance. 

:::note
The **Manage field extraction rules** [role capability](/docs/manage/users-roles/roles/role-capabilities/) is required to create, edit, or delete a field extraction rule.
:::

:::info
Fields are extracted from the time you create your FER moving forward. Therefore, set your FERs early on to take advantage of this automatic parsing mechanism. For best practices on naming your fields, see [Field Naming Convention](field-naming-convention.md).
:::

:::training Micro Lesson

<Iframe url="https://fast.wistia.net/embed/iframe/1uxjrbva9m?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Field Extraction Rules Basics Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## How do I access the Field Extraction Rules page?

[**New UI**](/docs/get-started/sumo-logic-ui/). To access the Field Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Field Extraction Rules**.

[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). To access the Field Extraction Rules page, in the main Sumo Logic menu select **Manage Data > Logs > Field Extraction Rules**.

<img src={useBaseUrl('img/field-extraction-rules/fer-page.png')} alt="Fer page" style={{border:'1px solid gray'}} width="800"/>

To refine the table results, use the **Add a filter** section located above the table. *AND* logic is applied when filtering between different sections, while *OR* logic is applied when filtering within the same section.
  
:::note
You can see the suggestions only if there are two or more responses for the same column or section.
:::

The Field Extraction Rules page displays the following information: 

* **Status** shows a checkmark in a green circle <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Check in green circle" width="20" /> to indicate if the rule is actively being applied or an exclamation mark in a red circle <img src={useBaseUrl('img/reuse/exclamation-red-circle.png')} alt="Exclamation in red circl" width="20" /> to indicate if the rule is disabled.
* **Rule Name**
* **Applied At** indicates when the field extraction process occurs, either at Ingest or Run time.
* **Scope** 
* **Created** date and time by user
* **Last Modified** date and time by user
* **Fields Capacity** (bottom of table) shows how many fields your account is using, out of the total available for use.

:::info
You can view the fields created in your account and what features are referencing them on the [Fields](/docs/manage/fields) page.
:::

## What are the limits for field extraction rules?

import FerLimit from '../../reuse/fer-limitations.md';

<FerLimit/>

## How do I edit a field extraction rule?

Changes to Field Extraction Rules are implemented immediately.

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Field Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Field Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Field Extraction Rules**. 
1. Find the rule in the table and click it. A window appears on the right of the table, click the **Edit** button.
1. Make changes as needed and click **Save** when done.

## How do I delete a field extraction rule?

Deleting a Field Extraction Rule doesn't delete the fields it was parsing. You can delete any unwanted fields on the [Fields](/docs/manage/fields) page.

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Field Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Field Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Field Extraction Rules**. 
1. Find the rule to delete in the table and click it. A window appears on the right of the table, click the **More Actions** button, and select **Delete**.

## Guide contents

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/manage/field-extractions/field-naming-convention')}><img src={useBaseUrl('img/icons/operations/rules.png')} alt="Rules icon" width="40"/><h4>Field Naming Convention</h4></a>
  <p>Learn about the recommended naming conventions for standard fields in Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/manage/field-extractions/create-field-extraction-rule')}><img src={useBaseUrl('img/icons/operations/rules.png')} alt="Rules icon" width="40"/><h4>Create a Field Extraction Rule</h4></a>
  <p>Learn how to instruct Sumo Logic to parse out fields automatically.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/manage/field-extractions/edit-field-extraction-rules')}><img src={useBaseUrl('img/icons/operations/rules.png')} alt="Rules icon" width="40"/><h4>Edit Field Extraction Rules</h4></a>
  <p>Learn how to change Field Extraction Rules.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/manage/field-extractions/fer-templates')}><img src={useBaseUrl('img/icons/operations/rules.png')} alt="Rules icon" width="40"/><h4>FER Templates</h4></a>
  <p>Learn how to use FER Templates to parse common fields for various applications.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/manage/field-extractions/parse-elb-logs')}><img src={useBaseUrl('img/icons/operations/rules.png')} alt="Rules icon" width="40"/><h4>Parse AWS ELB Logs</h4></a>
  <p>Learn how to parse the common fields in AWS ELB logs.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/manage/field-extractions/safend-field-extraction')}><img src={useBaseUrl('img/icons/operations/rules.png')} alt="Rules icon" width="40"/><h4>Sample Safend Field Extraction</h4></a>
  <p>Learn how to create Field Extraction Rules for Safend.</p>
  </div>
</div>
</div>


## FAQs

### What is a Field Extraction Rule in Sumo Logic?

A Field Extraction Rule (FER) parses fields from log messages at ingestion time. Once in place, the pre-parsed fields are available for searches, alerts, scheduled searches, and dashboards without needing to parse fields in every query.

### How to parse fields from logs automatically in Sumo Logic?

Create a Field Extraction Rule under **Data Management > Logs > Field Extraction Rules**. Define a scope to target the relevant log sources and a parse expression to extract the fields. The rule applies to all data ingested after it is created.

### What is the difference between ingest time and run time field extraction?

Ingest Time rules parse fields when log data arrives, making those fields immediately available in searches and alerts without query-level parsing. Run Time rules parse fields during a search. Ingest Time rules improve performance but only apply to data ingested after the rule is created.

### How many field extraction rules can an account have?

Accounts support up to 50 Ingest Time rules and 200 fields total. Enterprise and Enterprise Suite accounts support up to 400 fields. Fields from log metadata and Ingest Time rules share the same quota.

### Do field extraction rules apply to historical log data?

No. Ingest Time FERs only apply to data ingested after the rule is created. To parse historical data, use parse operators in a query or create Scheduled Views to extract fields from data ingested before the rule existed.

### What happens when a field extraction rule is deleted?

Deleting a rule does not delete the fields it was parsing. Delete any unwanted fields separately from the [Fields](/docs/manage/fields/) page.

### What permissions are needed to create a field extraction rule?

The **Manage field extraction rules** role capability is required to create, edit, or delete field extraction rules.
