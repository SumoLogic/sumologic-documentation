---
title: PowerShell Tools
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/powershell-tools.png)

Version: 1.5  
Updated: Nov 23, 2023

Runs commands on a Local or Remote Window Host and returns all output from the commands, including errors.

## Actions

* **Execute Commands** (*Enrichment*) - Execute commands on local or remote Window Server/host.
* **Whois** (*Enrichment*) - Whois performs the registration record for the domain name or IP address that you specify.
* **Query User** (*Enrichment*) - Displays information about user sessions on a Remote Desktop Session Host server.
* **DNS Lookup** (*Enrichment*) - Performs a DNS query for the specified name and this is similar functionally to the nslookup tool which allows users to query for names.
* **VMware Carbon Black Enrichment** (Enrichment) - This enrichment queries the Carbon Black Device API for an IP address and returns host information
* **CrowdStrike Falcon Enrichment** (Enrichment) - This enrichment queries the CrowdStrike Device API for an IP address and returns host information
* **GreyNoise Enrichment** (Enrichment) - GreyNoise helps security teams reduce noise and prioritize signal-targeted attacks against their organization. This enrichment queries GreyNoise to see what it knows about the IP address
* **SentinelOne Enrichment** (Enrichment) - The SentinelOne enrichment queries IP addresses or hostnames using the SentinelOne API and returns the information SentinelOne knows about the host

**PowerShell Tools Configuration on Window Server (Domain Controller)** 

**Note**: PowerShell Tools was tested on **Windows Server 2016 and 2008**, PowerShell Remoting is using **WinRM**, So it's strongly suggested to test this integration on test environments before testing it on production environments. In this configuration guide, you will be directed on how to prepare a environment for testing on a window host but this guide is only related to the environment we tested on it, so it may differ in case you are using a different window server/host version

You must have **Windows Server/Host** to do the following setup on that Window Server/Host, So that Cloud SOAR can connect to the window Server/host and run PowerShell commands, also a user who will run the PowerShell command must have admin access for the local or remote window host.

The *Enable-PSRemoting* cmdlet configures the computer to receive PowerShell remote commands that are sent by using the WS-Management technology. WS-Management-based PowerShell remoting is currently supported only on the Windows platform. PowerShell remoting is enabled by default on Windows Server platforms. You can use *Enable-PSRemoting* to enable PowerShell remoting on other supported versions of Windows and to re-enable remoting if it becomes disabled.

You have to run this command only one time on each computer that will receive commands. You do not have to run anything on Cloud SOAR that only sends commands. Because the configuration starts listeners to accept remote connections, it is prudent to run it only where it is needed.

PowerShell remoting must be enabled on the remote/local computer. The remoting features of PowerShell are supported by the WinRM service, which is the Microsoft implementation of the Web Services for Management (WS-Management) protocol. When you enable PowerShell remoting, you change the default configuration of WS-Management and add a system configuration that allows users to connect to WS-Management

To configure PowerShell to receive remote commands:

1. Start PowerShell with the Run as administrator option
2. At the command prompt, type: `Enable-PSRemoting`

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-1.png)

The *Enable-PSRemoting* cmdlet performs the following operations:

* Runs the [Set-WSManQuickConfig](https://learn.microsoft.com/en-us/powershell/module/microsoft.wsman.management/set-wsmanquickconfig?view=powershell-7.3) cmdlet, which performs the following tasks:
	+ Starts the WinRM service.
	+ Sets the startup type on the WinRM service to Automatic.
	+ Creates a listener to accept requests on any IP address.
	+ Enables a firewall exception for WS-Management communications.
	+ Creates the simple and long name session endpoint configurations if needed.
	+ Enables all session configurations.
	+ Changes the security descriptor of all session configurations to allow remote access.
* Restarts the WinRM service to make the preceding changes effective.

To verify that remoting is configured correctly, run a test command such as the following command, which creates a remote session on the local computer.


```
New-PSSession
```
If remoting is configured correctly, the command will create a session on the local computer and return an object that represents the session. The output should resemble the following sample output:

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-2.png)

If the command fails, for assistance, see [about\_Remote\_Troubleshooting](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_remote_troubleshooting?view=powershell-7.2).

From the same Administrative command line run following commands:


```

winrm set winrm/config/client '@{TrustedHosts="*"}'
winrm set winrm/config/client/auth '@{Basic="true"}'
winrm set winrm/config/service/auth '@{Basic="true"}'
winrm set winrm/config/service '@{AllowUnencrypted="true"}'
winrm set winrm/config/client '@{AllowUnencrypted="true"}'
```
![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-3.png)

**Basic Authentication Limitations:**

