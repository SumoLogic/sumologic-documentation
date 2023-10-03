---
id: cse-built-in-rules
title: CSE Built-In Rules
sidebar_label: Built-In Rules
description: See a list and descriptions of CSE's built-in rules.
---

<!--
Content of this page comes from https://github.com/jasklabs/content-catalog/blob/master/rules/html_rules.html
-->

This page lists and describes CSE's built-in rules.

## .NET Framework Remote Code Execution Vulnerability


 Observes for possible exploitation of CVE-2017-8759

## ADPassHunt Tool


 From FireEye Red Team Tool Countermeasures:
This IOC detects indicators associated with the ADPassHunt Tool. This tool is used to hunt for AD credentials and used via execute-assembly that looks for passwords in GPP, Autoruns and AD objects


## AWS - Excessive OAuth Application Permissions Scope


 Alert when an OAuth application has requested a high number of permissions to aspects of AWS.

## AWS - New UserPoolClient Created


 A UserPoolClient is an entity that has permission to call unauthenticated API operations (operations that do not have an authenticated user).

## AWS Cloud Storage Deletion


 Detects the removal of cloud storage infrastructure in AWS.

## AWS CloudTrail - Customer Master Key Disabled or Scheduled for Deletion


 The AWS Key Management Service (KMS) can be used to generate key pairs for encrypting and decrypting your data. Disabling or deleting keys can come with heavy destructive consequences as data encrypted with those keys cannot be decrypted. AWS forces users to either disable keys allowing them to be re-enabled at a later time or users must schedule a key deletion at a later time if the keys absolutely must be removed. The default time for scheduling a key deletion is 30 days.

## AWS CloudTrail - Database Snapshot Created


 Creating DB snapshots is an efficient way for an attacker to begin downloading a targets database.  These signals should be considered around the context of other signals that may indicate data theft is in progress.

## AWS CloudTrail - EC2 Access Key Action Detected


 Actions observed that create, import and delete access keys to EC2 could indicate an advisary is taking action on their objective to extend or otherwise manipulate access to EC2 instance(s).

## AWS CloudTrail - GetSecretValue from non Amazon IP


 The secrets manager service is commonly used by cloud components to retrieve secrets (connection strings etc) while performing routine functions.  This signal identifies when secret values are retrieved via the GetSecretValue API call and the source host does not belong in an Amazon instance IP space.

## AWS CloudTrail - IAM CreateUser Action Observed


 This signal fires for all observances of the CreateUser action in the IAM event source.  Creating AWS users is likely a benign, infrequent activity.  Hostile actors will create users to persist access.  Use this signal in context of other activity to determine intent.

## AWS CloudTrail - IAM Policy Applied


 A policy was attached to a user, group, or role. By default, IAM denies all access to all services for users, and policies must be applied to grant access to AWS services and resources. This signal could indicate a policy is granting additional access within your cloud environment.

## AWS CloudTrail - IAM Privileged Policy Applied to Group


 This rule identifies both 'attach' and 'put' actions with this privileged policy. The difference between 'attach' and 'put' is that 'attach' actions apply a managed policy to an item, where a 'put' action indicates the policy is defined in-line and is part of the items definition. Applying privileged policies to items could indicate hostile action that attempts to increase the privilege level of a user or set of users. Because there are legitimate times when this will occur, consider this signal in context of other activities that may indicate suspicious behavior.

## AWS CloudTrail - IAM Privileged Policy Applied to Group (Username)


 This rule identifies both 'attach' and 'put' actions with this privileged policy.  The difference between 'attach' and 'put' is that 'attach' actions apply a managed policy to an item, where a 'put' action indicates the policy is defined in-line and is part of the items definition. Applying privileged policies to items could indicate hostile action that attempts to increase the privilege level of a user or set of users.  There are legitimate times when this will occur, consider this signal in context of other activities that may indicate suspicious behavior.

## AWS CloudTrail - IAM Privileged Policy Applied to Role


 This rule identifies both 'attach' and 'put' actions with this privileged policy.  The difference between 'attach' and 'put' is that 'attach' actions apply a managed policy to an item, where a 'put' action indicates the policy is defined in-line and is part of the items definition. Applying privileged policies to items could indicate hostile action that attempts to increase the privilege level of a user or set of users.  There are legitimate times when this will occur, consider this signal in context of other activities that may indicate suspicious behavior.

## AWS CloudTrail - IAM Privileged Policy Applied to User


 This rule identifies both 'attach' and 'put' actions with this privileged policy.  The difference between 'attach' and 'put' is that 'attach' actions apply a managed policy to an item, where a 'put' action indicates the policy is defined in-line and is part of the items definition. Applying privileged policies to items could indicate hostile action that attempts to increase the privilege level of a user or set of users.  There are legitimate times when this will occur, consider this signal in context of other activities that may indicate suspicious behavior.

## AWS CloudTrail - IAM User Generating AccessDenied Errors Across Multiple Actions


 An IAM account sent multiple requests to perform a wide distinct number of AWS actions in a short time frame while receiving the error code AccessDenied. This could indicate an account attempting to enumerate their access across the AWS account.

## AWS CloudTrail - Logging Configuration Change Observed


 Changing the configuration of logging to any mission-critical service or platform should be closely monitored.  This signal identifies when AWS logging configurations have been changed.  The severity of signals increases depending on the type of action observed.  For instance disabling/deleting logs is a higher severity than enabling logs.

## AWS CloudTrail - OpsWorks Describe Permissions Event


 This event sourced from AWS OpsWorks occurs rarely.  It could indicate that an adversary is attempting to collect information for later attack.  When successful, the Describe Permissions event returns information regarding a specified stack's permissions for access.

## AWS CloudTrail - Permissions Boundary Lifted


 A Permissions Boundary was lifted against an IAM User or Role. This unusual action may increase the effect permissions to the asset by allowing all the actions granted in its permissions policies.

## AWS CloudTrail - Public S3 Bucket Exposed


 An AWS request occurred to either create a new public bucket or to add a bucket access control list (ACL) to an existing bucket to make it public. While there are some use cases for AWS S3 public buckets, most are generally private. The security operations center should have a strong understanding of which buckets are allowed to be public.

## AWS CloudTrail - Reconnaissance related event


 This signal identifies a small number of CloudTrail API actions that when observed could indicate an actor's intent to enumerate the environment.  These events are generally benign, and occur during normal operations.  Use this signal as context around an unfolding security story.

## AWS CloudTrail - Root Console Successful Login Observed


 This signal detects when a successful root account login occurred within an AWS account. This privileged account should be used within an AWS cloud environment only on a seldom basis. Amazon's best practices state you should only use the root account to create the initial local IAM users and assigned one of the accounts administrative privileges or to perform rare tasks only available to the root user. The security operations center should be aware when the AWS root account is accessed.

## AWS CloudTrail - S3 Bucket Public Access Block Disabled


 Detects when GetPublicAccessBlock returns NoSuchPublicAccessBlockConfiguration, indicating the public access block has all values set to false or the feature is disabled.

## AWS CloudTrail - SQS List Queues Event


 This event sourced from AWS SQS occurs rarely.  It could indicate that an adversary is attempting to collect information for later attack.  When successful, the List Queues event returns all SQS queues that may be valid targets for further probing/attack.

## AWS CloudTrail - ScheduleKeyDeletion in KMS


 Deleting cryptographic key material managed by KMS can be risky. The risk is that after key material is deleted, cypher text may remain that is now indecipherable. Because of this risk, AWS enforces a minimum 7 day waiting period. A key cannot be deleted, it must first be scheduled for deletion by the system. This signal indicates that a key has been scheduled or canceled for deletion. This signal in context of other signals around this entity may describe a hostile pattern of attack.

## AWS CloudTrail - Secrets Manager sensitive admin action observed


 Administrative changes to the AWS Secrets Manager aren't overtly hostile, but are generally low volume and can be considered sensitive.  These signals highlight when these actions occur and can be used in context of other suspicious activity to raise the risk of a hostile entity.  Several Secrets Manager API actions are included and assessed as sensitive.

## AWS CloudTrail - sensitive activity in KMS


 AWS KMS is an encryption and key management web service.  Besides encrypting and decrypting data, users and administrators can use this service to create keys, manage keys etc.  This signal indicates activity that enables and disables keys explicitly.  This activity has been surveyed to be a low volume event and could be considered suspicious given other activity involving the entity.  Additionally, monitoring for these events is required to achieve certain industry audit compliance.

## AWS CloudTrail Network Access Control List Deleted


 Enforcing network-access controls is one of the defensive mechanisms used by cloud administrators to restrict access to a cloud instance. After the attacker has gained control of the console by compromising an admin account, they can delete a network ACL and gain access to the instance from anywhere.

## AWS CloudWatch Alarm Actions Disabled


 Detects the AWS CloudWatch DisableAlarmActions API action. DisableAlarmActions disables the actions for the specified alarms. When an alarm's actions are disabled, the alarm actions do not execute when the alarm state changes.

## AWS CloudWatch Alarm Deletion


 Detects the AWS CloudWatch DeleteAlarms API action. DeleteAlarms deletes the specified alarms. You can delete up to 100 alarms in one operation. However, this total can include no more than one composite alarm. For example, you could delete 99 metric alarms and one composite alarm with one operation, but you can't delete two composite alarms with one operation.

## AWS CloudWatch Anomaly Detector Deletion


 Detects the AWS CloudWatch DeleteAnomalyDetector API action. DeleteAnomalyDetector deletes the specified anomaly detection model from your account.

## AWS CloudWatch Log Group Deletion


 Detects the AWS CloudWatch DeleteLogGroup API action. DeleteLogGroup deletes the specified log group and permanently deletes all the archived log events associated with the log group.

## AWS CloudWatch Log Stream Deletion


 Detects the AWS CloudWatch DeleteLogStream API action. DeleteLogStream deletes the specified log stream and permanently deletes all the archived log events associated with the log stream.

## AWS Config Recorder Deletion


 Detects the AWS Config DeleteConfigurationRecorder API action. DeleteConfigurationRecorder deletes the configuration recorder.
After the configuration recorder is deleted, AWS Config will not record resource configuration changes until you create a new configuration recorder.

## AWS Config Recorder Stopped


 Detects the AWS Config StopConfigurationRecorder API action. StopConfigurationRecorder stops recording configurations of the AWS resources you have selected to record in your AWS account.

## AWS Config Service Tampering


 Detects various AWS Config API actions that involve the alternation of a Config service.

## AWS ECS Cluster Deleted


 Monitors for execution of the API call 'DeleteCluster' which may indicate that an attacker is attempting to disrupt operations.

## AWS Image Creation


 Detects the creation of an image in AWS.

## AWS Image Deletion


 Detects the deletion of an image in AWS.

## AWS Image Discovery


 Detects various describe and/or list commands used for an image in AWS.

## AWS Image Modification


 Detects the modification of an image in AWS.

## AWS Instance Creation


 Detects the creation of an instance in AWS.

## AWS Instance Deletion


 Detects the deletion of an instance in AWS.

## AWS Instance Discovery


 Detects various describe and/or list commands used for an instance in AWS.

## AWS Instance Modification


 Detects the modification of an instance in AWS.

## AWS Route 53 Domain Registered


 Detects the AWS Route 53 RegisterDomain API action. Domains are registered either by Amazon Registrar (for .com, .net, and .org domains) or by Gandi (for all other domains). An adversary could use this API action to register a domain for malicious activity.

## AWS Route 53 Reconnaissance


 Detects a variety of AWS Route 53 API actions that when observed together could indicate an actor's intent to enumerate the environment.

## AWS Route 53 Service Tampering


 Detects various AWS Route 53 API actions that involve the alteration of a Route 53 service.

## AWS Route 53 TestDNSAnswer


 Detects the AWS Route 53 TestDNSAnswer API action. TestDNSAnswer gets the value that Amazon Route 53 returns in response to a DNS request for a specified record name and type. You can optionally specify the IP address of a DNS resolver, an EDNS0 client subnet IP address, and a subnet mask. An adversary could use this API action for testing if various DNS types and domains are allowed.

## AWS Route 53 Traffic Policy Creation


 Detects the AWS Route 53 CreateTrafficPolicy and CreateTrafficPolicyInstance API actions. These actions are used to create DNS resource record sets for domain or subdomain names.

## AWS Secrets Manager Enumeration


 A ListSecrets API call has been made to the AWS Secrets Manager service. Ensure that this activity is expected and authorized.

## AWS WAF Access Control List Updated


 Detects the AWS WAF UpdateWebACL API action. UpdateWebACL updates the specified WebACL. A web ACL defines a collection of rules to use to inspect and control web requests. Each rule has an action defined (allow, block, or count) for requests that match the statement of the rule. In the web ACL, you assign a default action to take (allow, block) for any request that does not match any of the rules. The rules in a web ACL can be a combination of the types Rule, RuleGroup, and managed rule group. You can associate a web ACL with one or more AWS resources to protect. The resources can be an Amazon CloudFront distribution, an Amazon API Gateway REST API, an Application Load Balancer, or an AWS AppSync GraphQL API.

## AWS WAF Reconnaissance


 Detects a variety of AWS WAF API actions that when observed together could indicate an actor's intent to enumerate the environment.

## AWS WAF Rule Group Updated


 Detects the AWS WAF UpdateRuleGroup API action. UpdateRuleGroup updates the specified RuleGroup. A rule group defines a collection of rules to inspect and control web requests that you can use in a WebACL. When you create a rule group, you define an immutable capacity limit. If you update a rule group, you must stay within the capacity. This allows others to reuse the rule group with confidence in its capacity requirements.

## AWS WAF Rule Updated


 Detects the AWS WAF UpdateRule API action. UpdateRule inserts or deletes Predicate objects in a rule. Each Predicate object identifies a predicate, such as a ByteMatchSet or an IPSet, that specifies the web requests that you want to allow, block, or count.

## AWS WAF Service Tampering


 Detects various AWS WAF API actions that involve the deletion of a WAF service.

## Abnormal Child Process - sdiagnhost.exe - CVE-2022-30190


 Monitors for exploitation of CVE-2022-30190 as indicated by an abnormal child process for sdiagnhost.exe. More information on this vulnerability can be found at the Microsoft Security Response Center: https://msrc-blog.microsoft.com/2022/05/30/guidance-for-cve-2022-30190-microsoft-support-diagnostic-tool-vulnerability/

## Abnormal Parent-Child Process Combination


 This alert detects a Windows process spawned by a parent process that does not normally spawn it.

## Accessibility Executables Replaced


 Observes Sysmon 11 events for accessibility binaries being replaced.

## Active Directory Domain Enumeration


 Potentially detects an attacker attempting to enumerate active users on the network. Attacks will use enumeration tools such as Bloodhound that will quickly query the domain controller by submitting multiple Kerberos ticket requests with forged device names to gather user and group information for those devices.

## Administrator Login via RDP


 This rule looks for successful logins over RDP for administrator accounts.

## Alibaba ActionTrail Access Key Action Detected


 Actions observed that create, import and delete access keys to EC2 could indicate an adversary is taking action on their objective to extend or otherwise manipulate access to EC2 instance(s).

## Alibaba ActionTrail IAM CreateUser Observed


 This signal fires for all observances of the CreateUser action in the IAM event source.  Creating Alibaba Cloud users is likely a benign, infrequent activity.  Hostile actors will create users to persist access.  Use this signal in context of other activity to determine intent.

## Alibaba ActionTrail KMS Activity


 Alibaba KMS is an encryption and key management web service.  Besides encrypting and decrypting data, users and administrators can use this service to create keys, manage keys etc.  This signal indicates activity that enables and disables keys explicitly.  This activity has been surveyed to be a low volume event and could be considered suspicious given other activity involving the entity.  Additionally, monitoring for these events is required to achieve certain industry audit compliance.

## Alibaba ActionTrail Key Deleted or Disabled


 Deleting cryptographic key material managed by KMS can be risky. The risk is that after key material is deleted, cypher text may remain that is now indecipherable. This signal indicates that a key has been scheduled or canceled for deletion. This signal in context of other signals around this entity may describe a hostile pattern of attack.

## Alibaba ActionTrail ListQueues


 This could indicate that an adversary is attempting to collect information for later attack.  When successful, the List Queues event returns all queues that may be valid targets for further probing/attack.

## Alibaba ActionTrail Logging Configuration Change Observed


 Changing the configuration of logging to any mission-critical service or platform should be closely monitored.  This signal identifies when Alibaba logging configurations have been changed.  The severity of signals increases depending on the type of action observed.  For instance disabling/deleting logs is a higher severity than enabling logs.

## Alibaba ActionTrail Network Access Control List Deleted


 Enforcing network-access controls is one of the defensive mechanisms used by cloud administrators to restrict access to a cloud instance. After the attacker has gained control of the console by compromising an admin account, they can delete a network ACL and gain access to the instance from anywhere.

## Alibaba ActionTrail Root Login


 This signal detects when a successful root account login occurred within an Alibaba account. This privileged account should be used within an Alibaba cloud environment on only a seldom basis.

## Alibaba ActionTrail Secrets Manager Activity


 Administrative changes to the Alibaba Secrets Manager aren't overtly hostile, but are generally low volume and can be considered sensitive.  These signals highlight when these actions occur and can be used in context of other suspicious activity to raise the risk of a hostile entity.  Several Secrets Manager API actions are included and assessed as sensitive.

