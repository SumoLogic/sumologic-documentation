---
slug: /send-data/hosted-collectors
title: Hosted Collectors
description: Hosted collectors allow you to upload data stored in the cloud to Sumo Logic. You can configure sources for collectors that are hosted in Amazon Web Services (AWS), Microsoft, or other hosting services.
keywords:
  - hosted collector
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

A *Sumo Logic hosted collector* is a Sumo Logic-managed collector, hosted in AWS, that lets you send data to Sumo Logic without deploying an agent. We host the collector and its sources on our end — no need to install anything on a local system in your deployment.

With a single hosted collector, you can create and configure sources to collect data from any number of sources, for example:

* Cloud-to-Cloud collection from AWS, Azure, Google Cloud Platform, and more SaaS tools
* Send data directly to a Sumo Logic endpoint using your custom collection method

Data collection flow for S3 buckets and HTTP requests:<br/><img src={useBaseUrl('img/send-data/team-built-hosted-diagram.png')} alt="Data flow diagram showing S3 data flow to Sumo Logic through a hosted collector" style={{border: '1px solid gray'}} width="800" />

Just as installed collectors, you can monitor the activity of hosted collectors using the Status tab.

:::note
The maximum number of collectors allowed per organization is 10,000.
:::

:::training Micro Lesson

<Iframe url="https://fast.wistia.net/embed/iframe/dtbh5w5f48?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Hosted Collector Overview Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::


<div className="box-wrapper" >
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/hosted-collectors/configure-hosted-collector')}><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="Data Collection icon" width="30"/><h4>Configure a Hosted Collector and Source</h4></a>
  <p>Set up hosted collectors so you can move data to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/hosted-collectors/amazon-aws')}><img src='https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' alt="Amazon Web Services icon" width="50"/><h4>Amazon and AWS Sources</h4></a>
  <p>Collect from one of the many AWS products that we support.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework')}><img src={useBaseUrl('img/icons/cloud/cloud-systems.png')} alt="Cloud Systems icon" width="40"/><h4>Cloud-to-Cloud Integration Framework Sources</h4></a>
  <p>Collect logs and events directly from SaaS and Cloud platforms.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/hosted-collectors/google-source')}><img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="Google Workspace icon" width="125"/><h4>Google Sources</h4></a>
  <p>Collect data from your Google Cloud Platform and other products.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/hosted-collectors/krutrim-object-storage')}><img src={useBaseUrl('img/send-data/krutrim-icon.png')} alt="Krutrim Object Storage icon" width="30"/><h4>Krutrim Object Storage</h4></a>
  <p>Use Krutrim Object Storage source to collect and send data to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/hosted-collectors/microsoft-source')}><img src={useBaseUrl('img/send-data/microsoft.png')} alt="Microsoft icon" width="40"/><h4>Microsoft Sources</h4></a>
  <p>Collect data from your Microsoft platform and other products.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/hosted-collectors/cloud-syslog-source')}><img src={useBaseUrl('img/send-data/cloud-syslog.png')} alt="Cloud Syslog icon" width="60"/><h4>Cloud Syslog Sources</h4></a>
  <p>Configure a cloud syslog source to send data to Sumo Logic.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/hosted-collectors/http-source')}><img src={useBaseUrl('img/send-data/http-logs-metrics.png')} alt="HTTP Logs Metrics icon" width="45"/><h4>Configure HTTP Source for Logs, Metrics, Traces, OTLP</h4></a>
  <p>Upload logs, metrics, traces, and more to an HTTP source.</p>
  </div>
</div>
<div className="box smallbox card">
  <div className="container">
  <a href={useBaseUrl('docs/send-data/hosted-collectors/webhook-sources/zoom')}><img src={useBaseUrl('img/integrations/saas-cloud/zoom.png')} alt="Zoom icon" width="60"/><h4>Zoom Source</h4></a>
  <p>Learn how to create HTTP Zoom source and enable events subscriptions.</p>
  </div>
</div>
</div>

## FAQ

### What is a hosted collector?

A hosted collector is a collector that Sumo Logic hosts and manages in AWS, letting you send data to Sumo Logic without installing or maintaining an agent yourself.

### How is a hosted collector different from an installed collector?

A hosted collector requires no local installation since Sumo Logic runs it for you, while an [installed collector](/docs/send-data/installed-collectors/) is deployed and maintained in your own environment.

### How many sources can a hosted collector have?

A single hosted collector can have any number of sources, up to the organization-wide maximum of 10,000 collectors.

### Do I need to install anything to use a hosted collector?

No. Sumo Logic hosts the collector and its sources in AWS, so you do not need to install or maintain anything locally.

### Can a hosted collector collect from multiple cloud platforms?

Yes. A single hosted collector can have sources for AWS, Microsoft, Google Cloud Platform, and other SaaS and cloud-to-cloud integrations.
