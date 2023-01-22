---
id: apache-tomcat-access-logs
title: Apache Tomcat Access Logs
description: Parse the common fields in your Apache Tomcat Access Logs using the FER template.
---



**Log Type**: Apache Tomcat Access

**Template Description**: Parsing the common fields in your Apache
Tomcat Access log.

**Sample Log**:

```
250.67.103.48 228.249.208.87 - - [2017-08-15 17:31:33.786 +0000] "POST /blog/index.php HTTP/1.1" 200 3280 468
```

**Parsing Rule**:

```sql
parse regex "(?<ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}? )"
| parse regex "\"(?<method>\D{1,7}? )"
| parse regex "\"\D{1,7} (?<url>\S{1,2048}? )"
| parse regex "\" (?<status>\d{3}? )"
| parse regex "\" \d{3} (?<time_taken>\d{1,}? )"
| parse regex "\" \d{3} \d{1,} (?<bytes_sent>\d{1,}?)"
```

**Resulting Fields:**

| Field | Description | Example |
|:--|:--|:--|
| ip         | The Client IP                                        | 250.67.103.48   |
| method     | Request method                                       | POST            |
| url        | Resource requested by the client                     | /blog/index.php |
| status     | Status code that the server sends back to the client | 200             |
| time_taken | Time taken to process the request                    | 3280            |
| bytes_sent | Bytes sent count                                     | 4               |
