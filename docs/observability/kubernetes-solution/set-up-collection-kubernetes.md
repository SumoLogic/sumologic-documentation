---
id: set-up-collection-kubernetes
---

# Set up collection for Kubernetes

This page provides an overview of the collection process for Kubernetes environments.

## Deployment Guide

Reference the [Deployment Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/README.md#documentation) in our sumologic-kubernetes-collection GitHub repository for detailed instructions on how to collect Kubernetes logs, metrics, and events; enrich them with deployment, pod, and service level metadata; and send them to Sumo Logic.

The Deployment Guide has information on advanced configurations, best practices, performance, troubleshooting, and upgrading for our latest and previous versions of supported software.

## Collection overview

Sumo Logic collects logs, events, metrics, and security data with Fluentbit, FluentD, Prometheus, and Falco. These collectors are all open source collectors that are maintained by the Cloud Native Computing Foundation (CNCF). The collected data streams through a centralized FluentD pipeline for metadata enrichment. Sumo Logic tags the container,
pod, node, and cluster, as well as identifying the service, namespace, and deployment. 

![K8s.png](/img/kubernetes/K8s-architecture.png)
