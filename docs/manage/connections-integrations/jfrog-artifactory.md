---
id: jfrog-artifactory
title: JFrog Artifactory Online Sumo Logic Integration
sidebar_label: JFrog Artifactory
description: The JFrog Artifactory Sumo Logic integration provides the ability to access preconfigured Sumo Logic Dashboards directly from Artifactory that will allow you to analyze data from your Artifactory logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/app-development/jfrog-Artifactory.png')} alt="Thumbnail icon" width="100"/>

JFrog Artifactory is a universal Artifact Repository Manager that integrates with CI/CD and DevOps tools to provide artifact tracking. The JFrog Artifactory Sumo Logic integration offers the ability to access reconfigured Sumo Logic Dashboards directly from Artifactory Online that will allow you to analyze data from your Artifactory logs.

:::important
If you do not currently have a Sumo Logic account, the JFrog Artifactory Sumo Logic integration is the most convenient way to start using Sumo Logic directly from Artifactory. You can also choose to use an existing Sumo Logic account to integrate with Artifactory Online.
:::

**If you do not have an existing Sumo Logic Account**, enable the JFrog Artifactory Sumo Logic integration directly from Artifactory. When you enable the integration, a Sumo Logic Connector and Source get automatically configured, and the Sumo Logic App for Artifactory gets installed automatically. The JFrog Artifactory Sumo Logic integration provides a new Sumo Logic Free account with a daily data volume limit of 500MB per day, with 30 users and 14 days of data retention.

**If you have an existing Sumo Logic account**, you can configure Artifactory Online to send data (described below) to an existing Sumo Logic [HTTP Logs and Metrics](/docs/send-data/hosted-collectors/http-source/logs-metrics) source.

## Artifactory logs

The integration collects data from the following Artifactory logs:

* **artifactory.log.** The main Artifactory log file that contains data on Artifactory server activity.
* **access.log.** The security log containing important information about accepted and denied requests, configuration changes, and password reset requests. For each event, the originating IP address gets recorded.
* **request.log.** Generic HTTP traffic information similar to the Apache HTTPd request log.
* **traffic.*.log.** A log containing information about site traffic and file sizes.

For more details about Artifactory logs, refer to [JFrog's Artifactory Log Files](https://www.jfrog.com/confluence/display/RTF/Artifactory+Log+Files).

For questions or help, contact [Sumo Logic Support](https://support.sumologic.com/hc/en-us).

## Enable the Integration

1. Log into JFrog Artifactory.
1. Click the gear icon, then click **Artifactory.** <br/>  ![jfrog 1](/img/connection-and-integration/jfrog1.png)
1. Select **Log Analytics**.<br/>  ![jfrog 2](/img/connection-and-integration/jfrog2.png)<br/>  ![jfrog 2](/img/connection-and-integration/jfrog2.png)
1. In the dialog **Enable Sumo Logic Integration**, click **Enable**.<br/>![jfrog 3](/img/connection-and-integration/jfrog3.png)

## Do not have existing Sumo Logic account

If you do not have an existing Sumo Logic Account and it is your first time here:

1. Select **Create New Connection**.
1. Click **Access Dashboard**.
1. When the Sumo Logic page appears, select **I agree to the Service License Agreement**, and click **Access Dashboard**.<br/>  ![jfrog 4](/img/connection-and-integration/jfrog4.png)
1. When you see the message, **Your Dashboards are being populated**, click **OK, Got It**.
1. Click on **Library** > **Personal** > **Artifactory 7** to access the Artifactory dashboards.<br/>![jfrog 5](/img/connection-and-integration/jfrog5.png)

## Have an existing connection

If you already have an existing connection set up via Artifactory Online:

1. The **Use Existing Client ID and Secret** radio button is selected, and keys will pre-populate automatically based on your previous configuration.
1. Click Access Dashboards to view Dashboards as you did before.<br/>![jfrog 6](/img/connection-and-integration/jfrog6.png)

## Have existing Sumo Logic account

If you already have an existing Sumo Logic Account created outside of Artifactory Online:

1. Select “Connection URL” and copy and paste the URL of an existing Sumo Logic [HTTP Logs and Metrics Source in the Connection URL text box](/docs/send-data/hosted-collectors/http-source/logs-metrics). <br/>![jfrog 7](/img/connection-and-integration/jfrog7.png)
1. Log in to Sumo Logic and verify that the logs are flowing in as expected.
1. Install the [Sumo Logic App for Artifactory](/docs/integrations/app-development/jfrog-artifactory.md) (version 7.x) to get instant insight into your Artifactory logs. 

## More Information

For complete details on the Sumo Logic App for Artifactory and its Dashboards, see the [Artifactory App](/docs/integrations/app-development/jfrog-artifactory.md).

:::note
For more information about JFrog Artifactory, [Using Node.js npm with Artifactory via the API and CLI (Sumo Logic DevOps blog)](https://www.sumologic.com/blog/using-node-js-npm-with-jfrog-artifactory-via-the-api-and-cli/).
:::
