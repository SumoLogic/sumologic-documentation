---
id: amazon-s3-audit-source
title: Amazon S3 Audit Source
sidebar_label: Amazon S3 Audit
description: Add an Amazon S3 Audit Source to upload messages to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/s3audit.png')} alt="icon" width="40"/>

The Amazon S3 Audit Source, also called Server Access Logging, tracks and collects your Amazon S3 bucket's activity logs. Each access log record provides details about a single access request, such as the requester, bucket name, request time, request action, response status, and error code, if any. Add an Amazon S3 Audit Source to upload these messages to Sumo Logic.

To configure an Amazon S3 Audit Source:

1. [Grant Sumo Logic access](grant-access-aws-product.md) to an Amazon S3 bucket.
1. [Enable logging in AWS](http://docs.aws.amazon.com/AmazonS3/latest/dev/enable-logging-console.html) using the Amazon Console.
1. Confirm that logs are being delivered to the Amazon S3 bucket.
1. Add an [AWS Source](aws-sources.md) for the S3 Audit Source to Sumo Logic. See below for detailed steps.
1. **Optional:** Install the Sumo Logic App for S3 Audit.

See [AWS Sources](aws-sources.md) for full details on setting up and configuring.
