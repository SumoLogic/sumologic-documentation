---
title: AWS Observability 2.5.0
hide_table_of_contents: false
image: /img/sumo-square.png    
---


#### Observability

Update - We’re happy to announce the release of our **AWS Observability Solution v2.5.0**, which includes.

* Enhanced dashboards for [EC2 Host OS Metrics](https://help.sumologic.com/docs/observability/aws/integrations/aws-ec2-metrics), including support for [Amazon EC2 CloudWatch](https://help.sumologic.com/docs/observability/aws/integrations/AWS-EC2-Metrics): now you can monitor your EC2 instances via CloudWatch and Installed Collector simultaneously and see results side-by-side.
* Support for [Amazon SNS](https://help.sumologic.com/docs/observability/aws/integrations/) - we’ve added out-of-the-box dashboards with the most important information about messages, events, and errors illustrating SNS health and reliability.
* Enhanced dashboards for supported Amazon services - the following services were updated and revamped DynamoDB, API Gateway, RDS, EC2 Metrics, ElastiCache, and All Load Balancers.
* New CLI-based onboarding flow: now, you can roll out a comprehensive AWS monitoring with just a single CLI command by providing your AWS and Sumo credentials.
* Streamlining of Root Cause Explorer drill-downs. While you can still find your AWS anomalies in the RCE screen from the new menu and Entities panel, we have removed RCE dedicated “Events of interests” dashboards from the top-level Dashboards dropdown menu.
* Simplified TerraForm onboarding process by importing Field Extraction Rules (FERs).
* Bug fixes.
