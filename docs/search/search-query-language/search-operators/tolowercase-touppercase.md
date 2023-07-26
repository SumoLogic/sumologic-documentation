---
id: tolowercase-touppercase
title: toLowerCase, toUpperCase Search Operators
sidebar_label: toLowerCase, toUpperCase
---

The `toLowerCase` operator takes a string and converts it to all lower case letters. The `toUpperCase` operator takes a string and converts it to all uppercase letters.

These operators can be useful for normalizing source logs with inconsistent capitalization, such as Windows Event logs, or changing file names and paths for files systems that require all lower case letters. They are especially useful for queries that include conditionals and grouping, in order to reduce the number of groups in the search results.

:::tip
**toLowerCase** and **toUpperCase** are useful when you use the following equating conditions with Sumo operators: the equal to sign (`=`) and the not equal to sign (!`=`) sign. These conditions are case-sensitive in Sumo Logic. [Learn more](#using-tolowercaseor-touppercase-with-an-equating-condition).
:::

## Syntax

```sql
toLowerCase(<string>) [as <field>]
```

```sql
toUpperCase(<string>) [as <field>]
```

## Rules

* Non-string fields are not accepted.

## Examples

### Using toUpperCase with a conditional operator

Use the following query to return all the `_sourceHost` matches in upper case letters.

```sql
_sourceCategory=service OR _sourceCategory=search
| toUpperCase(_sourceHost) as _sourceHost
| where _sourceHost matches "NITE*"
```

which provides results like:

![](/img/reuse/query-search/toUpperCase.png)

### Using toLowerCase or toUpperCase with an equating condition

**toLowerCase** and **toUpperCase** are useful when you use the equal to sign (`=`) or the not equal to sign (`!=`) with Sumo operators. These conditions are case-sensitive in Sumo Logic. The following example uses **toLowerCase** to convert the hash value to lower case before performing the lookup. 

```sql
*
| limit 1
| toLowerCase ("B101CD29E18A515753409AE86CE68A4CEDBE0D640D385EB24B9BBB69CF8186AE") as hash
| count hash
| fields -_count
| lookup raw from sumo://threat/cs on threat = hash{code}
```

### Using toUpperCase with the count operator

This query also returns all matching `_sourceHost` values in upper case letters, using the count operator.

```sql
_sourceCategory=service OR _sourceCategory=search
| toUpperCase(_sourceHost) as _sourceHost
| count by _sourceHost
```

which produces results like:

![](/img/reuse/query-search/toUpperCase_count.png)

### Find a user name and convert it to lowercase

This query will search a Source Category for a user name and convert it to lowercase, no matter how the name has been input.

```sql
_sourceCategory=OS/Linux/Security
| parse "user=* " as username
| toLowerCase(username) as username
| where username matches "*joe smith*"
```
