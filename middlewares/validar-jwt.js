const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const Alumno = require("../models/alumno");
const Maestro = require("../models/maestro");

const validarJWT = async (req, res, next) => {

    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion",
        });
    }

    try {
        const { aid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);
        const { mid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

        const alumno = await Alumno.findById(aid);
        const maestro = await Maestro.findById(mid)

        if (!alumno) {
            return res.status(401).json({
                msg: "Alumno no existe en la base de datos",
            })
        }

        if (!alumno.estado) {
            return res.status(401).json({
                msg: "Token no valido - alumno con estado:false",
            });
        }

        req.alumno = alumno;

        next();

    } catch (e) {
        console.log(e),
            res.status(401).json({
                msg: "Token no valido"
            });
    }
};

module.exports = {
    validarJWT,
}

