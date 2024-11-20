---
id: nginx-logs
title: Nginx Logs
description: Parse the common fields in your Nginx Logs using the FER template.
---



**Log Type**:  Nginx Access Logs

**Template Description**: Parsing the common fields in your Nginx Access log.

**Sample Log**:

```
205.197.2.175 - - [22/Aug/2017:17:43:56 +0000] www.sumologic.com "GET /wp-content/uploads/Screen-Shot-2017-04-13-at-7.12.35-PM-231x300.png HTTP/1.1" 304 0 "https://www.sumologic.com/aws/elb/aw...s-application/" "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:54.0) Gecko/20100101 Firefox/54.0" 0.000
```

**Parsing Rule**:

```sql
parse regex "^(?<src_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| parse regex "(?<method>[A-Z]+)\s(?<url>\S+)\sHTTP/[\d\.]+\"\s(?<status_code>\d+)\s(?<size>[\d-]+)\s\"(?<referrer>.*?)\"\s\"(?<user_agent>.+?)\".*"
```

**Resulting Fields:**

| Field | Description | Example |
|:--|:--|:--|
| src_ip | The source IP address. | `205.197.2.175` |
| method | HTTP request method. | GET |
| url | Resource requested by the client. | `/wp-content/uploads/Screen-Shot-2017-04-13-at-7.12.35-PM-231x300.png` |
| status_code | HTTP response status code. | 304 |
|  size | The size of the object returned to the client. | 0 |
|  referrer | The website from which the client reports are referred. | `https://www.sumologic.com/aws/elb/aws-elastic-load-balancers-classic-vs-application` |
|  user_agent | Information about the client browser. | Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:54.0) Gecko/20100101 Firefox/54.0 |
