---
slug: /send-data/hosted-collectors
title: Hosted Collectors
description: Hosted Collectors allow you to upload data stored in the cloud to Sumo Logic. You can configure Sources for Collectors that are hosted in Amazon Web Services (AWS), Microsoft, or other hosting services.
tags: [hosted collectors]
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

*Hosted Collectors* allow you to send data to Sumo Logic without deploying an agent. We host the Collector and its Sources on our end, in AWS — no need to install it on a local system in your deployment.

With a single Hosted Collector, you can create and configure Sources to collect data from any number of Sources, for example:

* Cloud-to-Cloud collection from AWS, Azure, Google Cloud Platform, and more SaaS tools
* Send data directly to Sumo endpoint using your custom collection method

Data collection flow for S3 buckets and HTTP requests:<br/>![team built hosted diagram.png](/img/send-data/team-built-hosted-diagram.png)

Just as Installed Collectors, you can monitor the activity of Hosted Collectors using the Status tab.

:::note
The maximum number of Collectors allowed per organization is 10,000.
:::


:::sumo Hosted Collector Overview

<Iframe url="https://www.youtube.com/embed/bjbTm3vR2nA"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

:::


<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/apm/real-user-monitoring/configure-data-collection"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="30"/><h4>Configure a Hosted Collector</h4></a>
  <p>Set up Hosted Collectors so you can move data to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/amazon-aws"><img src='https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' alt="icon" width="50"/><h4>Amazon and AWS Sources</h4></a>
  <p>Collect from one of the many AWS products that we support.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/google-source"><img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="190"/><h4>Google Sources</h4></a>
  <p>Collect data from your Google Cloud Platform and other products.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework"><img src={useBaseUrl('img/icons/cloud/cloud-systems.png')} alt="Thumbnail icon" width="40"/><h4>C2C Integration Sources</h4></a>
  <p>Collect logs and events directly from SaaS and Cloud platforms.</p>
  </div>
</div>
  <div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/http-source"><img src={useBaseUrl('img/send-data/http-logs-metrics.png')} alt="Thumbnail icon" width="45"/><h4>HTTP Sources</h4></a>
  <p>Upload logs, metrics, traces, and more to an HTTP Source.</p>
  </div>
</div>
  <div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/ms-office-audit-source"><img src={useBaseUrl('img/send-data/office_365_48.png')} alt="Thumbnail icon" width="40"/><h4>Microsoft Sources</h4></a>
  <p>Collect Audit Log content types to track and monitor usage of MS 365.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/cloud-syslog-source"><img src={useBaseUrl('img/send-data/cloud-syslog.png')} alt="thumbnail icon" width="60"/><h4>Cloud Syslog Sources</h4></a>
  <p>Configure a cloud syslog source to send data to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/send-data/hosted-collectors/zoom"><img src={useBaseUrl('img/integrations/saas-cloud/zoom.png')} alt="Thumbnail icon" width="40"/>
  <h4>Zoom Source</h4></a>
  <p>Learn how to create HTTP Zoom source and enable events subscriptions.</p>
  </div>
</div>
</div>
