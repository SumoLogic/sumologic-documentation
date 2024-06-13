---
title: AWS EKS
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.0  
Updated: April 18, 2024***

AWS EKS streamlines Kubernetes application deployment, ensuring scalability and security with minimal management overhead.
This integration provides comprehensive Kubernetes cluster insights, node and pod management, volume tracking, and configuration updates.

* **Describe Cluster** _(Enrichment)_ - Describes an Amazon EKS cluster.
* **List Clusters** _(Enrichment)_ - Lists the Amazon EKS clusters in your AWS account in the specified AWS Region.
* **List Insights** _(Enrichment)_ - Returns a list of all insights checked for against the specified cluster.
* **List Nodes** _(Enrichment)_ - Returns a list of all Nodes.
* **List Persistent Volumes** _(Enrichment)_ - Returns a list of Persistent Volumes.
* **List Pods** _(Enrichment)_ - Returns a list of Pods for all namespaces.
* **Read Namespaced Pod Status** _(Enrichment)_ - Read the status of the specified Pod.
* **Read Node Status** _(Enrichment)_ - Read the status of the specified Node.
* **Update Cluster Config** _(Containment)_ - Updates an Amazon EKS cluster configuration.

## External Libraries

* [boto3](https://github.com/boto/boto3/blob/develop/LICENSE)
* [kubernetes](https://github.com/kubernetes/kubernetes/blob/master/LICENSE)
* [aws-cli](https://github.com/aws/aws-cli/blob/develop/LICENSE.txt)

## Change Log

* April 18, 2024 (v1.0) - First upload