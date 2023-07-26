---
id: real-time-alert-with-greater-than-results
---

# Real Time Alert with greater than 1,000 results

Scheduled Search alert condition thresholds are based on the number of rows returned in your search results. It does not consider any values that may be present within a column of those rows. If your query does not perform any aggregations the Scheduled Search threshold will apply to the number of raw messages returned with a query, as seen under the Messages tab of the search. If a query contains an aggregate operation, for example, count, sum, min, max, etc... the Scheduled Search threshold will be applied to the number of aggregate rows returned by the query, as seen within the Aggregate tab of the results.   

When performing an aggregation as part of a query, and wanting to alert when a specific aggregate value meets a threshold, the threshold for that field value will need to be included as part of the query itself. This can typically be done by providing a [where](/docs/search/search-query-language/search-operators/where) condition after the aggregation within the query.  For example:

```sql
_sourceCategory=aws/prod
| json "message","logStream","logGroup"
| parse field=message "* * * * * * * * * * * * * *" as version,accountID,interfaceID,src_ip,dest_ip,src_port,dest_port,Protocol,Packets,bytes,StartSample,EndSample,Action,status
| timeslice 1m
| where action="REJECT"
| count as drops by _timeslice
| where drops > 1000
```

This will ensure results are only returned when the field value meets the threshold provided within the query. The threshold set within the Scheduled Search would then be set to alert based on the resulting number of rows that met the threshold set within the query. For example: `Greater than\> 0`

 
