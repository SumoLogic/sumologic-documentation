---
id: legacy-cloud-soar-incidents-and-triage
title: Legacy Cloud SOAR Incident Management and Triage
sidebar_label: Incidents and Triage
description: Features of the legacy Cloud SOAR automated real-time incident management and threat response.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
This article only applies to organizations having a legacy Cloud SOAR instance URL matching the pattern `*.soar.sumologic.com`. If it doesn't, refer to [Cloud SOAR Incident Management and Triage](/docs/cloud-soar/incidents-triage/) for documentation of our latest Cloud SOAR SaaS version.
:::

## Create a new incident manually

### Incident Report

The **Report Template** section allows you to create templates for custom reporting. The Report Template screen contains a list of all current report templates. To add a new report template, click on the **+** icon above the report template list.

The Details tab of the new report template window allows you to specify a unique name for the template as well as a template category and any appropriate tags.

The Sections tab of the new report template window allows you to drag and drop sections of the incident into the report template. All incident sections are listed in the left-hand pane. Dragging incident sections to the right-hand pane will add the section to the report template.
Sections will be printed in the report in the order they appear in the right-hand pane. Once satisfied with the selection, click **Save**.

<img src={useBaseUrl('img/cloud-soar/image45.png')} alt="'Create report template' dialog" style={{border: '1px solid gray'}} width="400"/>

