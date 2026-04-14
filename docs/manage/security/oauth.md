---
id: oauth
title: OAuth
description: Set up OAuth authentication to securely connect external applications and services to Sumo Logic.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import useBaseUrl from '@docusaurus/useBaseUrl';

<!-- Is OAuth in Private Preview?
<head>
  <meta name="robots" content="noindex" />
</head>
insert preview badge
-->

OAuth 2.0 enables secure authentication between Sumo Logic and external applications without sharing passwords. Use OAuth to connect AI tools (such as the [MCP Server](/docs/api/mcp-server)), custom integrations, and third-party services to your Sumo Logic account.

## Authentication flows

Sumo Logic supports two OAuth 2.0 authentication flows:

| Flow | Use Case | Setup Complexity | Token Refresh |
| :--- | :--- | :--- | :--- |
| [Authorization Code](#authorization-code-flow) | User-facing applications with browser-based login | Simple (UI-based) | Automatic |
| [Client Credentials](#client-credentials-flow) | Service-to-service authentication, automated workflows | Moderate (API-based) | Manual or automatic |

**Authorization Code flow** is recommended for applications where users interactively log in through their browser. This flow handles token refresh automatically and requires minimal configuration.

**Client Credentials flow** is designed for server-to-server communication where no user interaction is required. This flow uses service accounts and provides granular control over permissions through OAuth scopes.

## Authorization Code flow

This flow uses interactive browser-based authentication. Users authorize your application to access Sumo Logic on their behalf, and the application receives an access token to make API requests.

### Create an OAuth client

1. Log in to Sumo Logic as an Administrator.
1. Go to **Administration** > **Security** > **OAuth**.
1. Click **+ Add Client**.
1. For **Type**, select **Authorization Code**.
1. Enter a **Name** and optional **Description** for your application.
1. Set the **Redirect URI** to match your application's callback URL. This is where Sumo Logic will send the authorization code after the user approves access.
   :::note
   The redirect URI must match exactly what your application expects. Include the protocol (`http://` or `https://`) and any path or port number.
   :::
1. Click **Save**.
1. Copy the **Client ID** and **Client Secret**. You'll need these to configure your application.

### Authorize your application

Direct users to the Sumo Logic authorization endpoint to request access. The endpoint URL varies by deployment.

```
https://[deployment-endpoint]/oauth/authorize?
  client_id=YOUR_CLIENT_ID
  &redirect_uri=YOUR_REDIRECT_URI
  &response_type=code
  &scope=REQUESTED_SCOPES
```

Replace the following values:
* `[deployment-endpoint]` - Your Sumo Logic [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) (for example, `service.sumologic.com`, `service.us2.sumologic.com`, `service.eu.sumologic.com`)
* `YOUR_CLIENT_ID` - Client ID from the OAuth client you created
* `YOUR_REDIRECT_URI` - The redirect URI you registered (must be URL-encoded)
* `REQUESTED_SCOPES` - Space-separated list of OAuth scopes your application needs (optional for most use cases)

When users visit this URL, they'll see a Sumo Logic login page. After authenticating and approving access, Sumo Logic redirects them to your `redirect_uri` with an authorization code.

### Exchange authorization code for tokens

After the user authorizes your application, Sumo Logic redirects to your redirect URI with an authorization code:

```
https://your-redirect-uri?code=AUTHORIZATION_CODE
```

Exchange this code for an access token by making a POST request to the token endpoint:

```bash
curl -X POST https://[deployment-endpoint]/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=authorization_code" \
  -d "code=AUTHORIZATION_CODE" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

The response includes an access token and a refresh token:

```json
{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "def50200...",
  "scope": "granted scopes"
}
```

Use the `access_token` to authenticate API requests. Store the `refresh_token` securely to obtain new access tokens when the current one expires.

### Refresh access tokens

Access tokens expire after a set period (typically 1 hour). Use the refresh token to obtain a new access token without requiring the user to log in again:

```bash
curl -X POST https://[deployment-endpoint]/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=refresh_token" \
  -d "refresh_token=YOUR_REFRESH_TOKEN" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET"
```

The response includes a new access token. The refresh token may also be rotated (a new one provided), depending on your configuration.

## Client Credentials flow

This flow uses service accounts for server-to-server authentication. Applications authenticate directly with Sumo Logic using a client ID and client secret, without requiring user interaction.

### Prerequisites

* **Sumo Logic Administrator role**. Required to create OAuth clients and service accounts.
* **Sumo Logic personal access key**. Used to authenticate API calls during setup. See [Access Keys](/docs/manage/security/access-keys/).

### Step 1: Create a service account

Create a Sumo Logic service account to represent your application or service. You can also use an existing service account.

1. Log in to Sumo Logic as an Administrator.
1. [Create a service account](/docs/manage/security/service-accounts/#create-a-service-account) with the appropriate roles for your use case.
1. [Get a list of all service accounts](https://api.sumologic.com/docs/#operation/listServiceAccounts) in your organization and find the `id` of the service account you just created. You'll use this ID in the next step.

   <Tabs
     className="unique-tabs"
     defaultValue="request"
     values={[
       {label: 'Example request', value: 'request'},
       {label: 'Example response', value: 'response'},
     ]}>
   <TabItem value="request">

   Replace `<accessId>` and `<accessKey>` with your personal access key credentials. Replace `service.sumologic.com` with your [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) if different.

   ```bash
   curl -u "<accessId>:<accessKey>" \
     https://service.sumologic.com/api/v1/serviceAccounts
   ```
   </TabItem>
   <TabItem value="response">
   ```json title="Example response highlighting service account ID" {12}
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

### Step 2: Create an OAuth client

Create an OAuth client under your service account. This generates the credentials your application will use to authenticate.

:::note
UI support for this step is not yet available. You'll need to use the Sumo Logic API.
:::

1. [Get a list of available OAuth scopes](https://api.sumologic.com/docs/#operation/listOAuthScopes) and decide which ones your OAuth client needs. The scopes you request must already be included in your service account's effective permissions.

   <details>
   <summary>How are scopes enforced?</summary>

   The permissions granted to an OAuth client are limited to the intersection of:
   * The roles (RBAC capabilities) assigned to the service account.
   * The scopes assigned to the OAuth client.

   This prevents privilege escalation. If the service account's roles are restricted in the future, the OAuth client's effective permissions are automatically reduced. If a requested scope is not included in the service account's roles, it will be silently excluded from the OAuth client's effective permissions.

   </details>

1. [Create a new OAuth client](https://api.sumologic.com/docs/#operation/createOAuthClient) using the scopes you selected. Set `runAsId` to the service account ID from Step 1.

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

### Step 3: Generate an access token {#generate-access-token}

Request an OAuth access token from the token endpoint using your client credentials.

:::note Deployment endpoints
The examples below use `service.sumologic.com`. If your Sumo Logic instance uses a different deployment, replace this with your [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) (for example, `service.us2.sumologic.com`, `service.eu.sumologic.com`).
:::

**Option A: Request all available permissions**

Omit the `scope` parameter to assign all of the OAuth client's effective scopes to the access token.

```bash
curl -X POST https://service.sumologic.com/oauth2/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -u "<clientId>:<clientSecret>" \
  -d "grant_type=client_credentials"
```

**Option B: Request specific permissions**

Use the `scope` parameter to request specific scopes. Separate multiple scopes with spaces, not commas.

```bash
curl -X POST https://service.sumologic.com/oauth2/token \
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
  "expires_in": 1800,
  "scope": "runLogSearch viewLibrary"
}
```

Use this access token as a Bearer token in the `Authorization` header when making API requests:

```bash
curl https://service.sumologic.com/api/v1/search/jobs \
  -H "Authorization: Bearer eyJhbGc..."
```

### Token expiration

Access tokens generated with Client Credentials flow expire after 30 minutes. When a token expires, generate a new one by repeating the token request. Unlike Authorization Code flow, Client Credentials flow does not provide refresh tokens.

:::tip Discovering endpoints programmatically
The token endpoint URL varies by deployment. To discover it programmatically (for example, in automation scripts), query the Authorization Server Metadata for your deployment:

```bash
curl https://service.sumologic.com/.well-known/oauth-authorization-server
```

The response includes the `token_endpoint` and other supported OAuth parameters.
:::

## Security best practices

* **Protect client secrets**. Store client secrets securely using environment variables, secrets management systems, or encrypted configuration files. Never commit secrets to version control.
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

<details>
<summary>Which OAuth flow should I use?</summary>

Use **Authorization Code flow** for user-facing applications where users log in through their browser. This flow is simpler to set up and handles token refresh automatically.

Use **Client Credentials flow** for server-to-server authentication, automated workflows, or applications that don't have interactive users. This flow provides more control over permissions through service accounts and OAuth scopes.

</details>

<details>
<summary>How long do access tokens last?</summary>

* **Authorization Code flow**: Access tokens typically expire after 1 hour. Use the refresh token to obtain new access tokens.
* **Client Credentials flow**: Access tokens expire after 30 minutes. Generate a new token when the current one expires.

</details>

<details>
<summary>Can I revoke OAuth access?</summary>

Yes. To revoke access for an OAuth client:

1. Go to **Administration** > **Security** > **OAuth**.
1. Find the OAuth client you want to revoke.
1. Click **Delete** or **Deactivate** (depending on UI options available).

For Client Credentials flow, you can also deactivate or delete the associated service account, which will immediately revoke all access for OAuth clients using that service account.

</details>

<details>
<summary>What happens if I change a service account's roles?</summary>

For Client Credentials flow, the OAuth client's effective permissions are limited to the intersection of the service account's roles and the OAuth client's scopes. If you restrict the service account's roles, the OAuth client's permissions are automatically reduced, even if the configured scopes remain unchanged.

</details>

<details>
<summary>How do I find the token endpoint for my deployment?</summary>

The token endpoint URL varies by [deployment](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security). For most deployments, the pattern is:

```
https://[deployment-endpoint]/oauth/token
```

For example:
* US1: `https://service.sumologic.com/oauth/token`
* US2: `https://service.us2.sumologic.com/oauth/token`
* EU: `https://service.eu.sumologic.com/oauth/token`

To discover the endpoint programmatically, query:
```bash
curl https://[deployment-endpoint]/.well-known/oauth-authorization-server
```

</details>

<details>
<summary>Can I use OAuth with the Sumo Logic APIs?</summary>

Yes. OAuth access tokens work with all Sumo Logic APIs. Include the access token in the `Authorization` header as a Bearer token:

```bash
curl https://service.sumologic.com/api/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

</details>
