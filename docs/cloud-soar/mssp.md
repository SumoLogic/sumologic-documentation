---
id: mssp
title: Cloud SOAR for MSSPs
sidebar_label: MSSP
keywords:
    - SOAR
    - orchestration
    - MSSP
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes *Cloud SOAR for MSSPs*, a full-featured instance of Cloud SOAR designed for internal MSSP use. Using Cloud SOAR for MSSPs is virtually the same as using a standard Cloud SOAR instance. There are a few differences, which this page highlights.

<img src={useBaseUrl('img/cloud-soar/architecture.png')} alt="architecture"/>

Users in an MSSP access Cloud SOAR for MSSPs using the MSSP Console, a UI that centralizes management, aggregated reporting, and comprehensive tenant visibility.

You can use the MSSP Console to quickly propagate content like new and updated playbooks, custom fields, and so on. Communications between the MSSP Console and tenants use a secure HTTP protocol.

The MSSP Console is similar to the standard Cloud SOAR UI. One difference you’ll notice is the icon in the upper right corner of the UI.

<img src={useBaseUrl('img/cloud-soar/mssp-soar-options.png')} alt="mssp-soar-options"/>

When you click that icon, a dropdown menu displays the following options:

* **MSSP Dashboard**. A customizable view that provides visibility into  tenant incidents and tasks.
* **Nodes Management**. Enables monitoring and management of tenants.
* **Custom Fields**. For editing existing Cloud SOAR fields, creating Custom Fields, and pushing fields to tenants.
* **Playbooks**. For managing automated and semi-automated workflows and pushing them to tenants.

The sections below introduce each of these components.

## MSSP Dashboard

The MSSP Dashboard is highly customizable. You can use out-of-the-box widgets or create new ones containing specific information for each tenant. Dashboards can be exported in Excel or PDF format.

The screenshot below is the page you’ll see when you customize the MSSP Dashboard.

<img src={useBaseUrl('img/cloud-soar/dashboard-customize.png')} alt="dashboard-customize"/>

This screenshot shows a list of widgets that can be added to the MSSP Dashboard.

<img src={useBaseUrl('img/cloud-soar/dashboard-customize-widget-list.png')} alt="dashboard-customize-widget-list"/>

The **Edit widget** popup allows you to configure options for the widget. In the **Details** tab, you can tailor the widget title, the time range for the data to be presented, and when to start the time range with respect to the incident lifecycle, and the refresh period.

<img src={useBaseUrl('img/cloud-soar/edit-widget-details.png')} alt="edit-widget-details"/>

This **Tenants** tab allows you to select the tenants for which the widget will report.

<img src={useBaseUrl('img/cloud-soar/edit-widget-tenants.png')} alt="edit-widget-tenants"/>

For more information about Cloud SOAR dashboards, see [Dashboards](/docs/cloud-soar/main-menu#dashboards).

## Nodes Management

The **Nodes Management** page shows the status of all paired child tenants and provides the following actions you can perform:

* **Ping**. Active status check (PING).
* **Connect**. Connect to tenant.
* **Edit**. Edit the configuration of a tenant.
* **Unpair**. Unpair a tenant.

<img src={useBaseUrl('img/cloud-soar/nodes-mgmt-option.png')} alt="nodes-management"/>

## Playbook

You can use the **Playbook** page to create and edit Playbooks, and to push Playbooks to tenants.

The screen below displays a list of playbooks that have been created, in this case, one Playbook.

<img src={useBaseUrl('img/cloud-soar/playbook-list.png')} alt="playbook-list"/>

When you click a Playbook in the list, the Playbook is displayed. You can click **Push to All Tenants** to propagate the Playbook.

<img src={useBaseUrl('img/cloud-soar/playbook.png')} alt="playbook"/>

You’ll be offered the option to push the Playbook to selected tenants, as desired.

<img src={useBaseUrl('img/cloud-soar/save-to-tenants.png')} alt="save-to-tenants"/>

For more information, see [Playbook](/docs/cloud-soar/global-functions-menu#playbook).

## Custom Fields

The **Custom Fields** page allows you to create and manage Custom Fields, and to push fields to tenants.

The **Synchronize** icon indicates the status of the Custom Field in terms of propagation. If the icon is highlighted in blue, the field has been synchronized with tenants. You can use the **Push Field** button to propagate the Custom Field, as necessary.  

The screenshots below each show a list of Custom Fields for Incidents. This page is very similar to the equivalent page in a standard Cloud SOAR instance, but note the addition of two icons at the right side of each row. The circular icon is the **Synchronized** indicator. The arrow is the **Push Field** option.

When you mouse over the icons, you’ll see **Synchronized** and **Push Field**.

<img src={useBaseUrl('img/cloud-soar/push-field.png')} alt="push-field"/>

<img src={useBaseUrl('img/cloud-soar/synchronized.png')} alt="synchronized"/>

For more information about Custom Fields, see [Customization](/docs/cloud-soar/global-functions-menu#customization).
