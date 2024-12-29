---
id: mask-rules-windows
title: OpenTelemetry Remote Management Windows Source Template Mask Rules
sidebar_label: Mask Rules - Windows Source Template
description: Create an OpenTelemetry remote management Windows source template mask rule to replace an expression with a mask string.
---

:::note
This document supports masking logs specifically for our [Windows source template](/docs/send-data/opentelemetry-collector/remote-management/source-templates/windows). For other source templates, refer to [Mask Rules](mask-rules.md).
:::

A mask rule is a type of processing rule that hides irrelevant or sensitive information from logs before they are ingested. When you create a mask rule:

* The selected key’s value is matched against a regular expression (regex).
* The matching portion is replaced with a mask string before being sent to Sumo Logic.
* You can provide a custom mask string or use the default mask string: `"#####"`.

Masking is an effective method for reducing overall ingestion volume. Ingestion volume is calculated after applying the mask filter. If masking reduces the log size, the smaller size will be considered against the ingestion limits.

## Examples

### Masking inputs

To mask specific fields in a Windows Event Log, the following inputs are required:
- **Key**. This should point to the key in the Windows Event Log for which the value needs to be masked. This key can be nested, with each level separated by a dot (`.`). For example, `provider.guid`.
- **Regex**. This pattern identifies the part of the string value that needs to be masked.
- **Replacement**. The string to substitute for the matching portion identified by the regex.

:::important
Any masking expression should be tested and verified with a sample source file before applying it to your production logs.
:::

### Masking numbers in a nested field

For example, to mask numbers inside `guid` under `provider` field from this log:

`{
  "record_id": 163054,
  "channel": "Security",
  "event_data": {
    "TargetDomainName": "EC2AMAZ-V57A85N",
    "SubjectUserSid": "S-1-5-21-2435622068-2303779566-2814161656-500",
    "CallerProcessId": "0x1768",
    "TargetUserName": "Guest",
    "CallerProcessName": "C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe",
    "SubjectUserName": "Administrator",
    "TargetSid": "S-1-5-21-2435622068-2303779566-2814161656-501",
    "SubjectLogonId": "0x71aef",
    "SubjectDomainName": "EC2AMAZ-V57A85N"
  },
  "task": "User Account Management",
  "provider": {
    "name": "Microsoft-Windows-Security-Auditing",
    "guid": "{54849625-5478-4994-a5ba-3e3b0328c30d}",
    "event_source": ""
  },
  "system_time": "2023-07-14T07:58:59.9575956Z",
  "computer": "EC2AMAZ-V57A85N",
  "opcode": "Info",
  "keywords": [
    "Audit Success"
  ],
  "details": {
    "Subject": {
      "Security ID": "S-1-5-21-2435622068-2303779566-2814161656-500",
      "Account Name": "Administrator",
      "Account Domain": "EC2AMAZ-V57A85N",
      "Logon ID": "0x71AEF"
    },
    "User": {
      "Security ID": "S-1-5-21-2435622068-2303779566-2814161656-501",
      "Account Name": "Guest",
      "Account Domain": "EC2AMAZ-V57A85N"
    },
    "Process Information": {
      "Process ID": "0x1768",
      "Process Name": "C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe"
    }
  },
  "message": "A user's local group membership was enumerated.",
  "event_id": {
    "qualifiers": 0,
    "id": 4798
  },
  "level": "Information"
}`

You could use the following masking expression input:
1. Key as `provider.guid`.
1. Regex as `[-a-z0-9]+`.
1. Replacement as `######`.

Using the above masking options would provide the following result:

`{
  "record_id": 163054,
  "channel": "Security",
  "event_data": {
    "TargetDomainName": "EC2AMAZ-V57A85N",
    "SubjectUserSid": "S-1-5-21-2435622068-2303779566-2814161656-500",
    "CallerProcessId": "0x1768",
    "TargetUserName": "Guest",
    "CallerProcessName": "C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe",
    "SubjectUserName": "Administrator",
    "TargetSid": "S-1-5-21-2435622068-2303779566-2814161656-501",
    "SubjectLogonId": "0x71aef",
    "SubjectDomainName": "EC2AMAZ-V57A85N"
  },
  "task": "User Account Management",
  "provider": {
    "name": "Microsoft-Windows-Security-Auditing",
    "guid": "{######}",
    "event_source": ""
  },
  "system_time": "2023-07-14T07:58:59.9575956Z",
  "computer": "EC2AMAZ-V57A85N",
  "opcode": "Info",
  "keywords": [
    "Audit Success"
  ],
  "details": {
    "Subject": {
      "Security ID": "S-1-5-21-2435622068-2303779566-2814161656-500",
      "Account Name": "Administrator",
      "Account Domain": "EC2AMAZ-V57A85N",
      "Logon ID": "0x71AEF"
    },
    "User": {
      "Security ID": "S-1-5-21-2435622068-2303779566-2814161656-501",
      "Account Name": "Guest",
      "Account Domain": "EC2AMAZ-V57A85N"
    },
    "Process Information": {
      "Process ID": "0x1768",
      "Process Name": "C:\\Windows\\ImmersiveControlPanel\\SystemSettings.exe"
    }
  },
  "message": "A user's local group membership was enumerated.",
  "event_id": {
    "qualifiers": 0,
    "id": 4798
  },
  "level": "Information"
}`

:::note
- Masking utilizes the [replace_pattern](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/ottlfuncs/README.md#replace_pattern) OTTL function. In this function:
   - Escape `$` as `$$` to bypass environment variable substitution logic.
   - Use `$$$` to include a literal `$`.
- When masking strings containing special characters like double quotes (`"`) and backslashes (`\`), these characters will be escaped by a backslash when masking the logs.
:::

## Rules and limitations

- You can *only* mask the data which is a string in the Windows event log JSON.
- You cannot mask a value that is nested inside any array.
