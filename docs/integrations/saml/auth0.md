---
id: auth0
title: Auth0
sidebar_label: Auth0
description: The Sumo Logic App for Auth0 makes it easy to analyze and visualize your Auth0 event logs, and provides insight into security and operational issues.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saml/auth0.png')} alt="Thumbnail icon" width="50"/>

Auth0 is a cloud-based, extensible identity provider for applications. The Sumo Logic App for Auth0 makes it easy to analyze and visualize your Auth0 event logs, and provides insight into security and operational issues.

For more information, see [Export Logs to Sumo Logic](https://auth0.com/docs/extensions/sumologic).


## Collecting Logs for Auth0
This procedure explains how to collect error logs from Auth0.

Sumo Logic collects the following log types:
* Logins, both successes and failures
* Token exchanges, both successes and failures
* Warnings during logins
* User deletion
* Login failure reasons
* Connection errors
* User signup events
* Verification email events
* Password changes
* Rate limiting events
* Other operational events and errors

For more information about Auth0 logs, see [https://auth0.com/docs/api/managemen.../Logs/get_logs](https://auth0.com/docs/api/management/v2#!/Logs/get_logs)


### Prerequisites

Use the Auth0 Management Portal to configure the extension. For more information, see [https://auth0.com/docs/extensions/sumologic](https://auth0.com/docs/extensions/sumologic).


### Configure a Collector

Use the in-product [setup wizard](/docs/send-data/setup-wizard) in the Sumo Logic UI to configure a **Custom App**.


### Configure a Source

Source type is [HTTP](/docs/send-data/hosted-collectors/http-source/logs-metrics).

* **Name**: Required
* **Category**:
* **Timestamp Parsing Settings**:
  * **Enable Timestamp Parsing**: True
  * **Timezone**: Logs are sent in UTC by default and can be automatically detected
  * **Timestamp Format**: Select **Specify a format** and use the following, \
Format: `yyyy-MM-dd'T'HH:mm:ss.SSS'Z' \
`Timestamp locator: `"date":"(.*?)\","`
* **Multi-line Parsing Settings**:
  * **Detect Messages Spanning Multiple Lines**: True
  * **Multi Line Boundary**: Infer Boundaries


### Use Field Extraction Rules

Parse Expression: `json "date", "type", "client_id", "client_name", "ip", "user_id"`


## Sample Log Messages

```json title="Example 1"
{
   "date": "2016-02-23T19:57:29.532Z",
   "type": "sapi",
   "client_id": "AaiyAPdpYdesoKnqjj8HJqRn4T5titww",
   "client_name": "My application Name",
   "ip": "190.257.209.19",
   "location_info": {},
   "details": {},
   "user_id": "auth0|56c75c4e42b6359e98374bc2"
}
```


```json title="Example 2"
{
   "date": "2016-11-14T21:50:33.473Z",
   "type": "fp",
   "description": "Wrong email or password.",
   "connection": "Username-Password-Authentication",
   "connection_id": "con_ABCDEF",
   "client_id": "123987LKJsdfmnb",
   "client_name": "www.sumologic.com",
   "ip": "198.0.217.157",
   "user_agent": "Other 0.0.0 / Other 0.0.0",
   "details": {
      "error": {
         "message": "Wrong email or password."
      }
   },
   "user_id": "auth0|123ASD987",
   "user_name": "no-one@sumologic.com",
   "strategy": "auth0",
   "strategy_type": "database",
   "_id": "321654987654321654987654321",
   "isMobile": false
}
```



## Sample Queries

```sql title="Logins by Client per Day"
_collector="productionappauth0Logs_Collector"
| json "client_name"
| where client_name != ""
| timeslice by 1d
| count by _timeslice, client_name
| transpose row _timeslice column client_name
```

```sql title="Client Version Usage"
_collector="productionappauth0Logs_Collector"
| json "auth0_client.name", "auth0_client.version"
| concat(%auth0_client.name, " ", %auth0_client.version) as auth0_client_version
| timeslice 1h
| count by _timeslice, auth0_client_version
| transpose row _timeslice column auth0_client_version
```

```sql title="Top 10 Recent Errors"
_collector="productionappauth0Logs_Collector"
| json "type", "connection", "description", "client_name"
| where type != "slo"
| count client_name, connection, description
| top 10 client_name, connection, description by _count
```


## Installing the Auth0 App

Now that you have set up collection for Auth0, install the Sumo Logic App for Auth0 to use the preconfigured searches and dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

## Viewing Auth0 Dashboards

### Overview

**Login Event by Location.** Performs a geo lookup operation and displays user logins based on IP address on a map of the world for the last 24 hours.

**Logins per Hour.** Displays a line chart on a timeline showing the number of failed and successful logins per hour, over the last seven days.

**Top 10 Users by Successful Login.** Shows a table chart with the top ten users with the most successful logins, including user name and count for the last 24 hours.

**Top 10 Users by Failed Login.** Provides a table chart with the top ten users with the most failed logins, including user name and count for the last 24 hours.

**Top 10 Source IPs by Failed Login.** Displays a table chart with a list of ten source IP addresses causing the most failed logins, including IP and count, for the last 24 hours.

**Top 10 User Agents. **Displays the top ten most popular user agents in a pie chart from all connections for the last seven days.

**Top 10 Operating Systems.** Shows the top ten most popular operating systems based on user agent in a pie chart for the last seven days.

**Guardian MFA Activity.** Displays a line chart on a timeline showing the number of each Guardian MFA event per hour for the last seven days.

<img src={useBaseUrl('img/integrations/saml/auth0-app-overview-dashboard.png')} alt="Auth0 app overview dashboard" />

### Connections and Clients

**Logins by Client and Country.** Displays a stacked bar chart showing the number of successful logins for the last 24 hours, grouped by both client and country name. This visualizes the relative popularity of each client overall, as well as in a given country.

**Logins by Client per Day.** Shows a stacked bar chart on a timeline showing the number of successful logins for the last seven days, grouped by client per day. This shows the popularity of each client over the past week, and the relative popularity among clients.

**Connection Types per Hour.** Provides a line chart on a timeline of the connection types used for the past seven days.

**Client Version Usage. **Displays a line chart on a timeline of the Auth0 library version being used by all clients for the past seven days. This is useful to detect outdated clients, as well as to track upgrades.

**Top 10 Clients.** Shows a table chart that lists the ten most popular clients, including client name and count for the past 24 hours.

**Top 10 Recent Errors. **Provides a table chart with a list of the ten most frequent errors, including details on client name, connection, description and count for the last 24 hours. This is useful for discovering and troubleshooting operational issues.

<img src={useBaseUrl('img/integrations/saml/auth0-app-overview-dashboard-mapbox.png')} alt="Auth0 app-overview-dashboard-mapbox" />
