const { Schema, model, default: mongoose, mongo } = require('mongoose');

const MaestroSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        nique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    role: {
        type: String,
        default: "TEACHER_ROLE",
        enum: ['STUDENT_ROLE', 'TEACHER_ROLE']
    },
    cursos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso'
    }],
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Maestro', MaestroSchema);