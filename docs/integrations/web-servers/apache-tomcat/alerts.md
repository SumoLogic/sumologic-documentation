---
id: alerts
title: Apache Tomcat Alerts
sidebar_label: Alerts
hide_table_of_contents: true
---

To help determine if the Apache Tomcat server is available and performing well, the [Sumo Logic monitors](https://help.sumologic.com/Visualizations-and-Alerts/Alerts/Monitors) are provided with out-of-box alerts.

The alerts are built based on metrics datasets and have preset thresholds.


<table>
  <tr>
   <td>Alert Name
   </td>
   <td>Alert Description
   </td>
   <td>Alert Condition
   </td>
   <td>Recover Condition
   </td>
  </tr>
  <tr>
   <td>Apache Tomcat - Access from Highly Malicious Sources
   </td>
   <td>This alert fires when a Tomcat is accessed from highly malicious IP addresses.
   </td>
   <td> &#62; 0
   </td>
   <td>&#60; &#61; 0
   </td>
  </tr>
  <tr>
   <td>Apache Tomcat - High Client (HTTP 4xx) Error Rate
   </td>
   <td>This alert fires when there are too many HTTP requests (>5%) with a response status of 4xx.
   </td>
   <td> &#62; 0
   </td>
   <td>0
   </td>
  </tr>
  <tr>
   <td>Apache Tomcat - High Server (HTTP 5xx) Error Rate
   </td>
   <td>This alert fires when there are too many HTTP requests (>5%) with a response status of 5xx.
   </td>
   <td> &#62; 0
   </td>
   <td>0
   </td>
  </tr>
  <tr>
   <td>Apache Tomcat - High Memory Usage
   </td>
   <td>This alert fires when the memory usage is more than 80 %.
   </td>
   <td> &#62; 80 %
   </td>
   <td>&#60; &#61;80%
   </td>
  </tr>
  <tr>
   <td>Apache Tomcat - Error
   </td>
   <td>This alert fires when error count is greater than 0.
   </td>
   <td> &#62; 0
   </td>
   <td> 0
   </td>
  </tr>
</table>
