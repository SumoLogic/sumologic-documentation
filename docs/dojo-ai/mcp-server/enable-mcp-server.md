---
id: enable-mcp-server
title: Enable the MCP Server
sidebar_label: Enable the MCP Server ✨
description: Turn on MCP server access for your organization in Feature Management and enable CIMD so MCP clients can authenticate.
keywords:
  - feature management
  - mcp server
  - cimd
  - oauth
  - administrator
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import MSSPfeatureMgmt from '../../reuse/mssp-feat-mgmt.md';

An administrator must enable MCP server access for your organization before MCP clients can connect. MCP server access is on by default. CIMD, the recommended way for MCP clients to authenticate, is off by default and is enabled separately on the **Policies** page. After both are set, see [Connect an MCP Client](/docs/dojo-ai/mcp-server/connect-mcp-client).

## Enable or disable the MCP server

MCP server access is enabled by default. An administrator can turn it on or off for your entire organization. For the other AI toggles and for auditing, see [Feature Management](/docs/dojo-ai/about/#feature-management).

1. In the main Sumo Logic menu, select **Administration** > **Feature Management**.
1. In the **MCP Server access** row, use the **Enabled** toggle to turn the MCP server on or off.<br/><img src={useBaseUrl('img/api/mcp/mcp-feature-management.png')} alt="Feature Management page showing the AI features, MCP Server access, and SOC Analyst Agent toggles" style={{border: '1px solid gray'}} width="800" />

<MSSPfeatureMgmt/>

Enabling MCP Server access makes the server available for connection. Clients still authenticate with OAuth 2.0, and CIMD is enabled separately on the Policies page. See [How to enable CIMD for MCP clients](#how-to-enable-cimd-for-mcp-clients).

Disabling the MCP server prevents MCP clients from connecting, but does not delete any data. MCP Server access is a separate setting from the **AI features** toggle, which governs Mobot and Parse Assist, and from the **SOC Analyst Agent** toggle, so you can enable or disable the MCP server independently of those capabilities.

## How to enable CIMD for MCP clients

CIMD is the recommended authentication mechanism for MCP clients and is disabled by default. An administrator needs to enable it for your organization before clients can authenticate.

1. In the main Sumo Logic menu, select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**.
1. Select the **Enable CIMD Clients** check box.<br/><img src={useBaseUrl('img/api/mcp/enable-cimd-policies.png')} alt="Policies page showing the Enable CIMD Clients and Restrict to pre-registered clients only check boxes selected under OAuth Clients" style={{border: '1px solid gray'}} width="800" />

To allow only specific MCP clients, select **Restrict to pre-registered clients only** under **OAuth Clients**, and then manually create a CIMD client for each MCP client you want to allow. For steps and CIMD URLs for common clients, see [Manually create a CIMD client](/docs/manage/security/oauth#manually-create-a-cimd-client).

For how Sumo Logic implements OAuth 2.0 and CIMD in more detail, see [OAuth Client Setup](/docs/manage/security/oauth#enable-cimd).
