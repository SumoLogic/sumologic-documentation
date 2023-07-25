---
id: tourl
title: tourl Search Operator
sidebar_label: tourl
---

The `tourl` operator provides you the ability to assign a short name that describes the URL. It is similar to creating a href for the URL with a short name. URLs are generally long and they don't tell you what information is displayed when the URL is opened. A common benefit of using this operator is to provide a description of a URL to display in dashboards.


## Syntax

```sql
tourl(<url_column_name>, <url_short_name_column>) as <field>
```

```sql
tourl(<url_column_name>, <url_short_name_column>, <url_short_name_prefix>, <url_short_name_suffix>) as <field>
```

Where:

* `url_column_name` is the column having the URL to which you want to assign a short name.
* `url_short_name_``column` is the short name for the URL. It can be a static name that you specify, or it can be a variable that uses a value from a column.
* `url_short_name_prefix` (optional) is the prefix, if any, to the short name. Requires suffix.
* `url_short_name_suffix` (optional) is the suffix, if any, to the short name. Requires prefix.

## Rules

* If you choose to specify one optional parameter, you must specify both the optional parameters - prefix and suffix. You should provide an empty string ("") if you don't have a value for one.
* Only fully-formed URLs (for example, `https://google.com`) are supported as values for `url_column_name`.
* For the link to be clickable your query needs to aggregate by the returned field.
* You can only specify a single URL. `tourl` does not support merging multiple outputs into a single field.

#### Tabs

When your URL points to another Sumo Logic feature from your account, such as a Dashboard, Search, Traces, or Collection page, you will have the option to open the link in another Sumo Logic tab or browser tab.

Right-click the link to view the tab-options menu:

![tab menu.png](/img/search/searchquerylanguage/search-operators/tourl-tab-menu.png)

If you don't see the menu it is not a supported link.

* The URL must be from the same host.
* The menu isn't available in full-screen mode. 

## Example

#### Providing a static name as short name

If you’re sharing the Akamai Denials by Host search query in a dashboard with others, you can use the tourl operator to add a href to the URL in the dashboard. You’ll run this query to generate the short name:

```sql
| tourl("https://www.sumologic.net/ui/#section/search/H10KMVHzntXo9PrFAumuFemdU27f2iqU7bA3U7Lq", "Akamai Denials by Host") as AkamaiQuery
| count AkamaiQuery
```

When you add this to a dashboard, you’ll see the short name. When you click the link, it will open the Akamai denials by host search query.

![AkamaiSearchQuery.png](/img/search/searchquerylanguage/search-operators/tourl-AkamaiSearchQuery.png)

#### Using a column for short name, and a prefix

In the dashboard of failed scheduled searches, you can use the tourl operator to display the time when the scheduled searches failed and linking it to the search URL, instead of displaying the URL of the scheduled searches.

You’ll run this query to generate the short name:

```sql
_index=sumologic_audit class=scheduled_search action=FINISH status=FAILURE
| where _sourceCategory="scheduled_search"
| KV "SchTime", "Url"
| tourl(Url, SchTime,"Scheduled search failed at: ","") as urlfailed
| count by urlfailed
```

Notice the query uses the value `"Scheduled search failed at: "` as the value for the prefix optional parameter, and an empty string ("") for the suffix parameter.

The query result will be:

![tourlResult.png](/img/search/searchquerylanguage/search-operators/tourlResult.png)

When you add the result to a dashboard, you’ll see the short name. When you click the link, it will take you to the scheduled search query.

![toUrlDashboard.png](/img/search/searchquerylanguage/search-operators/toUrlDashboard.png)
