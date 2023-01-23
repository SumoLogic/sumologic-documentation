---
id: akamai-cloud-monitor
title: Akamai Cloud Monitor
description: Parse the common fields in your Akamai Cloud Monitor log using the FER template.
---


**Log Types**: Akamai Cloud Monitor

**Template Description**: Parsing the common fields in your Akamai Cloud Monitor log.

**Sample Log**:

```json
{  
   "type":"cloud_monitor",
   "format":"default",
   "version":"1.0",
   "id":"9437c7a786510b6a6234a4a",
   "start":"1379543560.807",
   "cp":"180370",
   "message":{  
      "proto":"http",
      "protoVer":"1.0",
      "status":"200",
      "cliIP":"134.190.235.161",
      "reqPort":"80",
      "reqHost":"www.acmeco.com",
      "reqMethod":"GET",
      "reqPath":"/jobs",
      "respCT":"",
      "respLen":"",
      "bytes":"",
      "UA":"Chrome/35.0.1916.114",
      "fwdHost":""
   },
   "reqHdr":{  
      "accEnc":"gzip",
      "conn":"Keep-Alive"
   },
   "respHdr":{  
      "accRange":"bytes",
      "conn":"keep-alive",
      "contEnc":"gzip",
      "date":"2017-07-13 17:53:38.653 +0000",
      "eTag":"\"\"",
      "lastMod":"Mon,%2023%20Jan%202012%2001:44:17%20GMT",
      "server":"Apache/2.2.14%20(Ubuntu)",
      "cookie":"898051433939"
   },
   "netPerf":{  
      "downloadTime":"19",
      "netOriginLatency":"00",
      "originName":"down",
      "originIP":"",
      "originInitIP":"10.10.10.10",
      "originRetry":"0",
      "lastMileRTT":"46",
      "cacheStatus":"1",
      "firstByte":"1",
      "lastByte":"1",
      "asnum":"4812",
      "edgeIP":""
   },
   "geo":{  
      "country":"us",
      "region":"",
      "city":""
   },
   "waf":{  
      "logVer":""
   },
   "ipRules":"",
   "warnRules":"",
   "denyRules":""
}
```

**Parsing Rule:**

```sql
parse "\"reqMethod\":\"*\"" as method, "\"status\":\"*\"" as status, "\"fwdHost\":\"*\"" as origin
| parse "\"bytes\":\"*\"" as bytes, "\"edgeIP\":\"*\"" as edgeip, "\"country\":\"*\"" as country, "\"cookie\":\"*\"" as cookie
```

**Resulting Fields:**

| Field | Description | Example |
|:-----------|:-----------------|:--------------|
| method    |   | GET |
| status    |   | 200 |
| origin    |   |   |
| bytes     |   |   |
| edgeip    |   |   |
| country   |   | us           |
| cookie    |   | 898051433939 |
