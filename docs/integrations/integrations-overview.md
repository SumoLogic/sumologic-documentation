---
title: Integrations
sidebar_label: Integrations
description: Learn how outbound and inbound integrations connect Sumo Logic and Dojo AI agents to third-party tools for playbook automation and agent workflows.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Integrations connect Sumo Logic to other tools. You can use them across playbook automation workflows and with Dojo AI agents.

## Open the Integrations tab

The Integrations tab in App Catalog is where you browse, review, and add integrations.

To open the Integrations tab in the [new UI](/docs/get-started/sumo-logic-ui/), navigate to **App Catalog** and select **Integrations** in the main Sumo Logic menu. You can also click the **Go To...** menu at the top of the screen, search for **App Catalog**, and select **Integrations**.<br/><img src={useBaseUrl('img/integrations/integration-tab.png')} alt="Integrations tab in App Catalog" style={{border: '1px solid gray'}} width="700" />

## Outbound and inbound integrations

Integrations are split into two groups, based on which side starts the request.

<img src={useBaseUrl('img/integrations/integrations-flowchart.png')} alt="Integrations tab in App Catalog" width="700" />

| Integration | Description |
|:--|:--|
| [Outbound Integrations](/docs/integrations/outbound/) | Outbound integrations connect Sumo Logic and Dojo AI agents to third-party systems through APIs and MCP integrations. These integrations can be used across playbook automation workflows and Dojo AI agents. |
| [Inbound Integrations](/docs/integrations/inbound/) | Inbound integrations let third party systems connect to Sumo Logic and use it's capabilities. |

Outbound integrations are delivered in two ways:

- [Integrations via API](/docs/integrations/outbound/integrations-via-api/). Connect a service through its API. Each integration offers a fixed set of actions for use in playbooks.
- [Integrations via MCP](/docs/integrations/outbound/integrations-via-mcp-server/). Connect a tool through a Model Context Protocol (MCP) server. The server's tools become available automatically.

Some tools appear in both groups. For example, Slack (API) under Outbound lets playbooks post messages and search Slack. The Sumo Logic Slack Extension under Inbound lets you talk to Mobot in Slack.

## Related topics

- [Installing and Upgrading Automation Integrations](/docs/integrations/outbound/integrations-via-api/install-automation-integrations/)
- [Configure Authentication for Automation Integrations](/docs/integrations/outbound/integrations-via-api/configure-authentication/)
- [Automation Service Integrations](/docs/platform-services/automation-service/automation-service-integrations/)
