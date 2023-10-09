---
slug: /send-data/collect-from-other-data-sources
title: Collect from Other Data Sources
description: You can also collect logs from Heroku and deploy a Sumo Logic Collector on AWS OpsWorks.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic can collect logs and metrics from a variety of other data sources.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/amazon-cloudwatch-logs"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Amazon CloudWatch Logs</h4></a>
  <p>Collect logs using a Collector Script, Lambda function, Amazon Kinesis, and CloudFormation.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/amazon-msk-prometheus-metrics-collection"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Amazon MSK Prometheus</h4></a>
  <p>Learn how to configure metrics collection for Amazon MSK.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/autosubscribe-arn-destination"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Amazon Resource Names (ARNs)</h4></a>
  <p>Collect log events from CloudWatch Logs in real-time.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/aws-fargate-log-collection"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>AWS ECS Fargate</h4></a>
  <p>Collect application container logs from AWS ECS clusters launched with AWS Fargate.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/collect-logs-aws-fargate"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>AWS Fargate</h4></a>
  <p>Learn how to collect logs from AWS Fargate.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/create-amazon-lambda-function"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>AWS Lambda - Create Function</h4></a>
  <p>Learn how to collect AWS Lambda logs using CloudWatch Logs.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/collect-aws-lambda-logs-extension"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>AWS Lambda Extension</h4></a>
  <p>Learn how to collect AWS Lambda logs, metrics, and spans.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/performance-impact-failover-handling"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>AWS Lambda Performance</h4></a>
  <p>Learn how AWS Lambda Extensions impact the performance and execution time of AWS Lambda functions.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/deploy-collectors-aws-opsworks"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>AWS OpsWorks</h4></a>
  <p>Learn how to easily create and manage stacks and applications.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/azure-blob-storage"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Azure Blob Storage</h4></a>
  <p>Learn about event-based pipeline to ship monitoring data from Azure Blob Storage to an HTTP source.</p>
  </div>
</div>
<div className="box smallbox11 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/azure-monitoring"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Azure Monitoring</h4></a>
  <p>Learn how to collect logs and metrics for Azure services.</p>
  </div>
</div>
<div className="box smallbox12 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/docker-collection-methods"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Docker</h4></a>
  <p>Learn about methods for collecting logs and metrics from Docker.</p>
  </div>
</div>
<div className="box smallbox13 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/integrate-halo-event-logs"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Halo Event Log Integration</h4></a>
  <p>Learn how to pull security event logs from Halo into Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox14 card">
  <div className="container">
  <a href="/docs/send-data/collect-from-other-data-sources/collect-logs-heroku"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Heroku</h4></a>
  <p>Upload data from the Heroku app by pointing a Heroku log drain to the URL for an HTTP Source.</p>
  </div>
</div>
    <div className="box smallbox15 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/kubernetes"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Kubernetes</h4></a>
      <p>Learn how to collect Kubernetes logs, metrics, and events.</p>
      </div>
    </div>
      <div className="box smallbox16 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/collect-logs-oracle-cloud-infrastructure"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Oracle Cloud Infrastructure</h4></a>
      <p>Export OCI Service logs, Audit logs, Application logs and Security logs.</p>
      </div>
    </div>
    <div className="box smallbox17 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/collect-logs-palo-alto-networks-cortex"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Palo Alto Networks Cortex Data Lake</h4></a>
      <p>Learn how to collect Logs from the Palo Alto Networks Cortex Data Lake.</p>
      </div>
    </div>
    <div className="box smallbox18 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/collect-prometheus-metrics"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Prometheus</h4></a>
      <p>Learn how to collect Prometheus Metrics in or outside Kubernetes using Telegraf.</p>
      </div>
    </div>
    <div className="box smallbox19 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/import-raw-data-splunk"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Splunk</h4></a>
      <p>Learn how to import raw data from Splunk.</p>
      </div>
    </div>
    <div className="box smallbox20 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/collect-statsd-metrics"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>StatsD</h4></a>
      <p>Learn how to perform a StatsD implementation.</p>
      </div>
    </div>
    <div className="box smallbox21 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/collect-ruby-on-rails-logs"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Ruby on Rails</h4></a>
      <p>Learn how to collect complex application logs generated by Ruby on Rails.</p>
      </div>
    </div>
    <div className="box smallbox22 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/collect-logs-sentinelone"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>SentinelOne</h4></a>
      <p>Learn how to ingest SentinelOne logs into Sumo Logic.</p>
      </div>
    </div>
    <div className="box smallbox23 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Telegraf</h4></a>
      <p>Learn how to use Telegraf to obtain metrics from an application.</p>
      </div>
    </div>
    <div className="box smallbox24 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/sumo-logic-open-source-projects"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>Sumo Logic Open Source Projects</h4></a>
      <p>Learn about open-source solutions and resources for customers via GitHub.</p>
      </div>
    </div>
    <div className="box smallbox25 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/vmware-airwatch-integration"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>VMware AirWatch</h4></a>
      <p>Provides visibility for monitoring enterprise mobility management in your deployment.</p>
      </div>
    </div>
    <div className="box smallbox26 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/collect-metrics-vrealize-operations-manager"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>VMware vRealize Operations Manager</h4></a>
      <p>Learn how to identify and solve emerging issues with predictive analysis and smart alerts.</p>
      </div>
    </div>
    <div className="box smallbox27 card">
      <div className="container">
      <a href="/docs/send-data/collect-from-other-data-sources/vmware-vrealize-log-insight"><img src={useBaseUrl('img/icons/operations/collect.png')} alt="icon" width="40"/><h4>VMware vRealize Log Insight</h4></a>
      <p>Configure log collection for VMware vRealize Log Insight.</p>
      </div>
    </div>
</div>
