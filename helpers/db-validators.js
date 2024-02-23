const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');

const existenteEmailAlumno = async (correo = '') => {
    const existeEmailAlumno = await Alumno.findOne({ correo });
    if (existeEmailAlumno) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

const existenteEmailMaestro = async (correo = '') => {
    const existeEmailMaestro = await Maestro.findOne({ correo });
    if (existeEmailMaestro) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

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

module.exports = {
    existenteEmailAlumno,
    existenteEmailMaestro,
    existeAlumnoById,
    existeMaestroById
}