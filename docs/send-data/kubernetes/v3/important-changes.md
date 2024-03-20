---
id: important-changes
title: Kubernetes Collection v3.0.0 - Important Changes
sidebar_label: Important Changes
description: This page describes the major changes and the necessary migration steps.
---

Based on feedback from our users, we will be introducing several changes to the Sumo Logic Kubernetes Collection solution.

This document describes the major changes and the necessary migration steps.

## OpenTelemetry Collector

The new version replaces both Fluentd and Fluent Bit with the OpenTelemetry Collector. In the majority of cases, this doesn't require any manual intervention. However, custom processing in Fluentd or Fluent Bit will need to be ported to the OpenTelemetry Collector configuration format. Please check [Solution Overview][solution-overview] and see below for details.

[solution-overview]: https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/README.md#solution-overview

## kube-prometheus-stack upgrade

We've upgraded kube-prometheus-stack, which results in some changes to metrics, and a need for some manual intervention during the upgrade.

## Tracing enabled by default

Trace collection is now enabled by default. If you do not have instrumented applications in your cluster, or do not want to collect traces,
you'll need to disable this feature manually.
