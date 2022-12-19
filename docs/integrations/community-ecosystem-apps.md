---
id: community-ecosystem-apps
title: Community Ecosystem Apps
description: Community Ecosystem Apps Listing and program desription
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Community Content Catalog
<img src={useBaseUrl('img/icons/general/community.png')} alt="Thumbnail icon" width="100"/>

Sumo Logic Community Ecosystem Apps are provided and supported by our internal and external user and creator community. The following links provide collection, installation, and dashboard information on working with these apps. Generally these apps should be viewed as open source content, and we strive to ensure that they are proactively reviewed by our community to ensure usability, use case coverage, and technical quality. More information on this initiative and how to contribute can be found [here](#faq)


...


## FAQ

Sumo Logic Community Ecosystem Apps are provided and supported by our internal and external user and creator community. Generally these apps should be viewed as open source content, and we strive to ensure that they are proactively reviewed by our community to ensure usability, use case coverage, and technical quality. Please check below to see if your question is answered and reach out to TBD if you have a question not covered here.

**Q: **What is this?

**A: **A central place to list community content from the internal and external Sumo Community to enable more rapid time to value for customers.

…

[PLEASE POST ANY QUESTIONS YOU HAVE!]

[And answers if you have them]

**Q: **How do I add a review/rating to an App?

**A:** Open the folder of the App you want to review. Select the ratings.txt file. Select Edit (pen icon). Add a new line and paste in your ratings/comments using the schema below. Select _Propose New Changes_, with message stating “Adding a Review”. Submit Pull Request. Owners will review and post/merge your rating to the repo. 


```json
{reviewer:"[githubid/name]"
,ratings: {overall:4
          ,use-case:5
          ,design:4
          ,technical:4}
,review:"This app is very useful for knowing x, y, and z. It would be great if the dashboards were broken out by use case instead of being one big dashboard."
}
```