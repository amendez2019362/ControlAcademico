const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');

const alumnoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, alumnos] = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
            .select('nomrbre')
            .select('curso')
            .populate({
                path: 'curso',
                match: { estado: true },
                select: 'nombre'
            })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    const alumnoCurso = alumno.map(alumno => ({
        _id: alumno._id,
        nombre: alumno.nombre,
        curso: alumno.curso.map(curso => curso.nombre)
    }));

    res.status(200).json({
        total,
        alumnos: alumnoCurso
    });
};

const getAlumnoById = async (req, res) => {
    const { id } = req.params;
    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        alumno
    });
}

const alumnoPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;
    await Alumno.findByIdAndUpdate(id, resto);

    const alumno = await Alumno.findOne({ _id: id });

    res.status(200).json({
        msg: 'Alumno Actualizado exitosamente',
        alumno
    })
}

const alumnoDelete = async (req, res) => {
    const { id } = req.params;
    await Alumno.findByIdAndUpdate(id, { estado: false });

    const alumno = await Alumno.findOne({ _id: id });
    const alumnoAutenticado = req.alumno;

    res.status(200).json({
        msg: 'Alumno a eliminar',
        alumno,
        alumnoAutenticado
    });
}

const alumnoPost = async (req, res) => {
    const { nombre, correo, password, curso } = req.body;
    const alumno = new Alumno({ nombre, correo, password, curso });

    const salt = bcryptjs.genSaltSync();
    alumno.password = bcryptjs.hashSync(password, salt);

    await alumno.save();
    res.status(200).json({
        alumno
    });
}

module.exports = {
    alumnoDelete,
    alumnoGet,
    alumnoPost,
    alumnoPut,
    getAlumnoById
}