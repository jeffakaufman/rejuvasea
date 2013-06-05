#Make sure you run npm install before tyring this out #

### Config.ini ###
This file stores basic config info for the app, like db settings, and s3 settings.

### S3 ###
Images are uploaded to S3 bucket "rejuvdev" with public read permissions

###  Flow ###
* User pics an image or drag and image
* User fills the form
* User clicks the add button
* The file will be uploaded to S3 first, then server will return the S3 file URL
* The Books collection gets called on upload success to save a new book with the "coverImage" field populated with the
url of the file uploaded to S3
