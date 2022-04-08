---
id: create-manage-orgs
---

# Create and Manage Orgs

:::note
If you are a Sumo Logic Service Provider, see [Create and Manage Orgs (Service Providers)](create-manage-orgs-service-providers.md).
:::

## Availability

| Account Type | Account Level |
|--------------|--------------------------------------------------------------|
| Credits | Enterprise Operations, Enterprise Security, Enterprise Suite |

:::note
This feature is not enabled by default. If you’d like to have it enabled, contact your Sumo Logic Account Executive.
:::

This topic has information about Sumo Logic’s Organizations (“Sumo Orgs”) feature, which you can use to create and manage orgs. We use the term *parent org* to refer to the org from which you create a new org, and *child orgs* to refer to the orgs you create. 

Sumo Orgs allows you to logically group, provision, and centrally manage and monitor the credits usage of multiple orgs.

When you create a child org, you provision it with credits, based on the ingest volume you estimate for the org. We refer to the different flavors of ingest—Continuous Log Ingest, Frequent Log Ingest, and so on—as *product variables*. When you provision a child org you use a Credits Calculator to estimate and allocate required credits for each product variable. 

We refer to your estimates of ingest capacity required for each product variable as *baselines*. Sumo Logic’s throttling multipliers for logs and metrics are based on these estimates. For example, if you estimate 1GB usage for logs and specify that as the baseline when you create the org, Sumo Logic will start [throttling](../ingestion-and-volume/log-ingestion.md) when ingestion to the org reaches 4 to 10 times the baseline. The multiplier depends on your account size.

