---
id: jenkins-plugin-build-deploy-events
title: Jenkins Plugin - Send Build and Deploy Event to Sumo Logic from Jenkins Pipeline
sidebar_label: Jenkins Plugin
description: Learn how to send build and deploy events to Sumo Logic from Jenkins Pipeline.
---

## Prerequisites

Use the latest [Sumo Logic Jenkins Plugin](https://plugins.jenkins.io/sumologic-publisher/#documentation)
version of the plugin. You will be using [SumoUpload](https://github.com/SumoLogic/sumologic-jenkins-plugin#sumoupload)
function to send an event to Sumo Logic from your DevOps pipeline.

As an example: Upload a Key-Value map as JSON to Sumo Logic.

```json
"script"{
	"deploy_event ="[
		"event_name":"STAGE_NAME",
		"result":"currentBuild.currentResult"
	]
}"SumoUpload(keyValueMap":"deploy_event)"
```

## Add a hook in your DevOps Pipeline to send Deploy and Build Events to Sumo Logic

A Jenkins pipeline needs to be configured and instrumented to send Deploy and Build events from your DevOps pipeline to Sumo Logic.

This section explains how you can configure your pipeline to send Deploy and Build Events to Sumo Logic. These Events will be correlated with other Events such as Pull Request Merge to calculate Lead Time.  

Data Schema of Deploy and Build Events can be described by the following fields:

| Field | Explanation | Required/Optional |
|:--|:--|:--|
| `event_type` | Enum Values: `build`, `deploy`, `test`, `release` | Required |
| `trace_id` | This is the inner join key between deploy/build event and code merge event. It can be commit id. This key will be used to join two events: "Code Merge (PR) and Build" and "Code Merge (PR) and Deploy" | Required |
| `link` | Used so that we can provide links back into this SaaS tool. It can be PR link, Commit Link, Build/Deploy Result Link | Required |
| `DateTime` | Date/Time in epoch milliseconds of an event | Required |
| `environment_name` | Can be `production`, `test`, `pre-prod`, and so on. | Required for Deploy Events |
| `status` | Status of Event. Enum Values: Success, Failure, Unstable, Unknown, Other Values | Required |
commit_id | Required to tie GitHub data to Jenkins data. This is typically set as the merge commit hash or HEAD commit | Required |
| `team` | Optional but highly recommended if you want to slice data by this dimension. Set N/A if not available. | Optional |
| `service` | Optional but highly recommended if you want to slice data by this dimension. Set N/A if not available. | Optional |
| `user` | User. Set N/A if not available. | Optional |
| `title` | Title. It can be a job name, description of pipeline/stage, env. JOB_NAME<br/>Set N/A if not available. | Optional |
| `message` | Any related message. Can be `${env.BUILD_NUMBER}`. Set N/A if not available. | Optional |
| `target_branch` | Optional but highly recommended if you want to slice data by this dimension. Set `N/A` if not available. | Optional |
| `repository_name` | Optional but highly recommended if you want to slice data by this dimension. Set `N/A` if not available. | Optional |

## Method

1. Define a wrapper function that calls `SumoUpload()` in your common library.
  ```json
  def sendDeliveryEvent(Map args) {
    def deliveryEvent = [
      "event_type": args.eventType,
      "trace_id": args.traceId,     
      "service": args.service,
      "team": (args.team ?: "n/a"),
      "user": (args.user ?: "n/a"),
      "link": env.BUILD_URL,
      "title": env.JOB_NAME,
      "timeStamp": currentBuild.startTimeInMillis,
      "message": "Build # ${env.BUILD_NUMBER}",
      "env_name": (args.envName ?: "n/a"),
      "result": currentBuild.currentResult ?: "unknown",
      "git_url": (args.gitUrl ?: "n/a"),
      "target_branch": (args.targetBranch ?: "n/a"),
      "repository_name": (args.repositoryName ?: "n/a"),
      "commit_id": (args.commitId ?: "n/a")
    ]
    SumoUpload(keyValueMap: deliveryEvent)
  }
  ```
1. Next, call the wrapper function from your pipeline in [Post Always script](https://www.jenkins.io/doc/book/pipeline/syntax/#post) after Deploy and Build Stages.
  ```json title="For Deploy Event"
  post{
    changed{
      script{
        if(!testMode&¤tBuild.result!="NOT_BUILT"){
          if(env.CONFIGURED_MAJOR_VERSION=='21.0'){
            sendEmail()
          }sendSlack()
        }
      }
    }always{
      script{
      {
          deliveryPerformance.sendDeliveryEvent(eventType: "deploy",
          traceId: env.GIT_COMMIT_ID,
          envName: env.DEPLOYMENT,
          service: env.AGR,
          team: env.TEAM,
          serviceVersion: env.VERSION,
          repository_name: "Sanyaku/sumologic")
        }
      }
    }
  }
  }
  ```

  ```json title="For Build Event"
  post{
    changed{
      script{
        if(!testMode&¤tBuild.result!="NOT_BUILT"){
          if(env.CONFIGURED_MAJOR_VERSION=='21.0'){
            sendEmail()
          }sendSlack()
        }
      }
    }always{
      script{
      {
          deliveryPerformance.sendDeliveryEvent(eventType: "build",
          traceId: env.GIT_COMMIT_ID,
          envName: “n/a”,
          service: env.AGR,
          team: env.TEAM,
          repository_name: "Sanyaku/sumologic")
        }
      }
    }
  }
  }
  ```

## Sample Payload

Once you configure your DevOps pipeline to send Build and Deploy Events to Sumo Logic. The payload of events will look something like this:

### build Event

```json
{
	"event_type":"build",
	"trace_id":"11ab83527ec2f318f8d229f1934f2a1913f6526e",
	"service":"core-platform",
	"team":"db-dev",
	"user":"alan",
	"link":"https://github.com/kubernetes/kubernetes/pull/94109",
	"title":"build # 6881",
	"timeStamp":1599863647237,
	"message":"Building artifacts... it may take few minutes. build # 6881",
	"env_name":"n/a",
	"result":"Failed",
	"target_branch":"test-master",
	"repository_name":"bluechip-backend",
	"commit_id":"11ab83527ec2f318f8d229f1934f2a1913f6526e"
}
```

### deploy Event

```json
{
	"event_type":"Deploy",
	"trace_id":"2e1306628215f083e4613a7f66b938d830296f56",
	"service":"core-platform",
	"team":"core-platform",
	"user":"alex",
	"link":"https://github.com/SumoLogic/sumolog...ction/pull/836",
	"title":"deployment # 6899",
	"timeStamp":1599863623591,
	"message":"deploying to...GCP deployment # 6899",
	"env_name":"test",
	"result":"Failed",
	"target_branch":"pre-prod-master",
	"repository_name":"bluechip-backend",
	"commit_id":"2e1306628215f083e4613a7f66b938d830296f56"
}
```

## Example

This is a very basic Jenkins pipeline code which sends a deploy event to Sumo Logic using Sumo Logic Jenkins Plugin.

In this example, we'll create a map `deploy_event` with a key-value pair of all fields (as explained in the above table), and using `SumoUpload()` to send that map to Sumo Logic as a json payload.

```
pipeline {
   agent any
  environment {

      GIT_COMMIT_REV=""
      ENV_NAME="production"
      GIT_REPO_NAME=""
      GIT_URL=""

  }
   tools {
      maven "M3"
   }
   stages {
      stage('Build') {
         steps {
              script {
                  git 'https://github.com/jglick/simple-maven-project-with-tests.git'
                  //setting uo env variables
                  GIT_COMMIT_REV = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()
                  GIT_URL = sh(returnStdout: true, script: 'git config remote.origin.url').trim()
                  sh "mvn -Dmaven.test.failure.ignore=true clean package"
             }
         }
         post {
            success {
               junit '**/target/surefire-reports/TEST-*.xml'
               archiveArtifacts 'target/*.jar'
            }
         }
      }
      stage('Deploy') {
          steps{
              sh 'ls "$JENKINS_HOME/jobs/$JOB_NAME/builds/$BUILD_NUMBER/archive"'
              echo "Deploying to Production"
          }
          post{
              always{
                 script{
                      deploy_event = [
                        event_type: "deplpoy"
                        service:  env.AGR,
                        team: env.TEAM,
                        user: "ankit-goel"
                        link: env.BUILD_URL,
                        title: env.JOB_NAME,
                        message: "Build # ${env.BUILD_NUMBER}",
                        timeStamp: currentBuild.startTimeInMillis,
                        status: currentBuild.currentResult,
                        target_branch:env.targetBranch
                        commit_id: GIT_COMMIT_REV,
                        env_name: ENV_NAME,
                        git_url: GIT_URL,
                        repository_name: "SumoLogic",
                        commit_id: env.commit_id
                    ]
                  }
                  SumoUpload(keyValueMap: deploy_event)
              }
          }
      }
   }
}
```
