---
id: digital-guardian-arc
title: Digital Guardian ARC
sidebar_label: Digital Guardian ARC
description: The Sumo Logic app for Digital Guardian ARC provides a comprehensive suite of dashboards and alerts to help security analysts monitor, detect, and respond to critical events within their data protection environment. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/digital-guardian-logo.svg')} alt="icon" width="50"/>

The Sumo Logic app for Digital Guardian ARC provides a comprehensive suite of dashboards and alerts to help security analysts monitor, detect, and respond to critical events within their data protection environment. Designed to integrate seamlessly with Digital Guardian's Advanced Reporting and Analytics (ARC), this app offers actionable insights into endpoint activities, user behavior, and policy violations to enhance data security.

Key features of the Digital Guardian ARC app include:

- **Real-time activity monitoring**. Gain visibility into activities such as file creations, modifications, and deletions, categorized by operation type, file types accessed, and protocols used.
- **Risk-based alerts**. Pre-configured alerts for blocked events, failed login attempts, and user activities originating from high-risk locations allow analysts to detect and respond to potential threats in real-time.
- **Policy enforcement analytics**. The app provides insights into rule violation events, helping organizations monitor adherence to security policies and identify areas for improvement.
- **User and host analysis**. Interactive charts display the top users, applications, and systems contributing to security events, helping analysts pinpoint risky behaviors or potential insider threats.
- **Geolocation insights**. Visualize sender and recipient activities from high-risk or suspicious locations with geolocation maps, enabling targeted threat investigation and response.
- **Signature issuer intelligence**. Monitor digital signatures for files and applications to ensure authenticity and detect any potential tampering or unauthorized software.

Use cases for the Digital Guardian ARC app include:

- **Identify unauthorized activities**. Detect and investigate unauthorized file access, data exfiltration attempts, or suspicious behavior within the environment.
- **Enforce compliance**. Track and address violations of security rules to maintain regulatory compliance and internal policy adherence.
- **Monitor risky user behavior**. Proactively address risky activities, such as failed logins or data transfers to/from suspicious locations.
- **Accelerate incident response**. Leverage real-time alerts and detailed activity logs to respond to potential threats or breaches quickly.

The Sumo Logic app for Digital Guardian ARC is an essential tool for security teams. It provides the visibility and intelligence needed to safeguard sensitive data, enforce security policies, and mitigate risks in real-time.

