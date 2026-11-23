---
slug: /observability/aws/other-configurations-tools
title: Other Configurations and Tools
description: Learn how to update the  AWS Observability view hierarchy,  updating existing host metric sources to work with AWS Observability, how to use the solution with Control Tower accounts, and how to deploy with the Sumo Logic API allowlist enabled.
---

These topics have information about adding AWS services to the [AWS Observability view](/docs/dashboards/explore-view/#aws-observability) resource hierarchy, updating existing host metric sources to work with the AWS Observability Solution, and how to use the solution with Control Tower accounts.

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section, we'll introduce the following concepts:

<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/other-configurations-tools/integrate-control-tower-accounts')}><img src={useBaseUrl('img/icons/integrations.png')} alt="Integrations icon" width="40"/><h4>Integrate Control Tower Accounts with AWS Observability</h4></a>
  <p>Learn how to update the AWS Observability solution with AWS Control Tower-managed Accounts.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/other-configurations-tools/backfill-aws-account-alias')}><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="Data collection icon" width="40"/><h4>Backfill AWS Account Alias</h4></a>
  <p>Use the backfill script to update the account field on existing AWS Observability collector sources with a human-readable alias.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/other-configurations-tools/static-outbound-ip-api-allowlist')}><img src={useBaseUrl('img/icons/security/security.png')} alt="Security icon" width="40"/><h4>Deploy AWS Observability with the Sumo Logic API Allowlist</h4></a>
  <p>Set up a static outbound IP (NAT gateway with an Elastic IP) so you can install and upgrade AWS Observability while the Sumo Logic API allowlist is enabled.</p>
  </div>
</div>
</div>
