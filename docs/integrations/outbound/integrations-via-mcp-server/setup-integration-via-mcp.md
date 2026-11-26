---
id: setup-integration-via-mcp
title: Set up an integration via MCP
sidebar_label: Set up an Integration via MCP
description: Learn how to set up an integration that connects your own MCP server to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

MCP servers are published by the vendor and offer their tools using the Model Context Protocol (MCP). You connect Sumo Logic to the server, and the tools it offers become available automatically, with no new connector to wait for. Integrations via MCP server can be used across playbooks automation workflows and Dojo AI Agents.

An MCP server has two parts:
- The **server**. Consists of its name and URL. Each server name is unique in your organization.
- One or more **connections**. Defines how Sumo Logic signs in to the server. A server can have several connections, for example a shared token and a per-user sign in.

You can add a server from the catalog, where Sumo Logic has pre-filled the URL and sign-in methods. You can also add a [custom MCP server](#option-2-add-a-custom-mcp-server) of your own. A custom server’s URL must be a public HTTPS address.

{/* Screenshot placeholder */}

## Option 1: Connect a server from the App Catalog

The catalog lists vendors Sumo Logic has already set up, with the URL and the supported [authentication methods](#authentication-method) filled in. You can add each catalog entry once.

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the integrations, in the main Sumo Logic menu select **App Catalog > Integrations > Outbound Integrations**.<br/><img src={useBaseUrl('img/integrations/integration-tab.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="700" />
1. (Optional) Select the **MCP Server** checkbox under **Type** to display only the MCP Server integrations.
1. Select the integration that you want to connect via MCP server. For example, click the AWS integration card.<br/><img src={useBaseUrl('img/integrations/MCP-integration-card-not-connected.png')} alt="integrations-card-not-connected" style={{border: '1px solid gray'}} width="700" /> 
1. Click **Connect**.
1. Enter a **Connection Name** and the details for that method.
1. Click **Connect**. Once connected, the integration card displays a green colored **Connected** tag in the top-right corner.

{/* Screenshot placeholder */}

## Option 2: Add a custom MCP server

Use this for a server that is not in the catalog, such as one your own team runs.
1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the integrations, in the main Sumo Logic menu select **App Catalog > Integrations > Outbound Integrations**.<br/><img src={useBaseUrl('img/integrations/integration-tab.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="700" />
1. Click the **+ Add Custom** dropdown and then select **MCP Server**. The **Add Custom MCP Server** form opens.
1. **Name**. Enter a  name for the server. Each server name must be unique in your organization.
1. **MCP Server URL**. Enter the MCP Server URL, for example `https://mcp.example.com/mcp`. The URL must be an HTTPS address that Sumo Logic can reach over the internet. Addresses on private networks are rejected.
1. **Connection Name**. Enter a name for this connection, for example `Production`. A server can have several connections.
1. Under **Authentication configuration**, choose an **Authentication method** and complete the fields that appear. See [Authentication configuration](#authentication-configuration).
1. Click **Connect**. The server is listed as **Non-certified/Custom**.

:::tip
Sumo Logic connects to the server to check the details. If it cannot connect, you see an error and nothing is saved. Check the credentials and try again.
:::

### Authentication configuration

For when to use each method, see [Authentication method](#authentication-method).

:::note
Credentials are stored encrypted and are never shown again. These methods have no automatic renewal, so you must replace a credential before it expires. To change a credential, add a new connection with the new value, make it the default if needed, and delete the old one.
:::

### Authentication method

Choose a sign-in method for each connection based on the authentication methods supported by the vendor and your organization's security requirements.

The following table describes each method, when to use it, and how authentication works.

| Sign-in method | When to use it |	What to configure with the vendor | Authentication identity |
|:--|:--|:--|:--|
| API key |	When the vendor requires an API key in a custom request header. | Create an API key and note the header name required by the vendor (for example, DD-API-KEY). | All users share the same vendor identity. |
| Bearer Token | When the vendor supports personal access tokens or service tokens. | Create a token with only the permissions required for the integration. | All users share the same vendor identity. |
| Basic Auth | When the vendor requires a username and password or a username and API token. | Create a service account. Use an API token instead of a password when supported. | All users share the same vendor identity. |
| OAuth 2.0 (Client Credentials) | For background automation that doesn't require user interaction. | Create an OAuth app or service account, and obtain the client ID and client secret. |	The application authenticates using its own identity. |
| OAuth 2.0 (Authorization Code) |	When actions should run using each user's own vendor account and permissions. | Configure an OAuth app as described below, unless Sumo Logic already provides one. | Each user authenticates with their own vendor account. |

:::info
- With **API Key**, **Bearer token**, **Basic auth**, and **OAuth 2.0 (Client Credentials)**, all users who can access the connection share the same vendor-side identity and permissions. Choose an account with only the permissions required for the integration.
- Use **OAuth 2.0 (Authorization code)** when you want each user's individual vendor permissions and access restrictions to apply.
:::

#### OAuth 2.0

Under **Configuration type**, select one of the following OAuth 2.0 authentication methods:

**Discovery**

This method auto-detects OAuth endpoints from the server.
<img src={useBaseUrl('img/integrations/0auth-discovery.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="500" />
1. Enter your **Server URL**.
1. Click **Discover**. If you leave **Server URL** empty, Sumo Logic discovers the endpoints from the MCP Server URL.

**Manual**

Enter the OAuth endpoints yourself. Use this method if discovery fails or finds nothing usable.

1. Enter the **Authorization URL**, **Token URL**, and (Optional) **Revocation URL** from the vendor's platform.
1. Under **Grant Type**, select one of the following options:
    - **Client Credentials**. Use server-to-server authentication for AI agents and background automation that access MCP servers without user context. All users who access the connection share the application's identity.
    - **Authorization code**. Use per-user authentication when actions need to run with each user's own permissions. Each user must authorize access using their vendor account after the connection is saved. See [Connect your account](#connect-your-account-per-user-oauth)
1. **Authorization**. Provide your own client credentials from the vendor developer portal.
    1. **Client ID**. The client ID of the OAuth app you created at the vendor.
    1. **Client Secret**. The app's client secret key. It is stored encrypted and not shown again. For a public client, see Public Client.
    1. **Public Client** (Authorization code only). Select the Public Client checkbox if the vendor says the app is a public client. In this case, you do not need the client secret key.
    1. **Scopes**. The OAuth scopes to request, separated by spaces. Some vendors need a scope such as `offline_access` to issue a refresh token.
    1. **Extra Configuration** (Authorization code only). Vendor-specific settings as JSON, for example `{"team": "T01234"}` for Slack or `{"prompt": "consent"}` for Atlassian. Leave empty if the vendor does not need any.

#### Bearer Token

Use the bearer token which is a static token shared across all users.<br/><img src={useBaseUrl('img/integrations/bearer-token.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="500" />

#### Basic Auth

Use basic authentication when the vendor requires a username and password or a username and API token. Create a service account and use an API token instead of a password whenever possible. All users share the same vendor identity.<br/><img src={useBaseUrl('img/integrations/basic-auth.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="500" />

#### API key

Use API key authentication when the vendor requires a key in a custom request header. Create an API key and note the header name required by the vendor (for example, `DD-API-KEY`). All users who access the connection share the same vendor identity.<img src={useBaseUrl('img/integrations/api-key.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="500" />

## Connect your account (per-user OAuth)

With the [**Authorization Code**](#oauth-20) method, saving the server is not enough. The server shows as **Pending** until the first person connects, and each person must connect their own account before using its tools.

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the integrations, in the main Sumo Logic menu select **App Catalog > Integrations > Outbound Integrations**.
1. Open the server and click **Connect**.
1. You are sent to the vendor platform. Sign in, review the permissions the app asks for, and approve.
1. You return to Sumo Logic and the connection shows as **Connected**.

Stay signed in to Sumo Logic as the same user throughout. If a different user finishes the flow, it is refused and nothing is saved.

## Disconnect your account

Follow the steps below to remove your account:

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the integrations, in the main Sumo Logic menu select **App Catalog > Integrations > Outbound Integrations**.
1. Click the required integration card.
1. Under **Connections** tab, click the verticle ellipses and select **Disconnect**.<br/><img src={useBaseUrl('img/integrations/disconnect-a-server.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="700" />

This revokes your authorization and you lose access to all its tools until reconnected, and permissions set for it must be set again. Other users and the connection itself are not affected.

## Reconnect your account

Tools may ask you to connect when:
- Your access token expired and the vendor did not issue a refresh token (some vendors need a scope such as offline_access).
- You revoked the app at the vendor.
- The connection or the OAuth app changed after you connected.

Follow the steps below if you are asked to connect again, 
1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the integrations, in the main Sumo Logic menu select **App Catalog > Integrations > Outbound Integrations**.
1. Click the required integration card.
1. Under **Connections** tab, click the verticle ellipses and select **Connect**.<br/><img src={useBaseUrl('img/integrations/reconnect-a-server.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="700" />

## Add another connection

Follow the steps below if you are asked to connect again, 
1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the integrations, in the main Sumo Logic menu select **App Catalog > Integrations > Outbound Integrations**.
1. Click the required integration card.
1. On the **Connections** tab and click **Add Connection**.
1. Enter a **Connection Name** and the details for that method.
1. Click Connect. Once connected, the connection appears in the Connections table list view.
