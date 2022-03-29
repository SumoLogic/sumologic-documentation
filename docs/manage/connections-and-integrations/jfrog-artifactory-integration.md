---
id: jfrog-artifactory-sumo-logic-integration
---

# JFrog Artifactory Online Sumo Logic Integration

### Integration Overview

If you do not currently have a Sumo Logic account, the JFrog Artifactory
Sumo Logic integration is the most convenient way to start using Sumo
Logic directly from Artifactory. You can also choose to use an existing
Sumo Logic account to integrate with Artifactory Online.

JFrog Artifactory is a universal Artifact Repository Manager that
integrates with CI/CD and DevOps tools to provide artifact tracking. The
JFrog Artifactory Sumo Logic integration offers the ability to access
preconfigured Sumo Logic Dashboards directly from Artifactory Online
that will allow you to analyze data from your Artifactory logs.

**If you do not have an existing Sumo Logic Account:**

Enable the JFrog Artifactory Sumo Logic integration directly from
Artifactory. When you enable the integration, a Sumo Logic Connector and
Source get automatically configured, and the Sumo Logic App for
Artifactory gets installed automatically.

The JFrog Artifactory Sumo Logic integration provides a new Sumo Logic
Free account with a daily data volume limit of 500MB per day, with 30
users and 14 days of data retention.

**If you have an existing Sumo Logic account: **

You can configure Artifactory Online to send data (described below) to
an existing Sumo Logic [HTTP Logs and
Metrics](../../03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source.md)
source.

The integration collects data from the following Artifactory logs:

* **artifactory.log.** The main Artifactory log file that contains data on Artifactory server activity.
* **access.log.** The security log containing important information about accepted and denied requests, configuration changes, and password reset requests. For each event, the originating IP address gets recorded.
* **request.log.** Generic HTTP traffic information similar to the Apache HTTPd request log.
* **traffic.\*.log.** A log containing information about site traffic and file sizes.

For more details about Artifactory logs, refer to
[https://www.jfrog.com/confluence/dis...tory+Log+Files](https://www.jfrog.com/confluence/display/RTF/Artifactory+Log+Files).

For questions or help, contact [Sumo Logic
Support](https://support.sumologic.com/hc/en-us).

### Enable the Integration

1.  Log into JFrog Artifactory.
2.  Click the gear icon, then click **Artifactory.** 

![](../static/img/Connections-and-Integrations/JFrog-Artifactory-Sumo-Logic-Integration/https:/lh5.googleusercontent.com/pgkCu1OgYF5u2lHevhD4jhylvgRdJgFuHaMGS5enFnmQIghnL7-84Ew1MbKUpbuYukN62MuFa8SUtOLYZp4KoL6mgRLXRbf5xgNhjNtGaY6skBthKsLTwEXwRe0jc4t07MxoQWur=s0)

3.  Select **Log Analytics**.

![](../static/img/Connections-and-Integrations/JFrog-Artifactory-Sumo-Logic-Integration/https:/lh4.googleusercontent.com/SIpF_-dCYjdoh1WZL427e0slz1g8G-hESWV-NNgRkHuWOIF9h_an0tRO_0P9Gc1_BZ1qeS9g_wd7aVp92sgd-jf3HQ2MV3vLo0aeQiO0EkJDq1Wc_cgNj3AWm0q54QqgdwY6rUCq=s0)

4.  In the dialog **Enable Sumo Logic Integration**, click **Enable**.

![](../static/img/Connections-and-Integrations/JFrog-Artifactory-Sumo-Logic-Integration/https:/lh4.googleusercontent.com/6bFsnmNrIU-utLmiX3P5q7bT55SMsx594dmca5znCQRrm6x5Fr9jFmol6wN0Y9v2A5Hdx3YkdFQ9DaqT71yqLzeU_hZisI_ZC-nCo2h5J9MJqgeo1-d_XUzBN09rKOxh9gVqUVYI=s0)

**If you do not have an existing Sumo Logic Account and it is your first
time here:**

1.  ****Select Create New Connection.****

2.  ****Click Access Dashboard****

3.  When the Sumo Logic page appears, select **I agree to the Service License Agreement**, and click **Access Dashboard**.

![](../static/img/Connections-and-Integrations/JFrog-Artifactory-Sumo-Logic-Integration/https:/lh3.googleusercontent.com/_0Vn5irXyWHNXjqA_0YC4fHuP35ENovWzw4Mnob93LhwEawPP5q9oD9q4n9-xH4dDAn-jAZ1pK06rZiuzUFzWo1VmZ1JtbTnBMUXJ3XciJLoDfHaq47ej_X9fikyve3W9CUCEjCH=s0)

3.  When you see the message, **Your Dashboards are being populated**, click **OK, Got It**.

4.  Click on Library → Personal → Artifactory 7 to access the Artifactory dashboards.

![](../static/img/Connections-and-Integrations/JFrog-Artifactory-Sumo-Logic-Integration/https:/lh3.googleusercontent.com/nYWRLUPMJMsZBs9TadyFGFt-frGBDzgiUu6KVm1WtbZVi1Bmi50kjh2kqycU2A1w3cEaPrdMm-22Xh5VwtKhxTLRW2Nm5V-FkzE6uSOasOozO5ScHmIq8KX-U9XelAw0WxJu-0-y=s0)

**If you already have an existing connection set up via Artifactory
Online:**

The **Use Existing Client ID and Secret** radio button is selected, and
keys will pre-populate automatically based on your previous
configuration.

![](../static/img/Connections-and-Integrations/JFrog-Artifactory-Sumo-Logic-Integration/https:/lh3.googleusercontent.com/_E9Ls6EhrBhy49iKSr69gNzqbzROZXlGWZ-O-GJ8hRusM-2-iXJelFUdGXP2OK9Zb0Z6YsbJqFDSSkoeplV18tF9z0pLmvbvL7RsGrl6EzwDx9d1yr82ZrirzC4MUyZ3Kgc1erp4=s0)

Click Access Dashboards to view Dashboards as you did before.

**If you already have an existing Sumo Logic Account created outside of
Artifactory Online: **

1.  Select “Connection URL” and copy and paste the URL of an existing Sumo Logic [HTTP Logs and Metrics Source in the Connection URL text box:](../../03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source.md)

[![](../static/img/Connections-and-Integrations/JFrog-Artifactory-Sumo-Logic-Integration/https:/lh5.googleusercontent.com/_jkA3Ba9j17jTvGfJ3i9gmxTS0YtSiIBW3E_TsQorw6XHqScXtLUNIZs9eWpyUx_jmeIpO6JHJK4IdakzejPhpUVI0EMA6oMEVu0zDYDPNGKNDgSehW0drVzR4-qylPsvdXt29yr=s0)](../../03Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source.md)

2.  Login to Sumo Logic and verify that the logs are flowing in as expected

3.  Install the [Sumo Logic App for Artifactory](../../07Sumo-Logic-Apps/08App_Development/Artifactory/Artifactory-App-Dashboards.md) (version 7.x) to get instant insight into your Artifactory logs. 

**For More Details **

For complete details on the Sumo Logic App for Artifactory and its
Dashboards, see the [Artifactory
App](../../07Sumo-Logic-Apps/08App_Development/Artifactory.md).

For more information about JFrog Artifactory, see the Sumo Logic DevOps
blog, [Using Node.js npm with Artifactory via the API and
CLI](https://www.sumologic.com/blog/using-node-js-npm-with-jfrog-artifactory-via-the-api-and-cli/ "https://www.sumologic.com/blog/using-node-js-npm-with-jfrog-artifactory-via-the-api-and-cli/").
