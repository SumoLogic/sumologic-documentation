---
id: create-use-network-blocks
title: Create and Use Network Blocks
sidebar_label: Network Blocks
description: A Network Block is a CIDR block of IP addresses from your infrastructure that you label to provide context that can be leveraged in rules and is helpful in investigating CSE Insights.
---

This topic describes *Network Blocks* and their purpose, and provides instructions for setting them up and using them.

:::note
If all you need to know is what enrichment fields CSE adds to Records that contain IP addresses in Network Blocks, you can jump to [Network Blocks and enrichment fields](#network-blocks-and-enrichment-fields) below.
:::

In CSE, a Network Block is a CIDR block of IP addresses from your infrastructure that you label to provide context that can be leveraged in rules and is helpful in investigating Insights. For example, you could label one Network Block “Server Network” and another one “Workstations”.

In addition to labeling a Network Block, you can optionally mark a Network Block as “Internal”.

:::note
There is another way that IP addresses get marked as “Internal”. CSE automatically marks RFC 1918 IP addresses, which aren’t routable on the Internet, as “Internal”.
:::

When you configure a Network Block, there is an option to suppress Signals on the IP addresses within the block.

:::note
IP addresses in a Network Block for which Signals are suppressed will not appear on the **Suppressed Entities** page in the CSE UI. (You can’t manually unsuppress Signals for an IP address that are suppressed due to its Network Block configuration.)
:::

## Best practices for Network Blocks

As you configure Network Blocks, keep in mind the following
considerations.

Ideally, you should use Network Blocks to represent your topology both
broadly and thoroughly. Any network address space that is in use should
be accounted for at some level of detail. Broad descriptions of
supernets that cover all allocated addresses are a start. Coupling a
broad view with a detailed inventory is preferable. If you have address
space that’s in use but not reflected in your Network Block
configuration, associated traffic won’t be evaluated by rules, and
problems might not be detected.

It’s good to define Network Blocks at both high and detailed levels. For
example, you might want to define one high level block for your
corporate network and another for your partner network, and also
smaller, more detailed subnets within each. Nesting your Network Blocks
provides more context. For critical assets that are static over time, it
can even be useful to include /32 addresses. 

Keep the labels you assign to Network Blocks short and sweet. Don’t
include the CIDR block itself in the label. For example, instead of
“Seattle Office 10.191.64.0/18” for a label, use “Seattle Office”.

## Overlapping Network Blocks

In the case that the two or more Network Blocks overlap, CSE uses the
smallest, most-specific block that matches the the IP address that's
being looked up. For example, given these two Network Blocks:

* `10.0.0.0/8` with Label "foo"
* `10.0.10./24` with Label "bar"

When CSE looks for the Network Block the address `10.0.10.1`, it will return the more-specific block, "bar".

## Create a Network Block manually

Follow these instructions to create a Network Block using the CSE UI. For information about creating multiple Network Blocks by file upload, see [Upload a CSV file of Network Blocks](#upload-a-csv-file-of-network-blocks).

1. Choose **Network Blocks** from the Content menu.  
    ![content-network-blocks.png](/img/cse/content-network-blocks.png)
1. On the **Create Network Block** popup:
    1. **Address Block**. Enter a CIDR block that identifies a contiguous range of IP addresses.
    1. **Label**. Enter a meaningful name for the Network Block.
    1. **Internal**. Leave the toggle switched to the right (green) if you want to mark IP addresses that match the network block as Internal. This allows you to filter on the IP addresses in rule expressions, as described below in [Using enrichment fields](#using-enrichment-fields), below.
    1. **Suppress Signals**. Leave the toggle switched to the left (red) if you don't want to suppress Signals on IP addresses in the Network Block. Otherwise, switch the toggle to the right (green).
    1. Click **Create**.  
        ![create-network-block.png](/img/cse/create-network-block.png)

## Upload a CSV file of Network Blocks

You can define multiple Network Blocks in a .csv file and upload the file to CSE.

The table below defines the fields you can import for a Network Block.

| Field | Description |
|:--|:--|
| `address_block` | The IP address and subnet mask of the network block. For example:<br/>192.168.10.0/24 |
| `label` | (Optional) A label of the network block (e.g. PCI network). If the label contains a comma, enclose it in double quotes (“). |
| `internal` | (Optional) When true, all IPs matching this network block in the records will be marked as internal.<br/>Default: true |
| `suppresses_signals` | (Optional) When true, all Signals for IPs in this network block will be suppressed, so that Insights are not generated based on those Signals.<br/>Default: false |

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

## Network Blocks and enrichment fields

The Label you assign to a Network Block is stored in an enrichment field that CSE adds to each Record that contains an IP address in that block. Similarly, an enrichment field is added to each Record that contains an IP address in a Network Block that is marked Internal. 

In the table below, the left column contains schema fields that contain IP addresses. The middle column contains the enrichment fields that are added to Records based on Network Block configuration. The enrichment fields in the middle column, which end in `_location`, are populated with the Label from a Network Block. Those in the rightmost column, which end in `_isInternal`, are populated with “yes”, indicating that the IP address is in a Network Block marked Internal. 

| IP address field | _location enrichment field | _isInternal enrichment field |
|:--|:--|:--|
| `device_ip` | `device_ip_location` | `device_ip_isInternal` |
| `device_natIp` | `device_natIp_location` | `device_natIp_isInternal` |
| `dns_replyIp` | `dns_replyIp_location` | `dns_replyIp_isInternal` |
| `dstDevice_ip` | `dstDevice_ip_location` | `dstDevice_ip_isInternal` |
| `dstDevice_natIp` | `dstDevice_natIp_location` | `dstDevice_natIp_isInternal` |
| `srcDevice_ip `| `srcDevice_ip_location` | `srcDevice_ip_isInternal` |
| `srcDevice_natIp`	 | `srcDevice_natIp_location` | `srcDevice_natIp_isInternal` |

The screenshot below shows a Record that contains several Network Block-related enrichment fields. Note that:

* `dstDevice_ip_isInternal` and `srcDevice_ip_isInternal` indicate that the `dstDevice_ip` and `srcDevice_ip` are both in Network Blocks that are marked Internal.
* `srcDevice_ip_location` indicates that `srcDevice_ip` is in the “test_internal” Network Block.

![record.png](/img/cse/record.png)

## Using enrichment fields

You can use the `*_location` and `*_isInternal` fields the same way you do other Record fields. You can use them to filter Records in rule expressions or in searches. 
