---
id: application-components
title: Application Components Solution
sidebar_label: Application Components Solution
---

The Application Components Solution allows a better structure and grouping of various application components. This provides the ability to easily monitor and troubleshoot potential issues with applications.

Pre-configured dashboards available for application components solve many common use cases:
* Identifying which part of the infrastructure is experiencing problems.
* Reviewing the overall health of specific components to quickly narrow down the scope of troubleshooting.
* Minimizing the troubleshooting time by providing all relevant information in the right context.

:::caution Limitations
This solution is currently supported for the following apps only:
* [Cassandra](/docs/integrations/databases/cassandra)
* [Elasticsearch](/docs/integrations/databases/elasticsearch)
* [MongoDB](/docs/integrations/databases/mongodb)
* [MySQL](/docs/integrations/databases/mysql)
* [PostgreSQL](/docs/integrations/databases/postgresql)
* [Redis](/docs/integrations/databases/redis)
* [SQL Server](/docs/integrations/microsoft-azure/sql-server)
* [MariaDB](/docs/integrations/databases/mariadb)
* [Memcached](/docs/integrations/databases/memcached)
* [Oracle](/docs/integrations/databases/oracle)
:::

## Installation

To use the Application Components Solution, you'll need to install a Terraform automation script.

The Terraform script performs the following actions:
* Creates Application Components View hierarchy in Explore.
* Sets up Sumo Logic Field Extraction Rules ([FERs](/docs/manage/field-extractions)) to enrich the data.
* Installs Sumo Logic Apps(Database apps and App Components app) in the Admin recommended folder.
* Creates [Fields](/docs/manage/fields).
* Installs Monitors for each of the selected databases.

## Ensure Account Access

1. Before you begin, make sure you have access to the Sumo logic console. You'll need the following permissions:
   * Manage field extraction rules
   * View Fields
   * View field extraction rules
   * Manage Collectors
   * View Collectors
   * Manage Fields
   * Manage connections
   * Manage Content
