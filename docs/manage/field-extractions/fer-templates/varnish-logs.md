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
| src_ip | The source IP address.  | `101.92.120.16` |
| method | HTTP request method. | GET |
| url | Resource requested by the client.  | `/_includes/wp/blog/wp-content/plugins/us/31063765-bpfull.phpi?&w=50&id=6&random=1331063765` |
| status_code | HTTP response status code. | 304 |
| size | The size of the object returned to the client. | 5201 |
| referrer | The website from which the client reports are referred. | `http://search.yahoo.com/mobile/s?rewrite=72&.tsrc=log&first=1&p=AWS-logs&pintl=en` |
| user_agent  |  Information about the client browser. | Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:23.0) Gecko/20131011 Firefox/23.0 |
