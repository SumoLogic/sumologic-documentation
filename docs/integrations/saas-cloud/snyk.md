---
id: snyk
title: Snyk
sidebar_label: Snyk
description: The Snyk app for Sumo Logic delivers real-time visibility into security vulnerabilities across your software projects and dependencies.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/platform-services/automation-service/app-central/logos/snyk.png')} alt="thumbnail icon" width="80"/>

The Snyk vulnerability monitoring app for Sumo Logic delivers real-time visibility into security vulnerabilities across your software projects and dependencies. By ingesting detailed vulnerability data from Snyk, the app helps security and DevOps teams track risk exposure, prioritize remediation, and maintain a strong security posture. The Snyk app provides insights into critical, high, and other severity vulnerabilities, enabling faster detection and response without including license or unrelated data.

Key features of Snyk app include:

- Keep track of vulnerability counts and severity levels across your projects and packages in real time.
- Analyze vulnerability data to identify critical risks and prioritize remediation based on severity and priority scores.
- Monitor recent vulnerability fixes and newly detected issues to maintain an up-to-date security overview.
- Identify top vulnerable packages and projects to focus efforts where they matter most.
- Visualize vulnerability trends over time to detect emerging risks and assess the effectiveness of mitigation strategies.

:::info
This app includes [built-in monitors](#snyk-alerts). For details on creating custom monitors, refer to the [Create monitors for Snyk app](#create-monitors-for-the-snyk-app).
:::

## Sample log message

<details>
<summary>Sample Log Message</summary>
```json
{
    "project": {
        "id": "6f84372e-0808-43b4-ba1f-c343asd4",
        "name": "devops:docker/hcvault/Dockerfile",
        "created": "2024-11-20T09:35:51.878Z",
        "origin": "github",
        "type": "",
        "readOnly": false,
        "testFrequency": "daily",
        "totalDependencies": 92,
        "issueCountsBySeverity": {
            "low": 0,
            "high": 0,
            "medium": 3,
            "critical": 1
        },
        "imageTag": "latest",
        "imagePlatform": "",
        "imageBaseImage": "ubuntu:latest",
        "lastTestedDate": "2024-11-20T09:35:51.878Z",
        "browseUrl": "https://test_data.com/org/project/6f84372e-0808-43b4-ba1f-c4c7fec0e680",
        "importingUser": null,
        "isMonitored": true,
        "owner": null,
        "tags": [],
        "attributes": {
            "criticality": [],
            "lifecycle": [],
            "environment": []
        },
        "branch": "master"
    },
    "org": {
        "id": "245bda36-e8fd-455c-9f3f-56fedcf81dd4",
        "name": "testdata",
        "slug": "testdata",
        "url": "https://test_data.com/org",
        "group": null,
        "created": "2024-11-20T09:35:51.878Z"
    },
    "group": {
        "id": "2dbf20ff-20d9-4efd-bf45-4e788561707b",
        "name": "test",
        "url": "https://test_data.com/group",
        "created": "2024-11-20T09:35:51.878Z"
    },
    "newIssues": [
        {
            "id": "SNYK-UBUNTU2404-12345",
            "issueType": "vuln",
            "pkgName": "systemd/libsystemd0",
            "pkgVersions": [
                "255.4-1ubuntu8.6",
                "255.4-1ubuntu8.6"
            ],
            "issueData": {
                "id": "SNYK-UBUNTU2404-12345",
                "title": "Race Condition",
                "severity": "critical",
                "url": "https://test_data.com/vuln/SNYK-UBUNTU2404-12345",
                "description": "## NVD Description\n_Note:_ _Versions mentioned in the description apply only to the upstream `systemd` package and not the `systemd` package as distributed by `Ubuntu`._\n_See `How to fix?` for `Ubuntu:24.04` relevant fixed versions and status._\n\",
                "identifiers": {
                    "CVE": [
                        "CVE-2025-4598"
                    ],
                    "CWE": [
                        "CWE-364"
                    ],
                    "ALTERNATIVE": []
                },
                "credit": [
                    ""
                ],
                "exploitMaturity": "no-known-exploit",
                "semver": {
                    "vulnerable": [
                        "*"
                    ]
                },
                "publicationTime": "2024-11-20T09:35:51.878Z",
                "disclosureTime": "2024-11-20T09:35:51.878Z",
                "CVSSv3": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N",
                "cvssScore": 8.2,
                "cvssDetails": [
                     {
                        "assigner": "Red Hat",
                        "severity": "info",
                        "cvssV3Vector": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N",
                        "cvssV3BaseScore": 4.7,
                        "modificationTime": "2024-11-20T09:35:51.878Z"
                    }
                ],
                "severities": [
                    {
                        "assigner": "NVD",
                        "cvssVersion": "3.1",
                        "severity": "medium",
                        "vector": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N",
                        "baseScore": 4.7,
                        "modificationTime": "2024-11-20T09:35:51.878Z"
                    }              
  ],
                "exploitDetails": {
                    "sources": [],
                    "maturityLevels": [
                        {
                            "level": "Not Defined",
                            "format": "CVSSv3"
                        }
                    ]
                },
                "language": "linux",
                "patches": [],
                "nearestFixedInVersion": "",
                "isMaliciousPackage": false
            },
            "isPatched": false,
            "isIgnored": false,
            "fixInfo": {
                "isUpgradable": false,
                "isPinnable": false,
                "isPatchable": false,
                "isFixable": false,
                "isPartiallyFixable": false,
                "nearestFixedInVersion": "",
                "fixedIn": []
            },
            "priorityScore": 50,
            "priority": {
                "score": 149,
                "factors": [
                    {
                        "name": "Package Popularity Score",
                        "description": "Package Popularity Score: 0"
                    }
                ]
            }
        }
    ],
    "removedIssues": [
        {
            "id": "SNYK-UBUNTU2-54782",
            "issueType": "vuln",
            "pkgName": "systemd/libsystemd0",
            "pkgVersions": [
                "255.4-1ubuntu8.6",
            ],
            "issueData": {
                "id": "SNYK-UBUNTU2-54782",
                "title": "Race Condition",
                "severity": "medium",
                "url": "https://test_data.com/vuln/SNYK-UBUNTU2-54782",
                "description": "## NVD Description\n_Note:_ _Versions mentioned in the description apply only to the upstream `systemd` package and not the `systemd` package as distributed by `Ubuntu`._\n_See `How to fix?` for `Ubuntu:24.04` relevant fixed versions and status._\n\nA vulnerability was found in systemd-coredump. This flaw allows an attacker to force a SUID process to crash and replace it with a non-SUID binary to access the original&amp;#39;s privileged process coredump, allowing the attacker to read sensitive data, such as /etc/shadow content, loaded by the original process.\n",
                "identifiers": {
                    "CVE": [
                        "CVE-2025-4598"
                    ],
                    "CWE": [
                        "CWE-364"
                    ],
                    "ALTERNATIVE": []
                },
                "credit": [
                    ""
                ],
                "exploitMaturity": "no-known-exploit",
                "semver": {
                    "vulnerable": [
                        "*"
                    ]
                },
                "publicationTime": "2024-11-20T09:35:51.878Z",
                "disclosureTime": "2024-11-20T09:35:51.878Z",
                "CVSSv3": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N",
                "cvssScore": 9.2,
                "cvssDetails": [
                    {
                        "assigner": "Red Hat",
                        "severity": "info",
                        "cvssV3Vector": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N",
                        "cvssV3BaseScore": 4.7,
                        "modificationTime": "2024-11-20T09:35:51.878Z"
                    }
                ],
                "severities": [
                    {
                        "assigner": "NVD",
                        "cvssVersion": "3.1",
                        "severity": "medium",
                        "vector": "CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:U/C:H/I:N/A:N",
                        "baseScore": 4.7,
                        "modificationTime": "2024-11-20T09:35:51.878Z"
                    }
                ],
                "exploitDetails": {
                    "sources": [],
                    "maturityLevels": [
                        {
                            "level": "Not Defined",
                            "format": "CVSSv3"
                        },
                        {
                            "level": "Not Defined",
                            "format": "CVSSv4"
                        }
                    ]
                },
                "language": "linux",
                "patches": [],
                "nearestFixedInVersion": "",
                "isMaliciousPackage": false
            },
            "isPatched": true,
            "isIgnored": false,
            "fixInfo": {
                "isUpgradable": false,
                "isPinnable": false,
                "isPatchable": false,
                "isFixable": false,
                "isPartiallyFixable": false,
                "nearestFixedInVersion": "",
                "fixedIn": []
            },
            "priorityScore": 800,
            "priority": {
                "score": 149,
                "factors": [
                    {
                        "name": "Transitive dependency",
                        "description": "Transitive dependency: No"
                    }
                ]
            }
        }
    ]
}
```
</details>

## Sample queries

```sql title="Total Vulnerabilities"
_sourceCategory="Labs/Snyk"
| json "project.id", "project.name", "project.origin", "project.created", "project.type", "project.branch", "project.totalDependencies", "project.testFrequency", "project.browseUrl", "org.id", "org.name", "org.url", "org.created", "newIssues", "removedIssues" as project_id, project_name, project_origin, project_created, project_type, project_branch, project_dependencies, project_frequency, project_url, org_id, org_name, org_url, org_created, new_issues, removed_issues nodrop 

| parse regex field=new_issues "(?<vulnerability>\{([^\{\}]|\{([^\{\}]|\{([^\{\}]|\{([^\{\}]|\{([^\{\}]|\{([^\{\}]|\{[^\{\}]*\})*\})*\})*\})*\})*\})*\})" multi

| json field=vulnerability "id", "issueType", "pkgName", "issueData.severity","issueData.title", "issueData.description", "issueData.url", "issueData.publicationTime", "issueData.disclosureTime", "issueData.cvssScore", "issueData.language", "issueData.isMaliciousPackage", "isPatched", "priorityScore" as vuln_id, vuln_type, vuln_pkg, vuln_severity, vuln_title, vuln_description, vuln_url, vuln_publicationtime, vuln_disclosuretime, vuln_cvss, vuln_language, vuln_malicious, vuln_patched, vuln_priority nodrop 

// Global Filter 
| where vuln_malicious matches "{{malicious_package}}"
| where vuln_severity matches "{{severity}}"
| where vuln_patched matches "{{is_patched}}"
| where project_name matches "{{project_name}}"
| where org_name matches "{{org_name}}"
| where vuln_pkg matches "{{pkg_name}}"
| where vuln_priority matches "{{priority_score}}"
| where isBlank(project_branch) OR project_branch matches "{{project_branch}}"
| where toLowerCase(vuln_type) matches "vuln"

| count
```

## Setting up the collection

Follow the below steps for setting up the webhook integration between Snyk and Sumo Logic for efficient event monitoring and data ingestion:

### Step 1: Setting up the collection in Sumo Logic platform

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. Create a new Hosted Collector. For instructions, refer to [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **HTTP Logs & Metrics**.
1. Configure the HTTP Logs and Metrics source, refer to the [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics/#configure-an-httplogs-and-metrics-source).
    :::note
    Set the **Source Category** to `webhook/snyk` for the Snyk webhook.
    :::
1. Once configured, save the endpoint URL for future reference.

### Step 2: Register the Webhook with Snyk

1. Create the Snyk Webhook using the [Create a webhook API](https://docs.snyk.io/snyk-api/reference/webhooks-v1#org-orgid-webhooks). The API requires that you provide the Snyk Organization ID, the Snyk authentication token, the public URL for your Lambda function, and the value of your Lambda secret environment variable.
    - **SNYK-ORG-ID**. The Snyk organization ID is required to list projects. Ensure that the `API_KEY` has access to this organization.
    - **SNYK-TOKEN**. Locate your personal API token in your SNYK account settings. Click on **Show** in the key field, then copy the API key.
    - **TARGET-WEBHOOK-URL (URL)**. Use the endpoint URL of the Sumo Logic configured HTTP Source.
    - **SECRET**. Generate a random, high-entropy string for the secret. This string should be exclusive to Snyk and your webhook transport-consuming code and should not be repurposed for any other use.
1. Execute the following `curl` command to register the webhook for Snyk with Sumo Logic:
    ```
    curl --location 'https://api.snyk.io/v1/org/<SNYK-ORG-ID>/webhooks' \
    --header 'Authorization: token <SNYK-TOKEN>' \
    --header 'Content-Type: application/json' \
    --data '{
        "url": "https://{TARGET-WEBHOOK-URL}",
        "secret": "SECRET"
    }'
    ```
1. Upon successful API call, the response will include a status code of 200 along with the webhookID and URL.

### Step 3: Verification

After completing the registration process, verify that Snyk events are being ingested into Sumo Logic by executing the following query in Sumo Logic's search panel:
    ```
    _sourceCategory=webhook/snyk
    ```

## Viewing the Snyk dashboard

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Snyk Security - Overview** dashboard provides a clear, high-level picture of your organization’s vulnerabilities. It includes widgets showing key information like the total number of vulnerabilities by severity, recently fixed issues, and how vulnerabilities are prioritized. The dashboard highlights the most vulnerable packages and projects, so you can quickly see where the biggest risks are. It also shows vulnerabilities over time, helping you track security improvements or emerging threats. The Vulnerability Summary widget provides a quick snapshot of your overall security status. This dashboard helps security teams easily monitor vulnerabilities, understand risks, and focus on fixing the most important issues.<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Snyk/Snyk-Security-Overview.png')} style={{border: '1px solid gray'}} alt="Snyk-Security-Overview" width="800"/>

## Create monitors for the Snyk app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Snyk alerts

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Snyk - Critical Severity Vulnerability Detected` | This alert is triggered when one or more critical vulnerabilities are identified. This is used to monitor the detection of vulnerabilities classified as critical severity within your projects or packages. | Critical | Count > 0 |
| `Snyk - High Severity Vulnerability Detected` | This alert is triggered when more than 5 vulnerabilities classified as high severity within your projects or packages are detected. | Critical | Count > 5 |
| `Snyk - Malicious Package Detected` | This alert is triggered when when a malicious package is detected in the records. | Critical | Count > 0 |
| `Snyk - High Priority Vulnerability Detected` | This alert is triggered when one or more high-priority vulnerabilities are detected, indicating significant security risks that require immediate attention. | Critical | Count > 0 |

## Upgrading/Downgrading the Snyk app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Snyk app (Optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>






