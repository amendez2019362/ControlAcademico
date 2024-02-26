const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeCursoById } = require('../helpers/db-validators');
const {validarJWT} = require('../middlewares/validar-jwt')

const { getCursoById, cursoGet, cursoPost, cursoPut, cursoDelete } = require('../controller/curso.controller');
const { tieneRole } = require('../middlewares/validar-roles');
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

router.post(
    "/",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ], cursoPost
)

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("id", "El id no es una formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoDelete
);

module.exports = router;