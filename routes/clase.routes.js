const { Router } = require('express');
const { check } = require('express-validator');

const { roleUser } = require('../middlewares/rol');
const { validarCampos } = require('../middlewares/validar-campos');
const { existenteClase } = require('../helpers/db-validators');
const { claseGet, getClaseById, clasePost, clasePut, claseDelete } = require('../controller/class.controller');


const router = Router();
router.use(roleUser)

router.post(
    "/",
    [
        check("nombreClase", "El nombre es obligatorio").not().isEmpty(),
        check("nombreClase").custom(existenteClase),
        validarCampos
    ], clasePost
);

router.get("/", claseGet);

router.get(
    "/:id",
    [
        check("id", "Esta id no existe en la base de datos").isMongoId(),
        check("id").custom(existenteClase),
        validarCampos
    ], getClaseById
);

router.put(
    "/:id",
    [
        check("id", "Esta id no es un formato en mongoDB").isMongoId(),
        check("id").custom(existenteClase),
        validarCampos
    ], clasePut
);

router.delete(
    "/:id",
    [
        check("id", "Esta id no es un formato en mongoDB").isMongoId(),
        check("id").custom(existenteClase),
        validarCampos
    ], claseDelete
);

module.exports = router;