---
id: create-field-extraction-rule
title: How to Create a Field Extraction Rule in Sumo Logic
sidebar_label: Create a Field Extraction Rule
description: Create a Field Extraction Rule (FER) in Sumo Logic to automatically parse fields from log messages at ingest time making fields available for searches, alerts, and dashboards without query-level parsing.
keywords:
  - Sumo Logic
  - create field extraction rule
  - FER
  - parse log fields at ingest
  - extract fields from logs
  - automatic log parsing
  - ingest time field extraction
  - run time field extraction
  - parse regex logs
  - log field extraction rule
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
            "name": "How to create a field extraction rule in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Go to Data Management > Logs > Field Extraction Rules, click + Add, select the rule type (Ingest Time or Run Time), define the scope to target the relevant log sources, write a parse expression to extract the fields, and click Save."
            }
          },
          {
            "@type": "Question",
            "name": "How to extract a value from a log message using regex in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Create an Ingest Time field extraction rule with a parse expression using the parse regex operator. For example: parse regex \"user=(?<user>\\S+)\" extracts the user field from every matching log message at ingestion time, making it available in all searches and dashboards without repeating the regex in queries."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between Ingest Time and Run Time field extraction in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ingest Time rules parse any log format using manually written expressions and apply to data ingested after the rule is created, providing better search performance. Run Time rules parse JSON data automatically during a search using Dynamic Parsing and have no rule limit. Run Time rules are more flexible but add overhead at query time."
            }
          },
          {
            "@type": "Question",
            "name": "What operators can be used in a field extraction rule parse expression?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ingest Time field extraction rules support the following operators in the parse expression: parse regex, parse anchor, parse nodrop, csv, fields, json, keyvalue, and num. The multi and auto options are not supported."
            }
          },
          {
            "@type": "Question",
            "name": "How to parse multiple fields from a log message in a single field extraction rule?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use a single parse expression with multiple named capture groups or wildcards. For example: parse \"[hostId=*] [module=*] [localUserName=*]\" as hostId, module, localUserName extracts three fields from each matching log message in one rule."
            }
          },
          {
            "@type": "Question",
            "name": "What are the best practices for designing field extraction rules?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Lock down the scope as tightly as possible to target only the logs that need parsing. Create multiple specific rules rather than one complex rule. Extract only the fields that are actually needed. Test the scope as a search before saving the rule. Avoid using the same field name in multiple rules that target the same messages."
            }
          },
          {
            "@type": "Question",
            "name": "Can field extraction rules be managed with Terraform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Use the sumologic_field_extraction_rule resource in the Sumo Logic Terraform provider to create and manage field extraction rules as code."
            }
          }
        ]
      }
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';
import FerLimit from '../../reuse/fer-limitations.md';

A Field Extraction Rule (FER) automatically parses fields from log messages at ingestion time, making those fields available in searches, alerts, scheduled searches, and dashboards without writing parse expressions in every query.

You can create a field extraction rule of your own from scratch by following the instructions below. We also provide [data-source-specific templates](/docs/manage/field-extractions/fer-templates/index.md) for AWS, Apache, and more.

:::info
The **Manage field extraction rules** [role capability](/docs/manage/users-roles/roles/role-capabilities/) is required to create a field extraction rule.
:::

:::note
Fields specified in field extraction rules are automatically added and enabled in your [Fields](/docs/manage/fields) table schema.
:::

import TerraformLink from '../../reuse/terraform-link.md';

:::tip
You can use Terraform to provide a field extraction rule with the [`sumologic_field_extraction_rule`](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/field_extraction_rule) resource.

<TerraformLink/>
:::

:::training Micro Lesson
<Iframe url="https://fast.wistia.net/embed/iframe/gblp7cpvxs?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Creating a Field Extraction Rule Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>
:::

## How to create a field extraction rule?

