---
id: important-changes
title: Kubernetes Collection v5.0.0 - Important Changes
sidebar_label: Important Changes
description: This page describes the major changes and the necessary migration steps.
---

We're introducing some changes to the Sumo Logic Kubernetes Collection solution.

This page describes the major changes and the necessary migration steps.

## Important changes

## Prometheus operator removal

:::note
For those, who are already using Otel operator(default metrics collector) in v4 or not using metrics collection feature at all, this change is not applicable. Please skip this section.
Only applicable for customers are still using sumologic provided prometheus operator for metrics collection by explicitly enabling kube-prometheus-stack.prometheusOperator.enabled flag.
:::

Opentelemetry operator has been made the default for metrics collection starting from helm chart v4, but in v4, there
was an option to re-enable prometheus operator for metrics collection. Starting from v5 release, we have removed the
support for prometheus operator completely and Otel operator is now the single source for metrics collection.

If you are still using prometheus operator in helm chart v4 and haven't migrated to Otel operator yet, please follow [Otel Operator migration guide](https://www.sumologic.com/help/docs/send-data/kubernetes/v4/important-changes/#opentelemetry-collector-for-metrics-collection)
before upgrading to this version. The guide will help you to install Otel Operator CRD's which are a pre-requisite for this upgrade.

