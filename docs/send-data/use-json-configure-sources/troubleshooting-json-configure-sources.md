---
id: troubleshooting-json-configure-sources
title: Troubleshooting JSON to Configure Sources
description: Investigate and solve issues configuring sources with JSON.
---



Sources supplied via a JSON file may not be applied to a collector for a few reasons. This document covers common issues with JSON files when trying to configure sources.

Before investigating your JSON file for issues check that you are using your method for managing sources correctly. If you're using `syncSources` for [Local Configuration File Management](/docs/send-data/use-json-configure-sources/local-configuration-file-management) or the Collector API to manage sources review your steps for issues related to using the method. For example, if your collector is not configured to use Local Configuration File Management it will not monitor your JSON file.

:::note
You can [view and copy an existing JSON configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) from the user interface for reference.
:::

## UTF-8 encoded

Verify the encoding of your JSON file is UTF-8 encoded following [RFC 8259](https://tools.ietf.org/html/rfc8259). If your JSON file is a different encoding, such as UTF-16, the collector will be unable to read the contents of the file. 
## Valid JSON

If the JSON is not valid the collector will fail to read the contents of the file. If there are any formatting issues in the JSON file you may see the following log message in the collector logs. Installed collectors store log events in its installation directory under the `/logs` directory. The following error message may be presented in the `/logs/collector.log` file.

```
com.sumologic.scala.collector.auth.UpdateFailedException: * Could not synchronize blade, failed to read the content of the json file
```

 * To help verify the format of your JSON, you can copy and paste the content into a JSON validation tool such as [jsonlint.com](https://jsonlint.com). jsonlint.com will highlight any potential formatting errors such as missing commas, quotes, curly braces, brackets, and so on.
 * We recommend using JSON from of an existing collector to get a valid JSON configuration of sources. See [View or Download Source JSON Configuration](/docs/send-data/use-json-configure-sources/local-configuration-file-management/view-download-source-json-configuration.md) for details.

## Valid Source configuration

Sumo Logic requires certain key/values be present in your JSON file for each source. If the value supplied for a required key (parameter) is not in the proper casing or the proper data type the collector will fail to read and apply the source configuration. A few common problems which may prevent a JSON Source from being applied are:

* **Duplicate source names** Check that your JSON file does not contain a duplicate source "name" as duplicate names are not permitted. The following error message may be presented in the **/logs/collector.log** file.

    ```
    2018-05-16 20:30:25,084 +0000 [WrapperSimpleAppMain] INFO com.sumologic.scala.collector.auth.CollectorRegistrationManager - [main] Response code is 200 with warnings: List(Key: collector.error, Message: Error creating source: Server returned undeclared exception from cocoa-soa/CollectorStore: org.apache.avro.AvroRuntimeException: Unknown datum type com.sumologic.cocoa.api.DuplicateNameException: com.sumologic.cocoa.api.DuplicateNameException: Error creating sources List(ticker, ticker); a source already exists with that name.), errors: List()
    ```

* **Invalid Key names**  If a required key (parameter) is misspelled or not in the proper camel casing the collector will fail to read and apply the source configuration. For example, if you have supplied a key name of "sourcetype" instead of "sourceType". When an invalid key has been supplied you may see the following type of error message presented in the **/logs/collector.log** file. 

    ```
    2018-12-07 14:29:03,881 -0800 [JsonSync Manager] INFO com.sumologic.scala.collector.auth.CollectorRegistrationManager - [main] Response code is 200 with warnings: List(Key: source.type.invalid, Message: Please specify a source type), errors: List()
    ```

    Keys (parameters) can be referenced in [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources).

* **Invalid Values** If the value supplied for a required key (parameter) is misspelled, not in the proper casing, or not the proper data type the collector will fail to read and apply the source configuration. For example, if the value for the "sourceType" key has been supplied as "localfile" instead of "LocalFile." When an invalid value is found for a required key you may see the following type of error message presented in the **/logs/collector.log** file. 

    ```
    2018-12-07 14:32:01,898 -0800 [JsonSync Manager] INFO com.sumologic.scala.collector.auth.CollectorRegistrationManager - [main] Response code is 200 with warnings: List(Key: source.type.invalid, Message: Invalid source type: 'Localfile'), errors: List()
    ```

    Values can be referenced in [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources).    

* **Duplicate port numbers in sources** A collector can have one source that uses a specific port and protocol combination. If you have multiple Syslog or Metric sources that specify the same port and protocol you may see the following type of error message presented in the **/logs/collector.log** file. 

    ```
    2018-12-06 10:52:08,896 -0800 [JsonSync Manager] INFO com.sumologic.scala.collector.auth.CollectorRegistrationManager - [main] Response code is 200 with warnings: List(Key: collector.error, Message: Error creating source: Error validating source.), errors: List()
    ```

* **Defining single vs multiple sources**
 There are two ways to implement local configuration file management:

  * Specify all sources in a single UTF-8 encoded JSON file. 
  * Use multiple UTF-8 encoded JSON files to specify your sources, and put all of those files in a single folder. You can put each source definition in its own file, or define multiple sources per file if you like. [Review that you have properly configured these options](/docs/send-data/use-json-configure-sources/local-configuration-file-management). Multiple sources need to be provided in a JSON array.
