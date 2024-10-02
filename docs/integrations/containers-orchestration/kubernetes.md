---
id: kubernetes
title: Kubernetes
sidebar_label: Kubernetes
description: The Sumo Logic Kubernetes app provides visibility into the worker nodes that comprise a cluster, as well as application logs of the worker nodes.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/kubernetes.png')} alt="k8s logo" width="50"/>  

The Sumo Logic Kubernetes app provides visibility into the worker nodes that comprise a cluster, as well as application logs of the worker nodes. The app is a single-pane-of-glass through which you can monitor and troubleshoot container health, replication, load balancing, pod state and hardware resource allocation. It utilizes [Falco](https://falco.org/docs/) events to monitor and detect anomalous container, application, host, and network activity.

In conjunction with the Kubernetes app, the AKS Control Plane, GKE Control Plane, EKS Control Plane, or Kubernetes Control Plane apps provide visibility into the control plane, including the APIserver, scheduler, and controller manager.

[Kubernetes](https://kubernetes.io/) is a system that automates the deployment, management, scaling, networking, and availability of container-based applications. Kubernetes container-orchestration allows you to easily deploy and manage multi-container applications at scale.

:::tip
For an end-to-end solution for deploying, managing, monitoring, and administering your Kubernetes environment, see the [Kubernetes Solution pages](/docs/observability/kubernetes).
:::

## Supported versions

The Sumo Logic Kubernetes app is compatible with the latest version of [Sumo Logic Kubernetes Collection Helm Chart](https://github.com/SumoLogic/sumologic-kubernetes-collection). A list of supported platforms can be found [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/docs#support-matrix).

## Log and Metric Types

The Sumo Logic app for Kubernetes uses logs and metrics.

### Log Sources

* Application Logs

### Metrics Sources

* [Node-exporter Metrics](https://prometheus.io/docs/guides/node-exporter/) - System-level statistics about bare-metal nodes or virtual machine and generates metrics.
* [Kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) - Metrics about the state of Kubernetes logical objects, including node status, node capacity (CPU and memory), number of desired/available/unavailable/updated replicas per deployment, pod status (e.g., waiting, running, ready), and containers.

For more information, see [this page](https://github.com/SumoLogic/sumologic-kubernetes-collection). Metrics are collected using [Prometheus](https://prometheus.io/) with [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) used for metadata enrichment.

### Sample log messages

```json title="Application Logs"
{"timestamp":1561534865020,"log":"E0626 07:41:05.020255       1
manager.go:101] Error in scraping containers from kubelet:192.168.190.54:10255:
failed to get all container stats from Kubelet URL \"http://192.168.190.54:10255/stats/container/\":
Post http://192.168.190.54:10255/stats/container/: dial tcp 192.168.190.54:10255:
getsockopt: connection refused"}
```

### Sample queries

```sql title="Message Breakdown by Container from the Dashboard Container Logs"
 cluster = * and namespace = * and pod = * and container = *
| json field=_raw "log" as message
| fields - message | count container | top 10 container by _count
```

## Collecting Metrics and Logs for the Kubernetes app

This section contains instructions for collecting logs and metrics for the Sumo App for Kubernetes.

:::note Prerequisites  
Set the following fields in the Sumo Logic UI prior to configuring collection. This ensures that your logs are tagged with relevant metadata, which is required by the app dashboards.
* `cluster`
* `container`
* `deployment`
* `host`
* `namespace`
* `node`
* `pod`
* `service`
:::

For information on setting up fields, see the [Fields](/docs/manage/fields) help page.

Reference the [Deployment Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/README.md#documentation) in our sumologic-kubernetes-collection GitHub repository for detailed instructions on how to collect Kubernetes logs, metrics, and events; enrich them with deployment, pod, and service level metadata; and send them to Sumo Logic.

The Deployment Guide has information on advanced configurations, best practices, performance, troubleshooting, and upgrading for our latest and previous versions of supported software.


## Installing the Kubernetes app

### Method A: Installing app via command line using helm chart

Now that you have set up the collection for Kubernetes app, install the Sumo Logic App for Kubernetes to use the pre-configured Kubernetes dashboards that provide visibility into your Kubernetes environment.

To install the app, do the following:

1. Locate and install the app from the **App Catalog**.
2. Search for **Kubernetes** and select the app.
3. Optionally, on this page, you can also see a preview of the dashboards included with the app.
4. Click **Add Integration**.
5. On the next configuration page, titled **Install App**, follow the instructions (Add Repo, Monitor & Alert Installation, Install Helm chart). When you're done, click **Next**.
   :::note 
   Helm chart installation via command line is required in order to install the Kubernetes app and see the dashboards in the next step. 
   :::
6. (Optional) On the next configuration step, titled **Preview & Done**, click the blue **Explore Dashboards** button or **Open Dashboards in Library** to check out your Kubernetes dashboards. Here, you'll also be given the options to add another cluster, configure Kubernetes monitors, or manage your collectors.

### Method B: Importing a JSON file

If you want to just update the dashboards, you can [download](https://sumologic-appdev-aws-sam-apps.s3.amazonaws.com/kubernetes_application_plane_helm_chartv4.json) and import the json in your personal folder, see [Import and Export Content in the library](/docs/get-started/library/#import-and-export-content-in-the-library). This json is compatible with [helm chart v4.x](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main?tab=readme-ov-file#supported-versions).

## Installing Kubernetes Monitors

Sumo Logic has provided out-of-the-box alerts available through [Sumo Logic monitors](/docs/alerts/monitors) to help you quickly determine if the Kubernetes cluster is available and performing as expected. These alerts are built based on metrics datasets and have preset thresholds based on industry best practices and recommendations.
* To install these alerts, you need to have the Manage Monitors role capability.
* Alerts can be installed by either importing them a JSON or a Terraform script.

For details on the individual alerts, see [Kubernetes Alerts](/docs/observability/kubernetes/alerts).

### Method A: Importing a JSON file

1. Download the [JSON file](https://raw.githubusercontent.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/main/monitor_packages/kubernetes/kubernetes.json) describing all the monitors.   
2. The alerts should be restricted to specific clusters and/or namespaces to prevent the monitors hitting the cardinality limits. To limit the alerts, update the JSON file by replacing the text `$$kubernetes_data_source` with `<Your Custom Filter>`. For example: `cluster=k8s-prod.01`.
3. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Monitors**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Alerts > Monitors**. You can also click the **Go To...** menu at the top of the screen and select **Monitors**. 
4. Click **Add**.
5. Click **Import** to import monitors from the JSON above.

:::note
The monitors are disabled by default. Once you have installed the alerts using this method, navigate to the Kubernetes folder under  Monitors  to configure them. See this document to enable monitors, to configure each monitor, to send notifications to teams or connections please see the instructions detailed in Step 4 of [this document](/docs/alerts/monitors/create-monitor).
:::

### Method B: Using a Terraform script

1. Generate a Sumo Logic access key and ID for a user that has the **Manage Monitors** role capability in Sumo Logic using [these instructions](/docs/manage/security/access-keys). There, you'll need to identify which deployment your Sumo Logic account is in ([learn more](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security)).
1. [Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later.
1. Download the Sumo Logic Terraform package for Kubernetes alerts. The alerts package is available in the [Sumo Logic GitHub repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/kubernetes). You can either download it through the `git clone` command or as a zip file.
1. **Alert Configuration**. After the package has been extracted, navigate to the package directory `terraform-sumologic-sumo-logic-monitor/monitor_packages/kubernetes/`.
   1. Edit the kubernetes.auto.tfvars file and add the Sumo Logic Access Key, Access Id and Deployment from Step 1.
    ```bash
    access_id   = "<SUMOLOGIC ACCESS ID>"
    access_key  = "<SUMOLOGIC ACCESS KEY>"
    environment = "<SUMOLOGIC DEPLOYMENT>"
    ```
   1. The alerts should be restricted to specific clusters and/or namespaces to prevent the monitors hitting the cardinality limits. To limit the alerts, update the variable `kubernetes_data_source` with your `<Your Custom Filter>`. For example: `cluster=k8s.prod.01`.
   1. All monitors are disabled by default on installation. If you would like to enable all the monitors, set the parameter `monitors_disabled` to `false` in this file.
  1. By default, the monitors are configured in a monitor folder called **Kubernetes**, if you would like to change the name of the folder, update the monitor folder name in this file.
1. If you would like the alerts to send email or connection notifications, modify the file **kubernetes_notifications.auto.tfvars** and populate `connection_notifications_critical`, `connection_notifications_warnings`, `connection_notifications_missingdata` and `email_notifications_critical`, `email_notifications_warnings`, `email_notifications_missingdata` as per the below examples.
   ```sql title="Pagerduty Connection Example"
   connection_notifications_critical = [
       {
         connection_type       = "PagerDuty",
         connection_id         = "<CONNECTION_ID>",
         payload_override      = "{\"service_key\":  \"your_pagerduty_api_integration_key\",\"event_type\": \"trigger\",\"description\": \"Alert: Triggered {{TriggerType}} for Monitor {{Name}}\",\"client\": \"Sumo Logic\",\"client_url\": \"{{QueryUrl}}\"}",
        run_for_trigger_types = ["Critical", "ResolvedCritical"]
       },
       {
         connection_type       = "Webhook",
         connection_id         = "<CONNECTION_ID>",
         payload_override      = "",
         run_for_trigger_types = ["Critical", "ResolvedCritical"]
       }
     ]
   ```
   Replace `<CONNECTION_ID>` with the connection id of the webhook connection. The webhook connection id can be retrieved by calling the [Monitors API](/docs/api/monitors-management). For information on overriding payload for different connection types, refer to [this document](/docs/alerts/webhook-connections/set-up-webhook-connections).
   ```sql title="Email Notifications Example"
   email_notifications_critiical = [
       {
         connection_type       = "Email",
         recipients            = ["abc@example.com"],
         subject               = "Monitor Alert: {{TriggerType}} on {{Name}}",
         time_zone             = "PST",
         message_body          = "Triggered {{TriggerType}} Alert on {{Name}}: {{QueryURL}}",
           run_for_trigger_types = ["Critical", "ResolvedCritical"]
       }
     ]
   ```
1. **Install the Alerts**:
   1. Navigate to the package directory `terraform-sumologic-sumo-logic-monitor/monitor_packages/kubernetes/` and run `terraform init`. This will initialize Terraform and will download the required components.
   1. Run `terraform plan` to view the monitors which will be created/modified by Terraform.
   1. Run `terraform apply`.
1. **Post Installation**. If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other people or services. See Step 4 of [this document](/docs/alerts/monitors/create-monitor).

:::note
There are limits to how many alerts can be enabled - see the [Alerts FAQ](/docs/alerts).
:::

## Upgrade/Downgrade the Kubernetes app

The current version of our app is not backwards compatible with older Helm Chart versions. Follow the below steps to upgrade.

1. Switch to [Admin Mode](/docs/manage/content-sharing/admin-mode/#switch-to-admin-mode). If you are not a Content Administrator, you may have to contact Administrator within your organization to grant the [Manage Content](/docs/manage/users-roles/roles/role-capabilities/#data-management) role to your user.
1. Go to the folder **Library/Admin Recommended/Sumo Logic Integrations/Kubernetes**, click on the three button, choose **Edit**, and rename the folder to your liking (for example, **Kubernetes-backup-Nov-2023**). The renaming may take up to 5 minutes to go into effect.
1. If you're in **Content Administrator** mode, switch back to **Me** mode.
1. Go back to the **App Catalog** and reinstall the Kubernetes app again by following the [Installing the Kubernetes app](/docs/integrations/containers-orchestration/kubernetes/#installing-the-kubernetes-app) instructions. If the tab was already open, you may have to refresh the page.


## Viewing Kubernetes Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards/filter-template-variables.md).
:::

### Cluster Explorer

The **Kubernetes - Cluster Explorer** dashboard provides a high-level view of the health of the cluster services, along with details on the utilized resources by service.

Use this dashboard to:
* Navigate the cluster topology
* Review the memory and CPU usage by cluster and service components.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Cluster_Explorer.png')} alt="K8s dashboards" />


### Cluster  

The **Kubernetes - Cluster** dashboard provides detailed status of the cluster health, along with details on all the components, resources and related entities.

Use this dashboard to:  
* Monitor overall cluster health.
* Get insight into the state and resource usage of cluster components and use this information to fine-tune your Kubernetes cluster.  
* Get quick insights into the state of the related entities.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Cluster.png')} alt="K8s dashboards" />


### Cluster Overview

The **Kubernetes - Cluster Overview** dashboard provides a high-level view of the cluster health. Use this dashboard to:  
* Get quick insights into the health of the cluster.
* View top resource intensive components and use this information to fine tune your cluster.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Cluster_Overview.png')} alt="K8s dashboards" />


### Node

The **Kubernetes - Node** dashboard provides detailed information on the health and performance of nodes in a Kubernetes cluster.

Use this dashboard to:
* Monitor node health.
* Get insight  into how resources are being used across nodes and fine-tune node configurations accordingly.
* Investigate potential issues with nodes.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Node.png')} alt="K8s dashboards" />

### Node Overview   

The **Kubernetes - Node Overview** dashboard provides a high-level view of a node, along with details on all the related components and resources.

Use this dashboard to:  
* Get quick insights into the health of the node.  
* View top resource intensive components and use this information to fine tune your node.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Node_Overview.png')} alt="K8s dashboards" />


### Namespace

The **Kubernetes - Namespace** dashboard provides insights into the health and resource utilization of a namespace.

Use this dashboard to:  
* Monitor namespace health.  
* Get insight into the components of a namespace and how resources are being used across namespaces and fine-tune configurations accordingly.  
* Investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Namespace.png')} alt="K8s dashboards" />


### Pod

The **Kubernetes - Pod** dashboard provides insights into the health of and resource utilization of a Kubernetes pod.

Use this dashboard to:  
* Monitor pod health.  
* Get insight into the components of a pod and how resources are being used across namespaces and fine-tune configurations accordingly.  
* Investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Pod.png')} alt="K8s dashboards" />


### Container

The **Kubernetes - Container** dashboard provides insights into the health and resource utilization of a Kubernetes container.

Use this dashboard to:  
* Monitor container health.  
* Get insight into container resource utilization and fine-tune configurations accordingly.  
* Determine if containers are stuck in CrashLoopBackOff, Terminated or Waiting states and make necessary adjustments.  
* Investigate containers that are over-utilizing resources.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Container.png')} alt="K8s dashboards" />


### Daemonsets Overview

The **Kubernetes - Daemonsets Overview** dashboard provides insights into the health of and resource utilization of Kubernetes Daemonsets.

Use this dashboard to:  
* Monitor the health of Daemonsets.   
* Identify whether the required replica level is achieved or not.  
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Daemonsets_Overview.png')} alt="K8s dashboards" />


### StatefulSets Overview  

The **Kubernetes - StatefulSets Overview** dashboard provides insights into the health of and resource utilization of Kubernetes StatefulSets.

Use this dashboard to:  
* Monitor the health of StatefulSets.   
* Identify whether the required replica level is achieved or not.
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_StatefulSets_Overview.png')} alt="K8s dashboards" />


### Deployment Overview

The **Kubernetes - Deployment Overview** dashboard provides insights into the health and performance of your Kubernetes deployments.

Use this dashboard to:  
* Monitor the health of deployments in your Kubernetes environment.   
* Identify whether the required replica level has been achieved or not.  
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Deployment_Overview.png')} alt="K8s dashboards" />


### Collection Health Check

The **Kubernetes - Collection Health Check** dashboard displays the collection status from all the components in the Kubernetes cluster.

Use this dashboard to:  
* Monitor the health of OpenTelemetry based collection in your Kubernetes environment.
  :::note
  Currently, in default configurations, [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) is used instead of FluentD and Fluent Bit.
  :::
* Gain insights into Prometheus metric collection endpoint status.
* Get insight into resource utilization and fine-tune configurations accordingly.
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/k8s-health.png')} alt="K8s dashboards" />


### Deployment  

The **Kubernetes - Deployment** dashboard provides insights into the health and performance of your Kubernetes deployments.

Use this dashboard to:  

* Monitor the health of deployments in your Kubernetes environment.   
* Identify whether the required replica level has been achieved or not.  
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Deployment.png')} alt="K8s dashboards" />


### Security Overview

:::note
This dashboard relies on Falco. If the Dashboard is not populated, enable Falco by setting the flag `falco:enabled` as `"true"` in values.yaml, as described [here](/docs/send-data/kubernetes/install-helm-chart).
:::

This dashboard provides high level details around anomalous container, application, host, and network activity detected by Falco.

Use this dashboard to:  
* Identify and investigate anomalous activity.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Security_Overview.png')} alt="K8s dashboards" />


### Security Rules Triggered

:::note
This dashboard relies on Falco. If the Dashboard is not populated, enable Falco by setting the flag `falco.enabled` as `"true"` in values.yaml. For details, please see the Sumo Logic Kubernetes Collection Helm Chart [documentation](https://github.com/SumoLogic/sumologic-kubernetes-collection#documentation).
:::

The **Kubernetes - Security Rules Triggered** dashboard provides detailed information around anomalous activity detected by Falco. It also shows information around the OOB Falco rules triggered by anomalous activity in your Kubernetes environments.

Use this dashboard to:
* Reviewed detailed information of anomalous activity.
* Review if the OB Falco security events are triggered and identify the root cause.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Sec_Rules_Triggered.png')} alt="K8s dashboards" />


### Service

The **Kubernetes - Service** dashboard provides a high-level view of the health of the cluster services, along with details on utilized resources by service.

Use this dashboard to:  
* Reviewed detailed information of services.
* Identify components by Services.  
* Determine any errors and warnings by Services.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Service.png')} alt="K8s dashboards" />


### Hygiene Check

The **Kubernetes - Hygiene Check** dashboard provides visibility into the configuration hygiene of your Kubernetes cluster. This dashboard displays color-coded performance checks for nodes, along with resource utilization, pod capacity, pod errors, and pod states.

 Use this dashboard to:  
* Assess bad configurations and determine the trouble areas for proactive adjustment.
* Monitor resource allocation across your cluster to maintain optimum performance.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Hygiene_Check.png')} alt="K8s dashboards" />


### CoreDNS

CoreDNS is a [DNS server](https://en.wikipedia.org/wiki/Domain_Name_System) and can be used as a replacement for kube-dns in a kubernetes cluster.

The **Kubernetes - CoreDNS** dashboard provides visibility into the health and performance of CoreDNS.  

Use this dashboard to:  
* Track the total number of requests.
* Review Cache statistics.  
* Monitor CoreDNSs resource usage and spikes.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_CoreDNS.png')} alt="K8s dashboards" />


### HPA

The Horizontal Pod Autoscaler automatically scales the number of Pods in a replication controller, deployment, replica set or stateful set based on observed CPU utilization.

The **Kubernetes - HPA** dashboard provides visibility into the health and performance of HPA.  

Use this dashboard to:  
* Identify whether the required replica level has been achieved or not.
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_HPA.png')} alt="K8s dashboards" />
