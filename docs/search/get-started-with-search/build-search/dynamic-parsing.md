---
id: dynamic-parsing
title: Dynamic Parsing (Auto Parse Mode)
description: Dynamic Parsing (Auto Parse Mode) allows you to configure automatic parsing of JSON logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- When Intelliparse goes GA, add a note here and in that doc differentiating it from Auto Parse.
Logs currently have two parsing modes:
Manual mode:
Nothing is automatically parsed
Autoparse mode:
Json blocks within logs are automatically parsed
We’re adding a third mode:
Intelliparse Mode:
Json blocks within logs are automatically parsed
Unstructured logs are parsed via pre-discovered parsers
-->

Dynamic Parsing (Auto Parse Mode) allows automatic field extraction from your JSON log messages when you run a search. This allows you to view fields from JSON logs without having to manually specify parsing logic.

## How Dynamic Parsing works

Dynamic Parsing extracts JSON fields when you run a query, at search time (run time). Dynamic Parsing for JSON can be thought of as a Run Time field extraction rule (FER). By default, your account is given one Run Time FER that encompasses all of your data.

![Default Run Time FER.png](/img/search/get-started-search/build-search/dynamic-parsing/default-runtime-FER.png)

With this FER defined, any search on JSON data will automatically parse out its JSON fields, which you can then use within your search query, exactly like any other field. You have an option on the Search Page that allows you to control Dynamic Parsing. Dynamic Parsing is activated when a search is run in **Auto Parse Mode**.

<img src={useBaseUrl('img/search/get-started-search/build-search/dynamic-parsing/auto-parse-mode-option.png')} alt="auto parse mode option.png" width="500"/>

## Key benefits

* Unlike Ingest Time FERs, where fields are persistent even when the FERs are edited or deleted, Run Time FERs and their corresponding parsed fields can be updated or removed at any given time. 
* Dynamic Parsing is helpful when your log schema changes frequently, like if fields are added or removed frequently, which is especially true for custom application logs. Sumo automatically detects the change in your schema and is able to adjust the output accordingly.


## Enabling Auto Parse Mode in the UI

While the Run Time FERs are set to run automatically, you can selectively choose to apply these to your search queries on the log search query page.

* Parses out all fields detected in your JSON data source, regardless of whether you are using them in your query or not.
* Supported in aggregate scheduled searches. This mode is only applicable when searching JSON data sources that have been properly set up in a Run Time FER.

To use Dynamic Parsing
1. Click the ⚙️ gear icon in the top-right corner.
2. Toggle **Auto Parse Mode** on.

<img src={useBaseUrl('img/search/get-started-search/build-search/dynamic-parsing/auto-parse-mode-option.png')} alt="auto parse mode option.png" width="500"/>

## Setting up Custom Run Time FERs (optional)

By default, your account is configured with a Run Time FER that is applied to all of your data. The default Run Time FER, **JSON Auto Parsing - All Sources**, cannot be edited or deleted. With this FER configured, you do not have to set up anything to use Dynamic Parsing. However, having one FER applied to all of your data may not be optimal for your needs as it would be applied for every search query (including ones that may not query any JSON logs). Further details can be found in [Best Practices for Designing Rules](/docs/manage/field-extractions/create-field-extraction-rule.md).

### Create a Run Time FER

To optimize search performance you can manually set up Dynamic Parsing by defining your own Run Time FERs.

Run Time FERs have a scope, exactly like an Ingest Time FER, that defines which searches are applicable to Dynamic Parsing **Auto Parse Mode**. For Dynamic Parsing to work your query needs to have a scope that is defined in a Run Time FER, otherwise **Auto Parse Mode** will not be applicable.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Field Extraction Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Field Extraction Rules**.  
1. Click **+ Add** at top right of the table to create an FER.<br/>  ![Create Field extraction rule with dynamic parsing.png](/img/search/get-started-search/build-search/dynamic-parsing/create-FER-dynamic-parsing.png)
1. Enter the following options:
   * **Rule Name**. Type a name that makes it easy to identify the rule.
   * **Applied At**. Select **Run Time**.
   * **Scope**. Select **Specific Data** and define the scope of your JSON data. You can define your JSON data source as a [Partition](/docs/manage/partitions) Name(index), sourceCategory, Host Name, Collector Name, or any other [metadata](../search-basics/built-in-metadata.md) that describes your JSON data. Think of the Scope as the first portion of an ad hoc search, before the first pipe (`|`). You will use the Scope to run a search against the rule. You can't use keywords like “info” or “error” in your scope. Always set up JSON auto extraction (Run Time field extraction) on a specific Partition name (recommended) or a particular Source. Failing to do so might cause the auto parsing logic to run on data sources where it is not applicable and will add additional overhead that might deteriorate the performance of your queries.
      :::note Best Practices for setting up Scope
      Below are the recommended approaches to set up Dynamic Parsing of JSON:
      * If you are not using Partitions we recommend using [metadata](../search-basics/built-in-metadata.md) fields like `_sourceCategory`, `_sourceHost` or `_collector` to define the scope.
      * We recommend creating a separate Partition for your JSON dataset and use that Partition as the scope for run time field extraction. For example, let's say you have AWS CloudTrail logs, and they are stored in `_index=cloudtrail` Partition in Sumo. You can create a Run Time FER with the scope `_index=cloudtrail`. Creating a separate Partition and using it as scope for a run time field extraction ensures that auto parsing logic only applies to necessary Partitions.
      :::
