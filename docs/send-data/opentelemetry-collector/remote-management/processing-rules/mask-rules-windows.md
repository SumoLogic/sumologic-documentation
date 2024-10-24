---
id: mask-rules-windows
title: Mask Rules for Windows Source Template (Beta)
sidebar_label: Mask Rules for Windows
description: Create a mask rule to replace an expression with a mask string.
---
<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

:::note
This doc is specific for masking with Windows Source Template. For masking logs for any other source template please refer [this](mask-rules.md) doc.
:::

A mask rule is a type of processing rule that hides irrelevant or sensitive information from logs before ingestion. When you create a mask rule, whatever key you choose to mask, value for that key will be matched against a regex and replaced with a mask string before it is sent to Sumo Logic. You can provide a mask string, or use the default `"#####"`.

Ingestion volume is calculated after applying the mask filter. If the mask reduces the size of the log, the smaller size will be measured against ingestion limits. Masking is a good method for reducing overall ingestion volume.

Following inputs are required from user to mask specific field in Windows Event Log : 
- **Key** - This should point to the key in windows event log, value for which needs to get masked. This key can be nested as well and each level can be seperated by dot(.) for example  `provider.guid`
- **Regex** - This is to identify the part of string value, which needs to get masked.
- **Replacement** - This is to get the string which will be substituted in place of the string selected through regex expression.


For example, to mask numbers inside `guid` under `provider` field from this log:

```
{
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
}
```

You could use the following masking expression input:
1. Key as `provider.guid`
2. Regex as `[-a-z0-9]+`
3. Replacement as `######` 

Using the above masking options would provide the following result:

```
{
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
}
```

## Limitations
- Users can only mask the data which is a string in the windows event log json. Any value which is not a string like integer cannot be masked. This is because internally we will be using [replace_pattern](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/ottlfuncs/README.md#replace_pattern) ottl function which can work on strings only.
- Limtation is also applicable for masking a value which is nested inside some array.


:::note 
- For masking, we use the [replace_pattern](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/ottl/ottlfuncs/README.md#replace_pattern) OTTL function. In this function:
   - $ must be escaped as $$ to bypass environment variable substitution logic.
   - To input a literal $, use $$$.
- When masking strings containing special characters like double quotes (`"`) and backslashes (`\`), these characters will be escaped by a backslash when masking the logs.
:::


:::important
Any masking expression should be tested and verified with a sample source file before applying it to your production logs.
:::

