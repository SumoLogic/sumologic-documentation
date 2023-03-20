---
slug: /send-data/installed-collectors/collector-installation-reference
title: Reference Information for Installed Collectors
description: These topics provide supporting information about Installed Collector configuration parameters and options.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

These topics provide supporting information about Installed Collector configuration parameters and options. 

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/download-collector-from-static-url"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Download Collector from Static URL</h4></a>
  <p>Static URLs provide download links to the most recent Collector versions.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/user-properties"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>user.properties</h4></a>
  <p>Pass Collector parameters for some installation methods.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/test-connectivity-sumo-collectors"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Test Collector Connectivity</h4></a>
  <p>Test access and connectivity from an installed Collector to the Sumo Logic service.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/parameters-command-line-installer/"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Collector CLI Parameters</h4></a>
  <p>Parameters available when using the Collector's command line installer.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/collector-properties"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>collector.properties</h4></a>
  <p>Define the waiting time between scans of the objects in your S3 bucket.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/collector-installation-error-messages/"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Collector Installation Error Messages</h4></a>
  <p>Troubleshoot issues that arise during collector installation.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/add-collector-linux-machine-image"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Add Collector to Linux Machine Image</h4></a>
  <p>Build a Collector into a Linux machine image.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/add-collector-windows-machine-image"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Add Collector to Windows Machine Image</h4></a>
  <p>Build a Collector into a Windows machine image.</p>
  </div>
</div>
<div className="box smallbox9 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/advanced-ui-installer-settings"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Advanced UI Installer Settings</h4></a>
  <p>Advanced settings for the UI installer.</p>
  </div>
</div>
<div className="box smallbox10 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/force-collectors-name-clobber"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Force a Collector's Name with Clobber</h4></a>
  <p>Use the clobber flag when you're creating a new Collector that will use a name that is already in use.</p>
  </div>
</div>
<div className="box smallbox11 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/sumoconf-for-legacy-collectors"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>sumo.conf for Legacy Collectors</h4></a>
  <p>Pass Collector config parameters during installation if the Debian or RPM option is used.</p>
  </div>
</div>
<div className="box smallbox12 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/set-run-as-user-for-collector"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Set the <code>RUN_AS_USER</code> for a Collector</h4></a>
  <p>Specify the user under whose account the Collector will run.</p>
  </div>
</div>
<div className="box smallbox13 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/enable-sni-collector-transparent-proxy"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Enabling SNI in a Collector to Support Transparent Proxy</h4></a>
  <p>Enable SNI on Collectors to support third-party transparent proxy services.</p>
  </div>
</div>
<div className="box smallbox14 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/binary-package-install-a-collector"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Using the Binary Package</h4></a>
  <p>Install a Collector on macOS or Windows if you need to use a specific JRE version.</p>
  </div>
</div>
<div className="box smallbox15 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/enhanced-file-system-security-installed-collectors"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Enhanced File System Security</h4></a>
  <p>Protect the log cache and configuration files for Installed Collectors.</p>
  </div>
</div>
<div className="box smallbox16 card">
  <div className="container">
  <a href="/docs/send-data/installed-collectors/collector-installation-reference/set-collector-as-ephemeral"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40"/><h4>Set Collector as Ephemeral</h4></a>
  <p>Flag a Collector as ephemeral to delete it after being offline for 12 hours.</p>
  </div>
</div>
</div>
