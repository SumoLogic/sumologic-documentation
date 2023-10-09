---
id: set-up-collection
title: Set up Collection for the Observability Solution
sidebar_label: Set up Collection
description: There are a variety of different collectors you can set up to ensure you’re sending all the critical signals to Sumo Logic.
---

You can use the Observability Solution to monitor and troubleshoot different types of application stacks. Depending on the makeup of your application infrastructure, there are a variety of different collectors you can set up to ensure you’re sending all the critical signals to Sumo Logic.

* **Kubernetes Collection**. If you have built your application with Kubernetes, follow the steps in the [Kubernetes collection](kubernetes/collection-setup.md) to set up your Kubernetes collection.

* **AWS Observability Collection**. If you have set up your application directly on top of AWS services and manage it yourself, follow the steps in the [AWS Observability Solution.](/docs/observability/aws)

* **Custom or App Component Metrics**. You can use Telegraf to collect metrics from many different sources and send them to Sumo Logic. For more information, see our telegraf collection strategy.

* **Tracing collection**. If you need complete end-to-end observability of business-critical user transactions, set up OpenTelemetry-based traces collection.

After you have set up your collectors, you can begin [monitoring](monitoring.md).
