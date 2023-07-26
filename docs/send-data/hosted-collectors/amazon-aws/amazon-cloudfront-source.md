---
id: amazon-cloudfront-source
title: Amazon CloudFront Source
sidebar_label: Amazon CloudFront
description: Add an Amazon CloudFront Source to upload messages to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/cloudfront.png')} alt="icon" width="40"/>

Amazon CloudFront is a content delivery network (CDN) that allows an easy way for companies to distribute content to end-users with low latency and high data transfer speeds. When logging is configured, CloudFront creates log files that contain detailed information about every user request that it receives. Add an Amazon CloudFront Source to upload these messages to Sumo Logic.

To configure an Amazon CloudFront Source:

1. [Grant Sumo Logic access](grant-access-aws-product.md) to an Amazon S3 bucket.
1. Enable [CloudFront logging.](http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html "http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html")
1. Confirm that logs are being delivered to the Amazon S3 bucket.
1. Add the [AWS Source](amazon-cloudfront-source.md) for CloudFront. See below for detailed steps. 
1. **Optional:** Install the Sumo Logic App for Amazon CloudFront.

## AWS Source

See [AWS Source](aws-sources.md) for full details on the AWS source, configuration and more.

## Multiline Processing Boundary Regex Example

If your CloudFront log message is of this format:

```
2017-06-13    22:02:13    SYD1 ..............
```

You could use this Boundary Regex:

```
^\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}.*
```
