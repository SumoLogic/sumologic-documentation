---
slug: /cse/ingestion
title: CSE Ingestion
sidebar_label: CSE Ingestion
description: Learn how to configure ingestion for supported products and services.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The topics in this section provide data ingestion guides for supported products and services.

You can configure a variety of Sources on [Installed Collectors](/docs/send-data/installed-collectors).

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/cse/ingestion/cse-ingestion-best-practices"><img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="icon" width="40"/><h4>Best Practices</h4></a>
  <p>Learn how to send Sumo Logic Source or Cloud-to-Cloud Connector log messages to CSE to be transformed into Records.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/cse/ingestion/products-with-log-mappings"><img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="icon" width="40"/><h4>Products with Log Mappings</h4></a>
  <p>See the product and services that CSE supports with log mappings and parsers.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
  <a href="/docs/cse/ingestion/view-mappers-for-product"><img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="icon" width="40"/><h4>Viewing Log Mappers</h4></a>
  <p>Learn how to find what mappers CSE provides for a product or service.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
  <a href="/docs/cse/ingestion/sumo-logic-ingest-mapping"><img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="icon" width="40"/><h4>Sumo Logic CSE Ingest Mapping</h4></a>
  <p>Configure Sumo Logic to send log messages to be processed by CSE's system mapper.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
  <a href="/docs/cse/ingestion/auth0"><img src={useBaseUrl('img/integrations/saml/auth0.png')} alt="Thumbnail icon" width="50"/><h4>Auth0 system parser</h4></a>
  <p>Configure an HTTP source to ingest Auth0 log messages and send them to CSE’s Auth0 system parser.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/cse/ingestion/aws-application-load-balancer"><img src={useBaseUrl('img/integrations/amazon-aws/alb.png')} alt="Thumbnail icon" width="50"/><h4>AWS Application Load Balancer</h4></a>
  <p>Configure collection and ingestion of AWS ALB log messages from an S3 bucket to be parsed by CSE.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/cse/ingestion/aws-cloudtrail"><img src={useBaseUrl('img/integrations/amazon-aws/cloudtrail.png')} alt="Thumbnail icon" width="50"/><h4>AWS CloudTrail</h4></a>
  <p>Configure a CloudTrail source on a hosted collector to ingest CloudTrail log messages to be parsed by CSE.</p>
  </div>
</div>
<div className="box smallbox8 card">
  <div className="container">
  <a href="/docs/cse/ingestion/aws-guardduty"><img src={useBaseUrl('img/integrations/amazon-aws/guardduty.png')} alt="Thumbnail icon" width="50"/><h4>AWS GuardDuty</h4></a>
  <p>Configure an HTTP source to ingest AWS GuardDuty log messages and send them to CSE's system parser.</p>
  </div>
</div>
    <div className="box smallbox9 card">
      <div className="container">
      <a href="/docs/cse/ingestion/aws-network-firewall"><img src={useBaseUrl('img/integrations/amazon-aws/network-firewall.png')} alt="icon" width="45"/><h4>AWS Network Firewall</h4></a>
      <p>Configure collection and ingestion of AWS Network Firewall log messages from an S3 bucket to be parsed by CSE.</p>
      </div>
    </div>
    <div className="box smallbox10 card">
      <div className="container">
      <a href="/docs/cse/ingestion/aws-vpc-flow"><img src={useBaseUrl('img/integrations/amazon-aws/vpcflowlogs.png')} alt="icon" width="40"/><h4>AWS VPC Flow</h4></a>
      <p>Configure collection and ingestion of VPC Flow logs from an S3 bucket to be parsed by CSE.</p>
      </div>
    </div>
    <div className="box smallbox11 card">
      <div className="container">
      <a href="/docs/cse/ingestion/carbon-black"><img src={useBaseUrl('img/integrations/security-threat-detection/vmcarecb.png')} alt="icon" width="40"/><h4>Carbon Black Cloud</h4></a>
      <p>Configure collection of Carbon Black Cloud logs messages from an S3 bucket to be parsed by CSE.</p>
      </div>
    </div>
    <div className="box smallbox12 card">
      <div className="container">
      <a href="/docs/cse/ingestion/check-point-firewall"><img src={useBaseUrl('img/icons/operations/data-volume.png')} alt="icon" width="40"/><h4>Check Point Firewall</h4></a>
      <p>Configure a syslog source to ingest Check Point Firewall log messages to be parsed by CSE.</p>
      </div>
    </div>
    <div className="box smallbox13 card">
      <div className="container">
      <a href="/docs/cse/ingestion/cisco-asa"><img src={useBaseUrl('img/integrations/security-threat-detection/cisco.png')} alt="icon" width="70"/><h4>Cisco ASA</h4></a>
      <p>Configure a syslog source to ingest Cisco ASA log messages to be parsed by CSE.</p>
      </div>
    </div>
    <div className="box smallbox14 card">
      <div className="container">
      <a href="/docs/cse/ingestion/cisco-meraki"><img src={useBaseUrl('img/integrations/security-threat-detection/ciscomeraki.png')} alt="icon" width="40"/><h4>Cisco Meraki</h4></a>
      <p>Configure a syslog source to ingest Cisco Meraki log messages to be parsed by CSE Cisco.</p>
      </div>
    </div>
    <div className="box smallbox15 card">
      <div className="container">
      <a href="/docs/cse/ingestion/corelight-zeek"><img src={useBaseUrl('img/cse/corelight.png')} alt="icon" width="40"/><h4>Corelight Zeek</h4></a>
      <p>Configure a syslog source to ingest Corelight Zeek log messages and send them to CSE's log mapper.</p>
      </div>
    </div>
