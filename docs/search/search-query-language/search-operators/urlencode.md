---
id: urlencode
title: urlencode Search Operator
sidebar_label: urlencode
---

The `urlencode` operator encodes the URL into an ASCII character set. This is the standard format in which URLs can be sent over the internet.

For example, if your URL looks like this:

```
http://yourmainserver-city55555.org/functions/main.php?gk=Gk45MgHJhEYx8bPYvGfiWS7o3KLdfg90&
```

It will be encoded to:

```
http%3A%2F%2Fyourmainserver-city55555.org%2Ffunctions%2Fmain.php%3Fgk%3DGk45MgHJhEYx8bPYvGfiWS7o3KLdfg90%26
```

## Syntax

```sql
urlencode(<url_field>) [as <field>]
```

```sql
urlencode("<url string>") as <field>
```

## Example

To encode a URL in your PagerDuty logs, you can run this query:

```sql
_sourceCategory=pagerduty
| kv "html_url" as url
| urlencode(url) as url
```

The query returns the field `url` encoded:

![urlencode.png](/img/search/searchquerylanguage/search-operators/urlencode.png)
