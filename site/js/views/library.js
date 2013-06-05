var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    initialize: function(initialBooks) {
        this.collection = new app.Library();
        this.collection.fetch({
            reset: true
        });
        this.render();
        this.listenTo(this.collection, 'add', this.renderBook);
        this.listenTo(this.collection, 'reset', this.render);
    },

    // render library by rendering each book in its collection
    render: function() {
        this.collection.each(function(item) {
            this.renderBook(item);
        }, this);
    },

    // render a book by creating a BookView and appending the
    // element it renders to the library's element
    renderBook: function(item) {
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append(bookView.render().el);
    },

    events: {
        'click #add': 'addBook',
        "drop #picture": "dropHandler",
        "dragover #picture": "dragoverHandler"
    },

    addBook: function(e) {
        e.preventDefault();
        // if the user selected a file to upload, then upload it first
        var formData = {};
        $('#addBook div').children('input').each(function(i, el) {
            if ($(el).val() != '') {
                if (el.id === 'keywords') {
                    formData[el.id] = [];
                    _.each($(el).val().split(' '), function(keyword) {
                        formData[el.id].push({
                            'keyword': keyword
                        });
                    });
                } else if (el.id === 'releaseDate') {
                    formData[el.id] = $('#releaseDate').datepicker('getDate').getTime();
                } else {
                    formData[el.id] = $(el).val();
                }
            }
            // Clear input field value
            $(el).val('');
        });
        console.log(formData)
        this.collection.create(formData);
    },

    dropHandler: function(event) {
        event.stopPropagation();
        event.preventDefault();
        var e = event.originalEvent;
        e.dataTransfer.dropEffect = 'copy';
        this.pictureFile = e.dataTransfer.files[0];
        var test = e.dataTransfer.files[0];
        // Read the image file from the local file system and display it in the img tag
        var reader = new FileReader();
        reader.onloadend = function() {
            $('#picture').attr('src', reader.result);
        };
        reader.readAsDataURL(this.pictureFile);
    },
    dragoverHandler: function(event) {
        event.preventDefault();
    }
});