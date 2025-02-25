---
id: log-operators
title: Log Operators Cheat Sheet
sidebar_label: Log Operators
description: The Search Operators cheat sheet provides a list of available Sumo Logic parsers, aggregators, search operators, and mathematical expressions with links to full details for each item.
---

The Log Operators cheat sheet provides a list of available parsers, aggregators, search operators, and mathematical expressions with links to full details for each item. For a complete list of Sumo Logic Search operators, download the <a href="/files/search-operators-cheat-sheet.pdf" target="_blank">PDF version</a>.

The following tables provide a list of available Sumo Logic parsers, aggregators, search operators, and mathematical expressions.  

## Parsing

Sumo provides a number of ways to [parse](/docs/search/search-query-language/parse-operators) fields in your log messages.

<table>
  <tr>
   <td><strong>Operator</strong></td>
   <td><strong>Description</strong></td>
   <td><strong>Example</strong></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/parse-operators/parse-predictable-patterns-using-an-anchor">parse (anchor)</a></td>
   <td>The parse operator, also called parse anchor, parses strings according to specified start and stop anchors, and then labels them as fields for use in subsequent aggregation functions in the query such as sorting, grouping, or other functions.</td>
   <td><code>| parse "User=*:" as user</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/parse-operators/parse-variable-patterns-using-regex">parse regex</a></td>
   <td>The parse regex operator (also called the extract operator) enables users comfortable with regular expression syntax to extract more complex data from log lines. Parse regex can be used, for example, to extract nested fields.</td>
   <td><code>| parse regex field=url "[0-9A-Za-z-]+\.(?&lt;domain>[A-Za-z-]+\.(?:co\.uk|com|com\.au))/.*"</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/parse-operators/parse-keyvalue-formatted-logs">keyvalue</a></td>
   <td>Typically, log files contain information that follow a key-value pair structure. The keyvalue operator allows you to get values from a log message by specifying the key paired with each value.</td>
   <td><code>| keyvalue infer "module", "thread"</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/parse-operators/parse-csv-formatted-logs">csv</a></td>
   <td>The csv operator allows you to parse Comma Separated Values (CSV) formatted log entries. It uses a comma as the default delimiter.csv operator allows you to parse Comma Separated Values (CSV) formatted log entries. It uses a comma as the default delimiter.</td>
   <td><code>| csv_raw extract 1 as user, 2 as id, 3 as name</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/parse-operators/parse-json-formatted-logs">JSON</a></td>
   <td>The JSON operator is a search query language operator that allows you to extract values from JSON input. Because JSON supports both nested keys and arrays that contain ordered sequences of values, the Sumo Logic JSON operator allows you to extract single top-level fields, multiple fields, nested keys, and keys in arrays.</td>
   <td><code>| parse "explainJsonPlan] *" as jsonobject <br/>| json field=jsonobject "sessionId"<br/>| json auto</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/parse-operators/parse-delimited-logs-using-split">split</a></td>
   <td>The split operator allows you to split strings into multiple strings, and parse delimited log entries, such as space-delimited formats.</td>
   <td>Full query example:<br/><code>_sourceCategory=colon<br/>| parse "] * *" as log_level, text<br/>| split text delim=':' extract 1 as user, 2 as account_id, 3 as session_id, 4 as result</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/parse-operators/parse-xml-formatted-logs">xml</a></td>
   <td>The XML operator uses a subset of the XPath 1.0 specification to provide a way for you to parse fields from XML documents. Using it, you can specify what to extract from an XML document using an XPath reference.</td>
   <td><code>| parse xml "/af/minimum/@requested_bytes"</code></td>
  </tr>
</table>

## Aggregating

[Aggregating functions](/docs/search/search-query-language/group-aggregate-operators) evaluate messages and place them into groups. The group operator is used in
conjunction with group-by functions. When using any grouping function, the word by is sufficient for representing the group operator.

:::note
An aggregation function cannot take another function (such as a math function). For example, you cannot use:

```sql
... | avg(x + y) as average
```

Instead, use separate steps:  

```sql
... | x + y as z | avg(z) as average
```
:::

