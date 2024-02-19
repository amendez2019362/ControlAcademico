const { Schema, model } = require('mongoose');

const ClaseSchema = Schema({
    
    nombreClase: {
        type: String,
        require: [true, 'Clase requerida']
    },
    status:{
        type: Boolean,
        default: true
    }
});

module.exports = model('Clase', ClaseSchema);