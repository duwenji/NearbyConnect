## Usage

### Deployment

In order to deploy the frontend application, you need to run the following command:

```
serverless client deploy
```

After running deploy, you should see output similar to:

This deployment will:
- Upload all files from 'build' to bucket 'near-by-connect-frontend-packet'
- Set (and overwrite) bucket 'near-by-connect-frontend-packet' configuration
- Set (and overwrite) bucket 'near-by-connect-frontend-packet' bucket policy
- Set (and overwrite) bucket 'near-by-connect-frontend-packet' CORS policy
? Do you want to proceed? Yes
Looking for bucket...
Bucket found...
Deleting all objects from bucket...
Configuring bucket...
Configuring policy for bucket...
Retaining existing tags...
Configuring CORS for bucket...
Uploading client files to bucket...
Success! Your site should be available at http://near-by-connect-frontend-packet.s3-website-ap-northeast-1.amazonaws.com/
```

```

