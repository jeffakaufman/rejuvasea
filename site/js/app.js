var app = app || {};

$(function() {
	$('#releaseDate').datepicker();
	$('#coverImage').fileupload({
		fileInput: '#coverImage',
		dropZone: "#picture",
		dataType: 'json',
		url: '/upload',
		replaceFileInput: false,
		drop: function(e, data) {
			console.log(data);
			if (data && data.files && data.files > 0) {
				$('#coverImage').text(data.files[0]);
			}
		},
		change: function(e, data) {
			if (data && data.files && data.files.length > 0) {
				libView.previewSelectedFile(data.files[0]);
			}
		},
		done: function(e, data) {
			//console.log(data);
			// do the saving logic of the model
			libView.saveNewBook(data.result.url);
			$('#progress .bar').css('width', '0');
		},
		add: function(e, data) {
			// Update libView files to be saved with new record
			libView.files = data;
		},

		progressall: function(e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .bar').css(
				'width',
				progress + '%');
		}
	}).bind('fileuploadfail', function(e, data) {
		console.log("failed");
		console.log(data);
	});
	var libView = new app.LibraryView();
});