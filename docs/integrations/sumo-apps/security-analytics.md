---
id: security-analytics
title: Sumo Logic Security Analytics App
sidebar_label: Security Analytics
description: Allows you to easily see and manage your system's status, including a security operations overview, network, system and change, user monitoring, and vulnerabilities on endpoints.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/sumo-apps/SecurityAnalytics.png')} alt="Thumbnail icon" width="75"/>

The Sumo Logic App for Security Analytics provides Dashboards that allow you to easily see and manage your system's status, including a security operations overview, network, system and change, user monitoring, and vulnerabilities on endpoints. This data is collected from your Collectors and Sources.​

## Prerequisites

* **For Sumo Logic Enterprise Security and Enterprise Suite accounts only.** For more information, see [Apps for Sumo Logic](/docs/integrations/sumo-apps).


## Security Analytics App Dashboards

This data is collected from your Collectors and Sources for instant analysis of any events.


### Security Operations Overview

<img src={useBaseUrl('img/integrations/sumo-apps/SecurityAnalytics_SecurityOperations_Dashboard.png')} alt="test" />

**Network Incidents.** Displays the number of incidents detected over the last 24 hours in a single value chart. Click the chart to drill down to the **Network Overview Dashboard** for more information.

**Vulnerability.** Provides the incident count by severity High or Critical for the past 24 hours in a single value chart. Click the chart to drill down to the **Vulnerabilities on Endpoints** Dashboard for more information.

**System Incidents.** Shows the number of system incidents over the last 24 hours in a single value chart. Click the chart to drill down to the **System and Change** Dashboard for more information.

**User Activity.** Displays the amount of user activity in kbytes for the past 24 hours in a single value chart. Click the chart to drill down to the **User Monitoring** Dashboard for more information.

**Inbound Network Activity by Location.** Performs a geo lookup search and displays the inbound network activity by location for the last 12 hours on a map of the world.

**Incidents Over Time.** Displays the type and number of incidents in a timeline using timeslices of one hour for the last 12 hours.

**Incidents by Severity.** Shows the number of incidents by their severity designation in a bar chart for the last 12 hours.

**Anomaly Event Distribution.** Provides information on the distribution of Anomaly events in column chart on a timeline for the past 24 hours. Click the chart to drill down into the **Anomaly Detection Summary** Dashboard.


### Network Status

<img src={useBaseUrl('img/integrations/sumo-apps/SecurityAnalytics_Network_Dashboard.png')} alt="test" />

**Incident Count.** Counts the number of incidents detected over the last 24 hours and displays them in a single value chart.

**Incidents for Review.** Displays important incidents from the last 24 hours in a table with columns that list the incident's time, message text, source host IP address, destination host IP address, application, and severity. Scroll to see the entire table contents.

**Outbound Network Activity by Protocol.** Provides information on outbound and inbound network traffic by protocol, displayed in a stacked column chart on a time line in timeslices of four hours for the last 12 hours.

**Top Applications with Most Network Activities.** Shows the top 10 applications with the most network activity displayed in a pie chart.

**Top Active Internal Hosts.** Lists the top 10 active internal hosts and their number of events for the last three hours, displayed in a bar chart.

**Top 10 Applications by Bytes.** Shows the top 10 applications and their network use in bytes over the last 24 hours.

**Anomaly Event Distribution.** Displays the distribution of Anomaly events for the last 12 hours, using a column chart on a timeline using timeslices of 15 minutes.


### System and Change

<img src={useBaseUrl('img/integrations/sumo-apps/SecurityAnalytics_System-and-Change_Dashboard.png')} alt="test" />

**Incident Count.** Displays the number of incidents detected as a change in a single value chart for the last 24 hours.

**Top 10 Incidents.** Shows the top 10 incidents in a table that includes the source host, destination host, severity, log message text, and the number of incidents for the past 24 hours.

**Anomaly Event Distribution.** Displays the distribution of Anomaly events in a column chart using timeslices of 30 minutes on a timeline for the last 24 hours.

**Incident Count by Classification.** Displays the number an type of incidents by classification for the last 24 hours in a pie chart.

**Most Recent Application Update Failures.** Provides information on any recent application update failures for the past 12 hours in a table, including the destination host, the update type, and the latest status.

**Update Summary.** Displays a summary of updates for the last 24 hours in a table including the update text, and its success or failure.

**Configuration and Policy Changes.** Shows any configuration and policy changes for the last 24 hours in a table, including information on the message text, source host, source user, target user, target host, and severity.


