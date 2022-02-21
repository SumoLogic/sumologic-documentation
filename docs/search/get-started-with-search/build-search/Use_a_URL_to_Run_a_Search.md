---
id: use-a-url-to-run-a-search
---

# Use a URL to Run a Search

You can create a custom URL to launch a log search in Sumo Logic.

#### Syntax

`https:/\<endpoin\>/ui/#/search/create?query\<urlEncodedQuer\>&startTime\<star\>&endTime\<en\>`

-   \<endpoin\>` is your Sumo Logic service endpoint. See [Sumo Logic
    Endpoints and Firewall
    Security](../../../APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security.md "https://help.sumologic.com/APIs/General_API_Information/Sumo_Logic_Endpoints_and_Firewall_Security")
    for the endpoint URLs.
-   \<urlEncodedQuer\>` is the text of your log search query in URL
    encoded format.
-   \<star\>` is the start of your log query time range, the value can
    be either:
    -   in milliseconds since epoch.
    -   a [relative time range
        expression](../Search-Basics/Time-Range-Expressions.md "Time Range Expressions").
-   \<en\>` is the end of your log query time range, the value can be
    either:
    -   in milliseconds since epoch.
    -   a [relative time range
        expression](../Search-Basics/Time-Range-Expressions.md "Time Range Expressions").
        You can omit the \<en\>` value and the current time (`now`) is
        assumed.

#### Example

Let’s create a URL for the following log query:

`test query | count by _source`

Using a relative time range expression of `-10w` to `-1w`.

The custom URL that launches this log query in the Sumo
Logic Search page would be similar to the following. The exact URL would
depend on your Sumo Logic account endpoint, as listed in [Sumo Logic
Endpoints and Firewall
Security](../../../APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security.md "https://help.sumologic.com/APIs/General_API_Information/Sumo_Logic_Endpoints_and_Firewall_Security"). 

    https://service.sumologic.com/ui/#/search/create?query=test%20query%20%7C%20count%20by%20_source&startTime=-10w&endTime=-1w

 
