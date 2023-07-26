---
id: community-ecosystem-apps
title: Sumo Logic Community Ecosystem Apps
sidebar_label: Community Ecosystem Apps
description: Community Ecosystem Apps Listing and program description.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<img src={useBaseUrl('img/icons/general/community.png')} alt="Thumbnail icon" width="60"/>

Sumo Logic Community Ecosystem Apps are provided and supported by our internal and external users and creator community.

The following links provide collection, installation, and dashboard information on working with these apps. Generally, these apps should be viewed as open source content, and we strive to ensure that they are proactively reviewed by our community to ensure usability, use case coverage, and technical quality.

More information on this initiative and how to contribute can be found [here](#faq).

## Community Content Catalog

Community content is stored in our [Community Content Repository](https://github.com/SumoLogic/sumologic-content). Please visit the following links to access related content:

:::note
The overall ratings for content are listed on a scale of 0 to 5, with 5 being the highest. You can view detailed ratings and comments on the Community Content Repository.
:::

* [Amazon CloudSearch](https://github.com/SumoLogic/sumologic-content/tree/master/Amazon_Web_Services/AWS_CloudSearch) (Rating: None)
* [Amazon RDS - Enhanced Monitoring](https://github.com/SumoLogic/sumologic-content/tree/master/Amazon_Web_Services/AWS_RDS/Enhanced-Monitoring) (Rating: None)
* [Aruba Wireless - Auth Manager & WMS Module](https://github.com/SumoLogic/sumologic-content/tree/master/Aruba_Wireless/ArubaWireless_Controller) (Rating: None)
* [Aruba Wireless - TACACS](https://github.com/SumoLogic/sumologic-content/tree/master/Aruba_Wireless/ArubaWireless_TACACS) (Rating: None)
* [AWS CloudTrail - User Activity](https://github.com/SumoLogic/sumologic-content/tree/master/Amazon_Web_Services/AWS_CloudTrail) (Rating: 4.5)
* [AWS EC2 - Host Metrics for OpenTelemetry](https://github.com/SumoLogic/sumologic-content/tree/master/Amazon_Web_Services/AWS_EC2/Host_Metrics_OTEL) (Rating: 4)
* [AWS Health Events](https://github.com/SumoLogic/sumologic-content/tree/master/Amazon_Web_Services/AWS_Health) (Rating: None)
* [Centrify](https://github.com/SumoLogic/sumologic-content/tree/master/Centrify) (Rating: None)
* [Checkpoint Firewall](https://github.com/SumoLogic/sumologic-content/tree/master/Checkpoint) (Rating: None)
* [Chef](https://github.com/SumoLogic/sumologic-content/tree/master/Chef) (Rating: None)
* [Cisco Sourcefire](https://github.com/SumoLogic/sumologic-content/tree/master/Cisco/Sourcefire) (Rating: None)
* [Citrix Netscaler VPN](https://github.com/SumoLogic/sumologic-content/tree/master/Citrix/VPN) (Rating: None)
* [Citrix XenServer](https://github.com/SumoLogic/sumologic-content/tree/master/Citrix/XenServer) (Rating: None)
* [Fortinet Fortigate Firewall](https://github.com/SumoLogic/sumologic-content/tree/master/Fortinet/Fortigate_Firewall) (Rating: 4.5)
* [F5 Distributed Cloud Services](https://github.com/SumoLogic/sumologic-content/tree/master/F5) (Rating: 4)
* [GCP Loud Balancer Metrics](https://github.com/SumoLogic/sumologic-content/tree/master/GCP/Load_Balancer_Metrics) (Rating: 4)
* [JAMF](https://github.com/SumoLogic/sumologic-content/tree/master/JAMF) (Rating: 3.5)
* [Microsoft Defender for Endpoint](https://github.com/SumoLogic/sumologic-content/tree/master/Microsoft/Defender_4_EndPoint) (Rating: None)
* [MISP Threat Intelligence](https://github.com/SumoLogic/sumologic-content/tree/master/MISP) (Rating: None)
* [Open Source CSPM](https://github.com/SumoLogic/sumologic-content/tree/master/CSPM) (Rating: None)
* [Palo Alto Cortex XDR](https://github.com/SumoLogic/sumologic-content/tree/master/Palo_Alto_Networks/Cortex_XDR) (Rating: 3.5)
* [Proofpoint Targeted Attack Protection (TAP)](https://github.com/SumoLogic/sumologic-content/tree/master/Proofpoint/Proofpoint_TAP) (Rating: 4)
* [Sophos Central](https://github.com/SumoLogic/sumologic-content/tree/master/Sophos/Sophos-Central) (Rating: None)
* [Sumo Logic Traces](https://github.com/SumoLogic/sumologic-content/tree/master/Sumo_Logic_Native/Traces) (Rating: 4)
* [Symantec Web Security Service (WSS)](https://github.com/SumoLogic/sumologic-content/tree/master/Symantec/WSS) (Rating: 4)
* [Tenable.io](https://github.com/SumoLogic/sumologic-content/tree/master/Tenable/Tenable_IO) (Rating: 4.5)
* [Qualys VMDR & Inventory](https://github.com/SumoLogic/sumologic-content/tree/master/Qualys) (Rating: 4)


## Contributing Guidelines

Content can include vendor-based/custom applications, dashboards, search queries, field extraction rules (FERs), tooling, etc. Please complete each of the required fields in the [Sumo Logic Community Content Submission](https://forms.gle/KQBLBuMuUw85xtRi9) form, and follow the guidelines below:
- Verify that all sensitive data has been removed or redacted BEFORE submitting content. This includes PII, credentials, network data, etc. If you provided screenshots, either blur or mark over this sensitive data.
- All application, dashboard, and search content should be in JSON format (exported from Sumo Logic). Please use a descriptive naming convention for files, preferably Company-Product-Function (example: **aws-kinesis-errors.json**).
- When possible, include a screenshot of your dashboards in .png or .jpg format. Name your screenshots the same as their respective JSON content.
- If you have notes on how to collect data for specific content, please provide those steps as well.
- If you have a GitHub Repository for your content already, please feel free to provide the link to this repository, and make sure it has Public access.

Once submitted, Sumo Logic will review your content for publishing to our Community Ecosystem repository.

### Alternative Submission

Follow the "fork-and-pull" Git workflow:
- **Fork** the repo on GitHub.
- **Clone** the project to your own machine.
- **Create** any new folders/subfolders necessary for your content.
   - Add your content to these folders.
   - Verify that all sensitive data has been removed or redacted BEFORE submitting a PR. This includes PII, Credentials, and Network data. Screenshots included (either blur or mark over).
   - All application, dashboard and search content should be in JSON format (exported from Sumo Logic). Please use a descriptive naming convention for files, preferably Company-Product-Function (example: **aws-kinesis-errors.json**).
   - When possible, include a screenshot of your dashboards in .png or .jpg format. Name your screenshots the same as their respective JSON content. If there is more than one, please place these images in a Screenshots folder.
   - Create README.md file within each subfolder to track descriptions of the app, guidance on setting up the data collection, authors, versions, dates, and links to third party docs.
- **Commit** the changes on your local machine to your own fork/branch.
- **Push** your work back up to your fork.
- **Submit** a pull request so that we can review your changes and publish.


## FAQ

Sumo Logic Community Ecosystem Apps are provided and supported by our internal and external user and creator community. Generally, these apps should be viewed as open source content, and we strive to ensure that they are proactively reviewed by our community to ensure usability, use case coverage, and technical quality.

### What is this?

A central place to list community content from the internal and external Sumo Community to enable more rapid time to value for customers.

### How do I use this content?

Methods to using each piece of content are outlined their corresponding locations. For content like Apps, Log Searches, and FERs, you can use Sumo Logic's [import](/docs/get-started/library/#import-content) feature to add this content to your Sumo Logic Library.

### Can my content be anonymous?

Yes. When you submit content via the [Sumo Logic Community Content Submission](https://forms.gle/KQBLBuMuUw85xtRi9) form, you have the option to select if you would like your submission to be anonymous.

### How do I add comments, reviews, and ratings to an App?

1. Open the folder of the App you want to review.
2. Open the **Comments** folder.
3. Select the **Comments.json** file.
4. Select **Edit** (pen icon).
5. Add a new line below the current comments, and paste in your ratings/comments using the following schema:
  ```json
  {
    "reviewer":"[githubid/name]",
    "ratings":{
      "overall":4,
      "use-case":5,
      "design":4,
      "technical":4
    },
    "review":"This app is very useful for knowing x, y, and z. It would be great if the dashboards were broken out by use case instead of being one big dashboard."
  }
  ```
6. Select **Propose New Changes**.
7. Submit Pull Request.

Code owners will review and merge your rating to our repo.

### Where do I submit bugs and enhancement requests?

Support for this content is provided by our community on a volunteer basis. Submit [GitHub Issues](https://github.com/SumoLogic/sumologic-content/issues) for bugs and enhancement requests.
