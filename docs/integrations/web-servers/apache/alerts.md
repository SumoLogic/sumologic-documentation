---
id: alerts
title: Apache Alerts
sidebar_label: Alerts
description: This page lists the Alerts for Apache.
---

Sumo Logic provides out of the box alerts available via [Sumo Logic monitors](/docs/alerts/monitors/index.md). These alerts are built based on logs and metrics datasets and have preset thresholds based on industry best practices and recommendations.


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
   <td rowspan="2" >Apache - Critical Error Messages
   </td>
   <td rowspan="2" >This alert fires when we detect critical error messages for a given Apache server.
   </td>
   <td rowspan="2" >&#62; 0
   </td>
   <td rowspan="2" >0
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td rowspan="2" >Apache - Access from Highly Malicious Sources
   </td>
   <td rowspan="2" >This alert fires when an Apache is accessed from highly malicious IP addresses.
   </td>
   <td rowspan="2" >&#62; 0
   </td>
   <td rowspan="2" >0
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td rowspan="2" >Apache - High Client (HTTP 4xx) Error Rate
   </td>
   <td rowspan="2" >This alert fires when there are too many HTTP requests (>5%) with a response status of 4xx.
   </td>
   <td rowspan="2" > &#62; 0
   </td>
   <td rowspan="2" >0
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td rowspan="2" >Apache - High Server (HTTP 5xx) Error Rate
   </td>
   <td rowspan="2" >This alert fires when there are too many HTTP requests (>5%) with a response status of 5xx.
   </td>
   <td rowspan="2" > &#62;0
   </td>
   <td rowspan="2" >0
   </td>
  </tr>
  <tr>
  </tr>
  <tr>
   <td>Apache - High CPU Utilization
   </td>
   <td>This alert fires when the average CPU utilization within a 5 minute interval for an Apache Webserver farm instance is high (&#62;&#61;85%).
   </td>
   <td> &#62;&#61;85 </td>
   <td>&#60;85
   </td>
  </tr>
  <tr>
   <td>Apache - Server Restarted</td>
   <td>This alert fires when we detect low uptime (&#60; &#61; 10 minutes) for a given Apache server within a 5 minute interval.
   </td>
   <td> &#60;&#61;600</td>
   <td> &#62;600</td>
  </tr>
</table>
