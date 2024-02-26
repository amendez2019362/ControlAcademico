const { validationResult } = require('express-validator');

const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');
const Curso = require('../models/curso');

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }

    const { cursos } = req.body;
    const alumno = new Alumno();

    if (cursos && cursos.length > 0) {
        for (let _id of cursos){
            const curso = Curso.findById(_id);
            if(!curso){
                return res.status(400).json({msg: `El curso con el id ${id} no existe`});
            }
            if(alumno.cursos.includes(_id)){
                return res.status(400).json({msg: `El alumno ya esta asignado al siguiente curso con el id ${_id}`});
            }
            if(alumno.cursos.length >= 3) {
                return res.status(400).json({msg: `El alumno ya se asigno a sus 3 cursos correspondientes`});
            }
            alumno.cursos.push(_id);
        }
    }
    next();
}

const validarCamposMaestro = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty){
        return res.status(400).json(error);
    }

    const {cursos} = req.body
    const maestro = new Maestro();

    if(cursos && cursos.length > 0){
        for (let _id of cursos){
            const curso = Curso.findById(_id);
            if(!curso) {
                return res.status(400).json({msg: `El curso con el id ${_id} no existe`});
            }
            if(maestro.cursos.includes(_id)){
                return res.status(400).json({msg: `El maestro ya esta asignado al siguiente curso con el id ${_id}`});
            }
            maaestro.cursos.push(_id);
        }
    }

    next();
}

module.exports = {
    validarCampos,
    validarCamposMaestro
}