---
id: oauth
title: OAuth Client Setup
description: Set up OAuth authentication to securely connect external applications and services to Sumo Logic.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

OAuth 2.0 enables secure authentication between Sumo Logic and external applications without sharing passwords. Use OAuth to connect AI tools, custom integrations, and third-party services to your Sumo Logic account.

Sumo Logic supports two OAuth 2.0 authentication flows:

| Flow | Use Case | Setup Complexity | Token Refresh |
| :--- | :--- | :--- | :--- |
| [Authorization Code](#authorization-code-flow) | User-facing applications with browser-based login | Simple (UI-based) | Automatic |
| [Client Credentials](#client-credentials-flow) | Service-to-service authentication, automated workflows | Moderate (API-based) | Manual or automatic |


## Prerequisites

* **Sumo Logic Administrator role**. You'll need this to create OAuth clients and service accounts. If you're unsure whether you have this role, check your [Preferences](/docs/get-started/onboarding-checklists/).

## How permissions work

Effective permissions are always the intersection of the OAuth client's configured scopes and the caller's roles. No OAuth client can grant more access than the caller already has.

* **Authorization Code flow**. Effective permissions are the intersection of the authenticated user's roles and the OAuth client's configured scopes. When specific scopes are requested during authorization, effective permissions are further limited to those requested scopes.
* **Client Credentials flow**. Effective permissions are the intersection of the service account's roles, the OAuth client's configured scopes, and any scopes explicitly requested when obtaining a token.

## Client ID Metadata Documents (CIMD)

[Client ID Metadata Documents (CIMD)](https://datatracker.ietf.org/doc/draft-ietf-oauth-client-id-metadata-document/) let a client identify itself to Sumo Logic using a hosted metadata URL as its client ID, without an administrator pre-registering an OAuth client. CIMD is the default, recommended authentication mechanism for [MCP server](/docs/api/mcp-server) clients such as the Claude Code CLI, which handle browser-based login and token refresh automatically.

CIMD uses the [Authorization Code flow](#authorization-code-flow) behind the scenes, so the same [permission rules](#how-permissions-work) apply.

### Enable CIMD

An administrator needs to enable CIMD for your organization before clients can use it.

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**.
1. Turn on **CIMD Enabled**.
1. Click **Save**.

Clients that do not support CIMD can connect with a pre-registered OAuth client instead, using either the [Authorization Code flow](#authorization-code-flow) or the [Client Credentials flow](#client-credentials-flow). See [Manual OAuth setup](/docs/api/mcp-server#manual-oauth-setup) for the MCP server.

{/* VERIFY before publishing: confirm the exact toggle label ("CIMD Enabled") and its location on the Policies page with the OAuth/MCP engineering team. */}

## Authorization Code flow

This flow uses interactive browser-based authentication. Users authorize an external application to access Sumo Logic on their behalf, and the application receives an access token to make API requests.

### Step 1: Create an OAuth client

1. Log in to Sumo Logic as an Administrator.
1. Go to **Administration** > **Account Security Settings** > **OAuth Clients**.
1. Click **+ Add OAuth Client**.
1. For **Client Type**, select **Authorization Code**.
1. Enter a **Name** and optional **Description** for your application.
1. Set the **Redirect URI** to match your application's callback URL. This is where Sumo Logic will send the authorization code after the user approves access.
   :::note
   The redirect URI must match exactly what your application expects. Include the protocol (`http://` or `https://`) and any path or port number.
   :::
1. Click **Save**.
1. Copy the **Client ID** and **Client Secret**. You'll need these to configure your application.

### Step 2: Complete the OAuth flow

Configure your OAuth library or client with the client ID, secret, and redirect URI from Step 1. Sumo Logic follows the [OAuth 2.1 specification](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1), so any compliant library handles authorization, token exchange, and token refresh automatically.

## Client Credentials flow

This flow uses service accounts for server-to-server authentication. Applications authenticate directly with Sumo Logic using a client ID and client secret, without requiring user interaction.

### Step 1: Create a service account

Create a Sumo Logic service account to represent your application or service. You can also use an existing service account.

1. Log in to Sumo Logic as an Administrator.
1. [Create a service account](/docs/manage/security/service-accounts/#create-a-service-account) with the appropriate roles for your use case.
1. Get the service account ID. You'll use this ID in the next step.
   * **Via UI**. Go to **Administration** > **Account Security Settings** > **Service Accounts**, click your service account, and copy the ID from the browser URL (appears as `selectedId=00000000076D28F9`).
   * **Via API**. Alternatively, [get a list of all service accounts](https://api.sumologic.com/docs/#operation/listServiceAccounts) and find the `id` field in the response.
     <details>
     <summary>Example API request for listing service accounts</summary>
     <Tabs
       className="unique-tabs"
       defaultValue="request"
       values={[
         {label: 'Example request', value: 'request'},
         {label: 'Example response', value: 'response'},
       ]}>
     <TabItem value="request">
     Replace `<accessId>` and `<accessKey>` with your personal access key credentials. Replace  `service.sumologic.com` with your [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) if different.
     ```bash
     curl -u "<accessId>:<accessKey>" \
       https://service.sumologic.com/api/v1/serviceAccounts
     ```
     </TabItem>
     <TabItem value="response">
     ```json title="Example response highlighting service account ID" {14}
     {
       "data": [
         {
           "name": "My Service Account",
           "email": "service@example.com",
           "roleIds": [
             "00000000000001DF",
             "00000000000002D2"
           ],
           "createdAt": "2025-10-16T09:10:00.000Z",
           "createdBy": "0000000006743FDD",
           "modifiedAt": "2025-10-16T09:10:00.000Z",
           "modifiedBy": "0000000006743FE8",
           "id": "0000000000C4661B",
           "isActive": true
         }
       ]
     }
     ```
     </TabItem>
     </Tabs>
     </details>

### Step 2: Create an OAuth client

Create an OAuth client under your service account. This generates the credentials your application will use to authenticate.

1. Log in to Sumo Logic as an Administrator.
1. Go to **Administration** > **Account Security Settings** > **OAuth Clients**.
1. Click **+ Add OAuth Client**.
1. For **Client Type**, select **Client Credentials**.
1. Enter a **Name** and optional **Description** for your application.
1. Select the **Service Account** this OAuth client will run as (created in the previous step).
1. Select the **Scopes** your OAuth client needs. The scopes you request must already be included in your service account's effective permissions. [Learn how permissions work](#how-permissions-work).
1. Click **Save**.
1. Copy the **Client ID** and **Client Secret**. You'll need these to configure your application.

<details>
<summary>Creating an OAuth client via API (advanced)</summary>

Alternatively, you can [create an OAuth client using the API](https://api.sumologic.com/docs/#operation/createOAuthClient). This allows scripted or automated OAuth client provisioning.

**How are scopes enforced?**

[Effective permissions are the intersection of the service account's roles and the OAuth client's scopes](#how-permissions-work). If a requested scope is not included in the service account's roles, it will be silently excluded from the OAuth client's effective permissions.

<Tabs
  className="unique-tabs"
  defaultValue="request"
  values={[
    {label: 'Example request', value: 'request'},
    {label: 'Example response', value: 'response'},
  ]}>

<TabItem value="request">

Replace `<accessId>` and `<accessKey>` with your personal access key credentials. Replace `service.sumologic.com` with your [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) if different.

This example grants permissions to query logs and metrics, access saved content, and manage collectors.

```bash
curl -u "<accessId>:<accessKey>" \
  https://service.sumologic.com/api/v1/oauth/clients \
  -H "Content-Type: application/json" \
  -d '{
    "type": "ClientCredentialsClient",
    "name": "My Application OAuth Client",
    "description": "OAuth client for automated log analysis",
    "scopes": [
      "runLogSearch",
      "runMetricsQuery",
      "viewLibrary",
      "manageCollectors",
      "manageFieldExtractionRules",
      "manageScheduledViews",
      "managePartitions"
    ],
    "runAs": {
      "type": "ServiceAccount",
      "runAsId": "0000000000C4661B"
    }
  }'
```

</TabItem>
<TabItem value="response">

```json title="Example response highlighting client ID and secret" {2,13}
{
  "clientId": "zVplCFHcpTDwtktBIQmFI2K6s9HEo4HAtcQD1f1M5eQ",
  "createdAt": "2025-10-16T09:10:00.000Z",
  "createdBy": "0000000006743FDD",
  "modifiedAt": "2025-10-16T09:10:00.000Z",
  "modifiedBy": "0000000006743FDD",
  "type": "ClientCredentialsClient",
  "name": "My Application OAuth Client",
  "description": "OAuth client for automated log analysis",
  "runAs": {
    "type": "ServiceAccount",
    "runAsId": "0000000000C4661B"
  },
  "grantTypes": ["client_credentials"],
  "scopes": ["runLogSearch", "runMetricsQuery", "viewLibrary", "manageCollectors", "manageFieldExtractionRules", "manageScheduledViews", "managePartitions"],
  "effectiveScopes": ["runLogSearch", "runMetricsQuery", "viewLibrary", "manageCollectors", "manageFieldExtractionRules", "manageScheduledViews", "managePartitions"],
  "clientSecret": "EqyuIvsnae0LnMC2mbJArysXcmp0LuBsRgmyeLtSkFPEzSxdvpYQMDajn_8buaDj"
}
```

Copy the `clientId` and `clientSecret` from the response. These are your OAuth credentials.

</TabItem>
</Tabs>

</details>

### Step 3: Generate an access token

Request an OAuth access token from the token endpoint using your client credentials. Replace `<token-endpoint-URL>` with your deployment's token endpoint — see [How do I find the authorization or token endpoint?](#how-do-i-find-the-authorization-or-token-endpoint-for-my-deployment).

**Option A: Request all available permissions**

Omit the `scope` parameter to assign all of the OAuth client's effective scopes to the access token.

```bash
curl -X POST <token-endpoint-URL> \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<clientId>:<clientSecret>" \
  -d "grant_type=client_credentials"
```

**Option B: Request specific permissions**

Use the `scope` parameter to request specific scopes. Separate multiple scopes with spaces, not commas.

```bash
curl -X POST <token-endpoint-URL> \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<clientId>:<clientSecret>" \
  -d "grant_type=client_credentials" \
  -d "scope=runLogSearch viewLibrary"
```

The response includes an access token:

```json
{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 43200,
  "scope": "runLogSearch viewLibrary"
}
```

Use this access token as a Bearer token in the `Authorization` header when making API requests. Replace `<api-endpoint>` with your [deployment-specific API endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) (for example, `api.sumologic.com` for US1, `api.us2.sumologic.com` for US2):

```bash
curl <api-endpoint>/api/v1/search/jobs \
  -H "Authorization: Bearer eyJhbGc..."
```

### Token expiration

Access tokens generated with Client Credentials flow expire after 12 hours. When a token expires, generate a new one by repeating the [token request](#step-3-generate-an-access-token). Unlike Authorization Code flow, Client Credentials flow does not provide refresh tokens.

## Metadata endpoints

Sumo Logic publishes OAuth 2.0 and OpenID Connect discovery documents so clients can automatically discover endpoints and supported capabilities. Replace `[deployment-endpoint]` with your deployment's service endpoint (for example, `service.sumologic.com` for US1). See [How do I find the authorization or token endpoint for my deployment?](#how-do-i-find-the-authorization-or-token-endpoint-for-my-deployment) for the endpoint that matches your deployment.

| Metadata document | URL |
| :--- | :--- |
| Authorization server metadata ([RFC 8414](https://datatracker.ietf.org/doc/html/rfc8414)) | `https://[deployment-endpoint]/.well-known/oauth-authorization-server` |
| OpenID Connect configuration | `https://[deployment-endpoint]/.well-known/openid-configuration` |
| Protected resource metadata ([RFC 9728](https://datatracker.ietf.org/doc/html/rfc9728)) | `https://[mcp-server-endpoint]/.well-known/oauth-protected-resource` |

* **Authorization server metadata** returns the `authorization_endpoint`, `token_endpoint`, and other supported OAuth 2.0 parameters, such as scopes, grant types, and response types.
* **OpenID Connect configuration** returns the OpenID Provider configuration, including the `issuer`, endpoint URLs, and supported claims.
* **Protected resource metadata** is served by the [Sumo Logic MCP server](/docs/api/mcp-server) to advertise which authorization server issues tokens for it. Replace `[mcp-server-endpoint]` with your [deployment's MCP server URL](/docs/api/mcp-server#prerequisites).

For example, to retrieve the authorization server metadata:

```bash
curl https://[deployment-endpoint]/.well-known/oauth-authorization-server
```

{/* VERIFY before publishing: confirm the OpenID configuration path (/.well-known/openid-configuration) and the protected resource metadata host/path (served by the MCP server) with the OAuth/MCP engineering team. */}

## Security best practices

* **Protect client secrets**. For Client Credentials flow, store client secrets securely using environment variables, secrets management systems, or encrypted configuration files — never commit them to version control. In Authorization Code flow, the `clientSecret` is not directly exposed in the token exchange and carries less risk, but should still be stored securely.
* **Use least privilege**. Request only the OAuth scopes your application needs. For Client Credentials flow, assign service accounts the minimum roles required.
* **Rotate credentials regularly**. Create new OAuth clients periodically and deactivate old ones. Update service account credentials on a regular schedule.
* **Monitor OAuth usage**. Review audit logs for OAuth client activity. Watch for unexpected patterns like unusual request volumes or access to sensitive resources.
* **Implement token refresh**. For Authorization Code flow, implement automatic token refresh to maintain uninterrupted access without repeatedly prompting users to log in.
* **Use HTTPS**. Always use HTTPS for redirect URIs and token endpoints to protect credentials in transit.

## Service account content ownership

When using Client Credentials flow, any content created through the OAuth client (such as dashboards, saved searches, or scheduled views) is owned by the configured service account.

Service accounts cannot log in to the Sumo Logic UI. To view content created by a service account:

1. Open the content **Library**.
1. Select **Content Administrator** from the **View as** dropdown.
1. Navigate to the service account's **Personal** folder.

## FAQ

### Which OAuth flow should I use?

Use **Authorization Code flow** for user-facing applications where users log in through their browser. This flow is simpler to set up and handles token refresh automatically.

Use **Client Credentials flow** for server-to-server authentication, automated workflows, or applications that don't have interactive users. This flow provides more control over permissions through service accounts and OAuth scopes.

### How long do access tokens last?

* **Authorization Code flow**. Access tokens expire after 5 minutes, but are automatically renewed by your OAuth client — this is transparent to users.
* **Client Credentials flow**. Access tokens expire after 12 hours. Generate a new token when the current one expires.

### Can I revoke OAuth access?

Yes. To revoke access for an OAuth client:

1. Go to **Administration** > **Account Security Settings** > **OAuth Clients**.
1. Find the OAuth client you want to revoke.
1. Click **Delete** or **Deactivate** (depending on UI options available).

For Client Credentials flow, you can also deactivate or delete the associated service account, which will immediately revoke all access for OAuth clients using that service account.

For Authorization Code flow, revoking Authorization Consent causes the next token refresh to fail. The current access token remains valid until it expires.

### What happens if I change a service account's roles?

For Client Credentials flow, [effective permissions are the intersection of the service account's roles and the OAuth client's scopes](#how-permissions-work). If you restrict the service account's roles, the OAuth client's permissions are automatically reduced, even if the configured scopes remain unchanged.

### What happens if a user's roles change in Authorization Code flow?

For Authorization Code flow, [effective permissions are the intersection of the user's roles, the OAuth client's scopes, and the requested scopes](#how-permissions-work). If a user's roles are restricted, their effective OAuth permissions are reduced at the next token refresh. If roles are expanded, the new permissions become available at the next token refresh.

### How do I find the authorization or token endpoint for my deployment?

Token endpoint URLs vary by deployment:

| Deployment | Token endpoint |
| :--- | :--- |
| Asia Pacific (Seoul) | `https://service.kr.sumologic.com/oauth2/token` |
| Asia Pacific (Sydney) | `https://service.au.sumologic.com/oauth2/token` |
| Asia Pacific (Tokyo) | `https://service.jp.sumologic.com/oauth2/token` |
| Canada (Central) | `https://service.ca.sumologic.com/oauth2/token` |
| Europe (Frankfurt) | `https://service.de.sumologic.com/oauth2/token` |
| Europe (Ireland) | `https://service.eu.sumologic.com/oauth2/token` |
| Europe (Zurich) | `https://service.ch.sumologic.com/oauth2/token` |
| US East (N. Virginia) | `https://service.sumologic.com/oauth2/token` |
| US East (N. Virginia) - FedRAMP | `https://service.fed.sumologic.com/oauth2/token` |
| US West (Oregon) | `https://service.us2.sumologic.com/oauth2/token` |

To find the `authorization_endpoint` for your deployment (used in [Authorization Code flow](#authorization-code-flow)), query the Authorization Server Metadata:

```bash
curl https://[deployment-endpoint]/.well-known/oauth-authorization-server
```

The response includes `authorization_endpoint`, `token_endpoint`, and other supported OAuth parameters. For the OpenID Connect and protected resource discovery documents, see [Metadata endpoints](#metadata-endpoints).

### Can I use OAuth with the Sumo Logic APIs?

Yes. OAuth access tokens work with all Sumo Logic APIs. Include the access token in the `Authorization` header as a Bearer token. Replace `<api-endpoint>` with your [deployment-specific API endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) (for example, `api.sumologic.com` for US1, `api.us2.sumologic.com` for US2):

```bash
curl <api-endpoint>/api/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```
