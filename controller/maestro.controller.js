const { response, json } = require('express');
const bcryptjs = require('bcryptjs');
const Maestro = require('../models/maestro');

const maestroGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, maestros] = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
            .select('nombre')
            .select('cursos')
            .populate({
                path: 'cursos',
                match: {estado: true},
                select: 'nombre'
            })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    const maestroCurso = maestros.map(maestro => ({
        _id: maestro._id,
        nombre: maestro.nombre,
        cursos: maestro.cursos.map(curso => curso.nombre)
    }));

    res.status(200).json({
        total,
        maestros: maestroCurso
    });
};

const getMaestroById = async (req, res) => {
    const { id } = req.params;
    const maestro = await Maestro.findOne({ _id: id });

    res.status(200).json({
        maestro
    });
}

const maestroPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, correo, ...resto } = req.body;
    await Maestro.findByIdAndUpdate(id, resto);

    const maestro = await Maestro.findOne({ _id: id });

    res.status(200).json({
        msg: 'Maestro Actualizado exitosamente',
        maestro
    })
}

const maestroDelete = async (req, res) => {
    const { id } = req.params;
    await Maestro.findByIdAndUpdate(id, { estado: false });

    const maestro = await Maestro.findOne({ _id: id });
    const maaestroAutenticado = req.maestro;

    res.status(200).json({
        msg: 'Maestro a eliminar',
        maestro,
        maestroAutenticado
    });
}

const maestroPost = async (req, res) => {
    const { nombre, correo, password, curso } = req.body;
    const maestro = new Maestro({ nombre, correo, password, curso });

    const salt = bcryptjs.genSaltSync();
    maestro.password = bcryptjs.hashSync(password, salt);

    await maestro.save();
    res.status(200).json({
        maestro
    });
}

module.exports = {
    maestroGet,
    getMaestroById,
    maestroPost,
    maestroPut,
    maestroDelete
}