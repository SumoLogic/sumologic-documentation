---
id: application-security
title: Application Security
sidebar_label: Application Security
description: Learn about using Cloud Security Analytics for application security. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To use Cloud Security Analytics for application security, you can use [pre-built apps](#pre-built-apps-for-application-security), or create your own queries.

## About application security

Application security monitors a company’s software offerings to ensure they are not vulnerable or infiltrated by malicious code at any point in the continuous integration/continuous deployment (CI/CD) process and production cycle. 

DevSecOps teams are often already incorporating solutions like code scanning, posture management, and workload protection into their processes, but more is needed. Siloed solutions don’t adequately address developers' increasingly complex application security needs. 

An IT team must see its full security posture to give applications the protection they require. These practices start by collecting security and event log data from every infrastructure, application, and network supporting the application. 

### Protecting applications during the CI/CD lifecycle

Cloud Security Analytics offers full-stack visibility throughout the following phases of the CI/CD lifecycle, so you can monitor security, increase reliability, and speed up processes all in one place:
* **Coding**. Manage access to sources of code and building environments.
* **Building and testing**. Ensure code does not introduce vulnerabilities before it is executed.
* **Deploying and running**. Identify outage causes quickly to limit downtime.
* **Monitoring**. Examine employee access and overall application usage for ongoing threat detection.

#### Coding

Code environment and repository access should be monitored from a central location, such as a [data lake](/docs/cloud-security-analytics/data-lakes/), enabling DevSecOps teams to see data from all applications in one place for complete visibility. This enhances a team’s capabilities to glean extra information from logs by adding contextual relationships to data and distinguishing static code.

Build tools and code repositories can become entry points for malicious code. With poisoned pipeline execution (PPE), attackers insert unauthorized code into these environments, which runs as part of the CI/CD lifecycle to infect the larger application. Visualizing who is in
these environments, when and where they are accessing them, and what changes they are making helps identify problematic user behavior. Sumo Logic’s consolidated log data uses additional context to enrich access information, helping identify unauthorized access and code insertion. 

#### Building and testing

Quality assurance (QA) at the creation stage will improve the software development lifecycle by identifying any vulnerabilities before introducing new code. Reviewing output from test logs and building pipelines ensures greater compliance with product expectations over the entire application lifespan.

Third-party risks are also now inherent in code-writing for many app development processes. Studies have found that a majority of open-source code includes vulnerabilities, which then get baked into apps from the creation stage. Tools that allow these vulnerabilities to be detected can mitigate them, but monitoring these tools to know when and where they are detected takes time that many teams simply do not have. That’s why combining data from all the different security tools is vital.

#### Deploying and running

Monitor the entire app script output to identify misconfigurations and determine their causes. Catching minor issues at their source and having complete visibility of the whole tech stack simplifies identifying if a cyber attack is the cause of an outage or if there is a different origin. The faster you make these determinations, the quicker any potential damage can be contained and repaired. This reduces app downtime and complexity needed in rebuilding affected technical assets. 

#### Monitoring

The CI/CD pipeline is a point of vulnerability within a tech stack since it is the center of everyday development operations. Monitoring who has access to this sensitive area and managing the users within this space is vital.

Access to pipeline components should be controllable by multiple factors for optimum security. These include:
* Role-based access allows staff with particular job descriptions to have access only to what they need.
* Task-based access, so team members have access only when working on specific tasks.
* Time-based access, so no one has access longer than they need it.
* Pipeline-based access, so each pipeline only has access to necessary data sources.

Regularly auditing access to all elements within the pipeline enhances app security. 

### Best practices guide to implementing application security

Following are the basic steps involved in implementing an application security process.

#### Step 1: Build threat modeling into every app development

Monitor security tool output throughout the development process with Sumo Logic’s visualizations.

#### Step 2: Apply security to each component within every application 

This granular level of protection allows for greater coverage than implementing broader, less precise measures. Bring detailed security data into Sumo Logic’s platform to get the most benefit from it.

#### Step 3: Automate security installations and configurations

To avoid missing vital coverage due to human error, Sumo Logic promotes DevSecOps best practices with unified log management and analysis.

#### Step 4: Focus on unique value adds and outsource other applications

To let the DevSecOps team devote their time to creating and protecting applications, Sumo Logic’s extensive integrations can monitor many security tools you already use.

#### Step 5: Assume infrastructure is insecure and protect applications accordingly

Cloud, hybrid, and even on-premises servers are also susceptible to threats, so it’s
important to design systems that protect against infrastructure vulnerabilities.

#### Step 6: Monitor consistently

Never assume applications are fully protected. Monitor consistently to uncover problems no matter when they arise.

#### Step 7: Use benchmarks to know where application security stands

Benchmark against industry standards and other internal software protection levels.

## Pre-built apps for application security

* [Software Development Optimization Solution](/docs/observability/sdo/). Solution that includes the [SDO app](/docs/observability/sdo/install-sdo-app-view-dashboards/), which monitors your development pipeline and provides metrics and actionable insights generated automatically from your development tools.
* [App Development](/docs/integrations/app-development/). Apps for platforms and tools that support software development processes, including GitHub, Jenkins, JFrog Artifactory, and Jira, and many others.
