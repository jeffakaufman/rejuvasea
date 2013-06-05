var fs = require('fs');
var uuid = require('node-uuid');

exports.use = function(app, s3Client) {
	app.post("/upload", function(request, response) {
		//console.log(request.files);
		var uploadedFiled = request.files.coverImage;
		// Set S3 headers from the uploaded file info
		var headers = {
			'Content-Length': uploadedFiled.size,
			'Content-Type': uploadedFiled.type,
			'x-amz-acl': 'public-read'
		};

		// Get a stream of the uploaded file
		var stream = fs.createReadStream(uploadedFiled.path);

		// Create a UUID file name for the image
		var imageId = uuid.v1();

		// Finally save the file to S3
		s3Client.putStream(stream, '/' + imageId, headers, function(err, res) {
			if (!err) {
				//console.log(res.req.url);
				result = {
					name: uploadedFiled.name,
					type: uploadedFiled.type,
					size: uploadedFiled.size,
					url: res.req.url
				}
				response.json(result);
			} else {
				console.log(err);
				response.send(500);
			}
		});
	})
}