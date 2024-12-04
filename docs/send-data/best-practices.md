---
id: best-practices
title: Best Practices for Data Collection
sidebar_label: Best Practices
description: Best practices for creating a naming convention for good Source Category values and choosing the right installed data collector for your environment.
---


## Good and Bad Source Categories

Setting Source Category values (`_sourceCategory`), especially for a small set of Sources, may seem trivial at first. However, using the [proper naming convention](/docs/send-data/reference-information/metadata-naming-conventions) to create good Source Category values is important for the correct scale and performance of your Sumo Logic deployment in the long term. This topic discusses some best practices around creating good Source Category values.

Source Categories help you:

* Define the scope of searches.
* Index and partition your data.
* Control who sees what data through RBAC.

The recommended `_sourceCategory` naming convention is:

* **component1/component2/component3...**

Begin with the least descriptive, highest-level grouping, and get more descriptive with each component. The full value will describe the subset of data in detail.

For example, assume you have several different Firewall appliances: ASA and FWSM from Cisco, and 7050 from Palo Alto Networks. In addition, you also have a Cisco router, 800 series.

Following the naming convention described previously, you could set the following _sourceCategory values (instead of simply using “FWSM”, “ASA”, etc.):

* Networking/Firewall/Cisco/FWSM  
* Networking/Firewall/Cisco/ASA  
* Networking/Firewall/PAN/7050  
* Networking/Router/Cisco/800

While the components at the beginning of the value do not add any obvious value, they do provide a high-level grouping of this data. This allows us to fulfill the three purposes of Source Categories.

<Iframe url="https://www.youtube.com/embed/vkKeJOBVVjk"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"      allowfullscreen
     />

import Iframe from 'react-iframe';

### Define the Scope of Searches

Using the naming convention described here lets you easily and effectively define the scope of your search.

For example, if you use either _sourceCategory value:

* `_sourceCategory=Networking/Firewall/*` (all firewall data)  
* `_sourceCategory=Networking/*/Cisco/*` (all Cisco data)

With wildcards, you can find the subset of data you need without adding any Boolean logic (OR).

### Index and Partition Your Data

To create a separate Partition for your networking data to improve performance, specify a Partition using the following routing expression:

* `_sourceCategory=Networking*`

Because Partitions cannot be modified after they are created, (they can only be decommissioned and recreated with a new name and/or routing expression), make sure that you will not have to modify them all that often.

### Control Who Sees What Data Through RBAC

Similar to using Indexes, if you want to restrict access to this data set, you can now use high-level values to reduce the amount of management as you add more data.

You can build high-level groupings with a variety of items. For example, you can group by environment details (prod vs. dev), geographical information (east vs. west), by application, by business unit, or any other value that makes sense for your data.

The order in which you use these values is determined by how you search the data.

For example, if most of your use cases do not need data from both prod and dev environments, you could use the following _sourceCategory values:

* Prod/Web/Apache/Access  
* Dev/Web/Apache/Access  
* Prod/DB/MySQL/Error
* Dev/DB/MySQL/Error

You can still search across both prod and dev when needed, but this scheme divides all your data into prod and dev more intuitively.

If, on the other hand, you do need to search this data together frequently, you could use:

* Web/Apache/Access/Prod  
* Web/Apache/Access/Dev  
* DB/MySQL/Error/Prod  
* DB/MySQL/Error/Dev

This simple change completely changes your high-level grouping. Both schemes allow you cover both use cases in a simple way. The important thing is to group your data in a way that feels natural to the way users search for data.  



## Local and Centralized Data Collection

When you are setting up your environment with Installed Collectors, you must decide how to collect the data you want to send to Sumo Logic.

Sumo Logic is a highly flexible and scalable solution, and its Installed Collectors can work for any size organization. However, with so much flexibility at your fingertips, what is the best way to design your environment?

The first thing to consider when setting up your environment with Installed Collectors is how you want to send data to Sumo Logic. We recommend two basic methods: local data collection, and centralized data collection.

In reality, these methods are not absolute. You do not need to choose one over the other, though after review you may see how your organization would easily fit into one method over the other. Most of the time, organizations end up with a mix of local and centralized data collection.

The most important thing is for you to design a deployment that works for your organization, is scalable, and is easy to administer and maintain. You can easily do this with a little planning.

### Local Data Collection

The local data collection method collects all data locally from each individual system and sends it to Sumo Logic.

Using an [Installed Collector](/docs/send-data/installed-collectors/sources) with a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source) is the overall simplest method of collecting data.

For Windows, using an [Installed Collector](/docs/send-data/installed-collectors/sources) and a [Local Windows Event Log Source](/docs/send-data/installed-collectors/sources/local-windows-event-log-source) is the most reliable method of collecting data. Depending on your Windows solution, you may also configure a [Local Windows Performance Monitor Log Source](/docs/send-data/installed-collectors/sources/local-windows-performance-monitor-log-source.md).

**Customers using the local data collection method usually have the following characteristics:**

* Have a large number of target hosts.
* Do not have the resources (computational or personnel) to maintain or build infrastructure for centralized collection.
* Can automate deployments and configuration (if they are large).
* Are comfortable with the target hosts being connected to the internet or have the majority of the target hosts in the cloud.

**The local method provides the following benefits:**

* Gives you direct access to your logs.
* Provides easy troubleshooting.
* Requires no hardware.

**But it does present the following possible drawbacks:**

* Requires outbound internet access, which may present a firewall and security issue.
* Requires software installation and management.
* Uses resources on the target host.
* On Windows, there may be WMI API limitations and delays.

### Centralized Data Collection

The centralized data collection method uses [Installed Collectors](best-practices.md)  with [Remote File Sources](/docs/send-data/installed-collectors/sources/remote-file-source) or [Syslog Sources](/docs/send-data/installed-collectors/sources/syslog-source) to collect all data in a centralized location before sending that data to Sumo Logic. This method is widely used for logs and is familiar to IT systems administrators.

:::important
If you use centralized data collection, be sure to increase collector memory, as the default setting of 128 MB will not suffice. In addition, configure additional disk capacity if you are collecting a large volume of logs.
:::

**Customers using the centralized collection method usually have the following characteristics:**

* Not too many target hosts (dozens not thousands).
* Existing log aggregating/storing infrastructure in place that can be leveraged.
* Limitations or concerns in terms of connectivity to the internet for the target hosts.

**The centralized method provides the following benefits:**

* For File Sources, there are no changes on target hosts.
* For Syslog Sources, centralized log collection is a familiar and tested method.
* Provides no outbound internet access, so fewer security concerns.
* Requires fewer Collectors overall.
* No software installation required on your production machines.

**But it does present the following possible drawbacks:**

* May present problems when you scale the solution.
* Hardware is required.
* More difficult to troubleshoot.
* Network bandwidth requirements may be increased.
* For Syslog, if you don’t load balance, there is the possibility of losing data.