To create a Field Extraction Rule:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the Field Extraction Rules page, in the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Field Extraction Rules**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Field Extraction Rules**. 
1. Click the **+ Add** button on the top right of the table.
1. The **Add Field Extraction Rule** form will appear:<br/><img src={useBaseUrl('img/field-extraction-rules/create-fer.png')} alt="Create Field extraction rule with dynamic parsing" style={{border: '1px solid gray'}} width="400" />
1. Enter the following options:
    * **Rule Name**. Type a name that makes it easy to identify the rule.
    * **Applied At**. There are two types available, Ingest Time and Run Time. The main differences are Run Time only supports JSON data and the time that Sumo parses the fields. The following is an overview of the differences:
      * **Ingest Time**
        * Parsing support any data format, requires manually written parser expressions.
        * Rule limit: There is a limit of 50 Field Extraction Rules and 200 fields. This includes the default fields defined by Sumo Logic (about 16). The 200-field limit is per account, and deleting rules does not create more space.
        * Time: At the time of ingestion, only applies to data moving forward. If you want to parse data ingested before the creation of your FER, you can either parse your data in your query, or create Scheduled Views to extract fields for your historical data.
      * **Run Time**
        * Parsing supports JSON automatically.
        * There is no rule limit.
        * Time: During a search when using **Auto Parse Mode** from [Dynamic Parsing](../../search/get-started-with-search/build-search/dynamic-parsing.md).
   * **Scope**. Select either **All Data** or **Specific Data**. When specifying data the options for the scope differ depending on when the rule is applied.
     * For an **Ingest Time** rule, type a [keyword search expression](/docs/search/get-started-with-search/build-search/keyword-search-expressions.md) that points to the subset of logs you'd like to parse. Think of the scope as the first portion of an ad hoc search, before the first pipe (`|`). You'll use the scope to run a search against the rule. Custom metadata fields are not supported here, they have not been indexed to your data yet at this point in collection.
     * For a **Run Time** rule, define the scope of your JSON data. You can define your JSON data source as a [partition](/docs/manage/partitions) Name(index), sourceCategory, Host Name, Collector Name, or any other [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) that describes your JSON data. Think of the scope as the first portion of an ad hoc search, before the first pipe (`|`). You'll use the scope to run a search against the rule. You cannot use keywords like “info” or “error” in your scope.
    :::note
    Always set up JSON auto extraction (Run Time field extraction) on a specific partition name (recommended) or a particular Source. Failing to do so might cause the auto parsing logic to run on data sources where it is not applicable and will add additional overhead that might deteriorate the performance of your queries.
    :::
    :::sumo Best Practices
    If you are not using partitions we recommend using [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) fields like `_sourceCategory`, `_sourceHost` or `_collector` to define the scope.
    We recommend creating a separate partition for your JSON dataset and use that partition as the scope for run time field extraction. For example, let's say you have AWS CloudTrail logs, and they are stored in `_view=cloudtrail` partition in Sumo. You can create a Run Time FER with the scope `_view=cloudtrail`. Creating a separate partition and using it as scope for a run time field extraction ensures that auto parsing logic only applies to necessary partitions.
    :::
   * **Parsed template** (Optional for Ingest Time rules).
     * Click the dropdown under **Parsed template** to see the available templates.
     * Choose a template and click **Use Template**. The template is applied to the Parse Expression.
   * **Parse Expression**. (Applicable to Ingest Time rules)
     * Type a valid parse expression with supported parse and search operators. Because fields are associated with the Rule Name, you can parse one particular field into as many rules as you'd like. For example, to parse a single field, you could use a definition similar to this: `parse "message count = *," as msg_count`. To parse multiple fields, you could use a definition similar to this: `parse "[hostId=*] [module=*] [localUserName=*] [logger=*] [thread=*]" as hostId, module, localUserName, logger, thread`.
1. **Extracted Fields** (applicable to Ingest Time rules) shows the field names the rule will parse. Any fields that do not exist in the Field table schema are shown with the text **New** highlighted in green. New fields are automatically created in the table schema when you save the rule. You can view and manage the field table schema on the [Fields](/docs/manage/fields) page.
1. Click **Save** to create the rule.

## What does a field extraction rule look like in practice?

- **Rule Name:** Fake Log Parse
- **Log Type:** Fake Log
- **Rule Description:** Parse the email, sessionID and action type from a fake log message.
- **Sample Log:**
  ```
  12-12-2012 12:00:00.123 user="test@demo.com" action="delete" sessionID="145623"
  ```
- **Extraction Rule:**
  ```
  parse "user=\"*\" action=\"*\" sessionId=\"*\"" as user, action, sessionid
  ```
- **Resulting Fields:**
  | Field Name | Description | Example |
  |:--|:--|:--|
  | user | User Email Address | `test@email.com` |
  | action | Action performed by the user | Delete |
  | sessionId | Session ID for user action | 145623 |

## What are the best practices for designing field extraction rules?

