---
id: amazon-s3-audit-source
---

# Amazon S3 Audit Source

The Amazon S3 Audit Source, also called Server Access Logging, tracks and collects your Amazon S3 bucket's activity logs. Each access log record provides details about a single access request, such as the requester, bucket name, request time, request action, response status, and error code, if any. Add an Amazon S3 Audit Source to upload these messages to Sumo Logic.

To configure an Amazon S3 Audit Source:

1. [Grant Sumo Logic access](Grant-Access-to-an-AWS-Product.md "https://sumologic-prod.mindtouch.us/Send_Data/Sources/Sources_for_Hosted_Collectors/About_AWS_Sources/Grant_Access_to_an_AWS_S3_bucket") to an Amazon S3 bucket.
1. [Enable logging in AWS](http://docs.aws.amazon.com/AmazonS3/latest/dev/enable-logging-console.html) using the Amazon Console.
1. Confirm that logs are being delivered to the Amazon S3 bucket.
1. Add an [AWS Source](AWS_Sources.md "https://sumologic-prod.mindtouch.us/Send_Data/Sources/Sources_for_Hosted_Collectors/About_AWS_Sources/Add_an_AWS_Source") for the S3 Audit Source to Sumo Logic. See below for detailed steps.
1. **Optional:** Install the Sumo Logic App for S3 Audit.

## AWS Source

See [AWS Sources](aws-sources.md) for full details on setting up and configuring.
