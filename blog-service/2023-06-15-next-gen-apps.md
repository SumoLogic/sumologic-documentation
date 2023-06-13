---
title: June 15, 2023 (Service)
image: https://www.sumologic.com/img/logo.svg
keywords:
  - apps
  - app catalog
  - api
  - api keys
  - release notes
hide_table_of_contents: true
authors:
  - url: https://help.sumologic.com/release-notes-service/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

## New Next-Gen Applications (Apps) ##
In response to many requests for better App management, we are happy to announce the release of our new Next-Gen Apps located within a new section of the Applications Catalog. Sumo Logic's next generation of apps introduce features not previously available within Classic Apps and simplifies the management and maintenance of apps. 

### Key Features ###

* To identify which apps have been installed within your org, Next-Gen app icons will display a badge indicating their installed status. 
* When an update to an installed App becomes available, these new apps will provide a badge noting there is an update available. An upgrade can then be applied with a simple click within the App Catalog.  
* Installed apps can be uninstalled and removed through the App Catalog, making it easy to clean up apps you no longer use.  
* Additional filter options make it easy to find your installed or upgradeable apps. 
* To support the ability to upgrade and to make app content easier to locate, app content will be installed into a shared “Installed Apps” folder of the Library.
* To support the ability to upgrade and to make sure upgrades do not overwrite any customizations you may apply, the content installed by an app is immutable. If you wish to customize the content you will need to first make a custom copy of the content. 
* Role-based access controls, which ensure that only authorized individuals within your organization can install, uninstall, or update apps. To perform these actions you must be a member of the default Administrator role. Sumo Logic will be providing a new “Manage Apps” role capability soon, which can be used to grant these permissions to additonal roles.

While the initial set of new apps is designed to help you get started using the Sumo Logic distribution of the Open Telemetry agent, we haven't forgotten about those who may continue to send data through the Sumo Logic Installed Collector and Hosted Sources. We will be converting all the existing Classic Apps to the next gen framework in the coming months and will continue to provide support for these collection methods. In the meantime, our Classic Apps will remain available to you within the Application Catalog.

Over the coming year Sumo Logic will also be making additional improvements within the Applications Catalog to assist with better search, filtering, upgrade notifications, and management. Please lookout for these future updates. 

### Minor Changes and Enhancements
* [New] When performing create, update, and delete requests through the Sumo Logic APIs the API accessID is now included within the *operator* field of the related [Audit Event Index](docs/manage/security/audit-event-index/) messages.    
