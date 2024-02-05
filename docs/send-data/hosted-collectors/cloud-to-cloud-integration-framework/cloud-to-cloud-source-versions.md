---
id: cloud-to-cloud-source-versions
title: Cloud-to-Cloud Source Versions
sidebar_label: Cloud-to-Cloud Versions
description: Learn how to continuously update your Sources in the Cloud-to-Cloud Integration Framework to maintain data collection.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sources in the Cloud-to-Cloud Integration Framework need updates over time to maintain data collection. Updates can vary in severity and may not require any input from you.

Updates are divided using semantic versioning. The syntax of version numbers are in the following format:

`MAJOR.MINOR.PATCH`

where

* `MAJOR` is not backward compatible and requires new configuration input from you, either in Sumo Logic or the service you're collecting from. * Requires manual upgrade through the web interface or API. * Sumo Logic provides upgrade instructions.
* `MINOR` is backward compatible, it may be user-facing such as a new optional or default configuration value, however, you don't have to make the change, it's automatically upgraded.
* `PATCH` is backward compatible, is usually bug fixes or security updates, and is automatically upgraded.

Additional labels for pre-release and build metadata are available as extensions to the MAJOR.MINOR.PATCH format.

## Collection page

There is an **Upgrade Sources** link on the Collection page that shows a table of major upgrades available.

![upgrade collectors button.png](/img/send-data/upgrade-collectors-button.png)

A table with Sources available to upgrade is displayed when you click **Upgrade Sources** on the Collection page.

![versions table.png](/img/send-data/versions-table.png)

Since these are major versions they do require you to take some action. You can hover and select the upgrade icon to open the Source in edit mode and provide the required information for the upgrade.

![upgrade button.png](/img/send-data/upgrade-button.png)

The Source will show the required upgrade instructions at the top of the panel. The following screenshot shows that the Source requires you to fill out a new field called **format**.

![major version upgrade requirements.png](/img/send-data/major-version-upgrade-requirements.png)

Once you complete the upgrade instructions you can select the **Upgrade** button to initiate the version upgrade.

## Collector Management API

You can use the Source PUT endpoint from the Collector Management API to upgrade your Source.

Cloud-to-Cloud Source JSON needs to assign `version` to `latest` in `schemaRef` block. If you don't, it will only update any other configuration changes.

For example,

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Cisco AMP",
      "version":"latest"
    },
    "config":{
      "name":"Cisco",
      "description":"East field",
      "clientId":"********",
      "apiKey":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeamF",
      "pollingInterval":300
    },
    "sourceType":"Universal"
  }
}
```

## Audit version changes

The Audit Event Index provides event logs in JSON on activities from your account allowing you to monitor and audit version changes. The following are example queries to audit version changes.

### Major version upgrade

This query parses the versions from update events and only returns ones that changed. To check a specific Source, replace `<Name of Source>` with a Source name and remove the [comment syntax](/docs/search/get-started-with-search/search-basics/comments-search-queries) `//` from the scope of the query.

```sql
_index=sumologic_audit_events _sourceCategory=collection _sourceName=SourceUpdated //"<Name of Source>"
| json "to.schemaRef.version" as to_version
| json "from.schemaRef.version" as from_version
| where from_version != to_version
| json "from.state.state" as from_state
| json "to.state.state" as to_state
| json "to.sourceType" as to_source_type
| json "from.sourceType" as from_source_type
| json "from.schemaRef.type"
| json "to.schemaRef.type"
| json "sourceIdentity.sourceId"
| json "sourceIdentity.sourceName"
```

Returns the following

* fields: `to_version`, `from_version` ,`from_state`, `to_state`, `to_source_type`, `from_source_type`, `to_schemaRef_type`, `from_schemaRef_type`, `sourceIdentity_sourceId`, and `sourceIdentity_sourceName`.
* event log:

