---
id: mcp-server-client-setup
title: Set Up MCP Clients for Sumo Logic
sidebar_label: Client Setup Guides
description: Connect GitHub Copilot, Claude Code, Kiro, and other AI clients to the Sumo Logic MCP server with the Sumo Logic plugin, or set up a client manually.
keywords:
  - mcp server
  - mcp client
  - sumo logic plugin
  - github copilot
  - claude code
  - kiro
  - sumo investigator
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/mcp-server.png')} alt="MCP server icon" width="45"/>

Connect your AI client to the [Sumo Logic MCP server](/docs/api/mcp-server) to query logs, review Cloud SIEM insights, and run [Mobot](/docs/api/mobot-in-mcp-server) investigations without leaving your IDE or terminal. The Sumo Logic plugin is the recommended setup path. It connects the client to the MCP server and adds the sumo-investigator skill, which guides the client through log searches, alerts, insights, and dashboards.

## Before you begin

You need:

- The MCP server URL for your deployment. See [MCP server URL for your deployment](/docs/api/mcp-server#mcp-server-url-for-your-deployment).
- An administrator to [enable CIMD](/docs/api/mcp-server#how-to-enable-cimd-for-mcp-clients) for your org, which clients use to authenticate with OAuth 2.0. You do not need to create OAuth credentials.
- A Sumo Logic account. The plugin does not require the Administrator role.

## Choose a setup path

| Client | Setup path | Plugin or connector |
| :----- | :--------- | :------------------ |
| GitHub Copilot (VS Code and CLI) | [Plugin](#set-up-github-copilot) | `sumo-logic` |
| Claude Code and Claude Cowork | [Plugin](#set-up-claude-code-and-claude-cowork) | `sumologic-mcp` |
| Kiro | [Power](#set-up-kiro) | Sumo Logic power |
| Cursor, Codex, and other MCP clients | [Manual setup](#set-up-other-clients) | None. Plugins for Cursor and Codex are coming soon. |

## Set up GitHub Copilot

The Sumo Logic plugin works with both the Copilot extension for VS Code and the Copilot CLI.

### Install the plugin

- **VS Code**. Open the **Extensions** activity bar, enter `@agentPlugins sumo-logic` in the search box, select the Sumo Logic plugin, and click **Install**.
- **Copilot CLI**. Run the following command:
  ```bash
  copilot plugin install sumo-logic@awesome-copilot
  ```

### Connect to your deployment

1. In Copilot chat, run `/sumosetup`.
1. Select your Sumo Logic deployment when prompted. The plugin configures the MCP server with the matching endpoint.
1. Reload the MCP server. In VS Code, open the Command Palette, run **MCP: List Servers**, and restart the `sumo-logic` server. In the Copilot CLI, restart the session.
1. When the server connects, a browser window opens. Log in with your Sumo Logic credentials. If your org uses an identity provider, click **Sign in with your identity provider**.
1. Ask a question such as `Show me error logs from the last hour` to verify the connection.

To invoke the investigation skill directly, use `/sumo-investigator`, for example:

```
/sumo-investigator what errors are happening in the API gateway?
```

## Set up Claude Code and Claude Cowork

### Install the plugin

- **Claude Code**. Run `/plugins`, search for `sumologic-mcp`, and install it.
- **Claude Cowork**. Select **Customize** > **Plugins** > **Discover**, search for `sumologic-mcp`, and add it.

When you first enable the plugin, you are prompted for your MCP server URL. Use the URL for your deployment from the [deployment URL table](/docs/api/mcp-server#mcp-server-url-for-your-deployment).

### Authenticate

1. Launch Claude Code with the plugin installed.
1. Run `/mcp`.
1. Select **sumo-logic** > **Authenticate**.
1. In the browser window that opens, log in with your Sumo Logic credentials. If your org uses an identity provider, click **Sign in with your identity provider**.
1. Run `/mcp` again to confirm that **sumo-logic** shows as connected.

To connect to a different Sumo Logic org, see [How to switch Sumo Logic organizations](/docs/api/mcp-server#how-to-switch-sumo-logic-organizations).

<details>
<summary>Set up Claude Code manually without the plugin</summary>

If you cannot use the plugin, register the MCP server directly. Replace `<MCP-server-URL>` with the [URL for your deployment](/docs/api/mcp-server#mcp-server-url-for-your-deployment).

1. In a terminal, register the server for all directories:
   ```bash
   claude mcp add --scope user --transport http \
     sumo-logic "<MCP-server-URL>"
   ```
   To register it for the current directory only, use `--scope project` instead.
1. Launch Claude Code, run `/mcp`, and select **sumo-logic** > **Authenticate**.
1. Install the [sumo-investigator skill](/docs/api/mcp-server#improve-investigations-with-the-sumo-investigator-skill) so Claude Code can route investigative questions.

For more detail, see [How to configure the MCP server in Claude Code CLI](/docs/api/mcp-server#how-to-configure-the-mcp-server-in-claude-code-cli).

</details>

### Use the plugin

Invoke the investigation skill with a question:

```
/sumologic-mcp:sumo-investigator what errors are happening in the API gateway in the last hour?
```

You can also ask in plain language, and Claude calls the MCP tools directly:

```
Show me critical security insights from this week
```

## Set up Kiro

Kiro uses a Sumo Logic power, which is built to the [Agent Plugins](https://agent-plugins.org/) specification.

### Install the power

1. In Kiro, open the **Powers** panel and select **Add Custom Power** > **Import power from GitHub**.
1. Enter the repository URL `https://github.com/SumoLogic/sumologic-ai-plugins`.

### Connect to your deployment

1. Ask Kiro to set up Sumo Logic. The built-in `sumosetup` skill asks which deployment you use and adds a `sumo-logic` server to your Kiro MCP settings.
1. If Kiro cannot edit the settings file, add the following entry under the top-level `mcpServers` key in `~/.kiro/settings/mcp.json`. Replace `<mcp-domain>` with the domain for your deployment, for example `mcp.sumologic.com`. If your org uses a [subdomain](/docs/api/mcp-server#how-to-use-your-org-subdomain-in-the-mcp-server-url), add it to the front of the domain in both URLs.
   ```json
   "sumo-logic": {
     "url": "https://<mcp-domain>/mcp",
     "oauth": {
       "clientMetadataUrl": "https://<mcp-domain>/oauth/kiro-client-metadata",
       "redirectUri": "http://localhost:8890/oauth/callback"
     }
   }
   ```
1. Save the file. The `sumo-logic` server appears in the Kiro MCP Servers panel within a few seconds.
1. In the browser window that opens, log in with your Sumo Logic credentials. If no window opens, select the **sumo-logic** server in the MCP Servers panel and click **Authenticate**.
1. Ask a question such as `Show me recent error logs` to verify the connection.

:::note
Kiro also lists a second server whose name starts with `power-` and ends with `-sumo-logic`. It shows as failed because Kiro powers cannot declare OAuth settings. Ignore or disable it. The `sumo-logic` server you added is the one that connects.
:::

To switch deployments, clear the stored authentication for the `sumo-logic` server in the Kiro MCP Servers panel, and then run setup again.

## Set up other clients

For a client without a Sumo Logic plugin, such as Cursor or Codex, connect to the MCP server manually and install the skill file yourself:

1. Register the MCP server in your client. See [How to configure the MCP server in Claude Code CLI](/docs/api/mcp-server#how-to-configure-the-mcp-server-in-claude-code-cli) for an example, and use the [URL for your deployment](/docs/api/mcp-server#mcp-server-url-for-your-deployment).
1. Download and install the sumo-investigator skill. See [Improve investigations with the sumo-investigator skill](/docs/api/mcp-server#improve-investigations-with-the-sumo-investigator-skill).

Plugins for Cursor and Codex are coming soon.

If your client does not support CIMD, see [How to set up MCP without CIMD](/docs/api/mcp-server#how-to-set-up-mcp-without-cimd).

## Troubleshooting

### Authentication does not start or fails

#### Cause

Your org has not enabled CIMD, or your client does not support it.

#### Resolution

1. Ask an administrator to [enable CIMD](/docs/api/mcp-server#how-to-enable-cimd-for-mcp-clients).
1. If your client does not support CIMD, [set up MCP without CIMD](/docs/api/mcp-server#how-to-set-up-mcp-without-cimd).

### Kiro shows a failed server or an Incompatible auth server error

#### Symptom

Kiro lists a server whose name starts with `power-` and shows `Failed to connect: Incompatible auth server: does not support dynamic client registration`.

#### Cause

Kiro does not let a power declare OAuth settings, and Kiro's built-in OAuth client supports only dynamic client registration. The Sumo Logic MCP server requires CIMD, so the power's own server entry cannot connect.

#### Resolution

Use the `sumo-logic` server that setup adds to your Kiro MCP settings, and ignore or disable the `power-` entry. If `sumo-logic` is missing, add it as described in [Set up Kiro](#set-up-kiro).

### Tools are missing from your client

#### Cause

Your client lists only the tools that your role allows. If your role does not include a capability, the matching tools do not appear.

#### Resolution

Confirm that your role includes the capability each tool requires. See [What MCP tools are available?](/docs/api/mcp-server#what-mcp-tools-are-available).

### You connect to the wrong deployment

#### Cause

OAuth tokens are bound to a single Sumo Logic deployment, so a client that authenticated against one deployment cannot use the URL for another.

#### Resolution

Clear the client's stored authentication for the `sumo-logic` server, and then authenticate again against the correct MCP server URL. See [How to switch Sumo Logic organizations](/docs/api/mcp-server#how-to-switch-sumo-logic-organizations).

For other errors, such as `401 Request blocked by IP allowlist policy`, see [Troubleshooting](/docs/api/mcp-server#troubleshooting) on the MCP server page.

## Additional resources

- [Sumo Logic MCP Server](/docs/api/mcp-server)
- [Mobot in the MCP Server](/docs/api/mobot-in-mcp-server)
- [OAuth Client Setup](/docs/manage/security/oauth)
