---
id: apache-access-logs
title: Apache Access Logs
description: Parse the common fields in your Apache Access Logs using the FER template.
---


**Log Type**: Apache Access Logs

**Template Description**: Parsing the common fields in your Apache Access log.

**Sample Log**:

```
221.125.19.252 - - [2017-07-13 17:59:50.697 +0000] "GET /_js/master.js HTTP/1.1" 200 8825 "http://www.google.com/url?sa=t&rct=j...ource=web&cd=4" "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Chrome/19.0.1084.30 Safari/536.5"
```

**Parsing Rule**:

```
parse regex "^(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| parse regex "(?<method>[A-Z]+)\s(?<url>\S+)\sHTTP/[\d\.]+\"\s(?<status_code>\d+)\s(?<size>[\d-]+)\s\"(?<referrer>.*?)\"\s\"(?<user_agent>.+?)\".*"
```

**Resulting Fields**:

| Field | Description | Example |
|:--|:--|:--|
| src_ip | IP address of the client (remote host) which made the request to the server | 221.125.19.252 |
| method | Method used by the client | GET |
| url | Resource requested by the client | `v` |
| status_code | Status code that the server sends back to the client | 200 |
| size | Size of the object returned to the client | 8825 |
| referrer | Site that the client reports having been referred from | [http://www.google.com/url?sa=t&rct=j...ource=web&cd=4](http://www.google.com/url?sa=t&rct=j&q=log-reduce&source=web&cd=4) |
| user_agent  | Identifying information that the client browser reports about itself | Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Chrome/19.0.1084.30 Safari/536.5 |
