---
id: example-prompts
title: Mobot Example Prompts
sidebar_label: Example Prompts
description: A library of example prompts for Sumo Logic's Mobot, covering security and observability investigations, platform administration, and how-to questions.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/mobot.png')} alt="Mobot icon" width="45"/>

Use these prompts as starting points. After Mobot responds, refine the result through follow-up questions. For examples of complete multi-turn conversations, see [Example end-to-end conversation](/docs/search/mobot/#example-end-to-end-conversation) in the Mobot documentation.

:::note
Keyword searches are case-sensitive.
:::

## Sumo Logic how-to questions

* `What is Mobot?`
* `How do I configure OpenTelemetry for my service?`
* `How do I add a Collector for AWS CloudTrail?`
* `What's the difference between a scheduled search and a real-time alert?`
* `Why isn't my Collector sending data?`
* `What are the API endpoints for Sumo Logic?`

## Security investigations

* `Look into any unusual login attempts from yesterday.`
* `Are there any signs of data exfiltration in our environment today?`
* `Have any IP addresses or domains in my logs been flagged by threat intelligence?`
* `Check this file hash against threat intel`
* `Count logs by action and sort the results.`
   * Follow up with `Filter results where action contains Malicious.`
* `Count logs by action, URL, and user.`
   * Follow up with `Sort the results and filter where action contains Malicious.`
* `Analyze the risk and severity of network activity.`
   * Follow up with `Identify the top application categories accessed.`

### Cloud and identity threats

* `Someone may have compromised an AWS IAM account. Can you tell me what they did and how far they got?`
* `Are there any signs of credential stuffing or brute force against our cloud accounts right now?`
* `Are there any users, hosts, or services exhibiting unusual patterns of activity in the last 24 hours that deviate significantly from their historical baseline?`
* `Did anyone access or exfiltrate data from our S3 buckets recently that looks unusual?`
* `GuardDuty fired an alert. How serious is it and what's the full story behind it?`

### Network, perimeter, and endpoint

* `Is there any lateral movement happening inside our network right now?`
* `Several external IPs are showing up repeatedly in our logs, are they malicious?`
* `Are there any signs of reconnaissance or scanning activity against our infrastructure?`
* `Something suspicious is running on one of our Linux hosts, can you figure out what it is and whether it's a threat?`
* `Are any of our Windows systems showing signs of credential harvesting or keychain access?`
* `Has anyone been running unusual commands or escalating privileges on our Kubernetes nodes?`

### Kubernetes and container security

* `Are there any containers in our cluster running with dangerous privileges or misconfigurations?`
* `Did anyone create or modify cluster-admin bindings recently, and should I be worried?`
* `Our Kubernetes security posture feels off. What are the most critical misconfigurations we have right now?`

### Identity, access, and threat hunting

* `A Duo MFA authentication came from a suspicious location. Is this account compromised?`
* `Are there any service accounts or IAM roles with more permissions than they should have?`
* `Has anyone been creating new IAM users or access keys in the last 24 hours?`
* `I want to hunt for signs of the ZeroLogon exploit in our environment. Has anyone tried it?`
* `Are there any signs of a supply chain or insider threat in our recent activity?`
* `What's the most suspicious thing that happened in our AWS environment this week?`
* `Walk me through everything that happened in our environment in the last 24 hours that could be security-relevant.`

## Observability investigations

* `Are there any error spikes in the last 15 minutes? Investigate the cause.`
* `Show me services with the highest error rates in the last hour.`
* `Analyze latency anomalies or slow requests in the last hour.`
* `Find any services where latency has degraded more than 50% compared to last week.`
* `Are there any timeouts or connection failures in the last hour?`
* `Calculate 95th percentile latency by service and API.`
* `Find any pods that have been restarting repeatedly in the last hour.`
* `Which services have the highest request volume right now?`
* `Show me upstream services that spiked in errors right before a downstream service degraded.`

### API and compute

* `Our API Gateway latency spiked in the last hour. What's causing it and which endpoints are affected?`
* `Are any of our pods crash-looping, and why?`
* `Something seems wrong with our RDS database. How long has it been degraded and what's the impact?`

### Services and deployments

* `Our ECS services are throwing errors. Can you trace it back to the root cause?`
* `A deployment went out an hour ago and things feel off. Did it break anything?`
* `Are there any GCP Cloud Functions failing silently that we should know about?`

### App and service health

* `Our application has been slow all morning but no alerts fired. Can you find out why?`
* `Which of our services has the highest error rate right now and what's driving it?`
* `What's the most concerning thing happening in our infrastructure right now?`

## Platform administration

* `What data sources are available?`
* `Have any Collectors gone silent in the last few hours?`
* `Show me the users who scanned the most data last week.`
