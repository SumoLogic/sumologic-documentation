---
title: January 19, 2023 Application Update
hide_table_of_contents: false
keywords:
  - sumo logic
  - service release notes
  - cloud siem
  - cse
tags: [cloud siem release notes, application update]
authors:
  - name: Peter Kazmir
    title: Principal Product Manager, Security Applications
    url: https://github.com/pkazmir-sumo
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Minor Changes and Enhancements

* [Updated] On the HUD, the Insight Activity widget has been updated. When selecting the Insight to display, the HUD will now choose based on this order of preference: In “New”, Unassigned, Highest GIS Confidence Score, Highest Severity, Newest. In addition, the design has been updated to improve readability.
* [New] Users who wish to substitute custom Insight status(es) for the built-in “In Progress” status can now do so. After creating and organizing the custom statu(es), the user can now disable the “In Progress” status. (It cannot be deleted.) Note that it can be disabled only if there are no Insights currently set to “In Progress.”
* Changes to Entity tags and criticality now appear in the Entity’s change history list.
* The Sumo Terraform provider now includes support for custom columns in match lists.
* Kubernetes (k8s) attribute fields are now normalized to include the namespace. The normalized fields are: `normalizedPodName`, `normalizedDeploymentName`, and `normalizedReplicaSetName`.

### Resolved Issues

* Some Insights could not be closed via the UI (though they could via API). 
* In the consolidated (parent/child) Insight view, in “Board” mode, scrolling was not working properly. In addition, links to other orgs had an error in the URL (a duplicate “/sec”).
