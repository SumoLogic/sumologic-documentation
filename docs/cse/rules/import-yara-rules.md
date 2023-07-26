---
id: import-yara-rules
title: Import YARA Rules
sidebar_label: Import YARA Rules
description: Learn how to import YARA rules from GitHub into CSE.
keywords:
    - yara
    - malware
    - CSE
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for importing YARA rules from GitHub into CSE.

YARA rules are an open source framework for identifying malware. CSE runs YARA rules against files uploaded by the [Network Sensor](/docs/cse/sensors/network-sensor-deployment-guide). When a file matches a YARA rule, CSE creates a special Record which results in a “File Analysis” Signal being created.  Once you’ve imported rules, CSE will sync with the repository no less than every hour.

**To import YARA rules:**

1. Choose **File Analysis** from the **Content** menu. 
1. Click **Add Source**.
1. On the **Add New Source** popup, click **Create** in the GitHub tile. <br/><img src={useBaseUrl('img/cse/add-source-1.png')} alt="add-source-1.png"/>
1. The **Add New Source** popup updates. <br/><img src={useBaseUrl('img/cse/add-source-2.png')} alt="add-source-2.png"/>
1. **Name**. Enter a display name for the rule set to be imported.
1. **Description**. Describe the rule set.
1. Enabled. If you want CSE to apply to rules upon import, leave the toggle set to Enabled. Otherwise, change it to Disabled.
1. **URL**. Enter the URL of the GitHub repository that contains the rules.
1. **GitHub Machine Username**. Enter a username if the repository is private.
1. **GitHub Machine Token**. Enter a token if the repository is private.
1. **YARA file Regex**. The regex in this field is matched to rule names in the repository. The default regex will match rule files whose file extension is `.yar`, `.yara`, or `.rule`.  
1. **Default Severity**. Enter the severity to be assigned when the Signal is created.
