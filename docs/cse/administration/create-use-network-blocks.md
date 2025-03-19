---
id: create-use-network-blocks
title: Create and Use Network Blocks
sidebar_label: Network Blocks
description: A network block is a CIDR block of IP addresses from your infrastructure that you label to provide context that can be leveraged in rules and is helpful in investigating Cloud SIEM insights.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes *network blocks* and their purpose, and provides instructions for setting them up and using them.

:::note
If all you need to know is what enrichment fields Cloud SIEM adds to Records that contain IP addresses in network blocks, you can jump to [Network blocks and enrichment fields](#network-blocks-and-enrichment-fields) below.
:::

In Cloud SIEM, a network block is a CIDR block of IP addresses from your infrastructure that you label to provide context that can be leveraged in rules and is helpful in investigating insights. For example, you could label one network block “Server Network” and another one “Workstations”.

In addition to labeling a network block, you can optionally mark a network block as “Internal”.

:::note
There is another way that IP addresses get marked as “Internal”. Cloud SIEM automatically marks RFC 1918 IP addresses, which aren’t routable on the Internet, as “Internal”.
:::

When you configure a network block, there is an option to suppress signals on the IP addresses within the block.

:::note
IP addresses in a network block for which signals are suppressed will not appear on the **Suppressed Entities** page in the Cloud SIEM UI. (You can’t manually unsuppress signals for an IP address that are suppressed due to its network block configuration.)
:::

## Best practices for network blocks

As you configure network blocks, keep in mind the following considerations.

Ideally, you should use network blocks to represent your topology both broadly and thoroughly. Any network address space that is in use should be accounted for at some level of detail. Broad descriptions of supernets that cover all allocated addresses are a start. Coupling a broad view with a detailed inventory is preferable. If you have address space that’s in use but not reflected in your network block configuration, associated traffic won’t be evaluated by rules, and problems might not be detected.

It’s good to define network blocks at both high and detailed levels. For example, you might want to define one high level block for your corporate network and another for your partner network, and also smaller, more detailed subnets within each. Nesting your network blocks provides more context. For critical assets that are static over time, it can even be useful to include /32 addresses. 

Keep the labels you assign to network blocks short and sweet. Don’t include the CIDR block itself in the label. For example, instead of “Seattle Office 10.191.64.0/18” for a label, use “Seattle Office”.

## Overlapping network blocks

In the case that the two or more network blocks overlap, Cloud SIEM uses the smallest, most-specific block that matches the IP address that's being looked up. For example, given these two network blocks:

* `10.0.0.0/8` with Label "EC2 Internal"
* `10.128.0.0/24` with Label "WebServer IPs"

When Cloud SIEM looks for the network block address `10.128.0.1`, it will return the more-specific block, "WebServer IPs".

## Create a network block manually

Follow these instructions to create a network block using the Cloud SIEM UI. For information about creating multiple network blocks by file upload, see [Upload a CSV file of network blocks](#upload-a-csv-file-of-network-blocks).

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Network Blocks**.  <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > Network Blocks**. You can also click the **Go To...** menu at the top of the screen and select **Network Blocks**.
1. Click **Add Network Block**.
1. On the **Add Network Block** popup:
    1. **Address Block**. Enter a CIDR block that identifies a contiguous range of IP addresses.
    1. **Label**. Enter a meaningful name for the network block.
    1. **Internal**. Leave the toggle switched to the right (green) if you want to mark IP addresses that match the network block as Internal. This allows you to filter on the IP addresses in rule expressions, as described below in [Using enrichment fields](#using-enrichment-fields), below.
    1. **Suppress Signals**. Leave the toggle switched to the left (red) if you do not want to suppress signals on IP addresses in the network block. Otherwise, switch the toggle to the right (green).
    1. Click **Save**. <br/><img src={useBaseUrl('img/cse/create-network-block.png')} alt="Create network block" style={{border: '1px solid gray'}} width="400"/>

## Upload a CSV file of network blocks

You can define multiple network blocks in a .csv file and upload the file to Cloud SIEM.

The table below defines the fields you can import for a network block.

| Field | Description |
|:--|:--|
| `address_block` | The IP address and subnet mask of the network block. For example:<br/>192.168.10.0/24 |
| `label` | (Optional) A label of the network block (e.g. PCI network). If the label contains a comma, enclose it in double quotes (“). |
| `internal` | (Optional) When true, all IPs matching this network block in the records will be marked as internal.<br/>Default: true |
| `suppresses_signals` | (Optional) When true, all signals for IPs in this network block will be suppressed, so that insights are not generated based on those signals.<br/>Default: false |

Here is an example of a file in which all fields are supplied:

```
address_block,label,internal,suppresses_signals 
10.0.5.0/24,”Internal Block”,true,false
```

Here is an example of a file in which only the required field, `address_block`, is specified:

```
address_block 
192.168.10.0/24
```

## Network blocks and enrichment fields

The Label you assign to a network block is stored in an enrichment field that Cloud SIEM adds to each record that contains an IP address in that block. Similarly, an enrichment field is added to each record that contains an IP address in a network block that is marked Internal. 

In the table below, the left column contains schema fields that contain IP addresses. The middle column contains the enrichment fields that are added to records based on network block configuration. The enrichment fields in the middle column, which end in `_location`, are populated with the Label from a network block. Those in the rightmost column, which end in `_isInternal`, are populated with “yes”, indicating that the IP address is in a network block marked Internal. 

| IP address field | _location enrichment field | _isInternal enrichment field |
|:--|:--|:--|
| `device_ip` | `device_ip_location` | `device_ip_isInternal` |
| `device_natIp` | `device_natIp_location` | `device_natIp_isInternal` |
| `dns_replyIp` | `dns_replyIp_location` | `dns_replyIp_isInternal` |
| `dstDevice_ip` | `dstDevice_ip_location` | `dstDevice_ip_isInternal` |
| `dstDevice_natIp` | `dstDevice_natIp_location` | `dstDevice_natIp_isInternal` |
| `srcDevice_ip `| `srcDevice_ip_location` | `srcDevice_ip_isInternal` |
| `srcDevice_natIp`	 | `srcDevice_natIp_location` | `srcDevice_natIp_isInternal` |

<!-- Can't reproduce the screenshot

The screenshot below shows a record that contains several network block-related enrichment fields. Note that:

* `dstDevice_ip_isInternal` and `srcDevice_ip_isInternal` indicate that the `dstDevice_ip` and `srcDevice_ip` are both in network blocks that are marked Internal.
* `srcDevice_ip_location` indicates that `srcDevice_ip` is in the “test_internal” network block.

<img src={useBaseUrl('img/cse/record.png')} alt="Example enrichment fields" style={{border: '1px solid gray'}} width="600"/>

-->

## Using enrichment fields

You can use the `*_location` and `*_isInternal` fields the same way you do other record fields. You can use them to filter records in rule expressions or in searches. 
