---
id: apache-tomcat-access-log-fer
title: Sample Apache Tomcat 7 Access Log Field Extraction Rule
description: Create a field extraction rule for Apache Tomcat 7 Access Logs.
---

**Rule Name:** Tomcat Access Log  

**Log Type:** Apache Tomcat 7 Access Log  

**Rule Description:** Parse the Remote IP address, Method, Requested URL path, HTTP status code, Time Taken, and Bytes Sent.

**Sample Log:**

```
192.100.20.135 - - [07/Oct/2014:22:44:16 +0000] "GET /ServiceAPI/mappings/123456/load HTTP/1.1" 200 1414 6234
```

**Extraction Rule:**

```sql
| parse regex "(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}? )" 
| parse regex "\"(?<method>\D{1,7}? )" | parse regex "\"\D{1,7} (?<url>\S{1,2048}? )" | parse regex "\" (?<status>\d{3}? )" | parse regex "\" \d{3} (?<time_taken>\d{1,}? )" 
| parse regex "\" \d{3} \d{1,} (?<bytes_sent>\d{1,}?)"
```

**Resulting Fields:**

| Field Name | Description | Example |
|:--|:--|:--|
| ip | The client IP address.  | 192.100.20.135 |
| method | HTTP request method.  | GET |
| url | Resource requested by the client. | `/ServiceAPI/mappings/123456/load` |
| status | HTTP response status code.  | 200 |
| time_taken | Time taken to process the request. | 1414 |
| bytes_sent | Count of bytes sent. | 6234 |


