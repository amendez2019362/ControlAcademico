const Usuario = require('../models/usuario');
const Clase = require('../models/clase');


const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({ id });
    if (existeUsuario) {
        throw new Error(`El usuario con el ${id} no existe`);
    }
}

const esRolValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`El role ${role} no existe en base de datos.`)
    }
}

const existenteClase = async (id = '') => {
    const existenteClase = await Subject.findOne({ id })
    if (existenteClase) {
        throw new Error(`La clase con el ${id} no existe`)
    }
}

const claseAsignada = async (clases = [], req) => {
    if(req.body.role === "STUDENT_ROLE"){
        if(clases.length > 3){
            throw new Error(`El estudiante con el ${id} solo se puede asignar a 3 cursos como maximo`);
        }
        const claseUnica = new Set(clases);
        if (claseUnica.size !== clases.length){
            throw new Error(`El estudiante con el ${id} no se puede asignar a la misma clase`);  
        }
    }
    return true;
}



module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido,
    existenteClase,
    claseAsignada
}