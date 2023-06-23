---
id: aws-s3-scan-interval-sources
title: Amazon S3 Scan Interval for Sources
sidebar_label: Amazon S3 Scan Interval
description: A scan interval defines the waiting time between scans of the objects in your S3 bucket.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/s3audit.png')} alt="icon" width="40"/>

When configuring an [Amazon S3 Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source), you'll set the scan interval, which defines the waiting time between scans of the objects in your S3 bucket. It's important to set an interval that is long enough to allow new files to be uploaded, but is not too short that scans are performed without any new files being available to upload.

A scan interval that's too long can cause a delay in new files being uploaded in a timely manner. A scan interval that's too short could cause additional charges to your AWS account. When Sumo Logic scans the contents of a bucket for new files, it will perform a number of listings, which may increase with the number of objects in the bucket. Sumo Logic can't determine if the data in your S3 bucket has changed without listing each object in every scan interval.  

In addition, be aware that uploading data to Sumo Logic can incur data transfer charges from AWS. You can view current pricing for list and data transferring [here](http://aws.amazon.com/s3#pricing). To get an idea of what your charges could be, we recommend using the [Simple Monthly Calculator](http://calculator.s3.amazonaws.com/calc5.html).

## Scan backoff

If **no new files are found** in a scan or we get an **access denied response** from AWS when we try to list objects, the scan interval is automatically doubled, up to a maximum of 1 hour. For example, if your scan interval is set to the default of 5 minutes, after a scan is completed with no new files or access denial, the scan interval goes to 10 minutes. Likewise, if no new files are found or we still get an access denied response after 10 minutes, the scan interval increases to 20 minutes. This continues up until the interval is set to 1 hour, which means that uploading a new file could be delayed up to 1 hour.

The scanning interval resets once a file is found or the Source's **AWS Access** configuration is updated.
