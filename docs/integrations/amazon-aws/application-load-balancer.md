---
id: application-load-balancer
title: AWS Application Load Balancer
sidebar_label: AWS Application Load Balancer
description: AWS Application Load Balancer
---

The AWS Application Load Balancer functions at the application layer, receives requests, evaluates the listener rules in priority order to determine which rule to apply, and then selects a target from the target group.

The Sumo Logic App for AWS Application Load Balancing uses logs and metrics to give you visibility into the health of your Application Load Balancer and target groups. Use the pre-configured dashboards to understand the latency, request and host status, threat intel, and HTTP backend codes by availability zone and target group.


## Log Types

The App uses:

* The metrics are included in the AWS/ApplicationELB namespace. For more details, see [here](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/elb-metricscollected.html#load-balancer-metrics-alb).
* The [Application Load Balancer Access](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html#enable-access-logging) Log introduces two new fields in addition to the fields contained in the Classic ELB Access log:
    1. **Type. **This is the type of request or connection (HTTP, HTTPS, H2, ws, wss)
    2. **Target_group_arn**. This is the Amazon Resource Name (ARN) of the target group
* The logs are stored in a .gzip format in the specified S3 bucket and contain these fields in this order:


```
timestamp, elb, client:port, target:port, request_processing_time, target_processing_time, response_processing_time, elb_status_code, target_status_code, received_bytes, sent_bytes, request, user_agent, ssl_cipher, ssl_protocol, target_group_arn, trace_id
```

The log format is described in [AWS Application Load Balancer Access Log Collection](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html)


### Metrics Type

For details on the metrics of AWS Application Load Balancing, see [here](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-cloudwatch-metrics.html).


### Sample Log Message


```
https 2017-11-20T22:05:36 long-bill-lb 77.222.19.149:41148 10.168.203.134:23662 0.000201 0.401924 0.772005 500 200 262 455 "GET https://elmagek.no-ip.org:443/json/v1/collector/histogram/100105037?startTimestamp=1405571270000&endTimestamp=1405574870000&bucketCount=60&_=1405574870206 HTTP/1.1" "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; en-US; rv:1.9.0.4) Gecko/2008102920 Firefox/3.0.4" DH-RSA-AES256-GCM-SHA384 TLSv1.2 arn:aws:elasticloadbalancing:us-west-2:104030218370:targetgroup/Prod-frontend/92e3199b1rc814fe9 "Root=1-58337364-23a8c76965a2ef7629b185e134"
```



### Query Sample (Access Log Based)


```
account={{account}} region={{region}} namespace={{namespace}}
| parse "* * * * * * * * * * * * \"*\" \"*\" * * * \"*\"" as Type, DateTime, loadbalancer, Client, Target, RequestProcessingTime, TargetProcessingTime, ResponseProcessingTime, ElbStatusCode, TargetStatusCode, ReceivedBytes, SentBytes, Request, UserAgent, SslCipher, SslProtocol, TargetGroupArn, TraceId
| where tolowercase(loadbalancer) matches tolowercase("{{loadbalancer}}")
| parse field=Request "* *://*:*/* HTTP" as Method, Protocol, Domain, ServerPort, URI nodrop
| parse field=TargetGroupArn "arn:aws:elasticloadbalancing:*:*:*" as AwsRegion, AccountId, TargetGroup nodrop
| if (TargetStatusCode matches "5*",1,0) as Target_5XX
| if (TargetStatusCode matches "4*",1,0) as Target_4XX
| if (TargetStatusCode matches "3*",1,0) as Target_3XX
| if (TargetStatusCode matches "2*",1,0) as Target_2XX
| sum(Target_5XX) as Target_5XX, sum(Target_4XX) as Target_4XX, sum(Target_3XX) as Target_3XX, sum(Target_2XX) as Target_2XX by loadbalancer, TargetGroup, Domain, URI
| limit 20
| sort by Target_5XX, Target_4XX, Target_3XX, Target_2XX
```



### Query sample (Metric based)  

```
account={{account}} region={{region}} Namespace={{namespace}} loadbalancer={{loadbalancer}} AvailabilityZone=* TargetGroup=* metric=HTTPCode_Target_5XX_Count Statistic=Sum | parse field= TargetGroup */* as Unused, TargetGroup | sum by account, region, namespace, loadbalancer, TargetGroup, AvailabilityZone
```


* **[Topics](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Application_Load_Balancer#899aaf93-70eb-bd61-ecd5-9fd32096a85f)**


## Collect Logs and Metrics

## Install the App
