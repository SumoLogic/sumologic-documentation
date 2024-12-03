---
id: create-manage-orgs-service-providers
title: Create and Manage Orgs (Service Providers)
description: For Sumo Logic Service Providers, Sumo Orgs eases the process of provisioning and managing POV Trial orgs in multiple Sumo Logic deployments.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

## Availability

| Account Type | Account Level |
|:--------------|:--------------------------------------------------------------|
| Credits | Enterprise Operations, Enterprise Security, Enterprise Suite |

:::note
This feature is not enabled by default. If you’d like to have it enabled, contact your Sumo Logic Account Executive.
:::

This topic has information about Sumo Logic’s Organizations (“Sumo Orgs”) feature for Sumo Logic Service Providers. Sumo Orgs allows you to logically group, provision, and centrally manage and monitor the credits usage of multiple orgs. We use the term *parent org* to refer to the org from which you create and manage orgs, and *child orgs* to refer to the orgs you create. 

As a Service Provider, you can create two types of child orgs:

* You can create POV (Proof of Value) Trial orgs for your prospects to access in order to evaluate Sumo Logic. For more information, see [About POV Trial orgs](#about-pov-trial-orgs).
* You can create child orgs, either for use within your own company or for customers who are not going to trial Sumo Logic before subscribing.

In either case, the child orgs you create will be the same plan type as the parent org. For example, if you have an Enterprise Suite plan, the child orgs you create will also be Enterprise Suite accounts. 

When you create a child org, you provision it with credits, based on the ingest volume you estimate for the org. We refer to the different flavors of ingest—Continuous Log Ingest, Frequent Log Ingest, and so on—as *product variables*. When you provision a child org you use a Credits Calculator to estimate and allocate required credits for each product variable.

We refer to your estimates of ingest capacity required for each product variable as *baselines*. Sumo Logic’s throttling multipliers for logs and metrics are based on these estimates. (For example, if you estimate 1GB usage for logs and specify that as the "baseline" when you create the org, Sumo Logic will start [throttling](/docs/manage/ingestion-volume/log-ingestion.md) when ingestion to the org reaches 4 to 10 times the baseline. The multiplier depends on your account size.)

Users that have the required role capabilities can create child orgs under a parent org, and manage and monitor the allocation and consumption of Sumo Logic credits across orgs, and for each child org. This functionality is available in the Sumo Logic UI in the **Organizations** tab and also in the [Organizations Management API](https://organizations.sumologic.com/docs/).

## About Cloud SIEM provisioning

You can enable and provision Cloud SIEM for a child org. Note that the process of provisioning Cloud SIEM can take up to 24 hours. For more information, see [Monitor Cloud SIEM Provisioning](#monitor-cloud-siem-provisioning), below.

## Requirements for creating and managing orgs

There are several role capabilities that are required to work with orgs:

* **View Organizations**. This capability is required to view the Organizations UI.
* **Create Organizations**. This capability is required to create or provision child organizations.
* **Change Credits Allocation**. This capability is required to change the credits allocation and baselines for a child organization. 
* **Create Trial Organizations**. This capability is required to create and provision trial organizations. 
* **Upgrade Trial Organizations**. This capability is required to upgrade POV Trial organizations. 
* **Upgrade Trial Organizations**. This capability is required to deactivate POV Trial organizations. 

## About POV Trial orgs

POV Trial orgs you create will have a 45 day trial period. POV Trial orgs will be provisioned with the following ingestion limits.

* 5 GB Continuous Tier ingest
* 5 GB Frequent Tier ingest
* 5 GB Infrequent Tier ingest
* 5,000 metric data points per minute (DPM) 
* 5 GB traces ingestion
* 5 GB Cloud SIEM ingest

:::note
The credits associated with the trial org allocations don’t impact the parent org’s credits allocation.
:::

You can upgrade a trial org by editing the org and changing the Plan Type. When you upgrade a POV Trial org, if the org is in a different Sumo Logic deployment from the parent org, the Credits calculator may add a deployment factor, which is a percentage upcharge that varies by deployment.

The plan gets downgraded to [**Free** plan with limitations](/docs/manage/manage-subscription/sumo-logic-credits-accounts/#credits---account-types) once the 45-day POV trial period is over. To prevent this from happening, Sumo Logic provides indicators about the expiration date in two different places on the platform.

* **View details for the selected organizations**. You can see the **Plan Expiry** date with information about the downgrading of your plan in the view details side panel for the selected organizations. This tooltip is different for CSV and Non-CSV provisioned child org.
* **Child org table**. If the number of days left for expiry is less than 14, a warning icon with the expiry date will be shown against the respective organizations, and the information about downgrading your plan will turn into a warning with the same message.

:::info
If your CSE POV trial plan is downgraded to the free plan, your CSE access will be disabled and your data will be erased after seven days.
:::

For more information, see [Upgrade a POV Trial org](#upgrade-a-pov-trial-org) below.

## Create a POV Trial org

This section has instructions for creating a POV Trial org. 

:::note
After you create a child org, you can’t delete it.
:::

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click **+ Add Organization**. <br/> <img src={useBaseUrl('img/manage/subscriptions/orgs-page.png')} style={{border:'1px solid gray'}} alt="orgs-page" width="800"/>
1. The **Create New Organization** pane appears.<br/> <img src={useBaseUrl('/img/manage/subscriptions/sp-create-new-org.png')} style={{border:'1px solid gray'}} alt="orgs-page" width="400"/>

### Allocate Credits

1. **Plan Type**. Select your organization's plan type. By default, “POV Trial (45 days)” is selected. Leave it selected.
1. **Deployment**. Select a Sumo Logic deployment from the list.
      :::note
      Depending on your Sumo Logic subscription type, creating an org in a different deployment than the parent may incur additional deployment charges.
      :::
1. Click **View Baseline**.
1. The **Baselines** popup appears and displays the POV Trial org ingest limits, which you cannot change. <br/> <img src={useBaseUrl('/img/manage/subscriptions/baselines-pov.png')} style={{border:'1px solid gray'}} alt="baselines-pov" width="450"/>
1. View the following:
      * **Continuous Log Ingest**. Estimated daily ingestion to the Continuous Tier.
      * **Frequent Log Ingest.** Estimated daily ingestion to the Frequent Tier.
      * **Infrequent Log Ingest.** Estimated daily ingestion to the Infrequent Tier.
      * **Metrics**. Estimated daily metric data points per minute (DPM) ingestion.
      * **Tracing**. Estimated daily ingestion of traces.
      * **CSE Log Ingest**. Estimated daily Cloud SIEM ingestion.
1. Click **Done** to go back.

### Basic Details

1. **Organization Name**. Enter a unique name for the org.
1. **Account Owner Email**. Enter the name of the account owner.
1. **Account Owner First Name**. Enter the account owner’s first name.
1. **Account Owner Last Name**. Enter the account owner’s last name.
1. Click **Save** to save the new org.

## Upgrade a POV Trial org 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the row for the trial org you want to upgrade.<br/> <img src={useBaseUrl('/img/manage/subscriptions/org-to-update.png')} alt="modify" style={{border:'1px solid gray'}} width="800"/>
1. The right pane appears with information about the org. Click **Edit**.<br/> <img src={useBaseUrl('/img/manage/subscriptions/edit-option.png')} alt="modify" style={{border:'1px solid gray'}} width="400"/>
1. In the edit pane, choose the **Enterprise plan** that appears as an option in the **Plan Type** dropdown.<br/> <img src={useBaseUrl('/img/manage/subscriptions/upgrade-plan.png')} alt="modify" style={{border:'1px solid gray'}} width="400"/>
1. A warning message is shown that says you won’t be able to downgrade the org once you upgrade it.<br/> <img src={useBaseUrl('/img/manage/subscriptions/plan-selected.png')} alt="modify" style={{border:'1px solid gray'}} width="400"/>
1. Click **Set Baseline**.
1. The Credits Calculator appears.<br/> <img src={useBaseUrl('/img/manage/subscriptions/calculator.png')} alt="calculator" style={{border: '1px solid gray'}} width="400" />
   * **Continuous Log Ingest**. Enter estimated daily ingestion to the Continuous Tier.
   * **Frequent Log Ingest**. Enter estimated daily ingestion to the Frequent Tier.
   * **Infrequent Log Ingest**. Enter estimated daily ingestion to the Infrequent Tier.
   * **Metrics**. Enter estimated daily metric data points per minute (DPM) ingestion.
   * **Tracing**. Enter estimated daily ingestion of traces.
1. **Cloud SIEM Enterprise**. Click the checkbox to enable Cloud SIEM. When the **Cloud Log Ingest** field appears, enter a value in GB.
          :::note
          Provisioning Cloud SIEM can take up to 24 hours. See [Monitor Cloud SIEM Provisioning](#monitor-cloud-siem-provisioning), below.
          :::
1. As you enter the ingestion estimates, the number of credits required for the ingestion levels is incremented.
1. The calculator now shows the recommended credit allocation, which provides you a suggestion on how many credits you would need for the child org. This is calculated based on the baseline added, the burndowns in your contract, and the days remaining in your contract.
1. Click **Done** after adding the baseline.
1. Click **Save** to save the changes.

## Update a CF Credit - Free org 

If a POV trial org is not upgraded to Enterprise plan after 45 days, the org will be downgraded to the **CF Credit - Free** plan. If you need to upgrade this plan to Enterprise, follow the below steps:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the org with the **CF Credit - Free** plan that you want to upgrade to.
1. The right pane appears with information about the org. Click **Upgrade**.<br/> <img src={useBaseUrl('/img/manage/subscriptions/upgrade.png')} alt="upgrade" style={{border: '1px solid gray'}} width="400" />
1. Click **Set Baseline**.<br/> <img src={useBaseUrl('/img/manage/subscriptions/free-org-set-baseline.png')} alt="free-org-set-baseline" style={{border: '1px solid gray'}} width="400" />
1. The credits calculator appears.<br/> <img src={useBaseUrl('/img/manage/subscriptions/calculator.png')} alt="calculator" style={{border: '1px solid gray'}} width="400" />
   * **Continuous Log Ingest**. Enter estimated daily ingestion to the Continuous Tier.
   * **Frequent Log Ingest**. Enter estimated daily ingestion to the Frequent Tier.
   * **Infrequent Log Ingest**. Enter estimated daily ingestion to the Infrequent Tier.
   * **Metrics**. Enter estimated daily metric data points per minute (DPM) ingestion.
   * **Tracing**. Enter estimated daily ingestion of traces.
1. **Cloud SIEM Enterprise**. Click the checkbox to enable Cloud SIEM. When the **Cloud Log Ingest** field appears, enter a value in GB.
          :::note
          Provisioning Cloud SIEM can take up to 24 hours. See [Monitor Cloud SIEM Provisioning](#monitor-cloud-siem-provisioning), below.
          :::
1. As you enter the ingestion estimates, the number of credits required for the specified ingestion levels will be incremented.
1. The calculator now shows the recommended credit allocation, which provides you a suggestion on how many credits you would need for the child org. This is calculated based on the baseline added, the burndowns in your contract, and the days remaining in your contract.
1. Click **Done** after adding the baseline.
1. Click **Save** to save the changes.

## Update an org's credits allocation

:::sumo Micro Lesson
Watch this micro lesson to learn more about managing a child org.
<Iframe url="https://www.youtube.com/embed/ni7xMZjHdQM?si=dbMnCgDtNtGLGINs"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
:::

:::info
If the org has already depleted its credits, you can see a red color warning icon in the **Usage %** column and a red-colored usage bar in the **Allocation & usage** section when you view the selected org.
:::

To change an org's credits allocation:
1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the row for the org you want to edit.
1. Click **Edit** in the right hand pane. <br/> <img src={useBaseUrl('img/manage/subscriptions/edit-org-3.png')} style={{border:'1px solid gray'}} alt="your description" width="450" />
1. Under **Modify Credit Allocation**, you can increase or decrease the credits based on your requirement.<br/> <img src={useBaseUrl('img/manage/subscriptions/modify-allocation-button.png')} style={{border:'1px solid grey'}} alt="allocation" width="450" />
      :::note
      Ensure your total new allocation is not less than the consumed credits.
      :::
      You can select **Credits to be Added** and enter either the recommended credit value or a value of your choice to top-up additional credits and avoid credit depletion. This recommendation is calculated based on the usage forecast and the average daily credit usage for the selected contract period.

      **Example 1**: Consider that you are heading towards credit depletion and need to add more credits. The below image shows you have almost run out of the credits (1840/1841) allocated to the child org. To increase the credits to the child org, select **Credits to be Added**. An info icon will appear below with a suggestion on how many credits can be added to this child org based on the usage forecast. So, in this case, it is suggested that you add 135 credits.<br/> <img src={useBaseUrl('img/manage/subscriptions/modify-allocation-recommendation.png')} style={{border:'1px solid gray'}} alt="modify-allocation-recommendation" width="450" />
      <br/>Click **View Details** to view the detailed breakdown of the recommended value.<br/> <img src={useBaseUrl('img/manage/subscriptions/modify-allocation-usage-forecast.png')} style={{border:'1px solid gray'}} alt="modify-allocation-usage-forecast" width="450" />

      **Example 2**: Consider you need to increase credits to your child org. The below image shows that you have used 35 credits out of 31026 credits allocated to your child org. Now, if you wish to increase the credits to your child org, select **Credits to be Added** and add the additional credits required.<br/> <img src={useBaseUrl('img/manage/subscriptions/modify-allocation-recommendatio-example-2.png')} style={{border:'1px solid gray'}} alt="modify-allocation-recommendatio-example-2" width="450" />
1. If you want to modify the baseline, click **View Baseline**. The **Credits Calculator** appears.
      1. Click **Edit** and follow the steps in [Allocate Credits](#allocate-credits) to update the credits allocation.<br/> <img src={useBaseUrl('img/manage/subscriptions/edit-baseline.png')} style={{border:'1px solid gray'}} alt="edit-baseline" width="450" />
      1. Depending on the new baseline values, the calculator now shows the recommended credit allocation, which provides a suggestion on how many credits you would need to add for the child org.<br/><img src={useBaseUrl('img/manage/subscriptions/edit-baseline-example.png')} style={{border:'1px solid gray'}} alt="edit-baseline" width="450" />
      1. Once you set the baseline, you can view the recommended value in the **Credits to be Added** section.<br/><img src={useBaseUrl('img/manage/subscriptions/baseline-credits-to-add.png')} style={{border:'1px solid gray'}} alt="baseline-credits-to-add" width="450" />
      1. (Optional) Click **View Details** to view the detailed breakdown of additional credits required value.<br/><img src={useBaseUrl('img/manage/subscriptions/baseline-view-details.png')} style={{border:'1px solid gray'}} alt="baseline-view-details" width="450" />
1. Click **Save** once you finish editing the credit values.

## Deactivate a POV Trial org

To deactivate a POV Trial org

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the row for the trial org you want to deactivate.
1. Click the three-dot kebab menu and choose **Deactivate**.<img src={useBaseUrl('/img/manage/subscriptions/deactivate.png')} alt="deactivate" style={{border:'1px solid gray'}} />

## Monitor Cloud SIEM provisioning

Provisioning Cloud SIEM can take up to 24 hours. You can determine provisioning status on the **Organizations** page. Until the provisioning is complete, you'll see a spinner and message that indicates the process is on-going.

<img src={useBaseUrl('img/cse/status.png')} alt="status" style={{border:'1px solid gray'}} />

## Monitor credits allocation and usage

This section has information about how you can monitor credit allocations and consumption across all your orgs, and for each child org. You can view the usage by orgs and child orgs on the **Account Overview** page.

* The **Credit Allocation** tile indicates the total number of credits allocated.
* The **Total Credit Usage** tile shows amount of credits consumed out of the total allocated credits.
* The **Usage Forecast** tile indicates the total consumption of the credits by the end of contract period according to the current consumption rate.

### View overall credit usage by category

You can view the aggregate usage for all child orgs across usage category in the **Overall Usage** tab on the **Account Overview** page. Usage for the following categories is shown:

* **Continuous Ingest**. Credits used for logs ingested into the Continuous Tier.
* **Frequent Ingest**. Credits used for logs ingested into the Frequent Tier.
* **Infrequent Ingest**. Credits used for logs ingested into the Infrequent Tier.
* **Infrequent Scan**. Credits used to scan data for Infrequent Tier searches.
* **Tracing Ingest**. Credits used for traces ingested.
* **Metrics Ingest**. Credits used for metrics ingested.
* **Storage**. Credits used for log storage in the Continuous and Frequent Tiers.
* **Cloud SIEM Ingest**. Credits used for logs ingested into Cloud SIEM.
* **Infrequent Storage**. Credits used for log storage in the Infrequent Tier.
* **Promotional categories**. For more information, see [Monitoring Promotional Credit usage](sumo-logic-credits-accounts.md#monitoring-promotional-credit-usage).

By clicking the **Download Report** button, you can download the org usage data in csv format for further analysis and reporting. You can also download the detailed child org usage data in csv format by clicking **Download Detailed Credit Usages** from the kebab icon next to the Download Report button.

<img src={useBaseUrl('img/manage/subscriptions/account-overview-new.png')} alt="your description" style={{border:'1px solid gray'}} />

### View child credit usage by category

You can view the usage of individual child orgs in the **Child Orgs** tab on the **Account Overview** page. Usage for the following categories is shown:

* The **Allocated Credits** column indicates the total number of credits allocated to the selected child org.
* The **Total Credits Used** column indicates the total amount of credits consumed for the selected child org.
* The **Usage %** column indicates the percentage of overall subscription credits that was allocated to a child org has been consumed.
* The **Forecast** column indicates the percentage of total consumption of the credits by the end of contract period according to the current consumption rate for a selected child org.
* The **Usage % Change** column indicates the difference in credit usage by your child organizations over time. For example, if you choose the date from Jan 1 to Jan 7, it will show the usage difference between Dec 25 to Dec 31 and Jan 1 to Jan 7 for each child organization.

By clicking the **Download Report** button, you can download the child org usage data in csv format for further analysis and reporting.

<img src={useBaseUrl('img/manage/subscriptions/child-org.png')} alt="your description" style={{border:'1px solid gray'}} />

By clicking any of the selected child orgs, a side panel opens up in which you can view the individual usage for the following categories:

* **Continuous Ingest**. Credits used for logs ingested into the Continuous Tier for the selected child org.
* **Frequent Ingest**. Credits used for logs ingested into the Frequent Tier for the selected child org.
* **Infrequent Ingest**. Credits used for logs ingested into the Infrequent Tier for the selected child org.
* **Infrequent Scan**. Credits used to scan data for Infrequent Tier searches.
* **Tracing Ingest**. Credits used for traces ingested for the selected child org.
* **Metrics Ingest**. Credits used for metrics ingested for the selected child org.
* **Storage**. Credits used for log storage in the Continuous and Frequent Tiers for the selected child org.
* **Cloud SIEM Ingest**. Credits used for logs ingested into Cloud SIEM for the selected child org.
* **Infrequent Storage**. Credits used for log storage in the Infrequent Tier for the selected child org.

By clicking the **Download Report** button, you can download the selected child org usage data in csv format for further analysis and reporting.

<img src={useBaseUrl('img/manage/subscriptions/child-credit-usage.png')} alt="your description" style={{border:'1px solid gray'}} />

## Access a child org

If a [custom subdomain](create-manage-orgs.md) has been configured for a child org, and you have an account in the org, you can access it from the Organizations UI.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the row for the org you want to access.
1. Click **Access Organization** in the right hand pane. <br/> <img src={useBaseUrl('img/manage/subscriptions/access-org.png')} alt="access org" style={{border:'1px solid gray'}} width="400"/>

## View child credits usage

You can access the child credits usage for a selected organization from the **Organizations** UI.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the row for the org you want to access the credits usage.
1. You can see the total percentage of credits consumed out of the total number of credits allocated in the **Allocation & usage** section.
1. Click **Open in Account Overview** for a detailed child credit usage report for the selected organization.<br/> <img src={useBaseUrl('img/manage/subscriptions/child-credits-usage.png')} alt="child-credits-usage" style={{border:'1px solid gray'}} width="450"/>

## View baselines

Your estimates of ingest capacity required for each product variable are called as baselines. Sumo Logic’s throttling multipliers for logs and metrics are based on these estimates, you can access it from the **Organizations** UI.

1.  [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Organizations**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Organizations**. You can also click the **Go To...** menu at the top of the screen and select **Organizations**.
1. Click the row for the org you want to check the baselines.
1. Click **Edit** in the right hand pane. <br/> <img src={useBaseUrl('img/manage/subscriptions/edit-org-3.png')} style={{border:'1px solid gray'}} alt="your description" width="450" />
1. To view the baseline, click **View Baseline**.<br/> <img src={useBaseUrl('img/manage/subscriptions/baselines_3.png')} alt="baselines_2" style={{border:'1px solid gray'}} width="450"/> <br/> <img src={useBaseUrl('img/manage/subscriptions/baselines_2.png')} alt="baselines_2" style={{border:'1px solid gray'}} width="450"/>

## Audit logging for organizations

This section has examples of the messages Sumo Logic writes to the Audit Event Index when you create, deactivate, and update an org.  

### OrganizationCreated

```
{"operator":{"email":"PF6gIXhGj33LzP8Ba7kzJkL9EAtz6RuSMYHHKnqbEICUz7PITMdceGFRdQESZ2JwpL7BSbGaOaUYmgADz3USgExa7egWZ8UY2wmm","id":"000000000AEE3701","interface":"INTERNAL","sessionId":"no_session","sourceIp":"54.177.241.252","type":"UserContext"},"organizationIdentity":{"email":"pjain+1ljjjjjlwasdk@sumologic.com","organizationName":"akjdhfjkhwqiue","firstName":"kajsdfh","lastName":"sakjdsh","orgId":"000000000AF45F28","deploymentId":"nite"},"subscriptionDetails":{"startDate":{"year":2020,"month":12,"day":16},"endDate":{"year":2021,"month":5,"day":11},"plan":"SUMO-ENT-SUI","credits":4388,"baselines":{"continuousIngest":1,"continuousStorage":30,"frequentIngest":1,"frequentStorage":30,"infrequentIngest":1,"infrequentStorage":30,"infrequentScan":0,"metrics":1,"cseIngest":0,"cseStorage":0}},"eventType":"Audit","severityLevel":"Info","accountId":"000000000AE07391","eventId":"67718e94-a8a3-4478-b778-975cd0e18e55","eventName":"OrganizationCreated","eventTime":"2020-12-17T04:59:05.584Z","eventFormatVersion":"1.0 beta","subsystem":"organizations"}
```

### OrganizationUpdated

```
{"operator":{"email":"rmVOQ8CwUBuxqDydSLIV2ZljEogPcR7fwZiIShCBldZ5jhEl1c4wLHJhL1j6xkzVPVuqVJFf1c5VUvOMESv4ieY0xrxuVET6JXTw","id":"000000000B0858AE","interface":"INTERNAL","sessionId":"no_session","sourceIp":"122.181.102.148","type":"UserContext"},"organizationIdentity":{"email":"fkonkpjg3z@mail.peaksum.com","organizationName":"QEV9Z3Z","firstName":"ne3ieXF","lastName":"85lZdXD","orgId":"000000000AF35705","deploymentId":"nite"},"from":{"continuousIngest":200,"continuousStorage":30,"frequentIngest":200,"frequentStorage":30,"infrequentIngest":200,"infrequentStorage":30,"infrequentScan":0,"metrics":200,"cseIngest":0,"cseStorage":0},"to":{"continuousIngest":201,"continuousStorage":30,"frequentIngest":200,"frequentStorage":30,"infrequentIngest":200,"infrequentStorage":30,"infrequentScan":0,"metrics":200,"cseIngest":0,"cseStorage":0},"eventType":"Audit","severityLevel":"Info","accountId":"000000000AE07391","eventId":"2f816b83-3f10-434f-b5b9-e73aa223fd5d","eventName":"OrganizationUpdated","eventTime":"2020-12-16T11:29:53.428Z","eventFormatVersion":"1.0 beta","subsystem":"organizations"}
```

### OrganizationDeactivated 

```
{"operator":{"email":"NXFzffOzayF9XOB5Rr3VotNkucC0qGCBNtvbvFnzc3Fx7TNYDqE57JT0JH2c11SZzXvQ1ja3uEoxdkH7aNUMzjva8KZlAzRVARmO","id":"000000000B077FF9","interface":"INTERNAL","sessionId":"no_session","sourceIp":"54.176.19.217","type":"UserContext"},"organizationIdentity":{"email":"ritesh@demo.com","organizationName":"Riteshtestemail","firstName":"Ritesh","lastName":"Kumar","orgId":"000000000AF43E5B","deploymentId":"nite"},"eventType":"Audit","severityLevel":"Info","accountId":"000000000AE07391","eventId":"4b23e75c-6ae7-4a19-865e-5f1a89b26823","eventName":"OrganizationDeactivated","eventTime":"2020-12-15T17:59:28.146Z","eventFormatVersion":"1.0 beta","subsystem":"organizations"}
```
