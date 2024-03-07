---
id: enterprise-audit
title: Sumo Logic Enterprise Audit Apps
sidebar_label: Enterprise Audit (multiple apps)
description: The Sumo Logic Enterprise Audit Apps present information on account management activities, user activities, and management of library content (searches, dashboards/reports, and folders) in your Sumo Logic account.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/security/cloud-siem.png')} alt="icon" width="55"/>

The Sumo Logic Enterprise Audit Apps are JSON-based to provide for more meaningful audit messages. The Apps generate queries that are compatible with the new Sumo Logic Audit Event Index. The Enterprise Audit Apps do not support the previous version of the audit index. For information on available datasets and related source categories, see [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index).

## Prerequisites

The Audit Event Index is only available for Trial and Enterprise accounts.

| Account Type    | Account Level      |
| :--------- | :-------- |
| Cloud Flex    | Trial, Enterprise    |
| Credits | Trial, Enterprise Operations, Enterprise Suite, Enterprise Security |

## Enterprise Audit Apps

Enterprise Audit Apps utilize predefined searches and Dashboards that provide visibility into your environment. The following Enterprise Audit Apps present information on account management activities, user activities, as well as management of library content (searches, dashboards/reports, and folders) for your Sumo Logic account:

* [Enterprise Audit - Collector and Data Forwarding Management App](#enterprise-audit---collector-and-data-forwarding-management-app) presents information on Collector, Sources activities, and data forwarding trends by destination types.<br/><img src={useBaseUrl('img/integrations/sumo-apps/data_collection.png')} alt="Thumbnail icon" width="55"/>

* [Enterprise Audit - Content Management App](#enterprise-audit---content-management-app) provides information on content activities, such as content that is created, updated, deleted, imported, exported, copied, moved, publicly accessed, made visible to the public, and application installed.<br/><img src={useBaseUrl('img/integrations/sumo-apps/content.png')} alt="Thumbnail icon" width="55"/>

* [Enterprise Audit - User & Role Management App](#enterprise-audit---user-and-role-management-app) provides visibility on user activities such as creating, deleting, and modifying user roles, email account, and password changes. You can also review various user session data.<br/><img src={useBaseUrl('img/integrations/sumo-apps/user_role.png')} alt="Thumbnail icon" width="55"/>

* [Enterprise Audit - Security Management App](#enterprise-audit---security-management-app) provides visibility into security posture, such as Access Key Activities, SAML Activities, Password Policy, Multi-Factor Authorization (MFA), and Service AllowList activities within your Sumo Logic Environment.<br/><img src={useBaseUrl('img/integrations/sumo-apps/SumoAuditSecurity.png')} alt="Thumbnail icon" width="55"/>

Audit data is not backfilled to any time before Enterprise Audit was installed. The Audit Event Index is enabled by default.

## Installing Enterprise Audit Apps

import AppInstallNoDataSourceV1 from '../../reuse/apps/app-install-sumo-apps.md';

<AppInstallNoDataSourceV1/>

## Viewing Enterprise Audit App Dashboards

Each dashboard has a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard.

You can use filters to drill down and examine the data on a granular level.

Each panel has a set of filters that are applied to the results for that panel only, as shown in the following example. Click the funnel icon in the top panel menu bar to display a list of panel-specific filters.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Dashboard_filter.png')} alt="test" />

### Enterprise Audit - Collector and Data Forwarding Management App

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Collector_Data_Forwarding_icon.png')} alt="test" />

Enterprise Audit - Collector and Data Forwarding Management App Dashboards present information on Collector, Sources activities, and data forwarding trends by destination types. This App has the following two dashboard categories:
* Collector Management
* Data Forwarding Management


#### Collector Management Overview Dashboard

Enterprise Audit - Collector Management Overview Dashboard provides a high-level view of trends related to collector and source activities, collector upgrade requests, upgrade successes and failures, the number of ephemeral collectors created and deleted, and the number of clobber collectors that were deleted.

Use this dashboard to:
* Review collector types, both hosted and installable.
* Review distributions by interface from where operation are performed, whether collector, UI, or API.
* Review 7-Day trends for various collector and collector source activities.
* Get the number of ephemeral collectors that were created and deleted, as well as the number of requested collector upgrades and clobber collectors that were deleted.
* Navigate to a dashboard and view more detailed information by clicking a panel.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Collector_Management_Overview.png')} alt="test" />


#### Collector Activities Dashboard
Enterprise Audit - Collector Activities Dashboard provides detailed information on collector activities, such as top users by activity and a one-day time comparison. You can also review data on recent collector activities and upgrades, and use pre-populated filters for a granular view of selected data.

Use this dashboard to:
* Review the geographic locations where activities are performed.
* Review the activities of top users and by a one-day time comparison.
* Analyze data for recent activities, collector upgrades, deleted clobber collectors, and all collector activities.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Collector_Activities.png')} alt="test" />


#### Collector Sources Activities Dashboard

Enterprise Audit - Collector Sources Activities Dashboard provides detailed information on created, updated and deleted sources, the top collectors where sources were added, active users, and one-day time comparisons. You can use pre-populated filters for a more granular view of selected data.

Use this dashboard to:
* Review the geographic location where activities were performed.
* Review one-day time shift comparisons, active users, source type distribution, and the top collectors where sources were added.
* Analyze data for sources recently added to a collector using local configuration management, and sources activities for all collectors.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Collector_Sources_Activities.png')} alt="test" />


#### Data Forwarding Management Overview Dashboard

Enterprise Audit - Data Forwarding Management Overview Dashboard provides an at-a-glance view of trends for destination types and the distribution of destination types, such as  Amazon S3, hitachi, Syslog, and Generic REST. Visual representations for the distribution of data forwarding destinations and data forwarding indexes are also shown.

Use this dashboard to:
* Assess destination type trends.
* Track data forwarding destination and data forwarding index activities.
* Get a high-level view of active and inactive Amazon S3 indexes and encrypted Amazon S3 indexes.
* Get an overview of the distribution of data source types and format type for data forwarding.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Data_Forwarding_Management_Overview.png')} alt="test" />


#### Data Forwarding Destination Activities Dashboard

Enterprise Audit - Data Forwarding Destination Activities Dashboard provides detailed information on data forwarding destination activities. You can review trends for activities, their geographical locations, one-day times shift comparisons, user activity, and recent destination activities. For a more granular view of the data, you can use the pre populated filters.

Use this dashboard to:

* Review data forwarding destination trends and the geographic locations from where the activities were performed.
* Get an at-a-glance overview of user activity and one-day time shift comparisons.
* Review data for all recent destination activities.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Data_Forwarding_Destination_Activities.png')} alt="test" />


#### Data Forwarding Index Activities Dashboard

Enterprise Audit - Data Forwarding Index Activities Dashboard provides detailed information about data forwarding indexes that were created using partitions and scheduled views. You can review trends, geographical locations for data forwarding index activities, one-day time shift comparisons, user activities, as well as data on disabled indexes and recent index activities. For a more granular analysis of the data, you can use the pre-populated filters.

Use this dashboard to:

* Review trends for data forwarding index activities and the geographic locations where the activities were performed.
* Get an at-a-glance view of user activity, one-day time shift comparisons, and the number of data forwarding index that have been disabled.
* Review data on all recent activities.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Data_Forwarding_Index_Activities.png')} alt="test" />


### Enterprise Audit - Content Management App

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Content_Management_icon.png')} alt="test" />

Enterprise Audit - Content Management App Dashboards provide information on content activities, such as content that is created, updated, deleted, imported, exported, copied, moved, publicly accessed, made visible to the public, and application installed.


#### Content Management Overview Dashboard

Enterprise Audit - Content Management Overview Dashboard provides a high-level view of system activities with data on content activities over time, top applications, top content, publicly accessed content, and exported content. You can also view data on user activity and top content on which permission are added and deleted.

Use this dashboard to:

* Review 7 Day trends for all content activities.
* Review the top content that is exported, updated, and is visible and accessed publicly.
* Review data for installed applications.
* Review the data for top users and those who are admins.
* Review data for recent content on which permission is added and removed.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Content_Management_Overview.png')} alt="test" />


#### Created, Deleted, Exported, Imported Content Dashboard

Enterprise Audit - Created, Deleted, Exported, Imported Content Dashboard provides detailed information on content that is created, deleted, exported, and imported. The dashboard is organized according to activities performed by users in User Mode and Content Administrator Mode. You can view more granular data using pre-populated filters for Event Type, Content Type and Admin Mode.

Use the dashboard to:

* View data on the activities of regular users and admin users side by side.
* View the geographic locations for all the activities.
* Review data on top users and content types.
* Review data on recent activities and 7 Day trends.
* Filter for more granular data on users, IPs, content type, and name.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Created_Deleted_Exported_Imported_Content.png')} alt="test" />


#### Updated, Moved, Copied Content Dashboard

Enterprise Audit- Updated, Moved, Copied Content Dashboard provides detailed information about content that is updated, moved and copied. The dashboard is organized according to activities performed by users in User Mode and Content Administrator Mode. You can view more granular data using pre-populated filters for Event Type, Content Type and Admin Mode.

Use the dashboard to:

* Quickly view activities happening in User Mode and Admin Mode side by side.
* Geo Location for all the activities.
* Get a look at Top users and Top Content Type.
* Review 7 Days trend for all the activities.
* Recent activities which can be filtered based on User, User Ip, content Name.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Updated_Moved_Copied_Content.png')} alt="test" />


#### Permission Updated, Synchronized Content Dashboard

Enterprise Audit- Permission Updated, Synchronized Content Dashboard provides detailed information on content permissions that have been added or deleted, as well as content that has been synchronized. The dashboard is organized according to Content Synchronization and Content Permissions.

Use this dashboard to:

* Get an at-a-glance view of Top Content and Top Users based on activities, such as updated permissions and synchronized content.
* Review the 7 Days Trend for added and deleted permissions, and synchronized content.
* Analyze recent activities for synchronized content and updated permissions.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Permission_Updated_Synchronized.png')} alt="test" />


#### Publicly Accessed, Application Installed Dashboard

Enterprise Audit- Publicly Accessed, Application Installed Dashboard provides detailed information on installed applications, shared and publicly accessed content. The dashboard is organized according to installed applications and publicly accessed content. For a more granular view of the data, you can filter on Event Type, Content Type, Admin Mode, Visibility using the pre-populated filters.

Use this dashboard to:

* Get an at-a-glance view of the geographical locations of installed applications, as well as where content was accessed publicly.
* Analyze data on content that’s recently been accessed publicly and content with visibility changes.
* Review the trend of events for all activities.
* Analyze one-day time shift comparisons.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Publicly_Accessed_Application_Installed.png')} alt="test" />


#### Field Extraction Rule Activities Dashboard

Enterprise Audit - Field Extraction Rule Activities Dashboard provides detailed information on the geographic location, active users, recent activities, trends, and one day time shift comparison for Field Extraction Rules. You can analyze more granular data using the pre-populated filters.

Use this dashboard to:
* Review data on user field extraction rule activity.
* Analyze one-day time shift comparisons.
* Get an at-a-glance view of the geographical locations of field extraction rule events.
* Review field extraction rule trends.
* Analyze data on recent field extraction rule events.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Field_Extraction_Rule_Activities.png')} alt="test" />


### Enterprise Audit - User and Role Management App

<img src={useBaseUrl('img/integrations/sumo-apps/EA_User_Role_Management_icon.png')} alt="test" />

Enterprise Audit - User and Role Management App Dashboards provide visibility on user activities such as creating, deleting, and modifying user roles, email account, and password changes. You can also review various user session data.


#### User & Role Management Overview Dashboard

User & Role Management Overview DashBoard provides an at-a-glance view of user activities and sessions, email account requests, and trends over time. You can also review user role data, such as user activities by role.

Use this dashboard to:
* Get an at-a-glance view of user activities, and activities over time.
* Monitor user sessions and role activities.
* Review top users by activity and top users across all activities.
* Click a panel to view more granular data.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_User_Role_Management_Overview.png')} alt="test" />


#### User Activities Dashboard

Enterprise Audit- User Activities Dashboard provides detailed information about user activities, including top admins, one-day time comparison, and recent events. For a granular view of data, you can filter by event name and user active status using pre-populated filters.

Use this dashboard to:
* Review activity trends and the geographic locations where activities are performed.
* Review user activities, such as top admins, recent activities performed by admins, and one-day time comparisons.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_User_Activities.png')} alt="test" />


#### Role Activities Dashboard

Enterprise Audit- Role Activities DashBoard provides detailed information on activities by user role, such as top capabilities, admin role activities, and recent events. For a granular view of data, you can filter by event name and system using pre-populated filters.

Use this dashboard to:

* Review activity trends and the geographic locations where activities are performed.
* Get an overview of the top capabilities added to roles, top admins performing activities, system defined roles, user defined roles, and recent role activities performed by admins.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Role_Activities.png')} alt="test" />


#### User Session Activities Dashboard

Enterprise Audit - User Session Activities DashBoard provides detailed information on user session activities, such as locked and unlocked account activities, top admins, current logged in and logged out users, and timed out users. For a more granular view of the data, you can filter by event name using the pre-populated filters.

Use this dashboard to:

* Review the number of logged in users, logged out users, locked out users, timed out users, and the geographic location where the activities were performed.
* Get an overview of the authentication source for login comparison, one-day time shift comparisons, recent activities, and all activities.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_User_Session_Activities.png')} alt="test" />


#### User (Email, Password) Activities Dashboard

User(Email, Password) Activities DashBoard provides detailed information on user password and email activities, such as password changes, password resets by admins, and user email change requests and changes. For a more granular view of the data, you can filter by event name using the pre-populated filters.

Use this dashboard to :

* Review trends for password and email changes, as well as the top admins performing password resets.
* Get an overview of the recent password resets and email changes, and the geographic locations where all email and password activities were performed.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_User_Email_Password_Activities.png')} alt="test" />


#### User Role Relationship Activities Dashboard

Enterprise Audit - User Role Relationship Activities Dashboard provides detailed information on activities for user and role modification. You can review the top users that were added to and removed from roles, the top roles from which users were added and removed, and the top admins.

Use this dashboard to:

* Review the top users added to and removed from roles, and top roles added to and removed from users.
* Get a high-level view of the active admins, recent role and user modifications, as well as the geographic locations where all user role relationship activities were performed.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_User_Role_Relationship_Activities.png')} alt="test" />


### Enterprise Audit - Security Management App

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Security_Management_icon.png')} alt="test" />

Enterprise Audit - Security Management App Dashboards provide visibility into security posture, such as Access Key Activities, SAML Activities, Password Policy, Multi-Factor Authorization (MFA), and Service AllowList activities within your Sumo Logic Environment.


#### Security Management Overview Dashboard

Enterprise Audit - Security Management Overview Dashboard provides an at-a-glance view of security activities over time, user activity, the number of users who have been enabled and disabled MFA, and the geographic locations of security activities.

Use this dashboard to:

* Review the distribution of access keys, SAML configuration and allow list user activities.
* Get an overview of the geographic locations for all security activities.
* Review security activity trends and a breakdown of active users by events.
* See a tabulation of the number of Users who enabled and disabled Multi factor Authorization.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Security_Management_Overview.png')} alt="test" />


#### Password Policy, MFA, Service AllowList Activities Dashboard

Enterprise Audit - Password Policy, MFA, Service AllowList Activities Dashboard provides detailed information about password policy creation, deletion, and updates. It also provides a high-level view of users that enable and disable multi factor authorization (MFA), service allowlist updates, as well as user and admin activities.

Use this dashboard to:

* Get an overview of the geographic locations of all security related activities, as well as geographic locations for all allowlist users.
* Review recent activities related to password policy updates, allowlist permission activities, allowlist user activities, and admin activities.
* Review the lists of recent users who enabled and disabled MFA.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Password_Policy_MFA_Service_AllowList.png')} alt="test" />


#### Access Key Activities Dashboard

Enterprise Audit - Access Key Activities DashBoard provides detailed information about access key activities, such as creation, deletion, and updates. You can also review trends, user activity, the number of active access keys, and one-day time comparisons. For more granular data, such as type of event or access key status, you can use the predefined filters.

Use this dashboard to:

* Review access key trends and the geographic locations where the activities were performed.
* Get an overview of user activity, active and inactive access keys, and one-day time comparisons.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_Access_Key_Activities.png')} alt="test" />


#### SAML Activities Dashboard

Enterprise Audit - SAML Activities Dashboard provides detailed information about SAML activities, such as SAML lockdown and SAML configuration. You can also review AllowList user activities such as creating, deleting, and updating allowlists. You can view more granular data for an activity using the predefined filters.

Use this dashboard to:
* Review SAML Lockdown trends, AllowList User and SAML configuration activities.
* Get an overview of the geographic locations from where SAML activities are performed.
* Review admin activities and one-day time shift comparisons.

<img src={useBaseUrl('img/integrations/sumo-apps/EA_SAML_Activities.png')} alt="test" />
