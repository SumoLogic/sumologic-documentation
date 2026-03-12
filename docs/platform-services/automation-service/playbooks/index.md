---
slug: /platform-services/automation-service/playbooks
title: Playbooks
sidebar_label: Playbooks
description: Learn about playbooks. A playbook is a predefined set of actions and conditional statements that run in an automated workflow to respond to a certain event or incident type.   
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ActionsLimit from '../../../reuse/actions-limit.md';

Playbooks can be configured to execute automatically without user intervention, acting on information from the incident, or can be executed in interactive mode, where user input is required to authorize predefined actions.

To run a playbook, add it to an automation. You can run playbooks in [monitors](/docs/alerts/monitors/use-playbooks-with-monitors/), [Cloud SIEM](/docs/cse/automation/automations-in-cloud-siem/), and [Cloud SOAR](/docs/cloud-soar/automation/#run-playbooks-in-cloud-soar). Sumo Logic provides a number of out-of-the-box playbooks that you can use install to use your automations. See [Playbooks in App Central](/docs/platform-services/automation-service/playbooks-in-app-central/).

:::note
<ActionsLimit/>
:::

import TerraformLink from '../../../reuse/terraform-link.md';

:::tip
You can use Terraform to manage playbooks with the [`sumologic_csoar_playbook`](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/csoar_playbook) resource.

<TerraformLink/>
:::

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/platform-services/automation-service/playbooks/create-playbooks/')}><img src={useBaseUrl('img/icons/security/siem-challenges.png')} alt="icon" width="40"/><h4>Create Playbooks</h4></a>
  <p>Learn how to create playbooks in the Automation Service to run automated actions.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/platform-services/automation-service/playbooks/playbook-payloads/')}><img src={useBaseUrl('img/icons/security/siem-challenges.png')} alt="icon" width="40"/><h4>Playbook Payloads</h4></a>
  <p> Learn about the data payloads of the different playbook types.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/platform-services/automation-service/playbooks/arrays-in-playbooks/')}><img src={useBaseUrl('img/icons/security/siem-challenges.png')} alt="icon" width="40"/><h4>Arrays in Playbooks</h4></a>
  <p>Learn how to handle arrays in Automation Service playbooks </p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/platform-services/automation-service/playbooks/troubleshoot-playbooks/')}><img src={useBaseUrl('img/icons/security/siem-challenges.png')} alt="icon" width="40"/><h4>Troubleshoot Playbooks</h4></a>
  <p>Learn how to test playbooks and troubleshoot playbook problems.</p>
  </div>
</div>
</div>