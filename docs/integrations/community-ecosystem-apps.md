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

:::caution Under construction
&#128679; This doc is under construction &#128679;
:::

<img src={useBaseUrl('img/icons/general/community.png')} alt="Thumbnail icon" width="60"/>

Sumo Logic Community Ecosystem Apps are provided and supported by our internal and external users and creator community.

The following links provide collection, installation, and dashboard information on working with these apps. Generally, these apps should be viewed as open source content, and we strive to ensure that they are proactively reviewed by our community to ensure usability, use case coverage, and technical quality.

More information on this initiative and how to contribute can be found [here](#faq).

## Community Content App Catalog

[Add info and screenshots showing how to find Community apps]


## FAQ

Sumo Logic Community Ecosystem Apps are provided and supported by our internal and external user and creator community. Generally these apps should be viewed as open source content, and we strive to ensure that they are proactively reviewed by our community to ensure usability, use case coverage, and technical quality. If you have a question not covered here, please reach out to **TBD**.

### What is this?
A central place to list community content from the internal and external Sumo Community to enable more rapid time to value for customers.

### How do I add a review/rating to an app?

1. Open the folder of the App you want to review
1. Select the ratings.txt file.
1. Select **Edit** (pen icon).
1. Add a new line and paste in your ratings/comments using the schema below.
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
1. Select **Propose New Changes**, with a message stating `“Adding a Review”`.
1. Submit Pull Request.

Code owners will review and merge your rating to our repo.
