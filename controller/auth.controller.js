const { generarJWT } = require("../helpers/generar-jwt");
const Alumno = require("../models/alumno");
const Maestro = require("../models/maestro")
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password } = req.body;

    try {
        const alumno = await Alumno.FindOne({ correo });
        const maestro = await Maestro.FindOne({ correo })

        console.log(alumno)
        console.log(maestro)

        if (!alumno) {
            return res.status(400).json({
                msg: 'El correo no esta registrado'
            })
        }

        if (!alumno.estado) {
            return res.status(400).json({
                msg: 'El alumno no existe en la base de datos'
            })
        }

        const validPassword = bcryptjs.compareSync(password, alumno.password);
        if (!validPassword) {
            return res.statur(400).json({
                msg: 'Contraseña Incorrecta'
            })
        }

        const token = await generarJWT(alumno.id);
        res.status(200).json({
            msg: 'alumno logeado correctamente',
            alumno,
            token
        })

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