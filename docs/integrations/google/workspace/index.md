---
slug: /integrations/google/workspace
title: Google Workspace
sidebar_label: Google Workspace
description: The Google Workspace App allows you to monitor and analyze activities across all Google Workspace applications from a single location.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Google_Workspace_Logo.svg')} alt="thumbnail icon" width="150"/>

The Google Workspace App allows you to monitor and analyze activities across all Google Workspace applications from a single location. Comprehensive dashboards display information on administrative and user activities, Google Drive usage, and logins.

Dashboards also provide full visibility into alerts from Google Workspace Alert Center, allowing you to investigate and correlate alerts and monitor potential threats across all Google Workspace apps.


## Log and Alert Types

Each Google Workspace app has its own log that tracks actions in JSON format. The logs are all structurally similar. The differences are in the events section of the JSON where the actions are recorded.

The common areas of the logs are:

<table>
  <tr>
   <td><strong>Event</strong></td>
   <td><strong>Description</strong></td>
  </tr>
  <tr>
   <td>Id</td>
   <td>Contains applicationName (for example, drive or admin).</td>
  </tr>
  <tr>
   <td>Actor</td>
   <td>Contains email, which is the Google email address of the person performing the action.</td>
  </tr>
  <tr>
   <td>ipAddress</td>
   <td>The IP address of the user performing the action.</td>
  </tr>
</table>


The events sections of logs are:

## Apps

### Google Workspace Login App

<table>
  <tr>
   <td><strong>Event</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>Login type name
   </td>
   <td>Equivalent of status or type of activity: login_success, logout, or login_failure. In the Login Dashboard, we also have a Panel showing login_failure_type, which displays a reason for the login failure.
   </td>
  </tr>
  <tr>
   <td>login_challenge
   </td>
   <td>Records action related to a Login Challenge for suspicious sign ins. Specific results are logged in the login_challenge_status, where the possible values are Challenge Failed or Challenge Passed. For more information on login_challenge, refer to Google documentation:
<p><a href="https://support.google.com/a/answer/6002699?hl=en">https://support.google.com/a/answer/6002699?hl=en</a></p>
   </td>
  </tr>
</table>



### Google Workspace Admin and Token Apps

These are actions performed by Google site administrators.

<table>
  <tr>
   <td>Event
   </td>
   <td>Description
   </td>
  </tr>
  <tr>
   <td>USER_SETTINGS
   </td>
   <td>These are actions performed at the individual user level, such as CREATE_USER, DELETE_USER, CHANGE_PASSWORD.
<p>A specific type of individual user action is CREATE_DATA_TRANSFER_REQUEST. This typically occurs after a user has been deleted, and the user’s contents, such as Drive, are transferred to that user’s manager.</p>
   </td>
  </tr>
  <tr>
   <td>GROUP_SETTINGS
   </td>
   <td>These are actions such as adding and removing users from groups.
   </td>
  </tr>
  <tr>
   <td>Other
   </td>
   <td>Other types of actions take place, but they are less common (for example, CHROME_OS_SETTINGS, DEVICE_SETTINGS).
   </td>
  </tr>
</table>



### Google Workspace Drive App

The Google Drive app logs come in two types: Access and acl_change. A single user action in Drive may generate several events. Of these, one is the primary event and the rest are side effects of that event. We look for the primary event.

Access types are such as viewing and downloading a document or folder. They also include creating, uploading, renaming, editing, and moving content.

Acl_change types include who can edit a document or folder, including scope changes like what you do here:

<img src={useBaseUrl('img/integrations/google/google_scope.png')} alt="google_scope" />

For document type (doc_type), Google only recognizes its own documents (for example, Document, Spreadsheet, and Presentation). Other document types (such as Excel, PDF, and MP4) are classified as unknown. In a Drive Dashboard Panel, we capture the Google types, and then use the file extension to classify the other types that would otherwise be displayed as unknown.


### Google Workspace Alert Center

Google Workspace Alert Center, allowing you to investigate and correlate alerts and monitor potential threats across all Google Workspace apps. All the alerts are in JSON format. Most of the alerts have few common fields like alertId, customerId, createTime, source, type and data. The differences are in the data section of the JSON where the alert type specific details are recorded. For more information about different alert types refer this Google Workspace [Alert document](https://developers.google.com/admin-sdk/alertcenter/reference/alert-types).
