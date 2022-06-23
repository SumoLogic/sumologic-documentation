---
id: test
title: Sumo Syntax Test
---


```sumo
_sourceCategory=Labs/Apache/Access
| parse "HTTP/1.1\" * " as status_code
| if(status_code=200, 1, 0) as successes
| if(status_code=404, 1, 0) as client_errors  
| sum(successes) as success_cnt, sum(client_errors) as client_errors_cnt
```

```sumo
_sourceCategory=Labs/Apache/Access and status_code=404
| logcompare timeshift -24h
| where abs(_deltaPercentage) > 25
```


```sumo
_sourceCategory=Labs/Apache/Access status_code=404
| timeslice 1m
| count(status_code) as error_count by _timeslice
| outlier error_count window=10, consecutive=1, threshold=3, direction=+-
```


```sumo
_sourceCategory=Labs/Apache/Access
| parse "* - -" as client_ip
| lookup latitude, longitude from geo://location on ip=client_ip
| count by latitude, longitude
| sort _count
```



```sumo
_sourceCategory=Labs/Apache/Access (status_code=200 or status_code=404)
| timeslice 1m
| if (status_code = "200", 1, 0) as successes
| if (status_code = "404", 1, 0) as fails
| sum(successes) as success_cnt, sum(fails) as fail_cnt by _timeslice
| (fail_cnt/(success_cnt+fail_cnt)) * 100 as failure_rate_pct
| sort _timeslice desc
| outlier failure_rate_pct window=5, threshold=3, consecutive=1, direction=+
```
