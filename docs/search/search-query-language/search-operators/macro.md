---
id: macro
title: macro Operator (Beta)
sidebar_label: macro
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

The `macro` operator provides a means for you to reference set of query language syntax using a macro keyword across multiple queries. Additionally, if required you can include arguments and performs its respective evaluation of the arguments to this operator.


To use the `macro` operator, reference it in your query with backticks (``). Macros can also be nested, enabling complex query reuse:
* **Nested Macros**. A macro referenced inside another macro.
* **Inner Macro**. A macro used within the context of another macro query.
* **Outer Macro**. The macro that references an inner macro.

:::note
- Only **Administrators** and **Users** with access to **Query Reference** can run queries using macros.
- Only users with **Manage Macro** capability can create macros.
:::

## Syntax

```
`<macro name>`
```

## Add a macro

To create a macro, follow the steps below:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Logs** > **Macros**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu, select **Manage Data**, and then under **Logs**, select **Macros**. You can also click the **Go To...** menu at the top of the screen and select **Macros**.
1. Click **+ Add Macro**.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-logs-page.png')} alt="macro-logs-page" style={{border: '1px solid gray'}} width="800" />
1. Or, in the log search page, select the part of search query language that needs to be reused and click on **Create Macro**.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-search-page.png')} alt="macro-search-page" style={{border: '1px solid gray'}} width="800" />
1. **Macro Details**. Enter the name for the macro. Description is optional.
1. **Macro Definition**. Enter the definition for the macro. To add arguments use the `{{Arg}}` syntax or select a part of the definition and click on **Add Argument**.
1. (Optional) **Arguments**. Enter the name and select the data type for the argument selected.
1. (Optional) **Argument Validation**. Define the validation condition and enter the error message that needs to be shown when the validation expression returns false.
1. **Usage**. Preview of how you use the macro in the log search.
1. Click **Submit** to save the macro.

### Limitations

- You can create a maximum of 50 macros.
- You can add a maximum of 5 arguments.
- You cannot edit or delete the macro. Submit a customer request to Sumo Logic if you still need to edit or delete a macro.
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

Now, by creating a macro for the `timeslice` field, the query using the macro operator can be simplified as follows:

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

The following is a simplified version of the query that uses the macro operator with arguments. Replace `<arg1_value>` with the value of your choice.

```
_sourceCategory=error | `timeslice_macro(<arg1_value>)`
```

## View and use the macro operator

To view any existing macro, follow the steps below:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Logs** > **Macros**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu, select **Manage Data**, and then under **Logs**, select **Macros**. You can also click the **Go To...** menu at the top of the screen and select **Macros**.
1. In the **Macros** page, click on any of the macros that you want to view the macro details.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/view-macro-logs-page.png')} alt="macro-logs-page" style={{border: '1px solid gray'}} width="800" />
1. To use the selected macro in your log search query, copy the suggested **Usage** of the macro and include it in your query syntax. <br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/view-macro-logs-details.png')} alt="view-macro-logs-details" style={{border: '1px solid gray'}} width="400" />
