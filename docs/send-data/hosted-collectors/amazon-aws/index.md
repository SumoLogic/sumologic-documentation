---
slug: /send-data/hosted-collectors/amazon-aws
title: Amazon and AWS Sources
description: Sumo Logic offers Sources to collect from many AWS products.
---


Amazon Web Services (AWS) is a secure [cloud](https://aws.amazon.com/what-is-cloud-computing/) services platform, offering compute power, database storage, content delivery and other functionality to help businesses scale and grow.

Sumo Logic offers hosted Sources to collect from many AWS products.

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudfront-source"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="40"/><h4>Amazon CloudFront</h4></a>
  <p>The Amazon CloudFront Source helps to distribute content to end-users with low latency and high data transfer speeds.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/amazon-cloudwatch-source-metrics"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="40"/><h4>Amazon CloudWatch Metrics</h4></a>
  <p>The Sumo Logic CloudWatch Source allows you to gather metrics data from an Amazon resource.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/amazon-path-expressions"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="40"/><h4>Amazon Path Expressions</h4></a>
  <p>See examples of path expressions you can use to collect data from Amazon Sources .</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/amazon-s3-audit-source"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>Amazon S3 Audit</h4></a>
  <p>Add the Amazon S3 Audit Source to upload messages to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/aws-cloudtrail-source"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>AWS CloudTrail</h4></a>
  <p>AWS CloudTrail Source records API calls made to AWS.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/aws-cost-explorer-source"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>AWS Cost Explorer</h4></a>
  <p>The AWS Cost Explorer Source collects cost and usage reports from AWS Cost Explorer.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/aws-elastic-load-balancing-source"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="40"/><h4>AWS Elastic Load Balancing</h4></a>
  <p>Add the AWS ELB Source to upload messages to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/aws-metadata-tag-source"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="40"/><h4>AWS Metadata (Tag)</h4></a>
  <p>The AWS Metadata Source allows you to collect tags from EC2 instances running on AWS.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/aws-s3-scan-interval-sources"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="40"/><h4>AWS S3 Scan Interval</h4></a>
  <p>A scan interval defines the waiting time between scans of the objects in your S3 bucket.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>AWS S3</h4></a>
  <p>Add an Amazon S3 Source to upload messages to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox11 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-logs-source"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>AWS Kinesis Firehose Logs</h4></a>
  <p>The AWS Kinesis Firehose for Logs source helps to ingest logs from AWS Kinesis Data Firehose</p>
  </div>
</div>
<div className="box smallbox12 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/aws-kinesis-firehose-metrics-source"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>AWS Kinesis Firehose Metrics</h4></a>
  <p>The AWS Kinesis Firehose for Metrics source helps to ingest CloudWatch metrics from AWS Kinesis Data Firehose</p>
  </div>
</div>
<div className="box smallbox13 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/aws-sources"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>AWS Sources</h4></a>
  <p>These configuration instructions apply to all AWS Source types</p>
  </div>
</div>
<div className="box smallbox14 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/collection-aws-govcloud"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>AWS GovCloud</h4></a>
  <p>AWS GovCloud are specific regions authorised to a FedRAMP-High baseline</p>
  </div>
</div>
<div className="box smallbox15 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/configure-your-aws-source-cloudformation"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>AWS CloudFormation Configuration</h4></a>
  <p>Use CloudFormation to set up AWS products</p>
  </div>
</div>
<div className="box smallbox16 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product"><img src={useBaseUrl('img/send-data/.png')} alt="icon" width="50"/><h4>Grant Access to an AWS Product</h4></a>
  <p>Before configuring an AWS Source give Sumo Logic access to your AWS product</p>
  </div>
</div>
</div>