### User Monitoring

<img src={useBaseUrl('img/integrations/sumo-apps/SecurityAnalytics_UserMonitoring_Dashboard.png')} alt="test" />


**User Activity.** Displays user activity in kbytes for the last 24 hours in a single value chart.

**Incidents for Review.** Provides information on incidents that have occurred in the last three hours. in a table including time, user, message text and the severity.

**Top Users with Access Activity.** Shows the top users of the system and their activity for the last three hours in a bar chart.

**Top User Activity.** Displays the top 10 users of the system and their activity for the last six hours in a bar chart.

**User Activity by Hour.** Provides information on user activity by user by hour in a stacked column cart on a timeline using timeslices of one hour for the last six hours.

**All Access Attempts to Environment.** Lists all attempts to access the environment in a table for the last three hours, including the user name, destination host, message text, time of the latest attempt, and the time of the earliest attempt.

**Anomaly Event Distribution.** Displays the distribution of Anomaly events in a column chart using timeslices of 30 minutes on a timeline for the last 12 hours.


### Vulnerabilities on Endpoints

<img src={useBaseUrl('img/integrations/sumo-apps/SecurityAnalytics_Vulnerabilities-on-Endpoints_Dashboard.png')} alt="test" />

**Incident Count by Vulnerabilities.** Displays the number of incidents reported as High or Critical for the past 24 hours in a single value chart.

**Incident Count by Virus.** Shows the number of virus incidents reported for the last 24 hours in a single value chart.

**Incident Count by Type.** Provides the number of incidents by type for the last 12 hours in a pie chart.

**Top 10 Vulnerabilities.** Counts the top 10 vulnerabilities by name displayed in a bar chart for the past 24 hours.

**Top 10 Viruses Failed to be Cleaned.** Lists names and number of the top 10 viruses that were unable to be removed from the environment for the last 24 hours, displayed in a bar chart.

**Vulnerability Summary.** Shows the summary of vulnerabilities detected over the last three hours in a table, including information on the destination host, the described vulnerability, and its severity designation.

**Top 10 Incidents.** Details the top 10 incidents in a table for the past 24 hours, including information on the source host, severity, message, action, and the number of incidents.

**Actions Taken on Viruses Found.** Details the number of actions taken to remedy viruses found in the environment for the last 24 hours, displayed in a bar chart.

**Critical Vulnerabilities by Host.** Displays incidents with a severity of critical for the past six hours in a table, including information on the destination host and the number of vulnerabilities.

**Top 10 Threats by Systems Infected.** Lists the names and number of top 10 threats by systems that are infected with viruses in the last three hours, displayed in a bar chart.


### Anomaly Detection Summary

<img src={useBaseUrl('img/integrations/sumo-apps/SecurityAnalytics_AnomalyDetection_Dashboard.png')} alt="test" />

**Anomalous Events.** Counts the number of Anomaly events detected for the last three hours, and displays them in a single value chart.

**Events by Anomaly Report.** Displays the results of Anomaly Reports by report name and the count of events by number for the last 12 hours in a bar chart.

**Event Distribution by Report.** Displays the number of events by report name for the last three hours in a pie chart.

**Incident by Severity.** Shows the number of Anomaly events by severity in timeslices of 5 minutes for the past 12 hours. Displayed in a column chart on a timeline.

**Events by Classification.** Counts the events by type, either classified or known event, or unclassified new event, for the last three hours. Displays the information in a pie chart.

**Events by Count.** Counts the number of events and displays them in a bar chart in timeslices of 24 hours for the past three days.



## Using the Sumo Logic App for Security Analytics

This App is available for Sumo Logic Enterprise accounts only, and requires a paid Professional Services contract to install and configure. You may upgrade your account at any time. If you'd like more information on this App, please request it by clicking the [Request](/docs/integrations/sumo-apps/security-analytics/#using-the-sumo-logic-app-for-security-analytics) button in the Apps section of the Library, or contact your Sumo Logic sales representative at sales@sumologic.com.


The Sumo Logic app for Security Analytics provides Dashboards that allow you to easily see and manage your system's status, including a security operations overview, network, system and change, user monitoring, and vulnerabilities on endpoints. This data is collected from your Collectors and Sources, and Sumo Logic Anomaly Detection is applied to it, for instant analysis of any events.

For complete details, see [Sumo Logic App for Security Analytics](/docs/integrations/sumo-apps/security-analytics).


### Getting Security Incident Details

