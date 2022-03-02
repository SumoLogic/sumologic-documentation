---
id: urlencode
---

# urlencode

The urlencode operator encodes the URL into an ASCII character set. This
is the standard format in which URLs can be sent over the internet.

For example, if your URL looks like this:

`http://yourmainserver-city55555.org/functions/main.php?gk=Gk45MgHJhEYx8bPYvGfiWS7o3KLdfg90&`

It will be encoded to:

`http%3A%2F%2Fyourmainserver-city55555.org%2Ffunctions%2Fmain.php%3Fgk%3DGk45MgHJhEYx8bPYvGfiWS7o3KLdfg90%26`

## Syntax

* `urlencode\<url_fiel\>) [as\<fiel\>]`
* `urlencode(\<url strin\>") as\<fiel\>`

## Example

To encode a URL in your PagerDuty logs, you can run this query:

`_sourceCategory=pagerduty  | kv "html_url" as url | urlencode(url) as url`

The query returns the field `url` encoded:

![urlencode.png](../../static/img/search-query-language/search-operators/urlencode/urlencode.png)
