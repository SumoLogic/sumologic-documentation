---
slug: /observability/aws/deploy-use-aws-observability
title: Deploy and Use AWS Observability
description: Learn about Sumo Logic's AWS Observability Solution, how to deploy it, and how to get started with it.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

AWS Observability Solution is a framework to simplify the monitoring and troubleshooting of your AWS cloud infrastructure. You can use the Sumo Logic observability app dashboards to isolate and solve problems faster.

These topics have information about Sumo Logic's AWS Observability Solution, how to deploy it, and how to get started with it.

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

:::sumo Micro Lesson

Watch a micro lesson on deploying the AWS Observability Solution. 

<Iframe url="https://fast.wistia.net/embed/iframe/drmpe9zh5d?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Tutorial: Setting Up AWS Observability Solution V2.4.0 Using CloudFormation Template Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::


In this section, we'll introduce the following concepts:

<div className="box-wrapper">
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/deploy-use-aws-observability/before-you-deploy/')}><img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="40"/><h4>Before You Deploy</h4></a>
  <p>Learn prerequisites and guidelines for deploying the AWS Observability Solution to a single AWS account and region.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/deploy-use-aws-observability/deploy-with-aws-cloudformation/')}><img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="40"/><h4>Deploy with AWS CloudFormation</h4></a>
  <p>Learn about the process of executing the AWS CloudFormation template to set up the AWS Observability Solution for a single AWS region and account combination.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/deploy-use-aws-observability/deploy-with-terraform/')}><img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="40"/><h4>Deploy with Terraform</h4></a>
  <p>Learn how to deploy AWS Observability Solution using Terraform.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/deploy-use-aws-observability/migration-strategy-using-terraform/')}><img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="40"/><h4>Migration Strategy from CloudWatch Source to Kinesis Firehose Source using Terraform</h4></a>
  <p>Learn how to migrate CloudWatch Source to Kinesis Firehose Source using Terraform.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/deploy-use-aws-observability/view-dashboards/')}><img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="40"/><h4>View AWS Observability Solution Dashboards</h4></a>
  <p>Learn how to navigate your AWS Observability infrastructure, as well as provide links to the app dashboards.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/deploy-use-aws-observability/configure-alerts/')}><img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="40"/><h4>Configure AWS Observability Alerts</h4></a>
  <p>Sumo Logic has provided out-of-the-box alerts to help you quickly determine if a particular AWS service is available and performing as expected.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/deploy-use-aws-observability/update-aws-observability-stack/')}><img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="40"/><h4>Update the AWS Observability Stack</h4></a>
  <p>Learn how to update the AWS Observability stack.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/deploy-use-aws-observability/resources/')}><img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="40"/><h4>AWS Observability Resources</h4></a>
  <p>Learn more about AWS Observability resources created and modified at deployment using Terraform and CloudFormation.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/observability/aws/deploy-use-aws-observability/changelog/')}><img src={useBaseUrl('img/icons/observe.png')} alt="icon" width="40"/><h4>AWS Observability Terraform script and CloudFormation Changelog</h4></a>
  <p>This section provides details on the available versions of the AWS Observability CloudFormation template.</p>
  </div>
</div>
</div>