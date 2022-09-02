---
id: ingest-old-historical-data
title: How to Ingest Old or Historical Data
---


The overwhelming majority of log data processed by Sumo are nearly real-time messages. For this reason, Sumo's timestamp detection and data indexing systems are optimized to handle streams of data originating in the recent past.

Ingested old or historical data, especially when mixed with recent or real-time data in one source, may occasionally be misinterpreted.

This article describes the assumptions that Sumo makes about customer data, tips to help you make sure your data is handled correctly, and guidance on when to contact [Sumo Logic Support](https://support.sumologic.com) regarding historical data uploads.

See [using \_format for troubleshooting](../sources/reference-information/time-reference.md) timestamps.

## Assumption: Data is less than 365 days old

Sumo Logic assumes that all log message times fall within a window of -1 year through +2 days compared to the current time. Any log messages with a parsed timestamp outside of that window is automatically re-stamped with the current time.

## Assumption: Data from a source will have similar timestamps

Sumo Logic assumes that all log messages coming from a particular source will have timestamps that are close together. If a message comes through that appears to be more than one day earlier or later than recent messages from that source, it will be auto-corrected to match the current time.

## Best practices for working with historical data

Use the following tips for working with historical data:

1. Avoid mixing old data and new data in the same source. As a best practice, create dedicated sources specifically for historical data.
1. To ingest data with timestamps earlier than one year in the past, you must contact [Sumo Logic Support](https://support.sumologic.com). Historical data will be re-stamped with the current time if no adjustment is made to your account.
1. To avoid quota throttling during initial upload of historical backlogs, break up your data and load it in chunks. Load the data in sequence, earliest to newest.
1. Searching historical data is generally slower than searching more recent data.
