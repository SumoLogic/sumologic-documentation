---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
---

## Sumo Logic FAQ

See the following FAQS on Sumo Logic.

### What is the optimal log format to use with Sumo Logic?

When you have full control over your logging format we recommend human readable key-value pairs whenever possible. JSON and XML are also acceptable, though XML is harder to read and parse than JSON. 

Whatever you use follow these rules:

* Use key-value pairs in a regular, defined format such as `key=value,` so they're easy to [parse](/docs/search/search-query-language/parse-operators).
* Start logs with a regular, well-defined timestamp, ideally including a time zone. See [timestamp considerations and supported formats](/docs/send-data/reference-information/time-reference.md) for details.
* Start logs with a regular format to make automatically detecting message boundaries easier. See [collecting multiline logs](/docs/send-data/installed-collectors/sources/define-boundary-regex-multiline-messages.md) for details.

For example, from our own production logs, we use the following:

```json
2012-08-16 13:39:36,979 [metrics] INFO com.sumologic.util.Reporter - com.sumologic.util.scala.Aggregator.Buffer[/usr/sumo/stream-19.5-3/logs/stream.log]-Size-Meter (bytes/s) count=78847, fifteenMinuteRate=0.26, fiveMinuteRate=0.11, oneMinuteRate=0.00, meanRate=1.06
```

This is a key-value pair log, which is easy to parse and easy to read in Sumo.

### What Types of Logs Can I Collect?

The following table lists data types and some of the popular sources that produce logs, which can be collected by Sumo Logic. This list is a sample only to provide a general idea of the possible sources of log data; it is not complete.

