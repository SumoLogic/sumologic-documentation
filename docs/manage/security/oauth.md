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

<p><a href={useBaseUrl('docs/beta')}><span className="beta">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

OAuth 2.0 enables secure authentication between Sumo Logic and external applications without sharing passwords. Use OAuth to connect AI tools, custom integrations, and third-party services to your Sumo Logic account.

Sumo Logic supports two OAuth 2.0 authentication flows:

| Flow | Use Case | Setup Complexity | Token Refresh |
| :--- | :--- | :--- | :--- |
| [Authorization Code](#authorization-code-flow) | User-facing applications with browser-based login | Simple (UI-based) | Automatic |
| [Client Credentials](#client-credentials-flow) | Service-to-service authentication, automated workflows | Moderate (API-based) | Manual or automatic |

## Authorization Code flow

This flow uses interactive browser-based authentication. Users authorize an external application to access Sumo Logic on their behalf, and the application receives an access token to make API requests.

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

### Complete the OAuth flow

Sumo Logic's Authorization Code flow follows the [OAuth 2.1 specification](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1). Your OAuth library or client handles the authorization, token exchange, and token refresh steps automatically by following the standard protocol.

To discover the authorization and token endpoints for your deployment, query the Authorization Server Metadata. Replace `[deployment-endpoint]` with your [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) (for example, `service.sumologic.com`, `service.us2.sumologic.com`, `service.eu.sumologic.com`):

```bash
curl https://[deployment-endpoint]/.well-known/oauth-authorization-server
```

The response includes `authorization_endpoint`, `token_endpoint`, and other supported OAuth parameters.

:::tip
The permissions granted via Authorization Code flow are the intersection of:
* The roles (RBAC capabilities) assigned to the authenticated user.
* The scopes assigned to the OAuth client.
* The scopes requested in the authorization request.

This means a user cannot grant more permissions than they already have in Sumo Logic.
:::

## Client Credentials flow

This flow uses service accounts for server-to-server authentication. Applications authenticate directly with Sumo Logic using a client ID and client secret, without requiring user interaction.

:::info prerequisites
* **Sumo Logic Administrator role**. Required to create OAuth clients and service accounts.
:::

### Create a service account

Create a Sumo Logic service account to represent your application or service. You can also use an existing service account.

1. Log in to Sumo Logic as an Administrator.
1. [Create a service account](/docs/manage/security/service-accounts/#create-a-service-account) with the appropriate roles for your use case.
1. Get the service account ID. You'll use this ID in the next step.
   * **Via UI**: Go to **Administration** > **Security** > **Service Accounts**, click on your service account, and copy the ID from the browser URL (appears as `selectedId=00000000076D28F9`).
   * **Via API**: Alternatively, [get a list of all service accounts](https://api.sumologic.com/docs/#operation/listServiceAccounts) and find the `id` field in the response.

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

Replace `<accessId>` and `<accessKey>` with your personal access key credentials. Replace `service.sumologic.com` with your [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) if different.

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

### Create an OAuth client

Create an OAuth client under your service account. This generates the credentials your application will use to authenticate.

1. Log in to Sumo Logic as an Administrator.
1. Go to **Administration** > **Security** > **OAuth**.
1. Click **+ Add Client**.
1. For **Type**, select **Client Credentials**.
1. Enter a **Name** and optional **Description** for your application.
1. Select the **Service Account** this OAuth client will run as (created in the previous step).
1. Select the **Scopes** your OAuth client needs. The scopes you request must already be included in your service account's effective permissions.
   :::tip
   The permissions granted to an OAuth client are limited to the intersection of:
   * The roles (RBAC capabilities) assigned to the service account.
   * The scopes assigned to the OAuth client.

   This prevents privilege escalation. If the service account's roles are restricted in the future, the OAuth client's effective permissions are automatically reduced.
   :::
1. Click **Save**.
1. Copy the **Client ID** and **Client Secret**. You'll need these to configure your application.

<details>
<summary>Creating an OAuth client via API (advanced)</summary>

Alternatively, you can [create an OAuth client using the API](https://api.sumologic.com/docs/#operation/createOAuthClient). This allows scripted or automated OAuth client provisioning.

**How are scopes enforced?**

The permissions granted to an OAuth client are limited to the intersection of the roles (RBAC capabilities) assigned to the service account and the scopes assigned to the OAuth client. This prevents privilege escalation. If the service account's roles are restricted in the future, the OAuth client's effective permissions are automatically reduced. If a requested scope is not included in the service account's roles, it will be silently excluded from the OAuth client's effective permissions.

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

### Generate an access token

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
curl https://api.sumologic.com/api/v1/search/jobs \
  -H "Authorization: Bearer eyJhbGc..."
```

:::tip
`api.sumologic.com` defaults to the us1 deployment. Replace with your [deployment-specific endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) if your org is on a different deployment (for example, `api.us2.sumologic.com`, `api.eu.sumologic.com`).
:::

### Token expiration

Access tokens generated with Client Credentials flow expire after 30 minutes. When a token expires, generate a new one by repeating the token request. Unlike Authorization Code flow, Client Credentials flow does not provide refresh tokens.

:::tip Discovering endpoints programmatically
The token endpoint URL varies by deployment. To discover it programmatically (for example, in automation scripts), query the Authorization Server Metadata. Replace `[deployment-endpoint]` with your [deployment endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) (for example, `service.sumologic.com`, `service.us2.sumologic.com`):

```bash
curl https://[deployment-endpoint]/.well-known/oauth-authorization-server
```

The response includes the `token_endpoint` and other supported OAuth parameters.
:::

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

<details>
<summary>Which OAuth flow should I use?</summary>

Use **Authorization Code flow** for user-facing applications where users log in through their browser. This flow is simpler to set up and handles token refresh automatically.

Use **Client Credentials flow** for server-to-server authentication, automated workflows, or applications that don't have interactive users. This flow provides more control over permissions through service accounts and OAuth scopes.

</details>

<details>
<summary>How long do access tokens last?</summary>

* **Authorization Code flow**: Access tokens expire after the number of seconds indicated by the `expires_in` property.
* **Client Credentials flow**: Access tokens expire after 30 minutes. Generate a new token when the current one expires.

</details>

<details>
<summary>Can I revoke OAuth access?</summary>

Yes. To revoke access for an OAuth client:

1. Go to **Administration** > **Security** > **OAuth**.
1. Find the OAuth client you want to revoke.
1. Click **Delete** or **Deactivate** (depending on UI options available).

For Client Credentials flow, you can also deactivate or delete the associated service account, which will immediately revoke all access for OAuth clients using that service account.

For Authorization Code flow, revoking Authorization Consent causes the next token refresh to fail. The current access token remains valid until it expires.

</details>

<details>
<summary>What happens if I change a service account's roles?</summary>

For Client Credentials flow, the OAuth client's effective permissions are limited to the intersection of the service account's roles and the OAuth client's scopes. If you restrict the service account's roles, the OAuth client's permissions are automatically reduced, even if the configured scopes remain unchanged.

</details>

<details>
<summary>What happens if a user's roles change in Authorization Code flow?</summary>

For Authorization Code flow, the effective permissions are the intersection of:
* The roles (RBAC capabilities) assigned to the authenticated user.
* The scopes assigned to the OAuth client.
* The scopes requested in the authorization request.

If a user's roles are restricted, their effective OAuth permissions are reduced at the next token refresh. If roles are expanded, the new permissions become available at the next token refresh.

</details>

<details>
<summary>How do I find the token endpoint for my deployment?</summary>

The token endpoint URL varies by [deployment](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security). Replace `[deployment-endpoint]` with your deployment's service endpoint. The pattern is:

```
https://[deployment-endpoint]/oauth/token
```

For example:
* US1: `https://service.sumologic.com/oauth/token`
* US2: `https://service.us2.sumologic.com/oauth/token`
* EU: `https://service.eu.sumologic.com/oauth/token`

To discover the endpoint programmatically, replace `[deployment-endpoint]` with your service endpoint (e.g., `service.sumologic.com`) and query:
```bash
curl https://[deployment-endpoint]/.well-known/oauth-authorization-server
```

</details>

<details>
<summary>Can I use OAuth with the Sumo Logic APIs?</summary>

Yes. OAuth access tokens work with all Sumo Logic APIs. Include the access token in the `Authorization` header as a Bearer token:

```bash
curl https://api.sumologic.com/api/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Replace `api.sumologic.com` with your [deployment-specific endpoint](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) if your org is on a different deployment.

</details>
