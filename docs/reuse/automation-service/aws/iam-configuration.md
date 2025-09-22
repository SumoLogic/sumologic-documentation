To enable AWS IAM role-based authentication without sharing access keys and secrets, follow the steps below:
1. [Create an IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html) in your AWS account. Follow AWS’s guide to create a new IAM role.
2. [Attach required policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-attach-detach.html) to the role depending on the AWS services you want to allow access to (for example, `AmazonEC2ReadOnlyAccess`, `AWSWAFFullAccess`, etc.).
3. [Update the trust policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-custom.html) to allow Sumo Logic’s AWS account to assume this role. This involves editing the trust relationship JSON to include Sumo Logic’s AWS account ID as a trusted principal.
   Example trust policy:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "AWS": "arn:aws:iam::926226587429:root"
         },
         "Action": "sts:AssumeRole"
       }
     ]
   }
   ```
