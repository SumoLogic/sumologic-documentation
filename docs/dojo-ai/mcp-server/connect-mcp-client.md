---
id: connect-mcp-client
title: Connect an MCP Client
sidebar_label: Connect an MCP Client ✨
description: Find your deployment's MCP server URL and connect Claude Code or another MCP client to Sumo Logic.
keywords:
  - mcp server
  - claude code
  - cimd
  - oauth
  - mcp client
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

Connect Claude Code or another MCP-compatible client to the Sumo Logic MCP server. Before you start, an administrator must [enable the MCP server and CIMD](/docs/dojo-ai/mcp-server/enable-mcp-server) for your organization.

## Prerequisites

To get started with the Sumo Logic MCP server, you'll need the following:

### MCP server URL for your deployment

You need the exact MCP server URL that matches your deployment, because OAuth tokens are bound to a single Sumo Logic deployment:

| Deployment | MCP Server URL |
| :--- | :--- |
| Asia Pacific (Seoul) | `https://mcp.kr.sumologic.com/mcp` |
| Asia Pacific (Sydney) | `https://mcp.au.sumologic.com/mcp` |
| Asia Pacific (Tokyo) | `https://mcp.jp.sumologic.com/mcp` |
| Canada (Central) | `https://mcp.ca.sumologic.com/mcp` |
| Europe (Frankfurt) | `https://mcp.de.sumologic.com/mcp` |
| Europe (Ireland) | `https://mcp.eu.sumologic.com/mcp` |
| US East (N. Virginia) | `https://mcp.sumologic.com/mcp` |
| US East (N. Virginia) - FedRAMP | `https://mcp.fed.sumologic.com/mcp` |
| US West (Oregon) | `https://mcp.us2.sumologic.com/mcp` |

:::note
The MCP server is not currently supported in our Zurich or AWS European Sovereign Cloud deployments.
:::

### How to use your org subdomain in the MCP server URL

Add your org's [subdomain](/docs/manage/manage-subscription/create-and-manage-orgs/manage-org-settings/#set-up-a-customsubdomain) to the front of the MCP server URL so MCP clients that authenticate with [CIMD](/docs/dojo-ai/mcp-server/enable-mcp-server#how-to-enable-cimd-for-mcp-clients) go straight to your org's login page instead of asking users to enter the subdomain first. This can be useful if your org signs in with SAML on a subdomain.

To build the URL, add `<subdomain>.` before the host name in your deployment's URL from the [table above](#mcp-server-url-for-your-deployment):

| Deployment URL | URL with subdomain |
| :--- | :--- |
| `https://mcp.kr.sumologic.com/mcp` | `https://<subdomain>.mcp.kr.sumologic.com/mcp` |
| `https://mcp.au.sumologic.com/mcp` | `https://<subdomain>.mcp.au.sumologic.com/mcp` |
| `https://mcp.jp.sumologic.com/mcp` | `https://<subdomain>.mcp.jp.sumologic.com/mcp` |
| `https://mcp.ca.sumologic.com/mcp` | `https://<subdomain>.mcp.ca.sumologic.com/mcp` |
| `https://mcp.de.sumologic.com/mcp` | `https://<subdomain>.mcp.de.sumologic.com/mcp` |
| `https://mcp.eu.sumologic.com/mcp` | `https://<subdomain>.mcp.eu.sumologic.com/mcp` |
| `https://mcp.sumologic.com/mcp` | `https://<subdomain>.mcp.sumologic.com/mcp` |
| `https://mcp.fed.sumologic.com/mcp` | `https://<subdomain>.mcp.fed.sumologic.com/mcp` |
| `https://mcp.us2.sumologic.com/mcp` | `https://<subdomain>.mcp.us2.sumologic.com/mcp` |

For example, if your subdomain is `acme` and your org is in US West (Oregon), use `https://acme.mcp.us2.sumologic.com/mcp`.

Subdomain URLs are available in all deployments that support the MCP server.

### MCP-compatible client

