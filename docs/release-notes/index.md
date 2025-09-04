---
slug: /release-notes
title: Sumo Logic Release Notes
description: Here you'll find a chronological list of the newest Sumo Logic features and bug fixes.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Stay up to date with the latest Sumo Logic enhancements, features, and fixes. Explore the individual release notes pages to see what's new, and consider subscribing to the RSS feeds for automatic updates.

<div className="box-wrapper">

<div className="box smallbox card">
  <div className="container">
    <a href={useBaseUrl('release-notes-service')}>
      <img src={useBaseUrl('img/icons/manage.png')} alt="icon" width="40" />
      <h4>Service</h4>
    </a>
    <a href="https://help.sumologic.com/release-notes-service/rss.xml">
      <img src={useBaseUrl('img/release-notes/rss.png')} alt="RSS Feed" width="45" />
    </a>
    <p>Get updates on features and bug fixes for alerts, apps, copilot, security, search, observability, and more.</p>
  </div>
</div>

<div className="box smallbox card">
  <div className="container">
    <a href={useBaseUrl('release-notes-collector')}>
      <img src={useBaseUrl('img/icons/data-collection.png')} alt="icon" width="40" />
      <h4>Collector</h4>
    </a>
    <a href="https://help.sumologic.com/release-notes-collector/rss.xml">
      <img src={useBaseUrl('img/release-notes/rss.png')} alt="RSS Feed" width="45" />
    </a>
    <p>Check out bug fixes and new features for both our Installed Collector<sup><a href="#collector-footnote">1</a></sup> and OpenTelemetry Collector.</p>
  </div>
</div>

<div className="box smallbox card">
  <div className="container">
    <a href={useBaseUrl('release-notes-cse')}>
      <img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="icon" width="40" />
      <h4>Cloud SIEM</h4>
    </a>
    <a href="https://help.sumologic.com/release-notes-cse/rss.xml">
      <img src={useBaseUrl('img/release-notes/rss.png')} alt="RSS Feed" width="45" />
    </a>
    <p>Learn about new features, updated content (rules, log mappers, parsers), bug fixes, and announcements for Cloud SIEM.</p>
  </div>
</div>

<div className="box smallbox card">
  <div className="container">
    <a href={useBaseUrl('release-notes-csoar')}>
      <img src={useBaseUrl('img/icons/security/soar-2-color-icon.png')} alt="icon" width="40" />
      <h4>Cloud SOAR</h4>
    </a>
    <a href="https://help.sumologic.com/release-notes-csoar/rss.xml">
      <img src={useBaseUrl('img/release-notes/rss.png')} alt="RSS Feed" width="45" />
    </a>
    <p>Find the latest Cloud SOAR features, application updates, bug fixes, and other important product announcements.</p>
  </div>
</div>

<div className="box smallbox card">
  <div className="container">
    <a href={useBaseUrl('release-notes-developer')}>
      <img src={useBaseUrl('img/icons/cloud/api2.png')} alt="icon" width="40" />
      <h4>Developer</h4>
    </a>
    <a href="https://help.sumologic.com/release-notes-developer/rss.xml">
      <img src={useBaseUrl('img/release-notes/rss.png')} alt="RSS Feed" width="45" />
    </a>
    <p>Stay informed on updates to our APIs, Collector Management API, and Live Tail CLI, including new developer features.</p>
  </div>
</div>
</div>
<br/>

<a id="collector-footnote"></a>
<sup>1</sup> To access new Installed Collector features, upgrade using:
* [Static URLs](/docs/send-data/installed-collectors/collector-installation-reference/download-collector-from-static-url)
* [Sumo Logic](/docs/send-data/collection/upgrade-collectors)
* [Command Line](/docs/send-data/collection/upgrade-collectors)
* [Collector Management API](/docs/api/collector-management/upgrade-downgrade-collectors)
