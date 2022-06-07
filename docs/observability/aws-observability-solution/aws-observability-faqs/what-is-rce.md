---
id: what-is-rce
---

# What is the Root Cause Explorer?

See the following frequently asked questions (FAQs), and see [Root Cause Explorer](../../root-cause-explorer.md) for details.

### What AWS services does it support?

Sumo Logic Root Cause Explorer analyzes and correlates metrics from all supported AWS Observability services and EBS, Autoscaling, X-ray, SNS, and SQS. These services include the following:

* AWS CloudWatch metrics for ALB, NLB, API Gateway, EC2, EBS, Lambda, ECS, RDS, DynamoDB, Elasticache, Autoscaling groups
* AWS Simple Notification Service (SNS)
* AWS Simple Queueing Service (SQS)
* AWS X-ray
* Kubernetes metrics and hierarchy
* Open Telemetry metrics
* Space Map

### Who can use the new features?

Root Cause Explorer is available for Cloud Flex Enterprise, Cloud Flex
Credits Enterprise Operations, and Cloud Flex Credits Enterprise Suite
account plans.

### How does Root Cause Explorer work? 

When issues occur in infrastructure and services, on-call staff
typically triage an incident by attempting to correlate spikes at
various levels in their application stack to analyze problem root cause
and recovery options. At its core, Root Cause Explorer mimics this
workflow with a combination of machine-learning and rules curated by
AWS, Kubernetes, Tracing and troubleshooting experts. 

It computes *Events of Interest (EOIs)* in AWS CloudWatch metrics, Open
Telemetry trace metrics, host metrics, and Kubernetes metrics using the
context associated with the incident.

### How do I tune the Root Cause Explorer? 

Anomalies are auto-generated and auto-correlated, meaning no manual work fine tuning thresholds. See [Root Cause Explorer](../../root-cause-explorer.md) for troubleshooting information.
