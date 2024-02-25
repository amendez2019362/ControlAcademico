const { validationResult } = require('express-validator');

const Alumno = require('../models/alumno');
const Maestro = require('../models/maestro');
const Curso = require('../models/curso');

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json(error);
    }


    next();
}

module.exports = {
    validarCampos
}