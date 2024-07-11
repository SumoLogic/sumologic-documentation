---
id: parse-nodrop-option
title: Parse nodrop option
---


The `nodrop` option forces results to also include messages that do not match any segment of the parse expression.

For all parse operators, messages must match at least one segment of the parse expression or they are dropped from the results. Adding the `nodrop` option forces results to also include messages that do not match any segment of the parse expression.

When your query has multiple parse expressions, using `nodrop` acts as an **OR** condition. In this case, using `nodrop` will pass any non-matching logs to the next parse expression. If the following parse expression does not use `nodrop`, the results from the first parse expression using `nodrop`, even when they do not match the following parse expression are still returned in your search results.

## Syntax

* `| parse "a=*," as <field> nodrop`  

    In this case, messages that match **a** as well as all other messages are returned.  
     
* `| parse "a=*," as <field1> nodrop | parse "b=*," as <field2>`  

    In this case, messages that match either **a** or **b** are output. Everything else is dropped.  
     
* `| parse "a=*," as <field1> | parse "b=*," as <field2>`  

    In this case, both parse operators are implicitly dropping
    non-matching messages. This means only messages that match both
    **a** and **b** are output.  
     
* `| parse "a=*," as <field1> nodrop | parse "b=*," as <field2> nodrop | parse "c=*," as <field3> nodrop | parse "d=*," as <field4>`  

    In this case, messages that match (**a** or **b** or **c** or **d**) are output. Everything else is dropped.

## Rules

* Messages with zero matches are included in the output but do not contain any alias fields or tags related to the parse expression.
* Using the `nodrop` option, you can express advanced boolean logic in choosing your desired message output when you chain the Parse operators.
* The `nodrop` option is not supported with the csv, split, parseDate, or parseHex operators.

## Examples

### Use the nodrop option with a parser

Queries can use the `nodrop` option with a parser:

```sql
_sourceCategory=Apache* 
| parse "[sessionId=*]" as sessionid nodrop
```

### Use the nodrop option with parse regex

You can parse out an IP address using parse regex and parse nodrop:

```sql
_sourceCategory=Apache* 
| parse regex "(?<src_ip>\d{1,3}\.\d{1,3}.\d{1,3}\.\d{1,3})" nodrop
```

### Use parse nodrop as an OR condition

When specifying `nodrop` in one parse expression but not another the search will return logs that match **either** the first **OR** second parse statements. For example, you can return logs that match either `GET` or `POST` in a URL:

```sql
_sourceCategory=Apache*
| parse "GET * HTTP" as url nodrop 
| parse "POST * HTTP" as url
```
