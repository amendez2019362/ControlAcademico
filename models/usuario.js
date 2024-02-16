const { Shema, model } = require('mongoose');

const UsuarioShcema = Shema({
    nombre: {
        type: String,
        requir: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        require: [true, 'El password es obligatorio']
    },
    role: {
        type: String,
        default: 'STUDENT_ROLE',
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    }
})

module.exports = model('Usuario', UsuarioSchema);