<div className="box smallbox16 card">
  <div className="container">
  <a href="/docs/cse/ingestion/fortigate-firewall"><img src={useBaseUrl('img/icons/operations/firewall.png')} alt="icon" width="35"/><h4>Fortigate Firewall</h4></a>
  <p>Configure a syslog source to ingest Fortigate Firewall log messages to be parsed by CSE.</p>
  </div>
 </div>
 <div className="box smallbox17 card">
   <div className="container">
   <a href="/docs/cse/ingestion/g-suite-alert-center"><img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="icon" width="200"/><h4>G Suite Alert Center</h4></a>
   <p>Collect log messages from G Suite Alert Center to be parsed by CSE.</p>
   </div>
  </div>
  <div className="box smallbox18 card">
    <div className="container">
    <a href="/docs/cse/ingestion/kemp-loadmaster"><img src={useBaseUrl('img/cse/kemp-logo.png')} alt="icon" width="90"/><h4>Kemp LoadMaster</h4></a>
    <p>Configure a syslog source to ingest Kemp LoadMaster messages to be parsed by CSE.</p>
    </div>
  </div>
<div className="box smallbox19 card">
  <div className="container">
  <a href="/docs/cse/ingestion/linux-os-syslog"><img src={useBaseUrl('img/integrations/hosts-operating-systems/linux-transparent.png')} alt="icon" width="40"/><h4>Linux OS Syslog</h4></a>
  <p>Configure a syslog source to ingest Linux OS log messages to be parsed by CSE.</p>
  </div>
 </div>
 <div className="box smallbox20 card">
   <div className="container">
   <a href="/docs/cse/ingestion/microsoft-audit-office"><img src={useBaseUrl('img/integrations/microsoft-azure/365.png')} alt="icon" width="60"/><h4>Microsoft 365 Audit (Office 365 Audit)</h4></a>
   <p>Configure collection of Microsoft 365 log messages to be parsed by CSE. </p>
   </div>
</div>
<div className="box smallbox21 card">
  <div className="container">
  <a href="/docs/cse/ingestion/microsoft-azure-activity-log"><img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="icon" width="45"/><h4>Microsoft Azure Activity Log</h4></a>
  <p>Configure an HTTP Source to ingest Microsoft Azure Activity Log messages and to be parsed by CSE.</p>
  </div>
 </div>
<div className="box smallbox22 card">
  <div className="container">
  <a href="/docs/cse/ingestion/microsoft-windows"><img src={useBaseUrl('img/integrations/microsoft-azure/windows.png')} alt="icon" width="35"/><h4>Microsoft Windows</h4></a>
  <p>Configure collection of Windows Event Log messages and send them to the CSE mapper.</p>
  </div>
 </div>
<div className="box smallbox23 card">
  <div className="container">
  <a href="/docs/cse/ingestion/nginx-access-logs"><img src={useBaseUrl('img/integrations/web-servers/nginx.png')} alt="icon" width="130"/><h4>Nginx Access Logs</h4></a>
  <p>Configure a syslog source to ingest Nginx Access log messages to be parsed by CSE.</p>
  </div>
 </div>
