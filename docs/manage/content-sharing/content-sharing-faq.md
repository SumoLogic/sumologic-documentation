---
id: content-sharing-faq
title: Content Sharing FAQ
sidebar_label: FAQ
description: This FAQ answers your basic questions around content sharing.
---

Welcome to Content Sharing. We've provided this FAQ to answer your basic questions around the interface changes that come with Content Sharing.

## When I share something with someone, how will they see it?

When you share something directly with a user (or to their role) they will receive an email notification that they can click on to guide them to the item in Sumo.

* The object will also be available in their Library view.
* They can also toggle to the **Recently Shared with Me** section in the **Recents** tab on the left-nav to see what has been recently shared.

    ![image1.gif](/img/content-sharing/recent-shared.gif)

* The share dialog associated with the item will reflect who the item is shared with and what level of access they have.

## Can I delete someone else's alerts?

Yes, IF you have Edit permissions on that shared search. You need Edit permissions at a minimum on the shared search to make any changes to the associated alert. For details, see [Changing Alerts](changing-alerts.md).

## I shared something with my coworker but they can’t see it in their Library view?

It is possible that you shared an item that is nested within a folder. The Library view is designed to roll-up to the highest level parent folder. Have them check their **Recently Shared with Me** dialog. Or, send your co-worker the name of the item and they can also search for it in the Library.

## Can shared dashboards always run with viewer's role search filter instead of the creator's role search filter?

Yes, for an individual dashboard, when you share the dashboard you can choose to share it with the "Viewer’s data access level", so that
viewers will see it with their own role search filter. For more information, see [Set the Data Access Level for a Dashboard](/docs/dashboards-classic/get-started/set-data-access-level-dashboard.md). In addition, it is possible to set a security policy that ensures that all new dashboards will run with the viewer’s role search filter when shared. For more information, see [Data Access Level for Shared Dashboards](../security/data-access-level-shared-dashboards.md). 

## Can I share a folder with someone?

Yes, you can share a folder you manage with anyone or any role in your Org. Keep in mind that when you share a folder, that person will have access to all items within that folder as well as any nested sub-folders. Try to limit sharing at the folder level and grant permissions to sub-folders or individual items.

## What if I shared a folder with someone with edit access but then gave them view access on a specific dashboard in that folder?

We also allow the most permissive set of permissions. In this case, the highest permission the user has on the dashboard is edit - so that’s how they can access it.

## Can I share a folder with a role with edit permissions the limit items in folder from editing?

No. We do not support the concept of negative permissions. Users will always get the highest level of permissions available to them on an
item.

We recommend a strategy of providing the lowest level of access (view) to the broad group of users and limiting higher level of access to only a trusted few.

## Can I control what objects a specific role can access using the Roles page?

No. Access control is managed at the object level, in the Library.

## I want to create a hierarchy of folders for my company so that each team knows exactly where to put their content. How can I do this?

This can be achieved by a feature available to administrators called
**Admin View**. Users who are in a role that has the capability Manage
Content set, can see this view.

* When in this view, Administrators have manage access on all objects in the org.
* They also have access to a special folder called **Admin Recommended**. Anything that is placed in this folder and shared out to a user or role, is displayed at the top of the library, in the Admin recommended section.
* Administrators can create a folder hierarchy within this view and share it out to the org with view permissions. Certain roles can have edit or manage access to the folder that is specific to the team, so they can move their content in.

## What is this Data Access setting that pops up whenever I try to edit a dashboard?

Dashboards run with the data access level of a particular user. We wanted to prevent users from making edits to a dashboard that would enable them to see more data than they were allowed to. When a user attempts to edit a query, we compare the editor’s data access to the current Run-as user of the dashboard. If the access level is lower, we ask the editor to change the Run-as user to themselves before they can save their change.

## I'm an Admin, how do I monitor content sharing activity in my org?

All permission updates, move, copy and delete actions in the content library are audited. All actions performed by the user while in Admin
mode are also audited. The [Audit App](/docs/integrations/sumo-apps/audit) has been updated with several new dashboards that visualize this activity for you.