| Data Type | Popular Log Sources |
| -- | -- |
| Custom App Code | <ul><li>Java</li><li>[Log4J](/docs/send-data/collect-from-other-data-sources/sumo-logic-open-source-projects.md)</li><li>Log4J 2</li><li>Microsoft .NET</li><li>Rails</li></ul> |
| Open Source | <ul><li>Apache</li><li>[Apache Tomcat](/docs/integrations/web-servers/apache-tomcat)</li><li>Hadoop</li><li>Lucene</li></ul> |
| Middleware | <ul><li>JBoss</li><li>Oracle WebLogic</li><li>webMethods</li><li>WebSphere</li></ul> |
| Databases	 | <ul><li>IBM DB2</li><li>[MySQL](/docs/integrations/databases/mysql)</li><li>[Microsoft SQL Server](/docs/integrations/microsoft-azure/SQL-Server#Collecting-Logs-for-the-Microsoft-SQL-Server-App)</li><li>Oracle</li></ul> |
| Server / OS | <ul><li>HP UX</li><li>[Linux](/docs/integrations/hosts-operating-systems/Linux)</li><li>Mac</li><li>Red Hat</li><li>Ubuntu</li><li>Windows</li></ul> |
| Virtual | <ul><li>Citrix</li><li>Microsoft Hyper-V</li><li>VMware</li></ul> |
| Network | <ul><li>[Cisco ASA](/docs/integrations/security-threat-detection/Cisco-ASA)</li><li>[Palo Alto Networks](/docs/integrations/security-threat-detection/Palo-Alto-Networks-6)</li><li>McAfee</li><li>Symantec</li></ul> |
| Content Delivery | <ul><li>[Akamai](/docs/integrations/saas-cloud/Akamai-Cloud-Monitor)</li><li>[Amazon CloudFront](/docs/integrations/amazon-aws/CloudFront)</li><li>[Fastly](/docs/integrations/saas-cloud/Fastly)</li><li>Limelight Networks</li></ul> |
| IaaS / PaaS | <ul><li>Amazon</li><li>[Heroku](/docs/manage/connections-integrations/heroku.md)</li><li>Windows</li><li>[Google Audit](../cse/ingestion/google-g-suite-apps-audit.md)</li><li>[Google Cloud Platform (GCP)](/docs/send-data/hosted-collectors/google-source/google-cloud-platform-source.md)</li></ul> |
| SaaS | <ul><li>[Box](/docs/integrations/saas-cloud/Box)</li><li>[ServiceNow](/docs/alerts/webhook-connections/servicenow/set-up-connections.md)</li><li>[Salesforce](/docs/integrations/saas-cloud/salesforce)</li><li>[Microsoft Office 365](/docs/integrations/microsoft-azure/office-365)</li></ul> |
| Security | <ul><li>Cisco</li><li>McAfee</li><li>Symantec</li><li>Qualys</li></ul> |

### Where is My Data Stored?

Where your data is stored depends on the geographical location the
Account Owner selected when establishing your Sumo Logic account. 

* Australia. Your data is stored in the AWS ap-southeast-2 (Sydney) region.
* Canada. Your data is stored in the AWS ca-central-1 (Central) region.
* Europe. Ireland. Your data is stored in the AWS eu-west-1 (Ireland) region.
* Europe. Frankfurt. Your data is stored in the AWS eu-central-1 (Frankfurt) region.
* India. Mumbai. Your data is stored in the AWS ap-south-1 (Mumbai) region.
* Japan. Your data is stored in the AWS ap-northeast-1 (Tokyo) region.
* North America. Your data is stored in the AWS us-east-1 (Northern Virginia) or us-west-2 (Oregon) region.
* Federal. Your data is stored in the AWS us-east-1 (Northern Virginia) region.

Your data is stored only in your region. 

For more information, see [AWS Regions and Endpoints](http://docs.aws.amazon.com/general/latest/gr/rande.html) and our [Privacy Statement](https://www.sumologic.com/privacy-statement/).



## Certification FAQ

### How do I get to certifications and training?

You must access certifications from the product. The certification page is available in the Sumo Logic service by clicking **Certification** along the top of the **Home** tab.

![certs](/img/get-started/certifications.gif)

We also have more information on certifications on [our external site](https://www.sumologic.com/learn/certifications).

### How do I register for a course or exam?

1. Navigate to the course series you’re interested in.
1. Select the course or exam you want to register for.
1. Click **Register**.

### How do I navigate inside a course?

1. Select the course you want to take.
1. Select the section you want to study.
1. View all the materials, correctly answer all knowledge checks, and complete all progress checks. Click **Next** or **Submit** after each section.
1. Click **Go to results** when you get to the last section.
1. If you passed the class, you’ll get a congratulations message. Click **Submit results**.
1. Rate the section and submit a review. Tell us what you liked or didn’t like. Then click **Submit**. 
1. After your feedback, you can click **Close course**. 
1. Verify your results were submitted correctly by looking for the blue checkmark next to the section you just completed. 
1. You’ve unlocked the next section. Continue through until the end of the course.

    ![exam navigate](/img/get-started/exam-navigate.gif)

### How do I complete a course?

Make sure you have completed all sections of the course.

### How do I complete an exam?

Not much has changed but be sure to **Close course** to record your
score!

1. Answer all the exam questions. 
1. Click **Submit all answers**.
1. Click **Close course** to record the results.
1. If you passed, you can now get your certificate. If you failed, you can try again.

![complete exam](/img/get-started/complete-exam.gif)

### How do I view my certificate?

Spoiler alert, we now have QR codes so you can share your score with anyone who wants to validate your cert!

1. Click your profile in the upper right corner.
1. Select **My Profile** from the dropdown.
1. Find the exam you completed and click **View certificate.**

![view cert](/img/get-started/view-cert.gif)

### How do I share my certificate on LinkedIn?

1. Click your profile in the upper right corner.
1. Select **My Profile** from the dropdown.
1. Find the exam you completed and click **Add to profile**.
1. Copy one piece of information, then click **Launch LinkedIn in new tab**.
1. Paste the information in the LinkedIn form.
1. Continue moving between tabs to copy all the information.
1. When you’re finished, click **Save**.

![share cert](/img/get-started/share-cert.gif)

### What certifications do we offer?

We currently offer these certifications:

* **Fundamentals** (Formerly "Level 1: Sumo Pro User") -  Certified Users possess broad knowledge around analyzing logs and metrics and have familiarity with the Sumo Logic service related to simple data searching, filtering, parsing and analyzing. Certified users can use Apps for out-of-the-box content that monitors their data, identifies trends, and keeps their users on top of critical events.
* **Search Mastery** - Certified Users exhibit deep technical knowledge on how to analyze and correlate their logs and metrics to easily identify those critical events that are important to their organizations. In addition to taking advantage of out-of-the-box content, Certified Sumo Power Users can build Dashboards and Alerts for their custom apps, unlocking the power of Sumo Logic to analyze, measure and monitor the health of their environments.
* **Metrics Mastery** - Certified Users exhibit deep technical knowledge on how to analyze and correlate their logs and metrics to easily identify those critical events that are important to their organizations. Build on the knowledge gained in Fundamentals to do more in-depth analysis with metrics. Identify critical events with ease and create the dashboards and alerts necessary to monitor your environment.
* **Administration** - Certified users become technical experts on setting up, managing and optimizing their Sumo Logic solution. In addition to securing and managing their Sumo Logic environment, they can design and deploy a data collection strategy that fits their infrastructure. Keeping an eye on the pulse of their usage, they can also optimize data querying to fit their searching patterns.
* **Cloud Security Monitoring and Analytics** - In this course you will create starter SOC queries, as panels in a dashboard.These advanced operator queries help you monitor such things as user activity across the globe, failed logins, land speed violations, and brute force attacks. You will create parameterized lookup tables for easy panel or dashboard pivots. You will learn how to export the starter SOC dashboard you created for use in your own environment. Lastly, you will be able to detect and investigate IOCs with the use of our embedded CrowdStrike database which monitors malicious IPs addresses and apply scheduled views as a best practice.
* **Advanced Metrics with Kubernetes** - Certified users swiftly navigate through their Kubernetes cluster name spaces, services, nodes, and deployments. They quickly master Kubernetes for their organization with Sumo Logic from alerts and dashboards to customized templates to address key use cases.

### Do I have to take the certifications in order?

No, but we highly recommend passing the examination for Fundamentals (formerly Level 1) before continuing onto any other certifications.

### What can I do to prepare for the exams?

It depends on how you like to learn. We have:

Instructor-led options:

* Free scheduled virtual-led sessions. Registration found under "Live, Instructor-Led Courses" on [this page](https://www.sumologic.com/learn/training).
* Learn in-person (when COVID restrictions are over)
* Invite us to come to your location for a [private customized session](https://www.sumologic.com/learn/training/#training_custom_session_form) for your team.
* Attend one of the free [certification sessions (Cert Jams)](https://www.sumologic.com/learn/training/sumo-jams/) we host year-round globally.

Self-paced option:
* Learn on your own time at your own pace at no cost to you. Lesson recordings and labs are accessible in Sumo Logic using the certification page as indicated in the image below. Once you understand the materials in the lesson recordings and have conducted the labs, you should be ready for the exam.

### What are the exams like?

All certifications have an online 60-minute 30-question examination. Most questions are multiple choice, and most people finish in 30 minutes on average. You're required to answer 75% of the questions correctly to get certification. You are free to take the exam whenever and wherever you like at no cost to you. Exams are open-book, open-note, and open-internet. You are encouraged to use this documentation site during the exam. You have multiple amount of attempts to pass an exam. Questions may be different and reordered on subsequent attempts.

### When do certifications expire?

Fundamentals will expire two years after being issued. All other certifications will expire after one year. You will receive two email notifications about expiration: one when your certification is 30 days from expiration, and another when your certification expires.  
