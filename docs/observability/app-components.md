---
id: app-components
title: Application Components Solution
sidebar_label: Application Components Solution
---

<!-- N.M. to finish-->

The Application Components Solution allows a better structure and grouping of various application components. This provides the ability to easily monitor and troubleshoot potential issues with applications.

Pre-configured dashboards available for application components solve many common use cases:
* Identifying which part of the infrastructure is experiencing problems.
* Reviewing the overall health of specific components to quickly narrow down the scope of troubleshooting.
* Minimizing the troubleshooting time by providing all relevant information in the right context.


## Deploy and Configure the Application Components Solution

These instructions help you prepare and set up the Application Components Solution using a Terraform script.

The Terraform script performs the following actions:

* Creates Application Components View hierarchy in Explore.
* Sets up Sumo Logic Field Extraction Rules ([FERs](/docs/manage/Field-Extractions)) to enrich the data.
* Installs Sumo Logic Apps(Database apps and App Components app) in the Admin recommended folder.
* Creates [Fields](/docs/manage/fields).
* Installs Monitors for each of the selected databases.


### Installation and using the automation script

#### Prerequisites

For this setup, complete the following steps:

1. Make sure you have access to the Sumo logic console. The user account associated with a Sumo Logic role needs the following permissions:
   * Manage field extraction rules
   * View Fields
   * View field extraction rules
   * Manage Collectors
   * View Collectors
   * Manage Fields
   * Manage connections
   * Manage Content
2. Using these [instructions](/docs/manage/Security/Access-Keys#manage-your-access-keys-on-preferences-page), generate an access key and access ID for a user with the Manage Monitors role capability in Sumo Logic. Please identify which deployment your Sumo Logic account is in using this[ link](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
3. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).


#### Set up the Terraform environment

