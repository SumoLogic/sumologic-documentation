---
id: source-log-encoding
title: Source Log Encoding
description: The type of log encoding supported by Sumo Logic depends on the Source you are using.
---


The type of log encoding supported by Sumo Logic depends on the source you are using.

## Local file sources

Local file sources support the following encoding:

* US-ASCII
* UTF-8 (default)
* UTF-16
* UTF-16BE
* UTF-16LE
* UTF-32
* UTF-32BE
* UTF-32LE

For more information, see [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).

## Remote file sources

Remote file sources support the following encoding:

* US-ASCII
* UTF-8

For more information, see [Remote File Source](/docs/send-data/installed-collectors/sources/remote-file-source).

## HTTP sources

HTTP sources support the following encoding:

* UTF-8

You can upload UTF-8 log files compressed using the following methods:

* gzip
* deflate

Compressed files are decompressed before they are ingested, so they are ingested at the decompressed file size rate.

For more information, see [HTTP Source](/docs/send-data/hosted-collectors/http-source/logs-metrics).

## AWS S3 sources

AWS S3 sources support the following encoding:

* UTF-8

For more information, see [AWS S3 Source](/docs/send-data/hosted-collectors/amazon-aws/aws-s3-source).