## Alibaba ActionTrail Unauthorized API Calls


 An IAM account sent multiple requests to perform a wide distinct number of Alibaba Cloud actions in a short time frame while receiving error codes. This could indicate an account attempting to enumerate their access across the Alibaba account.

## Allowed Inbound RDP Traffic


 Detects RDP Traffic to a public-facing asset.

## Amazon VPC - Network Scan


 Attackers will often perform reconnaissance against customer environments to better understand resources on the network. In doing this behavior they are usually blocked by firewall rules while performing their discovery. This rule looks for a single source IP address network traffic by AWS security groups to at least 10 different destination IP addresses within a 5-minute window.

## Amazon VPC - Port Scan


 Attackers will often perform reconnaissance against customer environments to better understand resources on the network. In doing this behavior they are usually blocked by firewall rules while performing their discovery. This rule looks for a single source IP address network traffic by AWS security groups to multiple distinct destination port numbers within a short time window.

## Anomalous AWS User Executed a Command on ECS Container


 In general, commands run within a container should be automated via service accounts or conducted by known administrators. Regular users executing commands presents risk and could indicate an attacker attempting to escalate privileges or abuse container resources.

## Antivirus Ransomware Detection


 Malware detected that is determined to be ransomware based on the signature/virus name.

## Attempt to Add Certificate to Store


 Observes for attempts to add a certificate to the untrusted store.

## Attempt to Clear Windows Event Logs Using Wevtutil


 Observes for attempts to clear Windows event logs using wevtutil.

Command line auditing is necessary for this rule to function.

## Attempted Credential Dump From Registry Via Reg.Exe


 Monitors for use of reg.exe with parameters indicating the attempted export of hashed credentials.

Audit Object Access (success &amp; failure) must be enabled for this rule to function.

Monitoring of the following registry keys is necessary:
HKLM\Security
HKLM\Security\Cache
HKLM\System
HKLM\Security\Policy\Secrets
HKLM\Sam

## Attrib.exe use to Hide Files and Folders


 Observes for use of attrib.exe with the hide flag.

The built in Windows utility attrib.exe can be used by adversaries to hide files and folders from the end user, a form of defense evasion.

## Auth0 - High Risk Event


 Passthrough rule for high risk events generated by Auth0

## Authentication Without MFA


 A login was successful where the account did NOT use multi-factor authentication (MFA) to gain access. It is strongly recommended that all accounts used for access require MFA to protect the account in the event credentials are stolen. If MFA is required, it is recommended this rule be enabled for that vendor/product.

## Azorult Malware Registry Key


 Observes for a Windows registry key associated with Azorult malware on a system.

## Azure - Add Member to Group


 Detects a user being added to a group. This may be a routine activity, but could be indicative of an attempt to escalate account privileges. It is recommended to add additional expression logic to this rule to either exclude non-sensitive groups, or to only include sensitive groups.

## Azure - Add Member to Role Outside of PIM


 Privileged Identity Management (PIM) allows administrators to provide users privileged access with greater oversight of activities undertaken  while said access is granted as well as control over the duration of access.

Adding a user to a role, especially one with administrative privileges, outside of PIM may indicate a threat actor attempting to persist privileged access.

## Azure - Anonymous Blob Access


 Detects successful anonymous blob access. This should only occur if a blob container has anonymous read access enabled, which is disabled by default. This could indicate a misconfiguration which may lead to data theft.

## Azure - Bastion Host Created/Modified


 Detects Azure bastion host creations or modifications (Azure records a write operation for either). A new bastion host may be used by an adversary to gain persistence to Azure resources. Modifications of existing bastion hosts may indicate a compromise of these sensitive hosts.

## Azure - Bastion Host Deleted


 Detects Azure bastion host deletions. An adversary might delete a bastion host to deny access to Azure resources.

## Azure - Blob Container Deletion


 Detects removal of cloud storage infrastructure. This may indicate data destruction.

## Azure - Container Instance Creation/Modification


 Detects creations or modifications of Azure containers (Azure logs creations or modifications as write operations). An adversary might create a container for use in malicious activity or to evade detection.

## Azure - Container Start


 Detects Azure container starts. An adversary may use containers for malicious activity or to evade detection.

## Azure - Create User


 Detects user creation. While this is a routine activity, user creation could be used by an adversary for persistence.

## Azure - Diagnostic Setting Deleted


 Detects diagnostic setting deletions, which may represent an adversary disabling logging.

## Azure - Diagnostic Setting Modified


 Detects diagnostic setting modifications, which include disabling certain logging, enabling certain logging, altering the destination of logs, or creating a diagnostic setting.

## Azure - Event Hub Deleted


 Detects Azure Event Hub deletions. Event Hubs are the primary method for logs to be forwarded to a destination outside of Azure (such as a SIEM) and as such, deleting an Event Hub may compromise monitoring.

## Azure - Excessive Key Vault Get Requests


 Detects get requests against Vaults, Secrets, and Keys of 25 or greater in a 24 hour period. This may indicate credential access.

 Certain AppId's may need to be excluded if they are expected to be regularly making these requests. Azure Resource Graph's AppId is excluded already.

## Azure - External User Invitation Redeemed


 Detects when an external user redeems an invitation to create an Azure account. This can be routine activity, but could be used as a mechanism for adversary persistence.

## Azure - External User Invited


 Detects an invitation being created for an external use to create an Azure account. This may be routine activity, but could be used as a vector for an adversary to gain access or persistence.

## Azure - Group Information Downloaded


 Detects group information enumeration. This could be used by an adversary to learn about the environment.

## Azure - High Risk Sign-In (Aggregate)


 Detects Azure high aggregate risk for a user sign in. https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/troubleshooting-identity-protection-faq

## Azure - High Risk Sign-In (Real Time)


 Detects Azure high real-time risk for a user sign in. https://docs.microsoft.com/en-us/azure/active-directory/identity-protection/troubleshooting-identity-protection-faq

## Azure - Image Created/Modified


 Detects creations or modifications of Azure images (Azure logs creations or modifications as write operations). Adversaries may attempt to create malicious images directly on a cloud deployment to avoid detection and establish persistence.

## Azure - Image Deleted


 Detects deletions of Azure images. An adversary may try to destroy data or compromise backups by deleting an image.

## Azure - Key Deletion


 Detects deletions of Azure Key Vault Keys. If a key is not backed up or otherwise recoverable (see soft-delete) it may render content indecipherable, leading to data loss.

## Azure - Key Purged


 Detects purges of Azure Key Vault Keys. If a key is not backed up it may render content indecipherable, leading to data loss. Key purges are performed on already deleted keys and must be explicitly allowed by the access policy as it renders them unrecoverable unless a backup was made.

## Azure - Key Vault Deleted


 Detects deletions of Azure Key Vaults. If a vault is not backed up it may render content indecipherable, leading to data loss.

## Azure - Member Added to Company Administrator Role


 Detects member additions to the Company (Global) Administrator role outside of Privileged Identity Manager (PIM). This is a suspicious activity, and could be performed by an adversary to escalate privileges.

## Azure - Member Added to Company Administrator Role Non-PIM


 Detects member additions to the Company (Global) Administrator role outside of Privileged Identity Manager (PIM). This is a suspicious activity, and could be performed by an adversary to escalate privileges.

## Azure - Member Added to Non-Company Administrator Role


 Detects member additions to a non-administrative role. This is a routine activity, but could be performed by an adversary to escalate privileges.

## Azure - Policy Added


 This rule is designed to monitor for conditional access policy additions. It is recommended to include or exclude certain policies from monitoring for better security value. Expressions are below for inclusion and exclusion.   AND application in ('policy','example')   AND application not in ('policy','example')

## Azure - Policy Deleted


 This rule is designed to monitor for conditional access policy deletions. It is recommended to include or exclude certain policies from monitoring for better security value. Expressions are below for inclusion and exclusion.  AND application in ('policy','example'). AND application not in ('policy','example')

## Azure - Policy Updated


 This rule is designed to monitor for conditional access policy updates. It is recommended to include or exclude certain policies from monitoring for better security value. Expressions are below for inclusion and exclusion.  AND application in ('policy','example')  AND application not in ('policy','example')

## Azure - Protected Item Deletion Attempt


 Detects the attempted deletion of protected items in Azure, such as backups. This may be an indicator of attempted data destruction.

## Azure - Risky User State : User Confirmed Compromised


 This rule detects that an administrator has flagged a sign-in in Identity Protection as not having been performed by the account owner, indicating a compromise.

## Azure - SQL Database Export


 A database export, especially to a public blob container, may indicate data exfiltration in progress.

## Azure - Secret Backup


 Detects Secret backups within the Azure Key Vault. This may be an indication of data exfiltration and credential compromise.

## Azure - Secret Deleted


 Detects deletions of Azure Key Vault Secrets. If a secret is not backed up or otherwise recoverable (see soft delete) it may render content indecipherable, leading to data loss.

## Azure - Secret Purged


 Detects purges of Azure Key Vault Secrets. If a Secret is not backed up it may render content indecipherable, leading to data loss. Secret purges are performed on already deleted secrets and must be explicitly allowed by the access policy as it renders them unrecoverable unless a backup was made.

## Azure - Storage Deletion


 Detects deletions within an Azure Storage Account.  Deletions of shares and public storage blobs may indicate data destruction.

## Azure - Storage Modification


 Detects modifications within an Azure Storage Account. Write events encapsulate both creations and changes to existing objects. Creation or modifications of shares and public storage blobs may indicate exfiltration attempts.

## Azure - Suspicious User Risk State Associated with Login


 Detects if a sign in has been flagged as "at risk" by Azure Active Directory.

## Azure - Unauthorized OAuth Application


 Alert when a non-approved OAuth Application has been identified on Azure. This rule is disabled by default as a list of approved OAuth applications is required to be enabled. The approved applications should be added to the rule logic under the 'application not in' condition.

## Azure - User Information Downloaded


 Detects a user list download. This may be routine activity, or indiciative of an adversary gathering information about the environment

## Azure - Virtual Machine Creation/Modification


 Detects Azure virtual machine creations or modifications (Azure records a write operation for either). A new virtual machine may be used by an adversary to perform malicious activity.

## Azure - Virtual Machine Deleted


 Detects deletions of Azure virtual machines. Virtual machines may be deleted by an adversary to cover their tracks. Additionally, virtual machines might be deleted purely to cause damage.

## Azure - Virtual Machine Started


 Detects a virtual machine starting in Azure. This is most likely routine activity, however virtual machines may also be used for malicious activity.

## Azure - Virtual Machine Stopped


 Detects a virtual machine starting in Azure. This is most likely routine activity, however virtual machines may also be used for malicious activity.

## Azure PRT Token Issued via Non Interactive Login


 Azure Primary Refresh Tokens (PRT) can be used to authenticate  to Azure Active Directory and Azure compute resources. This rule looks for a PRT token successfully issued via a non-interactive login and when a suspicious User Agent is in use.

## AzureDevOps - Project Visibility Changed to Public

 This rule generates a signal when an Azure DevOps project has its visibility changed to a public project.

 ## Backdoor.HTTP.BEACON.[CSBundle CDN GET]


 From FireEye Red Team Tool Countermeasures:
Network detection   rule that looks for specific HTTP headers related to the HTTP GET request   content designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.BEACON.[CSBundle MSOffice GET]


 From FireEye Red Team Tool Countermeasures: Network detection rule that looks for a specific HTTP URI value in combination with HTTP header values and payload content. These are related to the HTTP GET request values designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.BEACON.[CSBundle MSOffice POST]


 From FireEye Red Team Tool Countermeasures: Network detection rule that looks for a specific HTTP URI value in combination with HTTP header values and payload content. These are related to the HTTP POST request values designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.BEACON.[CSBundle NYTIMES GET]


 From FireEye Red Team Tool Countermeasures: Network detection rule that looks for specific HTTP headers and URI content. This is related to the HTTP GET request content designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.BEACON.[CSBundle NYTIMES Server]


 From FireEye Red Team Tool Countermeasures: Network detection rule that looks for specific response body content specified within Cobalt Strike malleable C2 profile. This is used as an attempt to blend in and provide a resemblance of legitimate network communications.

## Backdoor.HTTP.BEACON.[CSBundle Original GET]


 From FireEye Red Team Tool Countermeasures:
Network detection rule that looks for specific HTTP headers and URI content. This is related to the HTTP GET request content designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.BEACON.[CSBundle Original POST]


 From FireEye Red Team Tool Countermeasures:
Network detection rule that looks for specific HTTP header and URI values. These are related to the HTTP POST request content designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.BEACON.[CSBundle Original Stager]


 From FireEye Red Team Tool Countermeasures: Network detection rule that looks for specific HTTP headers and URI content. This is related to the HTTP GET and POST request content designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.BEACON.[CSBundle USAToday GET]


 From FireEye Red Team Tool Countermeasures:
Network detection rule that looks for specific HTTP headers and URI content. This is related to the HTTP GET request content designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.BEACON.[CSBundle USAToday Server]


 From FireEye Red Team Tool Countermeasures: Network detection rule that looks for specific response body content within Cobalt Strike malleable C2 profile. This is used as an attempt to blend in and provide legitimacy within the malware C2 communications.

## Backdoor.HTTP.BEACON.[Yelp GET]


 From FireEye Red Team Tool Countermeasures:
Network detection rule that looks for specific HTTP header and URI values. These are related to the HTTP GET request content designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.BEACON.[Yelp Request]


 From FireEye Red Team Tool Countermeasures:
Network detection rule that looks for specific HTTP header for either a POST or GET request. These are related to the HTTP request content designated within the Cobalt Strike malleable C2 profile.

## Backdoor.HTTP.GORAT.[POST]


 From FireEye Red Team Tool Countermeasures:
GORAT is the modular backdoor portion of the REDFLARE framework. This rule looks for unique content within the HTTP request communications of the backdoor.

## Backdoor.HTTP.GORAT.[SID1]


 From FireEye Red Team Tool Countermeasures: GORAT is the modular backdoor portion of the REDFLARE framework. This rule looks for unique content within the HTTP request communications of the backdoor.

## Backdoor.SSL.BEACON.[CSBundle Ajax]


 From FireEye Red Team Tool Countermeasures: Network detection rule that looks for specific SSL/TLS certificate metadata attempting to masquerade as a legitimate certificate. The content in this rule is looking for a self-signed certificate which is designated within the Cobalt Strike malleable C2 profile.

## Base32 in DNS Query


 By using base32, binary and text data can be encoded in a way that is fully compliant with DNS protocol specifications.  Since common standard base32 uses 2-7 and the letters a-z, entropy must be measured to distinguish from normal text.  The presence of long base32 encoding in a DNS query may indicate tunneling of information out of a network.  Some security vendors and internet providers also use this technique to operate cloud infrastructure or transport information through firewalled environments.

## Base64 Decode in Command Line


 Malicious files are often encoded in an attempt to bypass security controls that would otherwise inspect the contents of said file. An attacker would then need to decode the malicious file for use on the victim machine using a utility such as certutil or the base64 command. This rule supports detection for standard decoding utilities on Unix, Windows cmd, Windows PowerShell, and MacOS.

## Bash History Tampering


 This rule monitors for various methods of deleting or otherwise tampering with .bash_history files which store command history on Linux machines.

## Batch File Write To System32


 The rule looks for a batch file (.bat) written to the Windows system directory tree.

## Bitsadmin to Uncommon TLD


 Detects BITS connections to external domains with uncommon TLDs. Reference: https://isc.sans.edu/forums/diary/Investigating+Microsoft+BITS+Activity/23281/

## Blocked Email Host


 The originator's address is seen in the block list error message, which means an SMTP server sent a reply mentioning an SMTP block list. This is useful to detect local hosts sending SPAM with a high positive rate.

## Blocked Email Message


 An SMTP server sent a reply mentioning an SMTP block list.

## BlueMashroom DLL Load


 Detects a suspicious DLL loading from AppData Local path as described in BlueMashroom report.

## Bluecoat Proxy - Suspicious or Malicious Categories


 This rule triggers any time there is a Suspicious or Malicious Bluecoat category which could indicate there is a problem with the host making the connection.

## Browser Exploitation Framework (BeEF) Hook


 The Browser Exploitation Framework (BeEF) is a penetration-testing tool focusing on web browsers. This rule looks for HTTP communication that include the default BeEF cookie, which indicates a hooked browser.

## Brute Force Attempt


 Detects multiple failed login attempts for the same username over a 24 hour timeframe. This is designed to catch both slow and quick brute force type attacks. The threshold and time frame can be adjusted based on the customer's environment.

 ## COMPlus_ETWEnabled Command Line Arguments


 Potential adversaries stopping ETW providers recording loaded .NET assemblies.

## CPL File Executed from Temp Directory


 CPL files are DLL libraries that export a CPlApplet and are normally executed via the Windows Control Panel GUI interface. Having these files executed via the 'control' command from a temp directory is a strong indicator that an attacker has renamed a malicious DLL file as a CPL file and is attempting execution.

## CVE-2021-44228 Log4j2 Java Library 0-Day Attempt


 Apache Log4j2 &lt;=2.14.1 using JNDI features has an exploit allowing attackers to perform unauthenticated, remote code execution on a Java application that logs user input. This CSE rule looks for attackers attempting to input the string "jndi:" into a field that the application may log to trigger the payload download and execution. This does NOT indicate the application is vulnerable and downloaded the malicious payload, but it does show a hostile actor attempting the attack method.

