---
title: Zoom
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/zoom.png)

Version: 2.1  
Updated: Jun 22, 2023

Monitor and respond to incidents involving Zoom video conferencing.

## Actions

* **Delete Meeting** (Containment) - Delete an existing meeting
* **Get Meeting Invitation** *(Enrichment)* - Retrieve the meeting invite note that was sent for a specific meeting
* **Get User** *(Enrichment)* - Retrieve user's information on a Zoom account
* **Get User Settings** *(Enrichment)* - Retrieve a user's settings
* **List Meetings** *(Enrichment)* - Retrieve a user's (meeting host) scheduled meetings
* **List Users** *(Enrichment)* - List the account's users
* **Update Meeting** *(Containment)* - Update details of a meeting
* **Update User** *(Containment)* - Update a user's Zoom profile information
* **Update User Settings** *(Containment)* - Update a user's settings

## Zoom configuration

The Zoom API uses OAuth 2.0 to authenticate and authorize users to make requests. To set up access credentials and request scopes for your app, create a Server-to-Server OAuth app. This will enable you to securely integrate with Zoom APIs and get your account owner access token without user interaction.

**Create a Server-to-Server OAuth app**

Please follow these steps to create a Server-to-Server OAuth app:

1. Sign in to Zoom Marketplace : <https://marketplace.zoom.us/>. From the Develop menu, choose Build App.
2. Choose the Server-to-Server OAuth app type.   
  
![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-2.png)
3. Add a name for your app.   
  
![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-3.png)
4. App credentials - View your Account ID, Client ID and Client Secret.   
  
![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-4.png)
5. Information - Add information about your app, such as a short description and developer contact information (name and email address is required for activation).
6. Define the API methods this app is allowed to call - Add Scopes.   
  
![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-5.png)   
  
Choose the appropriate scopes according to the scope required by each Zoom action:   

	* Delete Meeting - meeting:write:admin, meeting:write
	* Get Meeting Invitation - meeting:read:admin, meeting:read
	* Get User - user:read:admin, user:read, user\_info:read
	* Get User Settings - user:read:admin, user:read
	* List Meetings - meeting:read:admin, meeting:read
	* List Users - user:read:admin
	* Update Meeting - meeting:write:admin, meeting:write
	* Update User - user:write:admin, user:write
	* Update User Settings - user:write:admin, user:write
7. Activate your app. If you see errors that prevent activation, please address them. You will not be able to generate an access token to make API calls unless your app is activated. If your app is deactivated, existing tokens will no longer work. You can also choose to Deactivate your app in this section.   
  
![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-6.png)

The optional parameter timezone in the actions Update Meeting and Update User can be chosen form the table Timezones in the following [Abbreviation Lists](https://marketplace.zoom.us/docs/api-reference/other-references/abbreviation-lists/#timezones).

## Zoom in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-7.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-8.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-9.png)

Populate all the required fields (\*)

* Label: The resource name
* OAuth Token URL: The default OAuth Token url is <https://zoom.us/>
* Api URL: The default API url is <https://api.zoom.us/>
* Client ID: Your Client ID for your application listed on <https://marketplace.zoom.us/user/build>
* Client Secret: Your Client Secret for your application listed on <https://marketplace.zoom.us/user/build>
* Account ID: Your Account ID for your application listed on <https://marketplace.zoom.us/user/build>

Click Save.

![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-10.png)

Click Test.

![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-11.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/zoom/zoom-12.png)

## Category

Messaging

## Change Log

* May 15, 2020 - First upload
* September 30, 2022
	+ Modified authentication method to OAuth 2.0
	+ Modified Actions:
		- Delete Meeting
		- Get Meeting Invitation
		- Get User
		- Get User Settings
		- List Meetings
		- List Users
		- Update Meeting
		- Update User
		- Update User Settings
* June 22, 2023 (v1.1) - Updated the integration with Environmental Variables
