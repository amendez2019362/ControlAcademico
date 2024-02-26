const { generarJWT } = require("../helpers/generar-jwt");
const Alumno = require("../models/alumno");
const Maestro = require("../models/maestro")
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password } = req.body;

    let token;
    let usuario;

    try {
        const alumno = await Alumno.findOne({ correo });
        const maestro = await Maestro.findOne({ correo });

        if (!alumno  && !maestro) {
            return res.status(400).json({
                msg: 'El correo no esta registrado'
            });
        }

        if (alumno) {
            if (!alumno.estado) {
                return res.status(400).json({
                    msg: 'El alumno no existe en la base de datos'
                });
            }

            const validPasswordA = bcryptjs.compareSync(password, alumno.password);
            console.log(password);
            console.log(alumno.password);
            if (!validPasswordA) {
                return res.status(400).json({
                    msg: 'Contraseña Incorrecta'
                });
            }
    
            token = await generarJWT(alumno.id);
            usuario = alumno;
        }
        
        if (maestro) {
            if (!maestro.estado) {
                return res.status(400).json({
                    msg: 'El maestro no existe en la base de datos'
                });
            }

            const validPasswordM = bcryptjs.compareSync(password, maestro.password);
            if (!validPasswordM) {
                return res.status(400).json({
                    msg: 'Contraseña incorrecta'
                });
            }
            token = await generarJWT(maestro.id);
            usuario = maestro;

        }

        res.status(200).json({
            msg: 'Login OK',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'No se a podido logear'
        })
    }
}

module.exports = {
    login
}

