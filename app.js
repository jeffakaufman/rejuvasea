var application_root = __dirname,
    express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    formidable = require('formidable'),
    knox = require('knox'),
    ini = require('node-ini')
    var app = express();


app.configure(function() {
    app.set('port', 4711);
    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(require('stylus').middleware({
        src: __dirname + '/site'
    }));
    app.use(express.static(path.join(application_root, 'site')));
});

// Load Config INI
var cfg = ini.parseSync('./config.ini');

//Connect to database
mongoose.connect(cfg.db.url + cfg.db.database);

// Configure S3 Client
var s3Client = knox.createClient({
    key: cfg.s3.access_key_id,
    secret: cfg.s3.secret_access_key,
    bucket: cfg.s3.bucket
});

// Routes
require('./routes/books').use(app, mongoose);

app.get('/api', function(request, response) {
    response.send('Library API is running');
});

var port = process.env.PORT || 4711;
app.listen(port, function() {
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});