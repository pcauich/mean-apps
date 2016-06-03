var Oficio = require('./modelo/oficio');


// Obtiene todos los objetos Oficio de la base de datos
exports.getOficio = function (req, res){
	Oficio.find(
		function(err, oficio) {
			if (err)
				res.send(err)
					res.json(oficio); // devuelve todas los Oficios en JSON
				}
			);
}

// Guarda un objeto Oficio en base de datos
exports.setOficio = function(req, res) {
	
		// Creo el objeto Oficio
		Oficio.create(
			{numero_memo: req.body.numero_memo, destinatario : req.body.destinatario,	asunto: req.body.asunto, fecha: req.body.fecha},
			function(err, oficio) {
				if (err)
					res.send(err);

				// Obtine y devuelve todas los oficios tras crear uno de ellos
				Oficio.find(function(err, oficio) {
				 	if (err)
				 		res.send(err)
				 	res.json(oficio);
				});
			});

	}

// Modificamos un objeto Oficio de la base de datos
exports.updateOficio = function(req, res){
	Oficio.update( {_id : req.params.oficio_id},
					{$set:{numero_memo: req.body.numero_memo, destinatario : req.body.destinatario,	asunto: req.body.asunto, fecha: req.body.fecha}}, 
					function(err, oficio) {
						if (err)
							res.send(err);

				// Obtiene y devuelve todas los oficios tras crear uno de ellos
				Oficio.find(function(err, oficio) {
				 	if (err)
				 		res.send(err)
				 	res.json(oficio);
				});
			});
	}

// Elimino un objeto Oficio de la base de Datos
exports.removeOficio = function(req, res) {
	Oficio.remove({_id : req.params.oficio_id}, function(err, oficio) {
		if (err)
			res.send(err);

			// Obtine y devuelve todas los oficios tras borrar uno de ellos
			Oficio.find(function(err, oficio) {
				if (err)
					res.send(err)
				res.json(oficio);
			});
		});
}