Basic Authentication over HTTP is not supported. Basic Authentication can be used over HTTPS by installing a certificate on the target server. The certificate must have a CN name that matches the hostname, is not expired or revoked. A self-signed certificate may be used for testing purposes. See [How To: Configure WINRM for HTTPS](https://support.microsoft.com/help/2019527/how-to-configure-winrm-for-https) for additional details

**Configuration on Domain Controller for WinRM over HTTPS**

 Open **Server Manager** on Window Server (Domain Controller)  

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-4.png)

 

The **Active Directory Certificate Services** role with the **Certification Authority** sub-role should already installed and configured on your Domain Controller

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-5.png) 

 

 If **Active Directory Certificate** **Services** role is not already installed, please follow this [Docs](https://learn.microsoft.com/en-us/windows-server/networking/core-network-guide/cncg/server-certs/install-the-certification-authority)

  

Open **Certification Authority** through **Server Manager** - **Tools** menu 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-6.png)    

You should observe all these directories associated with **Certification Authority** including **Certificate Templates**  

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-7.png) 

  

As a First step, you need to create a customized WinRM SSL Certificate Template, which will be used for WinRM over HTTPS 

 

Right-click on the **Certificate Template** and select **Manage** 

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-8.png) 

 

Right-click on the **Web Server** and choose **Duplicate Template**

 

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-9.png) 

  

Go to the **General** Tab and set the **Template Name** and **Display Name**

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-10.png)

 

Go to the **Subject Name** Tab and choose **Build from this Active Directory information**  From the drop-down list, choose **Common name** as the **Subject name format**. Uncheck the User Principal Name (UPN) and only check the **DNS name** 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-11.png)

 

Go to the **Security** tab, add the group that you want to be able to request the certificate template and grant them **Read**, **Enroll**, and **Autoenroll** permissions 

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-12.png)          

Click **Apply** to save the changes made to your new template   Within the **Certification Authority**, select **Certificate Templates** -&gt; **New** -&gt; **Certificate Template to Issue**    

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-13.png)   

Choose the recently created template from the list and click OK  

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-14.png)

 

You will see your new certificate template

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-15.png)

 

**Configure Group Policy Management**

 

 

For automatic enrollment of computers, set up **Group Policy Objects (GPO)** on the domain or organizational units(OU) 

Open **Group Policy Management** from the **Server Manager** Tools menu 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-16.png)  

 

To create new **Group Policy Object** (GPO), Right-click on **Group Policy Objects** and select **New**  

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-17.png)

  

Provide a new name for your **Group Policy Object (GPO)** and click OK 

 

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-18.png)   

Right-Click on your newly Created GPO and Click on Edit

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-19.png)    

This window will be displayed 

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-20.png)

 

You need to configure client certificate auto-enrollment settings 

 

 

Go to **Computer Configuration** -&gt; **Policies** -&gt; **Windows Settings** -&gt; **Security Settings** -&gt; **Public Key Policies** -&gt; **Certificate Services Client - Auto-Enrollment**  

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-21.png)   

Double-click on **Certificate Services Client - Auto-Enrollment**, choose **Enabled**, and check both checkboxes   

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-22.png)       

Click Apply and ok

 

 

Set the **Windows Remote Management service** to Automatic  

In the **Group Policy Management** console, go to **Computer Configuration** -&gt; **Policies** -&gt; **Windows Settings** -&gt; **Security Settings** -&gt; **System Services**

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-23.png)            

Double click on **Windows Remote Management (WS-Management)**   

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-24.png) 

Check the box to **define the policy setting** and configure the startup mode of the WinRM service to **Automatic** 

 

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-25.png) 

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-26.png) 

In the **Group Policy Management** console, go to **Computer Configuration** -&gt; **Policies** -&gt; **Administrative Templates:** -&gt; **Windows Components** -&gt; **Windows Remote Management (WinRM)** -&gt; **WinRM Service**

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-27.png)           ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-28.png)          

 

Double click on **Allow remote server management through WinRM**

Choose **Enabled** and specify the **IP address** of your automation bridge (Cloud SOAR)

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-29.png)

 Within the same **WinRM Service** console, double-click on **Allow Basic Authentication**. This policy setting enables you to control whether the Windows Remote Management (WinRM) service accepts Basic authentication from Cloud SOAR ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-30.png) 

 Select **Enabled** andclick **ok**

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-31.png) 

 

Next, create a firewall rule to allow traffic on WinRM over HTTPs port ***5986***  

Within the **Group Policy Management** console, go to **Computer Configuration** -&gt; **Policies** -&gt; **Windows Settings** -&gt; **Security Settings** -&gt; **Windows Firewall with Advanced Security**  

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-32.png) 

Right-click on **Inbound Rule** and select **New Rule**

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-33.png)

Select **Port** for New Rule and click next

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-34.png)

Select **TCP** and set the Port number **5986**

**![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-35.png)**

