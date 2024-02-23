const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmailAlumno, existeAlumnoById } = require('../helpers/db-validators');

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
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6,}),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmailAlumno),
        validarCampos,
    ], alumnoPost
);

module.exports = router;