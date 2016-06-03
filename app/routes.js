var Oficio = require('./modelo/oficio');
var Controller = require ('./controller');

module.exports = function(app) {

	// devolver todos los Oficios
	app.get('/api/oficio', Controller.getOficio);
	// Crear un nuevo Oficio
	app.post('/api/oficio', Controller.setOficio);
	// Modificar los datos de un Oficio
	app.put('/api/oficio/:oficio_id', Controller.updateOficio);
	// Borrar un Oficio
	app.delete('/api/oficio/:oficio_id', Controller.removeOficio);

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./angular/index.html'); // Carga única de la vista
	});
};