```json
{
    "operator": {
        "email": "sumologic@sumologic.com",
        "id": "00000000005725EE",
        "interface": "UI",
        "sessionId": "yc34a3001h7qi7ykuif8t1131",
        "sourceIp": "54.177.241.252",
        "type": "UserContext"
    },
    "sourceIdentity": {
        "collectorId": "0000000006357EB8",
        "collectorName": "sumo-hosted",
        "sourceId": "000000000A17F6E8",
        "sourceName": "NameOfSource"
    },
    "from": {
        "schemaRef": {
            "type": "Duo",
            "version": "1.0.0"
        },
        "config": {
            "includeTimestamp": false,
            "name": "NameOfSource",
            "intervalSec": 120,
            "description": "desc",
            "fields": {
                "_siemForward": false
            },
            "message": "test"
        },
        "state": {
            "state": "Collecting"
        },
        "sourceType": "Universal"
    },
    "to": {
        "schemaRef": {
            "type": "Duo",
            "version": "2.0.0"
        },
        "config": {
            "includeTimestamp": false,
            "name": "NameOfSource",
            "intervalSec": 120,
            "description": "desc",
            "fields": {
                "_siemForward": false
            },
            "message": "test",
            "newField": "analyze"
        },
        "state": {
            "state": "Collecting"
        },
        "sourceType": "Universal"
    },
    "accountId": "0000000000000005",
    "eventId": "f68f7c61-9892-4ae6-b956-a8cda1eb4a93",
    "eventName": "SourceUpdated",
    "eventTime": "2021-06-17T23:41:03.365Z",
    "eventFormatVersion": "1.0",
    "subsystem": "collection"
}
```

### Minor version upgrade

This query parses the versions and states from update events and only returns ones that have a value of `upgrading` as the `from state`. Minor upgrade events show a state change from `upgrading` to `pending`. The version changes are not tracked in one event log so the to and from versions will be the same. To check a specific Source, replace `<Name of Source>` with a Source name and remove the [comment syntax](/docs/search/get-started-with-search/search-basics/comments-search-queries) `//` from the scope of the query.

```sql
_index=sumologic_audit_events _sourceName=SourceUpdated //"<Name of Source>"
| json "from.state.state" as from_state
| where from_state="Upgrading"
| json "to.state.state" as to_state
| json "to.schemaRef.version" as to_version
| json "from.schemaRef.version" as from_version
| json "to.sourceType" as to_source_type
| json "from.sourceType" as from_source_type
| json "to.schemaRef.type"
| json "from.schemaRef.type"
| json "sourceIdentity.sourceId"
| json "sourceIdentity.sourceName"
```

Returns the following

* fields: `from_state`, `to_state`, `to_version`, `from_version`, `to_source_type`, `from_source_type`, `to_schemaRef_type`, `from_schemaRef_type`, `sourceIdentity_sourceId`, and `sourceIdentity_sourceName`.
* event log:

```json
{
    "operator": {
        "type": "SystemContext"
    },
    "sourceIdentity": {
        "collectorId": "000000000672DC28",
        "collectorName": "Sumo Logic",
        "sourceId": "0000000006C7EC90",
        "sourceName": "Cisco"
    },
    "from": {
        "state": {
            "state": "Upgrading"
        },
        "schemaRef": {
            "type": "Cisco AMP",
            "version": "0.1.0"
        },
        "config": {
            "includeTimestamp": false,
            "name": "Cisco",
            "intervalSec": 3455,
            "fields": {
                "_siemForward": false
            },
            "message": "Hi"
        },
        "sourceType": "Universal"
    },
    "to": {
        "state": {
            "state": "Pending"
        },
        "schemaRef": {
            "type": "Cisco AMP",
            "version": "0.1.0"
        },
        "config": {
            "includeTimestamp": false,
            "name": "Cisco",
            "intervalSec": 3455,
            "fields": {
                "_siemForward": false
            },
            "message": "Hi"
        },
        "sourceType": "Universal"
    },
    "accountId": "0000000000000131",
    "eventId": "919d3514-24c0-45fe-a47c-db183b7d40ad",
    "eventName": "SourceUpdated",
    "eventTime": "2021-06-17T13:05:30.201Z",
    "eventFormatVersion": "1.0 beta",
    "subsystem": "collection"
}
```
