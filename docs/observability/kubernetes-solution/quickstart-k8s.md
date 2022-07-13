---
id: quickstart-k8s
title: Kubernetes Quickstart
sidebar_label: Kubernetes Quickstart
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will walk you through setting up [Sumo Logic's Kubernetes solution](https://www.sumologic.com/solutions/kubernetes/) in minutes. If you don't have a Sumo Logic account, [sign up for a free trial](/get-started/sign-up.md#create-a-trial-account).

At a high level, the Sumo Logic Kubernetes Solution process is: set up data collection, install Sumo Logic Kubernetes app integration, and data enrichment (setting filters, metadata, and alerts for your clusters to produce more useful metrics and logs insights).


## Installation

1. Log in to your Sumo Logic account.

2. Go to **App Catalog**.

3. Select the **Kubernetes** app.

4. Click **Begin Integration**.

5. On the next screen, click **Add Integration**.

6. In the setup wizard, choose either the **Helm** or **YAML** tab, then follow the required steps, which ask you to copy the code snippets, then paste and run them in your command-line interface.

7. At the top of the setup wizard, click **Next**. You'll see a setup progress tracker showing that your data is being imported to your Sumo Logic dashboards.

8. When the progress tracker finishes, click **Explore Dashboards**. This will open your **Explore** tab dashboards.


## Next Steps

Learn more about exploring the dashboards, monitoring, and troubleshooting your applications in your Kubernetes environment. Here are a few options for you to explore.

### Add the Sumo Logic Kubernetes Integration

Once you've completed installation, check out how to [add alerts, view your dashboards](/docs/integrations/containers-orchestration/kubernetes/install-apps-alerts-dashboards#install-the-app), and [navigate the **Explore** tab](/docs/observability/kubernetes-solution/navigate-kubernetes-environment) in Sumo Logic.

If you don't see data in Sumo Logic, you can review our [troubleshooting guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Troubleshoot_Collection.md).


### Kubernetes Partner Apps

Sumo Logic provides an array of Partner Apps designed specifically for Kubernetes. The following CI/CD Partner Apps are initially available.

![K8s_PartnerApps_CI-CD.png](/img/kubernetes/K8s_PartnerApps_CI-CD.png)

Sumo Logic also provides a selection of Security focused Partner Apps with specialized detection and investigation features. The following a few of the Security Partner Apps that are initially available.

![K8s_PartnerApps_Security.png](/img/kubernetes/K8s_PartnerApps_Security.png)

### Data Enrichment

Data Enrichment is the process of adding meaningful information to your data so you have more control and an easier time referencing data in searches. It's simply where you add more context to your data. Data enrichment augments Sumo Logic's centralized data collection capabilities to make the process of searching and finding data quicker and easier.

![K8s_Centralized_Data_Collection2.png](/img/kubernetes/K8s_Centralized_Data_Collection2.png)

### Dashboard (New)

The [Sumo Logic Dashboard (New)](/docs/dashboards-new) platform allows you to analyze metric and log data on the same dashboard, in a streamlined user experience. This is exactly what you need to create custom dashboards to more effectively monitor and manage a Kubernetes environment. 

![K8s_Dashboard_customize.png](/img/kubernetes/K8s_Dashboard_customize.png)

### Get Certified

The Sumo Kubernetes Analyst Certification is a hands-on class that shows you how to expand your knowledge of Kubernetes by solving common use cases.

![K8s_Kubernetes_Analyst_Cert.png](/img/kubernetes/K8s_Kubernetes_Analyst_Cert.png)

## More Information
* [Full List of Configuration Options](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy/helm/sumologic#configuration)
* [Sumo Logic Helm Chart Troubleshooting Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/deploy/docs/Troubleshoot_Collection.md)
