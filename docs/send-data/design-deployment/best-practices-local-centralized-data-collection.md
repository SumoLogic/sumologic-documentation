---
id: best-practices-local-centralized-data-collection
---

# Best Practices: Local and Centralized Data Collection

Sumo Logic is a highly flexible and scalable solution, and its Installed Collectors can work for any size organization. However, with so much flexibility at your fingertips, what is the best way to design your environment?

The first thing to consider when setting up your environment with Installed Collectors is how you want to send data to Sumo Logic. We recommend two basic methods: local data collection, and centralized data collection.

In reality, these methods are not absolute. You do not need to choose one over the other, though after review you may see how your organization would easily fit into one method over the other. Most of the time, organizations end up with a mix of local and centralized data collection.

The most important thing is for you to design a deployment that works for your organization, is scalable, and is easy to administer and maintain. You can easily do this with a little planning.

## Local Data Collection

The local data collection method collects all data locally from each individual system and sends it to Sumo Logic.

Using an [Installed Collector](/docs/send-data/sources/sources-installed-collectors) with a [Local File Source](../sources/sources-installed-collectors/local-file-source.md) is the overall simplest method of collecting data.

For Windows, using an [Installed Collector](/docs/send-data/sources/sources-installed-collectors) and a [Local Windows Event Log Source](../sources/sources-installed-collectors/local-windows-event-log-source.md) is the most reliable method of collecting data. Depending on your Windows solution, you may also configure a [Local Windows Performance Monitor Log Source](../sources/sources-installed-collectors/local-windows-performance-monitor-log-source.md).

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

## Centralized Data Collection

The centralized data collection method uses [Installed Collectors](best-practices-local-centralized-data-collection.md)  with [Remote File Sources](/docs/send-data/sources/sources-installed-collectors/remote-file-source) or [Syslog Sources](../sources/sources-installed-collectors/syslog-source.md) to collect all data in a centralized location before sending that data to Sumo Logic. This method is widely used for logs and is familiar to IT systems administrators.

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