## Chromium Browser History Access by Non-Browser Process


 Chromium history files contain a wealth of information regarding browser usage patterns. Threat actors may enumerate Chromium history, bookmarks and cookies in order to extract sensitive information from systems.

## Chromium Process Started With Debugging Port


 Chromium (Microsoft Edge or Google Chrome) browsers can be started with a remote debugging port. Threat actors may then connect to this debugging port to enumerate browser information or steal session data including browser cookies.

## Cisco Stealthwatch Template Alerts


 Passthrough alerts from Cisco Stealthwatch

## Cisco Umbrella - DNS Request Category: Adware


 Cisco Umbrella detected a DNS request to a domain categorized as Adware.

## Cisco Umbrella - DNS Request Category: Command and Control


 Cisco Umbrella detected a DNS request to a domain categorized as Command and Control.

## Cisco Umbrella - DNS Request Category: Cryptomining


 Cisco Umbrella detected a DNS request to a domain categorized as Cryptomining.

## Cisco Umbrella - DNS Request Category: DNS Tunneling VPN


 Cisco Umbrella detected a DNS request to a domain categorized as Adware.

## Cisco Umbrella - DNS Request Category: Dynamic DNS


 Cisco Umbrella detected a DNS request to a domain categorized as Dynamic DNS.

## Cisco Umbrella - DNS Request Category: Hacking


 Cisco Umbrella detected a DNS request to a domain categorized as Hacking.

## Cisco Umbrella - DNS Request Category: Malware


 Cisco Umbrella detected a DNS request to a domain categorized as Malware.

## Cisco Umbrella - DNS Request Category: Newly Seen Domains


 Cisco Umbrella detected a DNS request to a domain categorized as Newly Seen Domains. It can be unusual for a host to communicate with a new domain under normal operations, but malware authors register domains specifically for malicious intent will have hosts connect to them shortly after registering them.

## Cisco Umbrella - DNS Request Category: P2P/File sharing


 Cisco Umbrella detected a DNS request to a domain categorized as P2P/File sharing.

## Cisco Umbrella - DNS Request Category: Personal VPN


 Cisco Umbrella detected a DNS request to a domain categorized as Personal VPN.

## Cisco Umbrella - DNS Request Category: Phishing


 Cisco Umbrella detected a DNS request to a domain categorized as Adware.

## Cisco Umbrella - DNS Request Category: Potentially Harmful


 Cisco Umbrella detected a DNS request to a domain categorized as Potentially Harmful.

## Cisco Umbrella - DNS Request Category: Proxy/Anonymizer


 Cisco Umbrella detected a DNS request to a domain categorized as Proxy/Anonymizer.

## Cisco Umbrella - Proxy Logs with Cisco AMP Detections


 Cisco Umbrella proxy logs with a Cisco AMP disposition of malicious was detected.

## Clipboard Copied


 Adversaries may collect data stored in the clipboard from users copying information within or between applications.

## Cloud Credential File Accessed


 When connecting to various cloud services using Azure PowerShell, Az PowerShell, AWS CLI, Google Cloud CLI or Kubeconfig, credential material may be left on the file system. Threat actors may read or exfiltrate this credential material in order to gain unauthroized access to various cloud resources from on premises hosts.

## Command Line Execution with Suspicious URL and AppData Strings


 Detects a suspicious command line execution that includes an URL and AppData string in the command line parameters as used by several droppers.

## Connection to High Entropy Domain


 An HTTP connection was made to a high entropy domain name. Entropy is a measure of randomness, DGA domains used by malware (i.e. g46mbrrzpfszonuk) often have high entropy.

## Container Management Utility in Container


 Detects execution of a container management utility (for example, kubectl or docker) in a container.

## Container Running as Root


 Monitors for usage of the root account within a container. This presents unnecessary risk and could also indicate a compromise where the attacker has successfully escalated privileges.

## Copy from Admin Share


 Detects a suspicious copy command from a remote C$ or ADMIN$ share.

## CrashControl Registry Modification


 Detects changes to the CrashControl registry key. This can be used to disable crash dumps as an anti-forensic technique.

## Create Windows Share


 Observes for net.exe being used to create a network share.

## Cred Dump-Tools Named Pipes


 Detects well-known credential dumping tools execution via specific named pipes.

## Credential Dumping Via Copy Command From Shadow Copy


 This rule detects credential dumping using copy command from a shadow copy.

## Credential Dumping Via Symlink To Shadow Copy


 This rule detects the creation of a symlink to a shadow copy.

## Credential Dumping by LaZagne


 Detects LSASS process access by LaZagne for credential dumping.

## Critical Severity Intrusion Signature


 This rule looks for an intrusion product detecting a critical severity intrusion signature sourcing from an internal IP.

## Crypto Miner HTTP User Agent


 This signal looks for HTTP requests where the user agent matches common names associated with crypto miners. It is common for attackers to install crypto miners on compromised hosts to use your CPU resources for their profit.

## Crypto Miner User Agent


 Observes for several known cryptominer user agents.

## Curl Start Combination


 Adversaries can use curl to download payloads remotely and execute them. Curl is included by default in Windows 10 build 17063 and later.

## Cylance Protect - Event Severity 1


 Cylance Protect event with the severity between -0.199 and -0.001

## Cylance Protect - Event Severity 2


 Cylance Protect event with the severity between -0.299 and -0.200

## Cylance Protect - Event Severity 3


 Cylance Protect event with the severity between -0.399 and -0.300

## Cylance Protect - Event Severity 4


 Cylance Protect event with the severity between -0.499 and -0.400

## Cylance Protect - Event Severity 5


 Cylance Protect event with the severity between -0.599 and -0.500

## Cylance Protect - Event Severity 6


 Cylance Protect event with the severity between -0.699 and -0.600

## Cylance Protect - Event Severity 7


 Cylance Protect event with the severity between -0.799 and -0.700

## Cylance Protect - Event Severity 8


 Cylance Protect event with the severity between -0.899 and -0.800

## Cylance Protect - Event Severity 9


 Cylance Protect event with the severity between -1.000 and -0.900

 ## DCE-RPC Service Control Call


 The Remote Procedure Call (RPC) protocol allows remote administrative commands to be executed.  Creating/Deleting Services, when combined with other signals can be part of an attempt to expand influence inside a network using SMB and related protocols.

## DCERPC - SAMR Enumeration of All Users


 Microsoft provides a protocol called SAMR which stands for Security Account Manager Remote Protocol. It is designed for developers to perform (RPC) remote procedure calls for interacting the account database for both local and remote Activity Directory domains. It contains a method called SamrEnumerateUsersInDomain which return a list of users in a domain. Attackers who have network access to the domain can use this method to enumerate a list of user accounts in Active Directory. This signal looks for an RPC connection using the SAMR protocol with the method SamrEnumerateUsersInDomain signifying a request to enumerate user accounts over the network.

## DNS DGA Lookup Behavior - NXDOMAIN Responses


 Adversaries may make use of Domain Generation Algorithms (DGAs) to dynamically identify a destination for command and control traffic rather than relying on a list of static IP addresses or domains. This has the advantage of making it much harder for defenders to block, track, or take over the command and control channel, as there could potentially be thousands of domains that malware can check for instructions. This technique is described in https://attack.mitre.org/techniques/T1483/.

## DNS Lookup of High Entropy Domain


 DNS lookup of a high entropy domain name, which may be indicative of a domain generation algorithm (DGA) related domain.  This technique is described at https://attack.mitre.org/techniques/T1483/.

## DNS RCE Exploit CVE-2020-1350


 Detects exploitation of DNS RCE bug reported in CVE-2020-1350 by the detection of suspicious sub process.

## DNS query for dynamic DNS provider


 Dynamic DNS providers are often abused to host malware control servers and other malicious content. https://attack.mitre.org/techniques/T1311/ and https://attack.mitre.org/techniques/T1333/ describe the use of this technique by attackers.

## DNS.EXE Observed as Parent Process


 With very few exceptions, the DNS.EXE program should not spawn other processes.  This could be an indication that the process is a trojan, or has been compromised.  This behavior against DNS has been shown as a behavioral indicator after successful attacks (i.e. SigRED).

## DPAPI Key Manipulation - Backup of Backup Key


 The DPAPI (Data Protection Application Programming Interface) Key is used to encrypt user details. Actors may attempt to attack the DPAPI on the Domain Controllers to gain further access.

## DPAPI Key Manipulation - Extracting Backup Key


 The DPAPI (Data Protection Application Programming Interface) Key is used to encrypt user details. Actors may attempt to attack the DPAPI on the Domain Controllers to gain further access.

## DTRACK Process Creation


 Detects specific process parameters as seen in DTRACK infections.

## Delete Windows Share


 Observes for net.exe being used to delete a network share.

## Detect Psexec With Accepteula Flag


 This rule looks for events where PsExec.exe is run with the accepteula flag in the command line. PsExec is a built-in Windows utility that enables you to execute processes on other systems. It is fully interactive for console applications. This tool is widely used for launching interactive command prompts on remote systems. Threat actors leverage this extensively for executing code on compromised systems. If an attacker is running PsExec for the first time, they will be prompted to accept the end-user license agreement (EULA), which can be passed as the argument accepteula within the command line.

## Direct Outbound DNS Traffic


 This rule detects DNS traffic sent directly to an external server from an internal host, bypassing the existing DNS structure. This could indicate an attacker attempting to conduct command and control without being subjected to DNS monitoring.

## Directory Traversal - Successful


 Directory traversal is an attempt by an attacker to access files located on the host which are not intended to be returned by the web server. For example, attackers seeking usernames/passwords for the host will focus on paths like ../../etc/passwd, ../../../etc/shadow, etc. When successful, a directory traversal attack results in the attacker gaining access to sensitive information and identifying a mechanism of future attack. When unsuccessful, directory traversal is an indication of ongoing external reconnaissance.

## Directory Traversal - Unsuccessful


 Directory traversal is an attempt by an attacker to access files located on the host which are not intended to be returned by the web server. For example, attackers seeking usernames/passwords for the host will focus on paths like ../../etc/passwd, ../../../etc/shadow, etc. When successful, a directory traversal attack results in the attacker gaining access to sensitive information and identifying a mechanism of future attack. When unsuccessful, directory traversal is an indication of ongoing external reconnaissance.

## Disabled Account Logon Attempt


 Detects a disabled account being used for a logon attempt in a Windows environment.

## Disabling Remote User Account Control


 The rule looks for modifications to registry keys that control the enforcement of Windows User Account Control (UAC).

## Dnscat Execution


 Observes for keywords associated with execution of DNScat malware via powershell.

## Domain Brute Force Attempt


 Detects multiple failed login attempts for the same username over a 1 hour timeframe. This is designed to catch attacks leveraging domain resources to attempt credential validation. The threshold and time frame can be adjusted based on the customer's environment.

## Domain Password Attack


 Detects multiple failed login attempts from a single source with unique usernames over a 1 hour timeframe. This is designed to catch attacks leveraging domain resources to attempt credential validation. The threshold and time frame can be adjusted based on the customer's environment.

## Domain Resolution in Non-Standard TLD

 DNS resolution of a domain that is not under an ICANN-standard TLD. These TLDs are provided by alternate DNS root servers such as OpenNIC. Their use on corporate networks is fundamentally suspicious and potentially a sign of abuse by threat actors.

## Doublepulsar scan - likely not infected

 Doublepulsar scans to check if the host is already infected before attempting to install the backdoor.

## Dridex Process Pattern

 Detects typical Dridex process patterns.

 ## Elise Backdoor


 Observes for indicators associated with Elise backdoor activity as used by APT32.

## Email Files Written Outside Of The Outlook Directory


 The rule detects email files created outside the normal Outlook directory.

## Emotet Process Creation


 Observes for command lines associated with Emotet malware.

## Empire PowerShell Launch Parameters


 Observes for several command line parameters associated with Empire PowerShell.

## Equation Group DLL_U Load


 Observes for a tool and export tied to the Equation Group.

## Excavator Utility


 From FireEye Red Team Tool Countermeasures: Excavator is a tool for dumping the process via a service. It can also dump the process directly if not used as a service.

## Excessive Firewall Denies


 This rule is designed to detect excessive firewall blocks within a shortened time frame. Customers will need to adjust the threshold of this rule to align with their environment's normal vs abnormal firewall traffic patterns.

## Excessive Outbound Firewall Blocks


 Observes for a firewall blocking a large amount of traffic from a single host in a short period of time. This may be indicative of C2 traffic.

## Excessive Use of Escape Characters in Command Line


 Fluffing a malicious command line input with escape characters is sometimes done in an attempt to avoid endpoint monitoring techniques that rely on exact string or regex matches.

## Executable Downloaded - Content-Type Mismatch


 This rule identifies scenarios where an attacker may have attempted to surreptitiously download an executable file by hiding it behind a different Content-Type, such as image/png. This technique has been observed in samples of Trickbot malware.

## Exfiltration and Tunneling Tools Execution


 Execution of well known tools for data exfiltration and tunneling.

## Exposed AWS SNS Topic Created


 An AWS Simple Notification Service (SNS ) topic was created allowing all users access to perform actions against the created topic

## Exposed AWS SQS Queue Created


 An AWS Simple Queue Service (SQS) can be created with a custom access policy. This signal triggers when a policy is applied to an SQS queue which allows global access from the internet with an IP range of 0.0.0.0/32 (all).

## External Device Installation Denied


 Detects a denied attempt to attach a removable media device. External media can be used to exfiltrate sensitive data and is also a common source of infections. Attempts to use these devices could indicate the intent for malicious activity.

## Fake Windows Processes


 Observes for known Windows processes being executed outside of normal directories (System32 and SysWOW64). This would indicate process masquerading.

Note that this rule requires creating a match list 'known_windows_processes' containing known OK Windows processes that would not normally be executed outside of System32 or SysWOW64.

## File or Folder Permissions Modifications


 Detects a file or folder permissions modifications.

## Findstr Launching .lnk File


 Detects usage of findstr to identify and execute a lnk file as seen within the HHS redirect attack.

## Firewall Allowed SMB Traffic


 Observes for SMB traffic allowed through the firewall.

## First Seen Access - SMB Share


 Adversaries may access a networked system remotely using Server Message Block (SMB) to transfer files, and run transferred binaries through remote execution. Although not malicious on its own, this first-seen access to a DISK share over SMB can be an indicator of lateral movement.

## Fortinet Critical App-Risk

 This signal fires when Fortinet identifies a critical risk application in use within the network.

## Fortinet High App-Risk
This signal fires when Fortinet detects a high risk application within the environment.

## G Suite - Access - Access Transparency


 Detects Google Access Transparency Activity Events.

## G Suite - Admin - User Settings - Turn Off 2SV


 Detects admin disabled 2SV for user.

## G Suite - Admin Activity


 The admin activity report returns information on the Admin console activities of all of your account's administrators.

## G Suite - Drive - Drive Open To Public


 Detects Google Drive resource shared publicly.

## G Suite - Excessive OAuth Application Permissions Scope


 Alert when an OAuth application has requested a high number of permissions to aspects of G Suite.

## G Suite - Login - Account Warning


 Detects Google Accounts warnings.

## G Suite - Login - Government Attack Warning


 Detects government-backed attack warnings.

## G Suite - Mobile - Suspicious Activity


 Google G Suite alert for mobile suspicious activity.

## G Suite - Unauthorized OAuth Application


 Alert when a non-approved OAuth Application has been identified on Google G Suite. This rule is disabled by default as a list of approved OAuth applications is required to be enabled. The approved applications should be added to the rule logic under the 'application not in' condition.

## G Suite - User Accounts - 2SV Disabled


 Detects user disabled 2SV.

## GCP Audit Cloud SQL Database Modified


 Detect when a Cloud SQL DB has been modified.

## GCP Audit GCE Firewall Rule Modified


 Detect when a firewall rule is created, modified or deleted.

## GCP Audit GCE Network Route Created or Modified


 Detect when a firewall route is created or modified.

## GCP Audit GCE VPC Network Modified


 Detect when a VPC network is created.

## GCP Audit IAM CreateServiceAccount Observed


 This signal fires for all observances of the CreateServiceAccount action in the IAM event source. Hostile actors will create service accounts to persist access. Use this signal in context of other activity to determine intent.

## GCP Audit IAM Custom Role Created or Modified


 Detect when a custom role is created or modified.

## GCP Audit IAM Custom Role Deletion


 Identifies an Identity and Access Management (IAM) role deletion in Google Cloud Platform (GCP). A role contains a set of permissions that allows you to perform specific actions on Google Cloud resources. An adversary may delete an IAM role to inhibit access to accounts utilized by legitimate users.

## GCP Audit IAM DeleteServiceAccount Observed


 Identifies when a service account is deleted in Google Cloud Platform (GCP). A service account is a special type of account used by an application or a virtual machine (VM) instance, not a person. Applications use service accounts to make authorized API calls, authorized as either the service account itself, or as G Suite or Cloud Identity users through domain-wide delegation. An adversary may delete a service account in order to disrupt their target's business operations.

## GCP Audit IAM DisableServiceAccount Observed


 Identifies when a service account is disabled in Google Cloud Platform (GCP). A service account is a special type of account used by an application or a virtual machine (VM) instance, not a person. Applications use service accounts to make authorized API calls, authorized as either the service account itself, or as G Suite or Cloud Identity users through domain-wide delegation. An adversary may disable a service account in order to disrupt their target's business operations.

