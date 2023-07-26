---
id: global-intelligence-security-insights
title: Global Intelligence for Security Insights
description: Insight Confidence scores, predicted by Sumo Logic’s Global Intelligence machine learning model, help you triage and prioritize Insights.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page describes Global Intelligence for Security Insights, implemented in CSE as Global Confidence scores. This feature helps security analysts triage and prioritize Insights.

Watch this micro lesson to learn more about Global Intelligence for Insights.

<Iframe url="https://www.youtube.com/embed/toAvKsfVbHc?rel=0"
     width="854px"
     height="480px"
     id="myId"
     className="video-container"
     display="initial"
     position="relative"
     allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
     allowfullscreen
     />

import Iframe from 'react-iframe';

## What is a Global Confidence score?
An Insight’s Global Confidence score represents a level of confidence, predicted by Sumo Logic’s Global Intelligence machine learning model, that the Insight is actionable. 

<img src={useBaseUrl('img/cse/closeup.png')} alt="Global confidence score example" width="400"/>

The score is generated based on the underlying pattern of Signals in an Insight. The model compares this pattern to previously observed patterns from Insights that were closed with either a **False Positive** or **Resolved** resolution. The model does such comparisons broadly—across the global installed base of Cloud SIEM Enterprise customers—so it can generate a Confidence score based on the patterns seen at one customer when encountered at another. In addition to leveraging the patterns discovered across the CSE installed base, the model customizes scores for Insights in your account based on your customized content, including tuned and custom rules.

:::tip Fear not
All information used by the model is anonymized and no customer-confidential information is processed or retained.
:::


The score is on a scale of 0 to 100. A higher score indicates higher confidence that the Insight is actionable. If the model does not have enough information, it will not make a prediction and no score will be listed (you’ll see either “No prediction” or “N/A”).

## Prerequisites for using Global Confidence scores
The only prerequisite for taking full advantage of Confidence scores is to make sure your content is available to Sumo Logic’s machine learning model. If you don't close Insights with an appropriate resolution, the model won’t be able to consider your content and may not be able to generate Global Confidence scores for your Insights. To take full advantage of this feature, make sure you close your Insights as False Positive or Resolved.

## Using Global Confidence scores
The Global Confidence score is a valuable data point to consider when prioritizing which Insights to triage first.

An Insight’s Confidence score is shown for each Insight on the Insights list page. You can sort the Insight list by the Global Confidence score, as well as by Severity.

<img src={useBaseUrl('img/cse/Confidence-Screenshot.png')} alt="Global confidence screen image example" width="800"/>
 
