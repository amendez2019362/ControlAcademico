const { Schema, model, default:mongoose } = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    role: {
        type: String,
        default: "STUDENT_ROLE",
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

module.exports = model('Alumno', AlumnoSchema);