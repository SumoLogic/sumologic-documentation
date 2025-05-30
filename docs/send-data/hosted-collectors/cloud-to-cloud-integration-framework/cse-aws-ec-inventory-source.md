---
id: cse-aws-ec-inventory-source
title: Cloud SIEM AWS EC2 Inventory Source
sidebar_label: Cloud SIEM AWS EC2 Inventory
tags:
  - cloud-to-cloud
  - cse-aws-ec-inventory
description: The Cloud SIEM AWS EC2 Inventory Source provides a secure endpoint to receive event data from the EC2 describe instances API.
---

import React from 'react';

import useBaseUrl from '@docusaurus/useBaseUrl';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';

export function Examples() {
  const [examples, setExamples] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      fetch(useBaseUrl('/files/c2c/cse-aws-ec-inventory/example1.json')).then(res => res.text()),
      fetch(useBaseUrl('/files/c2c/cse-aws-ec-inventory/example2.json')).then(res => res.text()),
      fetch(useBaseUrl('/files/c2c/cse-aws-ec-inventory/example1.tf')).then(res => res.text()),
      fetch(useBaseUrl('/files/c2c/cse-aws-ec-inventory/example2.tf')).then(res => res.text()),
    ]).then(([json1, json2, tf1, tf2]) => {
      setExamples([
        { title: 'Example 1', json: json1, tf: tf1 },
        { title: 'Example 2', json: json2, tf: tf2 },
      ]);
    });
  }, []);

  return (
    <>
      {examples.map((ex, i) => (
        <React.Fragment key={i}>
          <h3>{ex.title} - JSON</h3>
          <CodeBlock language="json">{ex.json}</CodeBlock>
          <a href={useBaseUrl(`/files/c2c/cse-aws-ec-inventory/example${i + 1}.json`)} target="_blank" rel="noopener noreferrer">
            Download JSON
          </a>

          <h3>{ex.title} - Terraform</h3>
          <CodeBlock language="hcl">{ex.tf}</CodeBlock>
          <a href={useBaseUrl(`/files/c2c/cse-aws-ec-inventory/example${i + 1}.tf`)} target="_blank" rel="noopener noreferrer">
            Download Terraform
          </a>
        </React.Fragment>
      ))}
    </>
  );
}

<img src={useBaseUrl('img/send-data/aws-ec2.svg')} alt="icon" width="50"/>

The Cloud SIEM AWS EC2 Inventory Source provides a secure endpoint to receive event data from the [EC2 describe instances API](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html). It securely stores the required authentication, scheduling, and state tracking information.

For information on how inventory data is used in Cloud SIEM, see [Inventory Sources and Data](/docs/cse/administration/inventory-sources-and-data.md).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 10 hours | [Event data](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html) |

## Setup

### Vendor configuration

#### Inventory data mapped

| Cloud SIEM schema attribute | AWS source field |
| :-- | :-- |
| `ip` | `PublicIpAddress`. If null, then `PrivateIpAddress` |
| `hostname` | `PublicDnsName`. If null, then `PrivateDnsName` |
| `uniqueId` | `AccountId` from `ARN-InstanceId` |

#### Authentication

The [IAM policy](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-for-amazon-ec2.html) needs the `ec2:DescribeInstances` and `ec2:DescribeImages` permissions.

### Source configuration

When you create a Cloud SIEM AWS EC2 Inventory Source, you add it to a Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Cloud SIEM AWS EC2 Inventory Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic) > **Manage Data > Collection > Collection**.  
   [**New UI**](/docs/get-started/sumo-logic-ui) > **Configuration > Data Collection > Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Select **AWS EC2 Inventory**.
1. Enter a **Name** for the Source. Description is optional.
1. (Optional) For **Source Category**, enter a string to tag the output.
1. **Forward to SIEM**. Check the box to forward data to [Cloud SIEM](/docs/cse/). <ForwardToSiem/>
1. (Optional) **Fields.** Click **+Add Field** to define fields (name and value).
1. **AWS Access**. Choose role-based or key-based authentication:
   - **Role Based Access**: Provide AWS Role ARN.  
     <img src={useBaseUrl('/img/send-data/role-based.png')} alt="role-based" style={{border: '1px solid gray'}} width="400"/>
   - **Key Access**: Provide access key ID and secret key.  
     <img src={useBaseUrl('/img/send-data/key-based.png')} alt="key-based" style={{border: '1px solid gray'}} width="400"/>
1. **Regions**. List AWS regions to query, such as `us-east-2`.
1. (Optional) Adjust **Polling Interval** (default is 600 minutes).
1. (Optional) Add **Processing Rules** like allowlist or mask.
1. Click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Amazon` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `AWS EC2 Inventory` | Set when **Forward To SIEM** is checked. |
| `_siemDataType` | `Inventory` | Set when **Forward To SIEM** is checked. |

## JSON and Terraform examples

<Examples />

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
