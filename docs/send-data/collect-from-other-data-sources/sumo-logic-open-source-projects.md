---
id: sumo-logic-open-source-projects
title: Sumo Logic Open Source Projects
description: Sumo Logic provides open-source solutions and resources for customers through GitHub.
---

Sumo Logic provides open-source solutions and resources for customers via GitHub.

Submit issues or questions about Sumo Logic open-source solutions through GitHub. These solutions are not supported by Sumo Logic Support.

## Sumo Logic Developers on GitHub

Sumo Logic Developers on GitHub is a central location that lists all of the open-source repositories that Sumo Logic is aware of. Repos are divided into two categories:

1. [Official Sumo Logic Repositories](https://github.com/SumoLogic)
1. [Sumo Experts](http://sumologic.github.io/sumo-experts.html)

For complete details, visit http://sumologic.github.io.

## Sumo Logic GitHub

Browse the official [Sumo Logic GitHub repository](https://github.com/SumoLogic) for CLI clients, Collectors, log appenders, and other tools that will enable you to send your data to Sumo Logic.

The following open-source solutions are collected in Sumo Logic’s GitHub repository at https://github.com/SumoLogic. For complete documentation of each solution, see the readme file.

## Collectors

| Solution | Description |
|:-- |:--|
| [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) | Sumo Logic Distribution for OpenTelemetry Collector is a Sumo Logic-supported distribution of the OpenTelemetry Collector. It is a single agent to send logs, metrics and traces to Sumo Logic. |
| [Kubernetes Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection) | Sumo Logic Helm Chart lets you collect Kubernetes logs, metrics, traces and events; enrich them with deployment, pod, and service level metadata; and send them to Sumo Logic. |

## Logging Integration Libraries

| Solution | Description |
|:-- |:--|
| [AWS Lambda](https://github.com/SumoLogic/sumologic-aws-lambda)  | Sumo Logic Lambda Functions are designed to collect and process data from a variety of sources and pass it onto the Sumo Logic platform. Here, the data can be stored, aggregated, searched, and visualized for a variety of insightful use cases. For complete details, see Collect CloudWatch Logs Using a Lambda Function.
| [Azure](https://github.com/SumoLogic/sumologic-azure-function) |  This library provides a collection of Azure functions to collect and send data to Sumo Logic. |
| [Docker](https://github.com/SumoLogic/sumologic-collector-docker) | This repository offers several variants of Docker images to run the Sumo Logic Collector. When images are run, the Collector automatically registers with the Sumo Logic service and create sources based on a sumo-sources.json file. The Collector is configured ephemeral. |
| [FluentD](https://github.com/SumoLogic/fluentd-output-sumologic) | This plugin sends logs or metrics to Sumo Logic via an HTTP endpoint.  |
| [JavaScript Logging SDK](https://github.com/SumoLogic/js-sumo-logger) | The JavaScript Logging SDK library enables you to send custom log messages to an HTTP Source without installing a Collector on your server. |
| [Jenkins](https://github.com/SumoLogic/sumologic-jenkins-plugin) | A Sumo Logic Jenkins plugin. |
| [Kinesis](https://github.com/SumoLogic/sumologic-kinesis-connector) | The Kinesis-Sumologic Connector is a Java connector that acts as a pipeline between an Amazon Kinesis stream and a  Sumo Logic Collector. Data is fetched from the Kinesis Stream, transformed into a POJO, and then sent to the Sumologic Collection as JSON. For complete details, see Sumo Logic App for Amazon VPC Flow Logs using Kinesis. |
| [Logback appender](https://github.com/SumoLogic/sumologic-logback-appender) | This solution is a Logback appender that sends straight to Sumo Logic. |
| [Logstash](https://github.com/SumoLogic/logstash-output-sumologic) | This solution is a Logstash Sumo Logic output plugin.  |
| [Log4J appender](https://github.com/SumoLogic/sumo-log4j-appender) | This solution is a Log4J appender that sends straight to Sumo Logic. |
| [Log4j2 appender](https://github.com/SumoLogic/sumologic-log4j2-appender) | This solution is a Log4J 2 appender that sends straight to Sumo Logic. |
| [Maven](https://github.com/SumoLogic/sumo-maven-stats-plugin) | This solution is a Maven plugin to report build statistics to Sumo Logic. |
| [NET appenders](https://github.com/SumoLogic/sumologic-net-appenders) | Several appenders for .NET developers to use that send logs straight to Sumo Logic. |
| [okta-events](https://github.com/SumoLogic/okta-events) | This solution is a Python script to collect event logs from Okta. |
| [Scala](https://github.com/SumoLogic/scalalogging) | This solution provides a Scala logging library wrapping SLF4J and Log4j 2 in a convenient and performant fashion. |

## Metrics Integration Libraries

| Solution | Description |
|:-- |:--|
| [CollectD](https://github.com/SumoLogic/sumologic-collectd-plugin) | This plugin sends metrics to Sumo Logic via an HTTP endpoint.  |
| [Prometheus](https://github.com/SumoLogic/sumologic-prometheus-scraper) | The Prometheus Scraper provides a configurable mechanism to send Prometheus formatted metrics to Sumo Logic.  |
| [StatsD](/docs/send-data/collect-from-other-data-sources/Collect-StatsD-Metrics) | See [Collect StatsD Metrics](collect-statsd-metrics.md) for information. |

## Tracing Integration Libraries

| Solution | Description |
|:-- |:--|
| [Autotel](https://github.com/SumoLogic-Labs/autotel) | This project adds the OpenTelemetry instrumentation for Go applications by automatically modifying their source code in similar way as compiler. It can instrument any golang project. It depends only on standard libraries and is platform agnostic. |

## Tools

| Solution | Description |
|:-- |:--|
| [dmail](https://github.com/SumoLogic/dmail) | A simple way to capture a screenshot of a Sumo Logic Dashboard, which is then embedded into an email. |
| [livetail-cli](https://github.com/SumoLogic/livetail-cli)                              | The Live Tail Command Line Interface (CLI) is a standalone application that allows you to start and use a Live Tail session from the command line, similar to tail -f The output is directed to stdout - so you can pipe the output to commands (grep, awk, etc.). For complete details, see Live Tail CLI. |
| [sumo-report-generator](https://github.com/SumoLogic/sumo-report-generator)   | This tool allows a user to execute multiple searches, and compile the data in a single report. Currently, the only format is Excel. Each tab in Excel would correspond to a search executed in Sumo Logic. NOTE: You must have access to the Sumo Search API in order to use this tool.                     |
| [sumobot](https://github.com/SumoLogic/sumobot) | This solution is a Sumo Logic Slack bot. |
| [Terraform](https://github.com/SumoLogic/terraform-provider-sumologic "https://github.com/SumoLogic/terraform-provider-sumologic") | Terraform provider for Sumo Logic. |
| [Tailing Sidecar](https://github.com/SumoLogic/tailing-sidecar) | Tailing Sidecar is a streaming sidecar container, the cluster-level logging agent for Kubernetes. |

## API Clients and Management Scripts

| Solution | Description |
|:-- |:--|
| [collector-management-client](https://github.com/SumoLogic/collector-management-client)| This solution is a Python script for quickly managing a subset of Installed Collectors. |
| [sumo-collector-puppet-module](https://github.com/SumoLogic/sumo-collector-puppet-module)| This solution is a Puppet module for installing the Sumo Logic Collector. This downloads the Collector from the Internet, so Internet access is required on your machines.|
| [sumo-java-client](https://github.com/SumoLogic/sumo-java-client)| This library provides a Java client to execute searches on the data collected by Sumo Logic. |
| [sumo-powershell-sdk](https://github.com/SumoLogic/sumo-powershell-sdk)| This is a community-supported Windows PowerShell Module to work with the Sumo Logic REST API. It is free and open source, subject to the terms of the Apache 2.0 license. |
| [sumologic-collector-chef-cookbook](https://github.com/SumoLogic/sumologic-collector-chef-cookbook) | This solution is a Chef Cookbook for installing and configuring the Sumo Logic Collector. The Cookbook installs the Collector or updates an existing one if it was set to use [Local Configuration File Management](/docs/send-data/use-json-configure-sources/local-configuration-file-management). |
| [sumologic-python-sdk](https://github.com/SumoLogic/sumologic-python-sdk)| This solution is a Community-supported Python interface to the Sumo Logic REST API.|
| [Sumotoolbox](https://github.com/voltaire321/sumologictoolbox)| This is a GUI utility for accessing the various Sumo Logic APIs (currently the search, content, and collector APIs.) The idea is to make it easier to perform common API tasks such as copying sources and generating CSV files from searches.|

 
