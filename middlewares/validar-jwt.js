const jwt = require("jsonwebtoken");
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
        const { uid } = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

        const alumno = await Alumno.findById(uid);
        const maestro = await Maestro.findById(uid);

        let usuario;

        if (!alumno && !maestro) {
            return res.status(401).json({
                msg: "No existe en la base de datos",
            })
        }

        if (alumno) {
            if (!alumno.estado) {
                return res.status(401).json({
                    msg: "Token no valido - alumno con estado:false",
                });
            }
            
            req.usuario = alumno;

        }

        if (maestro) {
            if (!maestro.estado) {
                return res.status(401).json({
                    msg: "El token es invalido | Profesor con estado: false",
                });
            }

            req.usuario = maestro;

        }

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
