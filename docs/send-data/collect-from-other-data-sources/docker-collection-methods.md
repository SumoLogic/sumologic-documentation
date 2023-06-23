---
id: docker-collection-methods
title: Docker Collection Methods
sidebar_label: Docker
description: Learn about methods for collecting logs and metrics from Docker.
---


This page describes and compares alternative methods for collecting Docker logs and metrics. You can employ these methods in self-managed Docker environments or with managed Docker services like ECS and Swarm.

:::important
While Kubernetes can run Docker, it supports multiple container runtime systems and it may not be running Docker. The Docker collection methods described below are strictly for Docker, and don’t collect Kubernetes metadata, as the methods described in Kubernetes Collection Methods do.
:::

## Support for logs and metrics

The following table summarizes what you can collect with each collection method. 

| Collection Methods | Logs | Metrics |
|:--|:--|:--|
| Docker Logging Driver	 | ![check](/img/reuse/check.png) |  |
| Installed Collector on Docker Host<br/>(with Docker Log source and Docker Stats source)| ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| Collector as a Container<br/>(with Docker Log source and Docker Stats source)	 | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |

## Docker collection options

### Sumo Logic Docker Logging Driver

The [Sumo Logic Docker Logging Driver](https://github.com/SumoLogic/sumologic-docker-logging-driver) is a Docker plugin you can use to send Docker container logs to Sumo. Once your log data is in Sumo, you can use the Sumo web app to search and analyze it. This is a good option if you do not want to install a Collector on your Docker hosts. 

The Docker Logging Driver is supported with Docker Version 18.03.0-ce or higher.

* **Pros**
    * Agentless, uses an HTTP source.
    * Easier to set up.
    * You can configure all containers on a Docker host to use the driver, or start selected containers to do so by adding the logging options to the Docker command when you start the containers. 
* **Cons**
    * HTTP sources do not have local caching, so data may be lost in the event of long periods of throttling. The Docker Logging Driver has basic retry functionality and limited caching, which might prevent or reduce data loss in the event of throttling.  
    * No metrics support. To collect Docker metrics use the Sumo Docker Stats source with either the [Installed Collector on Docker Host](#installed-collector-on-docker-host) or [Collector as a Container](#collector-as-a-container) collection method. (If desired, you could consider using a different collection agent like Docker CollectD and report metrics to Sumo using Graphite).
    * May not work in all Docker environments. Versions of Docker prior to Docker Version 18.03.0-ce may not support the new plugin architecture.
    * Does not support the Sumo Docker app, which requires the use of Sumo’s Docker Stats source.

### Installed Collector on Docker Host

In this method, you run an Installed Collector on each Docker host machine and use Sumo Logic Sources for Docker, as described on Collect Logs and Stats from Docker. 

The Docker Logs Source collects logs from the containers running on the host and events from the Docker daemon. The Docker Stats Source collects container metrics.

You can bake the Collector into an image, install it manually, or use automation tools like Chef, Puppet, or Ansible.

* **Pros**
    * Full visibility.  Using this method you could collect anything on the Docker host, including: 
        * Container Logs
        * Container Metrics
        * Host Logs
        * Host Metrics (Sumo's [Host Metrics source](/docs/send-data/installed-collectors/sources/host-metrics-source.md) is required.)
    * Logs are cached locally, so if a source is throttled by Sumo, you won’t drop data.  
    * You can bake Installed Collectors into AMIs to allow for consistent deployments across all your hosts.
    * Configurable metadata. You can use variables available from Docker and the Docker host to configure the sourceCategory and sourceHost for a Docker log source or a Docker stats. For more information, see Configure sourceCategory and sourceHost using variables.
* **Cons**
    * Maintaining AMIs can be tricky if the process is not automated, so this might be a disadvantage, depending on your situation and resources. 
    * It’s not as easy to set up this method to monitor selected containers on a host, as opposed to all containers. You might need to configure multiple sources to achieve this goal.

### Collector as a Container

In this method, you run the Collector in a Dockerized container. See our [Sumo Logic Collector for Docker](https://hub.docker.com/r/sumologic/collector/) repository that offers several variants of Docker images to run the Sumo
Logic collector.

* **Pros**
    * No need to bake into any AMIs. Can be fully automated depending on your automation tooling around Docker.
    * The Collector will cache the files in the container, so if a Source is throttled by Sumo, you won’t drop data. Ensure that you have ample space, or use persistent storage.
    * Easy to upgrade: it’s a container, just deploy a new one!
    * Configurable metadata. You can use variables available from Docker and the Docker host to configure the sourceCategory and sourceHost for a Docker log source or a Docker stats. For more information, see Configure sourceCategory and sourceHost using variables.
* **Cons**
    * With this method, you cannot collect host metrics from the Docker host. The Collector must be installed on the Docker host to get the host metrics. You can still collect container logs, container metrics and host logs.
    * It’s not as easy to set up this method to monitor selected containers on a host, as opposed to all containers. You might need to configure multiple sources to achieve this goal.

### Docker Platform Considerations

The following table describes the collection methods that are supported by different Docker platforms.

:::note
The Docker Logging Driver is supported with Docker Version 18.03.0-ce or higher for the following table.
:::

| Platform | Installed Collector On Docker | Host | Collector As Container | Docker Logging Driver |
|:--|:--|:--|:--|:--|
| Docker<br/>(not managed service) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  ![check](/img/reuse/check.png)| ![check](/img/reuse/check.png) |
| ECS | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  ![check](/img/reuse/check.png)| ![check](/img/reuse/check.png) |
| Docker Swarm | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  ![check](/img/reuse/check.png)| ![check](/img/reuse/check.png) |
| Rancher<br/>(non-Kubernetes) | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |  ![check](/img/reuse/check.png)| ![check](/img/reuse/check.png) |

### Sumo Logic apps for Docker

Sumo Logic provides the following apps for Docker:  

* [Docker](/docs/integrations/containers-orchestration/docker-community-edition.md): Supports either the [Installed Collector on Docker Host](#installed-collector-on-docker-host) or [Collector as a Container](#collector-as-a-container) collection strategy.
* [Docker ULM](/docs/integrations/containers-orchestration/docker-ulm.md): Supports the [Installed Collector on Docker Host](#installed-collector-on-docker-host) collection strategy.
