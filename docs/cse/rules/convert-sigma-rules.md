---
id: convert-sigma-rules
title: Convert Sigma Rules
sidebar_label: Convert Sigma Rules
description: Learn how to convert rules from Sigma format into Cloud SIEM. 
---

[Sigma](https://sigmahq.io/) is a generic and open signature format for SIEM systems that allows security teams to write detection rules once in Sigma and convert them to different SIEM query languages. Security engineers can automatically translate their Sigma detection rules into Sumo Logic Cloud SIEM rule syntax through a [Sigma CLI](https://github.com/SigmaHQ/sigma-cli/blob/main/README.md) plugin, eliminating the manual effort of rewriting rules and accelerating the migration of existing Sigma rule libraries to Cloud SIEM. The translated rules detect the same threats and behaviors as the original Sigma rules with high fidelity.

## Access the backend for Sumo Logic Cloud SIEM

<!-- The Sumo Logic backend hasn't been added yet. The link is a placeholder. -->

[*Sigma backends*](https://sigmahq.io/docs/digging-deeper/backends) implement the conversion capability that converts each Sigma rule file into a SIEM compatible query. To access the backend for Sumo Logic Cloud SIEM, go to: <br/>https://sigmahq.io/docs/digging-deeper/backends#sumologic

[*pySigma*](https://github.com/SigmaHQ/pySigma/blob/main/README.md) is a python library that parses and converts Sigma rules into queries. To access the pySigma backend website for Sumo Logic Cloud SIEM, go to: <br/>https://github.com/SumoLogic/pySigma-backend-sumologic

<!-- The Sumo Logic backend hasn't been added yet. The example command is a placeholder. -->

After you [install Sigma CLI](https://sigmahq.io/docs/guide/getting-started.html), run the following to install the Sumo Logic backend into Sigma CLI:

```bash
pip install pysigma-backend-sumologic
```

## Sigma resources

* [Sigma Rule Repository](https://github.com/SigmaHQ/sigma/blob/master/README.md) - Contains the actual Sigma detection ruleset defined in YAML.
* [pySigma](https://github.com/SigmaHQ/pySigma/blob/main/README.md) - A Python SDK provided by Sigma to help translate Sigma rules into any other query language.
* [Sigma CLI](https://github.com/SigmaHQ/sigma-cli/blob/main/README.md) - A commandline tool written in Python for non-developers to interface with pySigma to easily convert the rules to another format.
* [Sigma backends](https://sigmahq.io/docs/digging-deeper/backends) - This page gives an overview and also contains a list of currently available plugins along with a link to their code repo and how to file an issue. Code for backend plugins are hosted in different places by different owners. In some cases the code is hosted in the SigmaHQ GitHub account and in other cases they are hosted directly in the vendor's GitHub account. Some of the backend plugins are even created and hosted by an individual unaffiliated with Sigma or the plugin vendor. Here are some examples:
    * [Crowdstrike](https://github.com/SigmaHQ/pySigma-backend-crowdstrike/blob/main/README.md) - Hosted in the SigmaHQ Github account in a repo called “pySigma-backend-crowdstrike”
    * [CarbonBlack](https://github.com/7RedViolin/pySigma-backend-carbonblack/blob/master/README.md) - Hosted by an individual GitHub account 7RedViolin where they provide backend plugins for SentinelOne and CortexXDR too.
    * [DataDog](https://github.com/DataDog/pysigma-backend-datadog/blob/main/README.md) - They provide their own repo inside of their own GitHub account.
* [Poetry](https://python-poetry.org/docs/) - Sigma uses Poetry to package and distribute code within their code bases. It's an alternative to Python Pip. Check the “pyproject.toml” file in plugin repos for more info.

## Convert Sigma rules into Cloud SIEM rule format

For an general overview of how to convert Sigma rules to a backend, see [Converting Sigma Rules](https://sigmahq.io/docs/guide/getting-started.html#converting-sigma-rules).

<!-- Patch to the backend will change. -->

For specific information about how to convert rules to Cloud SIEM rule format, see the [pySigma Sumo Logic backend](https://github.com/SumoLogic/pySigma-backend-sumologic).

To convert your Sigma rules into Cloud SIEM rule format:
1. Create a test repository to store your rules.
1. Create a test rule in Sigma rule format. (For sample rules, see the [Sigma Rule Repository](https://github.com/SigmaHQ/sigma/blob/master/README.md).)<br/> For example:
   ```bash
   title: Suspicious PowerShell Execution
   logsource:
       category: process_creation
       product: windows
   detection:
       selection:
           CommandLine|contains: 'powershell'
       condition: selection
    ```
1. Convert your test rule. For example, run the following command to convert your test rule for the Cloud SIEM processing pipeline:
     ```bash
      # Convert to Cloud SIEM query
      sigma convert -t sumo_logic_cse -p sumologic_cse test-rule.yml

      # Convert to full Cloud SIEM rule JSON
      sigma convert -t sumo_logic_cse_rule -p sumologic_cse test-rule.yml
      ```