## GCP Audit KMS Activity


 GCP KMS is an encryption and key management web service. Besides encrypting and decrypting data, users and administrators can use this service to create keys, manage keys etc. This signal indicates activity that enables and disables keys explicitly. This activity has been surveyed to be a low volume event and could be considered suspicious given other activity involving the entity. Additionally, monitoring for these events is required to achieve certain industry audit compliance.

## GCP Audit Key Deleted or Disabled


 Deleting cryptographic key material managed by KMS can be risky. The risk is that after key material is deleted, cypher text may remain that is now indecipherable. This signal indicates that a key has been scheduled or canceled for deletion. This signal in context of other signals around this entity may describe a hostile pattern of attack.

## GCP Audit ListQueues


 This could indicate that an adversary is attempting to collect information for later attack. When successful, the List Queues event returns all queues that may be valid targets for further probing/attack.

## GCP Audit Logging Sink Modified


 Detect when a change to a GCP logging sink has been made. This could stop audit logs from being sent.

## GCP Audit Pub/Sub Subscriber Modified


 Detect when a change to a GCP Pub/Sub Subscription has been made. This could stop audit logs from being sent.

## GCP Audit Pub/Sub Topic Deleted


 Detect when a GCP Pub/Sub Subscribtion has been deleted. This could stop audit logs from being sent.

## GCP Audit Reconnaissance Activity


 This signal identifies GCP API GET and LIST actions that when observed in combination could indicate an actors intent to enumerate the environment. These events are generally benign, and occur during normal operations. Use this signal as context around an unfolding security story.

## GCP Audit Secrets Manager Activity


 Administrative changes to the GCP Secrets Manager aren't overtly hostile, but are generally low volume and can be considered sensitive. These signals highlight when these actions occur and can be used in context of other suspicious activity to raise the risk of a hostile entity. Several Secrets Manager API actions are included and assessed as sensitive.

## GCP Audit Unauthorized API Calls


 An IAM account sent multiple requests to perform a wide distinct number of GCP Cloud actions in a short time frame while receiving the error codes. This could indicate an account attempting to enumerate their access across the GCP account.

## GCP Bucket Enumerated


 Detects when a service account lists out GCS buckets.

## GCP Bucket Modified


 Detect when an administrative change to a GCS Bucket has been made. This could change the retention policy or bucket lock.

## GCP Bucket Open


 A GCP request occurred to either create a new public or open bucket. While there are some use cases for GCP S3 public buckets, most are generally private. The security operations center should have a strong understanding of which buckets are allowed to be public.

## GCP GCPloit Exploitation Framework Used


 Generates a signal when the GCPloit exploitation framework is detected. This framework can be used to escalate privileges and move laterally from compromised high privilege accounts.

## GCP Image Creation


 Detects the creation of an image in GCP.

## GCP Image Deletion


 Detects the deletion of an image in GCP.

## GCP Image Discovery


 Detects various discovery commands used for images in GCP.

## GCP Image Modification


 Detects the modification of an image in GCP.

## GCP Instance Creation


 Detects the creation of an instance in GCP.

## GCP Instance Deletion


 Detects the deletion of an instance in GCP.

## GCP Instance Discovery


 Detects various discovery commands used for instances in GCP.

## GCP Instance Modification


 Detects the modification of an instance in GCP.

## GCP Permission Denied


 The caller doesn't have permission to execute the specified operation.

## GCP Port Scan


 Attackers will often perform reconnaissance against customer environments to better understand resources on the network. This rule looks for a single source IP scanning for different ports across the same destination.

## GCP Port Sweep


 Attackers will often perform reconnaissance against customer environments to better understand resources on the network. This rule looks for a single source IP scanning for the same port across multiple destinations.

## GitHub Raw URL Resource Request

 GitHub.com is the most popular code repo site on the internet. Typically, users of GitHub will look at the code from the GitHub.com website or clone it locally to their system. You can however request a raw version of a individual file directly. Attackers like to use GitHub as well to host their malicious code and will often download malicious files and scripts directly from the site which uses the domain raw.githubusercontent.com instead of github.com. This signal looks for HTTP requests to that raw domain to monitor individual file downloads from the site.

## Global YARA Rule


 A YARA rule matched on a collected file.

## Golden SAML Indicator : Certificate Export


 Observes for multiple methods of certificate export which may indicate that an attacker is attempting to bypass multifactor authentication using a stolen certificate.

This rule utilizes indicators from Windows command line auditing, PowerShell auditing, and Sysmon named pipe connections.

## Grabbing Sensitive Hives via Reg Utility


 Dump sam, system or security hives using REG.exe utility.

## Greenbug Campaign Indicators


 Detects tools and process executions as observed in a Greenbug campaign in May 2020.

## HTTP CloudFlare Protocol Violation or Empty Response

 Error code 520 is used as a catch-all status when the origin server returns something that is unexpected, not tolerated, or not interpreted. This can include protocol violations and empty responses.

 ## Kubernetes DeleteCronjob

 Detects kubectl used to delete Kubernetes cronjobs. Kubernetes Job is a controller that creates one or more pods and ensures that a specified number of them successfully terminate. Kubernetes Job can be used to run containers that perform finite tasks for batch jobs. Kubernetes CronJob is used to schedule Jobs. Attackers may use Kubernetes CronJob for scheduling execution of malicious code that would run as a container in the cluster.

 ## HTTP External Request to PowerShell Extension


 Attackers will often download a PowerShell script from an external web server to help maintain persistence or to invoke additional functionally on Windows machines. It is not common for internal computers to download PowerShell scripts over HTTP from an external web server, but in some rare cases software like Anti-Virus does perform this behavior.

## HTTP Request to Domain in Non-Standard TLD


 HTTP request to a domain that is not under an ICANN-standard TLD. These TLDs are provided by alternate DNS root servers such as OpenNIC. Their use on corporate networks is fundamentally suspicious and potentially a sign of abuse by threat actors.

## HTTP Request with Single Header


 HTTP requests typically have multiple headers. It is odd in some cases if the event only contains a single header. This produces a low severity signal when an HTTP event is observed containing only one header in the request.

## HTTP Response Error Spike - External


 HTTP web services provide response codes to client requests. The response code numbers in the 400s are used to indicate a client related error and response code numbers in the 500s represent server related errors. This rule looks for a web client receiving a large frequency of web errors within a short period of time. It is unusual for a web client to cause this many errors in a short period of time. Common occurrences for this behavior is scanning/probing activity or scripted web clients which are now encountering errors due to a misconfiguration or recent change. This rule alerts when a host external to the monitored network triggers the threshold.

## HTTP Response Error Spike - Internal


 HTTP web services provide response codes to client requests. The response code numbers in the 400s are used to indicate a client related error and response code numbers in the 500s represent server related errors. This rule looks for a web client receiving a large frequency of web errors within a short period of time. It is unusual for a web client to cause this many errors in a short period of time. Common occurrences for this behavior is scanning/probing activity or scripted web clients which are now encountering errors due to a misconfiguration or recent change. This rule alerts when a host on the monitored network triggers the threshold.

## HTTP Shell Script Download Disguised as a Common Web File


 Attackers who have compromised Unix/Linux machines will sometimes download additional payloads using clear text HTTP where a shell script is downloaded disguised with another file extension. This signal looks for HTTP requests to common web file extensions where the network sensor detected a shell script was returned.

## HTTP activity over port 53 - Possible SIGRED


 Detects a possible exploitation of CVE-2020-1350 (aka SIGRED) using rare HTTP requests over port 53. HTTP should rarely (if ever) hosted on port 53. Technique:  T1068.  Derived from SOC Prime logic.

## HTTP request for single character file name


 Many threats are served from websites using lazy single character based filenames like 1.exe, etc. These nondescript file names are rare with most legitimate content. This rule looks for requests to retrieve high risk file extensions from such paths.

## Hexadecimal User-Agent


 User-Agent strings with hexadecimal values are often indicative of malware.

## Hexadecimal in DNS Query Domain


 Encoding in hexadecimal is a way that attackers can bypass network security devices that are inspecting traffic.  While hexadecimal often appears in subdomains, it much less frequent in domains.

## High Severity Intrusion Signature


 This rule looks for an intrusion product detecting a high severity intrusion signature sourcing from an internal IP.

## High Volume of DNS 'Any' Queries


 Observes for a large number of DNS 'Any' queries which may be indicative of a Distributed Denial of Service Attack (DDoS)

## High risk file extension download without hostname and referrer


 Although executable and dynamic-link libraries (.exe, .dll) are regularly downloaded from the Internet, benign ones are normally downloaded with the hostname and referrer fields populated. Thus, downloads from an IP address without referrer carry an elevated risk.

## Houdini/Iniduoh/njRAT User-Agent


 User-Agent strings used by Houdini/Iniduoh/njRAT malware.

## IP Address Scan - External


 A scan of IP addresses.

## IP Address Scan - Internal


 A scan of IP addresses.

## Impacket Lateralization Detection


 Detects wmiexec/dcomexec/atexec/smbexec from Impacket framework.

 ## Impacket-Obfuscation SMBEXEC Utility


 From FireEye Red Team Tool Countermeasures: Impacket-Obfuscation is a slightly obfuscated version of the open source Impacket framework. This IOC looks for artifacts from the execution of SMBEXEC python script which is part of Impacket-Obfuscation framework.

## Impacket-Obfuscation WMIEXEC Utility


 From FireEye Red Team Tool Countermeasures: Impacket-Obfuscation is a slightly obfuscated version of the open source Impacket framework. This IOC looks for artifacts from the execution of WMIEXEC python script which is part of Impacket-Obfuscation framework.

## Impossible Travel - Successful


 This signal triggers when there are two successful logins from the same user with different country codes indicating possible credential theft. It is recommended to add filtering criteria to the expression to reduce false positives, such as known VPN addresses.

## Impossible Travel - Unsuccessful


 This signal triggers when there are two failed logins from the same user with different country codes indicating a possible credential theft attempt. It is recommended to add filtering criteria to the expression to reduce false positives, such as known VPN addresses.

## Inbound Port Scan


 This rule detects port scanning activity from external actors against public facing assets.

## Informational Severity Intrusion Signature


 This rule looks for an intrusion product detecting an informational severity intrusion signature sourcing from an internal IP.

## Interactive Logon to Domain Controller


 Detects an interactive login to a domain controller. Direct access in this manner is rarely necessary and should be closely audited given the potential impact of a compromised domain controller.

## Interactive Logon with Service Account


 Detects an interactive login using a service account. Service accounts should only be used by applications or services and not users. An interactive logon indicates a user has the service account credentials.

## Internal Communication on Unassigned Low Ports - Destination Match


 Many ports in the 0-1023 are unassigned by the IANA.  These can be used as communication channels inside a network, as there are rarely legitimate services using these ports.

## Internal Port Scan


 This rule detects port scanning activity from one internal IP address to another, possibly indicating an attacker enumerating the network for lateral movement.

## Internal Port Sweep


 This rule detects port scanning activity from one internal IP address to numerous others on the same destination port, possibly indicating an attacker enumerating the network for lateral movement.

## Intrusion Scan - Targeted


 This rule looks for an intrusion product detecting an internal IP sending different exploits to another IP in a short timeframe.

## Intrusion Sweep


 This rule looks for an intrusion product detecting an internal IP sending the same exploit to multiple IPs in a short timeframe.

 ## Judgement Panda Credential Access Activity


 Detects Russian group activity as described in Global Threat Report 2019 by Crowdstrike.

## Judgement Panda Exfil Activity


 Detects Judgement Panda activity as described in Global Threat Report 2019 by Crowdstrike.

## KeePass Brute Force Tool Detection


 Detects the use of a PowerShell KeePass brute force tool used in a dictionary attack to find and dump the passwords of a KeePass kdbx file.

## KeeThief Detection


 KeeThief is a tool that allows for the extraction of KeePass 2.X key material from memory, as well as the backdooring and enumeration of the KeePass trigger system.

## Kerberos Manipulation


 This method triggers on rare Kerberos Failure Codes caused by manipulations of Kerberos messages.

## Keychain Credential Dumping


 Attackers may dump the content of the keychain storage data from a system to acquire credentials.

## Keychain Directory Zipped


 This rule the Keychains directory on MacOS being zipped. This is a common technique used by malware in order to grab the keychains of an infected system.

## Known Ransomware File Extensions


 Observes for common file extensions associated with ransomware indicating the presence of encrypted files.

Some known ransomware file extensions are shared with other applications and may cause this rule to fire.

File extension list sourced from:
https://techviral.net/ransomware-encrypted-file-extensions/

## Kubernetes AWS Suspicious kubectl Calls


 Kubectl calls are not malicious by nature. However IP, user and user agent can reveal potential malicious activity, specially anonymous users suspicious IPs and sensitive objects such as configmaps or secrets.

## Kubernetes Anonymous Request Authorized


 Detect when an unauthenticated request user is permitted in Kubernetes.

## Kubernetes CreateCronjob


 Detects kubectl used to create Kubernetes cronjobs. Kubernetes Job is a controller that creates one or more pods and ensures that a specified number of them successfully terminate. Kubernetes Job can be used to run containers that perform finite tasks for batch jobs. Kubernetes CronJob is used to schedule Jobs. Attackers may use Kubernetes CronJob for scheduling execution of malicious code that would run as a container in the cluster.

## Kubernetes ListCronjobs


 Detects kubectl used to list Kubernetes cronjobs. Kubernetes Job is a controller that creates one or more pods and ensures that a specified number of them successfully terminate. Kubernetes Job can be used to run containers that perform finite tasks for batch jobs. Kubernetes CronJob is used to schedule Jobs. Attackers may use Kubernetes CronJob for scheduling execution of malicious code that would run as a container in the cluster.

## Kubernetes ListSecrets


 Detects kubectl used to list Kubernetes secrets. A Kubernetes secret is an object that lets users store and manage sensitive information, such as passwords and connection strings in the cluster. Secrets can be consumed by reference in the pod configuration. Attackers who have permissions to retrieve the secrets from the API server (by using the pod service account, for example) can access sensitive information that might include credentials to various services.

## Kubernetes Pod Created in Kube Namespace


 Detect when a user is creating a pod in one of the Kubernetes default namespaces. The only users creating pods in the kube-system namespace should be cluster administrators. Furthermore, it is best practice to not run any cluster critical infrastructure in the kube-system namespace. The kube-public namespace is intended for Kubernetes objects which should be readable by unauthenticated users. Thus, a pod should likely not be created in the kube-public namespace.

## Kubernetes Pod Created with hostNetwork


 Detect when a pod is attached to the host network. Attaching the hostNetwork permits a pod to access the node’s network adapter allowing a pod to listen to all network traffic for all pods on the node and communicate with other pods on the network namespace.

## Kubernetes Pod Deletion


 Detects the deletion of Kubernetes pods using kubectl. Adversaries may delete pods as a way to clean up after executing their actions.

## Kubernetes Service Account Created in Kube Namespace


 Detect when a user is creating a service account in one of the Kubernetes default namespaces. The only users creating service accounts in the kube-system namespace should be cluster administrators. Furthermore, it is best practice to not run any cluster critical infrastructure in the kube-system namespace. The kube-public namespace is intended for kubernetes objects which should be readable by unauthenticated users. Thus, a service account should likely not be created in the kube-public namespace.

## Kubernetes Service Account Token File Accessed


 Detects access to the Kubernetes service account access token that is stored within a container in a cluster.

## Kubernetes Service Created with NodePort


 Detect when a service’s port is attached to the node’s IP. Exposing the service’s port to the the node’s IP allows other hosts on the network namespace to access this service.

## Kubernetes User Attached to a Pod


 Detect when a user attaches to a pod. A user should not need to attach to a pod. Attaching to a pod allows a user to attach to any process in a running container which may give an attacker access to sensitive data.

## Kubernetes User Exec into a Pod


 Detect when a user execs into a pod. A user should not need to exec into a pod. Execing into a pod allows a user to execute any process in container which is not already running. It is most common to execute the bash process to gain an interactive shell. If this is an attacker, they can access any data which the pod has permissions to, including secrets.

## LNKSmasher Utility Commands


 From FireEye Red Team Tool Countermeasures:
LNKSmasher embeds an arbitrary payload in an LNK that can be executed by the embedded command. This IOC will detect the commands executed by both the new and old version of LNKSmasher.

## LSASS Memory Dump


 Detects memory dumping from LSASS.

For this rule to work, Microsoft SysInternal Sysmon must be running on the endpoint.

## LSASS Memory Dumping


 Detect creation of dump files containing the memory space of lsass.exe, which contains sensitive credentials. Identifies usage of Sysinternals procdump.exe to export the memory space of lsass.exe which contains sensitive credentials.

## Large File Upload


 Observes for file uploads above 50MB in size. It is recommended to tune this rule to desired file size threshold for your organization as well as to exclude users/systems typically sending large outbound files.

## Large Outbound ICMP Packets


 A typical ping packet will be very small. A large ICMP packet may indicate the presence of command and control traffic.

## Lateral Movement Using the Windows Hidden Admin Share


 Detects pivoting to an internal host from another internal host. Attackers will connect to the ADMIN$ share of an internal host and upload a program to execute remote commands to fully compromise the host.

## Likely doublepulsar Infected


 Hosts infected with the Doublepulsar typically exhibit this type of SMB behavior.

