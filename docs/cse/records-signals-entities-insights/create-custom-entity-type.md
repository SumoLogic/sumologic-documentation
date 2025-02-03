---
id: create-custom-entity-type
title: Create a Custom Entity Type
sidebar_label: Custom Entity Types
description: Learn how to create a custom entity type.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for how to create custom entity types in Cloud SIEM.

In Cloud SIEM, *entities* are fundamental to the insight generation process. When a Cloud SIEM rule fires, it generates a signal for each “on-entity” attribute configured for the rule. Cloud SIEM correlates signals by entity to create insights. This process is described in the [Insight Generation Process](/docs/cse/get-started-with-cloud-siem/insight-generation-process/) topic.

Cloud SIEM has a number of built-in [entity types](/docs/cse/records-signals-entities-insights/view-manage-entities#about-entities), for example, IP Address, Hostname, and Username.

When you create a rule, in the signal configuration section, the rules editor prompts you to select an “on-entity” attribute from a list of all of the Cloud SIEM schema attributes that hold entities. What if you want to correlate signals by something other than an item that is one of Cloud SIEM standard entity types? That’s what custom entity types are for.

If you’d like to be able to correlate signals by a different type of entity, you can create a custom entity type. For example, you might want to correlate signals by file hash. When you create a custom entity type, you identify the Cloud SIEM schema attributes that hold data of the custom type. Given the example of a file hash entity type, you would select attributes that contain file hashes, like `file_hash_md5`, `file_hash_sha1`, and so on. The attributes you configure for your custom entity type will be available in the **On-Entity** selector list in the **Then Create a Signal** section of the rule configuration UI. 

Just as for entities of built-in types listed above—IP addresses, MAC addresses, hostnames, and so on—when a rule fires on a custom entity, if the entity doesn’t already exist in Cloud SIEM, it is added, and can be viewed on the entity list page.

To create a custom entity type:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Entities** select **Custom Types**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Entities** select **Custom Types**. You can also click the **Go To...** menu at the top of the screen and select **Custom Types**.  
1. On the **Custom Entity Types** tab click **+ Add Custom Type**. 
2. The **Add Custom Entity Type** popup appears. <br/><img src={useBaseUrl('img/cse/create-custom-entity-type.png')} alt="Create custom entity type" style={{border: '1px solid gray'}} width="400"/>
3. **Name**. Enter a meaningful name for the custom entity type. The name can include alphanumeric characters and spaces. The name you enter will appear as the **Name** of the custom entity type on the **Custom Entity Type** page. 
4. **Identifier**. Enter a unique identifier for the custom entity type. The Identifier can include lowercase alphanumeric characters. The Identifier of the entity type doesn’t appear in the Cloud SIEM UI, but is used by the Cloud SIEM backend.
    :::note
    The entity type Identifier cannot be changed once you’ve saved it.
    :::
5. **Fields**. Use the dropdown list to select the schema attribute or attributes you want to associate with the custom entity type.
6. Click **Save**.
