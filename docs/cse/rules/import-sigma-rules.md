---
id: import-sigma-rules
title: Import Sigma Rules
sidebar_label: Import Sigma Rules
description: Learn how to import rules from Sigma into Cloud SIEM. 
---

[Sigma](https://sigmahq.io/) is a generic and open signature format for SIEM systems that allows security teams to write detection rules once and convert them to different SIEM query languages. Security engineers can automatically translate Sigma detection rules into Sumo Logic Cloud SIEM rule syntax through a [Sigma CLI](https://github.com/SigmaHQ/sigma-cli) plugin, eliminating the manual effort of rewriting rules and accelerating the migration of existing Sigma rule libraries to Cloud SIEM. The translated rules detect the same threats and behaviors as the original Sigma rules with high fidelity.

## Access the backend for Sumo Logic Cloud SIEM

[*Sigma backends*](https://sigmahq.io/docs/digging-deeper/backends) implement the conversion capability that converts each Sigma rule file into a SIEM compatible query. To access the backend for Sumo Logic Cloud SIEM, go to: <br/>https://sigmahq.io/docs/digging-deeper/backends#sumologic

[*pySigma*](https://github.com/SigmaHQ/pySigma/blob/main/README.md) is a python library that parses and converts Sigma rules into queries. To access the pySigma backend website for Sumo Logic Cloud SIEM, go to: <br/>https://github.com/SumoLogic/pySigma-backend-sumologic


Run the following to install the Sumo Logic backend into Sigma CLI:

```bash
sigma plugin install sumologic
```

## Sigma resources

* [Sigma Ruleset](https://github.com/SigmaHQ/sigma) - Contains the actual Sigma detection ruleset defined in YAML
* [pySigma](https://github.com/SigmaHQ/pySigma) - A Python SDK provided by Sigma to help translate Sigma rules into any other query language
* [Sigma CLI](https://github.com/SigmaHQ/sigma-cli) - A commandline tool written in Python for non-developers to interface with pySigma to easily convert the rules to another format
* [Sigma backends](https://sigmahq.io/docs/digging-deeper/backends) - This page gives an overview and also contains a list of currently available plugins along with a link to their code repo and how to file an issue. Code for backend plugins are hosted in different places by different owners. In some cases the code is hosted in the SigmaHQ GitHub account and in other cases they are hosted directly in the vendor's GitHub account. Some of the backend plugins are even created and hosted by an individual unaffiliated with Sigma or the plugin vendor. Here are some examples:
    * [Crowdstrike](https://github.com/SigmaHQ/pySigma-backend-crowdstrike) - Hosted in the SigmaHQ Github account in a repo called “pySigma-backend-crowdstrike”
    * [CarbonBlack](https://github.com/7RedViolin/pySigma-backend-carbonblack) - Hosted by an individual GitHub account 7RedViolin where they provide backend plugins for SentinelOne and CortexXDR too.
    * [DataDog](https://github.com/DataDog/pysigma-backend-datadog) - They provide their own repo inside of their own GitHub account.
* [Poetry](https://python-poetry.org/) - Sigma uses Poetry to package and distribute code within their code bases. It's an alternative to Python Pip. Check the “pyproject.toml” file in plugin repos for more info.





