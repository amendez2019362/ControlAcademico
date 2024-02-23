const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmailMaestro, existeMaestroById } = require('../helpers/db-validators');

const { maestroGet, maestroPut, maestroDelete, maestroPost, getMaestroById} = require('../controller/maestro.controller');
const maestro = require('../models/maestro');
const router = Router();

router.get("/", maestroGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMaestroById),
        validarCampos
    ], getMaestroById
);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMaestroById),
        validarCampos
    ], maestroPut
);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMaestroById),
        validarCampos
    ], maestroDelete
);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({ min: 6, }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmailMaestro),
        validarCampos,
    ], maestroPost
);

module.exports = router;