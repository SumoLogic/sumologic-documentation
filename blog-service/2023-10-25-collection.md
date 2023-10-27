---
title: Kubernetes Helm v4 Chart Update (Collection)
image: https://www.sumologic.com/img/logo.svg
keywords:
  - collection
  - opentelemetry
  - helm
  - kubernetes
  - k8s
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

We’re excited to announce that we've updated the Sumo Logic Kubernetes Helm Chart from v3 to v4. With this update, our Helm chart is now packaged to collect logs, events, and metrics using the more cost-effective and faster OpenTelemetry collector. To further streamline this solution, we've also removed dependencies on third-party solutions like Fluentbit, Fluentd, and Prometheus.

To learn more, see [Set up Data Collection for Kubernetes](/docs/observability/kubernetes/collection-setup) and the diagram below, which distinguishes support available on Falco for collection and enrichment.

![K8s.png](/img/kubernetes/K8s-architecture.png)
