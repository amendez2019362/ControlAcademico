const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');
const Curso = require('../models/curso');

const existeAlumnoById = async (id = '') => {
    const existeAlumno = await Alumno.findOne({ id });
    if (existeAlumno) {
        throw new Error(`El alumno con el ${id} no existe`);
    }
}

const existeMaestroById = async (id = '') => {
    const existeMaestro = await Maestro.findOne({ id });
    if (existeMaestro) {
        throw new Error(`El maestro con el ${id} no existe`);
    }
}

const existeCursoById = async (id = '') => {
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error(`El curso con el ${id} no existe`);
    }
}

const existeCorreo = async (correo = '') => {
    const existsCorreo = await Usuario.findOne({correo});
    if(existsCorreo){
        throw new Error(`El correo ${correo} ya se registro anteriormente`);
    }
}

module.exports = {
    existeAlumnoById,
    existeMaestroById,
    existeCursoById,
    existeCorreo
}