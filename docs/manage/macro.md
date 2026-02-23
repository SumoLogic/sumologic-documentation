---
id: macro
title: Macros
sidebar_label: Macros
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Macros allow you to reference a predefined set of query language syntax across multiple queries. This enables reuse of commonly used logic, improves consistency, and reduces duplication. Macros can optionally accept arguments. When arguments are provided, the macro evaluates them dynamically and applies the resulting logic within the query.

To use macro in your log query, reference it with backticks (`) as shown below:

```
`<macro name>`
```

Macros can also be nested to enable reuse of complex queries:

* **Nested Macros**. A macro referenced inside another macro.
* **Inner Macro**. A macro used within the context of another macro query.
* **Outer Macro**. The macro that references an inner macro.

:::note
- Only **Administrators** and **Users** with access to **Query Reference** can run queries using macros.
- Only users with **Manage Macro** capability can create macros.
:::

## Add a macro

To create a macro, follow the steps below:

1.  [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Data Management**, and then under **Logs**, select **Macros**. You can also click the **Go To...** menu at the top of the screen and select **Macros**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Logs** > **Macros**. 
1. Click **+ Add Macro**.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-logs-page.png')} alt="macro-logs-page" style={{border: '1px solid gray'}} width="800" />
1. Or, in the log search page, select the part of search query language that needs to be reused and click on **Create Macro**.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-search-page.png')} alt="macro-search-page" style={{border: '1px solid gray'}} width="800" />
1. In the **Create Macro** page, enter the following details: <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/create-macro.png')} alt="create-macro" style={{border: '1px solid gray'}} width="800" />
    1. **Macro Details**. Enter the name for the macro. Description is optional.
    1. **Macro Definition**. Enter the definition for the macro. To add arguments use the `{{Arg}}` syntax or select a part of the definition and click on **Add Argument**.
    1. (Optional) **Arguments**. Enter the name and select the data type for the argument selected.
    1. (Optional) **Argument Validation**. Define the validation condition and enter the error message that needs to be shown when the validation expression returns false.
    1. **Usage**. Preview of how you use the macro in the log search.
    1. Click **Submit** to save the macro.

### Limitations

- You can create a maximum of 600 macros.
- You can add a maximum of 5 arguments.
- You are only allowed to use single expression.
- You can only use the below listed argument validations:
  - `isValidIpV4`
  - `contains`
  - `isNumeric`
  - `isPrivateIP`
  - `isPublicIP`
  - `isValidIP`
  - `isReservedIP`
  - `isValidIPv4`
  - `isValidIPv6`
  - `matches`
- You can only use the below listed rules language functions:
  - `<=`
  - `>=`
  - `==`
  - `!=`
  - `<`
  - `>`

### Example without arguments

Consider the below query, which searches for errors with `timeslice` of 5 minutes. 

```
_sourceCategory=error | timeslice 5m
| count by _timeslice
```

Now, by creating a macro for the `timeslice` field, the query using this macro can be simplified as follows:

```
_sourceCategory=error | `timeslice_macro`
```

### Example with arguments

Consider the below query, which searches for errors with `timeslice` for time of your choice. 

```
_sourceCategory=error | timeslice 5m
| count by _timeslice
```

To create a macro that allows you to enter a value of your choice, we use arguments during the macro creation process. You may choose to include validation conditions within these arguments. If validation conditions are present, make sure to specify the correct data type for `<arg1_value>` to achieve the desired results.

The following is a simplified version of the query that uses the macro with arguments. Replace `<arg1_value>` with the value of your choice.

```
_sourceCategory=error | `timeslice_macro(<arg1_value>)`
```

## View and use the macro

To view any existing macro, follow the steps below:

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Data Management**, and then under **Logs**, select **Macros**. You can also click the **Go To...** menu at the top of the screen and select **Macros**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Logs** > **Macros**. 
1. On the **Macros** page, click on any of the macros that you want to view the macro details.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/view-macro-logs-page.png')} alt="macro-logs-page" style={{border: '1px solid gray'}} width="800" />
1. To use the selected macro in your log search query, copy the suggested **Usage** of the macro. <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/view-macro-logs-details.png')} alt="view-macro-logs-details" style={{border: '1px solid gray'}} width="400" />
1. On the Log Search page, enter your query and add the copied macro directly into the query syntax. Alternatively, you can type **`** to open the macro suggestions dropdown and select the desired macro to insert into your query. <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-in-line-suggestions.png')} alt="macro-in-line-suggestions" style={{border: '1px solid gray'}} width="800" />
    :::info
    You can hover over the pasted macro to view and verify the macro name, definition, and usage details before use.
    :::

## Macro recommendations

Macro recommendations are automatically generated based on the most frequently run queries within your organization. By converting these recommended queries into macros, you can streamline repetitive tasks and improve overall efficiency.

:::note
Users with the **View Macro** capability can only view macro recommendations. To accept (**+ Add Macro**) or reject a recommendation, you must have the **Manage Macro** capability.
:::

Follow the below steps to view the macro recommendations:

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Data Management**, and then under **Logs**, select **Macros**. You can also click the **Go To...** menu at the top of the screen and select **Macros**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Logs** > **Macros**. 
1. Click on the <img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-recommendations-button.png')} alt="macro-recommendations-button"  width="30" /> button to open the **Macro Recommendation** page. This page displays recommendations based on most frequently run queries in your org. <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-recommendations.png')} alt="macro-recommendations" style={{border: '1px solid gray'}} width="600" />
    1. Click **Reject** to remove a macro recommendation from the list.
    1. Click **+ Add Macro** to accept the macro recommendation. You will be redirected to **Create Macro** page, where you can follow the instruction in the [Add a macro](/docs/manage/macro#add-a-macro) section to complete the macro creation process.

## Edit a macro

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Data Management**, and then under **Logs**, select **Macros**. You can also click the **Go To...** menu at the top of the screen and select **Macros**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Logs** > **Macros**. 
1. On the **Macros** page, click on any of the macros that you want to edit.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/view-macro-logs-page.png')} alt="macro-logs-page" style={{border: '1px solid gray'}} width="800" />
1. Click **Edit** button to open the pane for editing. <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-edit-button.png')} alt="macro-delete-pop-up" style={{border: '1px solid gray'}} width="400" />
1. In the **Edit [macroname] macro** pop-up, click on **Continue**. You can also check where your macros have been used to avoid broken queries by clicking on **check queries that reference this macro**. <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-edit-pop-up.png')} alt="macro-delete-pop-up" style={{border: '1px solid gray'}} width="400" />
1. In the macro editing pane, perform the required editing and click **Submit**.

## Delete a macro

1. [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Data Management**, and then under **Logs**, select **Macros**. You can also click the **Go To...** menu at the top of the screen and select **Macros**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Logs** > **Macros**. 
1. On the **Macros** page, click on any of the macros that you want to delete.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/view-macro-logs-page.png')} alt="macro-logs-page" style={{border: '1px solid gray'}} width="800" />
1. Click **Delete** button to delete the macro. <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-delete-button.png')} alt="macro-delete-button" style={{border: '1px solid gray'}} width="400" />
1. In the **Delete [macroname] macro** pop-up, click on **Delete**. You can also check where your macros have been used to avoid broken queries by clicking on **check queries that reference this macro**. <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-delete-pop-up.png')} alt="macro-delete-pop-up" style={{border: '1px solid gray'}} width="400" />
