# s3-bucket

1) set up the s3 bucket
2) create the permission for the bucket, bucket-name>permission
3) create the IAM role and give the custom permission
4) link the IAM role to the s3 in the bucket policy
//here only the putObject rule is allowed
//different actions includes different conditions.
example s3:x-amz-acl doesn't supports bucket-level actions such as s3:PutBucket, s3:GetObject, s3:PutObjectAcl, s3:GetBucketLocation.
test1 is the name of the 
arn:aws:iam::774128487687:role/test1 can be found in the IAM section after role creation
arn:aws:s3:::nirajannirajan can be found in the s3 section after the bucket creation
/role/ is meant to be added between the name of the bucket and the name of role.
<br> <br>
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowCRUDForUploader",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::774128487687:role/test1"
            },
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::nirajannirajan/role/test1/*",
            "Condition": {
                "StringEquals": {
                    "s3:x-amz-acl": "bucket-owner-full-control"
                }
            }
        }
    ]
}

5) now the environment is setup, now, go through  the repo. clone it and run.
Now the files can be pushed to the s3 bucket from the application.


As the newer version of the aws package is also available, note:this is the previous one.
