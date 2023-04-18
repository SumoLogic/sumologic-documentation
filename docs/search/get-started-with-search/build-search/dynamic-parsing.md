---
id: dynamic-parsing
title: Dynamic Parsing
description: Dynamic Parsing allows you to configure automatic parsing of JSON logs.
---



Dynamic Parsing allows automatic field extraction from your JSON log messages when you run a search. This allows you to view fields from JSON logs without having to manually specify parsing logic.

Dynamic Parsing extracts JSON fields when you run a query, at search time (run time). Dynamic Parsing for JSON can be thought of as a Run
Time field extraction rule (FER). By default, your account is given one Run Time FER that encompasses all of your data.

![Default Run Time FER.png](/img/search/get-started-search/build-search/dynamic-parsing/default-runtime-FER.png)

With this FER defined, any search on JSON data will automatically parse out its JSON fields, which you can then use within your search query, exactly like any other field. You have an option on the Search Page that allows you to control Dynamic Parsing. Dynamic Parsing is activated when a search is run in **Auto Parse Mode**, more details about the modes can be found in [using Dynamic Parsing](dynamic-parsing.md).

![auto parse mode option.png](/img/search/get-started-search/build-search/dynamic-parsing/auto-parse-mode-option.png)

## Advantages of using Dynamic Parsing

* Unlike Ingest Time FERs, where fields are persistent even when the FERs are edited or deleted, Run Time FERs and their corresponding parsed fields can be updated or removed at any given time. 
* Dynamic Parsing is helpful when your log schema changes frequently, like if fields are added or removed frequently, which is especially true for custom application logs. Sumo automatically detects the change in your schema and is able to adjust the output accordingly.

## Set up Dynamic Parsing

By default, your account is configured with a Run Time FER that is applied to all of your data. The default Run Time FER named **JSON Auto Parsing - All Sources** can't be edited or deleted. With this FER configured, you don't have to set up anything to use Dynamic Parsing. However, having one FER applied to all of your data may not be optimal for your needs as it would be applied for every search query (including ones that may not query any JSON logs). Further details can be found in [best practices for designing Rules](/docs/manage/field-extractions/create-field-extraction-rule.md).

To optimize search performance you can manually set up Dynamic Parsing by defining your own Run Time FERs.

Run Time FERs have a scope, exactly like an Ingest Time FER, that defines which searches are applicable to Dynamic Parsing **Auto Parse Mode**. For Dynamic Parsing to work your query needs to have a scope that is defined in a Run Time FER, otherwise **Auto Parse Mode** will
not be applicable.

1. Go to **Manage Data** > **Logs** > **Field Extraction Rules**.
1. Click **+ Add** at top right of the table to create an FER.  

    ![Create Field extraction rule with dynamic parsing.png](/img/search/get-started-search/build-search/dynamic-parsing/create-FER-dynamic-parsing.png)

1. Enter the following options:

    * **Rule Name**. Type a name that makes it easy to identify the rule.

    * **Applied At**. Select **Run Time**.

    * **Scope**. Select **Specific Data** and define the scope of your JSON data. You can define your JSON data source as a [Partition](/docs/manage/partitions-data-tiers) Name(index), sourceCategory, Host Name, Collector Name, or any other [metadata](../search-basics/built-in-metadata.md) that describes your JSON data. Think of the Scope as the first portion of an ad hoc search, before the first pipe ( \| ). You will use the Scope to run a search against the rule. You can't use keywords like “info” or “error” in your scope.

        Always set up JSON auto extraction (Run Time field extraction) on a specific Partition name (recommended) or a particular Source. Failing to do so might cause the auto parsing logic to run on data sources where it is not applicable and will add additional overhead that might deteriorate the performance of your queries.

        :::note Best Practices for setting up Scope

        Below are the recommended approaches to set up Dynamic Parsing of JSON:

        * If you are not using Partitions we recommend using [metadata](../search-basics/built-in-metadata.md) fields like `_sourceCategory`, `_sourceHost` or `_collector` to define the scope.
        * We recommend creating a separate Partition for your JSON dataset and use that Partition as the scope for run time field extraction. For example, let's say you have AWS CloudTrail logs, and they are stored in `_index=cloudtrail` Partition in Sumo. You can create a Run Time FER with the scope `_index=cloudtrail`. Creating a separate Partition and using it as scope for a run time field extraction ensures that auto parsing logic only applies to necessary Partitions.
        :::

1. Review your form inputs and when satisfied click **Save**.

