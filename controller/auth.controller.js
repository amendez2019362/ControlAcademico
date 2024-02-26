const { generarJWT } = require("../helpers/generar-jwt");
const Alumno = require("../models/alumno");
const Maestro = require("../models/maestro")
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password } = req.body;

    let token;
    let usuario;

    try {
        const alumno = await Alumno.FindOne({ correo });
        const maestro = await Maestro.FindOne({ correo })

        if (!alumno  && !maestro) {
            return res.status(400).json({
                msg: 'El correo no esta registrado'
            })
        }

        if (alumno) {
            if (!alumno.estado) {
                return res.status(400).json({
                    msg: 'El alumno no existe en la base de datos'
                }) 
            }

            const validPassword = bcryptjs.compareSync(password, alumno.password);
            console.log(password);
            console.log(alumno.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: 'Contraseña Incorrecta'
                })
            }
    
            token = await generarJWT(alumno.id);
            usuario = alumno;

        }
        
        if (maestro) {
            if (!maestro.estado) {
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
            msg: 'Comuniquese con el admin'
        })
    }
}

module.exports = {
    login
}