---
slug: /send-data/hosted-collectors/cloud-to-cloud-integration-framework
title: Cloud-to-Cloud Integration Framework Sources
---

The Cloud-to-Cloud Integration Framework is a fully-managed collection system that collects logs and events directly from SaaS and Cloud platforms. This data often includes custom events and user data critical for operations monitoring, security, and compliance use cases. As a fully managed collection system, integrations running within the Cloud-to-Cloud Integration Framework provide a secure endpoint to receive event data in your account. Integration authentication, scheduling, and state tracking are all managed by the framework

:::note
Currently, only selected Cloud-to-Cloud Sources are available in the Fed deployment.
:::

## Limitations

* The number of Cloud-to-Cloud Sources is limited to 20 for free accounts, and 50 for all other accounts.
* You are warned when you reach 80% of the limit (16 Sources for free accounts, and 40 Sources for other accounts).
* You are notified when you have reached the Source limit.

## Static IP addresses

The following table provides the static IP addresses used for Cloud-to-Cloud Integration Sources by deployment. These are provided in case you want to explicitly allow the IP addresses on your third-party target SaaS or Cloud platform.

| Deployment | Static IP addresses                                                                |
|------------|------------------------------------------------------------------------------------|
| AU         | 13.210.38.180, 54.253.14.8, 52.63.30.49                                            |
| CA         | 3.96.85.212, 3.97.51.58, 3.96.95.249                                               |
| DE         | 52.28.151.126, 18.193.176.46, 18.192.147.254                                       |
| EU         | 54.74.133.34, 18.200.219.230, 54.216.109.182                                       |
| IN         | 65.0.114.18, 3.7.177.71, 3.6.131.26                                                |
| JP         | 52.69.8.121, 54.248.157.127, 18.182.95.102                                         |
| US1        | 54.209.19.175, 23.22.90.93, 23.22.11.54, 34.228.131.3, 34.237.107.105, 3.88.82.220 |
| US2        | 54.149.79.97, 54.218.43.134, 44.239.32.230, 35.161.2.93                            |

For the Federal environments, a different set of Static IPs is available for each C2C deployment.

| Deployment | Static IP addresses                                                                |
|:------------|:------------------------------------------------------------------------------------|
| Fed C2C 1A | 50.19.6.130                                                                        |
| Fed C2C 1B | 171.129.156.86                                                                     |
| Fed C2C 1C | 52.202.74.197                                                                      |
| Fed C2C 1D | 100.25.65.170                                                                      |
| Fed C2C 1E | 3.226.78.211                                                                       |
| Fed C2C 1F | 23.22.209.147                                                                      |

## Integrations

The topics below are the available integrations. In Sumo Logic these are called Sources. Check out the Sources we have available in beta. You are invited to request new Sources for the Cloud-to-Cloud Integration Framework from our [Ideas Portal](https://ideas.sumologic.com/ideas).

## Versions

Sources in the Cloud-to-Cloud Integration Framework need updates over time to maintain data collection. Updates can vary in severity and may not require any input from you. See [Cloud-to-Cloud Source Versions](cloud-to-cloud-source-versions.md) for details on how to upgrade and how versions are structured.

## Guide contents

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
