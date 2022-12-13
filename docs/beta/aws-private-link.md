
<p style="color: red; font-weight: bold">>>>>>  gd2md-html alert:  ERRORs: 6; WARNINGs: 0; ALERTS: 6.</p>
<ul style="color: red; font-weight: bold"><li>See top comment block for details on ERRORs and WARNINGs. <li>In the converted Markdown or HTML, search for inline alerts that start with >>>>>  gd2md-html alert:  for specific instances that need correction.</ul>

<p style="color: red; font-weight: bold">Links to alert messages:</p><a href="#gdcalert1">alert1</a>
<a href="#gdcalert2">alert2</a>
<a href="#gdcalert3">alert3</a>
<a href="#gdcalert4">alert4</a>
<a href="#gdcalert5">alert5</a>
<a href="#gdcalert6">alert6</a>

<p style="color: red; font-weight: bold">>>>>> PLEASE check and correct alert issues and delete this message and the inline alerts.<hr></p>



#Connect to Sumo Logic over AWS PrivateLink

This feature is in Beta. To participate contact your Sumo account executive.

[AWS PrivateLink](https://aws.amazon.com/privatelink/) provides private connectivity between VPCs, AWS services, and your on-premises networks, without exposing your traffic to the public internet.

To send data to Sumo Logic through AWS PrivateLink you'll need to configure an internal endpoint in your VPC for Installed Collectors to send data to.


### **Enable PrivateLink for ALB**

With the NLB created and ALB registered as a target, requests over AWS PrivateLink to the NLB are forwarded to the ALB.

Sumo Logic exposes AWS PrivateLink endpoints to different regions that depend on your Sumo Logic deployment. If you're using the VPC in a different region you need to set up VPC peering. Either way, you need to create an endpoint.


#### **Create an endpoint to connect with the Sumo Logic endpoint service**



* The service name is provided by Sumo Logic and will accept the endpoint connection request once we know you initiated the connection.
* Select the VPC where the Sumo Logic collector will be installed or where HTTP requests will be made for HTTP Sources. \


<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: error handling inline image </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>




##### **No VPC Peering**

If the VPC is in the same AWS region as your deployment you don't need to set up VPC peering. Navigate to **Actions**, then select **Modify private DNS name**.

<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: error handling inline image </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


Check the box to enable private DNS names.


<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: error handling inline image </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


##### **VPC Peering**

If the VPC is not in the same AWS region as your deployment you need to [set up VPC peering](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-peering.html).


1. Create the VPC peering connection between the region for the client-side VPC and the region where the Sumo Logic PrivateLink service is configured. 

1. Create a Route53 private hosted zone. Select the VPC peered in the region where our server-side region is located. 

1. With the created private hosted zone, add an **A** record. Select the peered VPC in region **us-west-2**, where the Sumo Logic server-side infrastructure is located. 


<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: error handling inline image </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


4. Add the other peered VPC in the other region into the Route53 hosted zone.