## Linux Host Entered Promiscuous Mode


 Promiscuous mode causes a network interface to send all traffic frames it receives to the host's CPU rather than only the frames designated for the receiver. This is required for several packet sniffing tools, such as tcpdump or Wireshark, and should be scrutinized for legitimacy. Network administrators may need to be tuned out of this rule.

## Linux Security Tool Usage


 This rule monitors for usage of the default command or script names associated with penetration testing tools used on Linux machines. While these commands can be renamed to avoid detection, less sophisticated attackers will often neglect to do so.

## Loadable Kernel Module Dependency Install


 Detects commands associated with the installation of loadable kernel modules. LKMs can be used on Linux systems to accomplish persistence by modifying the kernel to execute malicious programs at boot automatically.

## Loadable Kernel Module Enumeration


 Detects commands associated with enumerations of loadable kernel modules. LKMs can be used on Linux systems to accomplish persistence by modifying the kernel to execute malicious programs at boot automatically.

## Loadable Kernel Module Modifications


 Detects commands associated with modifications to loadable kernel modules. LKMs can be used on Linux systems to accomplish persistence by modifying the kernel to execute malicious programs at boot automatically.

## Local User Created


 Observes for the creation of a local Windows user account. Informational signal, severity 0.

## Logon with Local Credentials


 Observes for unexpected local logins. This rule includes 2 match lists to be populated with the active directory domains and permitted local accounts.

## Long URL Containing SQL Commands


 Observes for long URLs with possible SQL commands within them, an indication of SQL injection activity

## Low Severity Intrusion Signature


 This rule looks for an intrusion product detecting a low severity intrusion signature sourcing from an internal IP.

## Lsass Registry Key Modified


 This rule monitors for changes to lsass.exe-related registry keys that are often edited to enable or obfuscate activity related to dumping the process.

 ## MS Office Memory Corruption Vulnerability Exploit


 Observes for exploitation of Microsoft Office Memory Corruption Vulnerability (CVE-2015-1641).

## MS Office Product Spawning Msdt.exe - CVE-2022-30190


 Monitors for exploitation of CVE-2022-30190 as indicated by a Microsoft Office executable spawning msdt.exe. More information on this vulnerability can be found at the Microsoft Security Response Center: https://msrc-blog.microsoft.com/2022/05/30/guidance-for-cve-2022-30190-microsoft-support-diagnostic-tool-vulnerability/

## MS-LSAT Username Enumeration


 The MS-LSAT Remote Protocol provides a number of RPC calls that can be used to map security principal SIDs to usernames. Attackers could use this technique to perform username enumeration and identify accounts on targeted systems.

## MSHTA Suspicious Execution


 Detection for mshta.exe suspicious execution patterns sometimes involving file polyglotism.

## MacOS - Re-Opened Applications


 This rule looks for processes referencing the plist files that determine which applications are re-opened when a user reboots their machine. This may also detect commands associated with login hooks being executed.

## MacOS Gatekeeper Bypass


 The com.apple.quarantine flag is usually automatically set for downloaded files and invokes Apple's Gatekeeper program for file analysis. As such, attackers may attempt to remove this flag from malware payloads using the xattr command. Note that files downloaded via curl, external media, or from shared drives on the local network do not set the com.apple.quarantine flag.

## MacOS System Integrity Protection Disabled


 The System Integrity Protection (SIP) feature of MacOS helps to prevent the execution of unauthorized code and disabling this feature can be an indicator of a malicious actor attempting to bypass default security features. Tuning for this rule may be necessary if software developers in the organization use MacOS and need to disable SIP to run their code.

## Malicious Named Pipes


 Observes for known pipe names associated with malicious activity.

## Malicious PowerShell Get Commands


 This rule detects commandlets from common PowerShell exploitation frameworks.

## Malicious PowerShell Invoke Commands


 Detects Commandlet names from well-known PowerShell exploitation frameworks.

## Malicious PowerShell Keywords


 This rule detects well known keywords from PowerShell exploitation frameworks.

## Malicious Service Installs


 Observes for several known malicious services being installed on a system.

## Malware Cleaned


 Detects malware that was cleaned.

## Malware Not Cleaned


 Detects malware that failed to be cleaned.

## Malware Outbreak


 Detects the same malware signature on multiple hosts in a short timeframe. This indicates malware may be spreading in the environment.

## MavInject Process Injection


 Detects process injection using the signed Windows tool Mavinject32.exe.

## McAfee Web Gateway - Poor Reputation


 Observes for sites categorized as having a poor reputation by McAfee Web Gateway.

## McAfee Web Gateway - Suspicious or Malicious Categories


 This rule triggers any time there is a Suspicious or Malicious McAfee Web Gateway category which could indicate there is a problem with the host making the connection.

## Medium Severity Intrusion Signature


 This rule looks for an intrusion product detecting a medium severity intrusion signature sourcing from an internal IP.

## Meterpreter or Cobalt Strike Getsystem Service Start


 Detects the use of getsystem Meterpreter/Cobalt Strike command by detecting a specific service starting.

## Microsoft CHM File Observed


 Compiled HTML Files (.chm) are blocked by default on modern Windows operating systems and are also vulnerable to malicious code embedding. These factors make the presence of .chm files on company assets both unusual and risky.

## Microsoft Office Add-In Persistence


 Detects additions to Microsoft Office add-ins on a host. Add-ins can be used by an adversary to gain poersistence as they are executed on Office applications being launched.

## Microsoft Support Diagnostic Tool Invoking PowerShell - CVE-2022-30190


 Monitors for exploitation of CVE-2022-30190 as indicated by the Microsoft Support Diagnostic Tool Invoking PowerShell. More information on this vulnerability can be found at the Microsoft Security Response Center: https://msrc-blog.microsoft.com/2022/05/30/guidance-for-cve-2022-30190-microsoft-support-diagnostic-tool-vulnerability/

## Microsoft Support Diagnostic Tool with BrowseForFile - CVE-2022-30190


 Monitors for exploitation of CVE-2022-30190 as indicated by the Microsoft Support Diagnostic Tool being observed with the BrowseForFile command. More information on this vulnerability can be found at the Microsoft Security Response Center: https://msrc-blog.microsoft.com/2022/05/30/guidance-for-cve-2022-30190-microsoft-support-diagnostic-tool-vulnerability/

## Mimecast - Message with Virus Detections from IP


 Mimecast detected a message with one or more virus detections.

## Mimecast - Message with Virus Detections to Recipient


 Mimecast detected a message with one or more virus detections.

## Mimecast - SPAM Message from IP


 Mimecast detected an email message with an elevated SPAM score.

## Mimecast - SPAM Message to Recipient


 Mimecast detected an email message with an elevated SPAM score.

## Mimecast Message Held


 You may have a DLP policy in place to hold a message due to some security risk. It depends on the policy and this rule can be tuned to include or exclude certain policies.

## Mimikatz Loaded Images Detected


 Observes for image accesses of images used for credential dumping via Mimikatz

## Mimikatz via Powershell and EventID 4703


 Observes for eventID 4703 with SeDebugPrivileges added by powershell. May indicate the presence of Mimikatz credential dumping.

## Modification of Windows Network Logon Scripts


 Detects modifications of Windows Network Logon Scripts on domain controllers. Windows Network Logon Scripts are distributed to systems on a domain and can be used by an adversary to establish persistence across a network.

## MsiExec Web Install


 Detects suspicious msiexec process starts with web addresses as parameter.

## Multiple File Extensions


 Observes for common file extensions appearing before the actual file extension (ex. totallynotmalware.pdf.exe).

## Multiple Windows Account Lockouts On Endpoint


 Observes for multiple Windows account lockouts in a short period on a single endpoint. This could indicate password guessing or brute force activity.

 ## Network Connection from Control Panel - Sysmon


 Native Window utilities are often employed by attackers to execute malicious code in order to abuse the elevated privileges of these processes and to blend in with normal system activity. This rule monitors for outbound TCP/UDP connections spawning from control.exe as this could indicate a second-stage payload acquisition. Note that sysmon event ID 3 does not record ICMP connections.

## Network Connection from InstallUtil - Sysmon


 Native Window utilities are often employed by attackers to execute malicious code in order to abuse the elevated privileges of these processes and to blend in with normal system activity. This rule monitors for outbound TCP/UDP connections spawning from installutil.exe as this could indicate a second-stage payload acquisition. Note that sysmon event ID 3 does not record ICMP connections.

## Network Connection from MSHTA - Sysmon


 Native Window utilities are often employed by attackers to execute malicious code in order to abuse the elevated privileges of these processes and to blend in with normal system activity. This rule monitors for outbound TCP/UDP connections spawning from mshta.exe as this could indicate a second-stage payload acquisition. Note that sysmon event ID 3 does not record ICMP connections.

## Network Connection from Msiexec - Sysmon


 Native Window utilities are often employed by attackers to execute malicious code in order to abuse the elevated privileges of these processes and to blend in with normal system activity. This rule monitors for outbound TCP/UDP connections spawning from msiexec.exe as this could indicate a second-stage payload acquisition. Note that sysmon event ID 3 does not record ICMP connections.

## Network Connection from Odbcconf - Sysmon


 Native Window utilities are often employed by attackers to execute malicious code in order to abuse the elevated privileges of these processes and to blend in with normal system activity. This rule monitors for outbound TCP/UDP connections spawning from odbcconf.exe or regasm.exe as this could indicate a second-stage payload acquisition. Note that sysmon event ID 3 does not record ICMP connections.

## Network Connection from Regsvcs/Regasm - Sysmon


 Native Window utilities are often employed by attackers to execute malicious code in order to abuse the elevated privileges of these processes and to blend in with normal system activity. This rule monitors for outbound TCP/UDP connections spawning from regsvcs.exe or regasm.exe as this could indicate a second-stage payload acquisition. Note that sysmon event ID 3 does not record ICMP connections.

## Network Connection from Regsvr32 - Sysmon


 Native Window utilities are often employed by attackers to execute malicious code in order to abuse the elevated privileges of these processes and to blend in with normal system activity. This rule monitors for outbound TCP/UDP connections spawning from regsvr32.exe as this could indicate a second-stage payload acquisition. Note that sysmon event ID 3 does not record ICMP connections.

## Network Connection from Rundll32 - Sysmon


 Native Window utilities are often employed by attackers to execute malicious code in order to abuse the elevated privileges of these processes and to blend in with normal system activity. This rule monitors for outbound TCP/UDP connections spawning from rundll32.exe as this could indicate a second-stage payload acquisition. Note that sysmon event ID 3 does not record ICMP connections.

## Network Connection from Verclsid - Sysmon


 Native Window utilities are often employed by attackers to execute malicious code in order to abuse the elevated privileges of these processes and to blend in with normal system activity. This rule monitors for outbound TCP/UDP connections spawning from verclsid.exe as this could indicate a second-stage payload acquisition. Note that sysmon event ID 3 does not record ICMP connections.

## Network Share Scan


 Detects multiple network share access attempts from one internal host to another. Attackers will often scan the network for open network shares in order to pivot between internal hosts.

## Network Share Sweep


 Detects multiple network share access attempts from one internal host to another for a single share. Attackers will often scan the network for specific open network shares, such as ADMIN$ used for PSEXEC, in order to pivot between internal hosts.

## New Container Uploaded to AWS ECR


 New Container Uploaded to AWS ECR.

## New Kubernetes Namespace Created


 Detect when a user is creating a Kubernetes namespace.

## New Suspicious cmd.exe / regedit.exe / powershell.exe Service Launch


 The Service Control Manager, or services.exe, has no legitimate reason to launch commands like cmd.exe, powershell.exe, or regedit.exe. Incidentally, a common way for malware to masquerade as something legitimate is to call itself service.exe.

## New or Renamed Windows User Account Mimicking a Machine Account


 A new or renamed user account which starts with a $ following machine account naming conventions.  Attackers could use this to bypass detection logic where machine names are filtered from rules.

## Noncompliant Protocol Tunnel Over Common Service Port


 Tools or malware may be configured to send communications over a network by using a common service port to carry unrelated traffic. This is often done to bypass security controls or to obfuscate malicious traffic by mimicking a legitimate service. For example, this is often done with UDP based VPN tunnels connecting over port 53. https://attack.mitre.org/techniques/T1043/ describes the use of this technique by attackers.

## Normalized Security Signal


 Passes through an alert from an endpoint security product and adjusts the severity accordingly based on the severity provided in the log.

## NotPetya Ransomware Activity


 Detects NotPetya ransomware activity by identifying one of these occurring: the extracted passwords are passed back to the main module via named pipe, the file system journal of drive C is deleted or windows eventlogs are cleared using wevtutil.

 ## O365 - Successful Authentication with PowerShell User Agent


 Detects a successful authentication to Office 365 where the user agent string contains PowerShell. By default, PowerShell will appear in the user agent string when used in authentication attempts for 0365. This can be an indication of a PowerShell Exploitation framework being used to authenticate.

## O365 - Users Password Changed


 This is usually routine administrative activity, but should be monitored in case an administrative user has been compromised.

## O365 - Users Password Reset


 Detects typically routine administrative activity, but should be monitored in case an administrative user has been compromised.

## Office 365 Exchange Transport Rule Created


 Threat actors may create, update or otherwise modify various Office 365 inbox rules to delete sensitive emails - such as those originating from security teams - or automatically forward emails to a mailbox in their control.

## Office 365 Exchange Transport Rule Enabled


 Threat actors may create, update or otherwise modify various Office 365 inbox rules to delete sensitive emails - such as those originating from security teams - or automatically forward emails to a mailbox in their control.

## Office 365 Forwarding Rule Created


 Threat actors may create, update or otherwise modify various Office 365 inbox rules to automatically forward emails to a mailbox in their control.

## Office 365 Inbox Rule Created


 Threat actors may create, update or otherwise modify various Office 365 inbox rules to delete sensitive emails - such as those originating from security teams - or automatically forward emails to a mailbox in their control.

## Office 365 Inbox Rule Updated


 Threat actors may create, update or otherwise modify various Office 365 inbox rules to delete sensitive emails - such as those originating from security teams - or automatically forward emails to a mailbox in their control.

## Office 365 Unified Audit Logging Disabled


 Cloud environments such as Office 365 and Azure allow for collection and analysis of audit telemetry that provides insight into what activities a user does within the Office 365 environment. If a threat actor has sufficient permissions, they can disable logging to avoid detection of their potentially malicious activities.

## Office Application or Browser Launching Shell


 This alert detects a shell launched by an office product or browser that should not be spawning shell processes. Attackers may inject code into Office documents or abuse Windows utilities to spawn shells that will execute malicious commands.

## Okta API Token Created


 Detect when a new Okta API token is created.

## Okta Account Lockout


 Observes for Okta user account lock out events

## Okta Account Primary Email Address Update


 An Okta accounts primary email address has been updated. An adversary may modify an Okta accounts email address to evade detection by users or to gather information about the organization and establish persistence through credential resets.

## Okta Admin App Access Attempt Failed


 Detects failed access attempts to the Okta admin app. This is where policies are set, users are managed, and apps are controlled.

## Okta Admin App Accessed


 Detects access to the Okta admin app. This is where policies are set, users are managed, and apps are controlled. The match list Okta_Admins should be populated with users authorized to access the Okta admin app.

## Okta Administrator Access Granted


 Detects Okta administrator access being granted. This is where policies are set, users are managed, and apps are controlled.

## Okta Credential Access User Impersonation


 A session impersonation access event has occurred. This most likely indicates Okta support or administrative access has occurred and should be reviewed and verified.

## Okta MFA Bypass Attempt


 Attempts to bypass MFA can be indicative of malicious actors having compromised the password for an account but not the corresponding MFA token and such attempts should be audited for legitimacy.

## Okta MFA Deactivated for User


 This rule detects multi-factor authentication (MFA) being disabled for a user. An adversary or malicious insider may deactivate MFA in order to bypass security controls. The Okta_Admins match list should be created and populated with administrator users permitted to perform this activity.

## Okta MFA Device Reset


 An accounts multi-factor authentication (MFA) device has been reset. This can indicate an attacker attempting to bypass or intercept MFA for an account which they have already compromised.

## Okta User Attempted to Access Unauthorized App


 Detect when an Okta user is denied access to an app.

## OneLogin - API Credentials - Key Used from Untrusted Location


 Detects usage of API keys from an untrusted location. The match list OneLogin_Untrusted_Location should be created and populated with untrusted locations.

## OneLogin - API Credentials - New Key Created


 Detects creation of API Keys. API Keys should be closely monitored to prevent unauthorized access.

## OneLogin - Login Failed - MFA Unsuccessful


 Detects the failure to authenticate due to a bad one time passcode (OTP).

## Outbound Data Transfer Protocol Over Non-standard Port


 This rule detects commonly used data transfer protocols being used over non-standard ports, which could indicate an attempt to obfuscate exfiltration or command and control activity.

## Outbound IRC Traffic


 This rule detects outbound traffic over IRC, which could indicate a compromised host being used for command and control or exfiltration operations.

## Outbound TFTP Traffic


 TFTP is rarely used externally and has been observed as a means to deliver malicious code from the outside.

## Outbound Traffic to Countries Outside the United States


 Traffic was observed leaving your network destined to some countries outside the United States within a time frame. This rule is shipped disabled by default as is intended for environments based in the United States with very tight network restriction policies.

## Outlook Form Creation


 Detects Outlook Form creation.  Outlook forms can be used to execute code on a compromised machine and establish persistence.

