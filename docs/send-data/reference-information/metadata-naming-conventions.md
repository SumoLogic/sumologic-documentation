---
id: metadata-naming-conventions
title: Metadata Naming Conventions
description: Prior to installing Collectors, establish a naming convention for your Sumo Logic deployment's Sources, Collectors, and metadata tags.
---


Sumo Logic has [built-in metadata fields](/docs/metrics/introduction/built-in-metadata), such as Source Host and Source Category, that are tagged to your log messages. This metadata is attached to your log messages at collection-time. These tags are very important since they provide valuable keywords and terms you can use to find targeted results in search queries. 

The following are built-in metadata fields:

* **Collector**. The name of the Collector entered at activation time.
* **Source**. The name of the Source entered when the Source is created. The name can be a maximum of 128 characters.
* **Source Category**. This is a completely open tag determined by your entry to the **Category** field when you configure a Source. The tags you enter can help you to search by data type, machine type, function, location, or any category you choose without the need to specify which Collector or Source the messages belong to. This can be a maximum of 1,024 characters.
* **Source Host**. For Remote and Syslog Sources, this is a fixed value determined by the hostname you enter in the **Hostname** field (your actual system values for hosts). For a Local File Source, you can overwrite the host system value with a new value of your choice. This can be a maximum of 128 characters.
* **Source Name**. A fixed value determined by the path you enter in the "File" field when configuring a Source. This metadata tag cannot be changed.

Built-in metadata field values must use alphanumeric characters and may use delimiters such as underscores, hyphens, and periods. Spaces are allowed, but not recommended. If you use spaces, you will be required to use quotation marks in your searches. For details, see [Best Practices](#best-practices). 

:::note
Built-in metadata fields are case-insensitive when searching.
:::

## Source Category

Source Category is a completely open metadata tag. The Source Category metadata is stored in a Sumo Logic field called `_sourceCategory`. This field is created when you enter text into the Source Category field at Source configuration time. If you prefer to set the tags higher up in the logical hierarchy, you can alternatively enter text in the Collector configuration for all Sources belonging to a Collector. For example, if you have three Syslog Sources feeding into one Collector, you might want to set a list of tags at the Collector level rather than tagging each Source separately. Note that the more specific Source-level tags override the more general Collector level tags. 

Log categories can be somewhat complex, as many log files may belong to more than one logical category. For example, you may collect Apache logs for several reasons, including performance monitoring, security, and audit compliance. Some of the major categories include:

* Security (for security related logs)
* Application (for application logs)
* Audit (logs for audit compliance)
* Performance (performance related logs)
* Debug (for application development debugging)
* Health (for system health logs)
* OS (for Operating System level logs)

It may be difficult to foresee all the searches, reports, and use cases you will eventually have for these log files. We recommend you form a Source Category as a hierarchy of metadata tags, in "general-to-specific" order, separated by forward slashes (`/`), like this:

* **IT/Network/Firewall/Cisco/ASA**
* **IT/Network/AP/Aruba**
* **Service/Prod/App/StoreFront**
* **Service/Dev/App/Shipment**
* **Audit/Sorbox**
* **Sandbox/Jimmy/linuxtest**
* **Debug/CustomApplication/Foo**

The implied distinction between, for instance, `OS_Application_Mail` and say, `Application_Mail` would be for cases where you may simply be running the Mail Transfer Agent (MTA) that came with your flavor of Linux by default in order to send system notifications from cron jobs (`OS_Application_Mail`), versus, you are running an MTA as a service to provide email capabilities to your organization or customers (`Application_Mail`).

This allows you to do searches such as:

* `_sourceCategory=OS*`
* `_sourceCategory=*Audit`
* `_sourceCategory=*Application*`

For more information, see [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories). 

## Source Host

Hostname metadata is stored in a Sumo Logic field called `_sourceHost`. For the hostname, Sumo Logic retrieves and uses the host’s actual OS-level hostname. For Local Sources, you can enter a different value in this field if you choose. If you choose to overwrite the system hostname, Sumo Logic recommends that you carefully select a meaningful name that uniquely identifies the host from which data is collected. 

Remote collections present a special circumstance for Source Host metadata since one Remote Source can be configured to collect the same file from multiple hosts. In this case, Sumo Logic will tag each message with just one hostname (the host from which the message originated).

If you choose to overwrite the system names with custom metadata, the recommended best practice is to organize your hostnames in an easy to follow hierarchy such as:

* **Location/Purpose/UID**
* **SF/MySQL/Primary**
* **Boston/FW/Secondary**
* **USEast_Hadoop_37**

You will then be able to use wildcards to refine a search by any one of the chained terms in the Source Host metadata. For example:

* `_sourceHost=*USEast*`
* `_sourceHost=*MySQL*`
* `_sourceHost=*FW*`

When it comes to Source Host metadata, it's usually best to stick to your organization's current conventions. 

## Source Name

The metadata field called Source Name (`_sourceName`) contains the file path entered when you created your Source. If your Source points to more than one file path, then messages from each file path are tagged with the specific path from which they were collected.

## Best Practices

When entering Source metadata, we recommend that you avoid the use of spaces or special characters. Though spaces and special characters are allowed in the metadata fields, if you use spaces:

* You will need to quote the metadata exactly as you entered it at Source configuration time to find results.
* You will not be allowed to use wildcards since wildcards cannot be used with quotes.
