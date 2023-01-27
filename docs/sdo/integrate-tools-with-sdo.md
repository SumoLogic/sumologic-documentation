---
id: integrate-tools-with-sdo
title: Integrate Other DevOps Tools with SDO (Optional)
sidebar_label: Integrating Other Tools
description: Learn how to integrate other tools with the Software Development Optimization Solution.
---

If your DevOps pipeline has tools which are not supported at present by the Software Development Optimization (SDO) Solution, you can still integrate it and map log events to the predefined schema model. 

## Extending the current schema beyond the supported toolset OOTB toolset/FERs

If your DevOps pipeline has tools that are not supported by the SDO out-of-the-box toolset, you can integrate your tool and map it to the relevant schema model. 

For example, if you were to integrate Azure DevOps, which provides developer services to support teams to plan work, collaborate on code development, and build and deploy applications, with the SDO solution, you would first:

1. Install the SDO solution as documented [here](install-sdo-app-view-dashboards.md).
1. Add SDO field extraction rules to map events from your tool to the SDO event schema.

For example, if you were to map an Azure DevOps Pull Request Event to an SDO Pull Request Event Schema, you would create a new FER, and extract and map fields to the [pull request schema](supported-tools-schema.md). You can use the parse expressions defined to support out-of-the-box tools in [this JSON file](https://github.com/SumoLogic/sumologic-solution-templates/blob/master/software-development-optimization-terraform/sdo_app_artifacts/sdo_fer.json).

Refer to the Sumo Logic Community Repo to make use of [community developed FERs](https://github.com/SumoLogic/sumologic-content/tree/master/Software-Development-Optimization).

```sql
json field=_raw "eventType"
| where eventType matches "git.pullrequest*"
| json "eventType", "resource.title", "createdDate", "resource.closedDate", "resource.repository.name", "resource.status" , "resource.url", "resource.lastMergeSourceCommit.commitId", "resource.targetRefName", "resource.createdBy.displayName", "resource.repository.project.name", "resource.reviewers[0].displayName" as action, title, dateTime, closeddate ,repository_name,  merge, link, commit_id, target_branch ,user, service, reviewers nodrop
| parseDate(dateTime, "yyyy-MM-dd'T'HH:mm:ss") as dateTime_epoch
| if(action matches "*merged" and merge matches "completed", "merged", if(action matches "*merged" and merge matches "active", "declined", if (action matches "*created", "created", "other"  ))) as status
| if (status="merged", parseDate(closeddate, "yyyy-MM-dd'T'HH:mm:ss") , 000000000 ) as closeddate_epoch
| toLong(closeddate_epoch)
| "pull_request" as event_type
```
