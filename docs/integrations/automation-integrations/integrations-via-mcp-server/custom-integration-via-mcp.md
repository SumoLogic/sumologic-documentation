---
id: custom-integration-via-mcp
title: Create a Custom Integration via MCP Server
sidebar_label: Custom Integration via MCP Server
description: Learn how to create a custom integration that connects your own MCP server to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

MCP servers are published by the vendor and offer their tools using the Model Context Protocol (MCP). You connect Cloud SOAR to the server, and the tools it offers become available automatically, with no new connector to wait for. Integrations can be used across playbooks automation workflows and Dojo AI Agents.

## Set up

An MCP server has two parts:
- The server holds its name and URL. Each server name is unique in your organization.
- One or more connections. This defines how Cloud SOAR signs in to the server. A server can have several connections, for example a shared token and a per-user sign in. You can add a server from the catalog, where Sumo Logic has pre-filled the URL and sign-in methods. You can also add a [custom MCP server]() of your own. A custom server’s URL must be a public HTTPS address.

**screenshot placeholder**

### Option 1: Add a server from the catalog

The catalog lists vendors Sumo Logic has already set up, with the URL and the supported sign in methods filled in. You can add each catalog entry once.

1. [**New UI**](/docs/get-started/sumo-logic-ui). To access the integrations, in the main Sumo Logic menu select **App Catalog > Integrations**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu select **App Catalog > Integrations**.<br/><img src={useBaseUrl('img/integrations/integration-tab.png')} alt="integrations-tab" style={{border: '1px solid gray'}} width="700" />
1. Select the vendor card.
1. Click **Add Connection**.
1. [Select a Sign-In Method](#select-a-sign-in-method).
1. Give the connection a Connection Name (for example, Production), enter the details for that method, then choose Add Connection.

Screenshot placeholder: catalog list. Screenshot placeholder: catalog entry set up form. To confirm: exact menu names and the order of the form.

### Option 2: Add a custom MCP server

Use this for a server that is not in the catalog, such as one your own team runs.

On the Integrations page, choose Add Custom, then MCP Server. The Add Custom MCP Server form opens.

Enter a Name and the MCP Server URL, for example `https://mcp.example.com/mcp`. The URL must be an HTTPS address that Cloud SOAR can reach over the internet. Addresses on private networks are rejected.

### Select a Sign-In Method

Save. Cloud SOAR connects to the server to check the details. If it cannot connect, you see an error and nothing is saved, so check the credentials and try again.

Choose how to sign in

| Method |	Best for |	What you do on the vendor side | Who is signed in |
|:--|:--|:--|:--|
| API key |	Vendors that read a key from a custom header |	Create an API key. Note the header name the vendor expects (for example DD-API-KEY). |	Everyone who is allowed to use the connection, as one identity. |
| Bearer token | Personal access tokens and service tokens | Create a token with only the permissions you need. | One shared identity |
| Basic auth | Username and password, or username and API token | Create a service account, and prefer an API token over a password. | One shared identity |
| OAuth 2.0, client credentials	Background automation, no person involved |	Create an OAuth app (or use a service account) and note the client ID and secret. |	The app itself |
| OAuth 2.0, authorization code | Actions that should run as each person |	Set up an OAuth app as described below, unless Sumo Logic already provides one. | Each user, with their own vendor account |

With the first four methods, anyone allowed to use the connection acts as the same identity on the vendor side. Choose the permissions of that account carefully. Use per-user OAuth when you want each person's own access limits to apply.

API key, bearer token and basic auth
Enter the key, token, or username and password. Cloud SOAR checks the server when you save, and the connection is ready to use straight away. No one else needs to sign in.

Credentials are stored encrypted and are never shown again. These methods have no automatic renewal, so you must replace a credential before it expires. To change a credential, add a new connection with the new value, make it the default if needed, and delete the old one.

OAuth 2.0
For OAuth 2.0 you first choose a grant type: Client Credentials (server to server, no user involved) or Authorization code (each user authorizes with their own account). Then, under Credential setup, you choose where the OAuth app comes from:

Choice

When it is offered

What you do

Choice

When it is offered

What you do

Use Sumo-managed app

Vendors where Sumo Logic has registered an app. To confirm: the list of vendors, which depends on the app approvals in progress.

Nothing. No configuration is needed.

Auto-register (Dynamic Client Registration)

Servers that support dynamic client registration

Nothing. The server registers an OAuth app for you, so there are no credentials to enter.

Use your own credentials

Always

Create the app in the vendor's developer portal, then enter its client ID and secret (see the steps below). Use this if your security policy requires your own app.

Using your own OAuth app
On the vendor side, create an OAuth app.

Add the redirect (callback) URL for your Sumo Logic deployment (see the table below). It must match exactly.

Give the app the scopes or permissions the tools need.

In Cloud SOAR, enter the client ID and client secret. If the vendor says the app is a public client with no secret, tick Public client and leave the secret empty.

Enter the scopes to request, separated by spaces, if the vendor needs them.

For a custom server, Cloud SOAR needs the server's authorization and token addresses. Under Configuration type, choose Discovery and use Discover to find them from the server URL. If discovery fails or finds nothing usable, choose Manual and enter the Authorization URL, Token URL and, optionally, the Revocation URL from the vendor's documentation.