Users that have the required role capabilities (described in the following section) can create child orgs under a parent org, and manage and monitor the allocation and consumption of Sumo Logic credits across orgs, and for each child org. This functionality is available in the Sumo Logic UI at **Administration** \> **Organizations** and also in the [Organizations Management API](https://organizations.sumologic.com/docs/).

## Requirements for creating and managing orgs

There are several role capabilities that are required to work with orgs:

* **View Organizations**. This capability is required to view the Organizations UI.
* **Create Organizations**. This capability is required to create or provision child organizations.
* **Change Credits Allocation**. This capability is required to change the credits allocation and baselines for a child organization. 
* **Create Trial Organizations**. This capability is required to create and provision trial organizations. 
* **Upgrade Trial Organizations**. This capability is required to upgrade trial organizations. 

## Create a child org

This section has instructions for creating a child org. 

:::note
After you create a child org, you can’t delete it.
:::

1. Go to **Administration \> Organizations**.
1. Click **+ Add Organization**.

    ![orgs-page-6.png](/img/subscriptions/add-org.png)

1. The **Create New Organization** pane appears.

    ![create-new-org-2.png](/img/subscriptions/create-new-org.png) 
    
    :::note
    The **Credits Usage** portion of the pane shows information you’ll want to know when you assign credits to the new org: **Total Credits Quota** is the total number of credits for your subscription; **Available Credits** is the number of credits that have not yet been allocated to child orgs.
    :::

1. **Organization Name**. Enter a unique name for the org.
1. **Account Owner Email**. Enter the name of the account owner.
1. **Account Owner First Name**. Enter the account owner’s first name.
1. **Account Owner Last Name**. Enter the account owner’s last name.
1. **Deployment**. Select a Sumo Logic deployment from the list.

    :::note
    Depending on your Sumo Logic subscription type, creating an org in a different deployment than the parent may result in a deployment charge being applied.
    :::

1. **Plan Type**. Select your organization's plan type. 
1. Click **Allocate Credits**.
1. The **Credits Calculator** appears.

    ![credits-calculator.png](/img/subscriptions/credits-calculator.png)

1. **Continuous Tier**. Enter estimated daily ingestion to the Continuous tier.
1. **Frequent Tier.** Enter estimated daily ingestion to the Frequent tier.
1. **Infrequent Tier.** Enter estimated daily ingestion to the Infrequent tier.
1. **Metrics**. Enter estimated daily metric data points per minute (DPM) ingestion.
1. **Tracing**. Enter estimated daily ingestion of traces.
1. As you enter the ingestion estimates, the number of credits required for the ingestion levels is incremented. 

    ![calculator.png](/img/subscriptions/calculator1.png)

1. To see a breakdown of the required credits, click **View Breakdown**.

    ![calculator2.png](/img/subscriptions/calculator2.png)

1. The calculator now shows how many credits are associated with the ingestion volume and, as applicable, how many are due to the deployment factor—the upcharge based on the deployment where the org is located.
1. Click **Use This Allocation**.

## Update an org's credits allocation

To change an org's credits allocation:

1. Go to **Administration \> Organizations**.
1. Click the row for the org you want to edit.
1. Click **Edit** in the right hand pane.

    ![edit-pane.png](/img/subscriptions/edit-org-3.png)

1. Click **Modify Allocation**.

    ![modify-allocation-icon.png](/img/subscriptions/modify-allocation-button.png)

1. The **Credits Calculator** appears.
1. Follow the steps in [Create a child org](#create-a-child-org) to update the credits allocation.

## Monitor credits quota and usage

This section has information about how you can monitor credit allocations and consumption across all your orgs, and for each child org.

### View cross-org credits allocation and consumption

You can see what portion of your subscription credits have been allocated and consumed on the **Administration** \> **Organizations** page.

* The **Usage %** column indicates what percentage of overall subscription credits that was allocated to a child org has been consumed.
* The **Credits Capacity** line at the bottom of the page shows the count and percentage of credits, out of your total subscription credits, that have been allocated to child orgs, and the number of allocated credits that have been consumed. 

    ![cross-org-allocations.png](/img/subscriptions/orgs-page-5.png)

### View child org credits allocation and usage

1. Go to **Administration** \> **Organizations**.
1. Click an org in the list of orgs.
1. A pane with details about the org appears on the right side of the page.

    ![view-details.png](/img/subscriptions/view-details.png)

1. The **Credits Usage** section of the pane shows the number and percentage of the credits allocated to the org that have been consumed, along with the total credits that are allocated.
1. Click **View Details** for more information.
1. The **\<org-name\> usage details** popup displays the following information.  

   * **Allocated Credits**. The total number of credits allocated to the org. 
   * **Credits Used**. The number and percentage of allocated credits that have been used.
   * For each Product Variable, the following information is shown. 
   
     * **Credits Used**. Number of allocated credits that have been used for the Product Variable. 
     * **Deployment Charge.** This column is only present if your Sumo Logic subscription includes a deployment charge for child orgs in a different Sumo Logic deployment than the parent org. If present, the column shows the number of credits associated with the Deployment Charge for child org in a different deployment than the parent org.
     * **Usage %**. The percentage of credits allocated to the org that have been used for the Product Variable.
     * **Units**. Shows the volume of log ingest in GB or the DPM (metrics) that is equivalent to the credits used for the Product Variable.        

    ![usage-details-3.png](/img/subscriptions/usage-details-3.png)

## Access a child org

If a [custom subdomain](manage-org-settings.md) has been configured for a child org, and you have an account in the org, you can access it from the **Organizations** UI.

1. Go to **Administration** \> **Organizations**.
1. Click the row for the org you want to access.
1. Click **Access Organization** in the right hand pane.

    ![access-org.png](/img/subscriptions/access-org.png)

## Audit logging for organizations

This section has examples of the messages Sumo Logic writes to the Audit Event Index when you create or update an org.

### OrganizationCreated

```
{"operator":{"email":"PF6gIXhGj33LzP8Ba7kzJkL9EAtz6RuSMYHHKnqbEICUz7PITMdceGFRdQESZ2JwpL7BSbGaOaUYmgADz3USgExa7egWZ8UY2wmm","id":"000000000AEE3701","interface":"INTERNAL","sessionId":"no_session","sourceIp":"54.177.241.252","type":"UserContext"},"organizationIdentity":{"email":"pjain+1ljjjjjlwasdk@sumologic.com","organizationName":"akjdhfjkhwqiue","firstName":"kajsdfh","lastName":"sakjdsh","orgId":"000000000AF45F28","deploymentId":"nite"},"subscriptionDetails":{"startDate":{"year":2020,"month":12,"day":16},"endDate":{"year":2021,"month":5,"day":11},"plan":"SUMO-ENT-SUI","credits":4388,"baselines":{"continuousIngest":1,"continuousStorage":30,"frequentIngest":1,"frequentStorage":30,"infrequentIngest":1,"infrequentStorage":30,"infrequentScan":0,"metrics":1,"cseIngest":0,"cseStorage":0}},"eventType":"Audit","severityLevel":"Info","accountId":"000000000AE07391","eventId":"67718e94-a8a3-4478-b778-975cd0e18e55","eventName":"OrganizationCreated","eventTime":"2020-12-17T04:59:05.584Z","eventFormatVersion":"1.0 beta","subsystem":"organizations"}
```

### OrganizationUpdated

```
{"operator":{"email":"rmVOQ8CwUBuxqDydSLIV2ZljEogPcR7fwZiIShCBldZ5jhEl1c4wLHJhL1j6xkzVPVuqVJFf1c5VUvOMESv4ieY0xrxuVET6JXTw","id":"000000000B0858AE","interface":"INTERNAL","sessionId":"no_session","sourceIp":"122.181.102.148","type":"UserContext"},"organizationIdentity":{"email":"fkonkpjg3z@mail.peaksum.com","organizationName":"QEV9Z3Z","firstName":"ne3ieXF","lastName":"85lZdXD","orgId":"000000000AF35705","deploymentId":"nite"},"from":{"continuousIngest":200,"continuousStorage":30,"frequentIngest":200,"frequentStorage":30,"infrequentIngest":200,"infrequentStorage":30,"infrequentScan":0,"metrics":200,"cseIngest":0,"cseStorage":0},"to":{"continuousIngest":201,"continuousStorage":30,"frequentIngest":200,"frequentStorage":30,"infrequentIngest":200,"infrequentStorage":30,"infrequentScan":0,"metrics":200,"cseIngest":0,"cseStorage":0},"eventType":"Audit","severityLevel":"Info","accountId":"000000000AE07391","eventId":"2f816b83-3f10-434f-b5b9-e73aa223fd5d","eventName":"OrganizationUpdated","eventTime":"2020-12-16T11:29:53.428Z","eventFormatVersion":"1.0 beta","subsystem":"organizations"}
```
