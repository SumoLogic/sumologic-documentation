---
id: create-custom-threat-intel-source
title: Create a Custom Threat Intelligence Source
sidebar_label: Create a Custom Threat Intelligence Source
description: Learn how to create and manage custom threat sources.
---


import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has information about setting up a *custom threat intelligence source* in CSE, which is a threat intelligence list that you can populate manually, as opposed to using an automatic feed. 

You can set up and populate custom threat intelligence sources interactively from the CSE UI, by uploading a .csv file, or using CSE APIs. You can populate the sources with IP addresses, hostnames, URLs, email addresses, and file hashes.

Watch this micro lesson to learn more about Cloud SIEM threat intelligence.

<Iframe url="https://www.youtube.com/embed/-DHQ2IBy5Ko?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe'; 

### How CSE uses indicators

When CSE encounters an indicator from your threat source in an incoming
Record it adds relevant information to the Record. Because threat intelligence
information is persisted within Records, you can reference it downstream
in both rules and search. The built-in rules that come with CSE
automatically create a Signal for Records that have been enriched in
this way.

Rule authors can also write rules that look for threat intelligence information in Records. To leverage the information in a rule, you can extend your custom rule expression, or add a Rule Turning Expression to a built-in rule. For a more detailed explanation of how to use threat intelligence information in rules, see [Threat Intelligence](/docs/cse/rules/about-cse-rules/#threat-intelligence) in the
*About CSE Rules* topic.

### Create a threat intelligence source from CSE UI

1. Click the Content menu and select **Threat Intelligence**.
1. Click **Add Source** on the **Threat Intelligence** page. <br/><img src={useBaseUrl('img/cse/threat-intel-page2.png')} alt="Threat Intelligence page" width="800"/>
1. Click **Custom** on the **Add Source** popup. <br/><img src={useBaseUrl('img/cse/custom-button.png')} alt="Custom button" width="600"/>
1. On the **Add New Source** popup, enter a name, and if desired, a description for the source. <br/><img src={useBaseUrl('img/cse/add-custom-source.png')} alt="Add new source" width="600"/>
1. Click **Add Custom Source**.

Your new source should now appear on the **Threat Intelligence** page.

### Enter indicators manually

1. On the **Threat Intelligence** page, click the name of the source you want to update.  <br/><img src={useBaseUrl('img/cse/click-name.png')} alt="Click name" width="800"/>
1. The **Details** page lists any indicators that have previously been added and have not expired. Click **Add Indicator**. <br/><img src={useBaseUrl('img/cse/threat-details.png')} alt="Threat details" width="800"/>
1. On the **New Threat Intelligence Indicator** popup.
    1. **Value**. Enter an IP address, hostname, URL, or file hash.
        Your entry must be one of:
        * A valid IPV4 or IPv6 address  
        * A valid email address
        * A valid, complete URL
        * A hostname (without protocol or path)
        * A hexadecimal string of 32, 40, 64, or 128 characters 
    1. **Description**. (Optional)
    1. **Expiration**. (Optional) If desired, you can specify an
        expiration date and time for the indicator. When that time is
        reached, the indicator will be removed from the source. When you
        click in the field, you’ll be prompted to select a date and
        time.
    1. Click **Add**.

### Upload a file of indicators 

If you have a large number of indicators to add to your source, you can
save time by creating a .csv file and uploading it to CSE. <br/><img src={useBaseUrl('img/cse/import-indicators.png')} alt="Import indicators" width="400"/>

#### Create a CSV file

The .csv file can contain up to three columns, which are described below. 

| Column     | Description  |   
| :-- | :-- |
| value  | Required. Must be one of the following: <br/>- A valid IPV4 or IPv6 address<br/>- A valid, complete URL <br/>- A valid email address<br/>- A hostname (without protocol or path)<br/>- A hexadecimal string of 32, 40, 64, or 128 characters |
| description | Optional.  |  
| expires| Optional. The data and time when you want the indicator to be removed, in any ISO date format. |
| active | Required. Specifies whether the indicator actively looks for threat intelligence in Records. Valid values are `true` or `false`. |

**Example .csv file**

```
value,description,expires,active
22.333.22.252,Tante Intel,2022-06-01 01:00 PM,true
```

### Upload the file

1. On the **Threat Intelligence** page, click the name of the target custom source.
1. Click **Import Indicators**.
1. On the import popup:
    1. Drag your file onto the import popup, or click to navigate to the file, and then click Import.
    1. Optionally, you can enter an expiration for the indicators on the list. If you do, it will override any expirations that are defined in the file. Enter the expiration in any ISO date format. For example: `2022-12-31`

### Manage sources and indicators using APIs

You can use CSE threat intelligence APIs to create and manage indicators and custom threat sources. For information about CSE APIs and how to access the API documentation, see [Cloud SIEM APIs](/docs/cse/administration/cse-apis/).  
 
