---
id: classic-load-balancer
title: AWS Classic Load Balancer
sidebar_label: AWS Classic Load Balancer
description: AWS Classic Load Balancer
---

import useBaseUrl from '@docusaurus/useBaseUrl';

AWS Elastic load balancer classic distributes the incoming application traffic across multiple EC2 instances in multiple Availability Zones.

The Sumo Logic App for AWS Elastic Load Balancing Classic is a unified logs and metrics App that helps you monitor the classic load balancer. The preconfigured dashboards provide information on the latency, HTTP backend codes, requests, and host status, that help you investigate the issues in the load balancer.


### Log Types

ELB logs are stored as .log files in the buckets you specify when you enable logging. The process to enable collection for these logs is described in [AWS ELB Enable Access Logs](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-access-logs.html).

The logs themselves contain these fields in this order:


```
datetime, ELB_Server, clientIP, port, backend, backend_port, requestProc, ba_Response, cli_Response, ELB_StatusCode, be_StatusCode, rcvd, send, method, protocol, domain, server_port, path
```


The log format is described in [AWS ELB Access Log Collection](http://docs.aws.amazon.com/elasticloadbalancing/latest/classic/access-log-collection.html).


### Metrics Type

For details on the metrics of AWS Classic Load Balancer, see [here](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-cloudwatch-metrics.html).


### Sample Access Log Message

```
2017-11-06T23:20:38 stag-www-lb 250.38.201.246:56658 10.168.203.134:23662 0.007731 0.214433 0.000261 404 200 3194 123279 "GET https://stag-www.sumologic.net:443/json/v2/searchquery/3E7959EC4BA8AAC5/messages/raw?offset=29&length=15&highlight=true&_=1405591692470 HTTP/1.1" "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:23.0) Gecko/20131011 Firefox/23.0" ECDHE-RSA-CAMELLIA256-SHA384 TLSv1.2
```



### Query Sample (Access Log Based)

**Response Codes Distribution by Domain and URI**


```
account={{account}} region={{region}} namespace={{namespace}}
| parse "* * * * * * * * * * * \"*\" \"*\" * *" as datetime, loadbalancername, client, backend, request_processing_time, backend_processing_time, response_processing_time, elb_status_code, backend_status_code, received_bytes, sent_bytes, request, user_agent, ssl_cipher, ssl_protocol
| where tolowercase(loadbalancername) matches tolowercase("{{loadbalancername}}")
| parse field=request "* *://*:*/* HTTP" as Method, Protocol, Domain, ServerPort, URI nodrop
| parse field=client "*:*" as clientIP, port nodrop
| parse field=backend "*:*" as backendIP, backend_port nodrop
| fields - request, client, backend
| if (backend_status_code matches "5*",1,0) as Backend_5XX
| if (backend_status_code matches "4*",1,0) as Backend_4XX
| if (backend_status_code matches "3*",1,0) as Backend_3XX
| if (backend_status_code matches "2*",1,0) as Backend_2XX
| sum(Backend_5XX) as Backend_5XX, sum(Backend_4XX) as Backend_4XX, sum(Backend_3XX) as Backend_3XX, sum(Backend_2XX) as Backend_2XX by loadbalancername, Domain, URI
| limit 20
| sort by Backend_5XX, Backend_4XX, Backend_3XX, Backend_2XX
```


### Query sample (Metric based)  

**4XX by Load Balancer**


```
account={{account}} region={{region}} Namespace={{namespace}} loadbalancername={{loadbalancername}} metric=HTTPCode_ELB_4XX Statistic=Sum | sum by account, region, namespace, loadbalancername
```

* **[Topics](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Classic_Load_Balancer#899aaf93-70eb-bd61-ecd5-9fd32096a85f)**
* [Collect Logs and Metrics for the AWS Classic Load Balancer](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Classic_Load_Balancer/Collect-Logs-and-Metrics-for-the-AWS-Classic-Load-Balancer)


## Collect Logs and Metrics

## Install the App


<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="Aurora MySQL ULM" />
