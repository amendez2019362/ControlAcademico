const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeCursoById } = require('../helpers/db-validators');

const { getCursoById, cursoGet } = require('../controller/curso.controller')
const router = Router();

router.get("/", cursoGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato valido para Mongodb").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], getCursoById
);

module.exports = router;