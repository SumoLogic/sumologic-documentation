---
id: fields
title: fields Search Operator
sidebar_label: fields
---

The `fields` operator allows you to specify which fields to display and their order in the results of a query. Use a fields operator to reduce the "clutter" of a search output that contains fields that aren't completely relevant to your query.

There are two fields operator modes:

* Allowlist - only the fields included are kept in the search output.
* Denylist - all the fields except those you specify to be excluded are in the search output.

To specify the [order of returned fields](#ordering-fields) you must use the fields operator last, at the end of your query.

:::note
Fields are not returned in the specified order in Search Job API and Webhook results.
:::

## Allowlist

For allowlist mode, only fields you specify for inclusion are kept in the search output. For example, to strip out every field except for method and status_code, your query would be:

```sql
_sourceCategory=Apache/Access
| parse " \"* " as method
| parse "\" * " as status_code
| fields method, status_code
```

The search results would look like this:  

![Fields](/img/search/searchquerylanguage/search-operators/Fields.png)

Allowlist queries allow all system internal fields (fields prefixed with an underscore "_") to pass.

## Denylist

For denylist mode, all fields except for those you explicitly *remove* remain in the search output. Denylist mode is indicated with a minus sign "-" in a query. For example, to only remove the log_level, module, and process_id fields, your query would be:

```sql
_sourceCategory=*apache*
| fields - log_level, module, process_id
```

Denylist queries will also remove internal fields (fields prefixed with an underscore "_") when specified. For example:

```sql
_sourceCategory=*apache*
| count by size
| fields - _count
```

Make sure that your query does not repeat or duplicate individual fields, or your search query will fail. 

## Non-aggregate vs. Aggregate Query Results

The fields displayed in query results are different for non-aggregate and aggregate queries.

By default, all non-aggregate query results, which appear in the **Messages** tab, include the # (results list number), Time, and Message field, along with any other fields you have allowlisted in your query.

Aggregate query results, which appear in the **Aggregates** tab, include only the fields that you have specified in your query.

For example, for this non-aggregate query:

```sql
_sourceCategory=Apache/Access
| parse " \"* " as method
| parse "\" * " as status_code
| fields method, status_code
```

The search results would look like this:

![Fields_nonaggregate](/img/search/searchquerylanguage/search-operators/Fields_nonaggr.png)

While the same query with an added *count by* statement to make it an aggregate query:

```sql
_sourceCategory=Apache/Access
| parse " \"* " as method
| parse "\" * " as status_code
| count by method, status_code
| fields status_code, method
```

This would provide the following results:

![](/img/reuse/query-search/fields_operator_aggregate.png)

## Use a Field Name that Contains Spaces or Special Characters

The Sumo Logic search language allows `a-zA-Z\` as valid characters for identifiers for fields. In cases where a field name contains other characters you need to escape the field name by using the `%` character and wrapping the field name in double quotes. 

Syntax: `%"field_name"`

Here's an example:

```sql
| "Robot" as %"learning robot .33."
```

This creates a field named "learning robot .33." with the value "Robot".

## Ordering fields

By default, the fields in non-aggregated results are ordered alphabetically. You can specify a different order by using the fields operator.

For example, if you used:

```sql
| fields status_code, method
```

Sumo displays the **status_code** field first, then the **method** field second.

In an aggregate result, field and column order follows the requested order of the query.

For example, if you used:

```sql
| count by status_code, method
```

Sumo displays the **status_code** field first, and the **method** field second.
