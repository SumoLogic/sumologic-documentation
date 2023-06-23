---
id: use-url-to-run-search
title: Use a URL to Run a Search
description: You can create a custom URL to launch a log search in Sumo Logic.
---

You can create a custom URL to launch a log search in Sumo Logic.

## Syntax

```
https://<endpoint>/ui/#/search/create?query=<urlEncodedQuery>&startTime=<start>&endTime=<end>
```

* `<endpoint>` is your Sumo Logic service endpoint. See [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for the endpoint URLs.
* `<urlEncodedQuery>` is the text of your log search query in URL encoded format.
* `<start>` is the start of your log query time range, the value can be either:

    * in milliseconds since epoch.
    * a [relative time range
        expression](../search-basics/time-range-expressions.md).

* `<end>` is the end of your log query time range, the value can be either:

    * in milliseconds since epoch.
    * a [relative time range expression](../search-basics/time-range-expressions.md).  You can omit the `<end>` value and the current time (`now`) is assumed.

## Example

Create a URL for the following log query, using a relative time range expression of `-10w` to `-1w`.:

```sql
test query | count by _source
```

The custom URL that launches this log query in the Sumo Logic Search page would be similar to the following. The exact URL would depend on your Sumo Logic account endpoint, as listed in [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security). 

```
https://service.sumologic.com/ui/#/search/create?query=test%20query%20%7C%20count%20by%20_source&startTime=-10w&endTime=-1w
```
