const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeMaestroById } = require('../helpers/db-validators');

const { maestroGet, maestroPut, maestroDelete, maestroPost, getMaestroById} = require('../controller/maestro.controller');
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
        validarCampos,
    ], maestroPost
);

module.exports = router;