## Outlook Homepage Modification


 Detects modifications to the Microsoft Outlook Homepage. Outlook Homepage is a legacy feature that can be leveraged by an adversary to insert malicious code and establish persistence.

## Overly Permissive Chmod Command


 Setting a file's permissions to '777' with the chmod command allows all users to read, write, and execute said file, presenting an avenue for exploitation and privilege escalation on the host.

 ## PATH Set to Current Directory


 The PATH environment variable should always be set to an absolute directory pathing. Referencing the current directory is considered bad practice as it can lead to unintentional file execution or malicious abuse, as with CVE-2021-4034 (pkexec privilege escalation).

## PSExec Named Pipe Created by Non-PsExec Process


 Observes for creation of a PSExec named pipe not by PSExec. This may be an indication of a malicious process coopting a privileged named pipe used by PSExec.

## PXELoot Utility


 From FireEye Red Team Tool Countermeasures:
PXELoot (PAL) is a C# tool designed to aid in the discovery and exploitation of misconfigurations in Windows Deployment Services (WDS).

## Package Management Utility in Container


 Package management utilities should be considered anomalous when used inside containers as containers should be provisioned with the correct tools for the task assigned to them at the image level.

## Palo Alto - Traps Templated Events


 This rule passes through alerts from Palo Alto Traps.

## Password Attack


 Detects multiple failed login attempts from a single source with unique usernames over a 24 hour timeframe. This is designed to catch both slow and quick password spray type attacks. The threshold and time frame can be adjusted based on the customer's environment.

## Pastebin Raw URL Resource Request


 Attackers will often host malicious code on pastebin.com and attempt to download their additional payloads if their initial attack is successful. They will download the post with the raw URI. Generally the malicious content hosted on Pastebin.com is quickly removed automatically by the poster setting an expire time.

## Persistence Registry Key Modification


 This rule detects modifications to registry keys commonly targeted to achieve persistence.

## Persistent Malware Infection


 Single host with multiple malware infections with the same signature in a short timeframe.

## Pkexec Privilege Escalation - CVE-2021-4034


 Monitors for audit message and command line parameters that indicate attempted exploitation of pkexec vulnerability CVE-2021-4034.

## Port Scan - External


 External port scan. A host external to the monitored network was detected as showing behavior consistent with a scan for a port on multiple destination addresses in a short time.

## Port Scan - Internal


 Internal port scan. A host on the monitored network was detected as showing behavior consistent with a scan for a port on multiple destination addresses in a short time.

## Possible Black Energy Command and Control


 Black Energy is a botnet with HTTP based Command and Control communication.

## Possible Credential Abuse


 This signal logic is designed to catch repetitive attempts to call (and presumably attempt to auth via) login pages for Drupal, WordPress, and Jira.

## Possible DNS Data Exfiltration


 Some families of malware use data nested within the subdomain portion of a DNS query as a means of data exfiltration. This can be identified by looking for DNS queries where the full query is substantially longer than the top-level domain (e.g., ooo.nu6tgnzvgm2tmmbzgq4a.rkgotw5.5z5i6fjnugmxfowy.beevish.com is substantially longer than beevish.com). This technique is described in https://attack.mitre.org/techniques/T1001/.

## Possible DNS over TLS (DoT) Activity


 This rule detects attempted or successful connections to the standard service port for DoT services. DNS over TLS (RFC 7858, DoT) is a name resolution service that allows clients to resolve DNS records over encrypted and validated connections. DoT operates over standards compliant TLS and is specified to operate over port 853/tcp. In some environments this may be abused as a method to bypass security and policy controls. Some malicious actors leverage DoT to tunnel DNS traffic over TLS, and research has demonstrated the ability to carry out other DNS related abuse such as malware C2 over DoT as well.

## Possible Dynamic DNS Domain


 This rule looks for domains which appear to be associated with a dynamic DNS service.

## Possible Malicious Download


 This rule triggers any time there is potentially a download from a suspicious categorized site.

## Possible Malicious Nirsoft Tool Usage


 Detects command line parameters common with Nirsoft tools.

## Possible TOR Connection


 The subject and issuer of the SSL certificate match the pattern for certificates used by TOR connections.

## Potential Cobalt Strike Profile


 From FireEye Red Team Tool Countermeasures: This IOC detects indicators associated with cobalt strike beacon network activity.

## Potential Inbound VNC Traffic


 Observes for successful TCP traffic to default VNC ports or explicit VNC/RFB traffic detected.

## Potential InstallUtil Allow List Bypass


 This rule looks for a suspicious InstallUtil command line followed by an observed outgoing network connection from the InstallUtil process, indicating potentially malicious use of the InstallUtil binary.

## Potential Microsoft Office In-Memory Token Theft


 Office applications and Web Browsers connecting to Office services can potentially store credential material in their memory space. This event indicates that a process has accessed the memory space of an Office process that may potentially contain token material.

## Potential Microsoft Office Template Abuse


 Detects modifications to files and registry entries related to Microsoft Office Template Macros. These can be abused by an adversary to gain persistence.

## Potential Pass the Hash Activity


 The behavior discovered here loosely matches the behavior of known pass the hash tools.  A Pass the Hash (PtH) attack is a way for an attacker to move laterally through a type of credential theft.  Because this behavior is known to occur in some environments during normal activity, tuning is recommended and attention paid to a possible spike in signals after enabling this rule.

## Potential Reconnaissance Obfuscation


 From Solorigate TTPs: Firewall rules were added via command line to reduce noise from subsequent reconnaissance using NSLOOKUP and ADFIND.

## Potential XMRig Execution with Traffic


 Adversaries may leverage the resources of co-opted systems in order to solve resource intensive problems, which may impact system and/or hosted service availability.

## Potential malicious JVM download


 A document was downloaded and opened followed by a file download using a Java user-agent.

## Potential malicious document executed


 A document was downloaded and opened followed shortly by an executable or dll download shortly thereafter.

## Potentially vulnerable software detected


 The software version has a known vulnerability.

## PowerShell Encoded Command


 PowerShell can execute encoded Base64 strings with the Encoded Command cmdlet. Attackers will often use Base64 to obfuscate their payloads until they can decode and execute it with PowerShell.

## PowerShell File Download


 PowerShell scripts are commonly used as droppers, which will download additional tools onto a compromised host.

## PowerShell Remote Administration


 Remote Administration from Powershell is logged by default in the admin$temp  folder.  These commands should only be associated with IP addresses that are expected to carry out remote administration tasks.

## PowerShell Rundll32 Remote Thread Creation


 Detects PowerShell remote thread creation in Rundll32.exe.

## PowerShell via SMB


 PowerShell being accessed via SMB should never occur in a Windows environment, and indicates malicious activity.

## Powershell Execution Policy Bypass


 Observes for parameters used to bypass the Powershell execution policy. Requires command line auditing or Sysmon to function. It is recommended to tune this rule to hosts/users that are not ordinarily bypassing Powershell execution policy.

## Powerview Add-DomainObjectAcl DCSync AD Extend Right


 Backdooring domain object to grant the rights associated with DCSync to a regular user or machine account using Powerview\Add-DomainObjectAcl DCSync Extended Right cmdlet, will allow to re-obtain the pwd hashes of any user/computer.

## Process Dump via Rundll32 and Comsvcs.dll


 Detects a process memory dump performed via ordinal function 24 in comsvcs.dll.

## Process Execution Inside Webserver Root Folder


 A process was executed from inside a web hosting directory. This signal could indicate when adversaries upload a malicious file to the webserver and run the file as a process. Approved web applications that require process execution from inside the web hosting directory should be excluded from the rule and filtered out.

## Productivity App Spawning Rundll32 or Regsvr32


 Detects productivity applications spawning regsvr32 or rundll32. This activity has been attributed to the Qbot and Bazar trojans.

## Proofpoint POD Suspicious Email


 Detects emails with a spam score greater than 50 using Proofpoint POD.

## Proofpoint TAP - IP Sent Email with Malware


 Proofpoint TAP detected an IP address sending an email with a malware score 75 or higher. Records indicating the email was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## Proofpoint TAP - IP Sent Email with Malware Link


 Proofpoint TAP detected a user clicking on a link containing malware in an email sent from an IP address. This rule only includes messages where Proofpoint considers the malware link still active. Records indicating the link was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## Proofpoint TAP - IP Sent Email with Phishing Link


 Proofpoint TAP detected a user clicking on a phishing link in an email sent from an IP address. This rule only includes messages where Proofpoint considers the phishing link still active. Records indicating the link was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## Proofpoint TAP - IP Sent Impostor Email


 Proofpoint TAP detected an IP address sending an email with an impostor score 75 or higher. Records indicating the email was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## Proofpoint TAP - IP Sent Phishing Email


 Proofpoint TAP detected an IP address sending an email with a phishing score 75 or higher. Records indicating the email was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## Proofpoint TAP - User Clicked Malware Link in Email


 Proofpoint TAP detected a user clicking on a malware link in an email. This rule only includes messages where Proofpoint considers the malware link still active. Records indicating the link was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## Proofpoint TAP - User Clicked Phishing Link in Email


 Proofpoint TAP detected a user clicking on a phishing link in an email. This rule only includes messages where Proofpoint considers the phishing link still active. Records indicating the link was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## Proofpoint TAP - User Received Email with Malware


 Proofpoint TAP detected a user receiving an email with a malware score 75 or higher. Records indicating the email was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## Proofpoint TAP - User Received Impostor Email


 Proofpoint TAP detected a user receiving an email with an impostor score 75 or higher. Records indicating the email was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## Proofpoint TAP - User Received Phishing Email


 Proofpoint TAP detected a user receiving an email with a phishing score 75 or higher. Records indicating the email was permitted will have a higher signal score compared to those automatically blocked by Proofpoint.

## PsExec Admin Tool Detection


 Detects PSEXESVC.EXE being written to remote computer via SMB/CIFS. This is a service executable that is copied in place and started when a remote client connects to a host with PsExec.

## Psr.exe Capture Screenshots


 The psr.exe captures desktop screenshots and saves them on the local machine.

## Pwndrp Access

 Observes for possible attempts to download PwnDrp red team tooling.

 ## QBot Process Creation


 Observes for Qbot process creation behavior.

## QuarksPwDump Dump File Observed


 Signal identifies the observance of a filename consistent with QuarksPwDump file password dumper.

## RDP Brute Force - Success


 Hydra and Ncrack are popular tools for attempting brute force attacks to access a targeted system. In this case, a brute force attempt against an RDP server has succeeded and the attacker has gained access to the targeted system.

## RDP Brute Force Attempt


 An attacker is making a brute force attempt to gain access to an RDP server.

## RDP Error Messages


 When setting up an RDP connection, there are a number of  negotiation steps that happen.  If a connection is encrypted, not all of these can be analyzed.  Errors can indicate an operational issue or potential exploitation of a vulnerability in negotiation.

## RDP Login from Localhost


 RDP login with a localhost source address may indicate a tunneled login and an attacker attempting to move through the environment.

## RDP Traffic to Unexpected Host


 Observes for RDP traffic to hosts not within an allow list.

Note that this rule requires the creation and population of a match list for known OK hosts named 'RDP_Hosts'

## RDP with non-standard client


 While the product_id of the RDP client is not required, a missing one or one that does not look like a client access license can indicate an RDP attack with hacker software (ie NCRACK, hydra).

## Recon Using Common Windows Commands


 Detects a set of commands often used in recon stages by different attack groups

## Registry Keys For Creating Shim Databases


 This rule looks for registry activity associated with application compatibility shims, which can be leveraged by attackers for various nefarious purposes.

## Registry Modification - Active Setup


 Detects modifications to the active setup registry key. Active setup can be used to execute programs at user login.

## Registry Modification - Authentication Package


 Malicious authentication packages can be added via the Windows Registry. This rule requires registry monitoring to be setup on the endpoint.

## Registry Modification - Code Signing


 The Driver Signature Enforcement functionality in Windows ensures that only approved, unaltered programs are able to run on a system. Modifications to this policy can indicate an attempt to bypass these built-in protections. Tuning for this rule may be required for developer machines as code signing protections often interfere with the software development process.

## Registry Modification - Microsoft Office Test Function Registry Entry


 Observes for modifications to the Microsoft Office Test registry key. This key allows for an arbitrary DLL to be executed on Office launch. This can be used by an adversary to establish persistence.

## Registry Modification - Print Processors


 Observes for modifications to registry entries defining print processors for the print spooler service. The print spooler runs with  system level permissions and this technique can be used to establish persistence.

## Registry Modification - SIP or Trust Provider


 Trust Providers and Subject Interface Packages (SIPs) can be modified via the Windows Registry to allow attackers to execute malicious code with heightened permissions and less oversight. This rule monitors for changes to several Registry keys containing values that modify these settings.

## Registry Modification - Security Support Provider


 Malicious Security Support Providers can be added via the Windows Registry. This rule requires registry monitoring to be setup on the endpoint.

## Registry Modification - Time Providers


 Malicious time providers can be added via the Windows Registry. This rule requires registry monitoring to be set up on the endpoint.

## Registry Modification - Windows Logon Script


 Logon scripts are executed on user logon and can be used to establish persistence. This detection requires registry monitoring.

## Registry Modification - Winlogon Helper DLL


 Malicious Winlogon Helper Dlls can be added via the Windows Registry. This rule requires registry monitoring to be set up on the endpoint.

## Registry Persistence Mechanisms


 Observes for registry keys associated with persistence activity.

## Regsvr32.exe Silent Mode from TEMP Directory


 Detects regsvr32 ran in silent mode from a temp directory. This activity has been attributed to the Qbot and Bazar trojans.

## Renamed MSBUILD.EXE by Arguments


 From FireEye Red Team Tool Countermeasures: This alert looks for renamed msbuild.exe process executions based on common command line arguments used for msbuild.exe. Attackers frequently use msbuild.exe (or renamed versions of this binary) to execute arbitrary CSharp payloads written to disk most commonly as .csproj files (though any file with an extension ending in "proj" will work) either referenced on the command line or located in the same directory as the msbuild.exe binary. The XML payload on disk should be acquired and examined to determine the functionality of the payload.

## Request to Anomalous Web Server Software


 Attackers often stage content during intrusions using external web infrastructure to host exploits, malware and other tooling. In rare cases attacker playbooks show the threat actor hosting web files by serving them using the SimpleHTTPServer server, a lightweight built-in web server module installed with Python. Occurrences of clients connecting to servers implemented using SimpleHTTPServer are anomalous and may indicate an active attack.

## Request to DNS over HTTPS (DoH) Service Provider


 DNS over HTTPS (RFC 8484, DoH) is a web based name resolution service that allows clients to resolve DNS records over web services. DoH operates over standards compliant HTTPS and is therefore typically encrypted and validated TLS over port 443/tcp. In some environments this may be abused as a method to bypass security and policy controls. Some malicious actors leverage DoH to tunnel DNS traffic over HTTPS, and research has demonstrated the ability to carry out other DNS related abuse such as malware C2 over DoH as well.

## Rogue DHCP Server - Cisco


 Observes for Cisco events indicating the presence of a rogue DHCP server.

## Rubeus Hack Tool


 Detects command line parameters associated with use of the Rubeus hack tool.

## Rubeus Hack Tool Logon Process Name


 From FireEye Red Team Tool Countermeasures:
Rubeus is a utility  that provides Kerberos abuse capabilities. This rule is looking for the  hardcoded LogonProcessName value, "User32LogonProcesss".

## Rundll32.exe Load from TEMP Directory with By Ordinal Load


 Detects rundll32 loaded from a temp directory with a by ordinal load. This activity has been attributed to the Qbot and Bazar trojans.

## Ryuk Ransomware Endpoint Indicator


 Indicates a process has started with characteristics that are highly similar to the Ryuk ransomware's execution behavior.

 # SC Exe Manipulating Windows Services


 Observes for command line arguments with sc.exe indicating Windows services being modified.

## SMB - Remote execution and/or persistence via scheduled task using ATSVC


 Remote execution and/or persistence via scheduled task using ATSVC named pipe.

## SMB Brute Force Attempt


 This rule looks for failed SMB login attempts.

## SMB External to Internal File Share Access


 This signal identifies external sources connecting to file shares.  Due to the vulnerabilities and insecurities of SMB this type of traffic should be prohibited.

## SMB Internal to External traffic


 SMB/CIFS is a workgroup protocol for file sharing intended to be used among trusted systems on an internal LAN. A number of risks are associated with internal systems connecting to untrusted external SMB servers, including exploit delivery, credential harvesting, and data exfiltration. SMB access should be limited to the enterprise network to prevent participation in unknown SMB related attacks. Limited exceptions may exist, such as file server access over extranet connections.

## SMB Scanning Detected


 This rule looks for a host scanning other SMB hosts for specific commands similar to WannaCry.

## SMB write to hidden admin share


 SMB is primarily used for remote file access across a network.  SMB access to admin shares should be a rare occurrence, especially by a non-administrator account.  Such access is often a part of an attack pivot once an attacker has compromised one machine in a network.

## SMTP Traffic from Non-SMTP Servers


 Observes for SMTP traffic on non-SMTP hosts. This may be indicative of spambot activity. This rule requires that a match list of known OK SMTP servers is populated.

## SQL Injection Attacker


 SQL Injection attempt detected.

## SQL Injection Victim


 Successful SQL Injection attack detected.

