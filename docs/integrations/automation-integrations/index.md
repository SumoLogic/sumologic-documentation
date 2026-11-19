---
slug: /integrations/automation-integrations
title: Integrations
description: Learn about the Sumo Logic integrations.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Learn about the Sumo Logic integrations.

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Overview

The Integrations tab in App Catalog is where you browse, review, and add the integrations that connect Sumo Logic to other tools. Integrations listed here can be used across playbook automation workflows and Dojo AI Agents.

To open it, navigate to **App Catalog** and select the **Integrations** tab. The left navigation has two views:

- **Integration Catalog**. The Integration Catalog lists the out-of-the-box integrations Sumo Logic provides, including MCP integrations such as GitHub, Atlassian, AWS, and Slack. Each integration appears as a card.
- **Installed**. The Installed view lists every integration set up in your environment, such as, the MCP and installed integrations from the catalog, plus any custom integrations you have created. Examples include HTTP Tools, Atlassian Jira V2, and Atlassian Jira Cloud.

Under **Supports** in the left menu, select the checkboxes for the integrations you want to filter:
- [API Integration](/docs/integrations/automation-integrations/integrations-via-api/). Connect a service through its API.
- [MCP Server](/docs/integrations/automation-integrations/integrations-via-mcp-server/). Connect a tool through a Model Context Protocol (MCP) server.

### Find an integration

- Type in the search box at the top to filter the catalog by name or description.
- In the left panel, select API Integration or MCP Server to show only integrations of that type.

### Integration cards

| Element | Description |
|:--|:--|
| Logo and name	| Identifies the integration, for example GitHub or Slack. |
| Description | A short summary of what the integration lets you do, such as searching Jira issues or sending Slack messages. |
| Type tag | Shows how the integration works.<br/>- **MCP** marks integrations delivered through an MCP server.<br/>- **API** marks integrations delivered through API.  |
| Status badge | - **Connected** means the integration is connected through an MCP server and ready to use.<br/>- **Installed** means the integration is installed through an API in your environment.<br/>- **Upgrade Available** means that a newer version of an installed integration is available.<br/>- No badge means that the integration is available but not yet set up. |

### Add a custom integration

If the catalog doesn't include the tool you need, create a custom integration with the **+ Add Custom** dropdown at the top right of the Integrations tab.

To create one:
1. In App Catalog, open the **Integrations** tab.
1. Click **+ Add Custom**.
1. Select **MCP Server** or **API Integration** from the dropdown.
1. Complete the setup that opens for the type you chose.
1. Open Installed to confirm your custom integration is listed.

| Option | Use it to |
|:--|:--|
| MCP Server | Connect your own MCP server as an integration. [Learn more](/docs/integrations/automation-integrations/integrations-via-mcp-server/custom-integration-via-mcp) |
| API Integration | Connect a service through its API. This option opens in a separate page. [Learn more](/docs/integrations/automation-integrations/integrations-via-api/install-automation-integrations/#custom-integration) |

<DocCardList items={useCurrentSidebarCategory().items} />