[Download and install Terraform 0.13](https://www.terraform.io/downloads.html) or later

To check the installed Terraform version, run the following command:
```bash
$ terraform --version
```

#### Configure the Terraform script

1. Clone the repository [https://github.com/SumoLogic/sumologic-solution-templates](https://github.com/SumoLogic/sumologic-solution-templates):
 ```bash
 $ git clone https://github.com/SumoLogic/sumologic-solution-templates
 ```
1. Initialize the Terraform working directory by navigating to the directory **[sumologic-solution-templates/app-components-observability-terraform](https://github.com/SumoLogic/sumologic-solution-templates/tree/master/aws-observability-terraform)** and running terraform init.
  ```bash
  $ terraform init
  ```
  This will install the required Terraform providers, including [Null](https://www.terraform.io/docs/providers/sumologic/index.html), [Sumo Logic Terraform Provider](https://www.terraform.io/docs/providers/sumologic/index.html), [Time Provider](https://registry.terraform.io/providers/hashicorp/time/latest/docs), [Random Provider](https://registry.terraform.io/providers/hashicorp/random/latest/docs).
1. By default, all other parameters are set up to automatically collect logs, metrics, install apps and monitors. If you need to override parameters, you can configure or override additional parameters in the **[sumologic-solution-templates/app-component-observability-terraform/main.tf](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/aws-observability-terraform/main.tf)**
1. Configure the below Sumo Logic parameters:

<table>
  <tr>
   <td>
<strong>Parameter</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td>sumologic_environment
   </td>
   <td><a href="/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security">Sumo Logic Deployment</a>
<p>Enter au, ca, de, eu, jp, us2, in, fed or us1. See <a href="/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security">Sumo Logic Endpoints and Firewall Security</a> for more information on Sumo Logic deployments.</p>
   </td>
  </tr>
  <tr>
   <td>sumologic_access_id
   </td>
   <td><a href="/docs/manage/Security/Access-Keys">Sumo Logic Access ID</a>
<p>Sumo Logic Access ID. See <a href="/docs/manage/Security/Access-Keys#Create_an_access_key">Create an access key</a> in the <em>Access Keys</em> topic for more information.</p>
   </td>
  </tr>
  <tr>
   <td>sumologic_access_key
   </td>
   <td><a href="/docs/manage/Security/Access-Keys">Sumo Logic Access Key</a>
<p>Sumo Logic Access Key used for Sumo Logic API calls. See <a href="/docs/manage/Security/Access-Keys">Sumo Logic Access Key</a> for more information.</p>
   </td>
  </tr>
  <tr>
   <td>sumologic_organization_id
   </td>
   <td><a href="/docs/get-started/sumo-logic-ui">Sumo Logic Organization ID</a>
<p>You can find your org on the <strong>Preferences</strong> page in the Sumo Logic UI. For more information, see the <a href="/docs/get-started/sumo-logic-ui">Preferences Page </a>topic. Your org ID will be used to configure the IAM Role for Sumo Logic AWS Sources.</p>
   </td>
  </tr>
</table>



#### Configuring Alert Parameters

After the package has been extracted, navigate to the package directory `terraform-sumologic-sumo-logic-monitor/monitor_packages/postgresql/`.

The Terraform script installs the alerts without any scope filters, if you would like to restrict the alerts to specific clusters or environments, update the variable `postgresql_data_source`. Custom filter examples:

1. A specific cluster `db_cluster=postgresql.prod.01`
2. All clusters in an environment `environment=prod`
3. For alerts applicable only to a specific cluster, your custom filter would be:  `db_cluster=postgresql-.prod.01`
4. For alerts applicable to all clusters that start with postgresql-prod, your custom filter would be: `db_cluster=postgresql-prod*`
5. For alerts applicable to a specific cluster within a production environment, your custom filter would be:

**`db_cluster=postgresql-1 and environment=prod*`* (This assumes you have set the optional environment tag while configuring collection)

All monitors are disabled by default on installation, if you would like to enable all the monitors, set the parameter **`monitors_disabled`** to false in this file.

By default, the monitors are configured in a monitor folder called “PostgreSQL”, if you would like to change the name of the folder, update the monitor folder name in this file.

If you would like the alerts to send email or connection notifications, configure these in the file **`postgresql_notifications.auto.tfvars`**. For configuration examples, refer to the next section.


#### Configuring Email and Connection Notification Configuration Examples

To **configure notifications**, modify the file `postgresql_notifications.auto.tfvars` file and fill in the connection_notifications and email_notifications sections. See the examples for PagerDuty and email notifications below. See this [document](/docs/manage/connections-integrations/Webhook-Connections/Set-Up-Webhook-Connections) for creating payloads with other connection types.


#### Pagerduty Connection Example

```sql
connection_notifications = [
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


Replace `<CONNECTION_ID>` with the connection id of the webhook connection. The webhook connection id can be retrieved by calling the [Monitors API](https://api.sumologic.com/docs/#operation/listConnections).


#### Email Notifications Example:

```
email_notifications = [
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



### Deploy the Application Component Observability Solution using the Sumo Logic Terraform Script

Navigate to the directory **sumologic-solution-templates/app-component-observability-terraform** and execute the following commands:

1. Run **terraform init. **This will initialize Terraform and will download the required components.
2. Run **terraform plan **to view the sumo resources like monitors,apps,fers,fields and hierarchy which will be created/modified by Terraform.
3. Run **terraform apply**.


## Post Installation

### Configure Metrics and Logs Collection

Configure Metric and Logs collection for your database. Supported for:

* Cassandra
* Couchbase
* Elasticsearch
* MongoDB
* MySQL
* PostgreSQL
* Redis
* SQL Server
* MariaDB
* Memcached
* Oracle

See [Databases](/docs/integrations/databases) for more info.


### Configure Fields in Sumo Logic

Create the following Fields in collection sources both for logs and metrics. This ensures that your logs and metrics are tagged with relevant metadata, which the app dashboards require. For information on setting up Fields, see the [Fields](/docs/manage/fields) topic.

* `component`
* `environment`
* `db_system`
* `db_cluster`
* `db_cluster_address`
* `db_cluster_port`

Configuring or updating email notifications

If you haven’t enabled alerts and/or configured notifications through the Terraform procedure outlined above, we highly recommend enabling alerts of interest and configuring each enabled alert to send notifications to other people or services. This is detailed in Step 4 of [this document](/docs/alerts/Monitors#Add_a_monitor).


## Uninstalling the Solution

To uninstall the AWS Observability solution deployed using Terraform, navigate to the directory **sumologic-solution-templates/app-component-observability-terraform** and execute the command:
```bash
$ terraform destroy
```
This will destroy all resources and configuration previously set up.


## FAQ

Migrating or Using existing.

How to configure it for new databases, when they are running terraform apply for the second time.

How to update the Solution if a new version gets released?

How to view new changes in the new version?
