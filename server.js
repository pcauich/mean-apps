// Inicialización
var express  = require('express');
var app      = express(); 							// Utilizamos express
var mongoose = require('mongoose'); 				// mongoose para mongodb
var port  	 = process.env.PORT || 8080; 			// Cogemos el puerto 8080
var bodyParser = require('body-parser');

// Configuracion
mongoose.connect('mongodb://localhost:27017/EjemploMEAN'); 	// Hacemos la conexión a la base de datos de Mongo con nombre "MeanExample"

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