Now that you have at least one Run Time FER created you can start querying your JSON data and the fields inside those JSON payloads will be automatically extracted.

## Use Dynamic Parsing

While the Run Time FERs are set to run automatically, you can selectively choose to apply these to your search queries on the log search query page. To use Dynamic Parsing, click the gear icon to open the **Search Config** menu and toggle **Auto Parse Mode** on.

![auto parse mode option.png](/img/search/get-started-search/build-search/dynamic-parsing/auto-parse-mode-option.png)

The two modes available are:

* **Auto Parse Mode**
    * Parses out all fields detected in your JSON data source, irrespective of whether you are using them in your query or not.
    * Supported in classic dashboards and aggregate scheduled searches. This mode is only applicable when searching JSON data sources that have been properly set up in a Run Time FER.
* **Manual Mode** (when Auto Parse Mode is disabled)
    * Fields will not be parsed out automatically unless defined in an Ingest Time FER. Users have to manually specify further parsing logic.
    * This mode is for advanced users who are interested in the best performance and know how to parse out the fields they need.

## Reference parsed JSON fields

The [field browser]/field-browser) and search results [messages table]) have a few helpful features. 

Field Browser:

* A search input field allows you to search for fields by name.  

    ![field browser search field](/img/search/get-started-search/build-search/dynamic-parsing/field-browser-search-field.png)

* JSON structures are nested with expand and collapse options.  

    ![Field browser expand collapse JSON](/img/search/get-started-search/build-search/dynamic-parsing/field-browser-expand-collapse-JSON.png)

* A copy button is available to the right of each field allowing you to easily copy a field name.  

    ![field browser copy field](/img/search/get-started-search/build-search/dynamic-parsing/field-browser-copy-field.png)

Search results table:

* You can copy field names from JSON structures. After selecting (click and highlight) a JSON key in your results, right click and select **Copy field name**. See [modifying a search from the messages tab](/docs/search/get-started-with-search/search-page/modify-search-from-messages-tab) for details on the other provided options.  

    ![JSON right click copy options.png](/img/search/get-started-search/build-search/dynamic-parsing/JSON-right-click-copy-options.png)  

    Copying a field name using this option will automatically format [field names that have special characters](/docs/search/get-started-with-search/search-basics/reference-field-special-characters). For example, the field name shown in the screenshot is **total time-series**, it would be automatically formatted to **%"total time-series"** to work properly in a search query.  
     
* A copy button is available to the right of each column (field) name allowing you to easily copy a field name.  

    ![copy button messages table](/img/search/get-started-search/build-search/dynamic-parsing/copy-button-messages-table.png)

## Key Rules

1. Run Time FERs are only applied to logs that match the scope of the query. When a search query is run, it is first determined if any of the Run Time FERs match the scope of the query. Those Run Time FERs with a matching scope are applied. Run Time FERs are applied per log line only if the log contains a JSON element.  

    For example, a Run Time FER with the scope: `_sourcecategory = A`

    * The query `_sourcecategory = B` is not applied since the scope does not overlap with the Run Time FER scope.
    * The query `_sourcecategory = A or _sourcecategory = B` is applied, only within the log lines that fall within `_sourcecategory = A`, while the remaining log lines are not parsed by this Run Time FER.

1. If a field does not exist in the schema of the log message, null results are displayed for the field (instead of erroring out).

1. Ingest Time FERs take precedence for field assignments. A Run Time FER will not override a field assignment from an Ingest Time FER.  

    Conflicts between Ingest and Run Time fields are evaluated by each log line in the following ways:

    * If the Ingest Time field has a valid value or is empty, and a Run Time field does not exist, the value from the Ingest Time field is applied.

    * If the Ingest Time field does not exist or is empty and a Run Time field has a valid value or is empty, the value from the Run Time field is applied.

    * If both an Ingest and Run Time field have valid values, the value from the Ingest Time field is applied.

1. Spaces in field names are automatically reformatted to underscores.

## Limitations

The following are limitations around the number of fields:

* Dynamic Parsing extracts up to 100 fields per message. This 100 field count includes all built-in and parsed fields.
* Total fields shown in the field browser consist of all the fields extracted across log lines.
* The [Field Browser]/field-browser) displays the count of the fields as well as the distribution of values of each field. These calculations are done for the first 200 fields that are parsed by a run-time FER.
* Non-aggregate queries in Scheduled Views and Scheduled Searches can't be created in auto parse mode (Dynamic Parsing).
