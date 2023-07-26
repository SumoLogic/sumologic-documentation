---
id: amazon-path-expressions
title: Amazon Path Expressions
sidebar_label: Path Expressions
description: See examples of path expressions you can use to collect data from Amazon Sources.
---

## Rules

* **The S3 bucket name is not part of the path**, so don’t include the bucket name when you are setting the Path Expression. They are separate entities.
* **Amazon path expressions DO NOT use a leading forward slash.** To collect all logs at a hierarchical level, use some portion of the source path and asterisk as a wildcard. You can use more than one wildcard in the path expression.

For example, the path expression below would result in no file objects being found, due to the leading forward slash.

` /name/* `

To match all file objects  in the bucket, use a path expression like this:  

`*`

In another example, AWS CloudTrail logging generates a new folder every day that looks like this:

`CloudTrail/2014/12/05/20141205.json.gz`

To gather all logs under the CloudTrail level, use the file path **CloudTrail/\***, which will collect files such as:

`CloudTrail/2014/12/05/20141205.json.gz`

`CloudTrail/2013/11/04/20131104.json.gz`

`CloudTrail/2012/10/03/20121003.json.gz`

Another example would be to collect only the objects found in the 2014 path matching **.json.gz**. To do so, use the file path

`CloudTrail/2014/*.json.gz`.

## Updating Path Expressions

You can update a Path Expression at any time. However, if you change a Path Expression, only new logs will be collected; any logs that existed before the change will not be re-ingested.
