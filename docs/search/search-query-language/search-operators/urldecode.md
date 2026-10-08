---
id: urldecode
title: urldecode Search Operator
sidebar_label: urldecode
description: Use the urldecode operator to decode URL-encoded strings, returning unescaped URLs in readable format.
---

The `urldecode` operator decodes a URL you include in a query, returning the decoded (unescaped) URL string.

For example, a URL that looks like this:

```
http%3A%2F%2Fyourmainserver-city55555.org%2Ffunctions%2Fmain.php%3Fgk%3DGk45MgHJhEYx8bPYvGfiWS7o3KLdfg90%26
```

can be decoded to:

```
http://yourmainserver-city55555.org/functions/main.php?gk=Gk45MgHJhEYx8bPYvGfiWS7o3KLdfg90&
```

## Syntax

`urldecode(<url_field>) [as <field>]`

`urldecode("<url string>") as <field>`

## Examples

### Decode URLs from firewall logs

Let's say you'd like to decode URLs connecting to your firewall. Running a query like:

```sumo
http:
| parse "Connecting to firewall at URL: *" as url
| urldecode(url) as decoded
```

returns results of each URL, both in the encoded and decoded state, allowing you to run additional queries on the parsed, decoded URLs.

### Decode a URL-encoded request path from web server logs

To decode percent-encoded paths captured from access logs:

```sumo
_sourceCategory=Apache/Access
| parse "GET * HTTP" as raw_url
| urldecode(raw_url) as decoded_url
```
