---
id: link-dashboard-to-explore
---

# Link a dashboard to Explore

Stack linking connects Dashboard (New) to Explore so you can view dashboards when exploring infrastructure components.

You link a Dashboard (New) to your stack in Explore by specifying metadata key-value pairs:

* Key - Metadata field name, this is collected from your data and is usually an entity or component name.
* Value(s) - The values of the entity or component.

The metadata keys assigned to your Dashboard (New) Stack Linking must be the same as the explored component for the dashboard to show as an option. For example, if your component is named `tablename`, and has `account`, `region`, and `namespace` metadata assigned to it, as seen in the following Explore screenshot:

![stack linking keys.png](/img/dashboards-new/link-dashboard-explore/stack-linking-keys.png)

The keys assigned to the Dashboard (New) Stack Linking would need to include those, for example:

![dashboard new stack link keys.png](/img/dashboards-new/link-dashboard-explore/dashboard-new-stack-link-keys.png)

To link a custom Dashboard (New) to your stack in Explore, do the following:

1. From your custom dashboard, click the three-dot icon in the upper right corner of the window and select **Create Stack Linking** from the drop-down menu.

    ![Create Stack Linking option from Dashboard New.png](/img/dashboards-new/link-dashboard-explore/Create-Stack-Linking-option-from-Dashboard-New.png)

1. In the **Dashboard Stack Linking** dialog, set the **Domain** you want the key available in.
1. Enter a **Key** that describes the dashboard.
1. Next enter **Value(s)**, the component to which the dashboard will be linked in the Explore hierarchy.

    ![dashboard stack linking august 2021.png](/img/dashboards-new/link-dashboard-explore/dashboard-stack-linking-august-2021.png) 

1. You can add more key-value pairs by clicking the **Add Link** link.
1. The checkbox to **Set as default dashboard for this entity in** a hierarchy is available to set when you have defined a specific **Domain**. When set, you can limit the scope to a subset     of hierarchies using the dropdown labelled **No matching hierarchies**.
1. Click **Apply** to apply the stack link.
1. Now when you navigate in Explore to an entity or component with matching key-value pairs you will have the option to view your Dashboard (New) in Explore.  
     

## View linked dashboards

In Explore, when navigating to components you will have the option to select other dashboards that were linked. 

From the **Dashboards** drop-down menu, select the name of the linked dashboard to load it in Explore. When hovering over available dashboards the tooltip provides the location and creator so it is easier to identify.

![explore with location tooltip.png](/img/dashboards-new/link-dashboard-explore/explore-with-location-tooltip.png)
