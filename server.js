// Inicialización
var express  = require('express');
var app      = express(); 							// Utilizamos express
var mongoose = require('mongoose'); 				// mongoose para mongodb
var port  	 = process.env.PORT || 8080; 			// Cogemos el puerto 8080
var bodyParser = require('body-parser');


//Configuracion
//mongoose.connect('mongodb://pcauich:peter555@ds049548.mlab.com:49548/oficios'); 	// Hacemos la conexión a la base de datos de Mongo con nombre "n"
var connStr='mongodb://pcauich:peter555@ds049548.mlab.com:49548/oficios';
mongoose.connect(connStr);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



app.configure(function() {
	app.use(express.static(__dirname + '/angular'));
	app.use(express.logger('dev')); 						// activamos el log en modo 'dev'
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(express.methodOverride());
});

// Cargamos los endpoints
require('./app/routes.js')(app);

// Cogemos el puerto para escuchar
app.listen(port);
console.log("APP por el puerto " + port);