- **Include the most accurate keywords to identify the subset of data from which you want to extract data.** Lock down the scope as tightly as possible to make sure it's extracting just the data you want, nothing more. Using a broader scope means that Sumo Logic will inspect more data for the fields you'd like to parse, which may mean that fields are extracted when you do not actually need them.

- **Create multiple, specific rules.** Instead of constructing complicated rules, create multiple rules with basic scope, then search on more than one (rules are additive). The OR and AND commands are supported, just as in any search. For example, you could use one rule to parse Apache log response codes, and then use another rule to parse response time. When used together, you can get all of the information you may need.

- **Don't extract fields you do not need.** Extract the minimum number of fields that should all be present in logs. Every field you include in the scope shows up in every search, so including extra fields means you'll see more results than you may need. It's better to create more rules that extract the fields that are most commonly used. First, look at common data sources and see what's most frequently extracted. Then, think about what you most frequently parse from those sources, then create rules to automatically extract those fields.

- **Create multiple parse nodrop statements in an FER for a field name to match distinct log patterns**. The different parse statements will effectively function like an OR statement since only one will match the log message and return the field value.

- **Test the scope before creating the rule.** Make sure that you can extract fields from all messages you need to be returned in search results. Test them by running a potential rule as a search.

- **Make sure all fields appear in the scope you define.** When Field Extraction is applied to data, all fields must be present to have any fields indexed; even if one field isn't found in a message, that message is dropped from the results. In other words, it's all or nothing. For multiple sets of fields that are somewhat independent, make two rules.

- **Reuse field names in multiple FERs if scope is distinct and separate and not matching same messages.** To save space and allow for more FERs within your 200 field limit, you can reuse the field names as long as they are used in non-overlapping FERs. 

- **Avoid targeting the same field name in the same message with multiple FERs.** When more than one FER targets the same message with the same field name, one of the rules will NOT apply. The rule applied to the specific field name is randomly selected. Don't use the same field names in multiple FERs that target the same messages.

## What operators can be used in a parse expression?

The following operators can be used as part of the **Parse Expression** in an Ingest Time Field Extraction Rule.

* `parse regex`
* `parse anchor`
* `parse nodrop`
* `csv`
* `fields`
* `json`
* `keyvalue`
* `num`

:::note
The **multi** and **auto** options are not supported in field extraction rules.
:::

## What are the limits for field extraction rules?

The `parse multi` operator is not supported in FERs.

<FerLimit/>

## FAQs

### How to create a field extraction rule in Sumo Logic?

Navigate to **Data Management > Logs > Field Extraction Rules**, click **+ Add**, select the rule type (Ingest Time or Run Time), define the scope to target the relevant log sources, write a parse expression to extract the fields, and click **Save**.

### How to extract a value from a log message using regex in Sumo Logic?

Create an Ingest Time field extraction rule with a parse expression using `parse regex`. For example: `parse regex "user=(?<user>\\S+)"` extracts the `user` field from every matching log message at ingestion time, making it available in all searches and dashboards without repeating the regex in every query.

### What is the difference between Ingest Time and Run Time field extraction?

Ingest Time rules parse any log format using manually written expressions and apply to data ingested after the rule is created, providing better search performance. Run Time rules parse JSON data automatically during a search using Dynamic Parsing and have no rule limit. Run Time rules are more flexible but add overhead at query time.

### What operators can be used in a field extraction rule parse expression?

Ingest Time field extraction rules support: `parse regex`, `parse anchor`, `parse nodrop`, `csv`, `fields`, `json`, `keyvalue`, and `num`. The `multi` and `auto` options are not supported.

### How to parse multiple fields from a log message in a single rule?

Use a single parse expression with multiple wildcards or named capture groups. For example: `parse "[hostId=*] [module=*] [localUserName=*]" as hostId, module, localUserName` extracts three fields from each matching log message in one rule.

### What are the best practices for designing field extraction rules?

Lock down the scope to target only the logs that need parsing. Create multiple specific rules rather than one complex rule. Extract only fields that are actually needed. Test the scope as a search before saving the rule. Avoid reusing the same field name in multiple rules that target the same messages.

### Can field extraction rules be managed with Terraform?

Yes. Use the `sumologic_field_extraction_rule` resource in the Sumo Logic Terraform provider to create and manage field extraction rules as code. See
[Use Terraform with Sumo Logic](/docs/api/about-apis/terraform-with-sumo-logic/).
