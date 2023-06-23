---
id: aws-privatelink
title: Sumo Logic Connector for AWS PrivateLink (Beta)
sidebar_label: AWS PrivateLink (Beta)
description: AWS PrivateLink provides private connectivity between VPCs, AWS services, and your on-premises networks, without exposing your traffic to the public internet.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

[AWS PrivateLink](https://aws.amazon.com/privatelink) provides private connectivity between VPCs, AWS services, and your on-premises networks, without exposing your traffic to the public internet.

To send data to Sumo Logic through AWS PrivateLink, you'll need to configure an internal endpoint in your VPC for Installed Collectors to send data to.


## Enable PrivateLink for ALB

With the NLB-created and ALB-registered as a target, requests over AWS PrivateLink to the NLB are forwarded to the ALB.

Sumo Logic exposes AWS PrivateLink endpoints to different [regions that depend on your Sumo Logic deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security). If you're using the VPC in a different region where Sumo's Privatelink endpoint service is set up, you need to set up VPC peering. Either way, you need to create an endpoint.

<table><small>
  <tr>
    <td>Deployment</td>
    <td>Collection Endpoint</td>
    <td>AWS Region of Sumo PrivateLink Endpoint Service</td>
  </tr>
  <tr>
    <td>AU</td>
    <td>https://collectors.au.sumologic.com</td>
    <td>ap-southeast-2</td>
  </tr>
  <tr>
    <td>CA</td>
    <td>https://collectors.ca.sumologic.com</td>
    <td>ca-central-1</td>
  </tr>
  <tr>
    <td>DE</td>
    <td>https://collectors.de.sumologic.com</td>
    <td>eu-central-1</td>
  </tr>
  <tr>
    <td>EU</td>
    <td>https://collectors.eu.sumologic.com<br/>
    https://endpoint1.collection.eu.sumologic.com</td>
    <td>eu-west-1</td>
  </tr>
  <tr>
    <td>FED</td>
    <td>https://collectors.fed.sumologic.com</td>
    <td>us-east-1</td>
  </tr>
  <tr>
    <td>IN</td>
    <td>https://collectors.in.sumologic.com</td>
    <td>ap-south-1</td>
  </tr>
  <tr>
    <td>JP</td>
    <td>https://collectors.jp.sumologic.com</td>
    <td>ap-northeast-1</td>
  </tr>
  <tr>
    <td>US1</td>
   <td>https://collectors.sumologic.com<br/>
   https://endpoint1.collection.sumologic.com<br/>
   https://endpoint2.collection.sumologic.com<br/>
   https://endpoint3.collection.sumologic.com<br/>
   https://endpoint4.collection.sumologic.com<br/>
   https://endpoint5.collection.sumologic.com</td>
   <td>us-east-1</td>
  </tr>
  <tr>
    <td>US2</td>
    <td>https://collectors.us2.sumologic.com<br/>
https://endpoint1.collection.us2.sumologic.com<br/>
https://endpoint2.collection.us2.sumologic.com<br/>
https://endpoint3.collection.us2.sumologic.com<br/>
https://endpoint4.collection.us2.sumologic.com<br/>
https://endpoint5.collection.us2.sumologic.com<br/>
https://endpoint6.collection.us2.sumologic.com<br/>
https://endpoint7.collection.us2.sumologic.com<br/>
https://endpoint8.collection.us2.sumologic.com<br/>
https://endpoint9.collection.us2.sumologic.com/</td>
   <td>us-west-2</td>
  </tr>
</small></table>

### Create an endpoint to connect with the Sumo Logic endpoint service

* The service name is provided by Sumo Logic and will accept the endpoint connection request once we know you initiated the connection.
* Select the VPC where the Sumo Logic collector will be installed or where HTTP requests will be made for HTTP Sources.

  <img src={useBaseUrl('img/beta/create-endpoint.png')} alt="CreateEndpoint" width="500"/>

### No VPC Peering

If the VPC is in the same [AWS region as your deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security), you don't need to set up VPC peering. Navigate to **Actions**, then select **Modify private DNS name**.

![Endpoint](/img/beta/endpoints.png)

Check the box to enable private DNS names.

<img src={useBaseUrl('img/beta/dns-checkbox.png')} alt="DnsCheckpoint" width="550"/>

### VPC Peering

If the VPC is not in the same [AWS region as your deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security), you'll need to [set up VPC peering](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-peering.html).

1. Create the VPC peering connection between the region for the client-side VPC and the region where the Sumo Logic PrivateLink service is configured.
2. Create a Route53 private hosted zone. Select the VPC peered in the region where our server-side region is located.
3. With the created private hosted zone, add an **A** record. Select the peered VPC in region **us-west-2**, where the Sumo Logic server-side infrastructure is located.<br/> ![QuickRecord](/img/beta/quickcreaterecord.png)
4. Add the other peered VPC in the other region into the Route53-hosted zone.
