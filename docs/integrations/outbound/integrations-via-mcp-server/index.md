---
title: Integrations via MCP
sidebar_label: Integrations via MCP
sidebar_position: 2
description: Learn about the Sumo Logic integrations delivered through Model Context Protocol (MCP) servers, and how to connect your own MCP server.
---

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

MCP integrations connect Sumo Logic to other tools through Model Context Protocol (MCP) servers. The tools a server offers become available automatically. You can use them across playbook automation workflows and with Dojo AI agents.

You can add a server from the catalog, where Sumo Logic has pre-filled the URL and sign-in methods. To connect your own MCP server, add a custom MCP Server integration from the Integrations tab in App Catalog. To learn more, see [Set up an integration via MCP server](/docs/integrations/outbound/integrations-via-mcp-server/setup-integration-via-mcp/).

The catalog includes these MCP servers:

- [Atlassian](/docs/integrations/outbound/integrations-via-mcp-server/atlassian-mcp/)
- [AWS](/docs/integrations/outbound/integrations-via-mcp-server/aws-mcp/)
- [AWS DevOps Agent](/docs/integrations/outbound/integrations-via-mcp-server/aws-devops-agent-mcp/)
- [GitHub](/docs/integrations/outbound/integrations-via-mcp-server/github-mcp/)
- [Slack](/docs/integrations/outbound/integrations-via-mcp-server/slack-mcp/)

<DocCardList items={useCurrentSidebarCategory().items} />
