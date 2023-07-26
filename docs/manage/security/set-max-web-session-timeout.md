---
id: set-max-web-session-timeout
title: Set a Maximum Web Session Timeout
description: Learn how to set the maximum web session timeout that a Sumo Logic user can select on the Preference page.
---


Sumo Logic users can set their web session timeout on the **Preferences** page, up to a maximum of 7 days. If you are a Sumo Logic admin with the **Manage Organizational Settings** role capability, you can specify the maximum web session timeout period that users in your org can select. The period you choose controls what values appear on the **Web session timeout** pulldown on a user’s **Preferences** page. 

When you change the maximum timeout:

* The maximum you specify will apply to all new user accounts going forward. 
* If a user has a selected session timeout that is longer than the new maximum, the user's timeout will be reduced to the new maximum timeout. 
* Any user sessions that have been inactive longer than the new limit will be terminated.

To configure a maximum web session timeout for users in your org:

1. Go to **Administration** > **Security** > **Policies**.

    ![set-session-timeout.png](/img/security/set-session-timeout.png)

1. Click in the **Session Timeout** field to see a list of timeout periods.
1. Select the a timeout period from the list. 

    ![set-session-timeout-menu-selection.png](/img/security/set-session-timeout-menu-selection.png)    
