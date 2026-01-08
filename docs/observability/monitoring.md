---
id: monitoring
title: Monitoring with the Observability Solution
sidebar_label: Monitoring Applications
description: Sumo Logic provides a suite of tools to make discovering issues faster.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

After you have set up [collection](set-up-collection.md), you can start monitoring your application with the Observability Solution.

## Get real-time notifications about issues

With Monitors, you can set up meaningful alerts that instantaneously notify you and your team about changes in state of your system. The intelligent alerting framework minimizes alert noise and alert fatigue so you and your team are not inundated with a lot of notifications, by de-duplicating them, and auto-remediating issues when the system returns to a normal state. The alerting framework is designed to integrate with your incident management workflows with  features such as notification customization, multi-channel notifications, and priority-based notification handling. 

<img src={useBaseUrl('img/observability/observability-monitors.png')} alt="Observability-monitors" style={{border: '1px solid gray'}} width="800" />

Use Alert Response create advanced alerts, providing extensive data to determine false positives, investigate root cause, and use playbooks to resolve issues. For AWS Observability, on-call engineers can review the triggered alert and related alerts based on the timeframe and entities, finding faults in services and servers and viewing entity data from one aggregated report.

For example, the following example error get_billing_info on a Lambda can pinpoint the exact error, logs, related services and entities, and potential cards of the following data:

* Log fluctuations reduced to find key issues
* Anomalies in the stack for errors and bottlenecks
* Dimensional explanations of aggregated key-value pairs that triggered the alert in the logs
* Benchmarks generated against other AWS customers using these services

<img src={useBaseUrl('img/observability/aws-alert-response.png')} alt="AWS alert response" style={{border: '1px solid gray'}} width="800" />

## Create more intuitive Visualizations

You can create custom dashboards with *New Dashboards* to analyze metric and log data in a single view, with the ability to quickly navigate through your data through graphs and data mappings to enable you to quickly identify issues and begin analysis.

<img src={useBaseUrl('img/observability/visual-example.png')} alt="Visual example" style={{border: '1px solid gray'}} width="800" />

## Leverage Pre-built Content for Your Infrastructure

Compared to apps, solutions offer more supporting content plus a high-level view of what you may need given your use case.

If you and your team are using AWS services directly, you can leverage [AWS Observability](https://www.sumologic.com/lp/aws-observability/) for over 40 dashboards that monitor infrastructure on AWS in a comprehensive and intuitive manner across AWS accounts, regions, and resource types down to individual entities.

If you're using Kubernetes to orchestrate your application, you can leverage [Kubernetes Observability](/docs/observability/kubernetes/monitoring) with views for every major entity in the Kubernetes environment, arranged to help you slice and dice along the dimensions that matter.
 