Select only **Domain** and click next

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-36.png)

Provide a name for the rule and click Finish 

**![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-37.png)**  

You can now **Link** the **GPO** with the **Domain or Organizational Unit** (OU) as per your requirements 

 

**It is recommended to create a new Organizational Unit (OU)**

  

Access **Active Directory Users and Computers** through the **Server Manager's** Tools menu 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-38.png)

Create a new **Organizational Unit (OU)** by right-clicking on the **Domain**, choosing **New**, and then selecting **Organizational Unit** 

   ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-39.png)   

Access the **Group Policy Management** through the Server Manager Tools menu 

Right-Click on your **Organizational Unit (OU)** and click on Link an Existing **GPO**

**![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-40.png)**

Select **Group Policy Object** that you just created and click ok

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-41.png)  

You will notice the linkage of the **Group Policy Object (GPO)** to the **Organizational Unit (OU)**

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-42.png)  

Execute this command from the command line interface (CLI) 

 

***gpresult /r -scope computer***

 

The **Group Policy Object (GPO)** you created should appear in **COMPUTER SETTINGS** within the Applied **Group Policy Objects**

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-43.png)

 

If you cannot see the Group Policy Object (GPO), verify the Organizational Unit (OU) and confirm that the computer account is located within that OU

 

Execute the the below command from the host's command line interface (CLI) 

 

*gpupdate /force*

 

Use Windows PowerShell (Run as Administrator) to run the following command on the host where you plan to configure WinRM with HTTPS. 

 

 *winrm**quickconfig**-transport:https*

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-44.png)

 

 

You need to verify the Certificate on Domain Controller Open Certification Authority from Tools of Server Manager

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-45.png)   

Click on **Issued Certificates**

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-46.png)

  

You will see a new certificate issued by Certificate template you created for WinRm for all hosts

 You will observe a newly issued certificate with Certificate template you created for WinRM for the hosts. 

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-47.png) 

 

**Validate your WinRM HTTPs Listener to ensure correctness, you will see results if it's configured properly**

 ![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-48.png)     

 

If really needed, you can delete your previous WinRM HTTPs Listener and add new certificate

   ***winrm******delete******winrm/config/Listener?Address=\*+Transport=HTTPS*** 

After deletion (**or** In the absence of a Certificate Authority in your domain/host, you have the option to use self-signed certificates by running the following command)

 

You can configure WinRM for HTTPS listener manually (ensure to set it with your accurate hostname and CertificateThumbprint)  


```

    $hostinfo = '@{Hostname="&lt;DNS_NAME&gt;"; CertificateThumbprint="&lt;THUMBPRINT&gt;"}'
    winrm create winrm/config/Listener?Address=*+Transport=HTTPS $hostinfo
                
```
Run below command  from command line interface (CLI) to see if the host is listening on correct port

 

netstat -na

 

For example:

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-49.png)   


**Whois Action Configuration:**

You must need to download the whois.exe from [Here](https://learn.microsoft.com/en-us/sysinternals/downloads/whois) and Drop the whois.exe file in c:/windows/system32 so that the commands are global and do not have to change the directory to where the files are

**Query User Action:** 

Syntax: query user [&lt;username&gt; | &lt;sessionname&gt; | &lt;sessionID&gt;] [/server:&lt;servername&gt;]

Remarks:

* To use this action, you must have Full Control permission or special access permission.
* If you don't specify a user using the &lt;username&gt;, &lt;sessionname&gt;, or sessionID parameters, a list of all users who are logged on to the server is returned. Alternatively, you can also use the query session command to display a list of all sessions on a server.
* When query user returns information, a greater than (&gt;) symbol is displayed before the current session

 

## PowerShell Tools in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-50.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-51.png)

After the list of the integrations appears, search/look for PowerShell Tools integration and click on the row. The integration details will appear. Click on the "+" button to add new Resource

Populate all the required fields (\*) and then click Save.

* Label: The desired name for the resource
* Domain Name (PowerShell Window Host): Specify Domain Name (Hostname) for Window Server e.g 192.168.1.10 or my-computer.csoar.local
* Username: Username of your window host
* Password: Password of your window host
* Hostname (To Resolve in Docker): Hostname (To Resolve in Docker) e.g 10.0.0.24 test.local

 

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-52.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-53.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-54.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/powershell-tools/powershell-tools-55.png)

## Change Log

* December 30, 2022 - First upload
* January 12, 2023 - Added new actions:
	+ VMware Carbon Black Enrichment
	+ CrowdStrike Falcon Enrichment
	+ GreyNoise Enrichment
	+ SentinelOne Enrichment
* November 23, 2023 (v1.5)
	+ Updated the integration to address hostname resolution in Docker
	+ Updated the configuration documentation for the Window Server Domain Controller
