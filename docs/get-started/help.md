---
id: help
title: Help
sidebar_label: Help
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

<img src={useBaseUrl('img/icons/business/support.png')} alt="icon" width="40"/>

Our in-product left-nav **Help** menu provides quick access to Sumo Logic Support, community, and more.

<img src={useBaseUrl('img/get-started/help-menu.png')} alt="Help menu" width="200"/>

You can access docs directly in Sumo Logic under **Help** > **Documentation**. The **Help** is context-sensitive. When you are on a page in the web UI, the help system will open to the appropriate topic when you select **Help** > **Documentation**.

Docs cover all product features and should be your first resource when you have any questions. For questions or issues concerning Sumo Logic Help, [contact our documentation team](mailto:documentation@sumologic.com).

## Support

If you haven't found the answer to your question in the online Help, go to **Help** > **Support** (in product).

![Help - Support.png](/img/get-started/Help-Support.png)

You'll be taken to [Sumo Logic Support](https://support.sumologic.com/). Log in with your account and you can access resources including Sumo Logic announcements, release notes, Knowledge Base articles, and more. You can also access the Sumo Logic Community in order to ask questions of fellow users.

:::sumo
For Sumo Logic terms and conditions, see https://www.sumologic.com/support-terms.
:::

Depending on your account type, you can also log a ticket with our support engineers.

<Iframe url="https://www.youtube.com/embed/9tpq1XFhcMU"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />


## Training and Certification

Sumo Logic provides free training. With our Self-Paced program, you can take Sumo Logic courses at your own pace, anywhere, without time constraints. For more information, see:
* [Training and Certification](/docs/get-started/training-certification-faq)
* [Upcoming training classes](https://www.sumologic.com/training/)

## Community

Want to collaborate with other Sumo Logic users for tips and tricks and help with issues? Go to **Help** > **Community** and visit the Sumo Dojo, the online community for users of Sumo Logic and aficionados of analytics.

You can also search for and request features, comment, and vote on issues that are important to you.

See the [Sumo Logic Community](https://community.sumologic.com) for more information.

![Help - Community2.png](/img/get-started/Help-Community.png)


## Privacy Policy

Use the **Help** > **Privacy Policy** link to get instant access to the Sumo Logic privacy statement, which describes how Sumo Logic collects and uses the personal information you provide on our website and our Services. It also describes the choices available to you regarding our use of your personal information and how you can access and update this information.

## Release Notes

Use the **Help** > **Release Notes** link to get instant access to the latest information on what's changed in Sumo Logic software.

## Shortcuts

See [Keyboard Shortcuts](/docs/get-started/keyboard-shortcuts).


## Service Status

To view the status of the Sumo Logic service, find information on any outages, and see Scheduled Maintenance for your deployment, go to **Help** > **Service Status**. Alternatively, you can go directly to [status.sumologic.com](http://status.sumologic.com).

If there has been an outage on your [deployment](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) (or pod), the Service Status Indicator displays:

1. At the top of the **Help** menu.
1. Next to **Help** > **Service Status**.
1. Next to the title of a [Dashboard](../dashboards/about.md).

For more information, click **Help > Service Status**. This will take you to a web page for your pod with details on any outages, incidents, or planned maintenance.

The Service Status Indicator on the Help menu shows the severity of the outage.

| Icon | Status |
| :-- | :-- |
| NONE | **None.** All systems operational. |
| ![](/img/reuse/outage_critical.png) | **Critical.** Major system outage. |
| ![](/img/reuse/outage_major.png) | **Major.** Partial system outage.  |
| ![](/img/reuse/outage_minor.png) | **Minor.** Minor system outage. |

To determine which pod your account uses, look at the Sumo Logic URL. If you see `us2`, that means you're running on the US2 pod. If you see `eu` or `au`, you're on one of those pods.
