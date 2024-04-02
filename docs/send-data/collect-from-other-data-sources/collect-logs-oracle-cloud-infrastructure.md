---
id: collect-logs-oracle-cloud-infrastructure
title: Collect Logs from Oracle Cloud Infrastructure
sidebar_label: Oracle Cloud Infrastructure
description: How to collect logs from Oracle Cloud Infrastructure.
---

Oracle Cloud supports the export of OCI Service logs, Audit logs, Application logs and Security logs to Sumo Logic.


## Collecting logs for Cloudflare

This section shows you how to set up a Hosted Collector and specify a Sumo Logic Source.


IMAGE of setup


### Configure a Hosted Collector & HTTP Source

1. Configure a Hosted Collector or skip to the next step if you are using an existing hosted collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. Configure an HTTP Logs and Metrics Source under the hosted collector. For instructions, see [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the HTTP Source URL.


### Configure the Logs You Want to Capture in OCI

1. In the Oracle Cloud Console, click the navigation menu, select Logging, and then select Log Groups.
2. To create a log group, click Create Log Group.
3. Select your compartment, add LogGroupForBucketActivity for the name and add a description. Click Create.
4. Select Logs from the Logging menu. You will see a screen similar to below.

IMAGE

5. Click Enable service log and enter the following information:
  * Service: Select **Object Storage**
  * Resource: Choose an arbitrary bucket(for example, **BucketForSumoLogic**) that you would like observed with the logs.
  * Log Category: Select **Write Access Events**
  * Log Name: Enter a name for your log, for example, **logForBucketActivity**.
  * Log Group: Select the **LogGroupForBucketActivity** log group for the log that you just created in the previous step
6. Click **Enable Log**

:::note
Now every time a object is uploaded to the **BucketForSumoLogic** bucket,a log entry will be added to the **logForBucketActivity** log.
:::


### Configure an Oracle Function for Sending Logs to Sumo Logic

1. In the Oracle Cloud Console, click the navigation menu and select **Solution and Platform**. Select **Functions** under the **Developer Services** menu.
2. Click **Create Application** and enter a name, for example, **SumoLogicFnApp**.
3. Once you create the application, click your application name and select **Getting Started** from the **Resources** menu.
4. Launch Cloud Shell.
5. Use the context for your region.
    ```sh
    fn list context
    fn use context us-ashburn-1
    ```
6. Update the context with the function’s compartment ID.
    ```sh
    fn update context oracle.compartment-id <compartment-id>
    ```
7. Update the context with the location of the registry you want to use. Replace iad with the three-digit region code for your region.
    ```sh
    fn update context registry iad.ocir.io/<tenancy_name>/[YOUR-OCIR-REPO]
    ```
8. Assuming you have created the Auth Token already, log in to the registry using the Auth Token as your password.
    ```sh
    docker login iad.ocir.io
    ```
  * Replace **iad** with the three-digit region code for your region.
  * You are prompted for the following information:
      * Username: <tenancyname>/<username>
      * Password: Create a password

:::note
If you are using Oracle Identity Cloud Service, your username is <tenancyname>/oracleidentitycloudservice/<username>.
:::

  * Verify your setup by listing applications in the compartment.
    ```sh
    fn list apps
    ```
9. Generate a ‘hello-world’ boilerplate function.
    ```sh
    fn init --runtime python sumologicfn
    ```










