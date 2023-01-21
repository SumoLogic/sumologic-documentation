---
id: length
title: length Search Operator
sidebar_label: length
---

The `length` operator returns the number of characters in a string. You can use it in where clauses or to create new fields.

For example, you'd use the Length operator in free text fields where content is arbitrary to find cases where the field has a substantial amount of text using **length() > minimum** in a query. Or in a case where a long length would be abnormal, you can find these strings quickly using **length() > 10000** in a query.

## Syntax

```sql
length(<field>) [as <field>]
```

## Rules

* If the string is null, it returns 0.
* The length operator only works on string fields.

## Examples

### Find only short queries

Use the following query to find queries under 20 characters.

```sql
_sourceCategory=apache error
| parse "query: *," as query
| where length(query) <= 20
```

### Count by the length of the query

Use this query to count results by the length of the query.

```sql
_sourceCategory=apache error
| parse "query: *," as query
| length(query) as query_length
| count by query_length
| sort by _count desc
```
