---
id: tenable
title: Tenable
sidebar_label: Tenable
description: The Sumo Logic App for Tenable provides comprehensive visibility and actionable insights into your organization's security posture by leveraging data from the Tenable platform.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/send-data/tenable-logo.png')} alt="icon" width="125"/>

The Tenable app empowers security professionals to gain comprehensive visibility and actionable insights into your organization's security posture by leveraging data from the Tenable [Vulnerabilities API](https://developer.tenable.com/reference/exports-vulns-request-export) and [Audit Events API](https://developer.tenable.com/reference/audit-log-events). This powerful integration allows you to proactively monitor, analyze, and respond to security vulnerabilities and audit events, helping you strengthen your cybersecurity defences and reduce risk.

Key features of the Tenable app include:

- **Vulnerability Assessment**. Harness the Tenable Vulnerabilities API to perform in-depth vulnerability assessments across your infrastructure. This app provides a range of security use cases for vulnerabilities, including:
    - **Tracking Vulnerabilities Over Time**. Monitor the evolution of vulnerabilities over time, from their initial discovery to resolution.
    - **Identifying High-Severity Vulnerabilities**. Quickly pinpoint and prioritize high-severity vulnerabilities that require immediate attention.
    - **Identifying Affected Hosts**. Easily locate hosts affected by specific vulnerabilities and streamline remediation efforts.
    - **Checking for Exploitation**. Detect exploit availability and malware exploitation related to vulnerabilities.
- **Audit Event Monitoring**. Leverage the Tenable Audit Events API to monitor and analyze critical audit events within your organization. This app delivers valuable insights, including:
    - **Real-time Event Analysis**. Monitor audit events in real time, allowing for rapid incident response.
    - **Suspicious Activity Detection**. Identify suspicious or unauthorized activities across your network and systems.
    - **Compliance Reporting**. Streamline compliance monitoring by tracking events relevant to regulatory requirements.
    - **User Behavior Analysis**. Gain visibility into user behavior patterns and potential security risks.
- **Enhanced Security Posture**. By combining data from the Tenable Vulnerabilities API and Audit Events API, you can strengthen your organization's security posture by proactively addressing vulnerabilities and monitoring the security incidents.
- **Risk Reduction**. Identify and mitigate high-severity vulnerabilities and security threats promptly, reducing the risk of security breaches.
- **Efficient Remediation**. Locate affected hosts and prioritize remediation efforts, streamlining the process of securing your environment.
- **Compliance Assurance**. Simplify compliance monitoring and reporting by tracking relevant audit events and security controls.
- **Real-time Insights**. Gain real-time insights into your security environment, enabling rapid incident response and threat containment.

## Log types

This app uses [Tenable](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/tenable-source/) source to collect [Vulnerabilities data](https://developer.tenable.com/reference/exports-vulns-request-export) and [Audit Events](https://developer.tenable.com/reference/audit-log-events) from the Tenable platform.

## Sample log message

## Sample Query

## Set up collection

To set up [Cloud to Cloud Integration Tenable Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/tenable-source/) for the Tenable app, follow the instructions provided. These instructions will guide you through the process of creating a source using the Tenable source category, which you will need to use when installing the app. By following these steps, you can ensure that your Tenable app is properly integrated and configured to collect and analyze your Tenable data.

## Installing the Tenable app​

This section has instructions for installing the Symantec Web Security Service App for Sumo Logic.

{@import ../../reuse/apps/app-install.md}

## Viewing Tenable dashboards​

{@import ../../reuse/filter-dashboards.md}

### Overview

The **Tenable - Overview** dashboard provides in-depth vulnerability assessments across your infrastructure. 
<br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tenable/Tenable-Audit-Activity.png')} alt="Tenable-Overview" width="800"/>

### Audit Activity

The **Tenable - Audit Activity** dashboard provides <br/><img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Tenable/Tenable-Audit-Activity.png')} alt="Tenable-Audit-Activity" width="800"/>
