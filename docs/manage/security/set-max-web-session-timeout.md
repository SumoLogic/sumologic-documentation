---
id: set-max-web-session-timeout
title: Set a Maximum Web Session Timeout
description: Learn how to set the maximum web session timeout that a Sumo Logic user can select on the Preference page.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic users can set their web session timeout on the **Preferences** page, up to a maximum of 7 days. If you are a Sumo Logic admin with the **Manage Organization Settings** role capability, you can specify the maximum web session timeout period that users in your org can select. The period you choose controls what values appear on the **Web session timeout** pulldown on a user’s **Preferences** page. 

When you change the maximum timeout:

* The maximum you specify will apply to all new user accounts going forward. 
* If a user has a selected session timeout that is longer than the new maximum, the user's timeout will be reduced to the new maximum timeout. 
* Any user sessions that have been inactive longer than the new limit will be terminated.

To configure a maximum web session timeout for users in your org:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Password Policy**. <br/><img src={useBaseUrl('img/security/set-session-timeout.png')} alt="User Session Timeout section on the Policies tab" style={{border: '1px solid gray'}} width="<insert-pixel-number>" /> 
1. Click in the **Session Timeout** field to see a list of timeout periods.
1. Select the a timeout period from the list. <br/><img src={useBaseUrl('img/security/set-session-timeout-menu-selection.png')} alt="Timeout periods dropdown menu" style={{border: '1px solid gray'}} width="800" />
