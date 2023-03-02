---
id: aws-privatelink
title: Connect to Sumo Logic over AWS PrivateLink (Beta)
sidebar_label: AWS PrivateLink (Beta)
description: AWS PrivateLink provides private connectivity between VPCs, AWS services, and your on-premises networks, without exposing your traffic to the public internet.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

[AWS PrivateLink](https://aws.amazon.com/privatelink) provides private connectivity between VPCs, AWS services, and your on-premises networks, without exposing your traffic to the public internet.

To send data to Sumo Logic through AWS PrivateLink, you'll need to configure an internal endpoint in your VPC for Installed Collectors to send data to.

## Enable PrivateLink for ALB

With the NLB-created and ALB-registered as a target, requests over AWS PrivateLink to the NLB are forwarded to the ALB.

Sumo Logic exposes AWS PrivateLink endpoints to different [regions that depend on your Sumo Logic deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security). If you're using the VPC in a different region, you need to set up VPC peering. Either way, you need to create an endpoint.

## Create an endpoint to connect with the Sumo Logic endpoint service

- The service name is provided by Sumo Logic and will accept the endpoint connection request once we know you initiated the connection.
- Select the VPC where the Sumo Logic collector will be installed or where HTTP requests will be made for HTTP Sources. <br/> ![create-endpoint.png](https://helpstaging.sumologic.com/@api/deki/files/12793/create-endpoint.png?revision=1)

## No VPC Peering

If the VPC is in the same [AWS region as your deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security), you don't need to set up VPC peering. Navigate to **Actions**, then select **Modify private DNS name**. <br/> ![endpoints.png](https://helpstaging.sumologic.com/@api/deki/files/12828/endpoints.png?revision=1)

Check the box to enable private DNS names.<br/> ![dns-checkbox.png](https://helpstaging.sumologic.com/@api/deki/files/12795/dns-checkbox.png?revision=2)

## VPC Peering

If the VPC is not in the same [AWS region as your deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security), you'll need to [set up VPC peering](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-peering.html).

1. Create the VPC peering connection between the region for the client-side VPC and the region where the Sumo Logic PrivateLink service is configured. <br/> ![peer-connection.png](https://helpstaging.sumologic.com/@api/deki/files/12796/peer-connection.png?revision=1)
2. Create a Route53 private hosted zone. Select the VPC peered in the region where our server-side region is located.<br/> ![hosted-zone.png](https://helpstaging.sumologic.com/@api/deki/files/12797/hosted-zone.png?revision=1)
3. With the created private hosted zone, add an **A** record. Select the peered VPC in region **us-west-2**, where the Sumo Logic server-side infrastructure is located.<br/> ![quickcreaterecord.png](https://helpstaging.sumologic.com/@api/deki/files/12829/quickcreaterecord.png?revision=1)
4. Add the other peered VPC in the other region into the Route53-hosted zone.
