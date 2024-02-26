const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeAlumnoById } = require('../helpers/db-validators');

const { alumnoGet, getAlumnoById, alumnoPut, alumnoDelete, alumnoPost } = require('../controller/alumno.controller')
const router = Router();

router.get("/", alumnoGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], getAlumnoById
);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], alumnoPut
);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], alumnoDelete
);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ], alumnoPost
);

module.exports = router;