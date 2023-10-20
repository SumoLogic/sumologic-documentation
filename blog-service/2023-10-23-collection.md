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

Kubernetes collection and enrichment is done via OpenTelemetry.

We’re excited to announce that we've updated the Sumo Logic Kubernetes Helm Chart from v3 to v4. (used to define, install, and upgrade complex Kubernetes applications)

With this update:

* Helm chart v4 is packaged to collect, configure, and deploy applications and services on your Kubernetes clusters with OpenTelemetry as a default to collect logs, events, and metrics.
* OpenTelemetry collectors have proven to be more performant and lesser CPU consumption will help realize cost savings.
* We've also removed dependencies on third party solutions like Fluentbit, Fluentd, and Prometheus to reduce complexity and cost. Fewer software applications means fewer updates to manage and fewer security risks to worry about. This diagram below distinguishes support available on Falco for collection and enrichment.

![K8s.png](/img/kubernetes/K8s-architecture.png)
