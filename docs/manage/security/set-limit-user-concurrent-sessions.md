---
id: set-limit-user-concurrent-sessions
title: Set a Limit for User Concurrent Sessions
description: To prevent abandoned user sessions and increase account security by limiting the number of concurrent sessions each user can have open.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

User Concurrent sessions refer to the number of interactive, UI based, sessions an individual user can have open and active per Sumo Logic account. Users may create multiple user sessions as they log in to an account from different browser types and devices. By default, there are no limits applied to the number of concurrent sessions a user may create. 

To enhance the security of an account an Administrator can apply a limit to the number of concurrent sessions a user may have open to between 1 and 100. When a user attempts to authenticate to Sumo Logic and open a new session beyond the defined limit, the user will be automatically signed out of their oldest inactive session. 

To configure this option, you must be a Sumo Logic Administrator or have the "Manage organization settings" [role capability](/docs/manage/users-roles).

To configure a concurrent sessions limit:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Password Policy**. 
1. Click the checkbox in the **Per User Concurrent Sessions Limit** section.
1. Enter a value from 1 to 100 in the **Number of concurrent sessions** field.  <br/><img src={useBaseUrl('img/security/policies-page.png')} alt="Per User Concurrent Sessions Limit section on the Policies tab" style={{border: '1px solid gray'}} width="600" />
   :::note
   The limit you configure will take effect upon the user's next login. 
   :::
