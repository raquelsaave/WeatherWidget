
var fs = require('fs');
var path = require('path');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

/* LOADING PLACES FOR API */
let places = [];
fs.readFile(path.join(__dirname, '/assets/city.list.json'), 'utf8', function(err, contents) {
	places = JSON.parse(contents);
});

// API ROUTES

var router = express.Router();

router.get('/search', function(req, res) {
	let term = req.query.place.toLowerCase();
	let limit = req.query.limit || 10;
	let result = places.filter(place => place.name.toLowerCase().indexOf(term) >= 0);
	console.log(`>> Looking for ${term} found ${result.length} items. Retrieving ${limit}`);
	res.json(result.slice(0, limit));   	
});

app.use('/api', router);

app.listen(port);

console.log('Magic happens on port ' + port);
