---
id: pause-resume-source
title: Pause and Resume a Source
description: You can pause a cloud polling source at any time to stop the source from sending data from the source to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can pause some types of sources to stop them from sending data to Sumo Logic, and then resume at a later time.

The following sources can use pause/resume:

* **S3 sources:** Amazon S3, AWS Elastic Load Balancing, Amazon CloudFront, AWS CloudTrail, AWS CloudWatch Metrics, AWS Config, and Amazon S3 Audit
* **Metrics sources**: AWS CloudWatch metrics

To pause a source:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. Locate the source.
1. Click **Pause**. Click the **Resume** link when you are ready for the source to start sending data again.<br/><img src={useBaseUrl('img/collector/pause-resume.png')} alt="Pause resume" style={{border: '1px solid gray'}} width="800" />

## S3 Source rules

* When a source is **paused**, Sumo Logic continues to ingest the files that were already discovered but does not scan for new ones.
* If a source is **paused** for more than 200 days, when resumed it will only collect the last 20 days worth of files.
* When you **resume** a source, Sumo Logic scans all of the files for the period of time that the source was paused. [Throttling](/docs/manage/ingestion-volume/log-ingestion.md) occurs when a source is resumed if the source was paused for a long time or too many files have accumulated. To minimize the risk of throttling, do the following **before resuming the source**:

  * Update the collection start time. For example, if you paused the source five days ago and want to resume data collection beginning now, update the collection start time to the current time.
  * Clean up the S3 bucket to reduce the number of log files.
  * The "Pause" option is not available for S3 sources that were created years ago. To identify if you have an older source, click the "i" icon to the right of the source and look at the "sourceType" line. If you see "AmazonS3," that is a legacy source type.  If you see "Polling," that would be a current source type that supports the "Pause" option and other features as well.

## Metrics Source rules

* The AWS CloudWatch source ingests data points only from the past two hours, so you will lose data if you pause the CloudWatch source for more than two hours. For example, if a CloudWatch source is paused at 6:00 am and resumed at 10:00 am, the data points generated between 6:00 am and 8:00 am are lost.