If you want to deploy in the Admin Recommended folder, you may need [Content Admin](/docs/manage/content-sharing/admin-mode) role.
1. Using these [instructions](/docs/manage/security/access-keys#manage-your-access-keys-on-preferences-page), generate an access key and access ID for a user with the Manage Monitors role capability in Sumo Logic. To identify which deployment your Sumo Logic account is using, see [Sumo Logic Endpoints by Deployment and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).


### Set up your Terraform environment

1. [Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later. To check the installed Terraform version, run the following command:
 ```bash
 terraform --version
 ```
2. Install the latest version of [curl](https://curl.haxx.se/download.html).
3. Install the latest version of the [jq command-line JSON parser](https://github.com/stedolan/jq/wiki/Installation). This is required for running the fields.sh batch file.

### Configure your Terraform script

1. Clone the following Sumo Logic repository:
 ```bash
 git clone https://github.com/SumoLogic/sumologic-solution-templates
 ```
1. Initialize the Terraform working directory by navigating to the directory [sumologic-solution-templates/app-components-observability-terraform](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability-terraform) and then running:
  ```bash
  terraform init
  ```
  This will install the required Terraform providers, including [Null](https://www.terraform.io/docs/providers/sumologic/index.html), [Sumo Logic Terraform Provider](https://www.terraform.io/docs/providers/sumologic/index.html), [Time Provider](https://registry.terraform.io/providers/hashicorp/time/latest/docs), [Random Provider](https://registry.terraform.io/providers/hashicorp/random/latest/docs).
1. By default, all other parameters are set up to automatically collect logs, metrics, install apps and monitors. If you need to override parameters, you can configure or override additional parameters in the [ main.auto.tfvars file](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/main.tf).

### Configure Required Parameters

**Parameter**: `sumologic_environment`<br/>
**Required**: Yes <br/>
**Description**: This is your Sumo Logic Deployment. Enter au, ca, de, eu, jp, us2, in, fed or us1. See <a href="/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security">Sumo Logic Endpoints</a> for more information.

---
**Parameter**: `sumologic_access_id`<br/>
**Required**: Yes <br/>
**Description**: Your Sumo Logic Access ID. See <a href="/docs/manage/security/access-keys#Create_an_access_key">Create an access key</a> for more information.

---
**Parameter**: `sumologic_access_key`<br/>
**Required**: Yes <br/>
**Description**: Your Sumo Logic Access Key, which is used for Sumo Logic API calls. See <a href="/docs/manage/security/access-keys">Sumo Logic Access Key</a> for more information.

---  
**Parameter**: `sumologic_organization_id`<br/>
**Required**: Yes <br/>
**Description**: Your Sumo Logic Organization ID. You can find your org on the Preferences page in the Sumo Logic UI. Your org ID will be used to configure the IAM Role for Sumo Logic AWS Sources. For more information, see <a href="/docs/get-started/sumo-logic-ui">Preferences Page</a>.



### Configure App and Component Parameters

**Parameter**: `apps_folder_installation_location` <br/>
**Required**: No <br/>
**Description**: Specify the location where the sumo logic apps/dashboards will be installed. Allowed values are "Admin Recommended Folder" and "Personal Folder".

---
**Parameter**: `share_apps_folder_with_org` <br/>
**Required**: No <br/>
**Description**: Indicates if Apps folder should be shared (view access) with the entire organization. Set true to enable or false to disable.

---
**Parameter**: `components_on_kubernetes_deployment` <br/>
**Required**: No <br/>
**Description**: Provide comma separated list of application components deployed on kubernetes environment for which sumologic resources needs to be created. Allowed values are "Memcached, Cassandra,elasticsearch,SQL server, MongoDB, MySQL, PostgreSQL, Redis, MariaDB, Couchbase, Oracle".

---
**Parameter**: `components_on_non_kubernetes_deployment` <br/>
**Required**: No <br/>
**Description**: Provide comma separated list of application components deployed on non-kubernetes environment for which sumologic resources needs to be created. Allowed values are "Memcached, Cassandra, Elasticsearch, SQLserver, MongoDB, MySQL, PostgreSQL, Redis, MariaDB, Couchbase, Oracle".

### Configure Monitor parameters

**Parameters**: `memcached_data_source`, `redis_data_source`, `sqlserver_data_source`, `mysql_data_source`, `postgresql_data_source`, `cassandra_data_source`, `couchbase_data_source`, `elasticsearch_data_source`, `mariadb_data_source`, `mongodb_data_source`, `oracle_data_source` <br/>
**Required**: No <br/>
**Description**: Provide cluster filters for each of the component’s monitors. For example, if you want to set up monitors only for cassandra clusters starting with `db_cluster` prefix search in your prod environment, you can set `cassandra_data_source=db_system=cassandra AND db_cluster=prod* and environment=prod`. This assumes you have set the respective tags (`environment`, `db_cluster` and `db_system`) while configuring collection.

---
**Parameter**: `monitors_disabled` <br/>
**Required**: No <br/>
**Description**: Set it to `false` to enable the monitors. By default, they are disabled.

---
**Parameters**: `email_notifications_critical`, `email_notifications_warning`, `email_notifications_missingdata` <br/>
**Required**: No <br/>
**Description**: To send notification from the monitors as email set these parameters for critical, warning and missing data monitors respectively. Update the recipients in the below example.
```json
email_notifications_critical = [
   {
     connection_type       = "Email",
     recipients            = ["abc@example.com"],
     subject               = "Monitor Alert: {{TriggerType}} on {{Name}}",
     time_zone             = "PST",
     message_body          = "Triggered {{TriggerType}} Alert on {{Name}}: {{QueryURL}}",
     run_for_trigger_types = ["Critical", "ResolvedCritical"]
   }
 ]
```

---
**Parameters**: `connection_notifications_critical`, `connection_notifications_warning`, `connection_notifications_missingdata` <br/>
**Required**: No <br/>
**Description**: To configure notification via pagerduty or webhook set these parameters for critical, warning and missing data monitors respectively. See this <a href="/docs/alerts/webhook-connections/set-up-webhook-connections">document</a> for creating payloads with other connection types.
```json
connection_notifications_critical = [
    {
      connection_type       = "PagerDuty",
      connection_id         = "<CONNECTION_ID>",
      payload_override      = "{\"service_key\": \"your_pagerduty_api_integration_key\",\"event_type\": \"trigger\",\"description\": \"Alert: Triggered {{TriggerType}} for Monitor {{Name}}\",\"client\": \"Sumo Logic\",\"client_url\": \"{{QueryUrl}}\"}",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    },
    {
      connection_type       = "Webhook",
      connection_id         = "<CONNECTION_ID>",
      payload_override      = "",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    }
  ]
```

Replace `<CONNECTION_ID>` with the connection id of the webhook connection. The webhook connection id can be retrieved by calling the <a href="https://api.sumologic.com/docs/#operation/listConnections">Monitors API.</a>


### Import existing Fields and FERs

As part of configuring the Application Components solution, we need to create fields in Sumo Logic org. To import any fields that are already present in Sumo Logic into our Terraform state, run a script. To do so, navigate to the [sumologic-solution-templates/aws-observability-terraform](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/application-components/) folder and do the following:

* Set the following environment variables using the commands below:
 ```bash
 export SUMOLOGIC_ENV="YOUR_SUMOLOGIC_DEPLOYMENT"
 export SUMOLOGIC_ACCESSID="YOUR_SUMOLOGIC_ACCESS_ID"
 export SUMOLOGIC_ACCESSKEY="YOUR_SUMOLOGIC_ACCESS_KEY"
 ```
 Provide your Sumo Logic deployment for the `SUMOLOGIC_ENV` variable. For example: au, ca, de, eu, jp, us2, in, fed or us1. For more information on Sumo Logic deployments, see [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
* Run fields.sh using this command:
 ```
 sh fields.sh
 ```

Going forward, do not modify these fields outside of Terraform.


### Deploy the Application Component Solution

Deploy the Application Components Solution using the Sumo Logic Terraform Script.

Navigate to the directory [sumologic-solution-templates/application-components/](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/application-components/) and execute the following commands:

1. Run `terraform validate`. This will validate the configuration files in the directory.
2. Run `terraform plan` to view the sumo resources like monitors,apps,fers,fields and hierarchy which will be created/modified by Terraform.
3. Run `terraform apply`.

At the end of the console output, you should see two links, one for Apps Folder and the other for Monitors Folder. You can click on them to go to the sumo logic portal and view the dashboards and monitors. In case you missed noting down the links after deployment, you can run the `terraform show` command to see those output values again.


## Post Installation

### Configure Metrics and Logs Collection

Refer to the documentation for the app you're using. App Components Solution currently supports:
* [Cassandra](/docs/integrations/databases/cassandra)
* [Elasticsearch](/docs/integrations/databases/elasticsearch)
* [MongoDB](/docs/integrations/databases/mongodb)
* [MySQL](/docs/integrations/databases/mysql)
* [PostgreSQL](/docs/integrations/databases/postgresql)
* [Redis](/docs/integrations/databases/redis)
* [SQL Server](/docs/integrations/microsoft-azure/sql-server)
* [MariaDB](/docs/integrations/databases/mariadb)
* [Memcached](/docs/integrations/databases/memcached)
* [Oracle](/docs/integrations/databases/oracle)


### Configure Fields in Sumo Logic

Create the following Fields in collection sources both for logs and metrics. This ensures that your logs and metrics are tagged with relevant metadata, which the app dashboards require. For information on setting up Fields, see the [Fields](/docs/manage/fields) topic.

* `component`
* `environment`
* `db_system`
* `db_cluster`
* `db_cluster_address`
* `db_cluster_port`

### Configuring or updating email notifications

If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other people or services by [adding a monitor](/docs/alerts/monitors/create-monitor).

There are limits to how many alerts can be enabled - see the [Alerts FAQ](/docs/alerts/monitors/monitor-faq.md).


## Uninstalling the Solution

To uninstall the Application Components solution deployed using Terraform, navigate to the directory https://github.com/SumoLogic/sumologic-solution-templates/blob/master/application-components and execute the command:
```
terraform destroy
```

This will destroy all resources and configuration previously set up.

Sometimes if the fields are used in other resources like FERs, other collection sources then those fields will not be deleted.


## View Application Components Dashboards and Alerts

This section shows how to use Explore and navigate Application Components hierarchy to view the pre configured dashboards. As you investigate resources, data appears in the window on the right. Metric and log data are viewable on the same dashboard in one seamless view.


### Navigate Application Components View

Explore is an out-of-the-box Sumo Logic navigation tool that provides an intuitive visual representation of your environment.

To open Explore and Application Components View:
1. Log in to Sumo Logic and click **+ New** on the top menu bar.
1. From the dropdown menu, choose **Explore**. The Explore navigation panel appears on the left.
1. Click the **Explore By** arrow and select **Application Components View** from the dropdown menu. An expandable list of your AWS environment hierarchy appears in the Explore panel.
1. With the Application Components view selected in Explore, select an environment to view a list of its components.
**Application Components - Environments Overview** appears on the right. This dashboard provides insights into the CRUD activities and monitor errors of each of the components in that environment.
1. Similarly from the expanded environment select a component.
The **Application Components - Database System Overview** dashboard appears in the window on the right. The dashboard provides an at-a-glance view of the different database engines present in the database component and insights on errors occurring across different engines.
1. And then keep on going down the hierarchy to specific entities for each of the components to view dashboards at more granular levels.


## Frequently Asked Questions

#### How do I configure the solution for new databases that are already running terraform?
Assuming your last terraform application run was successful and you have the tfstate file locally. You can add new components in `components_on_non_kubernetes_deployment` or `components_on_kubernetes_deployment` parameters and rerun `terraform apply`.

#### How do I update the solution if a new version gets released?
1. Back up your Application Component Solution - Apps folder and Application Component Solution - Monitor folder by exporting the content.
2. Pull the master branch of [the repository](https://github.com/SumoLogic/sumologic-solution-templates/) and run `terraform apply`. It will update all the apps, FERs, hierarchies, fields, and monitors.
3. The above step will deploy new dashboards and new monitors, so after migrating your custom content to these new dashboards, you can delete old FERs and dashboards.

#### How do I view changes introduced in the new version?
See the [CHANGLELOG.md file](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/application-components/CHANGELOG.md) for bug fixes or enhancements in the latest solution version.

#### How do I view all resources created by the solution?  
See the [RESOURCES.md file](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/application-components/RESOURCES.md) to view all resources and modules present in the solution.

#### If I already have data flowing into Sumo Logic, how do I migrate to this solution?
Existing customers have to perform the below steps:
1. Add `db_cluster_address` and `db_cluster` port in their telegraf configuration as mentioned in the respective component’s collection doc. This is for tagging metrics.
2. Add `db_cluster_address` and `db_cluster_port` in the sumologic source for logs as mentioned in the respective component’s collection doc.
3. Import the existing fields using fields.sh script in Step 4 and follow Step 1, 2, 3, and 5 under [Installation](#installation) to deploy the solution.
4. The above step will deploy new dashboards and new monitors, so after migrating your custom content to these new dashboards, you can delete old FERs and dashboards.
