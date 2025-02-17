---
id: dragos
title: Dragos
sidebar_label: Dragos
description: The DocuSign app for Sumo Logic provides deep visibility into industrial cybersecurity by analyzing critical data across addresses, assets, vulnerabilities, zones, and notifications within your Dragos-managed environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/dragos-logo.png')} alt="dragos-logo" width="50" />

The Sumo Logic app for Dragos provides deep visibility into industrial cybersecurity by analyzing critical data across addresses, assets, vulnerabilities, zones, and notifications within your Dragos-managed environment. This app enables IT and OT security teams to gain real-time insights into your asset behaviors, network segmentation, threat intelligence, and risk exposure, allowing for proactive threat detection and response.

By leveraging the Dragos security insights, you can monitor industrial control systems (ICS) and operational technology (OT) environments with enhanced situational awareness. The app’s pre-configured dashboards offer detailed visibility into asset inventory, security vulnerabilities, zone-based access controls, and system notifications. Analysts can track emerging threats, unauthorized access attempts, configuration changes, and high-risk vulnerabilities to fortify security posture and ensure compliance with industry standards.

With real-time alerting and actionable intelligence, this Sumo Logic app for Dragos helps you to minimize cybersecurity risks, improve operational resilience, and safeguard critical infrastructure from evolving cyber threats.