## SQL-Select-From


 Requests to web applications containing SQL statement keywords may indicate attempts to compromise the web application or access data in a backend database engine in an unauthorized manner. This technique is described at https://attack.mitre.org/techniques/T1190/.

## SSH Authentication Failures


 Many SSH authentication failures from the same source IP in a short period of time can signal a brute-force attack.

## SSH Interesting Hostname Login


 "Interesting hostname" in this context include those that start with dns, ns, smtp, mail, pop, imap, www, and ftp.  Using SSH to hosts that appear to be purposed as servers corresponding to one of these hostnames is considered suspicious.

## SSH Keys Added to EC2 Instance


 A set of SSH keys has been added to an AWS EC2 instance.

## SSL Certificate Expired


 A server responded on a SSL or TLS service using an expired certificate.

## SSL Certificate Expires Soon


 A server responded on a SSL or TLS service using a certificate that will expire soon.

## SSL Certificate Not Valid Yet


 A server responded on a SSL or TLS service using a certificate with a future-dated NotValidBefore attribute.

## SSL Heartbleed Attack


 SSL Heartbleed Attack detected.

## SSL Heartbleed Attack Successful


 Detects SSL Heartbleed Attack Successful.

## SSL Heartbleed Many Requests


 Indicates we saw many heartbeat requests without a reply. Might be an attack.

## SSL Heartbleed Odd Length


 Detects SSL Heartbleed Odd Length.

## SSL Invalid Server Cert


 A server responded on a SSL or TLS service using a certificate identified as invalid by the Network Sensor.

## SYSVOL Share Sweep


 When attempting to pivot within an internal AD network, attacks will query the Domain Controllers for passwords stored within group policy files. This is typically done by querying the SYSVOL share.  A host querying the SYSVOL share is suspicious activity and could be indicative of this type of attack.

## SafetyKatz Credential Stealer


 From FireEye Red Team Tool Countermeasures:
SafetyKatz is a combination of slightly modified version of Mimikatz project and .NET PE Loader.

## Salesforce Custom Permission Creation


 Custom Permissions in Salesforce are used to give access to users for certain apps or processes that you have configured and which cannot be controlled by profile or permission set directly. This rule is used to monitor this activity as adversaries could abuse this to escalate privileges. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce Excessive Documents Downloaded


 Detects when an entity downloads multiple documents or attachments in a short timeframe. This type of activity is indicative of exfiltration. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce Login Attempt from Disabled Account


 Detects when a disabled account attempts to log into Salesforce.

## Salesforce LoginAs Event


 Generates severity 0 signals for LoginAs Salesforce events. The purpose of this rule is to track LoginAs activity for both the source and target user to provide additional context for Insights. The third party match list exclusion should be populated to exclude known permitted third party domains from triggering this rule. It's common for third party support accounts to use the LoginAs function. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce Permission Set Addition


 Detects permission set additions in Salesforce. While these additions can be routine, their function can be abused for malicious intent. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce Permission Set Assigned


 Detects permission set assignments. While this is a routine activity, permission assignments could be used by an adversary for persistence and privilege escalation. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce Permission Set Creation


 Detects permission set creations in Salesforce. While these creations can be routine, their function can be abused for malicious intent. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce Permission Set Deletion


 Detects permission set deletions in Salesforce. While these deletions can be routine, their function can be abused for malicious intent. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce Permission Set Modification


 Detects various permission set changes in Salesforce. While these changes can be routine, their function can be abused for malicious intent. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce Report Exported


 Detects when a report is exported. Reports contain a variety of information that adversaries may attempt to exfiltrate. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce Role Creation


 Detects role creation. While this is a routine activity, role creation could be used by an adversary for persistence and privilege escalation. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce User Creation


 Detects user creation. While this is a routine activity, user creation could be used by an adversary for persistence. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce User Role Changed


 Detects role changes. While this is a routine activity, role changes could be used by an adversary for persistence and privilege escalation. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Salesforce WaveDownload Event


 Wave Download events represent downloads made from lens explorations and dashboard widgets in the Tableau CRM user interface. A Wave Download event type is captured when a user downloads images ( .png ), Microsoft Excel data ( .xls ), or comma-separated values ( .csv ) files. Salesforce admin match lists are excluded in this rule in an attempt to reduce the false positives due to expected admin activity. These match lists should be created and populated with Salesforce admin usernames and IPs.

## Samsam Test File Write


 The rule looks for a file named "test.txt" written to the windows system directory tree, which is consistent with Samsam propagation.

## Scheduled Task Created via PowerShell


 Attackers have been known to leverage PowerShell for scheduled task creation for the purpose of maintaining persistence in a Windows based environment.

## Scheduled Task Creation with Suspicious Task Executable


 Attackers may create scheduled tasks to execute commands in various scenarios. Inclusion of commonly abused or high risk Windows executables may be an indication of an attack.

## Schtasks Scheduling Job On Remote System


 This rule looks for flags passed to schtasks.exe on the command-line that indicate a job is being scheduled on a remote system.

## Schtasks Used For Forcing A Reboot


 This rule looks for flags passed to schtasks.exe on the command-line that indicate that a forced reboot of system is scheduled.

## Script Execution Via WMI


 This rule looks for scripts launched via WMI.

## Script Interpreter Launched by Cmd


 Observes for wscript or cscript being executed by cmd.

It is recommended this rule be tuned to exclude hosts/users that are expected to regularly make use of script interpreters.

## Script/CLI UserAgent string


 This pattern discovers HTTP communications from an internal source where a development library or command line client user-agent string was observed (e.g. Wget, cURL, etc.). Use of these techniques by attackers is described in https://attack.mitre.org/techniques/T1105/ and https://attack.mitre.org/techniques/T1064/.

## Seatbelt Utility


 From FireEye Red Team Tool Countermeasures: Seatbelt is an open source C# project that performs a number of security oriented host-survey "safety checks" relevant from both offensive and defensive security perspectives. This IOC also detects some variations of this project namely Beltalowda and Shamwow.

## Secure Deletion with SDelete


 Detects renaming of file with deletion with SDelete tool.

## SecurityXploded Tool


 Detects the execution of SecurityXploded Tools.

## Self-signed Certificates


 A server responded on a SSL or TLS service using a self-signed certificate.

## Sensitive Registry Key (WDigest) Edit


 Enabling of Wdigest authentication may enable the storage of plain text credential material on Windows systems. WDigest is disabled by default on newer versions of Windows systems. Manual enablement of this registry key may indicate suspicious activity and attempts at credential theft.

## Server-Side Code Injection in URL


 Attackers may use improper URL checking to inject code that is executed on a server.  This may be used in DoS attacks or to execute commands to elevate privilege.  The attack pattern is similar to Shellshock exploitation.

## Service Installation Followed By Elevated CMD Prompt


 This rule looks for the installation of an application by a non-Sytem user quickly followed by the execution of cmd.exe with System privileges on the same host. This indicates a privilege escalation attempt was likely successful and correlates directly to CVE-2021-41379. The rule is designed to work with standard Security and System event logging, but Sysmon process logging can substitute in place of event ID 4688.

## Shadow Copies Deletion Using OS Utilities


 When adversaries take destructive action (e.g. encrypting files for ransomware) 'shadow copies' of the file system volumes are often destroyed in order to prevent these files from being easily recovered.  This signal indicates that a command was observed that may indicate this destructive action.

## Shadow Copy Creation


 Observes for ntdsutil, vssadmin, wmic, or powershell creating shadow copies. This is another method to extract credentials.

## SharPersist A Utility


 From FireEye Red Team Tool Countermeasures:
This IOC detects windows persistence activity performed by the Sharpersist utility. It has multiple persistence functionalities such as Keepass, hotkey, new schedule task, Startup Folder and Scheduled Task Backdoor.

## SharPersist Utility


 From FireEye Red Team Tool Countermeasures:
This IOC detects a Windows Persistence Toolkit called SharPersist.

## SharPivot Utility


 From FireEye Red Team Tool Countermeasures:
SHARPIVOT is a .NET console application that can be used to perform command execution against a remote target for the purposes of lateral movement.

## Sharepoint - Excessive Documents Accessed


 This rule detects when a large number of documents are accessed in a short timeframe. This behavior may be indicative of programmatic means being used to retrieve all data within the repository.

## Sharepoint - Excessive Documents Downloaded


 This rule detects when a large number of documents are downloaded in a short timeframe. This behavior may be indicative of programmatic means being used to retrieve all data within the repository.

## SharpStomp Utility


 From FireEye Red Team Tool Countermeasures:
SharpStomp is a C# utility that can be used to timestomp the specified file's creation, last access, and last write time.

## Shellshock


 HTTP requests with headers indicating an attempt to exploit CVE-2014-6271 and related vulnerabilities in the Bash shell using Bashdoor/Shellshock attack. This vulnerability is most often triggered in CGI scripts implemented against vulnerable versions of the shell.

## Silent Regsvr32 Scheduled Task Creation on Command Line


 Detects schtasks used to invoke a silent regsvr32 call. This activity has been attributed to the Qbot and Bazar trojans.

## Slack - Mass Download Events


 Adversaries may use an existing, legitimate external Web service to exfiltrate data rather than their primary command and control channel.

## Slack - Possible Session Hijacking


 Detects the same sessionID used from a new IP for the same user in a short period of time.

## Snatch Ransomware


 Detects specific process characteristics of Maze ransomware word document droppers.

## Sofacy Trojan Loader


 Detects Trojan loader acitivty as used by APT28.

## Solarwinds Suspicious Child Processes


 From FireEye Red Team Tool Countermeasures: This rule identifies suspicious child processes of SolarWinds.Orion.Core.BusinessLayer.dll that may be evidence of the SUNBURST backdoor. The behavior of SolarWinds.Orion.Core.BusinessLayer.dll is dependent on per-enterprise configuration, so additional tuning may be required to exclude legitimate activity in a given environment. SUNBURST is a backdoor that has the ability to spawn and kill processes, write and delete files, set and create registry keys, gather system information, and disable a set of forensic analysis tools and services.

## Solarwinds Suspicious URL Hostname


 From FireEye Red Team Tool Countermeasures: This rule identifies URL requests mimicking SolarWinds network traffic, to non-SolarWinds domains. This rule will only match on instances where communication does not occur over SSL/TLS. These requests may be evidence of the SUNBURST backdoor. SUNBURST is a backdoor that has the ability to spawn and kill processes, write and delete files, set and create registry keys, gather system information, and disable a set of forensic analysis tools and services.

## Spaces Before File Extension


 Observes for files being executed that contain at least 5 spaces preceding the file extension. This may indicate an attempt to hide the true extension of a file.

## Spoolsv Child Process Created


 Observes for Spoolsv launching unexpected child processes. This may be related to behavior in CVE-2018-8440.

## Spring4Shell Exploitation - URL


 Detects indicators found from SpringCore exploitation attempts.

## Successful Brute Force


 Detects a series of failed logins followed by a successful login. This could indicate that an attacker was successful in guessing a user's password and has compromised their account. This rule does not leverage authentication logs with a normalizedAction of domainLogon and does not have a Domain version, meaning that Windows workstation logging is required to achieve full visibility.

## Successful Overpass the Hash Attempt


 Identifies a suspicious windows logon of type 9 (NewCredentials).  This signal is suspicious due to its similarity to the behavior observed when using Mimikatz's sekurlsa::pth tool.

## Sumo Logic Scheduled Searches


 This rule passes through Sumo Logic core platform scheduled search hits to CSE as signals.

## Sunburst Suspicious File Writes


 From FireEye Sunburst Countermeasures:
This rule identifies writes of specific file types associated with activity related to the SUNBURST backdoored version of the SolarWinds.Orion.Core.BusinessLayer.dll process. This rule may generate false positives depending on the configuration of SolarWinds in a given environment, and may require tuning to exclude legitimate activity. SUNBURST is a backdoor that has the ability to spawn and kill processes, write and delete files, set and create registry keys, gather system information, and disable a set of forensic analysis tools and services.

## Suspect Svchost Activity


 It is extremely abnormal for svchost.exe to spawn without any CLI arguments and is normally observed when a malicious process spawns the process and injects code into the process memory space.

## Suspicious Azure Active Directory Device Code Authentication


 A device code authentication flow was completed to the following resource:

 ```
 <span class="nowiki">
  {{application}}
 </span>
 ```
 .  Successful Device Code authentication flows result in the issuance of an Azure Primary Refresh Token which can be used to access, enumerate or - if the relevant permissions exist - to modify Azure resources.


## Suspicious Certutil Command


 Detects a suspicious Microsoft certutil execution with sub commands like 'decode' sub command, which is sometimes used to decode malicious code with the built-in certutil utility.

## Suspicious Compression Tool Parameters


 Detects suspicious command line arguments of common data compression tools.

## Suspicious Curl File Upload


 Detects a suspicious curl process that adds a file to a web request.

## Suspicious DC Logon


 Shows RemoteInteractive logons, such as RDP sessions, to domain controllers. Requires customer to set up the domain_controllers match list

## Suspicious Email Attachment Extension


 Observes for e-mail attachments with file extensions commonly used by attackers or associated with malware.


## Suspicious Email Origin


 The email has originated from a suspicious location.

## Suspicious Execution of Search Indexer


 From FireEye Red Team Tool Countermeasures: This IOC detects suspicious execution of searchindexer. This technique is known to be used by Cobaltstrike which inject malicious code into a newly spawned searchindexer process to evade detection.

## Suspicious External Device Installation


 Detects removable media attached to a device that was previously denied by policy. External media can be used to exfiltrate sensitive data and is also a common source of infections, so some organizations block their use. Attempts to use these devices could indicate the intent for malicious activity.

## Suspicious HTTP User-Agent


 Common administrative tools may be used by malware authors and attackers who use live-off-the-land methods to operate on victim networks.

## Suspicious Non-Standard InstallUtil Execution


 From FireEye Red Team Tool Countermeasures:
This alert looks for evidence of the native signed Windows binary InstallUtil.exe being used to load PE files. This technique can be used to bypass application whitelisting and has been observed used in the wild.








## Suspicious PowerShell Keywords


 Detects keywords that could indicate the use of a PowerShell exploitation framework.

## Suspicious Registry Key Modification


 This rule detects modifications to registry keys commonly targeted to achieve persistence.

## Suspicious Shells Spawned by Web Servers


 Web servers that spawn shell processes could be the result of a successfully placed web shell or an other attack

## Suspicious Shortcut File Launching Process


 Observes for a shortcut (lnk) executing a process from directories common in various phishing tools.

## Suspicious Typical Malware Back Connect Ports


 Detects programs that connect to typical malware back connect ports based on statistical analysis from two different sandbox system databases.







## Suspicious Use of Procdump


 Detects suspicious uses of the SysInternals Procdump utility by using a special command line parameter in combination with the lsass.exe process. This way we're also able to catch cases in which the attacker has renamed the procdump executable.

## Suspicious Use of Workflow Compiler for Payload Execution


 From FireEye Red Team Tool Countermeasures: This IOC detects indicators associated with suspicious execution of Microsoft WorkFlow Compiler. This is known to be used by Cobaltstrike for lateral movement with specially crafted XLM and OXLM files.

## Suspicious Windows ANONYMOUS LOGON Account Created


 Detects the creation of suspicious accounts similar to ANONYMOUS LOGON.  These accounts could be created as a covering detection vs network type 3 logons for shared resources, such as folders or printers.

## Suspicious Writes To System Volume Information


 This rule detects writes to the 'System Volume Information' folder by something other than the System process.

## Suspicious Writes To Windows Recycle Bin


 This rule detects writes to the recycle bin by a process other than explorer.exe.


## Suspicious use of Dev-Tools-Launcher


 DevToolsLauncher.exe has a switch 'LaunchForDeploy' that takes the location of another binary to launch.  Attackers have abused this ability to launch their own non-trusted code.

## Sysmon - RawAccessRead Event


 The RawAccessRead event detects when a process conducts reading operations from the drive using the \\.\ denotation. This technique is often used by malware for data exfiltration of files that are locked for reading, as well as to avoid file access auditing tools. The event indicates the source process and target device.

 ## TAIDOOR RAT DLL Load

 Looks for process creation with command line references that are consistent with the Chinese TAIDOOR remote access trojan (RAT)

## Telegram API Access


 Detects suspicious requests to Telegram API without the usual Telegram User-Agent.

## The Audit Log was Cleared - 1102


 Attackers may attempt to clear the Windows Security Event Log in an effort to hide records of their activity during an intrusion. This rule detects that action.

## Threat Intel - Device IP Matched Threat Intel Domain Name


 A record flagged a hostname or domain from a threat intelligence match list.

## Threat Intel - Device IP Matched Threat Intel File Hash


 A record flagged a file hash from a threat intelligence match list.

## Threat Intel - Device IP Matched Threat Intel URL


 A record flagged a URL from a threat intelligence match list.

## Threat Intel - Inbound Traffic Context


 This rule detects allowed inbound traffic from an IP address associated with a known malicious campaign as designated by threat intelligence.

## Threat Intel - Matched Domain Name


 A record flagged a hostname or domain from a threat intelligence match list.

## Threat Intel - Successful Authentication from Threat IP


 This rule detects successful authentications from an IP address associated with a known malicious campaign as designated by threat intelligence.

## Threat Intel Match - IP Address


 A record flagged an IP address from a threat intelligence match list.

