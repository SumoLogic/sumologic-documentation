---
id: training-certification-faq
title: Sumo Logic Training and Certification FAQ
sidebar_label: Training and Certification
description: Learn more about the Sumo Logic Training and Certification Program.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/general/training.png')} alt="icon" width="50"/> <img src={useBaseUrl('img/icons/general/certification.png')} alt="icon" width="50"/>

Learning at Sumo Logic will help you build the skills necessary to achieve your organization's goals using our platform to make the world’s apps reliable and secure.

We offer courses online (live and on-demand) and in-person **for free**. Customized training is also available through our private offering.

* [**Sumo Logic Training Portal**](#training-portal), only available in-product, where you'll find our courses and certifications. To browse our certification descriptions, see [Sumo Logic Training and Certifications](https://www.sumologic.com/learn/certifications).
* [**Sumo Logic Training Lab Environment**](#training-lab-environment), curated and set up to work along with our training curriculum.
* [**Sumo Logic Partner Training**](https://partnertraining.sumologic.com), dedicated technical training for Sumo Logic partners. To sign up, you'll need an access code, which you can obtain from your account manager.

## Training Portal

### How do I access the Training Portal?

1. First, log in to Sumo Logic.
1. From the **Home** page, click the **Certification** tab.
1. Click **Get Certified**. You'll be redirected to the portal page, where you can access all courses and certifications.

<details><summary><strong>Get Certified</strong> link not working? Make sure to verify your email address.</summary>

For security reasons, you must must [verify your email address](#how-do-i-verify-my-email-address) in order to access [third-party services within Sumo Logic](#how-do-i-obtain-third-party-service-access). If you have a working Sumo Logic username and password, then your email address is considered verified.

</details>

![certs](/img/get-started/certifications.gif)

### How do I obtain third-party service access?

When you create a new organization in Sumo Logic, you will be logged in automatically the first time (without using a password). After that, you'll receive an email asking you to activate your account. This step is required in order to:

* Access Sumo Logic through a third-party single sign-on (SSO) service implementing SAML.
* Log into Sumo Logic through the Heroku add-on.
* Log in using other Sumo Logic integration partners that provide SSO.
* Access our in-product third-party services like **Get Certified** and **Community**

Users that do not authenticate to Sumo Logic using a username and password are required to complete the email verification process.

### How do I verify my email address?

To activate/verify your account:

1. Go to **Help** > **Community**.<br/> ![verify-email](/img/get-started/verify-email.gif)
1. You will be prompted to activate your account.
1. Click **Send Activation/Verification Email**.
1. Open the email and click **Verify Your Email**.

Now that your email is verified, you'll be able access to third-party services.

## Training Lab Environment

The Training Lab Environment will enable you to get hands-on practice following the lessons covered in our learning experiences. A Sumo Logic environment curated to work with the examples and lab exercises provided with our courses is available 24/7 all year round for you to practice.

### How do I access the Training Lab environment?

1. Choose a number between 001 and 999. Remember this number, since you'll use it in all of your labs.
1. Open a new window in a different browser. For example, if you're reading this on Chrome, open a Firefox window. Using separate browsers will keep you logged in to your regular Sumo Logic account and the training lab environment at the same time.
1. In the new browser window, go to [https://service.sumologic.com](https://service.sumologic.com).
1. Enter the credentials found at the top of the **Become a Sumo Expert** page of the **Training Portal**.
  :::note
  The Training Lab Environment password changes monthly, so you may have to check back there often.
  :::
1. You'll know you have access when you see **Sumo Logic Training** when you hover over the user in the bottom left corner.
1. Save your training username for use during this training. It's a good idea to have both the Sumo Logic training lab environment and this self-paced program open in separate windows, so you can toggle between them.
  :::important
  Be careful not to take exams or self-paced courses with training account credentials!
  :::

### Where can I find the Training Lab credentials?

Credentials change monthly. We post them on the training portal in the **Become a Sumo Logic Expert** section.

![credentials](/img/get-started/credentials.gif)


## Self-Paced Training

With our Self-Paced eLearning, you can learn at your own pace, anywhere, without constraints. Our comprehensive product training as well as certification course will help you prepare  to pass the certification exams.

### How do I access Self-Paced training?

Self-paced training is available in our [Training Portal](#how-do-i-access-the-training-portal).

### What content is available Self-Paced?

Everybody learns differently, we offer different options to adapt to your learning needs:

* **Learning Paths**. you can learn at your own pace guided by our product oriented **Learning Paths**. The following **Learning Paths** are available under the **Become a Sumo Logic Expert** section of our **Training Portal**:
   * General
   * Observability
   * Security
* **Micro Lessons**. access our growing, curated library of quick tutorials, short demos and best practices, learn something new in just minutes. Check out the **Learn New Skills** section from our **Training Portal** to access this content.
* **Recorded Live Training**. did you miss a Cert Jam or a workshop? Watch recordings of past sessions, download the student lab guide and a copy of the slides.


### How do I register for a Self-Paced course?

Navigate to your course of interest and click on it, then click **Register**.

![register](/img/get-started/register.gif)


### How do I navigate inside a Self-Paced course?

1. Select the course.
1. Select the section your want to review.
1. View all the materials, correctly answer all knowledge checks, and complete all progress checks to be able to advance to the next section in the course.
1. Click **Next** or **Submit** after each section so your progress is tracked by the system.
1. When you get to the end of the section, click **Go to results**. If you've passed the section, you will get a congratulations message.
1. Click **Submit Results**.
1. Rate the section and submit a review. Tell us what you liked or didn’t like.
1. After your feedback is recorded, you can click **Close Course** to update your progress.
1. Verify your results were submitted correctly by looking for the blue checkmark next to the section you just completed. This will unlock the next section of the course.
1. Continue with the next section of the course until you finish all sections available.

![exam navigate](/img/get-started/exam-navigate.gif)


### How do I complete a course?

Make sure to complete all sections of the course.


### How do I fix the Data Pipeline error?

If you're seeing the following error when starting a new lesson, this is typically due to a browser setting.

<img src={useBaseUrl('img/get-started/error.png')} alt="error" />

Here are some fixes:

* Refresh your browser. Clear your browser’s cookies and cache.
* Close and reopen your browser.
* Browser or network settings disable or block Third Party Cookies. The training portal will use Cookies to authorize access to specific learning content. To solve this error, add `[*.]sj-cdn.net (about:blank)` as a trusted site in your browser's privacy settings or update browser settings to allow third-party cookies.
* Confirm your internet connection.
* Attempt to play the video or reload the lesson in an Incognito or Private window by clicking your browser's menu button and selecting "New Incognito/Private Window".
   * If the content successfully loads in the new window, this is an indicator that a browser extension is likely preventing the content from loading.
* For troubleshooting `Video Error Code 232011` or `Cannot load M3U8: Crossdomain access denied` error messages, work with your IT network team to check on your firewall status.
   * If you have a firewall, you can allow a particular HTTP header: `Access-Control-Allow-Origin: *`


## Certifications

We’ve done studies that show when you are Sumo Logic Certified, you gain greater insight into your data, search more efficiently and build impactful dashboards.

### How do I access an exam?

Access to our certification exams is available in our [Training Portal](#how-do-i-access-the-training-portal).


### What certifications does Sumo Logic offer?

**Sumo Logic Certified - Fundamentals**. Gain broad knowledge analyzing logs and metrics with the Fundamentals Certification. Get Sumo Logic up and running and learn to do simple filtering, data parsing, and analysis.

<!--
Certified Users possess broad knowledge around analyzing logs and metrics and have familiarity with the Sumo Logic service related to simple data searching, filtering, parsing and analyzing. Certified users can use Apps for out-of-the-box content that monitors their data, identifies trends, and keeps their users on top of critical events.
-->

**Sumo Logic Certified - Search Mastery**. Build on the knowledge gained in Fundamentals to do more in-depth analysis of logs and metrics. Identify critical events with ease and create the dashboards and alerts necessary to monitor your environment.

<!--
Certified Users exhibit deep technical knowledge on how to analyze and correlate their logs and metrics to easily identify those critical events that are important to their organizations. In addition to taking advantage of out-of-the-box content, Certified Sumo Power Users can build Dashboards and Alerts for their custom apps, unlocking the power of Sumo Logic to analyze, measure and monitor the health of their environments.
-->

**Sumo Logic Certified - Metrics Mastery**. Build on the knowledge gained in Fundamentals to do more in-depth analysis with metrics. Identify critical events with ease and create the dashboards and alerts necessary to monitor your environment.

<!--
Certified Users exhibit deep technical knowledge on how to analyze and correlate their logs and metrics to easily identify those critical events that are important to their organizations. Build on the knowledge gained in Fundamentals to do more in-depth analysis with metrics. Identify critical events with ease and create the dashboards and alerts necessary to monitor your environment.
-->

**Sumo Logic Certified - Administration**. Gain critical Administration expertise on how to set up your organization with Sumo Logic as well as how to optimize and manage queries and content to make the whole team more effective.

<!--
Certified users become technical experts on setting up, managing and optimizing their Sumo Logic solution. In addition to securing and managing their Sumo Logic environment, they can design and deploy a data collection strategy that fits their infrastructure. Keeping an eye on the pulse of their usage, they can also optimize data querying to fit their searching patterns.
-->


**Sumo Logic Certified - Cloud Security Analytics**: Learn how our Threat Intelligence can help you stay on top of your environment by matching IOCs like IP address, domain names, email addresses, and MD5 hashes. Also learn how to analyze AWS data to monitor account usage and monitor security groups effectively.

<!--
In this course, you'll create starter SOC queries as dashboard panels. These advanced operator queries help you monitor user activity across the globe, failed logins, land speed violations, brute force attacks, and more. You will create parameterized lookup tables for easy panel or dashboard pivots. You will learn how to export the starter SOC dashboard you created for use in your own environment. Lastly, you will be able to detect and investigate IOCs with the use of our embedded CrowdStrike database, which monitors malicious IPs addresses, and apply scheduled views as a best practice.
-->

**Sumo Logic Certified - Cloud SIEM Fundamentals**. Learn how Cloud SIEM ingests your data and turns it into actionable security Insights. Get hands-on practice with threat investigation, take actions on Insights, and learn the basics of SOC content creation, like writing rules and custom Insights.

**Sumo Logic Certified - Cloud SIEM Administration**. Learn how to set up data ingestion for Cloud SIEM, including writing custom log and ingest mappings. Customize your environment with a deep dive into custom rules and Insight Actions.

**Sumo Logic Certified - Cloud SOAR Fundamentals**. Learn how to automate your security operations center with playbooks, dashboards, and reports. Watch a playbook run in real time and export a customized dashboard.

**Sumo Logic Certified - Cloud SOAR Administration**. Learn about Cloud SOAR administration, including RBAC controls to secure your SOC. Get hands on by customizing settings and automating actions with playbooks.

**Sumo Logic Certified - Kubernetes on Sumo Logic**. Swiftly navigate through Kubernetes cluster name spaces, services, nodes, and deployments and master monitoring and troubleshooting Kubernetes from alerts and dashboards to customized templates to address key use cases.

**Sumo Logic Certified - Observability Fundamentals**. Learn about Sumo Logic’s three pillars of the observability solution - Metrics, Tracing, and Logs. You'll also become conversant with the use of the tools to help you identify the root cause of an outage and trace the incidents to troubleshoot an issue.

**Sumo Logic Certified - Observability Administration**. Deploy the AWS Observability solution using CloudFormation Template, gathering metrics from a Kubernetes cluster, and establishing trace points to gather trace data using OpenTelemetry.

<!--
* **Advanced Metrics with Kubernetes** - Certified users swiftly navigate through their Kubernetes cluster name spaces, services, nodes, and deployments. They quickly master Kubernetes for their organization with Sumo Logic from alerts and dashboards to customized templates to address key use cases.
-->

### Do I have to take the certifications in order?

No, but we highly recommend passing the Fundamentals exam before continuing onto any other certifications.


### What can I do to prepare for the exams?

It depends on how you like to learn. We have:

Instructor-led options:
* Attend one of the free certification sessions (Cert Jams) we host year-round globally, either online or in-person
* Invite us to come to your location for a private customized session for your team.

<!--
* Free scheduled virtual-led sessions. Registration found under "Live, Instructor-Led Courses" on [this page](https://www.sumologic.com/learn/training).
* Learn in-person (when COVID restrictions are over)
* Invite us to come to your location for a [private customized session](https://www.sumologic.com/learn/training/#training_custom_session_form) for your team.
* Attend one of the free [certification sessions (Cert Jams)](https://www.sumologic.com/learn/training/sumo-jams/) we host year-round globally.
-->

Self-paced option:
* Learn on your own time, at your own pace, at no cost to you.
* Self-Paced courses, lesson recordings, and labs are accessible in Sumo Logic. Once you understand the materials in the lesson recordings and have conducted the labs, you should be ready for the exam.

<!--
* Lesson recordings and labs are accessible in Sumo Logic using the certification page as indicated in the image below.
-->

### How long does it take to complete an exam?

The majority of our certification exams have a duration of 60 minutes (30 questions). We recommend checking the exam description beforehand.

On average, most candidates finish in 30 minutes.

<!--
You are free to take the exam whenever and wherever you like at no cost to you. Exams are open-book, open-note, and open-internet. You are encouraged to use this documentation site during the exam. You have multiple amount of attempts to pass an exam. Questions may be different and reordered on subsequent attempts.
-->

### What is the pass rate for the exams?

While the majority of our certification exams require you to answer 75% of the questions correctly to get certification, we recommend checking the exam description beforehand.


### What type of questions should I expect in the exam?

Most questions are multiple choice. Exams are open-book, open-note, and open-internet. You are encouraged to use our documentation site during the exam. You have multiple attempts to pass an exam. Questions may be different and reordered on subsequent attempts.


### Do I need to schedule an appointment to take an exam?
No. You are free to take the exam whenever and wherever you like at no cost to you.


### When do certifications expire?

Fundamentals certifications expire two years after being issued. All other certifications expire after one year.

You'll notified by email 30 days before a certification expires, and again immediately after a certification expires.


### How do I complete an exam?

* Answer all the exam questions.
* Click **Submit all answers**.
* Be sure to click **Close course** to record your results. Skipping this step will mark the exam as incomplete.
* When you pass a course, your certificate will be emailed to you. If you've failed, you can try again.

![complete exam](/img/get-started/complete-exam.gif)

### How do I view my certificate?

1. Click your profile in the upper right corner.
1. Select **My Profile** from the dropdown.
1. Find the exam you completed and click **View certificate**.

![view cert](/img/get-started/view-cert.gif)


### How do I share my certificate with others?

Each Sumo Logic certificate has a QR code and link to a verification site so you can share your score with anyone who wants to validate your certification status.

![share cert](/img/get-started/share-cert.gif)

### How do I share my certificate on LinkedIn?

1. Click your profile in the upper right corner.
1. Select **My Profile** from the dropdown.
1. Find the exam you completed and click **Add to profile**.
1. Copy one piece of information, then click Launch LinkedIn in a new tab.
1. Paste the information in the LinkedIn form.
1. Continue moving between tabs to copy all the information.
1. When you’re finished, click **Save**.

![linkedin](/img/get-started/linkedin.gif)
