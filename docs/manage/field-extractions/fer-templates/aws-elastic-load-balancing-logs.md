---
id: aws-elastic-load-balancing-logs
title: AWS Elastic Load Balancing Logs
description: Parse the common fields in your AWS Elastic Load Balancing Logs using the FER template.
---



**Log Type**: AWS Elastic Load Balancing

**Template Description:** Parsing the common fields in your AWS Elastic
Load Balancing log.

**Sample Log:**

```
2017-08-10T18:25:56 stag-www-lb 137.190.87.41:52888 10.168.203.134:23667 0.000803 0.048702 0.002085 200 200 2836 1169667 "POST https://dinihou.bounceme.net:443/api...7F6F78E33C7C00 HTTP/1.1" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2" DHE-RSA-DES-CBC3-SHA SSLv3.0
```

**Parsing Rule:**

```sql
parse "* * *:* *:* * * * * * * * \"* *://*:*/* HTTP" as datetime, ELB_Server, clientIP, port, backend, backend_port, requestProc, ba_Response, cli_Response, ELB_StatusCode, be_StatusCode, rcvd, send, method, protocol, domain, server_port, path
```

**Resulting Fields:**

| Field | Description | Example |
|:--|:--|:--|
| datetime | Time when the load balancer received the request from the client | 2017-08-10T18:25:56 |
| ELB_Server | Name of the load balancer | stag-www-lb |
| clientIP | IP address of the requesting client | 137.190.87.41 |
| port | Port of the requesting client | 52888 |
| backend | IP address of the registered instance that processed this request | 10.168.203.134 |
| backend_port | Port of the registered instance that processed this request | 23667 |
| requestProc | [HTTP listener] The total time elapsed, in seconds, from the time the load balancer received the request until the time it sent it to a registered instance.<br/>[TCP listener] The total time elapsed, in seconds, from the time the load balancer accepted a TCP/SSL connection from a client to the time the load balancer sends the first byte of data to a registered instance | 0.000803 |
| ba_Response | [HTTP listener] The total time elapsed, in seconds, from the time the load balancer sent the request to a registered instance until the instance started to send the response headers.<br/>[TCP listener] The total time elapsed, in seconds, for the load balancer to successfully establish a connection to a registered instance | 0.048702 |
| cli_Response | [HTTP listener] The total time elapsed (in seconds) from the time the load balancer received the response header from the registered instance until it started to send the response to the client. This includes both the queuing time at the load balancer and the connection acquisition time from the load balancer to the back end.<br/>[TCP listener] The total time elapsed, in seconds, from the time the load balancer received the first byte from the registered instance until it started to send the response to the client | 0.002085 |
| ELB_StatusCode | The status code of the response from the load balancer | 200 |
| be_StatusCode | The status code of the response from the registered instance | 200 |
| rcvd | The size of the request, in bytes, received from the client | 2836 |
| send | The size of the response, in bytes, sent to the client | 1169667 |
| method | The request method from the client | POST |
| protocol | The request protocol from the client | https |
| domain | The request domain from the client | dinihou.bounceme.net |
| server_port | The request server port from the client | 443 |
| path | The request path from the client | api/v1/search/jobs/597F6F78E33C7C00 |
