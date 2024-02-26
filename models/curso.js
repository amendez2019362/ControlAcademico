const {Schema, model, default:mongoose} = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre de este curso es necesario']
    },
    descripcion: {
        type: String,
        require: [true, 'La descripcion de este curso es necesaria']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Curso', CursoSchema);