---
id: pause-resume-source
title: Pause and Resume a Source
description: You can pause a cloud polling Source at any time to stop the Source from sending data from the Source to Sumo Logic.
---


You can pause some types of Sources to stop them from sending data to Sumo Logic, and then resume at a later time.

The following Sources can use pause/resume:

* **S3 Sources:** Amazon S3, AWS Elastic Load Balancing, Amazon CloudFront, AWS CloudTrail, AWS CloudWatch Metrics, AWS Config, and Amazon S3 Audit
* **Metrics Sources**: AWS CloudWatch metrics

To pause a Source:

1. Locate the Source on the **Manage Data** > **Collection** > **Collection**
page.
1. Click **Pause**. Click the **Resume** link when you are ready for the source to start sending data again.

![Pause resume](/img/collector/pause-resume.png)

## S3 Source rules

* When a Source is **paused**, Sumo Logic continues to ingest the files that were already discovered but doesn't scan for new ones.
* If a Source is **paused** for more than 200 days, when resumed it will only collect the last 20 days worth of files.
* When you **resume** a Source, Sumo Logic scans all of the files for the period of time that the Source was paused. [Throttling](/docs/manage/ingestion-volume/log-ingestion.md) occurs when a source is resumed if the Source was paused for a long time or too many files have accumulated. To minimize the risk of throttling, do the following **before resuming the Source**:

  * Update the collection start time. For example, if you paused the Source five days ago and want to resume data collection beginning now, update the collection start time to the current time.
  * Clean up the S3 bucket to reduce the number of log files.
  * The "Pause" option is not available for S3 Sources that were created years ago. To identify if you have an older Source, click the "i" icon to the right of the Source and look at the "sourceType" line. If you see "AmazonS3," that is a legacy Source type.  If you see "Polling," that would be a current Source type that supports the "Pause" option and other features as well.

## Metrics Source rules

* The AWS CloudWatch Source ingests data points only from the past two hours, so you will lose data if you pause the CloudWatch Source for more than two hours. For example, if a CloudWatch Source is paused at 6:00 am and resumed at 10:00 am, the data points generated between 6:00 am and 8:00 am are lost.
