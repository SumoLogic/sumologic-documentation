---
id: alerts
title: Oracle Alerts
sidebar_label: Alerts
description: Sumo Logic has provided out-of-the-box alerts available through Sumo Logic monitors to help you quickly determine if the Oracle databases are available and performing as expected.
hide_table_of_contents: true
---

Sumo Logic has provided out-of-the-box alerts available through Sumo Logic monitors to help you quickly determine if the Oracle databases are available and performing as expected. These alerts are built based on logs and metrics datasets and have preset thresholds based on industry best practices and recommendations.

Sumo Logic provides the following out-of-the-box alerts:

| Alert Type (Metrics/Logs) | Alert Name                                  | Alert Description                                                                                                            | Trigger Type (Critical / Warning) | Alert Condition | Recover Condition |
|:---------------------------|:---------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------|:-----------------|:-------------------|
| Logs                      | Oracle - Admin Restricted Command Execution | This alert fires when the Listener is unable to resolve a command.                                                           | Warning                           | > 0             | <= 0              |
| Logs                      | Oracle - Archival Log Creation              | This alert fires when there is an archive log creation error.                                                                | Warning                           | > 0             | <= 0              |
| Logs                      | Oracle - Block Corruption                   | This alert fires when we detect corrupted data blocks.                                                                       | Warning                           | > 0             | <= 0              |
| Logs                      | Oracle - Database Crash                     | This alert fires when the database crashes.                                                                                  | Critical                          | >0              | <= 0              |
| Logs                      | Oracle - Deadlock                           | This alert fires when deadlocks are detected.                                                                                | Warning                           | >5              | <= 0              |
| Logs                      | Oracle - Fatal NI Connect Error             | This alert fires when we detect a "Fatal NI connect error".                                                                  | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - Internal Errors                    | This alert fires when internal errors are detected.                                                                          | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - Login Fail                         | This alert fires when we detect that a user cannot login.                                                                    | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - Possible Inappropriate Activity    | This alert fires when we detect possible inappropriate activity.                                                             | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - TNS Error                          | This alert fires when we detect TNS operations errors.                                                                       | Critical                          | >0              | <= 0              |
| Logs                      | Oracle - Unable To Extend Tablespace        | This alert fires when we detect that we are unable to extend tablespaces.                                                    | Warning                           | >0              | <= 0              |
| Logs                      | Oracle - Unauthorized Command Execution     | This alert fires when we detect that a user is not authorized to execute a requested listener command in an Oracle instance. | Warning                           | >0              | <= 0              |
| Metrics                   | Oracle - Database Down                      | This alert fires when we detect that the Oracle database is down.                                                            | Critical                          | >0              | <= 0              |
| Metrics                   | Oracle - High CPU Usage                     | This alert fires when CPU usage on a node in an Oracle cluster is high.                                                      | Critical                          | >=80            | < 80              |
| Metrics                   | Oracle - Process Limit Critical             | This alert fires when process CPU utilization is over 90%                                                                    | Critical                          | >=90            | < 90              |
| Metrics                   | Oracle - Process Limit Warning              | This alert fires when processes CPU utilization is over 80%                                                                  | Warning                           | >=80            | < 80              |
| Metrics                   | Oracle - Session Critical                   | This alert fires when session usage is over 97%                                                                              | Critical                          | >=97            | < 97              |
| Metrics                   | Oracle - Session Warning                    | This alert fires when session usage is over 90%                                                                              | Warning                           | >=90            | < 90              |
| Metrics                   | Oracle - Tablespaces Out of Space           | This alert fires when tablespace disk usage is over 90%                                                                      | Critical                          | >=90            | < 90              |
| Metrics | Oracle - Tablespaces Space Low | This alert fires when tablespace disk usage is over 80% | Warning | >=80 | < 80 |
| Metrics | Oracle - User Limit Critical | This alert fires when concurrent user sessions usage is over 90% | Critical | >=90 | < 90 |
| Metrics | Oracle - User Limit Warning | This alert fires when concurrent user sessions usage is over 80% | Warning | >=80 | < 80 |
