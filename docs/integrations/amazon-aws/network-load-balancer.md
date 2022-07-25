---
id: network-load-balancer
title: Amazon Network Load Balancer
sidebar_label: Amazon Network Load Balancer
description: Amazon Network Load Balancer
---

import useBaseUrl from '@docusaurus/useBaseUrl';

AWS Network Load Balancer service is distributed in OSI Layer 4 (the network layer) traffic (TCP, UDP, TLS) and can handle over a million requests per second.

The Sumo Logic App for AWS Network Load Balancer is using metrics to provide insights to ensure that your network load-balancers are operating as expected, backend hosts are healthy, and to quickly identify errors.

## Log and Metric Types  
The AWS Network Load Balancer app uses the following metrics:

AWS Network Load Balancer metrics

## Query sample (Metric based) Edit section
Active Flows (Connections) by Load Balancer

```
account=* region=* LoadBalancer=* Namespace=aws/NetworkELB metric=ActiveFlowCount Statistic=Sum | sum by account, region, namespace, LoadBalancer
```

## Collect Metrics

## Install the App

## Viewing AWS Dashboards

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="AWS API Gateway" />
