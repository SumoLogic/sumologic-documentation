---
id: best-practices-source-categories
---

# Best Practices: Good and Bad Source Category

Setting Source Category values (\_sourceCategory), especially for a small set of Sources, may seem trivial at first. However, using the [proper naming convention](../Sources/04Reference-Information-for-Sources/Metadata-Naming-Conventions.md "Metadata Naming Conventions") to create good Source Category values is important for the correct scale and performance of your Sumo Logic deployment in the long term. This topic discusses some best practices around creating good Source Category values.

Source Categories help you:

* Define the scope of searches.
* Index and partition your data.
* Control who sees what data through RBAC.

The recommended \_sourceCategory naming convention is:

* **component1/component2/component3...**

Begin with the least descriptive, highest-level grouping, and get more descriptive with each component. The full value will describe the subset of data in detail.

For example, assume you have several different Firewall appliances: ASA and FWSM from Cisco, and 7050 from Palo Alto Networks. In addition, you also have a Cisco router, 800 series.

Following the naming convention described previously, you could set the following \_sourceCategory values (instead of simply using “FWSM”, “ASA”, etc.):

* Networking/Firewall/Cisco/FWSM  
* Networking/Firewall/Cisco/ASA  
* Networking/Firewall/PAN/7050  
* Networking/Router/Cisco/800

While the components at the beginning of the value do not add any obvious value, they do provide a high-level grouping of this data. This allows us to fulfill the three purposes of Source Categories.

<Iframe url="https://www.youtube.com/embed/vkKeJOBVVjk"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"      allowfullscreen
     />

import Iframe from 'react-iframe';

## Define the Scope of Searches

Using the naming convention described here lets you easily and effectively define the scope of your search.

For example, if you use either \_sourceCategory value:

* `_sourceCategory=Networking/Firewall/*` (all firewall data)  
* `_sourceCategory=Networking/*/Cisco/*` (all Cisco data)

With wildcards, you can find the subset of data you need without adding any Boolean logic (OR).

## Index and Partition Your Data

To create a separate Partition for your networking data to improve performance, specify a Partition using the following routing expression:

* `_sourceCategory=Networking*`

Because Partitions cannot be modified after they are created, (they can only be decommissioned and recreated with a new name and/or routing expression), make sure that you will not have to modify them all that often.

## Control Who Sees What Data Through RBAC

Similar to using Indexes, if you want to restrict access to this data set, you can now use high-level values to reduce the amount of management as you add more data.

You can build high-level groupings with a variety of items. For example, you can group by environment details (prod vs. dev), geographical information (east vs. west), by application, by business unit, or any other value that makes sense for your data.

The order in which you use these values is determined by how you search the data.

For example, if most of your use cases do not need data from both prod and dev environments, you could use the following \_sourceCategory values:

* Prod/Web/Apache/Access  
* Dev/Web/Apache/Access  
* Prod/DB/MySQL/Error 
* Dev/DB/MySQL/Error

You can still search across both prod and dev when needed, but this scheme divides all your data into prod and dev more intuitively.

If, on the other hand, you do need to search this data together frequently, you could use:

* Web/Apache/Access/Prod  
* Web/Apache/Access/Dev  
* DB/MySQL/Error/Prod  
* DB/MySQL/Error/Dev

This simple change completely changes your high-level grouping. Both schemes allow you cover both use cases in a simple way. The important thing is to group your data in a way that feels natural to the way users search for data.  
