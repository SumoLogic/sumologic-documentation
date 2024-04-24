---
id: main-menu
title: Cloud SOAR Main Menu
sidebar_label: Main Menu
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

Cloud SOAR is a pure web-based application which does not require an additional add-on or client to deploy. The main menu consists of all operational sections of Cloud SOAR, including Incidents, Triage (if enabled), Operations, and incoming Data Sources.

<img src={useBaseUrl('img/cloud-soar/image25.png')} alt="Main Menu" width="600"/>

## Home

The Home section is where all your current tasks reside. Here you can approve, decline, and close tasks as well as customize this section to display all tasks assigned to a specific user or group.

<img src={useBaseUrl('img/cloud-soar/image26.png')} alt="Home page" width="800"/>

## Dashboards

Watch the following micro lesson to learn about dashboards and KPI reports.

<Iframe url="https://www.youtube.com/embed/NRdtAvxhuOY?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />

The Cloud SOAR Dashboard layout renders data for quick comprehension
using a combination of graphics (e.g., charts, tables, graphs, and
visual indicators) called Widgets. The data is helpful to security
analysts tasked with incident handling and operational activities and
provides supervisors and stakeholders a summary overview from which to derive strategic information.

<img src={useBaseUrl('img/cloud-soar/image27.png')} alt="Dashboards" width="800"/>

Cloud SOAR's dashboards section is used to highlight the most important
pieces of data to the user or investigator who is logged into the
platform. This data is presented through the use of multiple widgets
that you can add, remove, and customize to include all data relevant
to your job functions and duties.

<img src={useBaseUrl('img/cloud-soar/image131.png')} alt="Cloud Soar Dashboard" width="800"/>

To begin customizing the dashboard select the **Customize** button on the top of the screen. Once selected, a new configuration box will be displayed.

<img src={useBaseUrl('img/cloud-soar/image132.png')} alt="Dashboard Widget Editor" width="800"/>  

<img src={useBaseUrl('img/cloud-soar/image133.png')} alt="Dashboard Widget Configurator" width="300"/>


The widgets section on the left-side of the screen displays how the dashboard is structured. To begin adding widgets to the dashboard, click **+** on the desired section.

A new popup will be displayed with a list of all widget choices for the
selected section. To add a new widget, click **+**.

Once a widget is added to a section, they will be displayed on the
right-side of the screen. To configure, click the cogwheel next to the
widget to be customized. A new configuration screen will be displayed.
These configuration screens will vary depending on the information it
utilizes. Users have the option to add or remove filters and values,
rename the section, as well as choose what data they would like to have
displayed.

To change how the widgets appear in a section, you can drag and drop into the desired positions by clicking and holding the left-side of selection and dragging to a new location. Users can utilize Cloud SOAR's Carousel feature to cycle through different Dashboard displays on a SOC board to ensure constant visibility within the Cloud SOAR platform. Once the desired widgets have been added and configured, click save to commit.

<img src={useBaseUrl('img/cloud-soar/image135.png')} alt="Cloud Soar Dashboard Carousel" width="500"/>

Most widgets inside of the Cloud SOAR dashboard are drillable. To drill down into a specific statistic, click on either an Incident ID or a section of a pie chart to limit the information shown to the areas of concern.

:::note
Make sure to allow popups from the Cloud SOAR site to drill into dashboard statistics.
:::

<img src={useBaseUrl('img/cloud-soar/image136.png')} alt="Dashboard Pie Chart" width="600"/>


You can also export Dashboards to an Excel spreadsheet or PDF document to include in reporting. To export a dashboard, select **Export** from the top of the dashboard screen and select which format to use. A new window will open with the requested document, which can either be saved to your machine or printed.

<img src={useBaseUrl('img/cloud-soar/image137.png')} alt="Dashboard Menu" width="800"/>

### Create a dashboard

You can create dashboards in Cloud SOAR similar to dashboards in the core Sumo Logic platform. You can also [create widgets](#create-widgets) to use in the dashboards that display text, graphs, and charts containing details about incidents and other aspects of Cloud SOAR.

1. Select **Dashboard** in the upper-left corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-dashboards.png')} alt="Access dashboards" width="300"/>
1. Click the **+** icon in the upper-right corner of the UI and select **New Dashboard**.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-dashboard.png')} alt="Add dashboard button" width="200"/><br/>A blank dashboard appears.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-empty-dashboard.png')} alt="Empty dashboard" width="700"/>
1. Click on the name of the blank dashboard (such as **Dashboard 1** in the example), and give the dashboard a name. Click **No description available** and type a description.
1. Click the **Edit** button. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-dashboard-button.png')} alt="Empty dashboard" width="150"/><br/>The widgets panel displays to the right of the dashboard.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-new-dashboard-example.png')} alt="Widgets panel on the dashboard" width="700"/>
1. Under **My Widgets** or **Public**, select widgets you'd like to add to the dashboard. These are the same widgets that are available to use in [reports](/docs/cloud-soar/global-functions-menu/#report). Widgets can be graphs, charts, tables, or any kind of visual element that contains information. Click **New** to [create a new widget](#create-widgets). Click **Show List** to see all available widgets. 
1. Rearrange the widgets in the dashboard as desired.
1. (Optional) Click **Public** at the top of the dashboard panel if you want to make the dashboard available for others to use.
1. (Optional) Click **Export** to to the upper-right of the dashboard panel to export the dashboard to PDF.  

### Create widgets

You can create widgets as needed to help analysts and administrators quickly get the information they need. Widgets are reusable pieces that display information in different forms, such as text, pie chart, bar chart, graph, or table.  

