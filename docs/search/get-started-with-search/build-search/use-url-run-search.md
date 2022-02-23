---
id: use-url-to-run-search
---

# Use a URL to Run a Search

You can create a custom URL to launch a log search in Sumo Logic.

## Syntax

```
https:/\<endpoin\>/ui/#/search/create?query\<urlEncodedQuer\>&startTime\<star\>&endTime\<en\>
```

* `<endpoin\>` is your Sumo Logic service endpoint. See [Sumo Logic Endpoints and Firewall Security] (../../../APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security.md) for the endpoint URLs.
* `<urlEncodedQuer\>` is the text of your log search query in URL encoded format.
* `<star\>` is the start of your log query time range, the value can be either:

    * in milliseconds since epoch.
    * a [relative time range
        expression](../Search-Basics/Time-Range-Expressions.md).

* `<en\>` is the end of your log query time range, the value can be either:
    
    * in milliseconds since epoch.
    * a [relative time range expression](../Search-Basics/Time-Range-Expressions.md).  You can omit the \<en\>` value and the current time (`now`) is assumed.

## Example

Create a URL for the following log query, using a relative time range expression of `-10w` to `-1w`.:

```sql
test query | count by _source
```

The custom URL that launches this log query in the Sumo Logic Search page would be similar to the following. The exact URL would depend on your Sumo Logic account endpoint, as listed in [Sumo Logic Endpoints and Firewall Security](../../../APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security.md). 

```
https://service.sumologic.com/ui/#/search/create?query=test-query-%7C-count-by-_source&startTime=-10w&endTime=-1w
```