<div className="box smallbox24 card">
  <div className="container">
  <a href="/docs/cse/ingestion/okta"><img src={useBaseUrl('img/integrations/saml/okta.png')} alt="icon" width="60"/><h4>Okta</h4></a>
  <p>Configure an Okta source to ingest Okta log messages and send them to CSE’s system parser.</p>
  </div>
 </div>
<div className="box smallbox25 card">
  <div className="container">
  <a href="/docs/cse/ingestion/onelogin"><img src={useBaseUrl('img/integrations/saml/onelogin.png')} alt="icon" width="40"/><h4>OneLogin</h4></a>
  <p>Learn how to collect OneLogin log messages and send them to Sumo Logic to be ingested by CSE.</p>
  </div>
 </div>
<div className="box smallbox26 card">
  <div className="container">
  <a href="/docs/cse/ingestion/osquery"><img src={useBaseUrl('img/cse/osquery-logo-svg-vector.svg')} alt="icon" width="40"/><h4>Osquery</h4></a>
  <p>Configure an HTTP source to ingest osquery log messages and send them to the CSE system parser.</p>
  </div>
 </div>
<div className="box smallbox27 card">
  <div className="container">
  <a href="/docs/cse/ingestion/palo-alto-firewall"><img src={useBaseUrl('img/integrations/security-threat-detection/pan9.png')} alt="icon" width="40"/><h4>Palo Alto Firewall</h4></a>
  <p>Configure collection of Palo Alto Firewall log messages to be parsed by CSE's system parser.</p>
  </div>
 </div>
<div className="box smallbox28 card">
  <div className="container">
  <a href="/docs/cse/ingestion/sentinelone"><img src={useBaseUrl('img/send-data/sentinelone-icon.png')} alt="icon" width="40"/><h4>SentinelOne</h4></a>
  <p>Learn how to collect SentinelOne log messages and send them to be ingested by CSE.</p>
  </div>
 </div>
<div className="box smallbox29 card">
  <div className="container">
  <a href="/docs/cse/ingestion/signal-sciences-waf"><img src={useBaseUrl('img/cse/signal-sciences.png')} alt="icon" width="40"/><h4>Signal Sciences WAF</h4></a>
  <p>Lean how to collect Signal Sciences WAF log messages and sending them to Sumo Logic to be ingested by CSE.</p>
  </div>
 </div>
<div className="box smallbox30 card">
  <div className="container">
  <a href="/docs/cse/ingestion/symantec-proxy-secure-gateway-blue-coat-proxy"><img src={useBaseUrl('img/send-data/symantec-logo.svg')} alt="icon" width="120"/><h4>Symantec Blue Coat Proxy</h4></a>
  <p>Configure a Syslog source to collect and send Symantec Proxy Secure Gateway (ProxySG) log messages to CSE.</p>
  </div>
 </div>
<div className="box smallbox31 card">
  <div className="container">
  <a href="/docs/cse/ingestion/symantec-proxy-secure-gateway"><img src={useBaseUrl('img/send-data/symantec-logo.svg')} alt="icon" width="110"/><h4>Symantec Proxy Secure Gateway</h4></a>
  <p>Configure a syslog source to ingest Symantec Proxy Secure Gateway log messages to be parsed by CSE.</p>
  </div>
 </div>
<div className="box smallbox32 card">
  <div className="container">
  <a href="/docs/cse/ingestion/zscaler-nss"><img src={useBaseUrl('img/integrations/security-threat-detection/zscaler.png')} alt="icon" width="160"/><h4>ZScaler NSS</h4></a>
  <p>Configure collection of ZScaler NSS log messages to be parsed by CSE's system parser for ZScaler NSS.</p>
  </div>
 </div>
<div className="box smallbox33 card">
  <div className="container">
  <a href="/docs/cse/ingestion/zscaler-private-access"><img src={useBaseUrl('img/integrations/security-threat-detection/zscaler.png')} alt="icon" width="160"/><h4>Zscaler Private Access</h4></a>
  <p>Configure an HTTP source to ingest Zscaler Private Access log messages and send them to CSE's system parser.</p>
  </div>
 </div>
</div>
