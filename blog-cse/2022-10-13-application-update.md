---
title: October 13, 2022 Application Update
hide_table_of_contents: false
image: /img/sumo-square.png
keywords:
  - sumo logic
  - service release notes
  - cloud siem
  - cse
tags: [cloud siem release notes, application update, announcement]
authors:
  - name: Peter Kazmir
    title: Principal Product Manager, Security Applications
    url: https://github.com/pkazmir-sumo
---


## Announcement: Standard Match Lists Migration to Entity Tags

Currently, CSE defines a set of standard Match Lists as a way to allow users to specify lists of Entities and other indicators that should affect whether or not Rules create Signals. However, starting next week, the Rules included with CSE will begin transitioning to leverage Entity tags for this purpose instead. Tags on Entities are more flexible and can also provide context to analysts during the investigation phase.

Next week, a new set of standard tag schemas will be introduced in CSE. These tag schemas will correspond to the existing standard Match Lists:

<table>
  <tr>
    <th>Key</th>
    <th>Allowed Values</th>
    <th>Equivalent Match List</th>
  </tr>
  <tr><td rowspan="8">_deviceGroup</td><td>admin</td><td>admin_ips</td></tr>
  <tr><td>awsAdmin</td><td>AWS_admin_ips</td></tr>
  <tr><td>business</td><td>business_ips</td></tr>
  <tr><td>gcpAdmin</td><td>GCP_admin_ips</td></tr>
  <tr><td>googleWorkspaceAdmin</td><td>Google_Workspace_admin_ips</td></tr>
  <tr><td>salesforceAdmin</td><td>salesforce_admin_ips</td></tr>
  <tr><td>sandbox</td><td>sandbox_ips</td></tr>
  <tr><td>scanTarget</td><td>scanner_targets</td></tr>
  <tr><td rowspan="6">_deviceService</td><td>dns</td><td>dns_servers<br/>dns_servers_dst<br/>dns_servers_src</td></tr>
  <tr><td>ftp</td><td>ftp_servers</td></tr>
  <tr><td>smtp</td><td>smtp_servers</td></tr>
  <tr><td>sql</td><td>sql_servers</td></tr>
  <tr><td>ssh</td><td>ssh_servers</td></tr>
  <tr><td>telnet</td><td>telnet_servers</td></tr>
  <tr><td rowspan="8">_deviceType</td><td>authServer</td><td>auth_servers<br/>auth_servers_dst<br/>auth_servers_src</td></tr>
  <tr><td>lanScanner</td><td>lan_scanner_exception_ips</td></tr>
  <tr><td>nms</td><td>nms_ips</td></tr>
  <tr><td>paloAltoSinkhole</td><td>palo_alto_sinkhole_ips</td></tr>
  <tr><td>proxyServer</td><td>proxy_servers<br/>proxy_servers_dst<br/>proxy_servers_src</td></tr>
  <tr><td>vpnServer</td><td>vpn_servers</td></tr>
  <tr><td>vulnerabilityScanner</td><td>vuln_scanners</td></tr>
  <tr><td>webServer</td><td>http_servers</td></tr>
  <tr><td rowspan="3">_networkType</td><td>guest</td><td>guest_networks</td></tr>
  <tr><td>nat</td><td>nat_ips</td></tr>
  <tr><td>vpn</td><td>vpn_networks</td></tr>
  <tr><td rowspan="6">_userGroup</td><td>awsAdmin</td><td>AWS_admin_users</td></tr>
  <tr><td>dsReplication</td><td>ds_replication_authorized_users</td></tr>
  <tr><td>gcpAdmin</td><td>GCP_admin_users</td></tr>
  <tr><td>googleWorkspaceAdmin</td><td>Google_Workspace_admin_users</td></tr>
  <tr><td>kerberosDowngrade</td><td>downgrade_krb5_etype_authorized_users</td></tr>
  <tr><td>salesforceAdmin</td><td>salesforce_admin_users</td></tr>
</table>

(There are five standard match lists *not* affected by this change, as they do not contain Entities. These include: business_asns, business_domains, business_hostnames, threat, and verified_uri_paths.)

**Beginning Thursday, October 20**, the contents of the standard match lists listed above will automatically be copied to tags set on the individual entities. So, for example, if an Entity `1.2.3.4` is in match list `sql_servers`, a tag `_deviceService:sql` will be set on it. CSE will continue to automatically create these tags from the standard match lists for a period of 3 months, **until January 20, 2023**. During this period, pre-defined rules will be updated to reference these tags instead of the standard match lists, so by the end of this period all rules will be updated and CSE will no longer automatically create these tags.

**Please update any process you use to maintain the members of standard match lists by January 20, 2023 to maintain standard Entity tags instead (or in addition).** We highly recommend you take advantage of Entity Groups to set Entity tags rather than individually setting tags. Entity Groups enable the automatic application of attributes like tags based on the Entity's value, IP address range, or inventory group.

Note that you cannot extend the standard tag schemas (for example, you cannot add a value `azureAdmin` to `_userGroup`). (The underscore prefix in the schema name means it's a system-defined schema.) Instead, create a different tag schema (such as `customUserGroup`) with such extended values.

You can refer to Entity tags in Rule expressions. For example, if you've attached the tag `_deviceService:sql` to an Entity, this statement will return "true" if that Entity is listed in a Record's `srcDevice_ip` field:
```
array_contains(fieldTags["srcDevice_ip"], "_deviceService:sql")
```
Additional information about the standard tag schema, match lists, Entity groups, and using these features with Rules is available in the [Cloud SIEM Documentation](/docs/cse).

### Minor Changes and Enhancements

* [New] Users can now filter object lists based on tag schema. The list results will include all objects that have a tag that are part of that schema. For example, if you search for `_networkType` (from the note above) the list results will include any object that has a tag of `_networkType:guest`, `_networkType:nat`, and/or `_networkType:vpn`.

### Resolved Issues

* Entity relationships were not taking sensor zones into account properly.
* Entity details pages were only briefly displaying the proper Criticality.
* The Entities Count links on the Entity Criticality list pages were pointing at the wrong URLs.
