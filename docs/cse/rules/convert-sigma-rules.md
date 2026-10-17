---
id: convert-sigma-rules
title: Convert Sigma Rules
sidebar_label: Convert Sigma Rules
description: Learn how to convert rules from Sigma format into Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

[Sigma](https://sigmahq.io/) is a generic and open signature format for SIEM systems that allows security teams to write detection rules once in Sigma and convert them to different SIEM query languages. Security engineers can automatically translate their Sigma detection rules into Sumo Logic Cloud SIEM rule syntax through a [Sigma CLI](https://github.com/SigmaHQ/sigma-cli/blob/main/README.md) plugin, eliminating the manual effort of rewriting rules and accelerating the migration of existing Sigma rule libraries to Cloud SIEM. The translated rules detect the same threats and behaviors as the original Sigma rules with high fidelity.

## Sumo Logic backend for Sigma

The pySigma backend for Sumo Logic converts Sigma detection rules into Cloud SIEM rule JSON, ready for import via the CSE API. It includes field mappings for 70+ log sources, automatic entity selector assignment, MITRE ATT&CK tag mapping, and confidence scoring.

- PyPI package: https://pypi.org/project/pysigma-backend-sumologic/
- Source code and documentation: https://github.com/SumoLogic/pySigma-backend-sumologic

## Install the Sumo Logic backend

Run the following to install both Sigma CLI and the Sumo Logic backend in one step:

```bash
pip install sigma-cli pysigma-backend-sumologic
```

Or, if you already have [Sigma CLI](https://sigmahq.io/docs/guide/getting-started.html) installed, install only the backend:

```bash
pip install pysigma-backend-sumologic
```

## Sigma resources

* [Sigma Rule Repository](https://github.com/SigmaHQ/sigma/blob/master/README.md) - Contains the Sigma detection ruleset defined in YAML.
* [pySigma](https://github.com/SigmaHQ/pySigma/blob/main/README.md) - A Python SDK that translates Sigma rules into other query languages.
* [Sigma CLI](https://github.com/SigmaHQ/sigma-cli/blob/main/README.md) - A command-line tool for converting Sigma rules.
* [Sigma backends](https://sigmahq.io/docs/digging-deeper/backends) - Overview of available backend plugins with links to their repositories.
* [Poetry](https://python-poetry.org/docs/) - Sigma uses Poetry to package and distribute its code bases.

## Overview of converting Sigma rules into Cloud SIEM rule format

For full documentation, see the [pySigma Sumo Logic backend](https://github.com/SumoLogic/pySigma-backend-sumologic).

:::tip
For a general overview of how to convert Sigma rules to a backend, see [Converting Sigma Rules](https://sigmahq.io/docs/guide/getting-started.html#converting-sigma-rules).
:::

Following is a brief overview of how to convert your Sigma rules into Cloud SIEM rule format:
1. [Install the Sumo Logic backend](#install-the-sumo-logic-backend).
1. Create a repository to store your Sigma rules.
1. Create rules in Sigma rule format and place them into your repository. For sample rules, see the [Sigma Rule Repository](https://github.com/SigmaHQ/sigma/blob/master/README.md).<br/> For example, here is a `test-rule.yml` file in Sigma format:
   ```yaml
   title: Suspicious PowerShell Execution
   logsource:
       category: process_creation
       product: windows
   detection:
       selection:
           CommandLine|contains: 'powershell'
       condition: selection
   ```
1. Use Sigma CLI to convert your Sigma rule to Cloud SIEM format.<br/>For example, run the following to convert a single rule:
   ```bash
   sigma convert -t sumologic_cse_rule -p sumologic_cse test-rule.yml
   ```
   To convert a directory of rules:
   ```bash
   sigma convert -t sumologic_cse_rule -p sumologic_cse ./rules/
   ```
1. The conversion generates a JSON file that defines the rule in Cloud SIEM rule format:
   ```json
   {
     "rules": [
       {
         "name": "Suspicious PowerShell Execution",
         "expression": "commandLine matches /.*powershell.*/",
         "entity_selectors": [
           {"entity_type": "_hostname", "expression": "device_hostname"},
           {"entity_type": "_username", "expression": "user_username"},
           {"entity_type": "_process", "expression": "baseImage"}
         ],
         "score_mapping": {"default": 3, "type": "constant"},
         "tags": ["_mitreAttackTactic:TA0002"],
         "enabled": true,
         "is_prototype": true
       }
     ]
   }
   ```
1. Import the JSON rule file into Sumo Logic using the [Cloud SIEM API](/docs/api/cloud-siem-enterprise/) or UI.<br/>To [import the JSON file using the UI](/docs/cse/rules/about-cse-rules/#import-a-rule):
     1. Access the rules list view.<br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Cloud SIEM > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Content > Rules**.
     1. Click the **Import** button.<br/><img src={useBaseUrl('img/cse/rule-import-button.png')} alt="Rule import button" style={{border: '1px solid gray'}} width="600" />