<table>
  <tr>
   <td><strong>Operator</strong></td>
   <td><strong>Description</strong></td>
   <td><strong>Default Alias</strong></td>
   <td><strong>Restrictions</strong></td>
   <td><strong>Example</strong></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/avg">avg</a></td>
   <td>The averaging function (avg) calculates the average value of the numerical field being evaluated within the time range analyzed.</td>
   <td>_avg</td>
   <td></td>
   <td><code>| avg(request_received) by _timeslice</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/count-count-distinct-and-count-frequent">count, count_distinct, and count_frequent</a></td>
   <td>Aggregating (group-by) functions are used in conjunction with the group operator and a field name. Only the word by is required to represent the group operator. The count function is also an operator in its own right and therefore can be used with or without the word by.</td>
   <td>_count<br/>_count_distinct<br/>_approxcount</td>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/count-count-distinct-and-count-frequent">count_frequent</a> can return up to 100 results when used in dashboard panels.</td>
   <td>Example 1:<br/>
   <code>| count by url<br/></code> <br/>
   Example 2:<br/>
   <code>| count_distinct(referrer) by status_code</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/first-last">first and last</a></td>
   <td>First finds the earliest occurrence in search results, and last finds the result that follows all others, based on the sort order for the query.</td>
   <td>_first<br/>_last</td>
   <td>Not supported in auto refresh dashboards or any continuous query.</td>
   <td><code>| sort by _timeslice<br/>| first(error_message) by hostname</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/median/">median</a></td>
   <td>Use the median function to find the median value in a set of values.</td>
   <td>_&lt;field>_pct_50</td>
   <td></td>
   <td>
   Example 1:<br/><code>* | parse "data=*" as data<br/>| pct(data, 50) as median</code><br/>Example 2:<br/><code>| parse "Len: *" as seconds<br/>| pct(seconds,50) as median</code><br/>
   </td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/min-max">min and max</a></td>
   <td>Use the min and max functions to find the smallest or largest value in a set of values.</td>
   <td>_min<br/>_max</td>
   <td></td>
   <td><code>| max(request_received) by hour</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/most-recent-least-recent">most_recent and least_recent</a></td>
   <td>The most_recent and least_recent operators, used with the withtime operator, allow you to order data from newest to oldest.</td>
   <td>_most_recent<br/>_least_recent</td>
   <td></td>
   <td><code>*ip* OR *address*<br/>| parse regex "(?&lt;IP>\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" <br/>| lookup latitude, longitude, country_code from geo://location on ip=IP <br/>| where !isNull(country_code) <br/>| withtime IP <br/>| most_recent(ip_withtime) by country_code </code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/pct-percentile">pct</a></td>
   <td>The percentile function (pct) finds the percentile of a given field. Multiple pct functions can be included in one query.</td>
   <td>_&lt;fieldname>_pct_&lt;percentile></td>
   <td></td>
   <td><code>| parse "value=*" as value<br/>| pct(value, 95) as value_95pct</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/stddev">stddev</a></td>
   <td>The standard deviation function (stddev) finds the standard deviation value for a distribution of numerical values within the time range analyzed and associated with a group designated by the "group by" field.</td>
   <td>_stddev</td>
   <td></td>
   <td><code>... | stddev(request_received) group by hour | sort by _stddev</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/sum">sum</a></td>
   <td>Sum adds the values of the numerical field being evaluated within the time range analyzed.</td>
   <td>_sum</td>
   <td></td>
   <td><code>... | sum(bytes_received) group by hostname</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/values">values</a></td>
   <td>The value operator provides all the distinct values of a field enabling you to identify and group data by other fields of interest.</td>
   <td>_values</td>
   <td></td>
   <td><code>... | sum(bytes_received) group by hostname</code></td>
  </tr>
</table>

## Search Operators

This section provides detailed syntax, rules, and examples for Sumo Logic Operators, Expressions, and Search Language.

<table>
  <tr>
   <td><strong>Operator</strong></td>
   <td><strong>Description</strong></td>
   <td><strong>Default Alias</strong></td>
   <td><strong>Restrictions</strong></td>
   <td><strong>Example</strong></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/accum">accum</a></td>
   <td>The accum operator calculates the cumulative sum of a field. It can be used to find a count by a specific time interval, and can be used to find a total running count across all intervals.</td>
   <td>_accum</td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>_sourceCategory=IIS (Wyatt OR Luke)<br/>| parse "[user=*]" as cs_username<br/>| timeslice by 1m<br/>| count as requests by _timeslice,cs_username<br/>| sort by _timeslice asc,cs_username<br/>| accum requests as running_total</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/as/">as</a></td>
   <td>The as operator is typically used in conjunction with other operators, but it can also be used alone to rename fields or to create new constant fields.</td>
   <td>_as</td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>| parse "* - - " as ip_addr<br/>| ip_addr as src_ip</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/asn-lookup">asn lookup</a></td>
   <td>Sumo Logic can lookup an Autonomous System Number (ASN) and organization name by an IP address. Any IP addresses that do not have an ASN will return null values.</td>
   <td></td>
   <td></td>
