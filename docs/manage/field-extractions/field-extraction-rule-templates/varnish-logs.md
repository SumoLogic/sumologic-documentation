---
id: varnish-logs
title: Varnish Logs Extraction Template
description: Parse the common fields in your Varnish Logs using the FER template.
---


**Log Type**: Varnish

**Template Description:** Parsing the common fields in your Varnish log.

**Sample Log:**

```
101.92.120.16 - - [2017-07-13 21:10:59.586 +0000] "GET /_includes/wp/blog/wp-content/plugins/us/31063765-bpfull.phpi?&w=50&id=6&random=1331063765 HTTP/1.1" 304 5201 "http://search.yahoo.com/mobile/s?rew...0logs&pintl=en" "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:23.0) Gecko/20131011 Firefox/23.0"
```

**Parsing Rule:**

```sql
parse regex "^(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| parse regex "(?<method>[A-Z]+)\s(?<url>\S+)\sHTTP/[\d\.]+\"\s(?<status_code>\d+)\s(?<size>[\d-]+)\s\"(?<referrer>.*?)\"\s\"(?<user_agent>.+?)\".*"
```

**Resulting Fields:**

| Field | Description | Example |
|:--|:--|:--|
| src_ip | The IP address of the client (remote host) which made the request to the server | 101.92.120.16 |
| method | The method used by the client | GET |
| url | The resource requested by the client | /_includes/wp/blog/wp-content/plugins/us/31063765-bpfull.phpi?&w=50&id=6&random=1331063765 |
| status_code | The status code that the server sends back to the client | 304 |
| size | The size of the object returned to the client | 5201 |
| referrer | The site that the client reports having been referred from | [http://search.yahoo.com/mobile/s?rew...0logs&pintl=en](http://search.yahoo.com/mobile/s?rewrite=72&.tsrc=log&first=1&p=AWS-logs&pintl=en) |
| user_agent  | The identifying information that the client browser reports about itself | Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:23.0) Gecko/20131011 Firefox/23.0 |
