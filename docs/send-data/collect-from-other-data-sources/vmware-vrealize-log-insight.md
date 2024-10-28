---
id: vmware-vrealize-log-insight
title: VMware vRealize Log Insight
description: This page shows you how to configure log collection for VMware vRealize Log Insight and then forward your logs to Sumo Logic. VMware vRealize Log Insight is a log management and analytics tool.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page shows you how to configure log collection for VMware vRealize Log Insight and then forward your logs to Sumo Logic. VMware vRealize Log Insight is a log management and analytics tool.

## Prerequisites

Before configuring log collection for vRealize, you must have completed the following:

 * Installed and configured [vRealize Log Insight](https://www.vmware.com/products/vrealize-log-insight.html) to retrieve logs from vCenter and ESXi hosts.

 * Installed a Sumo Logic collector on a VM (or an external machine), or rsyslog or syslog-ng, must be configured and reachable from the vRealize Log Insight host. To install a Sumo Logic collector, follow the [Installed Collectors](/docs/send-data/installed-collectors) instructions.

## Setting up vRealize Log Insight log collection

:::important
These instructions apply to vRealize Log Insight 8.0, may differ for earlier versions.
:::

To set up vRealize Log Insight log collection for Sumo Logic, do the following:

1. Sign in to vRealize Log Insight UI, and navigate to **Management > Event Forwarding**.<br/><img src={useBaseUrl('/img/send-data/vRealize_EventForwarding.png')} alt="vRealize_EventForwarding" style={{border: '1px solid gray'}} width="400"/>
1. Add a new connection by clicking **New Destination**.<br/><img src={useBaseUrl('/img/send-data/vRealize_New-Destination.png')} alt="vRealize_New-Destination" style={{border: '1px solid gray'}} width="600"/>
1. In the Edit Destination dialog, specify the following information. Optionally, you can also add additional tags and also filter the events on this popup.
   :::note
   Select the **Transport** type as **UDP** if you are handling multiple messages.
   :::
   <br/><img src={useBaseUrl('/img/send-data/vRealize_Edit-Destination.png')} alt="vRealize_Edit-Destination" style={{border: '1px solid gray'}} width="600"/>
1. **Test** and **Save** the connection.
1. Verify logs in Sumo Logic. The following is a sample log message of vRealize forwarded events.
   ```
   <167> 2019-12-15T13:08:16.441Z esxi1.esxlab.com Rhttpproxy: verbose rhttpproxy[2099567]
   [Originator@6876 sub=Proxy Req 07995] Resolved endpoint :
   [N7Vmacore4Http16LocalServiceSpecE:0x000000bef0b83650] _serverNamespace = /sdk action = Allow _port = 8307
   ```