<td><code>_sourceCategory=stream "remote_ip="<br/>| parse regex "(?&lt;ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"<br/>| lookup organization, asn from asn://default on ip = ip</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/backshift">backshift</a></td>
   <td>The backshift operator compares values as they change over time. Backshift can be used with rollingstd, smooth, or any other operators whose results could be affected by spikes of data (where a spike could possibly throw off future results).</td>
   <td>_backshift</td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>_sourcecategory=katta <br/>| timeslice by 1m <br/>| count by _timeslice,_sourcehost <br/>| sort + _timeslice <br/>| backshift _count,1 by _sourcehost</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/base64decode">base64Decode</a></td>
   <td>The base64Decode operator takes a base64 string and converts it to an ASCII string.</td>
   <td></td>
   <td></td>
   <td><code>| base64Decode("aHR0cDovL2NvZGVjLmFwYWNoZS5vcmcvY29tbW1vbnM=") as V</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/base64encode">base64Encode</a></td>
   <td>The base64Encode operator takes an ASCII string and converts it to a base64 string.</td>
   <td></td>
   <td></td>
   <td><code>| base64Encode("hello world") as base64</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/bin">bin</a></td>
   <td>Use the bin operator to sort results in a histogram.</td>
   <td>_bin_label<br/>_bin_lower<br/>_bin_upper</td>
   <td></td>
   <td><code>_sourceCategory=analytics<br/>| parse "ms: *" as time<br/>| bin time width=10, min = 0, max = 500<br/>| count by _bin, _bin_upper<br/>| sort by _bin_upper</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/cat/">cat</a></td>
   <td>The cat operator to used to view the contents of a lookup table.</td>
   <td>_cat</td>
   <td>Not supported in auto refresh dashboards or scheduled searches.</td>
   <td><code>cat path://"/Library/Users/myusername@sumologic.com/Suspicious Users"</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/cidr">CIDR</a></td>
   <td>The CIDR operator allows you to leverage Classless Inter-Domain Routing (CIDS) notations to analyze IP network traffic in order to narrow analysis to specific subnets. CIDR notations specify the routing prefix of IP addresses.</td>
   <td></td>
   <td></td>
   <td><code>(denied OR rejected AND _sourcecategory=firewall <br/>| parse "ip=*," as ip_address<br/>| where compareCIDRPrefix("10.10.1.32", ip_address, toInt(27)) <br/>| count by ip_address</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/compare/">compare</a></td>
   <td>The compare operator is used with the [Time Compare](/docs/search/time-compare/) button in the Sumo interface, which automatically generates the appropriate syntax and adds it to your aggregate query.</td>
   <td>_compare</td>
   <td>If you want to use `timeslice` with `compare`, do not alias `timeslice`.</td>
   <td><code>_sourceHost = prod<br/>| timeslice by 1m<br/>| count by _timeslice<br/>| compare timeshift 10m 5</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/concat">concat</a></td>
   <td>The Concat operator allows you to concatenate or join multiple strings, numbers, and fields into a single user-defined field. It concatenates strings end-to-end and joins them into a new string that you define.</td>
   <td></td>
   <td>Not supported in Dashboards.</td>
   <td><code>... | concat(octet1, ".", octet2, ".",octet3, ".",octet4) as ip_address</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/contains">contains</a></td>
   <td>The contains operator compares string values of two <a href="/docs/search/search-query-language/search-operators/contains">parsed</a> fields and returns a boolean result based on whether the second field's value exists in the first.</td>
   <td></td>
   <td></td>
   <td><code>... | contains("hello world", "hello") as containing</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/dectohex">decToHex</a></td>
   <td>The decToHex operator converts a long value of 16 or fewer digits to a hexadecimal string using Two's Complement for negative values.</td>
   <td></td>
   <td></td>
   <td><code>... | decToHex("4919") as V</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/dedup/">dedup</a></td>
   <td>The dedup operator removes duplicate results. You have the option to remove consecutively and by specific fields.</td>
   <td>_dedup</td>
   <td></td>
   <td>Example 1:<br/><code>| dedup by country</code><br/>Example 2:<br/><code>| dedup 1 by service</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/diff">diff</a></td>
   <td>The diff operator calculates the rate of change in a field between consecutive rows. To produce results, diff requires that a specified field contain numeric data; any non-numerical values are removed from the search results.</td>
   <td>_diff</td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>* | parse "bytes transmitted: '*'" as bytes<br/>| timeslice 1m<br/>| sum(bytes) as bytes by _timeslice<br/>| sort _timeslice<br/>| diff bytes as diff_bytes</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/fields">fields</a></td>
   <td>The fields operator allows you to choose which fields are displayed in the results of a query. Use a fields operator to reduce the "clutter" of a search output that contains fields that aren't completely relevant to your query.</td>
   <td></td>
   <td></td>
   <td><code>_sourceCategory=access_logs <br/>| parse "[status=*]" as status_code <br/>| fields method, status_code</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/fillmissing">fillmissing</a></td>
   <td>When you run a standard <a href="/docs/search/search-query-language/group-aggregate-operators">group-by</a> query, Sumo Logic only returns non-empty groups in the results. For example, if you are grouping by timeslice, then only the timeslices that have data are returned.<br/>This operator allows you to specify groups to present in the output, even if those groups have no data.</td>
   <td></td>
   <td>Not supported in Auto Refresh Dashboards or any continuous query.</td>
   <td><code>error<br/>| count by _sourceCategory<br/>| fillmissing values("backend", "database", "webapp") in _sourceCategory</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/filter">filter</a></td>
   <td>The filter operator can filter the output of a search using the results of a different search based on the filtering criteria of a subquery. The filter operator keeps only the records that match the filter criteria, allowing you to restrict search results to the most relevant information.</td>
   <td></td>
   <td>The operator can process up to 100,000 data points for a single query. It automatically drops the data points that exceed the limit and issues a warning.</td>
   <td><code>_sourceCategory=HttpServers<br/>| timeslice 1m<br/>| count by _timeslice, _sourceHost<br/>| filter _sourcehost in (outlier _count by _sourceHost | where _count_violation > 0)<br/>| transpose row _timeslice column _sourcehost</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/format">format</a></td>
   <td>The format operator allows you to format and combine data from fields in message logs—including numbers, strings, and dates—into a single user-defined string. This allows data in message logs, such as dates or currency amounts, to be formatted as human readable, when otherwise it would be hard to decipher.</td>
   <td></td>
   <td></td>
   <td><code>error <br/>| parse "fiveMinuteRate=*," as rate <br/>| format("%s : %s","Five Minute Rate is" , rate) as formattedVal</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/formatdate">formatDate</a></td>
   <td>The formatDate operator allows you to format dates in log files as a string in the format you require, such as US date formatting, European formatting, timestamps, etc.</td>
   <td></td>
   <td></td>
   <td><code>* | formatDate(now(), "YYYY-MM-dd") as today</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/geo-lookup-map">geo lookup</a></td>
   <td>Sumo Logic can match a parsed IPv4 or IPv6 address to its geographical location on a map. To create the map the lookup operator matches parsed IP addresses to their physical location based on the latitude and longitude of where the addresses originated.</td>
   <td>latitude<br/>longitude<br/>_count<br/>continent<br/>country_code<br/>country_name<br/>region<br/>city<br/>state<br/>postal_code<br/>connection_type<br/>country_cf<br/>state_cf<br/>city_cf</td>
   <td></td>
   <td><code>| parse "remote_ip=*]" as remote_ip<br/>| lookup latitude, longitude, country_code, country_name, region, city, postal_code from geo://location on ip = remote_ip<br/>| count by latitude, longitude, country_code, country_name, region, city, postal_code<br/>| sort _count</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/formatdate">geoip</a></td>
   <td>The geoip operator is used to match a [parsed](/docs/search/search-query-language/parse-operators/) IPv4 or IPv6 address to its geographical location on a [map chart](/docs/dashboards/panels/map-charts/).</td>
   <td></td>
   <td></td>
   <td><code>| parse "remote_ip=*]" as remote_ip<br/>| geoip remote_ip<br/>| count by latitude, longitude<br/>| sort _count</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/haversine">haversine</a></td>
   <td>The haversine operator returns the distance between latitude and longitude values of two coordinates in kilometers. Coordinates need to be positive or negative values based on being north/south or east/west, instead of using the terms N/S, E/W.</td>
   <td></td>
   <td></td>
   <td><code>| haversine(39.04380, -77.48790, 45.73723, -119.81143) as distanceKMs</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/hextodec">hexToDec</a></td>
   <td>The hexToDec operator converts a hexadecimal string of 16 or fewer characters to long using Two's Complement for negative values.</td>
   <td></td>
   <td></td>
   <td><code>| hexToDec("0000000000001337") as V</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/if">if</a></td>
   <td>There are two forms of ternary expression you can use in Sumo Logic queries: one is constructed using the IF operator, and the other uses the question mark (?) operator. These expressions are used to evaluate a condition as either true or false, with values assigned for each outcome. It is a shorthand way to express an if-else condition.</td>
   <td></td>
   <td></td>
   <td><code>| if(status_code matches "5*", 1, 0) as server_error<br/>Or<br/>| status_code matches "5*" ? 1 : 0 as server_error</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/in">in</a></td>
   <td>The In operator returns a Boolean value: true if the specified property is in the specified object, or false if it is not.</td>
   <td></td>
   <td></td>
   <td><code>| if (status_code in ("500", "501", "502", "503", "504", "505", "506", "401", "402", "403", "404"), "Error", "OK") as status_code_type</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/ipv4tonumber">ipv4ToNumber</a></td>
   <td>The ipv4ToNumber operator allows you to convert an Internet Protocol version 4 (IPv4) IP address from the octet dot-decimal format to a decimal format. This decimal format makes it easier to compare one IP address to another, rather than relying on IP masking.</td>
   <td></td>
   <td></td>
   <td><code>_sourceCategory=service remote_ip<br/>| parse "[remote_ip=*]" as ip<br/>| ipv4ToNumber(ip) as num<br/>| fields ip, num</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/isnull-isempty-isblank">isBlank</a></td>
   <td>The isBlank operator checks to see that a string contains text. Specifically, it checks to see if a character sequence is whitespace, empty ("") ,or null. It takes a single parameter and returns a Boolean value: true if the variable is indeed blank, or false if the variable contains a value other than whitespace, empty, or null.</td>
   <td></td>
   <td></td>
   <td><code>| where isBlank(user)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/isnull-isempty-isblank">isEmpty</a></td>
   <td>The isEmpty operator checks to see that a string contains text. Specifically, it checks to see whether a character sequence is empty ("") or null. It takes a single parameter and return a Boolean value: true if the variable is indeed empty, or false if the variable contains a value other than empty or null.</td>
   <td></td>
   <td></td>
   <td><code>| if(isEmpty(src_ip),1,0) as null_ip_counts</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/isnull-isempty-isblank">isNull</a></td>
   <td>The isNull operator takes a single parameter and returns a Boolean value: True if the variable is indeed null, or false if the variable contains a value other than null.</td>
   <td></td>
   <td></td>
   <td><code>| where isNull(src_ip)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/isnumeric">isNumeric</a></td>
   <td>The isNumeric operator checks whether a string is a valid Java number.</td>
   <td></td>
   <td></td>
   <td><code>| isNumeric(num)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/isprivateip">isPrivateIP</a></td>
   <td>The isPrivateIP operator checks if an IPv4 address is private and returns a boolean.</td>
   <td></td>
   <td></td>
   <td><code>| isPrivateIP(hostip)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/ispublicip">isPublicIP</a></td>
   <td>The isPublicIP operator checks if an IPv4 address is public and returns a boolean.</td>
   <td></td>
   <td></td>
   <td><code>| isPublicIP("10.255.255.255") as isPublic</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/isvalidip">isValidIP</a></td>
   <td>The isValidIP operator checks if the value is a valid IP address. The isValidIPv4 and isValidIPv6 operators check if the value is a valid IPv4 or IPv6 address respectively.</td>
   <td></td>
   <td></td>
   <td><code>| isValidIP("10.255.255.255") as isIP</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/join">join</a></td>
   <td>The join operator combines records of two or more data streams. Results are admitted on-the-fly to allow real time tables to be built. Values common to each table are then delivered as search results.</td>
   <td></td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td>Full query example: <br/>
   <code>("starting stream from" OR "starting search")<br/>| join <br/>(parse "starting stream from *" AS a) AS T1, <br/>(parse "starting search * from parent stream *" AS b, c) AS T2 <br/>on T1.a = T2.c</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/length">length</a></td>
   <td>The length operator returns the number of characters in a string. You can use it in where clauses or to create new fields. It returns 0 if the string is null.</td>
   <td></td>
   <td></td>
   <td><code>| where length(query) &lt;= 20</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/limit">limit</a></td>
   <td>The limit operator reduces the number of raw messages or aggregate results returned. If you simply query for a particular term, for example "error" without using an aggregation operator such as group by, limit will reduce the number of raw messages returned. If you first use group-by or other aggregation operator, the limit operator will reduce the number of grouped results instead.</td>
   <td></td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>| count by _sourceCategory<br/>| sort by _count<br/>| limit 5</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/behavior-insights/logcompare">logcompare</a></td>
   <td>The logcompare operator allows you to compare two sets of logs: baseline (historical) and target (current). To run a LogCompare operation, you can use the <strong>LogCompare</strong> button on the <strong>Messages</strong> tab to generate a properly formatted query.</td>
   <td>_count<br/>_deltaPercentage<br/>_anomalyScore<br/>_isNew</td>
   <td>Not supported in Dashboards.</td>
   <td><code>| logcompare timeshift -24h</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/behavior-insights/logexplain">logexplain</a></td>
   <td>The logexplain operator allows you to compare sets of structured logs based on events you're interested in. Structured logs can be in JSON, CSV, key-value, or any structured format.</td>
   <td>_explanation<br/>_relevance<br/>_test_coverage<br/>_control_coverage</td>
   <td>Not supported with <a href="/docs/alerts/scheduled-searches/create-real-time-alert">Real Time alerts</a>.<br/><a href="/docs/search/time-compare">Time Compare</a> and the <a href="/docs/search/search-query-language/search-operators/compare">compare operator</a> are not supported against LogExplain results.</td>
   <td><code>_sourceCategory=stream <br/>| if(_raw matches "error", 1, 0) as hasError<br/>| logexplain hasError == 1 on _sourceHost</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/behavior-insights/logreduce">logreduce</a></td>
   <td>The LogReduce algorithm uses fuzzy logic to cluster messages together based on string and pattern similarity. Use the <strong>LogReduce</strong> button and operator to quickly assess activity patterns for things like a range of devices or traffic on a website. (Formerly Summarize.)</td>
   <td></td>
   <td>Not supported in Dashboards.</td>
   <td><code>| logreduce</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/behavior-insights/logreduce/logreduce-keys">logreduce keys</a></td>
   <td>The logreduce keys operator allows you to quickly explore JSON or key-value formatted logs by schemas.</td>
   <td>_signature_id<br/>_schema<br/>_count</td>
   <td></td>
   <td><code>_sourcecategory="Labs/AWS/GuardDuty_V8"<br/>| json keys "region", "partition", "resource"<br/>| logreduce keys field=resource</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/behavior-insights/logreduce/logreduce-values">logreduce values</a></td>
   <td>The logreduce values operator allows you to quickly explore structured logs by known keys. Structured logs can be in JSON, CSV, key-value, or any structured format.</td>
   <td>_cluster_id<br/>_signature<br/>_count</td>
   <td>Not supported with <a href="/docs/alerts/scheduled-searches/create-real-time-alert">Real Time alerts</a>.</td>
   <td><code>_sourceCategory= *cloudtrail* errorCode<br/>| json field=_raw "eventSource" as eventSource<br/>| json field=_raw "eventName" as eventName<br/>| json field=_raw "errorCode" as errorCode<br/>| logreduce values on eventSource, eventName, errorCode</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/lookup">lookup</a></td>
   <td>Using a lookup operator, you can map data in your log messages to meaningful information. For example, you could use a lookup operator to map "userID" to a real user's name. Or, you could use a lookup operator to find black-listed IP addresses.</td>
   <td></td>
   <td></td>
   <td><code>| parse "name=*, phone number=*," as (name, phone)<br/>| count by name, phone<br/>//We recommend doing a lookup after an aggregation<br/>| lookup email from https://compay.com/userTable.csv on name=userName, phone=cell</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/luhn">luhn (credit card validator)</a></td>
   <td>The Luhn operator uses Luhn’s algorithm to check message logs for strings of numbers that may be credit card numbers, and then validates them. It takes a string as an input, strips out all characters that are not numerals, and checks if the resulting string is a valid credit card number, returning true or false accordingly.</td>
   <td></td>
   <td></td>
   <td><code>| parse regex "(?&lt;maybecc>\d{4}-\d{4}-\d{4}-\d{4})" nodrop<br/>| parse regex "(?&lt;maybecc>\d{4}\s\d{4}\s\d{4}\s\d{4})" nodrop<br/>| parse regex "(?&lt;maybecc>\d{16})" nodrop<br/>| if (luhn(maybecc), true, false) as valid</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/matches">matches</a></td>
   <td>The matches operator can be used to match a string to a wildcard pattern or an RE2 compliant regex. The return of the operator is Boolean; the operator can be used with <a href="/docs/search/search-query-language/search-operators/where">where</a> or <a href="/docs/search/search-query-language/search-operators/if">if</a> expressions.</td>
   <td></td>
   <td></td>
   <td><code>| if (agent matches "*MSIE*","Internet Explorer","Other") as Browser<br/>| if (agent matches "*Firefox*","Firefox",Browser) as Browser</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/median">median</a></td>
   <td>In order to calculate the median value for a particular field, you can utilize the Percentile (<a href="/docs/search/search-query-language/group-aggregate-operators/pct-percentile">pct</a>) operator with a percentile argument of 50.</td>
   <td></td>
   <td></td>
   <td><code>| parse "value=*" as value<br/>| pct(value, 50) as median</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/transaction-analytics/merge-operator">merge</a></td>
   <td>The merge operator reduces a stream of events to a single event using a specified merge strategy. It is particularly useful as a subquery for the <a href="/docs/search/search-query-language/transaction-analytics/transactionize-operator">Transactionize</a> operator.</td>
   <td></td>
   <td></td>
   <td><code>| parse "BytesSentPersec = \"*\"" as BytesPersec <br/>| merge BytesPersec join with "--", _messageTime takeLast</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/now">now</a></td>
   <td>The now operator returns the current epoch time in milliseconds. It can be used with the <a href="/docs/search/search-query-language/search-operators/formatDate">formatDate</a> operator to get the formatted current time.</td>
   <td></td>
   <td>Can be used in Dashboard Panels, but the <code>now()</code> time presented in Live mode (the time the data is processed) doesn't match the search time, so the results are different.<br/>
   The results for search could be hours or days later than the time presented in Live mode.</td>
   <td><code>| now() as current_date</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/num">num</a></td>
   <td>The num operator converts a field to a number. Using Num in a query is useful for sorting results by number instead of alphabetically, which is the default. You can also use double as the operator, as an alias equivalent, if you prefer.</td>
   <td></td>
   <td></td>
   <td><code>| parse "Execution duration: * s" as duration<br/>| num(duration)<br/>| sort by duration<br/></code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/outlier">outlier</a></td>
   <td>Given a series of time-stamped numerical values, using the outlier operator in a query can identify values in a sequence that seem unexpected, and would identify an alert or violation, for example, for a scheduled search.</td>
   <td>&lt;field>_error<br/>&lt;field>_lower <br/>&lt;field>_upper<br/>&lt;field>_indicator<br/>&lt;field>_violation</td>
   <td></td>
   <td>Full query example:<br/>
<code>_sourceCategory=IIS/Access<br/>| parse regex "\d+-\d+-\d+ \d+:\d+:\d+ (?&lt;server_ip>\S+) (?&lt;method>\S+) (?&lt;cs_uri_stem>/\S+?) \S+ \d+ (?&lt;user>\S+) (?&lt;client_ip>[\.\d]+) "<br/>| parse regex "\d+ \d+ \d+ (?&lt;response_time>\d+)$"<br/>| timeslice 1m <br/>| max(response_time) as response_time by _timeslice<br/>| outlier response_time window=5,threshold=3,consecutive=2,direction=+-</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/parse-operators/parsehex">parseHex</a></td>
   <td>The parseHex operator allows you to convert a hexadecimal string of 16 or fewer characters to a number.</td>
   <td></td>
   <td></td>
   <td><code>| parseHex("12D230") as decimalValue</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/predict">predict</a></td>
   <td>The predict operator uses a series of time stamped numerical values to predict future values. For example, you could use this operator to take your current disk space capacity numbers, and predict when your system might run out of disk space.</td>
   <td>_&lt;agg field><br/>_&lt;agg field>_predicted<br/>_&lt;agg field>_error<br/>_&lt;agg field>_linear</td>
   <td></td>
   <td>Full query example:<br/>
<code>_sourceCategory=taskmanager<br/>| jobState=InQueue<br/>| timeslice 1m<br/>| count by _timeslice<br/>| toDouble(_count)<br/>| predict _count by 1m forecast=5</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/replace">replace</a></td>
   <td>The replace operator allows you to replace all instances of a specified string with another string. You can specify the string to replace with a matching regex or literal text. You might use it to find all instances of a name and change it to a new name or to replace punctuation in a field with different punctuation. This operator is useful anytime you need to rename something.</td>
   <td></td>
   <td></td>
   <td><code>| replace(query, ".","->") as query</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/rollingstd">rollingstd</a></td>
   <td>The rollingstd (rolling standard) operator provides the rolling standard deviation of a field over a defined window. Rollingstd displays this value in a new column named _rollingstd.</td>
   <td>_rollingstd</td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>| rollingstd _count,1 by _sourcehost</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/save">save</a></td>
   <td>Using the Save operator allows you to save the results of a query into the Sumo Logic file system. Later, you can use the lookup operator to access the saved data. The Save operator saves data in a simple format to a location you choose.</td>
   <td></td>
   <td>Not supported in Dashboards.</td>
   <td><code>| save /shared/lookups/daily_users</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/sessionize">sessionize</a></td>
   <td>The sessionize operator allows you to use an extracted value from one log message (generated from one system) to find correlating values in log messages from other systems. After you run Sessionize, these related events are displayed on the same page. The thread of logs woven together is called a session.</td>
   <td></td>
   <td>Not supported in auto refresh dashboards or any continuous query.</td>
   <td>Full query example:<br/><code>(SearchServiceImpl Creating Query) or (Stream SessionId using searchSessionId) or (Started search with sessionId)<br/>| sessionize "session: '*', streamSessionID: '*'" as (serviceSessionId, streamSessionId),<br/>"Stream SessionId=$streamSessionId using searchSessionId=* and rawSessionId=*" as (searchSessionId, rawSessionId),<br/>"Started search with sessionId: $searchSessionId, customerId: *, query: *" as (customerId, query)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/smooth">smooth</a></td>
   <td>The smooth operator calculates the rolling (or moving) average of a field, measuring the average of a value to "smooth" random variation. Smooth operator reveals trends in the data set you include in a query.</td>
   <td>_smooth</td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>| smooth _count,1 by _sourcehost</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/sort">sort</a></td>
   <td>The sort operator orders aggregated search results. The default sort order is descending. Then you can use the <a href="/docs/search/search-query-language/search-operators/top">top</a> or <a href="/docs/search/search-query-language/search-operators/limit">limit</a> operators to reduce the number of sorted results returned.</td>
   <td></td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>| count as page_hits by _sourceHost<br/>| sort by page_hits asc</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/substring">substring</a></td>
   <td>The substring operator allows you to specify an offset that will output only part of a string, referred to as a substring. You can use this operator to output just a part of a string instead of the whole string, for example, if you wanted to output an employee’s initials instead of their whole name.</td>
   <td></td>
   <td></td>
   <td><code>| substring("Hello world!", 6)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/timeslice">timeslice</a></td>
   <td>The timeslice operator segregates data by time period, so you can create bucketed results based on a fixed width in time, for example, five minute periods. Timeslice also supports bucketing by a fixed number of buckets across the search results, for example, 150 buckets over the last 60 minutes. An alias for the timeslice field is optional. When an alias is not provided, a default _timeslice field is created.</td>
   <td>_timeslice</td>
   <td>Timeslices greater than 1 day cannot be used in Dashboard Live mode.</td>
   <td><code>| timeslice 1h<br/>//You can further aggregate your data by these time groupings<br/>| count by _timeslice</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/tolowercase-touppercase">toLowerCase and toUpperCase</a></td>
   <td>As the name implies, the toLowerCase operator takes a string and converts it to all lower case letters. The toUpperCase operator takes a string and converts it to all upper case letters.</td>
   <td></td>
   <td></td>
   <td><code>| toUpperCase(_sourceHost) as _sourceHost <br/>| where _sourceHost matches "*NITE*"</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/topk">topk</a></td>
   <td>Select the top values from fields and group them by other fields.</td>
   <td>_rank</td>
   <td></td>
   <td><code>| topk(5, _count)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/top">top</a></td>
   <td>Use the top operator with the sort operator, to reduce the number of sorted results returned.</td>
   <td></td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>| top 5 _sourcecategory</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/total">total</a></td>
   <td>The total operator calculates the grand total of a field and injects that value into every row. It also supports grouping rows by a set of fields.</td>
   <td>_total</td>
   <td>Can be used in Dashboard Panels, but in the search they must be included after the first <code>group-by</code> phrase.</td>
   <td><code>| total gbytes as total_memory</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/trace">trace</a></td>
   <td>A trace operator acts as a highly sophisticated filter to connect the dots across different log messages. You can use any identifying value with a trace operator (such as a user ID, IP address, session ID, etc.) to retrieve a comprehensive set of activity associated to that original ID.</td>
   <td></td>
   <td>Not supported in Auto Refresh Dashboards or any continuous query.</td>
   <td><code>| trace "ID=( [0-9a-fA-F] {4} )" "7F92"</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/transaction-analytics/transaction-operator">transaction</a></td>
   <td>The transaction operator is used to analyze related sequences of logs. No matter what type of data you're analyzing, from tracking web site sign ups, to e-commerce data, to watching system activity across a distributed system, the transaction operator can be used in a variety of use cases.</td>
   <td>_start_time<br/>_end_time</td>
   <td>Tables generated with unordered data can be added to Dashboards, but Flow Diagrams cannot be added to Dashboards.<br/>Transaction by flow cannot be used with Dashboards.</td>
   <td><code>| transaction on sessionid fringe=10m <br/>with "Starting session *" as init, <br/>with "Initiating countdown *" as countdown_start, <br/>with "Countdown reached *" as countdown_done, <br/>with "Launch *" as launch <br/>results by transaction</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/transaction-analytics/transactionize-operator">transactionize</a></td>
   <td>The transactionize operator groups logs that match on any fields you specify. Unlike other "group by" operators, where the logs in a group must match on all defined fields, transactionize just needs one field to match in order to assign logs to the same group.</td>
   <td>_group<br/>_group_duration<br/>_group_size<br/>_group_orphaned</td>
   <td></td>
   <td><code>| parse "[system=001] [sessionId=*]" as system1Id nodrop <br/>| parse "[system=002][sessionId=*]" as system2Id nodrop <br/>| parse "[system=003][sessionId=*]" as system3Id nodrop <br/>| parse "system=001 with sessionId=*" as system1Id nodrop <br/>| transactionize system1Id, system2Id, system3Id</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/transpose">transpose</a></td>
   <td>The transpose operator dynamically creates columns for aggregate search results. The dynamic functionality allows for changing the output of a query, turning search results into fields. It also means that queries can be designed without first knowing the output schema.</td>
   <td></td>
   <td></td>
   <td>Full query example:<br/>
   <code>_sourceCategory=service <br/>| parse "Successful login for user '*', organization: '*'" as user, org_id <br/>| timeslice 1d <br/>| count _timeslice, user <br/>| transpose row _timeslice column user</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/urldecode">urldecode</a></td>
   <td>The urldecode operator decodes a URL you include in a query, returning the decoded (unescaped) URL string.</td>
   <td></td>
   <td></td>
   <td><code>| urldecode(url) as decoded</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/urlencode">urlencode</a></td>
   <td>The urlencode operator encodes the URL into an ASCII character set.</td>
   <td></td>
   <td></td>
   <td><code>| urlencode(url) as encoded</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/search-operators/where">where</a></td>
   <td>To filter results in a search query, use "where" as a conditional operator. The where operator must appear as a separate operator distinct from other operators, delimited by the pipe symbol ("|"). In other words, the following construct will not work and will generate a syntax error:</td>
   <td></td>
   <td></td>
   <td><code>//We recommend placing inclusive filters before exclusive filters in query strings<br/>| where status_code matches "4*"<br/>| where !(status_code matches "2*")</code></td>
  </tr>
</table>

## Math Expressions

You can use general mathematical expressions on numerical data extracted from log lines. For any mathematical or group-by function that implicitly requires integers, Sumo Logic casts the string data to a number for you.

<table>
  <tr>
   <td><strong>Operator</strong></td>
   <td><strong>Description</strong></td>
   <td><strong>Example</strong></td>
  </tr>
  <tr>
   <td><strong>Basic</strong></td>
   <td></td>
   <td></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/abs">abs</a></td>
   <td>The absolute function calculates the absolute value of x.</td>
   <td><code>| abs(-1.5) as v<br/>// v = 1.5</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/round">round</a></td>
   <td>The round function returns the closest integer to x.</td>
   <td><code>| round((bytes/1024)/1024) as MB</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/ceil">ceil</a></td>
   <td>The ceiling function rounds up to the smallest integer value. Returns the smallest integral value that is not less than x.</td>
   <td><code>| ceil(1.5) as v<br/>// v = 2</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/floor">floor</a></td>
   <td>The floor function rounds down to the largest previous integer value. Returns the largest integer not greater than x.</td>
   <td><code>| floor(1.5) as v<br/>// v = 1</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/min-max">max</a></td>
   <td>The maximum function returns the larger of two values.</td>
   <td><code>| max(1, 2) as v<br/>// v = 2</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/group-aggregate-operators/min-max">min</a></td>
   <td>The minimum function returns the smaller of two values.</td>
   <td><code>| min(1, 2) as v<br/>// v = 1</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/sqrt">sqrt</a></td>
   <td>The square root function returns the square root value of x.</td>
   <td><code>| sqrt(4) as v<br/>// v = 2</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/cbrt">cbrt</a></td>
   <td>The cube root function returns the cube root value of x.</td>
   <td><code>| cbrt(8) as v<br/>// v = 2</code></td>
  </tr>
  <tr>
   <td><strong>Exponents and Logs</strong></td>
   <td></td>
   <td></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/exp">exp</a></td>
   <td>The exponent function returns Euler's number e raised to the power of x.</td>
   <td><code>| exp(1) as v<br/>// v = 2.7182818284590455</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/expm1">expm1</a></td>
   <td>The expm1 function returns value of x in exp(x)-1, compensating for the roundoff in exp(x).</td>
   <td><code>| expm1(0.1) as v<br/>// v = 0.10517091807564763</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/log">log</a></td>
   <td>The logarithm function returns the natural logarithm of x.</td>
   <td><code>| log(2) as v<br/>// v = 0.6931471805599453</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/log10">log10</a></td>
   <td>The log10 function returns the base 10 logarithm of x.</td>
   <td><code>| log10(2) as v<br/>// v = 0.3010299956639812</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/log1p">log1p</a></td>
   <td>The log1p function computes log(1+x) accurately for small values of x.</td>
   <td><code>| log1p(0.1) as v<br/>// v = 0.09531017980432487</code></td>
  </tr>
  <tr>
   <td><strong>Trigonometric</strong></td>
   <td></td>
   <td></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/sin">sin</a></td>
   <td>Sine of argument in radians.</td>
   <td><code>| sin(1) as v<br/>// v = 0.8414709848078965</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/cos">cos</a></td>
   <td>Cosine of argument in radians.</td>
   <td><code>| cos(1) as v<br/>// v = 0.5403023058681398</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/tan">tan</a></td>
   <td>Tangent of argument in radians.</td>
   <td><code>| an(1) as v<br/>// v = 1.5574077246549023</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/asin">asin</a></td>
   <td>Inverse sine; result is in radians.</td>
   <td><code>| asin(1) as v<br/>// v = 1.5707963267948966</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/acos">acos</a></td>
   <td>Inverse cosine; result is in radians.</td>
   <td><code>| acos(x)\ </code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/atan">atan</a></td>
   <td>Inverse tangent; result is in radians.</td>
   <td><code>| atan(x)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/atan2">atan2</a></td>
   <td>Four-quadrant inverse tangent.</td>
   <td><code>| atan2(0, -1) as v<br/>// v = pi</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/sinh">sinh</a></td>
   <td>Hyperbolic sine of argument in radians.</td>
   <td><code>| sinh(x)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/cosh">cosh</a></td>
   <td>Hyperbolic cosine of argument in radians.</td>
   <td><code>| cosh(x)</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/tanh">tanh</a></td>
   <td>Hyperbolic tangent of argument in radians.</td>
   <td><code>| tanh(x)</code></td>
  </tr>
  <tr>
   <td><strong>Advanced</strong></td>
   <td></td>
   <td></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/hypot">hypot</a></td>
   <td>Returns the square root of the sum of an array of squares.</td>
   <td><code>| hypot(1, 0) as v<br/>// v = 1</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/todegrees">toDegrees</a></td>
   <td>Converts angles from radians to degrees.</td>
   <td><code>| toDegrees(asin(1)) as v<br/>// v = 90</code></td>
  </tr>
  <tr>
   <td><a href="/docs/search/search-query-language/math-expressions/toradians">toRadians</a></td>
   <td>Converts angles from degrees to radians.</td>
   <td><code>| toRadians(180) as v<br/>// v = pi</code></td>
  </tr>
</table>
