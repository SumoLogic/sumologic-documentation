---
title: Sumo Logic Automation Tools
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic-notifications.png')} alt="sumo-logic-notifications" width="100"/>

***Version: 0.1  
Updated: Sep 9, 2024***

Sumo Logic Automation Tools simplifies CloudSOAR playbooks with data processing and automation.

### Actions

* **Buffer** (*Custom*) - Takes a JSON string or object and returns it as a JSON result. Helpful for dumping a JSON blob in string format and rendering in JSON format. [Example](#buffer)
* **Data Transform** (*Custom*) -  Provides various functions to more easily transform data in a playbook. [Example](#data-transform)
* **Build JSON Object** (*Custom*) - Provide the action with JSON key placeholder or string to build a new JSON object with the specified key/values. [Example](#build-json-object)
* **Build Signal Output** (*Custom*) - Converts the Sumo Logic SIEM Signal JSON object to HTML or plain text with line breaks. [Example](#build-signal-output)

## Actions Usage

### Buffer
```css
INPUT="MY EXAMPLE STRING"
```
```css
OUTPUT = {
  "data": "MY EXAMPLE STRING"
}
```

### Data Transform

1. **Split Text** - Splits a string into an array based on a delimiter and returns the specified element.
```css
INPUT = {
  "string_input": "MY,EXAMPLE,STRING",
  "transform_function": "Split Text",
  "transform_argument": ",",
  "array_element": 1
}
```
```css
OUTPUT = {
  "data": "EXAMPLE"
}
```
2. **Strip Whitespace** - Strips whitespace from the beginning and end of a string.
```css
INPUT = {
  "string_input": "   MY EXAMPLE STRING  ",
  "transform_function": "Strip Whitespace"
  "transform_argument": "MY"
}
```
```css
OUTPUT = {
  "data": "EXAMPLE STRING"
}
```
3. **Trim Leading Whitespace** - Trims leading whitespace from a string.
```css
INPUT = {
  "string_input": "     MY EXAMPLE STRING",
  "transform_function": "Lstrip"
}
```
```css
OUTPUT = {
  "data": "MY EXAMPLE STRING"
}
```
4. **Trim Trailing Whitespace** - Trims trailing whitespace from a string.
```css
INPUT = {
  "string_input": "MY EXAMPLE STRING    ",
  "transform_function": "Rstrip"
}
```
```css
OUTPUT = {
  "data": "MY EXAMPLE STRING"
}
```
5. **Replace Text** - Replaces all occurrences of a string with another string.
```css
INPUT = {
  "string_input": "MY EXAMPLE STRING",
  "transform_function": "Replace",
  "transform_argument": "EXAMPLE",
  "replace_argument": "REPLACED"
}
```
```css
OUTPUT = {
  "data": "MY REPLACED STRING"
}
```
6. **Regex-Based Replacement** - Replaces all occurrences of a regex pattern with another string.
```css
INPUT = {
  "string_input": "MY EXAMPLE STRING",
  "transform_function": "Regex Replace",
  "transform_argument": "EXAMPLE",
  "replace_argument": "REPLACED"
}
```
```css
OUTPUT = {
  "data": "MY REPLACED STRING"
}
```
7. **Add Prefix and/or Suffix** - Adds a prefix and/or suffix to a string.
```css
INPUT = {
  "string_input": "EXAMPLE STRING",
  "transform_function": "Prefix Suffix",
  "prefix_argument": "MY ",
  "suffix_argument": " STRING"
}
```
```css
OUTPUT = {
  "data": "MY EXAMPLE STRING"
}
```
8. **Regex Match** - Matches a string against a regex pattern and returns the first match.
```css
INPUT = {
  "string_input": "MY EXAMPLE STRING",
  "transform_function": "Regex",
  "transform_argument": "EXAMPLE"
}
```
```css
OUTPUT = {
  "data": "EXAMPLE"
}
```
9. **Convert to Uppercase** - Converts a string to uppercase.
```css
INPUT = {
  "string_input": "my example string",
  "transform_function": "Upper"
}
```
```css
OUTPUT = {
  "data": "MY EXAMPLE STRING"
}
```
10. **Convert to Lowercase** - Converts a string to lowercase.
```css
INPUT = {
  "string_input": "MY EXAMPLE STRING",
  "transform_function": "Lower"
}
```
```css
OUTPUT = {
  "data": "my example string"
}
```
11. **Convert to Title Case** - Converts a string to title case.
```css
INPUT = {
  "string_input": "my example string",
  "transform_function": "Title"
}
```
```css
OUTPUT = {
  "data": "My Example String"
}
```
12. **Capitalize First Letter** - Capitalizes the first letter of a string.
```css
INPUT = {
  "string_input": "my example string",
  "transform_function": "Capitalize"
}
```
```css
OUTPUT = {
  "data": "My example string"
}
```
13. **Encode as UTF-8** - Encodes a string as UTF-8.
```css
INPUT = {
  "string_input": "Café",
  "transform_function": "Encode UTF-8"
}
```
```css
OUTPUT = {
  "data": "Caf%C3%A9"
}
```
14. **Encode as ASCII** - Encodes a string as ASCII.
```css
INPUT = {
  "string_input": a+b*c(d)e[f]",
  "transform_function": "Encode ASCII"
}
```
```css
OUTPUT = {
  "data": "a%2Bb%2Ac%28d%29e%5Bf%5D"
}
```
15. **Escape Special Characters** - Escapes special characters in a string.
```css
INPUT = {
  "string_input": "a+b*c(d)e[f]",
  "transform_function": "Escape String"
}
```
```css
OUTPUT = {
  "data": "a\\+b\\*c\\(d\\)e\\[f\\]"
}
```

### Build JSON Object
Example:
```css
{
    "MY EXAMPLE KEY_1": "MY EXAMPLE VALUE",
    "MY EXAMPLE KEY_2": "MY EXAMPLE VALUE",
    "MY EXAMPLE KEY_3": ["MY EXAMPLE VALUE_1", "MY EXAMPLE VALUE_2"]
}
```
Input Fields For Every Key1, Key2, Key3
- *JSON Key Placeholder*  -> **MY EXAMPLE KEY_3**
- *JSON Value Placeholder* ->  **(Whole JSON Object)** *eg . Any Action `output.raw`*

Output
```css
{
    "MY EXAMPLE KEY_3": ["MY EXAMPLE VALUE_1", "MY EXAMPLE VALUE_2"]
}
```


### Build Signal Output
##### String Input
- CASE 1: Input as `Get Insight V2 output.raw`  *Preferred*
- CASE 2: Input as `Get Signal output.raw`
- CASE 3: Input as `Sumo Logic SIEM Signal` as JSON

##### Output Format Type
- HTML with line breaks
- Plain Text With Line Breaks

##### Display Time of Timezone Output
- [List of Timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
- Example: `America/New_York`

##### Fields to Exclude from output
- List Excluded Fields From Output
- Example: `field1, field2, field3`

##### Fields to Include from output
- List Included Fields From Output
- Example: `field1, field2, field3`

##### INPUT Example:
```css
{
  "id": "07f3de36-4447-3c3b-a801-xxxxxx",
  "readableId": "INSIGHT-00000",
  "name": "Sumo Logic SIEM Signal",
  "signals": [
    {
      "id": "38fd9c37-0df6-5333-86e5-xxxxxx",
      "name": "Sumo Logic SIEM Signal",
      "description": "This signal is triggered when a new process is created.",
      "stage": "Execution",
      "created": "2024-08-18T12:19:06.056000",
      "timestamp": "2024-08-18T12:19:06.056000",
      "severity": 1,    
      "recordCount": 1,
      "recordTypes": [],
      "contentType": "RULE",
      "allRecords": [
        {
          "baseImage": "C:\\Program Files\\Rapid7\\Insight Agent\\components\\endpoint_broker\\",
          "commandLine": "PowerShell \"$code = \\\"using System; using System.Linq; using System.Collections.Generic; using System.ComponentModel; using System.Runtime.InteropServices; using System.Security.Principal; using System.Text; namespace AuditEventPolicy { public class Collect { [DllImport(\\\"\\\"advapi32.dll\\\"\\\", SetLastError = false)] private static extern uint LsaClose(IntPtr ObjectHandle); [DllImport(\\\"\\\"advapi32.dll\\\"\\\", SetLastError = true)] private static extern uint LsaOpenPolicy( ref LSA_UNICODE_STRING SystemName, ref LSA_OBJECT_ATTRIBUTES ObjectAttributes, uint DesiredAccess, out IntPtr PolicyHandle); [DllImport(\\\"\\\"advapi32.dll\\\"\\\", SetLastError = false)] private static extern uint LsaNtStatusToWinError(uint status); [DllImport(\\\"\\\"advapi32.dll\\\"\\\")] private static extern uint LsaQueryInformationPolicy(IntPtr PolicyHandle, uint InformationClass, out IntPtr Buffer); internal const uint STATUS_SUCCESS = 0x00000000; internal const uint STATUS_ACCESS_DENIED = 0xC0000022; internal const uint STATUS_INSUFFICIENT_RESOURCES = 0xC000009A; internal const uint STATUS_INTERNAL_DB_ERROR = 0xC0000158; internal const uint STATUS_INVALID_HANDLE = 0xC0000008; internal const uint STATUS_INVALID_SERVER_STATE = 0xC00000DC; internal const uint STATUS_INVALID_PARAMETER = 0xC000000D; internal const uint STATUS_NO_SUCH_PRIVILEGE = 0xC0000060; internal const uint STATUS_OBJECT_NAME_NOT_FOUND = 0xC0000034; internal const uint STATUS_UNSUCCESSFUL = 0xC0000001; private static readonly Dictionary<uint, string> LsaNtStatusMessages = new Dictionary<uint, string>{ {STATUS_SUCCESS, \\\"\\\"The operation completed successfully.\\\"\\\"}, {STATUS_ACCESS_DENIED, \\\"\\\"Access is denied.\\\"\\\"}, {STATUS_INSUFFICIENT_RESOURCES, \\\"\\\"There are not enough system resources to complete the call.\\\"\\\"}, {STATUS_INTERNAL_DB_ERROR, \\\"\\\"The LSA database contains an internal inconsistency.\\\"\\\"}, {STATUS_INVALID_HANDLE, \\\"\\\"An object or RPC handle is not valid.\\\"\\\"}, {STATUS_INVALID_SERVER_STATE, \\\"\\\"The LSA server is currently disabled.\\\"\\\"}, {STATUS_INVALID_PARAMETER, \\\"\\\"One of the parameters is not valid.\\\"\\\"}, {STATUS_NO_SUCH_PRIVILEGE, \\\"\\\"A specified privilege does not exist.\\\"\\\"}, {STATUS_OBJECT_NAME_NOT_FOUND, \\\"\\\"An object in the LSA policy database was not found.\\\"\\\"}, {STATUS_UNSUCCESSFUL, \\\"\\\"The requested operation was unsuccessful.\\\"\\\"}}; [Flags]public enum LsaPolicyAccessRights : uint{ POLICY_VIEW_LOCAL_INFORMATION = 0x00000001, POLICY_VIEW_AUDIT_INFORMATION = 0x00000002, POLICY_GET_PRIVATE_INFORMATION = 0x00000004, POLICY_TRUST_ADMIN = 0x00000008, POLICY_CREATE_ACCOUNT = 0x00000010, POLICY_CREATE_SECRET = 0x00000020, POLICY_CREATE_PRIVILEGE = 0x00000040, POLICY_SET_DEFAULT_QUOTA_LIMITS = 0x00000080, POLICY_SET_AUDIT_REQUIREMENTS = 0x00000100, POLICY_AUDIT_LOG_ADMIN = 0x00000200, POLICY_SERVER_ADMIN = 0x00000400, POLICY_LOOKUP_NAMES = 0x00000800, POLICY_NOTIFICATION = 0x00001000, POLICY_ALL_ACCESS = POLICY_VIEW_LOCAL_INFORMATION |POLICY_VIEW_AUDIT_INFORMATION |POLICY_GET_PRIVATE_INFORMATION |POLICY_TRUST_ADMIN |POLICY_CREATE_ACCOUNT |POLICY_CREATE_SECRET |POLICY_CREATE_PRIVILEGE |POLICY_SET_DEFAULT_QUOTA_LIMITS |POLICY_SET_AUDIT_REQUIREMENTS |POLICY_AUDIT_LOG_ADMIN |POLICY_SERVER_ADMIN |POLICY_LOOKUP_NAMES |POLICY_NOTIFICATION} [StructLayout(LayoutKind.Sequential)]internal struct LSA_UNICODE_STRING{ internal ushort Length; internal ushort MaximumLength; internal IntPtr Buffer; } [StructLayout(LayoutKind.Sequential)]internal struct LSA_OBJECT_ATTRIBUTES{ internal uint Length; internal IntPtr RootDirectory; internal IntPtr ObjectName; internal uint Attributes; internal IntPtr SecurityDescriptor; internal IntPtr SecurityQualityOfService; } public struct POLICY_AUDIT_EVENTS_INFO{ public bool AuditingMode; public IntPtr EventAuditingOptions; public Int32 MaximumAuditEventCount; } private static void HandleLsaNtStatus(uint ntStatusCode){ if (ntStatusCode == STATUS_SUCCESS){ return; } var winErrorCode = (int)(LsaNtStatusToWinError(ntStatusCode)); if (LsaNtStatusMessages.ContainsKey(ntStatusCode)){ throw new Win32Exception(winErrorCode, LsaNtStatusMessages[ntStatusCode]); } throw new Win32Exception(winErrorCode); } private static IntPtr GetLsaPolicyHandle(){ var systemName = new LSA_UNICODE_STRING(); var objectAttributes = new LSA_OBJECT_ATTRIBUTES{ Length = 0, RootDirectory = IntPtr.Zero, ObjectName = IntPtr.Zero, Attributes = 0, SecurityDescriptor = IntPtr.Zero, SecurityQualityOfService = IntPtr.Zero}; IntPtr lsaPolicyHandle; var ntStatus = LsaOpenPolicy(ref systemName, ref objectAttributes, (uint)(LsaPolicyAccessRights.POLICY_ALL_ACCESS), out lsaPolicyHandle); HandleLsaNtStatus(ntStatus); return lsaPolicyHandle; } public static Dictionary<string, int> GetAuditEventPolicy(){ var settings = new Dictionary<string, int>{ {\\\"\\\"System\\\"\\\", -1}, {\\\"\\\"Logon\\\"\\\", -1}, {\\\"\\\"Object Access\\\"\\\", -1}, {\\\"\\\"Privilige Use\\\"\\\", -1}, {\\\"\\\"Detailed Tracking\\\"\\\", -1}, {\\\"\\\"Policy Change\\\"\\\", -1}, {\\\"\\\"Account Management\\\"\\\", -1}, {\\\"\\\"Directory Service Access\\\"\\\", -1}, {\\\"\\\"Account Logon\\\"\\\", -1}}; var lsaPolicyHandle = GetLsaPolicyHandle(); try{ IntPtr outBuffer; uint policyType = 2; var ntStatus = LsaQueryInformationPolicy(lsaPolicyHandle, policyType, out outBuffer); if (ntStatus == STATUS_OBJECT_NAME_NOT_FOUND){ return settings; } HandleLsaNtStatus(ntStatus); var auditEventsInfo = Marshal.PtrToStructure<POLICY_AUDIT_EVENTS_INFO>(outBuffer); var values = new int[auditEventsInfo.MaximumAuditEventCount]; Marshal.Copy(auditEventsInfo.EventAuditingOptions, values, 0, auditEventsInfo.MaximumAuditEventCount); var categoryIndex = settings.Keys.ToArray(); for (int i = 0; i < values.Length; i++){ settings[categoryIndex[i]] = values[i]; } return settings; } finally{ var ntStatus = LsaClose(lsaPolicyHandle); HandleLsaNtStatus(ntStatus); } } } } \\\";$previousEncoding = [Console]::OutputEncoding;[Console]::OutputEncoding = [Text.Encoding]::UTF8;Add-Type -TypeDefinition $code -Language CSharp;@([AuditEventPolicy.Collect]::GetAuditEventPolicy()) | ConvertTo-Json;[Console]::OutputEncoding = $previousEncoding;\"",
          "cseSignal": {},
          "day": 18,
          "description": "A new process has been created",
          "device_hostname": "sjcd1pwadiap001",
          "device_hostname_raw": "SJCD1PWADIAP001.ihgint.global",
          "fieldTags": {},
          "fields": {
            "EventData.ProcessId": "0x11f0",
          },
        }
      ],
      "ruleId": "MATCH-S00198",
      "entity": {
      },
      "artifacts": [],
      "recordSearchDetails": null
    }
    ]
 }
```
#### OUTPUT Example 
HTML
```css
{
  "signals": [
    "<b>Signal time:</b> 2024-08-18 12:19:06.056000+00:00<br/><b>Name:</b> Sumo Logic SIEM Signal<br/><b>Rule:</b> MATCH-S00198<br/><b>Stage:</b> Execution<br/><b>Entity Name:</b> <br/><b>baseImage:</b> C:\\\\Program Files\\\\Rapid7\\\\Insight Agent\\\\components\\\\endpoint_broker\\\\<br/><b>commandLine:</b> PowerShell '$code = 'using System; using System.Linq; using System.Collections.Generic; using System.ComponentModel; using System.Runtime.InteropServices; using System.Security.Principal; using System.Text; namespace AuditEventPolicy { public class Collect { [DllImport(''advapi32.dll'', SetLastError = false)] private static extern uint LsaClose(IntPtr ObjectHandle); [DllImport(''advapi32.dll'', SetLastError = true)] private static extern uint LsaOpenPolicy( ref LSA_UNICODE_STRING SystemName, ref LSA_OBJECT_ATTRIBUTES ObjectAttributes, uint DesiredAccess, out IntPtr PolicyHandle); [DllImport(''advapi32.dll'', SetLastError = false)] private static extern uint LsaNtStatusToWinError(uint status); [DllImport(''advapi32.dll'')] private static extern uint LsaQueryInformationPolicy(IntPtr PolicyHandle, uint InformationClass, out IntPtr Buffer); internal const uint STATUS_SUCCESS = 0x00000000; internal const uint STATUS_ACCESS_DENIED = 0xC0000022; internal const uint STATUS_INSUFFICIENT_RESOURCES = 0xC000009A; internal const uint STATUS_INTERNAL_DB_ERROR = 0xC0000158; internal const uint STATUS_INVALID_HANDLE = 0xC0000008; internal const uint STATUS_INVALID_SERVER_STATE = 0xC00000DC; internal const uint STATUS_INVALID_PARAMETER = 0xC000000D; internal const uint STATUS_NO_SUCH_PRIVILEGE = 0xC0000060; internal const uint STATUS_OBJECT_NAME_NOT_FOUND = 0xC0000034; internal const uint STATUS_UNSUCCESSFUL = 0xC0000001; private static readonly Dictionary<uint, string> LsaNtStatusMessages = new Dictionary<uint, string>{ {STATUS_SUCCESS, ''The operation completed successfully.''}, {STATUS_ACCESS_DENIED, ''Access is denied.''}, {STATUS_INSUFFICIENT_RESOURCES, ''There are not enough system resources to complete the call.''}, {STATUS_INTERNAL_DB_ERROR, ''The LSA database contains an internal inconsistency.''}, {STATUS_INVALID_HANDLE, ''An object or RPC handle is not valid.''}, {STATUS_INVALID_SERVER_STATE, ''The LSA server is currently disabled.''}, {STATUS_INVALID_PARAMETER, ''One of the parameters is not valid.''}, {STATUS_NO_SUCH_PRIVILEGE, ''A specified privilege does not exist.''}, {STATUS_OBJECT_NAME_NOT_FOUND, ''An object in the LSA policy database was not found.''}, {STATUS_UNSUCCESSFUL, ''The requested operation was unsuccessful.''}}; [Flags]public enum LsaPolicyAccessRights : uint{ POLICY_VIEW_LOCAL_INFORMATION = 0x00000001, POLICY_VIEW_AUDIT_INFORMATION = 0x00000002, POLICY_GET_PRIVATE_INFORMATION = 0x00000004, POLICY_TRUST_ADMIN = 0x00000008, POLICY_CREATE_ACCOUNT = 0x00000010, POLICY_CREATE_SECRET = 0x00000020, POLICY_CREATE_PRIVILEGE = 0x00000040, POLICY_SET_DEFAULT_QUOTA_LIMITS = 0x00000080, POLICY_SET_AUDIT_REQUIREMENTS = 0x00000100, POLICY_AUDIT_LOG_ADMIN = 0x00000200, POLICY_SERVER_ADMIN = 0x00000400, POLICY_LOOKUP_NAMES = 0x00000800, POLICY_NOTIFICATION = 0x00001000, POLICY_ALL_ACCESS = POLICY_VIEW_LOCAL_INFORMATION |POLICY_VIEW_AUDIT_INFORMATION |POLICY_GET_PRIVATE_INFORMATION |POLICY_TRUST_ADMIN |POLICY_CREATE_ACCOUNT |POLICY_CREATE_SECRET |POLICY_CREATE_PRIVILEGE |POLICY_SET_DEFAULT_QUOTA_LIMITS |POLICY_SET_AUDIT_REQUIREMENTS |POLICY_AUDIT_LOG_ADMIN |POLICY_SERVER_ADMIN |POLICY_LOOKUP_NAMES |POLICY_NOTIFICATION} [StructLayout(LayoutKind.Sequential)]internal struct LSA_UNICODE_STRING{ internal ushort Length; internal ushort MaximumLength; internal IntPtr Buffer; } [StructLayout(LayoutKind.Sequential)]internal struct LSA_OBJECT_ATTRIBUTES{ internal uint Length; internal IntPtr RootDirectory; internal IntPtr ObjectName; internal uint Attributes; internal IntPtr SecurityDescriptor; internal IntPtr SecurityQualityOfService; } public struct POLICY_AUDIT_EVENTS_INFO{ public bool AuditingMode; public IntPtr EventAuditingOptions; public Int32 MaximumAuditEventCount; } private static void HandleLsaNtStatus(uint ntStatusCode){ if (ntStatusCode == STATUS_SUCCESS){ return; } var winErrorCode = (int)(LsaNtStatusToWinError(ntStatusCode)); if (LsaNtStatusMessages.ContainsKey(ntStatusCode)){ throw new Win32Exception(winErrorCode, LsaNtStatusMessages[ntStatusCode]); } throw new Win32Exception(winErrorCode); } private static IntPtr GetLsaPolicyHandle(){ var systemName = new LSA_UNICODE_STRING(); var objectAttributes = new LSA_OBJECT_ATTRIBUTES{ Length = 0, RootDirectory = IntPtr.Zero, ObjectName = IntPtr.Zero, Attributes = 0, SecurityDescriptor = IntPtr.Zero, SecurityQualityOfService = IntPtr.Zero}; IntPtr lsaPolicyHandle; var ntStatus = LsaOpenPolicy(ref systemName, ref objectAttributes, (uint)(LsaPolicyAccessRights.POLICY_ALL_ACCESS), out lsaPolicyHandle); HandleLsaNtStatus(ntStatus); return lsaPolicyHandle; } public static Dictionary<string, int> GetAuditEventPolicy(){ var settings = new Dictionary<string, int>{ {''System'', -1}, {''Logon'', -1}, {''Object Access'', -1}, {''Privilige Use'', -1}, {''Detailed Tracking'', -1}, {''Policy Change'', -1}, {''Account Management'', -1}, {''Directory Service Access'', -1}, {''Account Logon'', -1}}; var lsaPolicyHandle = GetLsaPolicyHandle(); try{ IntPtr outBuffer; uint policyType = 2; var ntStatus = LsaQueryInformationPolicy(lsaPolicyHandle, policyType, out outBuffer); if (ntStatus == STATUS_OBJECT_NAME_NOT_FOUND){ return settings; } HandleLsaNtStatus(ntStatus); var auditEventsInfo = Marshal.PtrToStructure<POLICY_AUDIT_EVENTS_INFO>(outBuffer); var values = new int[auditEventsInfo.MaximumAuditEventCount]; Marshal.Copy(auditEventsInfo.EventAuditingOptions, values, 0, auditEventsInfo.MaximumAuditEventCount); var categoryIndex = settings.Keys.ToArray(); for (int i = 0; i < values.Length; i++){ settings[categoryIndex[i]] = values[i]; } return settings; } finally{ var ntStatus = LsaClose(lsaPolicyHandle); HandleLsaNtStatus(ntStatus); } } } } ';$previousEncoding = [Console]::OutputEncoding;[Console]::OutputEncoding = [Text.Encoding]::UTF8;Add-Type -TypeDefinition $code -Language CSharp;@([AuditEventPolicy.Collect]::GetAuditEventPolicy()) | ConvertTo-Json;[Console]::OutputEncoding = $previousEncoding;'<br/><b>day:</b> 18<br/><b>description:</b> A new process has been created<br/><b>device_hostname:</b> sjcd1pwadiap001<br/><b>device_hostname_raw:</b> SJCD1PWADIAP001.ihgint.global<br/><br/>"
  ]
}
```
Break Lines
```css
{
  "signals": [
    "Signal time: 2024-08-18 12:19:06.056000+00:00\\nSignal Name: Sumo Logic SIEM Signal\\nRule: MATCH-S00198\\nStage: Execution\\nEntity Name: \\nbaseImage: C:\\\\Program Files\\\\Rapid7\\\\Insight Agent\\\\components\\\\endpoint_broker\\\\\\ncommandLine: PowerShell '$code = 'using System; using System.Linq; using System.Collections.Generic; using System.ComponentModel; using System.Runtime.InteropServices; using System.Security.Principal; using System.Text; namespace AuditEventPolicy { public class Collect { [DllImport(''advapi32.dll'', SetLastError = false)] private static extern uint LsaClose(IntPtr ObjectHandle); [DllImport(''advapi32.dll'', SetLastError = true)] private static extern uint LsaOpenPolicy( ref LSA_UNICODE_STRING SystemName, ref LSA_OBJECT_ATTRIBUTES ObjectAttributes, uint DesiredAccess, out IntPtr PolicyHandle); [DllImport(''advapi32.dll'', SetLastError = false)] private static extern uint LsaNtStatusToWinError(uint status); [DllImport(''advapi32.dll'')] private static extern uint LsaQueryInformationPolicy(IntPtr PolicyHandle, uint InformationClass, out IntPtr Buffer); internal const uint STATUS_SUCCESS = 0x00000000; internal const uint STATUS_ACCESS_DENIED = 0xC0000022; internal const uint STATUS_INSUFFICIENT_RESOURCES = 0xC000009A; internal const uint STATUS_INTERNAL_DB_ERROR = 0xC0000158; internal const uint STATUS_INVALID_HANDLE = 0xC0000008; internal const uint STATUS_INVALID_SERVER_STATE = 0xC00000DC; internal const uint STATUS_INVALID_PARAMETER = 0xC000000D; internal const uint STATUS_NO_SUCH_PRIVILEGE = 0xC0000060; internal const uint STATUS_OBJECT_NAME_NOT_FOUND = 0xC0000034; internal const uint STATUS_UNSUCCESSFUL = 0xC0000001; private static readonly Dictionary<uint, string> LsaNtStatusMessages = new Dictionary<uint, string>{ {STATUS_SUCCESS, ''The operation completed successfully.''}, {STATUS_ACCESS_DENIED, ''Access is denied.''}, {STATUS_INSUFFICIENT_RESOURCES, ''There are not enough system resources to complete the call.''}, {STATUS_INTERNAL_DB_ERROR, ''The LSA database contains an internal inconsistency.''}, {STATUS_INVALID_HANDLE, ''An object or RPC handle is not valid.''}, {STATUS_INVALID_SERVER_STATE, ''The LSA server is currently disabled.''}, {STATUS_INVALID_PARAMETER, ''One of the parameters is not valid.''}, {STATUS_NO_SUCH_PRIVILEGE, ''A specified privilege does not exist.''}, {STATUS_OBJECT_NAME_NOT_FOUND, ''An object in the LSA policy database was not found.''}, {STATUS_UNSUCCESSFUL, ''The requested operation was unsuccessful.''}}; [Flags]public enum LsaPolicyAccessRights : uint{ POLICY_VIEW_LOCAL_INFORMATION = 0x00000001, POLICY_VIEW_AUDIT_INFORMATION = 0x00000002, POLICY_GET_PRIVATE_INFORMATION = 0x00000004, POLICY_TRUST_ADMIN = 0x00000008, POLICY_CREATE_ACCOUNT = 0x00000010, POLICY_CREATE_SECRET = 0x00000020, POLICY_CREATE_PRIVILEGE = 0x00000040, POLICY_SET_DEFAULT_QUOTA_LIMITS = 0x00000080, POLICY_SET_AUDIT_REQUIREMENTS = 0x00000100, POLICY_AUDIT_LOG_ADMIN = 0x00000200, POLICY_SERVER_ADMIN = 0x00000400, POLICY_LOOKUP_NAMES = 0x00000800, POLICY_NOTIFICATION = 0x00001000, POLICY_ALL_ACCESS = POLICY_VIEW_LOCAL_INFORMATION |POLICY_VIEW_AUDIT_INFORMATION |POLICY_GET_PRIVATE_INFORMATION |POLICY_TRUST_ADMIN |POLICY_CREATE_ACCOUNT |POLICY_CREATE_SECRET |POLICY_CREATE_PRIVILEGE |POLICY_SET_DEFAULT_QUOTA_LIMITS |POLICY_SET_AUDIT_REQUIREMENTS |POLICY_AUDIT_LOG_ADMIN |POLICY_SERVER_ADMIN |POLICY_LOOKUP_NAMES |POLICY_NOTIFICATION} [StructLayout(LayoutKind.Sequential)]internal struct LSA_UNICODE_STRING{ internal ushort Length; internal ushort MaximumLength; internal IntPtr Buffer; } [StructLayout(LayoutKind.Sequential)]internal struct LSA_OBJECT_ATTRIBUTES{ internal uint Length; internal IntPtr RootDirectory; internal IntPtr ObjectName; internal uint Attributes; internal IntPtr SecurityDescriptor; internal IntPtr SecurityQualityOfService; } public struct POLICY_AUDIT_EVENTS_INFO{ public bool AuditingMode; public IntPtr EventAuditingOptions; public Int32 MaximumAuditEventCount; } private static void HandleLsaNtStatus(uint ntStatusCode){ if (ntStatusCode == STATUS_SUCCESS){ return; } var winErrorCode = (int)(LsaNtStatusToWinError(ntStatusCode)); if (LsaNtStatusMessages.ContainsKey(ntStatusCode)){ throw new Win32Exception(winErrorCode, LsaNtStatusMessages[ntStatusCode]); } throw new Win32Exception(winErrorCode); } private static IntPtr GetLsaPolicyHandle(){ var systemName = new LSA_UNICODE_STRING(); var objectAttributes = new LSA_OBJECT_ATTRIBUTES{ Length = 0, RootDirectory = IntPtr.Zero, ObjectName = IntPtr.Zero, Attributes = 0, SecurityDescriptor = IntPtr.Zero, SecurityQualityOfService = IntPtr.Zero}; IntPtr lsaPolicyHandle; var ntStatus = LsaOpenPolicy(ref systemName, ref objectAttributes, (uint)(LsaPolicyAccessRights.POLICY_ALL_ACCESS), out lsaPolicyHandle); HandleLsaNtStatus(ntStatus); return lsaPolicyHandle; } public static Dictionary<string, int> GetAuditEventPolicy(){ var settings = new Dictionary<string, int>{ {''System'', -1}, {''Logon'', -1}, {''Object Access'', -1}, {''Privilige Use'', -1}, {''Detailed Tracking'', -1}, {''Policy Change'', -1}, {''Account Management'', -1}, {''Directory Service Access'', -1}, {''Account Logon'', -1}}; var lsaPolicyHandle = GetLsaPolicyHandle(); try{ IntPtr outBuffer; uint policyType = 2; var ntStatus = LsaQueryInformationPolicy(lsaPolicyHandle, policyType, out outBuffer); if (ntStatus == STATUS_OBJECT_NAME_NOT_FOUND){ return settings; } HandleLsaNtStatus(ntStatus); var auditEventsInfo = Marshal.PtrToStructure<POLICY_AUDIT_EVENTS_INFO>(outBuffer); var values = new int[auditEventsInfo.MaximumAuditEventCount]; Marshal.Copy(auditEventsInfo.EventAuditingOptions, values, 0, auditEventsInfo.MaximumAuditEventCount); var categoryIndex = settings.Keys.ToArray(); for (int i = 0; i < values.Length; i++){ settings[categoryIndex[i]] = values[i]; } return settings; } finally{ var ntStatus = LsaClose(lsaPolicyHandle); HandleLsaNtStatus(ntStatus); } } } } ';$previousEncoding = [Console]::OutputEncoding;[Console]::OutputEncoding = [Text.Encoding]::UTF8;Add-Type -TypeDefinition $code -Language CSharp;@([AuditEventPolicy.Collect]::GetAuditEventPolicy()) | ConvertTo-Json;[Console]::OutputEncoding = $previousEncoding;'\\nday: 18\\ndescription: A new process has been created\\ndevice_hostname: sjcd1pwadiap001\\ndevice_hostname_raw: SJCD1PWADIAP001.ihgint.global\\n\\n"
  ]
}

```
## Change Log

* Sep 09, 2024 - Beta version released