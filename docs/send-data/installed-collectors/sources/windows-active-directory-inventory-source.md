---
id: windows-active-directory-inventory-source
title: Windows Active Directory Inventory Source
sidebar_label: Windows Active Directory Inventory Source
description: A Windows Active Directory Inventory Source collects inventory data from Active Directory Database.
keywords:
    - windows-active-directory-inventory
    - cloud-SIEM-enterprise
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A Windows Active Directory Inventory Source collects inventory data from [Active Directory Database](https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2003/). This includes information such as computer names, user names, email addresses, and location information.

[Cloud SIEM Enterprise](/docs/cse) uses information from Windows Active Directory Inventory to enrich log data to help provide additional context and build a more complete profile of your network, for example, by connecting the dots between a location, and the servers, workstations, and users in that location.

:::note
The Installed Collector with the Windows Active Directory Inventory Source can be installed on a Domain Controller or a server that is a member of the domain.  

This Source is available with Collector version 19.351-4 and later.
:::

The following information is collected:

* Username
* Email address
* Departments to which employee belongs
* Employee’s manager
* Security groups to which the employee is assigned, which allows Cloud SIEM Enterprise to determine the privileges the user has on the company network

:::note
Install a single Active Directory Source to collect inventory data from the entire AD domain.
:::

To configure a Windows Active Directory Inventory Source:

1. In Sumo Logic, select **Manage Data > Collection > Collection**.
1. Find the Installed Collector you'd like to add the Source to. Click **Add** and then choose** Add Source** from the pop-up menu.
1. Click **Windows Active Directory Inventory**.<br/><img src={useBaseUrl('/img/send-data/windows-ad-inventory-source-icon.png')} alt="Windows Active Directory Inventory icon" width="125"/>
1. Set the following:   

  ![windows ad source input.png](/img/send-data/windows-ad-source-input.png)

   * **Name.** Type the name for the new Source. 
   * **Description** is optional.
   * **Fetch Interval**. By default, Active Directory is queried for data every 24 hours (86400 seconds). You can select a more frequent interval, but it shouldn't be more frequent than every 10 hours (36000 seconds).
   * **Source Category.** Enter a string used to tag the output collected from this Source with searchable metadata. For example, typing **web_apps** tags all the logs from this Source in the sourceCategory field, so running a search on `_sourceCategory=web_apps` would return logs from this Source. For more information, see [Metadata Naming Conventions](/docs/send-data/reference-information/metadata-naming-conventions.md) and our [Best Practices: Good and Bad Source Categories](/docs/send-data/best-practices#good-and-bad-source-categories). You can define a Source Category value using system environment variables, see [Configuring sourceCategory using variables](local-windows-event-log-source.md) below.
   * **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value. You need to set the following fields.
   * `_siemVendor`: Microsoft
   * `_siemProduct`: Windows
   * `_siemForward`: true
   * `_siemDataType`: Inventory

     * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
     * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

   * **Active Directory Attributes**. (Optional)
     * **Additional Attributes**. Provide a semi-colon separated list of the LDAP Names of Active Directory attributes to report, in addition to the default list:

       * Username
       * Email address   
       * Departments to which employee belongs
       * Employee’s manager    
       * Security groups to which the employee is assigned

     * **Excluded Attributes**. Provide a semi-colon separated list of the LDAP Names of Active Directory attributes to exclude from the report.
     *  **Exclude Distinguished Name Suffixes**. Provide a semi-colon separated list of Distinguished Name suffixes. When set, the Source won't ingest any records that contain the Distinguished Name suffixes specified.
     *  **Directory Filter**. Specifies a filter to use when searching for Domain Objects in Active Directory.
   *  * Create any Processing Rules you'd like for the new Source.
1. Click **Save**.

You can return to this dialog and edit the settings for the Source at any time.

## Configuring sourceCategory using variables
Collector versions 19.216-22 and later allow you to define Source Category and Source Host metadata values with system environment variables from the host machine.

:::note
Not all Sources can define a Source Host value.
:::

When configuring your Source, specify the system environment variables by prepending sys. and wrapping them in double curly brackets `{{}}` in this form:

```bash
{{sys.VAR_NAME}}
```

Where VAR_NAME is an environment variable name, for example:

```bash
{{sys.PATH}}
```

You can use multiple variables, for example:

```bash
{{sys.PATH}}-{{sys.YourEnvVar}}
```

![img](/img/send-data/environment-variable-usage.png)

:::tip
The example above uses a hyphen (`-`) character to separate variable components. Separator characters are not required. Curly brackets and spaces are not allowed. Underscores and hyphens are recommended.
:::

You can incorporate text in the metadata expression, for example:

```bash
AnyTextYouWant_{{sys.PATH}}_{{sys.YourEnvVar}}
```

If a user-defined variable doesn’t exist, that portion of the metadata field will be blank.
