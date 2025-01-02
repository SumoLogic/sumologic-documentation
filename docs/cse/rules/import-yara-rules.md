---
id: import-yara-rules
title: Import YARA Rules
sidebar_label: Import YARA Rules
description: Learn how to import YARA rules from GitHub into Cloud SIEM.
keywords:
    - yara
    - malware
    - Cloud SIEM
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This section has instructions for importing YARA rules from GitHub into Cloud SIEM.

YARA rules are an open source framework for identifying malware. Cloud SIEM runs YARA rules against files uploaded by the [network sensor](/docs/cse/sensors/network-sensor-deployment-guide). When a file matches a YARA rule, Cloud SIEM creates a special record which results in a “file analysis” signal being created.  Once you’ve imported rules, Cloud SIEM will sync with the repository no less than every hour.

To import YARA rules:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > File Analysis**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Cloud SIEM > File Analysis**. You can also click the **Go To...** menu at the top of the screen and select **File Analysis**.  
1. Click **Add Source**.
1. On the **Add New Source** popup, click **Create** in the GitHub tile. <br/><img src={useBaseUrl('img/cse/add-source-1.png')} alt="Create button" style={{border: '1px solid gray'}} width="400" />
1. The **Add New Source** popup updates. <br/><img src={useBaseUrl('img/cse/add-source-2.png')} alt="Add New Source dialog" tyle={{border: '1px solid gray'}} width="500" />
1. **Name**. Enter a display name for the rule set to be imported.
1. **Description**. Describe the rule set.
1. Enabled. If you want Cloud SIEM to apply to rules upon import, leave the toggle set to Enabled. Otherwise, change it to Disabled.
1. **URL**. Enter the URL of the GitHub repository that contains the rules.
1. **GitHub Machine Username**. Enter a username if the repository is private.
1. **GitHub Machine Token**. Enter a token if the repository is private.
1. **YARA file Regex**. The regex in this field is matched to rule names in the repository. The default regex will match rule files whose file extension is `.yar`, `.yara`, or `.rule`.  
1. **Default Severity**. Enter the severity to be assigned when the signal is created.