In the Security Analytics App, on the Network Status Dashboard, the Incident Count or Incidents for Review Panels provide information on all security incidents. You can also drill down from these Panels to the Search page and see more details on those incidents in the Messages tab.  

**To see incident details in the Messages tab:**

1. Click the **Incidents for Review Panel** to open the query in the Search page.
2. Click the **Messages** tab.
3. More details for the incident are included in the Message field.


### Security Use Cases

The following table provides a list of security use cases, incidents covered, and relevant devices and sources.

<table>
  <tr>
   <td><strong>Security Analytics Use Case</strong></td>
   <td><strong>Security Incidents</strong>   </td>
   <td><strong>Relevant Devices and Sources</strong>   </td>
  </tr>
  <tr>
   <td>User Monitoring   </td>
   <td><ul><li>Login Failures followed by success from the same username</li>
<li>High amount of login failures for the same username</li></ul>   </td>
   <td>Windows 2008 servers, Active Directory, Linux, Google Apps, Novell Access Manager, RSA </td>
  </tr>
  <tr>
   <td>User Monitoring </td>
   <td><ul><li>Group Created</li>
<li>Group Deleted</li>
<li>Group Membership changed</li></ul> </td>
   <td>Windows, Active Directory, Google Apps </td>
  </tr>
  <tr>
   <td>User Monitoring   </td>
   <td><ul><li>User Created on Domain or Application</li>
<li>User Created on Local Server</li>
<li>User Deleted</li>
<li>User Modified</li></ul></td>
   <td>Windows, Active Directory, Google Apps, Linux   </td>
  </tr>
  <tr>
   <td>Systems and Changes   </td>
   <td><ul><li>Configuration Changes</li>
<li>OS Update</li></ul></td>
   <td>Windows, Active Directory, Linux</td>
  </tr>
  <tr>
   <td>Network Overview   </td>
   <td><ul><li>Excessive firewall denies/accepts</li>
<li>Single local source scanning multiple destinations on well known database</li>
<li>FTP ports</li>
<li>Email ports</li>
<li>SSH and Web Server ports</li></ul>   </td>
   <td>Checkpoint   </td>
  </tr>
  <tr>
   <td>Vulnerabilities on Endpoints   </td>
   <td><ul><li>Multiple vulnerabilities detected</li>
<li>Same vulnerability detected on multiple hosts</li>
<li>Vulnerability found</li></ul>   </td>
   <td>Qualys   </td>
  </tr>
  <tr>
   <td>Vulnerabilities on Endpoints</td>
   <td><ul><li>Same virus detected on multiple hosts</li>
<li>Virus found</li></ul>   </td>
   <td> Forefront   </td>
  </tr>
</table>



### Incident Messages and Searches

This table maps incident messages to the preconfigured Security Analytics App searches that report on them.

<table>
  <tr>
   <td><strong>Incident Message Value</strong>   </td>
   <td><strong>Incident Search</strong>   </td>
  </tr>
  <tr>
   <td>Brute Force Login   </td>
   <td>SA - Incident - Brute Force Login Attempt</td>
  </tr>
  <tr>
   <td>Excessive firewall denies</td>
   <td>SA - Incident - Excessive Firewall Denies</td>
  </tr>
  <tr>
   <td>High number of malware IDS alerts   </td>
   <td>SA - Incident - High Number of Malware IDS Alerts</td>
  </tr>
  <tr>
   <td>Large number of denied connections   </td>
   <td>SA - Incident - High Volume of Denied Connections   </td>
  </tr>
  <tr>
   <td>Increased failed remote logins</td>
   <td>SA - Incident - Increase in Failed Remote Login Attempts</td>
  </tr>
  <tr>
   <td>Multiple failed logins</td>
   <td>SA - Incident - Multiple Failed Logins by a User in Last 15mins</td>
  </tr>
  <tr>
   <td>Potential DDos attacks</td>
   <td>SA - Incident - Potential DDos Attack</td>
  </tr>
  <tr>
   <td>Potential scan or attack through multiple attack vectors</td>
   <td>SA - Incident - Potential Scan or Attack through Multiple Vectors</td>
  </tr>
  <tr>
   <td>Potential web application scan or attack</td>
   <td>SA - Incident - Potential Web Application Attack</td>
  </tr>
  <tr>
   <td>Potential successful brute force login </td>
   <td>SA - Incident - Successful Login after Multiple Failed Logins </td>
  </tr>
  <tr>
   <td>Suspicious SSL Traffic Hike from ...</td>
   <td>SA - Incident - Suspicious SSL Traffic</td>
  </tr>
</table>