1. Open the widgets panel:
      1. Select **Dashboard** in the upper-left corner of the UI. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-dashboards.png')} alt="Access dashboards" width="300"/>
      1. Select a dashboard.
      1. Click the **Edit** button. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-edit-dashboard-button.png')} alt="Empty dashboard" width="150"/><br/>
      :::note
      Widgets are shared between **Reports** and **Dashboards**.
      To edit a widget, you can click the gear icon in the upper-right corner and select **Report**. You can also use the **Dashboard** edit mode.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-access-reports.png')} alt="Access reports" width="150"/>
      :::
1. The widgets panel displays to the right of the screen.<br/><img src={useBaseUrl('img/cloud-soar/delivery-2-widgets.png')} alt="Widgets panel" width="250"/>
1. Click **New**.<br/>The dialog to create new widgets displays. <br/><img src={useBaseUrl('img/cloud-soar/delivery-2-create-widget.png')} alt="Create a widget" width="600"/>
1. In **Name**, provide a name that clearly explains the widget's purpose.
1. In **Group by**, select whether you want incidents listed in the widget to be grouped by **Status**, **Incident ID**, or **Start time**.
1. On the left, select the type of widget to create (pie chart, bar chart, graph, table, or text).
1. At the top, query for elements to view in the widget, such as incidents, notes, tasks, and attachments.
1. Click **Public** if you want to make the widget available for others to use.
1. Click **Save** when done.


## Incidents

All current and previous incidents can be found in the Incidents
section. Incidents can be sorted, filtered, and accessed here.

<img src={useBaseUrl('img/cloud-soar/incidents.png')} alt="Incidents Section Fields" width="600"/>

Opening an individual incident will allow you to interact with all aspects of the incident permitted by your assigned Incident Profile.

You can also add incidents manually from the Incidents section for
incidents which were not created automatically through another process.

<img src={useBaseUrl('img/cloud-soar/image28.png')} alt="Incidents Section" width="800"/>



### Triage

The **Triage** module ingests events via the Cloud SOAR API and can be used
to triage events that may be unverified or have a low confidence level
before they are converted to incidents. The Triage module can be
completely customized for use cases from financial fraud to network IDS
alerts.

<img src={useBaseUrl('img/cloud-soar/image29.png')} alt="Triage Section" width="800"/>

:::tip Triage Documentation
For more information, refer to [Incidents and Triage](/docs/cloud-soar/incidents-triage).
:::


## Entities

The **Entities** tab provides access to data from across all incidents, as well as other information which can be stored within Cloud SOAR.<br/><img src={useBaseUrl('img/cloud-soar/entities.png')} alt="Entity Section" width="600"/>

Observables from every incident can be found in this section, along with any enrichment data associated with these data types and the incidents they were reported in. You'll find all variables including artifacts related to an incident. Clicking on an entity in the entity list will display the results of any previous actions taken on the entity, or where in the incident the entity was extracted.

<img src={useBaseUrl('img/cloud-soar/image163.png')} alt="Entity Details" width="800"/>

A timeline of actions taken on the entity can be displayed on the far right-hand corner of the screen by clicking on the stopwatch symbol. Hover over the date tabs to expand the timeline and see additional information about the actions taken on each date.

<img src={useBaseUrl('img/cloud-soar/image164.png')} alt="Latest actions" width="300"/>

While any observable is selected, a menu bar will be available in the
top right-hand corner of the screen which allows users to perform
certain actions on the observable.

<img src={useBaseUrl('img/cloud-soar/image165.png')} alt="Observables Menu Bar" width="400"/>

- **Lock**: Lock the observable to prevent any actions from being taken on it. This may be useful if you want to ensure that no enrichment actions are taken on attacker-controlled infrastructure or that an observable is not accidentally blocked.
- **Delete**: Delete the observable.
- **Mark as Favorite**: Mark the observable as a favorite and move it to the top of the observables list.

### Adding a New Entity

To add a new entity, click the **+** sign at the top of the screen and a
new configuration box will be displayed. Select an entity type from the
dropdown menu and an additional configuration box will be displayed.
This configuration box allows the user to input information about the
entity, such as adding a file or its file hash. Once the entity is
created, click **Create** to continue.

<img src={useBaseUrl('img/cloud-soar/image166.png')} alt="Adding a new Entity" width="400"/>


### Documentation

The **Documentation** section provides investigators with an area to
document all steps taken during an incident's investigation. The
following tools are available across the entire Cloud SOAR platform as well
as on an individual incident level:

### Attachments

The **Attachments** section is a repository for investigators to use to
house attachments related to an incident's investigation. The source of
this data can vary but will often be the output of monitoring tools and
supporting documents. For each record, users can define:

- **Reference**: an identifier for what the record refers to;
- **Date**: a timestamp for when the record was uploaded;
- **Application**: information about the system or application used to generate the record;
- **Short description**: a free-form textual description of the record; and,
- **Parent folder**: employed if arranging various records in a tree structure for logical classification.

As with our other documentation tools, attachments can also be added as
a timeline event and associated with a knowledge base article.    

<img src={useBaseUrl('img/cloud-soar/image172.png')} alt="New Attachment Screen" width="600"/>

### Closing Note

Closing incident will result in asking a note for incident closing as below:

<img src={useBaseUrl('img/cloud-soar/image57b.png')} alt="Close Incident" width="400"/>

<img src={useBaseUrl('img/cloud-soar/image57c.png')} alt="Closing Note" width="800"/>
