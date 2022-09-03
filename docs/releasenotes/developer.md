---
id: developer
title: Developer Release Notes
sidebar_label: Developer
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Developer Release Notes from 2018 to present are listed here.

### April 25, 2022 - APIs

New - The [Data Forwarding Management API](/docs/api/Data-Forwarding) allows you to forward log data from a Partition or Scheduled View to an S3 bucket.


---
### January 18, 2022  - APIs

New - The [Tracing API](/docs/api/Tracing) allows you to browse and execute queries for [traces](/docs/api/Tracing) and [span analytics](/docs/api/Tracing#Span-Analytics-API), and request a [service map](/docs/api/Tracing#Service-Map-API) of your application environment.

---
### November 16, 2021 - APIs

New - The [Metrics Query API](/docs/api/Metrics-Query) allows you to execute queries on various metrics and retrieve multiple time-series (data-points) over time from HTTP endpoints.

---
### August 12, 2021 - APIs

New - The [Policies Management API](/docs/api/Policies) allows you to control the security and share settings of your organization from HTTP endpoints.

---
### February 23, 2021 - APIs

New - The [Field Extraction Rule (FER) Management API](/docs/api/Field-Extraction-Rules) allows you to manage FERs from HTTP endpoints.

---
### February 16, 2021 - APIs

New - The [Partition Management API](/docs/api/Partitions) allows you to [manage Partitions](https://help.sumologic.com/Manage/Partitions_and_Data_Tiers) from HTTP endpoints.

---
### February 15, 2021 - APIs

New - The [Dynamic Parsing Management API](/docs/api/Dynamic-Parsing) allows you to configure Run Time [Field Extraction Rules](https://help.sumologic.com/Manage/Field-Extractions) from HTTP endpoints.


---
### December 21, 2020 - APIs

New - The [Account Management API](/docs/api/Account-Management) allows you to manage the [custom subdomain](https://help.sumologic.com/Manage/Manage-Subscription/12Manage_Organizational_Settings#Set_up_a_custom_subdomain) for the URL used to access your Sumo Logic account.

New - [Ingest Budget Management API V2](/docs/api/Ingest-Budget-V2) allows you to manage metadata-based [ingest budgets](https://help.sumologic.com/Manage/Ingestion-and-Volume/Ingest_Budgets) (with a scope) from HTTP endpoints.


---
### November 3, 2020  - APIs

New - The [Password Policy Management API](/docs/api/Password-Policy) is available to manage the [password policy](https://help.sumologic.com/Manage/Security/Set-the-Password-Policy) for your Sumo Logic users.

---
### October 28, 2020 - APIs

New - The [Monitor Management API](/docs/api/Monitors) is available to manage [Monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) from HTTP endpoints.


---
### October 21, 2020 - APIs

New - The [Lookup Table Management API](/docs/api/Lookup-Tables) is available to manage [Lookup Tables](https://help.sumologic.com/05Search/Lookup_Tables) from HTTP endpoints.


---
### July 23, 2020 - APIs

New - The [Dashboard (New) Management API](/docs/api/dashboard-new#Management-API) is available to manage dashboards using the [Dashboard (New)](/docs/dashboards-new) platform from HTTP endpoints.


---
### July 22, 2020 - Collection, APIs

New - [Installation Tokens](/docs/Manage/Security/Installation-Tokens) provide Installed Collectors a great alternative to Access Keys. They do not expire and can only be used to register Installed Collectors. You can embed your Installation Tokens in installation scripts confident they can't be used to make [API](/docs/API) requests if compromised.<br/><img src={useBaseUrl('img/release-notes/Installation-Tokens.png')} alt="Installation-Tokens" />

New - The Tokens Management API is available to manage [Installation Tokens](https://help.sumologic.com/Manage/Security/Installation_Tokens) from HTTP endpoints.

---
### July 2, 2020 - APIs

New - The [Field Management API](/docs/api/Fields) is available to manage your account's [Fields](https://help.sumologic.com/Manage/Fields) from HTTP endpoints.

---
### June 30, 2020 - APIs

The [Access Keys](/docs/api/Access-Keys), [SAML](/docs/api/SAML-Configuration), and [Service Whitelist](/docs/api/Service-Allowlist) APIs are complete and fully supported.


---
### April 27, 2020 - APIs

The Access Keys, SAML, and Service Whitelist APIs are in open beta.

* Access Keys allow you to securely register new Collectors and access Sumo Logic APIs.
* Organizations with Enterprise accounts can provision Security Assertion Markup Language (SAML) 2.0 to enable Single Sign-On (SSO) for user access to Sumo Logic.
* Service Whitelist Settings allow you to explicitly grant access to specific IP addresses and/or CIDR notations for logins, APIs, and dashboard access.

For links to API documentation see [APIs in Beta](/docs/api/beta).


---
### January 28, 2020 - APIs

The Lookup Table Management API is now in closed beta. You can use the API to view and manage [lookup tables](https://help.sumologic.com/?cid=10109). A lookup table is a table of data hosted on Sumo Logic that you can use to enrich the log and event data received by Sumo Logic. For more information, see [APIs in Beta](/docs/api/beta).


---
### December 11, 2019 - APIs
The App Installation API is now in open beta. You can use the API to view and install Sumo Logic applications. For more information, see [APIs in Beta](/docs/api/beta).


---
### August 27, 2019 - APIs
Update - Steps for generating clients now use [OpenAPI Generator](https://openapi-generator.tech/) instead of Swagger Codegen. Using Swagger Codegen will generate a backward incompatible client. For more details, see [https://github.com/swagger-api/swagger-codegen/issues/9103](https://github.com/swagger-api/swagger-codegen/issues/9103)


---
### August 7, 2019 - APIs
New - [Content](/docs/api/Content-Management), [Folder](/docs/api/Folders), and [Permissions](/docs/api/Content-Permissions) Management APIs allow you to manage content in your organization’s [Library](https://help.sumologic.com/01Start-Here/Library) from HTTP endpoints.


---
### June 26, 2019 - APIs
Update - The [Collector Management API](/docs/api/Collector) can return Collectors by name and manage offline Collectors with the `aliveBeforeDays` parameter.


---
### June 17, 2019 - APIs
New - The [Ingest Budget Management API](/docs/api/Ingest-Budget-v1) allows you to manage [ingest budgets](https://help.sumologic.com/Manage/Ingestion-and-Volume/Ingest_Budgets) from HTTP endpoints.

**Deprecation Notice**

Beta endpoints will be deprecated effective August 1, 2019. If you have any questions reach out to us at [ingest-budgets-beta-group@sumologic.com](mailto:ingest-budgets-beta-group@sumologic.com).


---
### May 15, 2019 - Collection

Update - Added hostname as a Collector environment variable in our [Docker image](https://github.com/SumoLogic/sumologic-collector-docker).


---
### March 22, 2019 - APIs
Update - The security services of our [API](/docs/API) framework has been upgraded. API requests with multiple forward slashes (`//`) will receive a "500 Internal Server Error" response.

---
### February 13, 2019 - APIs
New - [User and Role APIs](/docs/API) allow administrators to programmatically create and manage users and roles, making it easy to integrate Sumo into existing onboarding/offboarding business workflows.


---
### November 20, 2018 - APIs

New - As part of our new API-centric development approach, we have several [Sumo Logic APIs](/docs/api/beta) now available. Contact your sales rep to sign up to be one of our Beta Customers for the following APIs:

* Connections
* Content
* Field Extraction Rules
* Ingest Budgets
* Partitions
* Roles
* Scheduled Views
* Users

And the following APIs are coming soon:

* Dashboards
* Metrics Monitors


---
### September 11, 2018 - APIs
New -  [Receipt time](https://help.sumologic.com/05Search/Get-Started-with-Search/How-to-Build-a-Search/Use-Receipt-Time) is now available for scheduled searches, share links for searches, pinned searches, and Search Job API queries. To support receipt time, the Search Job API has a new parameter,[byReceiptTime](/docs/api/search-job#Query-parameters).


---
### July 6, 2018 - APIs
Techniques that manage load, like rate limiting and throttling, help keep the Sumo platform reliable and stable. Towards that end, a new Search Job API throttling limit was introduced today. Until now, search jobs were subject only to the global rate limit: each user is limited to four API requests/second. Now, to improve reliability Sumo is limiting the number of active search jobs for a given account to 200. To manage the number of active search jobs you can manually clear completed searches. For more information, see [Search Job API throttling](/docs/api/search-job#Throttling).