:::info
This app also includes [built-in monitors](#digital-guardian-arc-monitors). For details on creating custom monitors, refer to [Create monitors for Digital Guardian ARC app](#create-monitors-for-digital-guardian-arc-app).
:::

## Log types

This app uses Sumo Logic’s [Digital Guardian ARC Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/digital-guardian-source/) to collect event logs from Digital Guardian ARC.

### Sample log messages

<details>
<summary>Event Log</summary>

```json
{
  "ca_ct": "-",
  "dev_bt": "-",
  "dev_devclass": "-",
  "dev_dt": "-",
  "dev_friendlyname": "-",
  "dev_prdid": "-",
  "dev_prdname": "-",
  "dev_rempolicy": "-",
  "dev_sernum": "-",
  "dev_suppredfail": "-",
  "dev_vendor": "-",
  "dev_vendorid": "-",
  "dg_agent_version": "7.9.1.0126",
  "dg_alert.alert_aid": "-",
  "dg_alert.alert_al": "-",
  "dg_alert.alert_at": "-",
  "dg_alert.alert_bc": "-",
  "dg_alert.alert_did": "-",
  "dg_alert.alert_etl": "-",
  "dg_alert.alert_ss": "-",
  "dg_alert.alert_ur": "-",
  "dg_alert.alert_wb": "-",
  "dg_alert.dg_category": "-",
  "dg_alert.dg_category_name": "-",
  "dg_alert.dg_detection_source": "-",
  "dg_alert.dg_name": "-",
  "dg_alert.dg_policy.dg_category": "-",
  "dg_alert.dg_policy.dg_category_name": "-",
  "dg_alert.dg_policy.dg_name": "-",
  "dg_alert.dg_policy.p_pn": "-",
  "dg_alert.dg_policy.p_t": "-",
  "dg_alert.dg_rule_action_type": "-",
  "dg_alert.uad_medid": "-",
  "dg_alert_survey_name": "-",
  "dg_alert_survey_response": "-",
  "dg_app_type": "-",
  "dg_attachments.dg_file_size": "-",
  "dg_attachments.dg_src_dir": "-",
  "dg_attachments.dg_src_file_name": "-",
  "dg_attachments.uad_br": "-",
  "dg_attachments.uad_bw": "-",
  "dg_attachments.uad_dvn": "-",
  "dg_attachments.uad_sdt": "-",
  "dg_attachments.uad_sea": "-",
  "dg_attachments.uad_sfc": "-",
  "dg_attachments.uad_sir": "-",
  "dg_attachments.uad_sp": "-",
  "dg_class.cad_pt": "-",
  "dg_class.cad_tc": "2",
  "dg_class.dg_category_name": "tag",
  "dg_class.dg_ci": "cf69eedf-2135-4ef1-857d-19d0f8111584",
  "dg_class.dg_ct": "Content Pattern",
  "dg_class.dg_name": "custom_phonenumber",
  "dg_class.dg_source_file": "Source File",
  "dg_cn": "microsoft corporation",
  "dg_custom_data.dg_name": "-",
  "dg_custom_data.dg_scope": "-",
  "dg_custom_data.dg_type": "-",
  "dg_custom_data.dg_values": "-",
  "dg_dh": "-",
  "dg_display": "File Recycle",
  "dg_doc_repo_type": "-",
  "dg_dst_dev.dev_bt": "RAID",
  "dg_dst_dev.dev_customid": "\"",
  "dg_dst_dev.dev_devclass": "\"",
  "dg_dst_dev.dev_dt": "Fixed",
  "dg_dst_dev.dev_friendlyname": "sk hynix sc311 sata 256gb",
  "dg_dst_dev.dev_prdid": "\"",
  "dg_dst_dev.dev_prdname": "sk hynix sc311 sata 256gb",
  "dg_dst_dev.dev_rempolicy": "Expect No Removal",
  "dg_dst_dev.dev_sernum": "ms8an69151ca1av1u",
  "dg_dst_dev.dev_suppredfail": "No",
  "dg_dst_dev.dg_dh": "-",
  "dg_dst_dir": "c:\\$recycle.bin\\s-1-5-21-1573680173-1931375354-1090983491-38523",
  "dg_dst_file_ext": "pdf",
  "dg_dst_file_name": "$r4ztwqq.pdf",
  "dg_dyn_sev": "-",
  "dg_ehc": "-",
  "dg_erv": "-",
  "dg_ewb": "-",
  "dg_file_category": "-",
  "dg_file_size": "36.0 KB",
  "dg_fin": "explorer",
  "dg_first": "True",
  "dg_fon": "explorer.exe",
  "dg_fv": "10.0.19041.4648 (winbuild.160101.0800)",
  "dg_guid": "b1dc5a3b-5cf4-11ef-8780-1856806434ed",
  "dg_hc": "No",
  "dg_imagemd5": "-",
  "dg_lc": "© microsoft corporation. all rights reserved.",
  "dg_local_timestamp": "2024-08-17 06:59:18 PM",
  "dg_mac_address": "00:FF:9A:E6:D1:B0",
  "dg_machine_name": "sw\\J1ZC9T2",
  "dg_machine_type": "Windows",
  "dg_md5": "d264f62721590f14bc54344f48a05912",
  "dg_mid": "f59f9f5b-2f5f-92a9-3d4b-f0f7edff4dc6",
  "dg_parent_name": "userinit.exe",
  "dg_pid": 16600,
  "dg_pn": "microsoft® windows® operating system",
  "dg_proc_dir": "c:\\windows",
  "dg_proc_file_ext": "exe",
  "dg_proc_file_name": "explorer.exe",
  "dg_processed_time": 1723939890637,
  "dg_provider": "-",
  "dg_pv": "10.0.19041.4648",
  "dg_recipients.dg_rec_email_domain": "-",
  "dg_recipients.uad_dir": "-",
  "dg_recipients.uad_mr": "-",
  "dg_recipients.uad_sir": "-",
  "dg_reg_op_type": "-",
  "dg_rv": "-",
  "dg_sensor_type": "-",
  "dg_sha1": "79047B0448500CCEA28EFCEFA4ADF8C8B6FB1737",
  "dg_sha256": "350570713E0A7E3733F59623F880A442E98979B29A8D59B95555625A38ED1054",
  "dg_src_dev.dev_bt": "RAID",
  "dg_src_dev.dev_customid": "\"",
  "dg_src_dev.dev_devclass": "\"",
  "dg_src_dev.dev_dt": "Fixed",
  "dg_src_dev.dev_friendlyname": "sk hynix sc311 sata 256gb",
  "dg_src_dev.dev_prdid": "\"",
  "dg_src_dev.dev_prdname": "sk hynix sc311 sata 256gb",
  "dg_src_dev.dev_rempolicy": "Expect No Removal",
  "dg_src_dev.dev_sernum": "ms8an69151ca1av1u",
  "dg_src_dev.dev_suppredfail": "No",
  "dg_src_dev.dev_vendor": "\"",
  "dg_src_dev.dg_dh": "-",
  "dg_src_dir": "c:\\users\\eah915\\downloads",
  "dg_src_file_ext": "pdf",
  "dg_src_file_name": "eam quarterly security inspection template 12_7_2017 (2).pdf",
  "dg_time": "2024-08-17 11:59:18 PM",
  "dg_total_size": "-",
  "dg_url_context_path": "-",
  "dg_url_host": "-",
  "dg_url_port": "-",
  "dg_url_scheme": "-",
  "dg_user": "eah915",
  "dg_utype": "File Recycle",
  "dg_vt_status": "-",
  "dg_wdb": "No",
  "dg_wrv": "No",
  "di_cn": "-",
  "di_fcl": "-",
  "di_fd": "-",
  "di_fml": "-",
  "di_fv": "-",
  "di_imagename": "-",
  "di_imagesha1": "-",
  "di_imagesha256": "-",
  "di_imagesize": "-",
  "di_lc": "-",
  "di_pf": "-",
  "di_pn": "-",
  "di_pv": "-",
  "pi_cmdln": "C:\\WINDOWS\\Explorer.EXE",
  "pi_dn": "SW",
  "pi_dsi": "Microsoft Windows Production PCA 2011",
  "pi_dspb": "-",
  "pi_dspn": "Microsoft Windows",
  "pi_dss": "Signed Trusted No Revoke Check",
  "pi_dssb": "Microsoft Windows",
  "pi_dsvs": "-",
  "pi_fal": "2024-08-10 07:04:51 AM",
  "pi_fau": "2024-08-10 12:04:51 PM",
  "pi_fcl": "2024-07-17 01:59:07 PM",
  "pi_fcu": "2024-07-17 06:59:07 PM",
  "pi_fd": "windows explorer",
  "pi_fml": "2024-08-09 07:39:22 PM",
  "pi_fmods": "-",
  "pi_fmu": "2024-08-10 12:39:22 AM",
  "pi_fp": "c:\\windows\\explorer.exe",
  "pi_fs": "5.5 MB",
  "pi_in": "explorer.exe",
  "pi_maxthrds": "-",
  "pi_ncons": "-",
  "pi_nda": "No",
  "pi_ph": "823c3b2e-eb1d-01da-d840-00008050b8bb",
  "pi_pin": "userinit.exe",
  "pi_pki": "No",
  "pi_pmd5": "7c90dc5c-1878-aafb-658f-c9f2abb238f1",
  "pi_ps": "0",
  "pi_rmods": "-",
  "pi_thrds": "-",
  "pi_vs": "No",
  "ua_ad": "-",
  "ua_appun": "-",
  "ua_ar": "No",
  "ua_dnsq": "-",
  "ua_drpt": "-",
  "ua_drsn": "-",
  "ua_eeu": "2024-08-17 11:59:18 PM",
  "ua_efs": "-",
  "ua_fr": "-",
  "ua_fun": "-",
  "ua_hn": "-",
  "ua_imagebase": "-",
  "ua_la": "No",
  "ua_ldfai": "-",
  "ua_ldfrf": "-",
  "ua_ldfrt": "-",
  "ua_ldfui": "-",
  "ua_lp": "-",
  "ua_md": "No",
  "ua_meid": "cfc09e86-a4e6-1035-5fc0-806e7fce78b2",
  "ua_ms": "-",
  "ua_msb": "-",
  "ua_nda": "-",
  "ua_ndt": "-",
  "ua_ndu": "-",
  "ua_ob": "-",
  "ua_pa": "-",
  "ua_pt": "-",
  "ua_ra": "-",
  "ua_rp": "-",
  "ua_sa": "-",
  "ua_sc": "-",
  "ua_sci": "-",
  "ua_scn": "-",
  "ua_scr": "-",
  "ua_scrs": "-",
  "ua_scrt": "-",
  "ua_sct": "-",
  "ua_scu": "-",
  "ua_scv": "-",
  "ua_shn": "-",
  "ua_sme": "-",
  "ua_sms": "-",
  "ua_sn": "-",
  "ua_up": "-",
  "ua_we": "-",
  "ua_wi": "-",
  "uad_br": "36.0 KB",
  "uad_bw": "36.0 KB",
  "uad_cf": "-",
  "uad_dbt": "RAID",
  "uad_dcf": "No",
  "uad_dcru": "-",
  "uad_ddt": "Fixed",
  "uad_dea": "None",
  "uad_dfc": "No",
  "uad_dir": "No",
  "uad_dlau": "-",
  "uad_dmou": "-",
  "uad_dp": "c:\\$recycle.bin\\s-1-5-21-1573680173-1931375354-1090983491-38523\\$r4ztwqq.pdf",
  "uad_fat": "-",
  "uad_fattm": "-",
  "uad_fh": "-",
  "uad_fown": "-",
  "uad_ft": "-",
  "uad_hkad": "-",
  "uad_hkby": "-",
  "uad_hkom": "-",
  "uad_pn": "-",
  "uad_regdp": "-",
  "uad_regsp": "-",
  "uad_regvt": "-",
  "uad_sbt": "USB",
  "uad_sc": "No",
  "uad_sdt": "Fixed",
  "uad_sea": "None",
  "uad_sfc": "No",
  "uad_sir": "No",
  "uad_sp": "c:\\users\\eah915\\downloads\\eam quarterly security inspection template 12_7_2017 (2).pdf"
}
```
</details>

### Sample query

```sql title="Activities By Protocol"
_sourceCategory="Labs/DigitalGuardian"
| json "dg_guid", "dg_utype", "dg_cn", "dg_user", "dg_machine_name", "dg_proc_file_name", "dg_time", "ua_pt" as id, operation_type, company_name, user, computer, application_name, time, protocol nodrop

/// global variables
| where operation_type matches "{{operation_type}}"
| where company_name matches "{{company_name}}"

| where !(protocol matches "-") AND !isBlank(protocol)
| count by id, time, protocol
| count as frequency by protocol
| sort by frequency
```

## Set up collection

To set up the [Digital Guardian Source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/digital-guardian-source), follow the instructions provided. These instructions will guide you through the process of creating a source using the Digital Guardian Source category, which you will need to use when installing the app. By following these steps, you can ensure that your Digital Guardian ARC app is properly integrated and configured to collect and analyze your Digital Guardian ARC data.

## Installing the Digital Guardian ARC app​​

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

## Viewing the Digital Guardian ARC dashboard

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Digital Guardian ARC - Overview** dashboard offers a centralized view of data activities, enabling security analysts to monitor and secure sensitive information effectively. It highlights critical metrics such as total activities, blocked actions, unauthorized PKI activities, and rule violations for immediate visibility into security events. Analysts can track network activity by protocol (for example, HTTP, IPsec) and identify operational types like file creation, deletion, and transfer. File type access insights helps you to detect malicious files or unauthorized usage, while top users, computers, and applications provide a snapshot of entities generating the most activity.

The dashboard includes geolocation maps for sender and recipient activity to identify unusual or risky data transfers across regions. It also highlights potentially risky geographies associated with flagged behaviors. Authentication insights, such as failed login attempts, enable analysts to investigate credential misuse or brute-force attempts. Process monitoring lists metadata like file size, path, and user domain to identify risky operations. Historical activity trends help detect abnormal surges or patterns.

This tool is particularly effective for detecting incidents, managing insider threats, and ensuring compliance by tracking rule-violated activities. It supports threat-hunting efforts by correlating risky behaviors with geolocation and operational context. The focus on endpoint activity, unauthorized operations, and certificate analysis strengthens an organization’s data security posture. Security analysts can leverage these insights to identify and mitigate risks proactively, securing critical assets and sensitive data. The dashboard integrates seamlessly with Digital Guardian ARC, enabling a robust framework for real-time monitoring and investigation. <br/> <img src='https://sumologic-app-data-v2.s3.us-east-1.amazonaws.com/dashboards/Digital-Guardian-ARC/Digital-Guardian-ARC-Overview.png' alt="Digital-Guardian-ARC-Overview" />

## Create monitors for Digital Guardian ARC app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Digital Guardian ARC monitors

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | 
|:--|:--|:--|:--|
| `Blocked Events` | This alert is fired when there are blocked events. | Critical | Count > 0 | 
| `Failed Login Attempt` | This alert tracks repeated failed login attempts on monitored systems. It aids in identifying brute-force attacks, credential stuffing, or unauthorized access attempts, allowing analysts to take corrective actions to secure accounts and investigate potential insider threats. | Critical | Count > 3|
| `Recipient Activities from Risky Locations` | This alert identifies activities involving recipients located in regions flagged as risky or suspicious. It enables analysts to assess potential data exfiltration risks or unauthorized sharing of sensitive information, thereby strengthening data protection measures. | Critical | Count > 0 |
| `Rule Violation Events` | This alert highlights incidents, where monitored systems or users, have violated predefined security rules. It provides insights into non-compliant behavior, supporting analysts in enforcing organizational security policies and maintaining compliance standards. | Critical | Count > 0 |
| `Sender Activities from Risky Locations` | This alert tracks activities initiated by senders located in high-risk geographic regions. It helps analysts detect and respond to potential threats involving unauthorized data transmission, insider threats, or compromised systems in critical locations. | Critical | Count > 0 |

## Upgrade/downgrade the Digital Guardian ARC app (optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Digital Guardian ARC app (optional)

import AppUninstall from '../../reuse/apps/app-uninstall.md';

<AppUninstall/>
