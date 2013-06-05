var app = app || {};

$(function() {
	$('#releaseDate').datepicker();
	$('#coverImage').fileupload({
		fileInput: '#coverImage',
		dropZone: "#picture",
		dataType: 'json',
		url: '/upload',
		replaceFileInput: false,
		drop: function(e, data) {},
		change: function(e, data) {},
		done: function(e, data) {
			//console.log(data);
			//console.log(data.result.url);
			// do the saving logic of the model
			libView.saveNewBook(data.result.url);
			$('#progress .bar').css('width', '0');
		},
		add: function(e, data) {
			// Define data context to upload the file when the add button is clicked
			data.context = $("#add").click(function() {
				data.submit();
				return false;
			});
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