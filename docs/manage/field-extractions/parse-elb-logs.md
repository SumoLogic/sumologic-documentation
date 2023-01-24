---
id: parse-elb-logs
title: Parse AWS ELB Logs
description: Parse the common fields in AWS ELB logs.
---


**Log Type:** ELB Log (Elastic Load Balancing)  

**Rule Description:** Parsing the common fields in your AWS ELB log

**Sample Log:**

```
2014-10-08T00:20:2#Z #189.164.112.148:24586 10.191.52.76:6081 # # # 200 200 0 922 "GET http://api.somecompany.com:80/v1/gif...=1412721449926 HTTP/1.1"
```

**Parsing Rule:**

```
parse "* * *:* *:* * * * * * * * \"* *://*:*/* HTTP" as datetime, ELB_Server, clientIP, port, backend, backend_port, requestProc, ba_Response, cli_Response, ELB_StatusCode, be_StatusCode, rcvd, send, method, protocol, domain, server_port, path
```

:::note
There can be slight differences between your ELB log and the example here if your configuration uses a TCP listener (layer 4) rather than HTTP.  In the former, the TCP requests will be logged and in this scenario you will see that the URL has three dashes and there are no values for the HTTP status codes.
:::

**Resulting Fields:**

|  Field |  Description |  Example |
|:--|:--|:--|
| datetime | Time (UTC) that the response was sent back to client. Uses ISO 8601 format. | 2014-10-08T00:20:223Z |
| clientip | IP address of the requesting client. | 192.168.154.128 |
| port | Port of the requesting client. | 24986 |
| backend | IP address of the registered instance that processed this request. | 192.168.154.128 |
| backend_port | Port of the registered instance that processed this request. |  6081 |
| requestProc | Total time elapsed (in seconds) from the time the load balancer receives the request and sends the request to a registered instance. |  0.00003 |
| ba_Response | Total time elapsed (in seconds) from the time the load balancer sends the request to a registered instance and the instance begins sending the response  headers. |  0.0784 |
| cli_Response | Total time elapsed (in seconds) from the time the load balancer receives the response header from the registered instance and starts sending the  response to the client. This processing time includes both queuing time at the load balancer and the connection acquisition time from the load balancer to  the backend. |  0.00003 |
|  ELB_StatusCode | Status code of the response from the load balancer (HTTP only). |  200 |
|  be_StatusCode  | Status code of the response from the registered instance (HTTP only). |  200 |
|  rcvd | Size of the request (bytes) received from the client (requester). For HTTP requests, the bytes received account for the request body and do not include  headers. For TCP, the bytes include the headers. |  0 |
|  send | Size of the response (bytes) sent back to the client (requester). For HTTP responses, the bytes sent account for the response body and do not include  headers. For TCP, the bytes include the headers. |  932 |
|  method |   |  GET |
|  protocol       |   |  http |
|  domain         |   |  somecompany.com |
|  server_port    |   |  80 |
|  path           |   |  v1/gifs/tv? api_key=CW27AW0nlp5u0&callback=1412727595175 |
