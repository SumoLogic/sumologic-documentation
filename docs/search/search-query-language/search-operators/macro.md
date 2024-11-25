---
id: macro
title: macro Operator
sidebar_label: macro
---
import useBaseUrl from '@docusaurus/useBaseUrl';

The `macro` operator allows you to reuse portions of a search query across multiple queries. Additionally, this operator includes arguments and performs its respective evaluation of the arguments.

Use backquote (``) character to refer macro operator in the query. Macros referred inside another macro is called **Nested macros**. Macro referred within the context of another macro query of is called **Inner Macro**. The macro where the inner macro is referred is called the **Outer Macro**.

:::note
- Only **Administrators** and **Users** with access to **Query Reference** will be able to run queries using macros.
- Only users with **Administrator** access can create or delete the macro. 
:::

## Syntax

```
`<macro name>`
```

## Add a macro

To create a macro follow the steps below:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data** > **Logs** > **Macros**. <br/> [**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu, select **Manage Date**, and then under **Logs**, select **Macros**. You can also click the **Go To...** menu at the top of the screen and select **Macros**.
1. Click **+ Add Macro**.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-logs-page.png')} alt="macro-logs-page" style={{border: '1px solid gray'}} width="800" />
1. Or, in the log search page, select the part of search query language that needs to be reused and click on **Create Macro**.<br/><img src={useBaseUrl('img/search/searchquerylanguage/search-operators/macro-search-page.png')} alt="macro-search-page" style={{border: '1px solid gray'}} width="800" />
1. **Macro Details**. Enter the name for the macro. Description is optional.
1. **Macro Definition**. Enter the definition for the macro. To add arguments use the `{{Arg}}` syntax or select a part of the definition and click on **Add Argument**.
1. (Optional)**Arguments**. Enter the name and select the data type for the argument selected.
1. (Optional)**Argument Validation**. Define the validation condition and enter the error message that needs to be shown when the validation expression returns false.
1. **Usage**. Preview of how you use the macro in the log search.
1. Click **Submit** to save the macro.

### Limitations

- You can create a maximum of 50 macros.
- You can add a maximum of 5 definitions.

### Example

Consider the below query that search for the errors with timeslice of 5 minutes. 

```
_sourceCategory=error | timeslice 5m
| count by _timeslice
```

Now by creating macro for the timeslice field, the query with the `macro` operator is modified as:

```
_sourceCategory=error | `timeslice_macro`
```