1. Review your form inputs and click **Save**.

Now that you have created at least one Run Time FER, you can start querying your JSON data and the fields inside those JSON payloads will be automatically extracted.

## Reference parsed JSON fields

The [field browser](/docs/search/get-started-with-search/search-page/field-browser) and search results ([messages table](/docs/search/get-started-with-search/search-page)) have a few helpful features. Parsed fields are available in:

### Field browser

* A search input field allows you to search for fields by name.<br/>  <img src={useBaseUrl('img/search/get-started-search/build-search/dynamic-parsing/field-browser-search-field.png')} alt="field-browser-search-field.png" width="500"/>
* JSON structures are nested with expand and collapse options.<br/>  ![Field browser expand collapse JSON](/img/search/get-started-search/build-search/dynamic-parsing/field-browser-expand-collapse-JSON.png)
* A copy button is available to the right of each field allowing you to easily copy a field name.<br/>  ![field browser copy field](/img/search/get-started-search/build-search/dynamic-parsing/field-browser-copy-field.png)

### Search results table

* You can copy field names from JSON structures. After selecting (click and highlight) a JSON key in your results, right click and select **Copy field name**. See [modifying a search from the messages tab](/docs/search/get-started-with-search/search-page/modify-search-from-messages-tab) for details on the other provided options. <br/>![JSON right click copy options.png](/img/search/get-started-search/build-search/dynamic-parsing/JSON-right-click-copy-options.png)
   * Copying a field name using this option will automatically format [field names that have special characters](/docs/search/get-started-with-search/search-basics/reference-field-special-characters). For example, the field name shown in the screenshot is **total time-series**, it would be automatically formatted to **%"total time-series"** to work properly in a search query.       
* A copy button is available to the right of each column (field) name allowing you to easily copy a field name. <br/>  ![copy button messages table](/img/search/get-started-search/build-search/dynamic-parsing/copy-button-messages-table.png)

## Rules and behavior

1. **FER Scope Matching**. Run Time FERs are only applied to logs that match the scope of the query. When a search query is run, it is first determined if any of the Run Time FERs match the scope of the query. Those Run Time FERs with a matching scope are applied. Run Time FERs are applied per log line only if the log contains a JSON element.
   * For example, a Run Time FER with the scope: `_sourceCategory = A`
      * The query `_sourceCategory = B` is not applied since the scope does not overlap with the Run Time FER scope.
      * The query `_sourceCategory = A or _sourceCategory = B` is applied, only within the log lines that fall within `_sourceCategory = A`, while the remaining log lines are not parsed by this Run Time FER.
1. **Null Field Handling**. If a field does not exist in the schema of the log message, null results are displayed for the field (instead of erroring out).
    :::note
    When a field contains null values, dynamic parsing attempts to interpret those values and assigns them a string data type. This can create issues if you expect different data types for that field. To resolve the issue, use `field=*` in the source expression to eliminate null values.
    :::
1. **Ingest-Time FER Priority**. Ingest Time FERs take precedence for field assignments. A Run Time FER will not override a field assignment from an Ingest Time FER. Conflicts between Ingest and Run Time fields are evaluated by each log line in the following ways:
    * If the Ingest Time field has a valid value or is empty, and a Run Time field does not exist, the value from the Ingest Time field is applied.
    * If the Ingest Time field does not exist or is empty and a Run Time field has a valid value or is empty, the value from the Run Time field is applied.
    * If both an Ingest and Run Time field have valid values, the value from the Ingest Time field is applied.
1. **Special Character Formatting**. Spaces in field names are automatically reformatted to underscores.

## Using Manual mode

When **Auto Parse Mode** is disabled, you'll be in manual mode, meaning:
* Fields won't be parsed automatically unless defined by an Ingest-Time FER.
* You'll need to add parsing logic manually.
* This mode is best suited for advanced users who want full control and optimized performance.

## Limitations

* Dynamic Parsing extracts up to 100 fields per message. This 100 field count includes all built-in and parsed fields.
* Total fields shown in the field browser consist of all the fields extracted across log lines.
* The [Field Browser](/docs/search/get-started-with-search/search-page/field-browser) displays the count of the fields as well as the distribution of values of each field. These calculations are done for the first 200 fields that are parsed by a run-time FER.
* Not supported in non-aggregate queries in Scheduled Views and Scheduled Searches.
