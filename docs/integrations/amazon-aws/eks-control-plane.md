---
id: eks-control-plane
title: Amazon EKS - Control Plane
sidebar_label: Amazon EKS - Control Plane
description: Amazon EKS - Control Plane
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Sumo Logic App for Amazon EKS - Control Plane App provides visibility into the EKS control plane with operational insights into the api server, scheduler, control manager, and worker nodes. The app’s preconfigured dashboards display resource-related metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets.

Amazon Elastic Kubernetes Service ([Amazon EKS](https://aws.amazon.com/eks/)) allows you to readily deploy, manage, and scale container-based applications with [Kubernetes](https://aws.amazon.com/kubernetes/) on AWS.


## Supported versions

The following are the minimum supported requirements for this application:


<table>
  <tr>
   <td>Name
   </td>
   <td>Supported versions
   </td>
  </tr>
  <tr>
   <td>Kubernetes
   </td>
   <td>1.10 and later
   </td>
  </tr>
  <tr>
   <td>Amazon EKS
   </td>
   <td>1.13.8, 1.11.10
   </td>
  </tr>
</table>



## Log Types   

* **Kubernetes API server component logs (api)** – The cluster API server is the control plane component that exposes the Kubernetes API.
* **Audit (audit)** – Kubernetes audit logs provide a record of the individual users, administrators, or system components that have affected your cluster.
* **Authenticator (authenticator)** – Authenticator logs are unique to Amazon EKS. These logs represent the control plane component that Amazon EKS uses for Kubernetes [Role Based Access Control](https://kubernetes.io/docs/admin/authorization/rbac/) (RBAC) authentication using IAM credentials.
* **Controller manager (controllerManager)** – The controller manager manages the core control loops that are shipped with Kubernetes.
* **Scheduler (scheduler)** – The scheduler component manages when and where to run pods in your cluster.

For more details about EKS logging, refer the [Amazon documentation](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html).


## Collect Logs and Metrics

## Install the App


## Viewing Dashboards

<img src={useBaseUrl('img/integrations/amazon-aws/Overview.png')} alt="Aurora MySQL ULM" />
