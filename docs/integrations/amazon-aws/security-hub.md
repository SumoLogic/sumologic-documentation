---
id: security-hub
title: AWS Security Hub
sidebar_label: AWS Security Hub
description: AWS Security Hub
---

AWS Security Hub is an AWS security service that provides a comprehensive view of your security state within AWS and your compliance with the security industry standards and best practices.

The Sumo Logic App for AWS Security Hub leverages findings data from Security Hub and visually displays security state data in Dashboards. The dashboards provide a high-level view of findings, showing the type, when they occurred, the resources that were affected, their severity, and their distribution, showing the current security and compliance status of an AWS account from all sources.

Sumo Logic provides a seamless bi-directional integration with AWS Security Hub with the following:

* **[AWS Security Hub forwarder](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Security_Hub/1-Ingest-findings-into-AWS-Security_Hub)** - This solution forwards (sends) scheduled search results and alerts (as findings) to AWS Security Hub.
* **[AWS Security Hub collector](https://help.sumologic.com/07Sumo-Logic-Apps/01Amazon_and_AWS/AWS_Security_Hub/2-Collect-Findings-for-the-AWS-Security-Hub-App)** - This solution collects findings from AWS Security Hub to Sumo Logic where they are displayed in visual pre-defined dashboards.

The Sumo Logic integration with AWS Security Hub extends compliance checks to other key regulatory frameworks such as PCI, GDPR, HIPAA, and others.

For more information on AWS Security Hub, refer to the [Amazon AWS Security Hub](https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html) documentation.

Log Types

The AWS Security Hub utilizes the following log types:

* [Amazon findings](https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings.html)

## Send findings to AWS Security Hub
This page shows you how to enable Sumo Logic as a Finding Provider, deploy the AWS Security Hub forwarder, create a Webhook connection, and create a scheduled search.


## Collect Findings for the AWS Security Hub App
This page shows you how to add a hosted collector and AWS S3 Source and deploy an AWS Security Hub collector.


## Install the AWS Security Hub App and view the Dashboards
This page shows you how to install the Sumo App for AWS, and provides descriptions of each of the app dashboards.
