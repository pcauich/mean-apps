var mongoose = require('mongoose');

module.exports = mongoose.model('Oficio', {
	numero_memo:{type: Number, default: 0},
	destinatario: String,
	asunto: String,
	fecha: { type: Date, default: Date.now},
});
