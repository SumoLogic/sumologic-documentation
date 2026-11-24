---
title: Outbound Integrations
sidebar_label: Outbound Integrations
description: Learn how outbound integrations let Sumo Logic and Dojo AI agents send requests to third-party systems through APIs and Model Context Protocol (MCP) servers.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Outbound integrations connect Sumo Logic and Dojo AI agents to third-party systems through APIs and Model Context Protocol (MCP) servers. You can use them in playbook automation workflows and with Dojo AI agents. For an overview of outbound and inbound integrations, see [Integrations](/docs/integrations/integrations-overview/).

Outbound integrations are delivered in two ways:

- [Integrations via API](/docs/integrations/outbound/integrations-via-api/). Connect a service through its API. Each integration offers a fixed set of actions for use in playbooks.
- [Integrations via MCP](/docs/integrations/outbound/integrations-via-mcp-server/). Connect a tool through a Model Context Protocol (MCP) server. The server's tools become available automatically.

By default, the **Outbound Integrations** tab lists every integration, both those provided in the catalog and the custom integrations you added.

## Anatomy of an outbound integration card

Each card shows one integration. Select a card to open the integration. From there you can connect it, view its actions or tools, and manage its connections.

<img src={useBaseUrl('img/integrations/outbound-integrations-card-anatomy.png')} alt="integrations-tab" width="500" />

| | Integrations via API | Integrations via MCP |
|:--|:--|:--|
| | <img src={useBaseUrl('img/integrations/api-integration-card.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="300" /> | <img src={useBaseUrl('img/integrations/mcp-integration-card.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="500" /> |
| Logo and name | The vendor logo and name. | The vendor logo and name. |
| Description | A summary of what the integrations via API does. | A summary of what the integrations via MCP does. |
| Integration type | The **API** label on the integration card indicates integrations built and maintained by Sumo Logic for a specific vendor API. Each one offers a fixed set of actions for use in playbooks. | The **MCP** label on the integration card indicates integrations that connect to a server published by the vendor using MCP. The server's tools become available automatically. |
| Status | -**Installed**. An installation is configured. Cards with no badge are not installed.<br/> - **Upgrade Available**. If a newer version of a connected API integration is available, an Upgrade Available label appears in the top-right corner of the card. | - **Connected**. A connection is configured.<br/>- **Not connected**. Integrations in the catalog that you have not yet connected. |
| Operations | **Actions**. The number of actions an API integration provides. You add actions to playbooks. To view the Actions details, navigate to **App Catalog > Integrations > API integration card > What's Included**. {/* Image placeholder */} | **Tools**. The number of tools an MCP server provides per connection. Dojo AI agents use tools. To view the Tools details, navigate to **App Catalog > Integrations > MCP integration card > Connections > Tools**. {/* Image placeholder */} |

<!--
Some cards show the **Configure in Dojo AI** lable which opens Dojo AI, where you configure how agents use this integration. TO CONFIRM: exact behavior and which cards show it. */}

## Filters

{/* The three filter groups work independently. Within a group, selecting more than one value shows integrations that match any of them. {/* TO CONFIRM: any-of within a group, all-of across groups. */}

| Filter group | Value |
|:--|:--|
| Type | - **API Integration**. Displays integrations built and maintained by Sumo Logic for a specific vendor API.<br/>- **MCP Server**. Displays integrations that connect to a server published by the vendor using MCP. |
| Status | - **Connected**. Integrations that have a working connection configured in your organization.<br/>- **Not connected**. Integrations in the catalog that you have not yet connected. |
| Certification Type | - **Certified**. Integrations provided and maintained by Sumo Logic. Their code is read-only, and they can run in the cloud.<br/>- **Non-certified/Custom**. Integrations you added with **+ Add Custom**. Custom integrations are always non-certified. |
-->

## Add a custom integration

If the catalog does not include the tool you need, use the **+ Add Custom** dropdown in the top-right corner of the **Outbound Integrations** tab to create a custom integration.

1. In App Catalog, open the **Integrations** tab and select **Outbound Integrations**.
1. Click **+ Add Custom**.
1. Select **MCP Server** or **API Integration** from the dropdown.
1. Complete the setup that opens for the type you chose.
    - **MCP Server**. Connect your own MCP server as an integration. [Learn more](/docs/integrations/outbound/integrations-via-mcp-server/setup-integration-via-mcp/).
    - **API Integration**. Connect a service through its API. You will be redirected to the [Integrations](/docs/platform-services/automation-service/automation-service-integrations/#create-a-new-integration) page, where you can create a custom integration.

## Related topics

- [Installing and Upgrading Automation Integrations](/docs/integrations/outbound/integrations-via-api/install-automation-integrations/)
- [Configure Authentication for Automation Integrations](/docs/integrations/outbound/integrations-via-api/configure-authentication/)
- [Automation Service Integrations](/docs/platform-services/automation-service/automation-service-integrations/)
