---
id: eks-control-plane
title: Amazon EKS - Control Plane
sidebar_label: Amazon EKS - Control Plane
description: Amazon EKS - Control Plane
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Sumo Logic App for Amazon EKS - Control Plane App provides visibility into the EKS control plane with operational insights into the api server, scheduler, control manager, and worker nodes. The app’s preconfigured dashboards display resource-related metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets.

Amazon Elastic Kubernetes Service ([Amazon EKS](https://aws.amazon.com/eks/)) allows you to readily deploy, manage, and scale container-based applications with [Kubernetes](https://aws.amazon.com/kubernetes/) on AWS.


## Supported versions

The following are the minimum supported requirements for this app:

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
   <td>Amazon EKS
   </td>
   <td>1.13.8, 1.11.10
   </td>
  </tr>
</table>



## Log Types   

* **Kubernetes API server component logs (api)** – The cluster API server is the control plane component that exposes the Kubernetes API.
* **Audit (audit)** – Kubernetes audit logs provide a record of the individual users, administrators, or system components that have affected your cluster.
* **Authenticator (authenticator)** – Authenticator logs are unique to Amazon EKS. These logs represent the control plane component that Amazon EKS uses for Kubernetes [Role Based Access Control](https://kubernetes.io/docs/admin/authorization/rbac/) (RBAC) authentication using IAM credentials.
* **Controller manager (controllerManager)** – The controller manager manages the core control loops that are shipped with Kubernetes.
* **Scheduler (scheduler)** – The scheduler component manages when and where to run pods in your cluster.

For more details about EKS logging, refer the [Amazon documentation](https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html).


## Collecting Logs and Metrics





## Installing the Amazon EKS - Control Plane App

Now that you have set up collection for EKS, install the Sumo Logic App for EKS - Control Plane to use the pre-configured Kubernetes dashboards that provide visibility into your EKS environment.

To install the app, do the following:
1. Locate and install the app from the App Catalog. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
2. From the App Catalog, search for **EKS** and select the app.
3. To install the app, click **Add to Library** and complete the following fields.
    1. **App Name**. You can retain the existing name, or enter a name of your choice for the app. 
    2. **Data Source.**  For **EKS Log Source,** leave Source Category selected, and enter the value of source category which you used while configuring the Sumo Logic HTTP Source.
    3. **Advanced**. Select the Location in Library (the default is the Personal folder in the library), or click New Folder to add a new folder.
4. Click **Add to Library**.

All the dashboards are linked to the Explore tab so they can be easily accessed by clicking on Cluster from side navigation of Explore tab.


## Viewing Dashboards for Amazon EKS - Control Plane

Filter with template variables    

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the [Filter with template variables](https://help.sumologic.com/Visualizations-and-Alerts/Dashboard_(New)/Filter_with_template_variables) help page.

You can use template variables to drill down and examine the data on a granular level.


### EKS - API Server Audit Dashboard

The **EKS - API Server Audit** dashboard displays information on Kubernetes audit logs. Panels provide records of individual users, administrators, or system components affected by your cluster.

Use this dashboard to:
* Monitor the health and performance of the API server.
* Review failure rates, reasons, and user failures.
* Review status code trends and the top URLs with problem status codes.
* Review overall user activity.
* Review the total number of successful hits and the top URLs.
* Review requests by stage and audit policy.

<img src={useBaseUrl('img/integrations/amazon-aws/EKS-API-Server-Audit-Overview.png')} alt="Amazon EKS" />


### EKS - API Server Dashboard

The **EKS - API Server** dashboard displays information on the API server logs, the control plane component that exposes the Kubernetes API. Panels show details on the API server errors, warnings, and activities.

Use this dashboard to:
* Monitor API server latency.
* Monitor API server successful request rates.
* Compare successful and failed API server request rates.

<img src={useBaseUrl('img/integrations/amazon-aws/EKS-api-server.png')} alt="Amazon EKS" />


### EKS - Authenticator Dashboard

The **EKS - Authenticator** dashboard displays information on the Authenticator logs which are unique to Amazon EKS. Panels display logs that represent the control plane component Amazon EKS uses for Kubernetes[ Role Based Access Control](https://kubernetes.io/docs/admin/authorization/rbac/) (RBAC) authentication using IAM credentials.

Use this dashboard to:
* Review authentication errors.
* Monitor successful user authentication rates.

<img src={useBaseUrl('img/integrations/amazon-aws/EKS-authenticator.png')} alt="Amazon EKS" />


### EKS - Controller Manager Dashboard

The **EKS - Controller Manager** dashboard displays information on the  controller manager, providing visibility into the core control loops for Kubernetes.

Use this dashboard to:
* Review resource modifications for pods and jobs.
* Review scaling operations and logs.
* Assess severity trends and error messages.

<img src={useBaseUrl('img/integrations/amazon-aws/EKS-controller.png')} alt="Amazon EKS" />


### EKS  - Scheduler Dashboard

The **EKS - Scheduler** dashboard provides details of the scheduler health and latency details.

Use this dashboard to:
* Get an overview of scheduler health and status.
* Review scheduler latency details.

<img src={useBaseUrl('img/integrations/amazon-aws/EKS-scheduler.png')} alt="Amazon EKS" />
