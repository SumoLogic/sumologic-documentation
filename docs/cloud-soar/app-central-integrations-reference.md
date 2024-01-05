---
id: app-central-integrations-reference
title: App Central Integrations Reference
sidebar_label: App Central Integrations Reference
description: This article contains a list of all integrations available in App Central.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

This article lists the integrations available in App Central in Cloud SOAR. You can install these integrations so you can use their actions in playbooks. For more information, see [App Central](/docs/cloud-soar/automation/#app-central). 

Many of these integrations are also available in [App Central in the Automation Service](/docs/platform-services/automation-service/automation-service-app-central/).

## A

### AbuseIPDB

<img src={useBaseUrl('img/cloud-soar/app-central-integrations/abuseipdb-logo.png')} alt="AbuseIPDB logo"  width="100" />

Enrich IP addresses with reputation information gathered from AbuseIPDB.

#### Actions

* IP Reputation (Enrichment) - Gather IP reputation information (only for Cloud SOAR)
* IP Reputation V2 (Enrichment) - Gather IP reputation information
 
#### Notes

* Results of the IP reputation check can be saved in .csv file format (only for Cloud SOAR)
* Multiple searches with any keyword in the comments
 
#### Change Log

* June 19, 2020 - First upload
* August 26, 2021 - Action updated: IP Reputation
* February 20, 2023 (v1.2)
   * Updated integration: (Updated the integration Fields with Environmental Variables)
* October 6, 2023 (v1.3)
   * Added new action: IP Reputation V2
   * Changed fields visibility
   * Fixed Typo
 
Sumo Logic
Version 1.3
Updated
06/10/23

### Active Directory

<img src={useBaseUrl('img/cloud-soar/app-central-integrations/active-directory-logo.png')} alt="Active Directory logo"  width="100" />

Utilize user, group, and system information from Microsoft Active Directory.

#### Actions

* System Attributes (Enrichment) - Gather system attributes
* User Attributes (Enrichment) - Gather user attributes
* Group Attributes (Enrichment) - Gather group attributes
* Users Groups (Enrichment) - Gather user's groups
* Create User (Containment) - Create a new user
* Reset Password (Containment) - Reset a user's password
* Set Password (Containment) - Set a new password
* Set System Attributes (Containment) - Set a system's attribute
* Set User Attributes (Containment)- Set a user's attributes
* Change System OU (Containment) - Change a system's organizational unit (OU)
* Enable User (Containment) - Enable a user account
* Disable User (Containment) - Disable a user's account
* Remove Users From Groups (Containment) - Remove users from AD group
* Get Groups Members (Containment) - retrieve users from AD group
* Add Users To Groups (Containment) - Add a user to a group
* User Attributes V2 (Enrichment)- Gather user attributes v2

#### External Libraries

* [LDAP3](https://github.com/cannatag/ldap3/blob/master/LICENSE.txt)

#### Change Log

* December 19, 2019 - First upload
* November 9, 2020 - Added new actions
* October 27, 2021 - Added new actions
* June 07, 2022- Updated action:
   * User Attributes V2 (updated the output)
* July 7, 2023 (v1.2)
   * Integration renamed from Active Directory OIF to Active Directory
   * Updated the integration with Environmental Variables
* December 19, 2023 (v1.3)
   * Updated action: User Attributes V2
      * Now, with the User Attributes V2 Action, users can be filtered based on their distinguishedName (DN)

Sumo Logic
Version 1.3
Updated
19/12/23

### Active Directory V2

<img src={useBaseUrl('img/cloud-soar/app-central-integrations/microsoft-logo.png')} alt="Microsoft logo"  width="100" />

Utilize user, group, and system information from Active Directory.   
Microsoft Active Directory v2 supports both LDAP over TLS and StartTLS.

#### Actions

* Get System Attributes (Enrichment) - Gather system attributes
* Get User Attributes (Enrichment) - Gather user attributes
* Group Attributes (Enrichment) - Gather group attributes
* List Users Groups (Enrichment) - Gather user's groups
* Create User (Containment) - Create a new user
* Reset Password (Containment) - Reset a user's password
* Set Password (Containment) - Set a new password
* Set User Attributes (Containment) - Set a system's attribute 
* Set User's Attributes (Containment) - Set a user's attributes
* Change System OU (Containment) - Change a system's organizational unit (OU)
* Enable User (Containment) - Enable a user account
* Disable User (Containment) - Disable a user's account
* Remove Users From Groups (Containment) - Remove users from AD group
* Get Groups Members (Containment) - Retrieve users from AD group
* Add Users To Groups (Containment) - Add a user to a group
 
#### Notes

Compatibility notice:
* LDAP over TLS only work on 636, 3269 (secure) ports but STARTTLS; only work with 389, 3268 (non-secure ports).
* LDAP over TLS required to have a CA Certificate of the active directory as Base64 encoded format.

#### External Libraries

* [LDAP3](https://github.com/cannatag/ldap3/blob/master/LICENSE.txt)

#### Change Log

* March 25, 2021 - First upload
* March 11, 2022 - Logo
* June 21, 2023 (v2.1) - Updated the integration with Environmental Variables
* December 19, 2023 (v2.2)
   * Updated action: User Attributes
      * Now, with the User Attributes Action, users can be filtered based on their distinguishedName (DN)

Sumo Logic
Version 2.2
Updated
19/12/23

## B

## C

## D

## E

## F

## G

## H

## I

## J

## K

## L

## M

## N

## O

## P

## Q

## R

## S

### Sumo Logic CSE

<img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-logo.png')} alt="Sumo Logic logo" width="100" />

Utilize CSE entities to correlate Signals and Insights through Sumo Logic CSE integration.

#### Actions

* Add Comment To Insight (Notification) - Add a comment to an existing Insight
* Add Enrichment Insight (Notification) - Add enrichments to Insights
* Add Network Block (Containment) - Add an address into the Network Blocks
* Add Tag To Insight (Notification) - Add tags to the Insight
* Assign User To Insight (Enrichment) - Assign a user to the Insight
* Check Insight Status Schedule (Scheduled) - Schedule action that periodically checks if the Insight is closed
* Close Insight Trigger (Trigger) - Trigger action that is executed whenever an Incident is closed
* List Entities (Enrichment) - List Entities
* Get Entity (Enrichment) - Get Entity details
* Get Insight (Enrichment) - Get Insight details
* Get Signal (Enrichment) - Get Signal details
* Sumo Logic Insights Daemon (Daemon) - Daemon to retrieve the latest Insights
* Sumo Logic Signals Daemon (Daemon) - Daemon to retrieve the latest Signals
* Update Insight Status (Enrichment) - Update the insight status
* Update Insight Tag Trigger (Trigger) - Trigger action that is executed whenever an Incident is edited
* Add Enrichment Entity (Notification) - Add enrichments to Entity
* Add Enrichment Signal (Notification) - Add enrichments to Signal
* Assign User To Insight (Notification) - Add specific user to an Insight
* Get Insight Comments (Enrichment) - Get comments for an Insight
* Get Insight V2 (Enrichment) - Get Insight details v2
* List Indicators (Enrichment) - List all Indicators
* List Insights (Enrichment) - List all Insights
* List Signals (Enrichment) - List all Signals
* List Network Block (Enrichment) - List all Blocked Networks
* Sumo Logic Insights Daemon Extended (Daemon) - Daemon to retrieve the latest Insights, extended version
* Add Related Incident To Insight Converted From Triage (Trigger) - Executed when an Incident is Converted from Triage
* Add Related Incident To Insight (Trigger) - Trigger action that is executed whenever a new incident is created
* Add Related Triage To Insight (Trigger) - Trigger action that is executed whenever a triage is grab
* Add Relation To Insight (Notification) - Add Relation of Incident/triage into Insight
* Get Relation Of Insight (Enrichment) - Get Relation Of Insight
* Remove Relation From Insight (Notification) - Remove incident/triage Relation From Insight
* List Users (Enrichment) - Get a list of users
* Update Insight (Notification) - Update the insight Assignee, Status, Severity, and Tags
* Create Insight From Signals (Notification) - Create Insight From Signal IDs
 
#### Sumo Logic CSE Configuration 

1. To configure the Sumo Logic CSE, log into the application, expand the user info from the bottom left menu and click Preferences. 
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-0.png')} alt="Sumo Logic CSE 0" style={{border: '1px solid gray'}} width="200" />
1. From the preferences screen, in the section My Access Keys, click on Add Access Key. 
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-1.png')} alt="Sumo Logic CSE 1" style={{border: '1px solid gray'}} width="600" />
1. Populate the name and click Create Key
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-2.png')} alt="Sumo Logic CSE 2" style={{border: '1px solid gray'}} width="400" />
1. Copy the Access ID and Access Key and store them (temporally) into a text editor.   
NOTE: They won't be available again once you close this screen.
1. Click Done after you copied the Access ID and Access Key
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-3.png')} alt="Sumo Logic CSE 3" style={{border: '1px solid gray'}} width="400" />

#### Sumo Logic CSE in Cloud SOAR

1. To configure the Sumo Logic Cloud SOAR, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-4.png')} alt="Sumo Logic CSE 4" style={{border: '1px solid gray'}} width="300" />
1. In the Automation section, on the left menu, click Integrations.
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-5.png')} alt="Sumo Logic CSE 5" style={{border: '1px solid gray'}} width="300" />
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the "+" button to add new Resource.
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-6.png')} alt="Sumo Logic CSE 6" style={{border: '1px solid gray'}} width="500" />
1. Populate the resource fields as indicated.
* Label: The  name of the resource
* Sumo Logic API URL: URL to the API of the CSE instance (https://api.sumologic.com) 
* Sumo Logic CSE URL: URL to the CSE instance (https://service.sumologic.com/sec) 
* Access ID: The access ID that you copied earlier
* Access Key: The access key that you copied earlier
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-7.png')} alt="Sumo Logic CSE 7" style={{border: '1px solid gray'}} width="400" />
1. Click Test Saved Settings.
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-8.png')} alt="Sumo Logic CSE 8" style={{border: '1px solid gray'}} width="400" />
1. You should receive a successful notification in the bottom right corner.
<br/><img src={useBaseUrl('img/cloud-soar/app-central-integrations/sumo-logic-cse-9.png')} alt="Sumo Logic CSE 9" style={{border: '1px solid gray'}} width="400" />

For detailed API documentation visit [https://help.sumologic.com/APIs](https://help.sumologic.com/docs/api/). 


#### Category

SIEM

#### Change Log

* March 26, 2021 - First Upload
* April 6, 2021 - New actions uploaded
* October 1, 2021 - New actions uploaded
* October 18, 2021 - New actions uploaded
* October 27, 2021 - New actions uploaded
* March 17, 2022 - New action: Update Insight
* February 17, 2023 (v1.3)
* Updated Daemon: Sumo Logic Insights Daemon Extended
* September 19, 2023 (v1.4) - Updated the integration with Environmental Variables
* September 26, 2023 (v1.5) - Updated Daemon: Sumo Logic Signals Daemon
* October 3, 2023 (v1.6) - Updated Daemon: Sumo Logic Insights Daemon Extended
* October 4, 2023 (v1.7) - Updated Daemon: Sumo Logic Insights Daemon
* November 24, 2023 (v1.8)
   * Updated Sumo Logic Insights Daemon Extended and Sumo Logic Insights Daemon (Updated the query, now it only retrieves data from the past 1 hour instead of 24 hours)
   * Expanded output mappings for the following Actions/Daemons 
   * Get Signal
   * Get Insight V2
   * Sumo Logic Signals Daemon
   * Sumo Logic Insights Daemon
   * Sumo Logic Insights Daemon Extended
* December 12, 2023 (v1.9)
   * Added new Action - Create Insight From Signals
   * Updated Add Enrichment Insight, Add Enrichment Entity, and Add Enrichment Signal actions based on the following points: 
      * Now text information can be included as enrichment
   * Updated the enrichment field to accept either the output.raw or any other JSON format
   * Added additional fields: reputation, expiresAt and externalUrl
   * Updated the field Fields Name/Path To Extract to enable the extraction of field values from the JSON by using either the Path or Field Name

Sumo Logic
Version 1.9
Updated
12/12/23

## T

## U

## V

## W

## X

## Y

## Z

