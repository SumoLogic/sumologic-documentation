---
id: create-custom-entity-type
title: Create a Custom Entity Type
sidebar_label: Custom Entity Types
description: Learn how to create a custom Entity type.
---

This topic has instructions for how to create custom Entity types in CSE.

In CSE, *Entities* are fundamental to the Insight generation process. When a CSE Rule fires, it generates a Signal for each “on-Entity” attribute configured for the rule. CSE correlates Signals by Entity to create Insights. This process is described in the [Insight Generation Process](/docs/cse/get-started-with-cloud-siem/insight-generation-process/) topic.

CSE has a number of built-in [Entity types](/docs/cse/records-signals-entities-insights/view-manage-entities#about-entities), for example, IP Address, Hostname, and Username.

When you create a Rule, in the Signal configuration section, the Rules Editor prompts you to select an “On-Entity” attribute from a list of all of the CSE schema attributes that hold Entities. What if you want to correlate Signals by something other than an item that is one of CSE standard Entity types? That’s what custom Entity types are for.

If you’d like to be able to correlate Signals by a different type of Entity, you can create a custom Entity type. For example, you might want to correlate Signals by file hash. When you create a custom Entity type, you identify the CSE schema attributes that hold data of the custom type. Given the example of a file hash Entity type, you would select attributes that contain file hashes, like `file_hash_md5`, `file_hash_sha1`, and so on. The attributes you configure for your custom Entity type will be available in the **On-Entity** selector list in the **Then Create a Signal** section of the rule configuration UI. 

Just as for Entities of built-in types listed above—IP addresses, MAC addresses, hostnames, and so on—when a rule fires on a custom Entity, if the Entity doesn’t already exist in CSE, it is added, and can be viewed on the Entity list page.

To create a custom Entity type:

1. Click the gear menu and choose **Custom Types** from the **Entities** column.<br/>![custom-types-option.png](/img/cse/custom-types-option.png)
1. Click **Create** on the **Custom Entity Types** page. <br/>![custom-types-page.png](/img/cse/custom-types-page.png)
1. The **Create Custom Entity Type** popup appears. <br/>![create-custom-entity-type.png](/img/cse/create-custom-entity-type.png)
1. **Name**. Enter a meaningful name for the custom Entity type. The name can include alphanumeric characters and spaces. The name you enter will appear as the **Name** of the custom Entity type on the **Custom Entity Type** page. 
1. **Identifier**. Enter a unique identifier for the custom Entity type. The Identifier can include lowercase alphanumeric characters. The Identifier of the Entity type doesn’t appear in the CSE UI, but is used by the CSE backend.
    :::note
    The Entity type Identifier cannot be changed once you’ve saved it.
    :::
1. **Fields**. Use the dropdown list to select the schema attribute or attributes you want to associate with the custom Entity type.
1. Click **Create**.
