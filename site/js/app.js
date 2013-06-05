var app = app || {};

$(function() {
	$('#releaseDate').datepicker();
	$('#coverImage').fileupload({
		fileInput: '#coverImage',
		dropZone: "#picture",
		dataType: 'json',
		url: '/upload',
		drop: function(e, data) {
			$.each(data.files, function(index, file) {
				alert('Dropped file: ' + file.name);
			});
		},
		change: function(e, data) {
			$.each(data.files, function(index, file) {
				alert('Selected file: ' + file.name);
				// Handle selected files
			});
		},
		done: function(e, data) {
			console.log(data);
		},
		add: function(e, data){
			console.log(data);
			data.submit();
		}
	}).bind('fileuploadfail', function(e, data) {
		console.log(data)
	});

	new app.LibraryView();

});