---
id: snowflake-logs-source-beta
title: Snowflake Logs Source (Beta)
sidebar_label: Snowflake Logs
keywords:
  - cloud-to-cloud
  - snowflake-logs
description: Learn how to collect the row data from the supported global tables (QUERY_HISTORY, LOGIN_HISTORY, SESSIONS, GRANTS_TO_USERS, DATA_TRANSFER_HISTORY, STAGES, GRANTS_TO_ROLES, USERS and Custom Events) and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/snowflake.png')} alt="logo" width="150" />

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::
Snowflake is a leading cloud data platform known for its scalable, innovative data warehousing and analytics solutions. It provides organizations with reliable and flexible tools to support data-driven decision-making. Snowflake enables seamless access to essential tables, allowing you to efficiently retrieve data, monitor key metrics, optimize data management processes, and enhance visibility and control over your Snowflake environment.

## Data collected

The data will be collected from Snowflake's database using the connection string from the following log types and their respective tables:

| Polling Interval | Data                                                                                                      |
| :--------------- | :-------------------------------------------------------------------------------------------------------- |
| 5 minutes        | [Query History Logs](https://docs.snowflake.com/en/sql-reference/account-usage/query_history)             |
| 5 minutes        | [Security Logs](https://docs.snowflake.com/en/sql-reference/account-usage)                                |
| 5 minutes        | [Custom Event Logs](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-setting-up) |

:::info

- Ensure you have the Snowflake custom role with the necessary permissions to collect the Snowflake logs from its database.
- There is an expected data latency of up to 3 hours when retrieving data from the Snowflake database. [Learn more](https://docs.snowflake.com/en/sql-reference/account-usage#data-latency).
- Permissions required for custom user role:
  - USAGE on the database(s) and schema(s) containing the logs/views you want to ingest.
  - SELECT on the specific tables/views to be read.
  - USAGE on the compute warehouse to be used for queries.
  - USAGE on the integration object (if using external stages).
    :::

## Setup

### Vendor configuration

The Snowflake Logs source requires you to provide the following data to set up the integration:

- **Account Identifier**. An account identifier uniquely identifies a Snowflake account within your organization, as well as throughout the global network of Snowflake-supported cloud platforms and cloud regions. For more information, see [Account identifiers](https://docs.snowflake.com/en/user-guide/admin-account-identifier).
- **Username**. Snowflake account's login username. For example, `SUMOLOGIC`.
- **Password**. Snowflake account's login password. For example, `yufncixxxxxxxxxp55hbdy7`.
- **Programmatic Access Token**. Collect your Snowflake Programmatic Access Token following the instructions in the [Snowflake Documentation](https://docs.snowflake.com/en/user-guide/programmatic-access-tokens).
  :::note
  Starting November 2025, Snowflake will block single-factor authentication (password-only sign-ins) as part of their enhanced security protocols. Sumo Logic recommends that you update your integration to [Programmatic Access Tokens (PATs)](https://docs.snowflake.com/en/user-guide/programmatic-access-tokens) before 1st November 2025 to ensure continued access.
  :::
- **OAuth Client ID**, **OAuth Client Secret**, and **OAuth Authorization Code**. Collect these values by completing the [OAuth prerequisites](#oauth-prerequisites).

#### OAuth prerequisites

Complete the following steps in Snowflake before you configure the source with the **OAuth** authentication method. Run the SQL statements with the `ACCOUNTADMIN` role or another role that can create integrations

##### Create a security integration

Create a Snowflake OAuth security integration for a custom confidential client:

```sql
USE ROLE ACCOUNTADMIN;
CREATE OR REPLACE SECURITY INTEGRATION SUMO_OAUTH
  TYPE = OAUTH
  ENABLED = TRUE
  OAUTH_CLIENT = CUSTOM
  OAUTH_CLIENT_TYPE = 'CONFIDENTIAL'
  OAUTH_REDIRECT_URI = 'http://127.0.0.1:8080/callback'
  OAUTH_ISSUE_REFRESH_TOKENS = TRUE
  OAUTH_REFRESH_TOKEN_VALIDITY = 7776000
  OAUTH_SINGLE_USE_REFRESH_TOKENS_REQUIRED = TRUE
  OAUTH_ALLOW_NON_TLS_REDIRECT_URI = TRUE;
```

- `OAUTH_REDIRECT_URI` must match the redirect URI sent in the authorization and token requests exactly. `OAUTH_ALLOW_NON_TLS_REDIRECT_URI = TRUE` allows the HTTP loopback address.
- `OAUTH_REFRESH_TOKEN_VALIDITY = 7776000` sets the refresh token validity to 90 days (the value is in seconds). For more information, see the [Snowflake documentation](https://docs.snowflake.com/en/sql-reference/sql/create-security-integration-oauth-snowflake).
- `OAUTH_SINGLE_USE_REFRESH_TOKENS_REQUIRED = TRUE` makes every refresh token single-use.

##### Get the client ID and client secret

Run the following query:

```sql
SELECT SYSTEM$SHOW_OAUTH_CLIENT_SECRETS('SUMO_OAUTH');
```

The result is a JSON object. From which Copy `OAUTH_CLIENT_ID` and `OAUTH_CLIENT_SECRET` from the result and store them in a secure location.

##### Create the custom role

Run the following statements to create the role the source uses to read the `SNOWFLAKE` database. Replace `<user_name>` with the Snowflake user who authorizes the source.

```sql
USE ROLE ACCOUNTADMIN;
CREATE WAREHOUSE IF NOT EXISTS SUMOLOGIC_C2C_WH;
CREATE ROLE IF NOT EXISTS SUMOLOGIC_C2C_ROLE;
GRANT DATABASE ROLE SNOWFLAKE.SECURITY_VIEWER TO ROLE SUMOLOGIC_C2C_ROLE;
GRANT DATABASE ROLE SNOWFLAKE.USAGE_VIEWER TO ROLE SUMOLOGIC_C2C_ROLE;
GRANT DATABASE ROLE SNOWFLAKE.GOVERNANCE_VIEWER TO ROLE SUMOLOGIC_C2C_ROLE;
GRANT DATABASE ROLE SNOWFLAKE.OBJECT_VIEWER TO ROLE SUMOLOGIC_C2C_ROLE;
GRANT USAGE ON WAREHOUSE SUMOLOGIC_C2C_WH TO ROLE SUMOLOGIC_C2C_ROLE;
GRANT ROLE SUMOLOGIC_C2C_ROLE TO USER <user_name>;
ALTER USER <user_name> SET DEFAULT_WAREHOUSE = SUMOLOGIC_C2C_WH;
```

`ACCOUNTADMIN`, `SECURITYADMIN`, and `ORGADMIN` are blocked for Snowflake OAuth by default, so the authorization request must name this role in its scope (see [Generate the authorization code](#generate-the-authorization-code)). Without it, Snowflake uses the user's default role and can reject the request with a message that the role has been blocked. For more information, see the [Snowflake documentation](https://docs.snowflake.com/en/user-guide/oauth-custom#blocking-specific-roles-from-using-the-integration).

##### Grant access to custom event tables

If you are using custom event tables with OAuth authentication, ensure that `SUMOLOGIC_C2C_ROLE` has the necessary permissions to access and collect data from those tables. If you are using multiple custom event tables, repeat the process for each table.

Before running the queries, replace the following placeholders:

- `<database_name>` with your database name.
- `<schema_name>` with your schema name.
- `<table_name>` with your custom event table name.

Run the following SQL statements:

```sql
USE ROLE ACCOUNTADMIN;
GRANT USAGE ON DATABASE <database_name> TO ROLE SUMOLOGIC_C2C_ROLE;
GRANT USAGE ON SCHEMA <database_name>.<schema_name> TO ROLE SUMOLOGIC_C2C_ROLE;
GRANT SELECT ON TABLE <database_name>.<schema_name>.<table_name> TO ROLE SUMOLOGIC_C2C_ROLE;
```

To verify that `SUMOLOGIC_C2C_ROLE` can access the custom event table, run the following query:

```sql
USE ROLE SUMOLOGIC_C2C_ROLE;
USE SECONDARY ROLES NONE;
SELECT * FROM <database_name>.<schema_name>.<table_name> LIMIT 1;
```

If the query runs without errors, the role has the required permissions. If you get an error similar to `Database '<database_name>' does not exist or not authorized`, the role does not have the necessary permissions on the database or its objects. Run the grant queries above, and then run the verification query again.

##### Generate the authorization code

1. Replace `<account_identifier>` with your account identifier and `<client_id>` with your client ID in the following URL, and then open it in a web browser:
   ```text
   https://<account_identifier>.snowflakecomputing.com/oauth/authorize?client_id=<client_id>&response_type=code&redirect_uri=http%3A%2F%2F127.0.0.1%3A8080%2Fcallback&scope=refresh_token%20session%3Arole%3ASUMOLOGIC_C2C_ROLE
   ```
1. On the Snowflake login page, log in and click **Allow** to grant access.
1. Snowflake redirects the browser to the callback URL in the following format:
   ```text
   http://127.0.0.1:8080/callback?code=<code>&iss=https%3A%2F%2F<account_identifier>.snowflakecomputing.com%2Foauth
   ```
   The browser shows a connection error because nothing listens on port 8080. This is expected.
1. Copy the value of the `code` parameter from the address bar. The authorization code is short-lived and can be used only once, so enter it in the source configuration right away.

:::note

- The authorization code is valid for one-time use only and expires quickly. Therefore, it cannot be reused when the source is reconfigured. Instead, the source stores the refresh token and its timestamp in the source state. When you reconfigure the source, it uses the stored refresh token directly to generate a new access token, without requiring a new authorization code.
- If you configure the source without following the prerequisites and encounter any errors, there is no way to revert the configuration. You need to create and configure a new source from scratch. Therefore, carefully follow all the steps in the prerequisites before you configure the source.
  :::

Once you have all the required values, set up the source configuration to collect your desired log types available in the configuration section.

### Source configuration

When you create a Snowflake Logs source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Snowflake source:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Snowflake**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   - <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   - <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Snowflake Account Identifier**. Enter your Snowflake account [name](#vendor-configuration).
1. **Authentication Configuration**. Sumo Logic provides three authentication methods: **Basic**, **PAT Token**, and **OAuth**.
   - **Basic**:
     1. In **Snowflake Username**, enter your Snowflake login [username](#vendor-configuration).
     1. In **Snowflake Password**, enter your Snowflake login [password](#vendor-configuration).
   - **PAT Token**:
     1. In **Snowflake Programmatic Access Token**, enter your Programmatic Access Token collected from the [Snowflake platform](#vendor-configuration).
   - **OAuth**:
     1. In **OAuth Client ID**, enter the client ID collected in the [OAuth prerequisites](#oauth-prerequisites).
     1. In **OAuth Client Secret**, enter the client secret collected in the [OAuth prerequisites](#oauth-prerequisites).
     1. In **OAuth Authorization Code**, enter the one-time authorization code from the redirect URL after you authorize the connector in Snowflake.
1. **Log Types**. Select the types of logs you want to collect data from:

   - **Collect Query History Logs**. This configuration option will collect data from `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY`.
   - **Collect Security Logs**. This configuration option will collect data from the following tables. By default, **All Tables** is selected. To collect specific tables, select them in **Security Tables**.
     - `SNOWFLAKE.ACCOUNT_USAGE.LOGIN_HISTORY`
     - `SNOWFLAKE.ACCOUNT_USAGE.SESSIONS`
     - `SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_USERS`
     - `SNOWFLAKE.ACCOUNT_USAGE.DATA_TRANSFER_HISTORY`
     - `SNOWFLAKE.ACCOUNT_USAGE.STAGES`
     - `SNOWFLAKE.ACCOUNT_USAGE.GRANTS_TO_ROLES`
     - `SNOWFLAKE.ACCOUNT_USAGE.USERS`
   - **Collect Custom Event Logs (Format: DATABASE.SCHEMA.TABLE)**. Your custom event tables. The custom event tables should have the table schema as mentioned [here](https://docs.snowflake.com/en/developer-guide/logging-tracing/event-table-columns#label-event-table-schema). For each table, configure the following:

     - **Table Name**. Format: `DATABASE.SCHEMA.TABLE`. For example, `SNOWFLAKE_LEARNING_DATABASE.MY_DATABASE_SCHEMA.MY_CUSTOM_EVENT_TABLE`.
     - **Delay Time**. How long to wait before collecting new data from the table. Supported values are `0m` to `10080m` or `0h` to `168h` (7 days). Default is `0m`.
     - **Timestamp Field**. The column in the table that contains the event timestamp. Default is `TIMESTAMP`.

       :::note
       The Snowflake Custom Events feature does not support timestamps with time zones when storing generated data in custom tables. Consequently, data is stored according to the Snowflake account's current time zone. Changing the account's time zone after a source has been configured to collect custom events can lead to data duplication or loss. Therefore, it is recommended not to change the time zone setting once the source has been configured to collect custom events.
       :::

1. **Polling Interval**. The polling interval is set to 1 hour by default. Supported values are `5m` to `10080m` or `1h` to `168h`. This sets how often the source checks for new data.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

:::info
After configuring the Snowflake Logs source, consider installing the Sumo Logic app for [Snowflake Logs](/docs/integrations/saas-cloud/snowflake-logs/) to visualize and analyze the collected data using prebuilt dashboards and monitor alerts.
:::

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter  | Type        | Value                                         | Required | Description                      |
| :--------- | :---------- | :-------------------------------------------- | :------- | :------------------------------- |
| schemaRef  | JSON Object | `{"type":"Snowflake Logs"}`                   | Yes      | Define the specific schema type. |
| sourceType | String      | `"Universal"`                                 | Yes      | Type of source.                  |
| config     | JSON Object | [Configuration object](#configuration-object) | Yes      | Source type specific values.     |

### Configuration Object

| Parameter              | Type             | Required                          | Default     | Description                                                                                                                                                                                                                              | Example                                                                                |
| :--------------------- | :--------------- | :-------------------------------- | :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| name                   | String           | Yes                               | `null`      | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`.                                | `"mySource"`                                                                           |
| description            | String           | No                                | `null`      | Type a description of the source.                                                                                                                                                                                                        | `"Testing source"`                                                                     |
| category               | String           | No                                | `null`      | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`                                                                      |
| fields                 | JSON Object      | No                                | `null`      | JSON map of key-value fields (metadata) to apply to the Collector or source. Use the boolean field \_siemForward to enable forwarding to SIEM.                                                                                           | `{"_siemForward": false, "fieldA": "valueA"}`                                          |
| authType               | String           | Yes                               | `basic`     | Authentication method. Supported values are `basic`, `patToken`, and `oauth`.                                                                                                                                                            | `oauth`                                                                                |
| username               | String           | Yes, if `authType` is `basic`     | `null`      | Snowflake account login username.                                                                                                                                                                                                        | `SUMOLOGIC`                                                                            |
| password               | String           | Yes, if `authType` is `basic`     | `null`      | Snowflake account login password.                                                                                                                                                                                                        | `yufncixxxxxxxxxp55hbdy7`                                                              |
| patToken               | String           | Yes, if `authType` is `patToken`  | `null`      | Your Snowflake programmatic access token.                                                                                                                                                                                                |                                                                                        |
| oauthClientId          | String           | Yes, if `authType` is `oauth`     | `null`      | The OAuth client ID of your Snowflake security integration.                                                                                                                                                                              |                                                                                        |
| oauthClientSecret      | String           | Yes, if `authType` is `oauth`     | `null`      | The OAuth client secret of your Snowflake security integration.                                                                                                                                                                          |                                                                                        |
| oauthAuthorizationCode | String           | Yes, if `authType` is `oauth`     | `null`      | The one-time code from the redirect URL after you authorize the connector in Snowflake.                                                                                                                                                  |                                                                                        |
| accountIdentifier      | String           | Yes                               | `null`      | Snowflake account name.                                                                                                                                                                                                                  | `qabbxxr-hj65789`                                                                      |
| collectQueryHistory    | Boolean          | No                                | `false`     | The boolean value to collect the query history tables.                                                                                                                                                                                   | `SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY`                                                |
| collectSecurity        | Boolean          | No                                | `false`     | The boolean value to collect the security tables.                                                                                                                                                                                        | `true`                                                                                 |
| securityTables         | Array of strings | No                                | `["all"]`   | The security tables to collect when `collectSecurity` is `true`. Supported values are `all`, `LOGIN_HISTORY`, `SESSIONS`, `GRANTS_TO_USERS`, `DATA_TRANSFER_HISTORY`, `STAGES`, `GRANTS_TO_ROLES`, and `USERS`.                          | `["LOGIN_HISTORY", "SESSIONS"]`                                                        |
| collectEvents          | Boolean          | No                                | `false`     | The boolean value to collect the custom event tables.                                                                                                                                                                                    | `true`                                                                                 |
| customEventTables      | Array of objects | Yes, if `collectEvents` is `true` | `null`      | List of custom event tables from which the data should be collected. Each object has the `tableName`, `delayTime`, and `timestampField` parameters.                                                                                      | `[{"tableName": "DB.SCHEMA.TABLE", "delayTime": "0m", "timestampField": "TIMESTAMP"}]` |
| tableName              | String           | Yes                               | `null`      | Name of the custom event table. Format: `DATABASE.SCHEMA.TABLE`.                                                                                                                                                                         | `SNOW_DB.SCHEMA.TABLE1`                                                                |
| delayTime              | String           | No                                | `0m`        | Time to wait before collecting new data from the table. Supported values are `0m` to `10080m` or `0h` to `168h`.                                                                                                                         | `10m`                                                                                  |
| timestampField         | String           | No                                | `TIMESTAMP` | Column in the table that contains the event timestamp.                                                                                                                                                                                   | `TIMESTAMP`                                                                            |
| pollingInterval        | String           | Yes                               | `1h`        | Time interval after which the source will check for new data. Supported values are `5m` to `10080m` or `1h` to `168h`.                                                                                                                   | `1h`                                                                                   |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/snowflake-logs/example-beta.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/snowflake-logs/example-beta.tf
```

## Limitations

The refresh token expires after 90 days. If the Cloud-to-Cloud (C2C) source remains inactive for more than 90 days, the previously stored refresh token will no longer be valid. In that case, you need to generate a new authorization code to obtain a new refresh token. For more information refer this [doc](https://docs.snowflake.com/en/sql-reference/sql/create-security-integration-oauth-snowflake)

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