## Too Many Kerberos Encryption Downgrade SPNs (Kerberoasting)


 Kerberoasting is an attack method that allows an attacker to crack the passwords of service accounts in Active Directory offline and without fear of detection. This is facilitated by requesting service tickets that have data encrypted with weak encryption types (typically RC4). This technique is described in https://attack.mitre.org/techniques/T1208/.

## Too many empty/refused DNS queries


 The DNS request/response was empty or refused. This may be an indication of DNS tunneling. (Excludes IPv4/IPv6 multicast DNS and LLMNR traffic).

## Traffic From Embargoed Countries


 Observes for traffic originating from an embargoed country. As embargoes vary from country to country, a match list must be populated with embargoed countries.

## Traffic To Embargoed Countries


 Observes for traffic destined to an embargoed country. As embargoes vary from country to country, a match list must be populated with embargoed countries.

## Traffic to Honeypot IP


 This rule monitors for traffic being sent to a honeypot, indicating an attacker may be on the network attempting to move laterally. Requires configuration of the honeypot_ip_addresses list in order to function.

## Traffic to Proxy Anonymizers


 Observes for outbound traffic to a proxy anonymizer. This rule requires a list populated with IP addresses of known proxy anonymizers.

## Trickbot Malware Recon Activity


 Trickbot enumerates domain/network topology and executes certain commands automatically every few minutes. This detection attempts to identify that activity based off of commands rarely observed in an enterprise network.

## Turla Group Commands


 Observes for command lines associated with Turla group.

 ## Unauthorized Access Attempt Detected


 Most login failures are due to failed passwords. Login failure to sensitive systems where the users simply aren't authorized, though, can indicate malicious intent.

## Unauthorized External Device Installation


 Detects a removable media device attached to a host. External media can be used to exfiltrate sensitive data and is also a common source of infections, so some organizations block their use. Attempts to use these devices could indicate the intent for malicious activity. Customer should populate a list of devices that should not have external media installed on them.

## Unix/Linux RC Script Modification


 Detects modifications to RC Script files. These scripts are executed on system startup and may be used by an adversary to establish persistence.

## Unload Sysmon Filter Driver


 Attackers often disable security tools to avoid detection. This rule looks for the usage of process fltMC.exe to unload a Sysmon Driver that will stop sysmon from collecting the data.

## Unrecognized Container Image


 Monitors for unrecognized container images that may indicate an attempt to bypass security controls on existing images or escalate privileges. This rule is disabled by default to allow for proper configuration of the match lists used to determine recognized images.

## Unsafe Outlook Rule Creation Enabled


 Detects a registry modification that enables the creation of Outlook mail rules that can run scripts. This functionality is disabled by default. The addition of the EnableUnsafeClientMailRules registry entry is highly suspicious. This feature can be used by an adversary to establish persistence.

## Unsigned Image Loaded by LSASS


 Detects an unsigned image being loaded by LSASS as this may indicate attempted credential access. This rule may also detect persistence activity via LSASS driver loads.

Note that this rule requires Microsoft SysInternals Sysmon installed with Image Loaded (Event Id 7) logging enabled.

## Unusual Staging Directory - PolicyDefinitions


 Detects executable file extension written to the PolicyDefinitions directory. This activity has been associated with destructive malware.

## Ursnif Malware Registry Key


 Observes for the creation of a registry key associated with Ursnif malware.

## User Account Created and Deleted in 24 Hours


 User Account Created and Deleted in 24 Hours. The temporary existence of a user account may be suspicious activity.

## User Added to Local Administrators


 Observes for a user being added to the Windows local administrators group.

## User Created and Quickly Deleted on Linux Machine


 Attackers will sometimes create and subsequently delete user accounts to perform post-exploitation activity in an attempted counter-forensic measure.

## UserInit Process Launched by MSBuild.exe


 From FireEye Red Team Tool Countermeasures:
MSBuild is the build system for Visual Studio. This IOC detects the suspicious execution of userinit process by MSBUILD.

## VBS file downloaded from Internet


 Although Visual Basic scripts (.vbs) are sometimes regularly downloaded from the Internet, they are often part of malware establishment.  They carry an elevated risk.

## Volume Shadow Copy Service Stopped


 Detects the Volume Shadow Copy service being stopped using net stop. This activity is commonly seen in wiper malware and ransomware attacks.

## WCE wceaux.dll Access


 Obvserves for access of wceaux.dll, which may be indicative of credential access.

## WMI Launching Shell


 Observes for Windows Management Instrumentation (WMI) launching a shell.

## WMI Managed Object Format (MOF) Process Execution


 Attackers will often utilize The Managed Object Format (MOF) compiler to conceal and execute their malicious code within the WMI Repository.

## WMI Permanent Event Subscription


 This rule looks for the creation of WMI permanent event subscriptions.

## WMI Permanent Event Subscription - Sysmon


 This rule looks for the creation of WMI permanent event subscriptions.

## WMI Ping Sweep


 Detects when Win32_PingStatus is invoked to ping a device.

## WMI Process Call Create


 An attacker can use WMI to create malicious processes on the local or remote host to bypass application whitelisting, since WMI is an authorized Windows tool.

## WMI Process Get Brief


 An attacker can use WMI to execute scripts on a host by pointing to malicious XSL files.

## WMI Temporary Event Subscription


 This rule looks for the creation of WMI temporary event subscriptions.

## WMIExec VBS Script


 Detects suspicious file execution by wscript and cscript

## WMIPRVSE Spawning Process


 Observes for child processes spawned by WMIPRVSE.

## WannaCry Ransomware


 Uses data from process creation events to detect indicators of the WannaCry Ransomware.

## Web Download via Office Binaries


 Detects downloaded payloads from remote server.

## Web Request to IP Address


 This rule detects HTTP requests sent directly to IP addresses, bypassing DNS. This could indicate an attacker is trying to circumvent detection mechanisms.

## Web Request to Punycode Domain


 This rule detects web requests to domains that include punycode characters, which is a common phishing technique used to mimic the appearance of a legitimate domain.

## Web Servers Executing Suspicious Processes


 This rule looks for suspicious processes on all systems labeled as web servers. A list of web servers should be populated in order to enable the rule.

## Web Services Executing Common Web Shell Commands


 This rule looks for web server executables attempting to use commands commonly associated with adversaries utilizing a successfully uploaded web shell.

## Websense - Blocked Activity Threshold


 Websense blocked a large amount of activity originating from a single host within a short period of time.

## Wget Passed to Script Execution Command


 Passing a downloaded file to a script execution command such as sh will immediately run the script. This is indicative of either high-risk user behavior or malicious activity as script contents should always be reviewed prior to execution. This can be used to run scripts on a host where remote command execution is possible.

## Windows - Critical Service Disabled via Command Line


 Detects a critical Windows service, such as Microsoft Defender or Windows Firewall, being stopped via the command line utilities sc.exe or net.exe. This could indicate an attacker attempting to bypass defenses on the target system to conduct further post-exploitation activity.

## Windows - Delete Windows Backup Catalog


 Detects the deletion of backup catalogs on a Windows host through the command line. This activity is commonly seen in ransomware, where the program encrypts the host and deletes the backups to remove the possibility of restoring the computer and avoid paying the ransom.

## Windows - Denied RDP


 Generates a signal when windows event ID 4825 is observed. This indicates the user was denied an attempt to RDP.

## Windows - Domain Trust Discovery


 Suspicious Domain Trust Discovery Activity - T1482.

## Windows - Excessive User Interactive Logons Across Multiple Hosts


 A user performed a significant number of Windows interactive logins to multiple destination hosts in the past 24 hours. This behavior can be expected for some accounts, such as administrators in a Windows environment. Tuning this rule is highly recommended to filter out usernames where applicable.

## Windows - Incoming LSASS Network Connection - Zerologon Behavior(CVE-2020-1472)


 CVE-2020-1472 can be exploited by attackers to hijack enterprise servers due to Netlogon cryptographic weaknesses. The vulnerability allows an attacker to set a password for the computer account of an Active Directory Domain Controller, which can then be abused to pull credentials from the Domain Controller. This rule detects an incoming network connection made from the attacking machine to the victim Domain Controller to the LSASS process.

## Windows - Local System executing whoami.exe


 Local system account - Suspicious System Owner/User Discovery Activity - T1033 - requires commandline auditing 4688.

## Windows - Microsoft Office Add-In File Created


 This rule detects when a Microsoft Office Add-In is created by monitoring certain directories with specific file extensions. This rule requires the setup of file creation auditing.

## Windows - Network Connection from CMSTP


 Detects potential CMSTP.exe abuse. Adversaries use CMSTP.exe to load and execute DLLs or COM scriptlets from remote servers to bypass application control defenses.

## Windows - Network trace capture using netsh.exe


 Detects capture of a network trace via the netsh.exe trace functionality.

## Windows - Permissions Group Discovery


 Suspicious Permissions Group Discovery Activity - T1069.

## Windows - Possible Impersonation Token Creation Using Runas


 Detects the use of the runas command. Runas can be used to create impersonation tokens in an attempt to elevate privileges.

## Windows - Possible Squiblydoo Technique Observed


 The Squiblydoo technique is a way for unapproved scripts to run on a machine that is set up to allow only approved scripts to run. Squiblydoo utilizes regsvr32.exe to download an XML file that contains scriptlets for executing code on the victim machine.

## Windows - PowerShell Process Discovery


 Detects the use of various Get-Process PowerShell commands to discover information about running processes.

## Windows - Powershell Scheduled Task Creation from PowerSploit or Empire


 This rule detects the creation of a Windows scheduled task via PowerSploit or the default configuration of Empire.

## Windows - Remote System Discovery


 Suspicious Remote System Discovery Activity - T1018.

## Windows - Rogue Domain Controller - dcshadow


 Mimikatzs LSADUMP::DCShadow module can be used to make AD updates by temporarily setting a computer to be a DC.

## Windows - Scheduled Task Creation


 A scheduled task was created in Windows or Azure. It is common for system administrators and approved software to create scheduled tasks, but adversaries are known to use them for persistence within a Windows environment. This rule is disabled by default due to the volume of events it can produce. Users should filter/exclude allowed scheduled tasks according to their environment before enabling the rule. The scheduled task name is logged in the "commandLine" field.

## Windows - Suspicious Anonymous Logon Activity - Zerologon Behavior(CVE-2020-1472)


 CVE-2020-1472 can be exploited by attackers to hijack enterprise servers due to Netlogon cryptographic weaknesses. The vulnerability allows an attacker to set a password for the computer account of an Active Directory Domain Controller, which can then be abused to pull credentials from the Domain Controller. This rule detects the domain controller computer account being changed after a successful anonymous login occurred.

## Windows - Suspicious CMSTP Process Spawn


 Detects potential CMSTP.exe abuse. Adversaries use CMSTP.exe to load and execute DLLs or COM scriptlets from remote servers to bypass application control defenses.

## Windows - System Network Configuration Discovery


 Suspicious System Network Configuration Discovery Activity - T1016.

## Windows - System Time Discovery


 Identifies use of various commands to query a system's time. This technique may be used before executing a scheduled task or to discover the time zone of a target system.

## Windows - User Adds Self to Security Group


 A user adding themselves to a security group may indicate the attempt to escalate their privileges.

## Windows - WiFi Credential Harvesting with netsh


 Detects harvesting of Wifi Credentials Using netsh.exe.

## Windows Account Added To Privileged Security Group


 This signal alerts on the elevation of privileges assigned to a domain user account according to Windows Event ID 4728, 4732, and/or 4756.

## Windows Account Locked Out - 4740


 This signal fires whenever Windows Event type 4740 is seen in the environment.

## Windows Adfind Exe


 This rule looks for the execution of adfind.exe with command-line arguments that it uses by default, specifically the filter or search functions. This has been seen used before by Wizard Spider, FIN6 and actors whom also launched SUNBURST. AdFind.exe is usually used a recon tool to enumare a domain controller.

## Windows Admin User Remote Logon


 Detects remote logins by Administrative users. Administrative users are identified using your local naming convention. Because each environment controls their user naming convention, this rule's expression must first be tailored around your environment and enabled.  Adjust the section that reads:  "LIKE '%admin%'" to your environment's administrator naming convention.

## Windows Connhost Started Forcefully


 The rule looks for the Console Window Host process (connhost.exe) executed using the force flag -ForceV1. This is not regular behavior in the Windows OS and is often seen executed by the Ryuk Ransomware. The rule is disabled by default as this may be common in some environments.

## Windows Credential Editor (WCE) Tool Use Detected


 This signal inciates that an indicator in the windows registry was found that indicates the Windows Credential Editor (WCE) tool may be in use.  This tool use is highly suspicious and can indicate lateral movement attempts (pass-the-hash etc.)  REF: https://www.ampliasecurity.com/research/windows-credentials-editor/

## Windows Credential Editor (WCE) in use


 Looks for the possible use of Windows Credential Editor, a common open-source tool used for pass-the-hash amongst other attacks.  This detection examins the import hash (aka imphash) as well as process start identifiers associated with the tool.

## Windows Defender Download Activity


 Detect the use of Windows Defender to download payloads.

## Windows Disable Antispyware Registry


 The rule looks for the Registry Key DisableAntiSpyware set to disable. This is consistent with Ryuk infections across a fleet of endpoints.

## Windows Firewall Rule Added


 Observes for creation of new Windows Firewall Rule. An attacker may create new firewall rules to obfuscate activities via blocks, or to allow certain activity through the firewall.

## Windows Firewall Rule Deleted


 Observes for deletions of Windows Firewall rules. An attacker may delete firewall rules to obfuscate activities via blocks, or to allow certain activity through the firewall.

## Windows Firewall Rule Modified


 Observes for modifications to Windows Firewall rules. An attacker may modify firewall rules to obfuscate activities via blocks, or to allow certain activity through the firewall.

## Windows Network Sniffing


 Network sniffing refers to using the network interface on a system to monitor or capture information sent over a wired or wireless connection. An adversary may place a network interface into promiscuous mode to passively access data in transit over the network, or use span ports to capture a larger amount of data.

## Windows Port Monitor Modification


 Detects file creations or registry modifications to Windows port  monitors which can be used to gain persistence in a system process.

## Windows Process Name Impersonation


 This alert detects a process executing with a name that closely resembles a default Windows process. Malware will often attempt to disguise its execution by using a similar name to blend in with standard processes.

## Windows Query Registry


 Adversaries may interact with the Windows Registry to gather information about the system, configuration, and installed software.

## Windows Security Account Manager Stopped


 The rule looks for a Windows Security Account Manager (SAM) was stopped via command-line. This is consistent with Ryuk infections across a fleet of endpoints.

## Windows Service Executed from Nonstandard Execution Path


 Windows services launching from locations outside of their standard installation path is a common malware persistence mechanism.

## Windows Temp Directory Access Via SMB


 This can be seen as suspicious, as you will not often see remote systems pulling files from the Windows Temp directory of other systems.

## Windows Update Agent DLL Changed


 The Windows Update Agent executable, wuauclt.exe, can be abused by attackers to execute malicious code with elevated privileges by changing the DLL file loaded by the process. This technique is most commonly reported as part of phishing campaigns where the initial payload is a macro-enabled Microsoft Word document.

## Windows User Account Created with Abnormal Naming Convention


 'changeTarget' should be populated with a reguar expression that matches the user naming convention. This rule detects a user account that has been created that does not fit the normal naming convention established. If an unauthorized account has been created, it could be used to maliciously access additional systems.

## Winnti Pipemon Characteristics


 Detects specific process characteristics of Winnti Pipemon malware reported by ESET.

## Write-only SNMP attempt from external


 Probing for the default SNMP write password is a way to bypass network security hardware

## XSD Autostart Entry Modification


 Observes for modifications to XSD Autostart entries which can be used to execute malicious programs at startup.

## XSL Script Processing


 Extensible Stylesheet Language (XSL) files are commonly used to describe the processing and rendering of data within XML files. This rule detects when adversaries abuse this functionality to execute arbitrary files while potentially bypassing application whitelisting defenses.

## ZScaler Proxy-Traffic to Malicious Categorized Domain


 Observes for traffic detected and categorized as malicious by ZScaler

## ZeroLogon Privilege Escalation Behavior


 An attack against CVE-2020-1472 may create thousands of NetrServerReqChallenge &amp; NetrServerAuthenticate3 requests in a short amount of time. https://github.com/SecuraBV/CVE-2020-1472

## Zoom Child Process


 Observes for Zoom creating child processes.

## Zscaler - Allowed Elevated Risk Score Events


 Observes for a high risk event that was permitted by ZScaler.

## iOS Implant URL Pattern


 Detects a string in a http request url that is associated with an iOS Implant.  

Ref:
https://googleprojectzero.blogspot.com/2019/08/implant-teardown.html
https://twitter.com/craiu/status/1167358457344925696

## macOS Kernel Extension Load


 Kernel Extensions in macOS can be used by adversaries to execute malicious code with root privileges.

## macOS Login Items Modification


 Detects modifications to macOS login items. Login items are applications, files, folders, or connections which are launched upon user logon.

## macOS Startup Items Modifications


 Detects modifications to startup items on a macOS system. Startup Items plist files can be used to establish persistence by an adversary.

## smbexec.py Service Installation


 Observes for service installations related to smbexec.py

## vpnoverdns.com DNS lookup


 vpnoverdns.com is a free service providing VPN functionality over DNS. DNS resolutions for *.tun.vpnoverdns.com indicate usage of their VPN service. The service describes itself as "Data exfiltration, for those times when everything else is blocked.".
