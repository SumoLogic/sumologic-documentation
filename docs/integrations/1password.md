---
id: 1password
title: Sumo Logic App for 1Password
sidebar_label: 1Password
description: The Sumo Logic App for 1Password helps you monitor your 1Password account’s sign-in and item usage events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/1password/1password.png')} alt="Thumbnail icon" width="75"/>

1Password is a secure and convenient password manager for documents, credit card information, and addresses. The Sumo Logic App for 1Password helps you monitor your 1Password account’s sign-in and item usage events. The dashboards provide insight into failed and successful authentications, events breakdown by client applications, type, category, users, geo-location of events, outliers, and threat analysis of sign-in events. This app helps your secure 1Password vault access by providing insights into user actions and threat intel analysis on clients accessing items in shared vaults.

## Log Types  

The 1Password App uses following logs:
* [Sign-in Events](https://support.1password.com/events-api-reference/#signinattemptitems-object)
* [Item Usage](https://support.1password.com/events-api-reference/#itemusage-object)


### Sample Log Messages

```json title="Sign-in attempt Event"
    {
      "uuid": "56YE2TYN2VFYRLNSHKPW5NVT5E",
      "session_uuid": "A5K6COGVRVEJXJW3XQZGS7VAMM",
      "timestamp": "2021-03-01T16:32:50-03:00",
      "category": "firewall_failed",
      "type": "continent_blocked",
      "country": "France",
      "details": {
        "value": "Europe"
      },
      "target_user": {
        "uuid": "IR7VJHJ36JHINBFAD7V2T5MP3E",
        "name": "Wendy Appleseed",
        "email": "wendy_appleseed@agilebits.com"
      },
      "client": {
        "app_name": "1Password Extension",
        "app_version": "20127",
        "platform_name": "Chrome",
        "platform_version": "string",
        "os_name": "MacOSX",
        "os_version": "10.15.6",
        "ip": "13.227.95.22"
      }
    }
```

```json title="Item Usage Event"
    {
      "uuid": "56YE2TYN2VFYRLNSHKPW5NVT5E",
      "timestamp": "2020-06-11T16:32:50-03:00",
      "used_version": 0,
      "vault_uuid": "VZSYVT2LGHTBWBQGUJAIZVRABM",
      "item_uuid": "SDGD3I4AJYO6RMHRK8DYVNFIDZ",
      "user": {
        "uuid": "4HCGRGYCTRQFBMGVEGTABYDU2V",
        "name": "Wendy Appleseed",
        "email": "wendy_appleseed@agilebits.com"
      },
      "client": {
        "app_name": "1Password Extension",
        "app_version": "20127",
        "platform_name": "Chrome",
        "platform_version": "string",
        "os_name": "MacOSX",
        "os_version": "10.15.6",
        "ip": "13.227.95.22"
      },
    "action": "secure-copy"
    }
```


### Sample Queries

```sql title="Successful Sign-in"
_sourceCategory="1pw"
| json "type", "category", "timestamp",  "details", "target_user.name", "target_user.email", "client.app_name", "client.app_version", "client.platform_name", "client.os_name", "client.os_version", "client.ip_address", "location.country", "location.region", "location.city" as type, category, timestamp, details, target_user_name, target_user_email, client_app_name, client_app_version, client_platform, client_os, client_os_version, client_ip, country, region, city
| where category matches  "{{category}}" AND type matches  "{{type}}" AND country matches  "{{country}}" AND city matches  "{{city}}" AND target_user_name matches  "{{target_user_name}}" AND client_app_name matches  "{{client_app_name}}" AND client_platform matches  "{{client_platform}}" AND client_os matches  "{{client_os}}"
| where category matches "*succ*"
| count by timestamp, target_user_name, type, category, details,client_app_name, client_app_version, client_platform, client_os, client_os_version, client_ip, country, region, city
```


```sql title="Failed Sign-in"
_sourceCategory="1pw"
| json "type", "category", "timestamp",  "details", "target_user.name", "target_user.email", "client.app_name", "client.app_version", "client.platform_name", "client.os_name", "client.os_version", "client.ip_address", "location.country", "location.region", "location.city" as type, category, timestamp, details, target_user_name, target_user_email, client_app_name, client_app_version, client_platform, client_os, client_os_version, client_ip, country, region, city
| where category matches  "{{category}}" AND type matches  "{{type}}" AND country matches  "{{country}}" AND city matches  "{{city}}" AND target_user_name matches  "{{target_user_name}}" AND client_app_name matches  "{{client_app_name}}" AND client_platform matches  "{{client_platform}}" AND client_os matches  "{{client_os}}"
| where !(category matches "*succ*")
| count by timestamp, target_user_name, type, category, details,client_app_name, client_app_version, client_platform, client_os, client_os_version, client_ip, country, region, city
```


```sql title="Item Usage"
_sourceCategory=1pw action
| json "timestamp", "user.name", "client.app_name", "client.platform_name", "client.platform_version", "client.os_name", "client.os_version", "client.ip_address", "location.country", "location.region", "location.city", "action", "vault_uuid", "item_uuid" as timestamp, user_name, client_app_name, client_platform, client_platform_version, client_os, client_os_version, client_ip, country, region, city, action, vault_uuid, item_uuid
| count by timestamp, user_name, client_app_name, client_platform, client_platform_version, client_os, client_os_version, client_ip, country, region, city, action, vault_uuid, item_uuid
```

## Collecting Logs for 1Password

Follow the instructions for setting up [Cloud to Cloud Integration for 1Password App](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/1password-source) to create the source and use the same source category while installing the app.

## Installing the 1Password App

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**. Version selection is applicable only to a few apps currently. For more information, see [Installing the Apps from the Library](/docs/get-started/apps-integrations#install-apps-from-the-library).
3. To install the app, complete the following fields.
   * **App Name.** You can retain the existing name, or enter a name of your choice for the app. 
   * **Data Source.** Select either of these options for the data source. 
      * Choose **Source Category**, and select a source category from the list. 
      * Choose **Enter a Custom Data Filter**, and enter a custom source category beginning with an underscore. Example: (`_sourceCategory=MyCategory`). 
   * **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.


## Viewing 1Password Dashboards

### Overview
1Password - Overview provides an overview of 1Password Events including events breakdown by type, category, geographic location, one-day time comparison of events, and failed sign-in activity.

<img src={useBaseUrl('img/integrations/1password/1Password-Overview.png')} alt="1Password-Overview" />

### Successful Sign-ins
1Password - Successful Sign-ins dashboard provides geographic location of successful sign-in events, one-day time comparison of events, breakdown of events by Category, Type, Users, Country, State, and City.

<img src={useBaseUrl('img/integrations/1password/1Password-Successful-Sign-ins.png')} alt="1Password-Successful-Sign-ins" />

### Failed Sign-ins
1Password - Failed Sign-ins dashboard provides geographic location of failed events, one-day time comparison of events, breakdown of events by Category, Type, Users, Country, State, and City.

<img src={useBaseUrl('img/integrations/1password/1Password-Failed-Sign-ins.png')} alt="1Password-Failed-Sign-ins" />

### Threat Intel
1Password - Threat Intel dashboard provides high-level views of threats throughout your 1Password Service. Dashboard panels display visual graphs and detailed information on Threats by the client, target user, source app, platform, threats by actors, and threats by malicious confidence.

<img src={useBaseUrl('img/integrations/1password/1Password-Threat-Intel.png')} alt="1Password-Threat-Intel" />

### Item Usage
1Password - Item Usage dashboard shows information about items in shared vaults that have been modified, accessed, or used. This dashboard provides you geo-locations of clients who accessed items in the shared vault, it also provides threat intel analysis of client IPs to secure your vault access.

<img src={useBaseUrl('img/integrations/1password/1Password-Item-Usage.png')} alt="1Password-Item-Usage" />
