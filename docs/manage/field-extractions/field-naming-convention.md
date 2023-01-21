---
id: field-naming-convention
title: Field Naming Convention
description: Sumo Logic recommends using the following naming convention for standard fields.
---


Sumo Logic recommends using the following naming convention for standard fields. This best practice creates standardization across your deployment for use with Field Extraction Rules (FER), Searches and Dashboards, makes it easier for users to recognize fields by their names, and can even improve search performance.

For example, if you create your own FER for Source IP, and at some point you want to count by Source IPs across multiple Sources, you can easily do so because you've used the same name for the field across all Sources. In your query, simply use:

```sql
| count by src_ip
```

Another benefit of using the standard field naming convention is that [Sumo Logic Apps](/docs/get-started/apps-integrations) are created using this naming convention. So if you use it too, your queries will match those of the Sumo Logic Apps’ pre-configured searches and Dashboards.

If you cannot use all the naming conventions for standard fields, we recommend that you at least use the field name conventions for the following:

* Source Hosts
* Destination Hosts
* IP address
* user

## Source Information

| Field Name | Description |
|:--|:--|
| src_host | Source Host (name or IP) |
| src_interface  | Source Interface |
| src_ip | Source IP |
| src_port | Source Port (string type) |
| src_user | Source Username |
| src_zone | Source Zone (mostly for firewall messages) |

## Destination Information

| Field Name | Description |
|:--|:--|
| dest_host | Destination Host (name or IP) |
| dest_ip | Destination IP |
| dest_port | Destination Port (string type) |
| dest_user | Destination Username |
| dest_zone | Destination Zone (mostly for firewall messages) |
| user | Also Destination Username (for backward compatibility) |

## Reporting Device

| Field Name | Description |
|:--|:--|
| reporting_device | The hostname of the reporting device, such as a firewall, router, or switch |
| reporting_device_ip | The IP address of the reporting device |

## Network Information

| Field Name | Description |
|:--|:--|
| bytes | Number of bytes sent and received |
| bytes_recv | Bytes received |
| bytes_sent | Bytes sent |

## IDS

| Field Name | Description |
|:--|:--|
| application | Application |
| category | Threat category, such as virus or Trojan |
| threat | Threat name, for example, virus |
| vulnerability  | Vulnerability |

## Antivirus

| Field Name | Description |
|:--|:--|
| application | Application |
| category | Threat category, such as virus or Trojan |
| threat | Threat name, for example, virus |
| vulnerability  | Vulnerability |

## Activity

| Field Name | Description |
|:--|:--|
| action | Final action by the device, such as blocked, dropped, or passed by firewall |
| orig_action | The original (first) action by the device |

## Miscellaneous

| Field Name | Description |
|:--|:--|
| count | Used to save some aggregated number (type: int) |
| device_product | The product name, for example, Windows 2012 |
| device_type | Values used include firewall or IDS |
| device_vendor  | The vendor name, for example, Microsoft |
| generator | The name of the base/incident search that generates the event |
| service | The name of a service |
| update | The name of the software update |