:::info
This app includes [built-in monitors](#dragos-alerts). For details on creating custom monitors, refer to [Create monitors for Dragos app](#create-monitors-for-dragos-app).
:::

## Log types

This app uses Sumo Logic's [Dragos Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/dragos-source/#data-collected) to collect Vulnerabilities, Notifications, Addresses, Zones, and Assets logs from the Dragos platform.

### Sample log messages

<details>
<summary>Vulnerability Log</summary>

```json
{
            "observer": {
                "vendor": "Dragos",
                "type": "OT Vulnerability",
                "name": "Intelligence",
                "product": "Vulnerability Database",
                "version": "1.0.0",
                "ip": "10.42.0.70",
                "mac": "ce:76:ed:76:e2:36",
                "hostname": "airflow-worker-0"
            },
            "@timestamp": "2025-02-03T23:40:03.898Z",
            "related": {
                "vulnerabilities": [
                    "CVE-2022-3157"
                ],
                "network": [
                    "d6172913-f5ac-4cfb-9ddc-6eaed41d4685"
                ],
                "observer": [
                    "778a339b-8041-4db1-be8d-a4745938b445",
                    "778a339b-8041-4db1-be8d-a4745938b444",
                    "9e7546c0-aeff-45e4-b0ac-d06b03fe80b3"
                ]
            },
            "host": {
                "ip": [
                    "192.168.1.50"
                ],
                "last_seen": "2024-11-12T23:53:10.241Z",
                "hostname": [
                    "plc-004"
                ],
                "hardware": {
                    "series": "5570",
                    "vendor": "Rockwell Automation",
                    "model": "1756-L71/B",
                    "serial": "0081F1EC",
                    "family": "ControlLogix",
                    "firmware": {
                        "version": "32.011"
                    }
                },
                "zone_id": 12,
                "domain": [
                    "localhost"
                ],
                "name": "plc-004",
                "is_ot": true,
                "module": [
                    {
                        "series": "5570",
                        "vendor": "Rockwell Automation",
                        "model": "1756-OB16E",
                        "slot_id": 3,
                        "serial": 6775049,
                        "family": "ControlLogix",
                        "firmware": {
                            "version": 3.003
                        }
                    },
                    {
                        "series": "",
                        "vendor": "Rockwell Automation",
                        "model": "1756-IB16I",
                        "slot_id": 2,
                        "serial": 3222064718,
                        "family": "",
                        "firmware": {
                            "version": 3.002
                        }
                    },
                    {
                        "series": "",
                        "vendor": "Rockwell Automation",
                        "model": "1756-ENBT",
                        "slot_id": 1,
                        "serial": 5686077,
                        "family": "ControlLogix",
                        "firmware": {
                            "version": 6.006
                        }
                    },
                    {
                        "series": "5570",
                        "vendor": "Rockwell Automation",
                        "model": "1756-L71",
                        "slot_id": 0,
                        "serial": 8516076,
                        "family": "ControlLogix",
                        "firmware": {
                            "version": 32.011
                        }
                    }
                ],
                "mac": [
                    "00:00:BC:2D:87:9B"
                ],
                "zone": {
                    "name": "Pump system",
                    "id": 12
                },
                "type": "PLC",
                "os": {
                    "family": "",
                    "kernel": "",
                    "name": ""
                },
                "id": "106",
                "class": "Controller"
            },
            "vulnerability": {
                "report_id": "dragos-advisory-2932",
                "related": {
                    "detection": [
                        "106-dragos-advisory-2932-hardware-config-3",
                        "106-dragos-advisory-2932-hardware-config-4"
                    ],
                    "vulnerabilities": [
                        "dragos-advisory-2932-hardware-config-3",
                        "dragos-advisory-2932-hardware-config-4"
                    ]
                },
                "score": {
                    "base": 7.5
                },
                "dragos_score": 7.5,
                "hardware": [
                    {
                        "vendor": "Rockwell Automation",
                        "firmware": {
                            "version": ">=20, <=33"
                        },
                        "family": "ControlLogix",
                        "series": "5570"
                    },
                    {
                        "vendor": "Rockwell Automation",
                        "firmware": {
                            "version": ">=20, <=33"
                        },
                        "family": "ControlLogix",
                        "series": "5570"
                    }
                ],
                "package": [],
                "os": [],
                "summary": "<p>Rockwell Automation GuardLogix and ControlLogix are Programmable Logic Controllers (PLCs). They are deployed worldwide and seen across a variety of industries.</p>",
                "title": "Rockwell Automation GuardLogix and ControlLogix controllers",
                "type": "Improper Input Validation",
                "playbooks": [
                    "<p>Implement <a href=\"https://literature.rockwellautomation.com/idc/groups/literature/documents/at/secure-at001_-en-p.pdf\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"background-color:rgb(255, 255, 255);\">CIP security</a> where practical. Ensure control systems are segmented from Enterprise and internet.</p>"
                ],
                "severity": "High",
                "mitigations": [
                    "<p>Update to a patched version:</p><ul><li>CompactLogix 5370: v33.013, v34.011 or later.</li><li>Compact GuardLogix 5370: v33.013,, v34.011 or later.</li><li>ControlLogix 5570: v33.013, v34.011 or later.</li><li>GuardLogix 5570:v33.013,  v34.011 or later.</li><li>ControlLogix 5570 redundancy: v33.052, v34.051 or later.</li></ul>"
                ],
                "reference": "https://us-cert.cisa.gov/ics/advisories/ICSA-22-354-02",
                "state": "enabled",
                "published_date": "2022-12-20",
                "description": "<p>Successful exploitation could allow an unauthenticated and remote adversary to cause a Major Non-Recoverable Fault (MNRF) and a Denial of Service (DoS) through a crafted CIP request.</p>",
                "resources": [
                    {
                        "title": "ICSA-22-354-02",
                        "url": "https://us-cert.cisa.gov/ics/advisories/ICSA-22-354-02"
                    },
                    {
                        "title": "<a href=\"https://rockwellautomation.custhelp.com/app/answers/answer_view/a_id/1137757\" rel=\"noopener noreferrer\" target=\"_blank\">PN1613</a>",
                        "url": "https://rockwellautomation.custhelp.com/app/answers/answer_view/a_id/1137757"
                    },
                    {
                        "title": "<a href=\"https://literature.rockwellautomation.com/idc/groups/literature/documents/at/secure-at001_-en-p.pdf\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color:rgb(0, 102, 204);background-color:rgb(255, 255, 255);\">CIP security</a>",
                        "url": "https://literature.rockwellautomation.com/idc/groups/literature/documents/at/secure-at001_-en-p.pdf"
                    }
                ],
                "intel": {
                    "active_exploit": false,
                    "poc_exists": false,
                    "remotely_exploitable": true,
                    "physical_access": false,
                    "known_credentials": false,
                    "user_interaction": false,
                    "dos": true,
                    "credential_exposure": false,
                    "code_execution": false,
                    "broader_network_access": false,
                    "privilege_escalation": false,
                    "data_theft": false,
                    "skill_level": "Low"
                },
                "modified_date": "2022-12-29T17:07:50.000Z"
            },
            "event": {
                "dataset": "worldview.vulnerability.api",
                "timezone": "GMT",
                "confidence": 3,
                "disposition": "Not Set",
                "start": "2024-11-12T23:49:58.692Z",
                "id": "9c6dac6c-aff5-5ec9-7e97-66e45b5a5fc0",
                "risk_score": 0.6,
                "priority": "Next",
                "created": "2025-02-03T23:45:07.031Z",
                "end": "2025-02-03T23:45:07.031Z",
                "duration": 7170908338999
            },
            "labels": {
                "System Owner": "John Smith",
                "Criticality": "",
                "Country": "USA",
                "AttributesLastObservedDate": "2025-02-03",
                "cip_name": [
                    "1756-L71/B LOGIX5571"
                ],
                "zone_name": "Pump system",
                "Monitored": "true",
                "ObservedBy": [
                    "pumping-station-01"
                ],
                "x": "-19209.74",
                "CrowdStrike ID": "",
                "Zone": "Pump system",
                "y": "-8093.57",
                "CrowdStrike Last Seen": "",
                "es_doc_id": "106-dragos-advisory-2932"
            }
}
```
</details>

<details>
<summary>Address Log</summary>

```json
{
            "type": "IP",
            "value": "192.168.10.240",
            "id": 11,
            "createdAt": "2024-08-14T23:49:23.198Z",
            "networkId": "d6172913-f5ac-4cfb-9ddc-6eaed41d4685",
            "flags": [],
            "collectors": [
                {
                    "customerId": "default",
                    "midpointId": "778a339b-8041-4db1-be8d-a4745938b444",
                    "collectorId": "collectorbond"
                }
            ]
        }

```
</details>

<details>
<summary>Zone log</summary>

```json
{
        "id": 3,
        "name": "Internet",
        "criteria": {
            "anyOf": [
                {
                    "addressSelector": {
                        "typeIn": [
                            "IP"
                        ],
                        "valueMatches": {
                            "cidr": "74.6.168.72/32",
                            "type": "cidr"
                        }
                    }
                },
                {
                    "addressSelector": {
                        "typeIn": [
                            "IP"
                        ],
                        "valueMatches": {
                            "cidr": "8.8.8.8/32",
                            "type": "cidr"
                        }
                    }
                },
                {
                    "addressSelector": {
                        "typeIn": [
                            "IP"
                        ],
                        "valueMatches": {
                            "cidr": "52.84.162.84/32",
                            "type": "cidr"
                        }
                    }
                },
                {
                    "addressSelector": {
                        "typeIn": [
                            "IP"
                        ],
                        "valueMatches": {
                            "cidr": "184.172.60.194/32",
                            "type": "cidr"
                        }
                    }
                }
            ]
        },
        "description": "",
        "colorHex": "#c60d0d",
        "uiCriteria": {
            "type": "converted",
            "orCriteria": [
                {
                    "selector": {
                        "type": "general",
                        "value": "IP"
                    },
                    "operator": "matches_cidr",
                    "value": "74.6.168.72/32"
                },
                {
                    "selector": {
                        "type": "general",
                        "value": "IP"
                    },
                    "operator": "matches_cidr",
                    "value": "8.8.8.8/32"
                },
                {
                    "selector": {
                        "type": "general",
                        "value": "IP"
                    },
                    "operator": "matches_cidr",
                    "value": "44.242.60.85/32"
                },
                {
                    "selector": {
                        "type": "general",
                        "value": "IP"
                    },
                    "operator": "matches_cidr",
                    "value": "184.172.60.194/32"
                }
            ],
            "andCriteria": []
        },
        "coordinates": {
            "x": -30020.33581,
            "y": -22897.52316,
            "width": 3500,
            "height": 2000
        },
        "metadata": {
            "assets": 6,
            "baselinedAssets": 0,
            "baselineEvents": 0,
            "protocolCount": 3,
            "externalCommunications": false
        }
    }
```
</details>

<details>
<summary>Asset Log</summary>

```json
{
            "id": 1,
            "mostRecentAddressBeforeMaskByType": {},
            "oldIds": [],
            "attributes": {
                "zoneId": 6,
                "host.id": "1",
                "host.address_id": [
                    11,
                    12,
                    13,
                    14
                ],
                "observed.host.class": "Security Appliance",
                "observed.host.type": "IDS/IPS",
                "override.host.type": "IDS/IPS",
                "observed.host.vendor": "Fortinet Inc",
                "observed.host.name": "OT Firewall",
                "host.hardware.firmware.version": "",
                "override.host.hardware.firmware.version": "",
                "observed.host.hardware.model": "",
                "override.host.hardware.model": "",
                "host.hardware.model": "",
                "host.hardware.serial": "",
                "observed.host.hardware.serial": "",
                "host.hardware.vendor": "Fortinet Inc",
                "observed.host.hardware.vendor": "Fortinet Inc",
                "host.os.family": "",
                "observed.host.os.family": "",
                "host.os.name": "",
                "observed.host.os.name": "",
                "override.labels.Country": "USA",
                "override.labels.System Owner": "John Smith",
                "override.labels.Criticality": "",
                "override.labels.Zone": "Supervisory Network",
                "observed.labels.ObservedBy": [
                    "mfg-plant-01"
                ],
                "tags": [
                    "IT",
                    " Security Appliance",
                    " IDS/IPS"
                ],
                "override.tags": [
                    "IT",
                    " Security Appliance",
                    " IDS/IPS"
                ],
                "override.labels.x": "-30905.8",
                "override.labels.y": "-13935.7",
                "override.host.hardware.serial": "",
                "host.hardware.family": "",
                "override.host.hardware.family": "",
                "host.hardware.series": "",
                "override.host.hardware.series": "",
                "host.domain": [
                    "localhost"
                ],
                "host.os.kernel": "",
                "observed.host.os.kernel": "",
                "override.labels.CrowdStrike ID": "",
                "override.labels.CrowdStrike Last Seen": "",
                "override.labels.hardware.fidelity": 0,
                "host.mac": [
                    "04:D5:90:17:96:96"
                ],
                "host.ip": [
                    "192.168.10.240"
                ],
                "host.last_seen": "2024-11-12T23:53:10.208Z",
                "observed.host.last_seen": "2024-11-12T23:53:10.208Z",
                "host.class": "Security Appliance",
                "host.hostname": [
                    "mfg-firewall"
                ],
                "host.name": "OT Firewall",
                "host.type": "IDS/IPS",
                "host.vendor": "Fortinet Inc",
                "host.zone.id": 6,
                "host.zone.name": "Supervisory Network",
                "host.zone_id": 6,
                "labels.Country": "USA",
                "labels.Criticality": "",
                "labels.CrowdStrike ID": "",
                "labels.CrowdStrike Last Seen": "",
                "labels.Monitored": "true",
                "labels.ObservedBy": [
                    "mfg-plant-01"
                ],
                "labels.System Owner": "John Smith",
                "labels.Zone": "Supervisory Network",
                "labels.hardware.fidelity": 0,
                "labels.x": "-30905.8",
                "labels.y": "-13935.7",
                "observed.host.zone.id": 6,
                "observed.host.zone_id": 6,
                "observed.zoneId": 6,
                "related.network": [
                    "d6172913-f5ac-4cfb-9ddc-6eaed41d4685"
                ],
                "related.observer": [
                    "778a339b-8041-4db1-be8d-a4745938b444",
                    "9e7546c0-aeff-45e4-b0ac-d06b03fe80b3"
                ],
                "observed.labels.AttributesLastObservedDate": "2025-02-03",
                "observed.labels.hardware.fidelity": 0,
                "observed.labels.zone_name": "Supervisory Network",
                "labels.AttributesLastObservedDate": "2025-02-03",
                "labels.zone_name": "Supervisory Network",
                "observed.tags": [
                    "SSH"
                ]
            },
            "createdAt": "2024-11-10T23:49:23.197Z",
            "lastSeenAt": "2024-11-12T23:53:10.208Z",
            "addresses": [
                {
                    "type": "IP",
                    "value": "192.168.10.240",
                    "id": 11,
                    "createdAt": "2024-08-14T23:49:23.198Z",
                    "timeRanges": [
                        {
                            "from": "2024-08-14T23:45:00Z"
                        }
                    ],
                    "associatedAtTimeOfRequest": true,
                    "networkId": "d6172913-f5ac-4cfb-9ddc-6eaed41d4685",
                    "flags": [],
                    "collectors": [
                        {
                            "customerId": "default",
                            "midpointId": "778a339b-8041-4db1-be8d-a4745938b444",
                            "collectorId": "collectorbond"
                        }
                    ]
                },
                {
                    "type": "MAC",
                    "value": "04:D5:90:17:96:96",
                    "id": 12,
                    "createdAt": "2024-08-14T23:49:23.198Z",
                    "timeRanges": [
                        {
                            "from": "2024-08-14T23:45:00Z"
                        }
                    ],
                    "associatedAtTimeOfRequest": true,
                    "networkId": "d6172913-f5ac-4cfb-9ddc-6eaed41d4685",
                    "flags": [],
                    "collectors": [
                        {
                            "customerId": "default",
                            "midpointId": "778a339b-8041-4db1-be8d-a4745938b444",
                            "collectorId": "collectorbond"
                        }
                    ]
                },
                {
                    "type": "HOSTNAME",
                    "value": "mfg-firewall",
                    "id": 13,
                    "createdAt": "2024-08-14T23:49:23.198Z",
                    "timeRanges": [
                        {
                            "from": "2024-08-14T23:45:00Z"
                        }
                    ],
                    "associatedAtTimeOfRequest": true,
                    "networkId": "d6172913-f5ac-4cfb-9ddc-6eaed41d4685",
                    "flags": [],
                    "collectors": [
                        {
                            "customerId": "default",
                            "midpointId": "778a339b-8041-4db1-be8d-a4745938b444",
                            "collectorId": "collectorbond"
                        }
                    ]
                },
                {
                    "type": "DOMAIN",
                    "value": "localhost",
                    "id": 14,
                    "createdAt": "2024-08-14T23:49:23.198Z",
                    "timeRanges": [
                        {
                            "from": "2024-08-14T23:45:00Z"
                        }
                    ],
                    "associatedAtTimeOfRequest": true,
                    "networkId": "d6172913-f5ac-4cfb-9ddc-6eaed41d4685",
                    "flags": [],
                    "collectors": [
                        {
                            "customerId": "default",
                            "midpointId": "778a339b-8041-4db1-be8d-a4745938b444",
                            "collectorId": "collectorbond"
                        }
                    ]
                }
            ],
            "timeRanges": [
                {
                    "from": "2024-08-14T23:45:00Z"
                }
            ]
        }

```
</details>

<details>
<summary>Notification Log</summary>

```json
{
            "type": "System",
            "source": "Health and Diagnostics",
            "summary": "System Health Alert",
            "content": "1 component(s) are in a red state.  \nUnready Kubernetes Pods:notification-service; \n",
            "severity": 0,
            "id": 1,
            "createdAt": "2024-11-12T22:49:13Z",
            "reviewed": false,
            "retained": false,
            "state": "UNRESOLVED",
            "occurredAt": "2024-11-12T22:49:13Z",
            "firstSeenAt": "2024-11-12T22:49:13Z",
            "lastSeenAt": "2024-11-12T22:49:13Z",
            "assets": [],
            "count": 1,
            "matchedRuleIds": []
        }
```
</details>

### Sample queries

```sql title="Vulnerabilities by Intel Skill Level"
_sourceCategory="Labs/Dragos" observer vulnerabilities
| json "event.id", "event.risk_score", "vulnerability.severity", "vulnerability.type", "vulnerability.state", "vulnerability.intel.skill_level", "vulnerability.dragos_score", "host.name", "vulnerability.intel.credential_exposure", "vulnerability.title", "@timestamp", "vulnerability.intel.poc_exists", "vulnerability.intel.active_exploit", "vulnerability.summary", "vulnerability.reference", "vulnerability.intel.remotely_exploitable", "vulnerability.intel.physical_access", "vulnerability.intel.known_credentials", "vulnerability.intel.user_interaction", "vulnerability.intel.dos", "vulnerability.intel.code_execution", "vulnerability.intel.broader_network_access", "vulnerability.intel.privilege_escalation", "vulnerability.intel.data_theft", "host.ip", "host.zone.name", "labels.System Owner", "labels.Country", "observer.vendor",  "vulnerability.mitigations", "vulnerability.description", "vulnerability.report_id", "vulnerability.modified_date"  as event_id, event_risk_score, vulnerability_severity, vulnerability_type, vulnerability_state, vulnerability_intel_skill_level, vulnerability_dragos_score, host_name, vulnerability_intel_credential_exposure, vulnerability_title, timestamp, vulnerability_intel_poc_exists, vulnerability_intel_active_exploit, vulnerability_summary, vulnerability_reference, vulnerability_intel_remotely_exploitable, vulnerability_intel_physical_access, vulnerability_intel_known_credentials, vulnerability_intel_user_interaction, vulnerability_intel_dos, vulnerability_intel_code_execution, vulnerability_intel_broader_network_access, vulnerability_intel_privilege_escalation, vulnerability_intel_data_theft, host_ip, host_zone_name, labels_System_Owner, labels_Country, observer_vendor, vulnerability_mitigations, vulnerability_description, vulnerability_report_id, vulnerability_modified_date nodrop

// global filters
| where vulnerability_severity matches "{{vulnerability_severity}}"
| where vulnerability_type matches "{{vulnerability_type}}"
| where vulnerability_state matches "{{vulnerability_state}}"

| count by event_id, vulnerability_intel_skill_level
| count as frequency by vulnerability_intel_skill_level
| sort by frequency, vulnerability_intel_skill_level
```

## Collection configuration and app installation

import CollectionConfiguration from '../../reuse/apps/collection-configuration.md';

<CollectionConfiguration/>

:::important
Use the [Cloud-to-Cloud Integration for Dragos](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/dragos-source) to create the source and use the same source category while installing the app. By following these steps, you can ensure that your Dragos app is properly integrated and configured to collect and analyze your Dragos data.
:::

### Create a new collector and install the app

import AppCollectionOPtion1 from '../../reuse/apps/app-collection-option-1.md';

<AppCollectionOPtion1/>

### Use an existing collector and install the app

import AppCollectionOPtion2 from '../../reuse/apps/app-collection-option-2.md';

<AppCollectionOPtion2/>

### Use an existing source and install the app

import AppCollectionOPtion3 from '../../reuse/apps/app-collection-option-3.md';

<AppCollectionOPtion3/>

## Viewing the Dragos dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Vulnerabilities

The **Dragos - Vulnerabilities** dashboard provides a comprehensive view of security risks across your industrial environment. It tracks total vulnerabilities, average risk scores, and high-severity threats while categorizing vulnerabilities by severity, state, and intelligence skill level. The key insights of this dashboard include the top 10 vulnerability types, affected hosts, and trends in risk exposure over time. Analysts can monitor credentials exposure, active exploits, and known attacks, ensuring proactive threat mitigation. With real-time visibility and trend analysis, this dashboard helps security teams prioritize risks and strengthen defenses effectively.<br/><img src={useBaseUrl('img/integrations/saas-cloud/docusign-overview.png')} alt="docusign-overview.png" width="800"/>

### Assets and Addresses

The **Dragos - Assets and Addresses** dashboard offers detailed insights into assets and network addresses across your industrial environment. It highlights total assets, OT hosts, and distribution by host type and class, providing a clear view of infrastructure composition. The key metrics of this dashboard include the top 10 host vendors and recently detected assets, enabling teams to track device activity. The dashboard also examines total addresses, classifications, and geolocation data, including restricted regions, to enhance security and compliance. With real-time monitoring, it helps organizations maintain asset oversight and network reliability.<br/><img src={useBaseUrl('img/integrations/saas-cloud/docusign-alerts.png')} alt="docusign-alerts.png" width="900"/>

### Zones and Notifications

The **Dragos - Zones and Notifications** dashboard provides insights into network segmentation and security alerts within your industrial environment. It tracks total zones, external communications, and asset distribution, offering a clear view of network structure and potential risks. For threat monitoring, the dashboard displays total notifications, their status (retained, reviewed, and unresolved), and classification by type and severity. It also highlights notifications over time, recent alerts, and threat summaries, enabling proactive security response. This dashboard helps teams enhance visibility, strengthen defenses, and ensure a secure operational environment.<br/><img src={useBaseUrl('img/integrations/saas-cloud/docusign-users.png')} alt="docusign-users.png" width="900"/>

## Create monitors for Dragos app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Dragos alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Active Exploits Detected` | This alert is fired when vulnerabilities with active exploits are detected, indicating a high risk of compromise. Immediate action is required to mitigate threats and protect critical assets. | Critical | Count > 0 | 
| `High Severity Vulnerability Detected` | This alert is fired when vulnerabilities classified as Critical or High are identified, which could pose significant security risks. Review and remediate promptly to prevent potential attacks. | Critical | Count > 0|
| `Address Detected from Embargoed Locations` | This alert is fired when network activity from embargoed regions, suggesting possible unauthorized access. Investigate and enforce geo-blocking if necessary. | Critical | Count > 0 |
| `High Dragos Score Vulnerability Detected` | This alert is fired when vulnerabilities with a Dragos Score above 8 is identified, indicating heightened risk. Prioritize patching or mitigating these issues to reduce exposure. | Critical | Count > 0 |
| `High Severity Notification Detected` | This alert is fired when high-severity security alerts are detected, that may indicate active threats. An immediate investigation is recommended to assess and respond accordingly. | Critical | Count > 0 |
| `OT Network Under Attack` | This alert is fired when more than five vulnerabilities are associated with active threats in a short period, suggesting a coordinated attack. Urgent intervention is needed to secure the network. | Critical | Count > 5 |

## Upgrade/Downgrade the DocuSign app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the DocuSign app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>