The client must support remote HTTP/SSE transport and OAuth 2.0. The setup steps below use the [Claude Code CLI](https://code.claude.com/docs/en/quickstart), which requires a paid Claude subscription or an Anthropic Console account.

CIMD ([Client ID Metadata Document](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/)) is the recommended authentication mechanism for MCP clients. To learn how CIMD works, see [client.dev](https://client.dev/); for how Sumo Logic implements OAuth 2.0 and CIMD, including how an administrator enables it, see [OAuth Client Setup](/docs/manage/security/oauth#enable-cimd).

The MCP server publishes `scopes_supported` in its OAuth Protected Resource Metadata (for example, `https://mcp.sumologic.com/.well-known/oauth-protected-resource` for the US1 deployment). A properly implemented client uses this list to request only MCP-relevant scopes during authorization, instead of every scope available in your org, so the resulting access token is limited to that smaller set.

The MCP server also works behind gateway aggregators, such as AWS Bedrock AgentCore Gateway, that connect to multiple MCP servers through a single endpoint. Configure the gateway's OAuth client using the [Client Credentials flow](/docs/manage/security/oauth#client-credentials-flow). If the gateway target fails with an error resembling `Error parsing ClientCredentials response`, check that its credential provider config explicitly sets `grantType: CLIENT_CREDENTIALS`.

For client compatibility questions, contact [Sumo Logic Support](https://support.sumologic.com/support/s).

:::training Micro Lesson

Watch this micro lesson to learn how to connect an MCP-compatible AI client, such as Claude Code or GitHub Copilot, to Sumo Logic — bringing Sumo Logic data and functionality into your AI-driven tools to support agentic AI workflows for your organization.

<Iframe url="https://fast.wistia.net/embed/iframe/ej2qcjc6l7?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Using the Sumo Logic MCP Server"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

## How to configure the MCP server in Claude Code CLI

Claude Code CLI uses OAuth 2.0 with CIMD. Before proceeding, make sure an administrator has [enabled CIMD](/docs/dojo-ai/mcp-server/enable-mcp-server#how-to-enable-cimd-for-mcp-clients) on the Policies page. You do not need to create OAuth credentials; browser-based login handles authentication and token refresh automatically.

### Setup

1. In a Terminal window, register the MCP server. Replace `<MCP-server-URL>` with your deployment's URL from the [deployment URL table](#mcp-server-url-for-your-deployment). Choose a scope:
   * **User scope** (available in all directories, recommended).
     ```bash
     claude mcp add --scope user --transport http \
       sumo-logic "<MCP-server-URL>"
     ```
   * **Project scope** (available only in the current directory, writes to `.mcp.json`).
     ```bash
     claude mcp add --scope project --transport http \
       sumo-logic "<MCP-server-URL>"
     ```
1. Launch Claude Code. With **user scope**, run `claude` from any directory. With **project scope**, run it from the directory where you registered the server.
   ```bash
   claude
   ```
1. In Claude Code, run `/mcp`.
1. Select **sumo-logic** and then **Authenticate**.
1. Claude Code opens a browser window. Log in with your Sumo Logic credentials. If you registered the server with a [subdomain URL](#how-to-use-your-org-subdomain-in-the-mcp-server-url), the browser opens your org's login page directly. Otherwise, if your org uses an identity provider, click **Sign in with your identity provider**, navigate to your org, and complete sign-in.
1. Verify the connection with `/mcp` to confirm the server is connected.<br/><img src={useBaseUrl('img/api/mcp/claude-mcp-connected.png')} alt="Claude Code CLI showing Sumo Logic MCP server connected" width="600"/>
1. Prompt Claude Code to `List my available MCP tools` to see what you can do. You can also refer to [What MCP tools are available?](/docs/dojo-ai/mcp-server/mcp-tools-reference#what-mcp-tools-are-available)

:::tip
For more consistent investigation results, set up the [sumo-investigator skill for Claude Code](/docs/dojo-ai/mcp-server/investigate-with-mcp#improve-investigations-with-the-sumo-investigator-skill).
:::

### How to switch Sumo Logic organizations

To connect to a different Sumo Logic org:
1. In Claude Code, run `/mcp`.
1. Select **sumo-logic** > **Clear authentication**.
1. Select **Authenticate** and log in to the new org.

:::note
If you previously granted consent for an org, you will not be prompted again. To revoke consent, go to your Sumo Logic user settings and remove the app under **Personal Authorized Apps** (next to Personal Access Tokens).
:::

### How to set up MCP without CIMD

CIMD is the default, recommended setup for most MCP server users. If your MCP client does not support CIMD, you'll need to connect with a manually created, pre-registered OAuth client instead. Sumo Logic supports two OAuth 2.0 flows for this:

* **Authorization Code with a pre-registered client**. Best for interactive clients that handle browser-based login. Follow the steps below to create the client, or see [Authorization Code flow](/docs/manage/security/oauth#authorization-code-flow) for details.
* **Client Credentials**. Best for service-to-service or automated clients with no interactive user. See [Client Credentials flow](/docs/manage/security/oauth#client-credentials-flow) to set it up with a service account.

Both require the **Sumo Logic Administrator role** to create the OAuth client and its [OAuth credentials](/docs/manage/security/oauth) (a client ID and client secret).

#### How to create an OAuth client

1. In Sumo Logic, go to **Administration** > **Security** > **OAuth Clients**.
1. Click **+ Add OAuth Client**.
   * Enter a **Name**.
   * For **Client Type**, select **Authorization Code**.
   * For **Redirect URI**, enter:
      ```
      http://localhost:8888/callback
      ```
   * Select your **Service Account** from the dropdown.
   * Optionally, add a **Description**.
   * Under **Scopes**, leave every checkbox unchecked to grant access to all scopes, or select specific scopes to restrict the client's access. See [What MCP tools are available?](/docs/dojo-ai/mcp-server/mcp-tools-reference#what-mcp-tools-are-available) for the scope each tool requires.
   * Click **Save**.
1. Copy the **Client ID** and **Client Secret**. You'll use these in the next step.

#### How to register the MCP server

1. Open a Terminal window (not inside the Claude Code CLI session) and copy one of the snippets below, replacing `<client-id>` with the Client ID from the [OAuth client you created above](#how-to-create-an-oauth-client), and replacing `<mcp-server-url>` with your [Sumo Logic deployment's MCP server URL](#mcp-server-url-for-your-deployment).
   * **User scope** (available in all directories, recommended).
     ```bash
     claude mcp add --transport http \
       --scope user \
       --client-id "<client-id>" --client-secret --callback-port 8888 \
       sumo-logic "<mcp-server-url>"
     ```
   * **Project scope** (available only in the current directory, writes to `.mcp.json`).
     ```bash
     claude mcp add --transport http \
       --scope project \
       --client-id "<client-id>" --client-secret --callback-port 8888 \
       sumo-logic "<mcp-server-url>"
     ```
1. Run one of the above commands. Claude Code then prompts you to enter the client secret securely.
1. Continue with the remaining steps in [Setup](#setup) above: launch Claude Code, run `/mcp`, and authenticate.

:::note
Recent VS Code releases do not work with explicit client credentials. Use the default CIMD setup above for VS Code.
:::
