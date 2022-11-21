---
id: kubernetes
title: Sumo Logic App for Azure Kubernetes Service Control Plane
sidebar_label: Azure Kubernetes Service Control Plane
description: The Sumo Logic App for Azure Kubernetes Service (AKS) - Control Plane provides visibility into the AKS control plane with operational insights into the API server, scheduler, control manager, and worker nodes.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/k8s.png')} alt="k8s logo" width="75"/>

The Sumo Logic App for Azure Kubernetes Service (AKS) - Control Plane provides visibility into the AKS control plane with operational insights into the API server, scheduler, control manager, and worker nodes. The app's preconfigured dashboards display resource-related metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets.

[Azure Kubernetes Service (AKS)](https://docs.microsoft.com/en-us/azure/aks/) is a Kubernetes environment with clusters managed by Azure. AKS simplifies deploying and managing container-based applications, while automatically provisioning, upgrading, and scaling resources as needed.


## Supported versions

The following are the minimum supported requirements for this application:

<table>
  <tr>
   <td>Name
   </td>
   <td>Supported versions
   </td>
  </tr>
  <tr>
   <td>Kubernetes
   </td>
   <td>1.10 and later
   </td>
  </tr>
  <tr>
   <td>AKS
   </td>
   <td>1.12.8
   </td>
  </tr>
</table>



## Log Types  

The AKS - Control Plane App collects logs for the following [Azure Kubernetes Services](https://azure.microsoft.com/en-us/services/kubernetes-service/):
* kube-apiserver
* kube-scheduler
* kube-controller-manager


## Collect logs for the AKS - Control Plane App

This section provides instructions for configuring a pipeline to collect Azure managed master node logs in your Azure Kubernetes Service (AKS) to an event hub, on to an Azure function, and finally to an HTTP source on a hosted collector in Sumo Logic.


### AKS - Control Plane Logs

The AKS - Control Plane App uses Azure managed master node logs in your Azure Kubernetes Service (AKS). The AKS - Control Plane App collects logs for the following services:

* **kube-apiserver** - The API server exposes the underlying Kubernetes APIs. This component provides the interaction for management tools, such as kubectl or the Kubernetes dashboard.
* **kube-scheduler** - The Scheduler determines what nodes can run the workload when you create or scale applications and then starts them.
* **kube-controller-manager** - The Controller Manager oversees a number of smaller controllers that perform actions, such as replicating pods and handling node operations.



The Sumo Logic [Kubernetes App](/docs/integrations/containers-orchestration/Kubernetes) works in conjunction with the AKS - Control Plane App and allows you to monitor worker node logs, as well as metrics for the Azure monitor and worker nodes.


### Collection process

Configuring logs and metrics for the AKS - Control Plane App is a two step process:

* Setting up collection and installing the Sumo Logic Kubernetes App.
* Configuring Azure monitor and enabling the master node logs in AKS.

The Sumo Logic[ Kubernetes App](/docs/integrations/containers-orchestration/Kubernetes) allows you to  monitor worker node logs, as well as metrics for the Azure monitor and worker nodes.


#### Step 1. Setup and Install the Sumo Logic Kubernetes App  


The Sumo Logic Kubernetes App provides the services for managing and monitoring Kubernetes worker nodes. You must set up collection and  install the Kubernetes App before configuring collection for the AKS - Control Plane App. You will configure log and metric collection during this process.

**To set up and install the Kubernetes App**, follow the instructions in [this document](/docs/integrations/containers-orchestration/Kubernetes).


#### Step 2. Configure Azure Monitor and enable logs in AKS

This section walks you through the process of configuring a pipeline to send logs from Azure Monitor to Sumo Logic. The AKS - Control Plane App utilizes the following log types:

* kube-apiserver
* kube-scheduler
* kube-controller-manager

To configure Azure Monitor and enable AKS logs, do the following:

1. Follow Step 1 and Step 2 on this page: [Collect Logs from Azure Monitor](/docs/send-data/collect-from-other-data-sources/azure-monitoring/collect-logs-azure-monitor)
2. [Enable the Kubernetes master node logs in Azure Kubernetes Service](https://docs.microsoft.com/en-us/azure/aks/view-master-logs#enable-diagnostics-logs) to send logs to an event hub created in the previous step.


#### Sample log messages

```json title="kube-apiserver"
{
"operationName":"Microsoft.ContainerService/managedClusters/diagnosticLogs/Read",
"category":"kube-apiserver",
"resourceId":"/SUBSCRIPTIONS/C111111-DXXX-4XXX-AXXX-900000000/RESOURCEGROUPS/AG-AKS-RG/PROVIDERS/MICROSOFT.CONTAINERSERVICE/MANAGEDCLUSTERS/AG-AKS-CLUSTER",
"properties":▼{
"log":"I0624 20:14:59.855669       1 wrap.go:47] PUT /api/v1/namespaces/kube-system/endpoints/kube-scheduler?timeout=10s:
(9.05251ms) 200 [hyperkube/v1.12.8 (linux/amd64) kubernetes/a89f8c1/leader-election 172.31.1.1:48110]
",
"stream":"stderr",
"pod":"kube-apiserver-796bd9b775-xqk5s",
"containerID":"2d6cac1300da3226323fd1b936fe8278b87cba2b7a1bbd9c8401da6f8e786f5e"
},
"time":"2019-06-24T20:14:59.000Z"
}
```


```json title="kube-controller-manager"
{
"operationName":"Microsoft.ContainerService/managedClusters/diagnosticLogs/Read",
"category":"kube-controller-manager",
"resourceId":"/SUBSCRIPTIONS/C111111-DXXX-4XXX-AXXX-900000000/RESOURCEGROUPS/AG-AKS-RG/PROVIDERS/MICROSOFT.CONTAINERSERVICE/MANAGEDCLUSTERS/AG-AKS-CLUSTER",
"properties":▼{
"log":"I0624 07:27:25.976386       1 event.go:221] Event(v1.ObjectReference{Kind:\"DaemonSet\",
Namespace:\"kube-system\", Name:\"kube-proxy\", UID:\"2dfb3905-7dac-11e9-b60d-0a58ac1f01f6\",
APIVersion:\"apps/v1\", ResourceVersion:\"4150266\", FieldPath:\"\"}): type: 'Normal'
reason: 'SuccessfulCreate' Created pod: kube-proxy-xhmv7
",
"stream":"stderr",
"pod":"kube-controller-manager-59fd65c5bd-694kh",
"containerID":"667b540db41b66e914ca2ed496e0bef6d4a0b73fc832f5d5eba958d8a56a5e93"
},
"time":"2019-06-24T07:27:25.000Z"
}
```


```json title="kube-scheduler"
{
"operationName":"Microsoft.ContainerService/managedClusters/diagnosticLogs/Read",
"category":"kube-scheduler",
"resourceId":"/SUBSCRIPTIONS/C111111-DXXX-4XXX-AXXX-900000000/RESOURCEGROUPS/AG-AKS-RG/PROVIDERS/MICROSOFT.CONTAINERSERVICE/MANAGEDCLUSTERS/AG-AKS-CLUSTER",
"properties":▼{
"log":"W0622 22:50:25.377565       1 reflector.go:256] k8s.io/client-go/informers/factory.go:131:
watch of *v1.StorageClass ended with: too old resource version: 3828720 (3970094)
",
"stream":"stderr",
"pod":"kube-scheduler-744886667c-cxnvk",
"containerID":"6093b28d82e1f850fb5a9f59ed8c31aa7179e8a3907449dcd2450a6605341a60"
},
"time":"2019-06-22T22:50:25.000Z"
}
```



#### Sample Queries

```sql title="kube-apiserver"
_sourceCategory="azure/aks" "kube-apiserver"
| json "properties.log", "category", "time", "properties.pod", "resourceId" as log, category, time, pod, resourceId
| where category ="kube-apiserver"
| parse regex field=log "(?<severity>W|I|F|E)(?<tt>[\S]+) (?<times>[\d:.]+)[\s]+(?<log_msg>.*)"
| parse regex field=resourceId "RESOURCEGROUPS\/(?<resource_grp>[\S]+)\/PROVIDERS\/MICROSOFT\.CONTAINERSERVICE\/MANAGEDCLUSTERS\/(?<cluster>[\S]+)"
| timeslice 1h
| count by _timeslice, severity
| transpose row _timeslice column severity
| fillmissing timeslice(1h)
```


```sql title="kube-controller-manager"
_sourceCategory="azure/aks" ("kube-controller-manager")
| json "properties.log", "category", "time", "properties.pod", "resourceId" as log, category, time, pod, resourceId
| where category ="kube-controller-manager"
| parse regex field=log "(?<severity>W|I|F|E)(?<tt>[\S]+) (?<times>[\d:.]+)[\s]+(?<log_msg>.*)"
| parse regex field=resourceId "RESOURCEGROUPS\/(?<resource_grp>[\S]+)\/PROVIDERS\/MICROSOFT\.CONTAINERSERVICE\/MANAGEDCLUSTERS\/(?<cluster>[\S]+)"
| timeslice 1h
| count by _timeslice, severity
| transpose row _timeslice column severity
| fillmissing timeslice(1h)
```

```sql title="kube-scheduler"
_sourceCategory="azure/aks" "kube-scheduler"
| json "properties.log", "category", "time", "properties.pod", "resourceId" as log, category, time, pod, resourceId
| where category ="kube-scheduler"
| parse regex field=log "(?<severity>W|I|F|E)(?<tt>[\S]+) (?<times>[\d:.]+)[\s]+(?<log_msg>.*)"
| parse regex field=resourceId "RESOURCEGROUPS\/(?<resource_grp>[\S]+)\/PROVIDERS\/MICROSOFT\.CONTAINERSERVICE\/MANAGEDCLUSTERS\/(?<cluster>[\S]+)"
| timeslice 1h
| count by _timeslice, severity
| transpose row _timeslice column severity
| fillmissing timeslice(1h)
```



## Installing the AKS Control Plane App

Now that you have set up collection for AKS, you can install the Sumo Logic App for AKS and access the pre-configured Kubernetes dashboards for visibility into your AKS environment from a single-pane-of-glass.


18
All the dashboards are linked to the Explore tab so they can be easily accessed by clicking the Cluster in the navigation pane of the Explore tab.

To install the app, do the following:



1. Locate and install the app from the App Catalog. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
2. From the App Catalog, search for **AKS** and select the app.
3. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name**. You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.**  For **AKS Log Source**, leave Source Category selected, and enter the value of source category which you used while configuring the Sumo Logic HTTP Source.
    3. **Advanced**. Select the Location in Library (the default is the Personal folder in the library), or click New Folder to add a new folder.
4. Click **Add to Library**.


## Viewing the AKS Control Plane Dashboards

### Filter with template variables    

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the [Filter with template variables](/docs/dashboards-new/filter-template-variables.md) page.

You can use template variables to drill down and examine the data on a granular level.


### AKS Controller Manager Dashboard

The **AKS Controller Manager** dashboard provides a high-level view of severity types and trends, along with details on scale operations, pod creation and deletion, and recent error messages.

Use this dashboard to:

* Find pod and scale operations performed by controller manager.
* Find the severity of various controller manager events and analyze fatal and erroneous controller manager operation events.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Azure Kubernetes Service AKS Control Plane dashboards" />



### AKS API Server Dashboard

The AKS API Server dashboard provides insights into API server severity events and trends, autoscaler and status code trends, top problem URLs, and a list of recent error messages.

Use this dashboard to:

* Understand the status codes of requests made to Kube API Server.
* Review the top 10 URLs with problem status codes.  
* Review the severity of various Kube API Server events, and analyze any fatal or erroneous events of Kube API Server operations.
* Find spikes or abnormal activity in the status codes of auto-scaler operations.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Azure Kubernetes Service AKS Control Plane dashboards" />



### AKS Scheduler Dashboard
25


The **AKS Scheduler** dashboard provides a high-level view of severity types and trends for the Kube scheduler, as well as a detailed list of error messages.

Use this dashboard to:

* Find the severity of various Kube scheduler events.
* Analyze fatal or erroneous events of Kube scheduler operations.

<img src={useBaseUrl('img/integrations/microsoft-azure/Overview.png')} alt="Azure Kubernetes Service AKS Control Plane dashboards" />
