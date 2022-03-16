---
id: sumo-logic-components
---

# Sumo Logic Components

A Collector is a small application that gathers log data from your servers and sends it to the Sumo Logic Cloud. Using the Sumo Logic Web Application, you can interact with and analyze your data in the cloud in real time.

![Collectors M.png](../static/img/get-started/CollectorsM.png)

## Sumo Logic Collectors and Sources

Sumo Logic [Installed Collectors](../../03Send-Data/Installed-Collectors.md) receive data from one or more [Sources](../../03Send-Data/Sources/01Sources-for-Installed-Collectors.md).

Collectors collect raw log data, compress it, encrypt it, and send it to the Sumo Cloud, in real time. A single Sumo Logic Collector can collect up to 15,000 events per second or more and has fault tolerance during network or service outages. If you'd like to collect non-traditional machine data, a [Script Source] (../../03Send-Data/Sources/01Sources-for-Installed-Collectors/Script-Source.md) or [Script Action] (../../03Send-Data/Sources/01Sources-for-Installed-Collectors/Script-Action.md) provide a great deal of flexibility to collect files.

For system requirement details, see [Installed Collector Requirements](System-Requirements/Installed-Collector-Requirements.md).

Sumo Logic [Hosted Collectors] (../../03Send-Data/Hosted-Collectors.md) are hosted in the Sumo Cloud and receive data from one or more [Sources] (../../03Send-Data/Sources/02Sources-for-Hosted-Collectors.md). You can configure it to collect data from various cloud services like Amazon Web Services, Google Cloud Platform, G Suite, and Microsoft Office 365. It offers [Cloud Syslog Sources] (../../03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source.md) to receive syslog data and [HTTP Sources] (../../03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source.md) to receive logs and metrics.

## Sumo Logic Cloud

The Sumo Logic Cloud is a secure, scalable repository for all of your operations, security, compliance, development, and other log data. The Sumo Logic Cloud stores, indexes, parses, and analyzes data, and provides unlimited horsepower with elastic scalability.

## Sumo Logic Web Application

The Sumo Logic Web Application allows you to view and analyze your log data in the cloud. With a powerful and intuitive search capability, you can use the web application to expedite functions like forensic analysis, troubleshooting, and system health checks. The Sumo Logic Web Application provides access from anywhere since it is fully browser based. It also provides all required administration tools for managing your installation. This includes tools for administration, checking system status, managing your deployment, and direct access to download  and activate Collectors.
