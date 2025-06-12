---
title: AWS EKS
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/aws.png')} alt="aws" width="50"/>

***Version: 1.1  
Updated: July 13, 2024***

AWS EKS streamlines Kubernetes application deployment, ensuring scalability and security with minimal management overhead.
This integration provides comprehensive Kubernetes cluster insights, node and pod management, volume tracking, and configuration updates.

## Actions

* **Cordon Node** _(Containment)_ - By cordoning the impacted worker node, you're informing the scheduler to avoid scheduling pods onto the affected node. This will allow you to remove the node for forensic study without disrupting other workloads.
* **Create Network Policy to Isolate Pod** _(Containment)_ - Isolate the Pod by creating a Network Policy that denies all ingress and egress traffic to the pod.
* **Delete Pod** _(Containment)_ - Delete a Pod.
* **Describe Cluster** _(Enrichment)_ - Describes an Amazon EKS cluster.
* **Get Insight** _(Enrichment)_ - Returns details about an insight that you specify using its ID.
* **Get Network Policy** _(Enrichment)_ - Get the specified Network Policy.
* **Get Node** _(Enrichment)_ - Get Worker Node.
* **Get Pod** _(Enrichment)_ - Get the specified Pod.
* **Identify Pods with Vulnerable Image** _(Enrichment)_ - Identify Pods with vulnerable or compromised image and worker nodes.
* **List Clusters** _(Enrichment)_ - Lists the Amazon EKS clusters in your AWS account in the specified AWS Region.
* **List Deployment** _(Enrichment)_ - List objects of kind Deployment.
* **List Insights** _(Enrichment)_ - Returns a list of all insights checked for against the specified cluster.
* **List Namespaces** _(Enrichment)_ - List objects of kind Namespace.
* **List Network Policy** _(Enrichment)_ - List objects of kind Network Policy.
* **List Nodes** _(Enrichment)_ - Returns a list of all Nodes.
* **List Persistent Volumes** _(Enrichment)_ - Returns a list of Persistent Volumes.
* **List Pods** _(Enrichment)_ - Returns a list of Pods for all namespaces.
* **Read Namespaced Pod Status** _(Enrichment)_ - Read the status of the specified Pod.
* **Read Node Status** _(Enrichment)_ - Read the status of the specified Node.
* **UnCordon Node** _(Containment)_ - UnCordon the worker node
* **Update Cluster Config** _(Containment)_ - Updates an Amazon EKS cluster configuration.

## External Libraries

* [boto3](https://github.com/boto/boto3/blob/develop/LICENSE)
* [kubernetes](https://github.com/kubernetes/kubernetes/blob/master/LICENSE)
* [aws-cli](https://github.com/aws/aws-cli/blob/develop/LICENSE.txt)

## Configure AWS EKS in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationsAuthAWS from '../../../../reuse/integrations-authentication-aws.md';
import AWSRegions from '../../../../reuse/automation-service/aws/region.md';
import AWSAccesskey from '../../../../reuse/automation-service/aws/access-key.md';
import AWSSecret from '../../../../reuse/automation-service/aws/secret.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* <AWSAccesskey/>
* <AWSSecret/>
* <AWSRegions/>
* **Session Token**. Enter the session token if you are using [temporary credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/aws/aws-eks-configuration.png')} style={{border:'1px solid gray'}} alt="AWS EKS configuration" width="400"/>

<IntegrationsAuthAWS/>

For information about AWS EKS, see [EKS documentation](https://docs.aws.amazon.com/eks/).

## Change Log

* April 18, 2024 (v1.0) - First upload
* July 13, 2024 (v1.1)
    + Docker has been updated for AWS EKS
    + Added New Actions:
        - Cordon Node
        - Create Network Policy to Isolate Pod
        - Delete Pod
        - Get Insight
        - Get Network Policy
        - Get Node
        - Get Pod
        - Identify Pods with Vulnerable Image
        - List Deployment
        - List Namespaces
        - List Network Policy
        - UnCordon Node
    + List of changes grouped by Actions:
        - List Insights
            * Added new Filter Field
            * Updated output
        - List Nodes
            * Added new Limit Field
            * Updated output
        - List Pods
            * Added selector to restrict the list of returned objects by their field
            * Added new Limit Field
            * Updated output
        - Read Namespaced Pod Status
            * Updated output
        - Read Node Status
            * Updated output
        - Update Cluster Config
            * Updated resources VPC Config text field to a textarea field
            * Added output