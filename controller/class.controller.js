const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Subject = require('../models/clase');
const { param } = require('../routes/clase.routes');


const clasePost = async (req, res) => {
    const { nombreClase } = req.body;
    const clase = new Clase({ nombreClase });

    await clase.save();
    res.status(200).json({
        clase
    });
}

const claseGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, clases] = await Promise.all([
        Clase.countDocuments(query),
        Clase.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        clases
    });
}

const getClaseById = async (req, res) => {
    const { id } = req.params;
    const clase = await Clase.findOne({ _id: id });

    res.status(200).json({
        clase
    });
}

const clasePut = async (req, res) => {
    const {id} = req/params;
    const {_id, ...rest} = req.body;
    
    const clase = await Clase.findByIdAndUpdate(id, rest);

    res.status(200).json({
        msg: 'Clase actualizada'
    });
}

const claseDelete = async (req, res) => {
    const {id} = req.params;
    try {
        await Clase.findByIdAndUpdate(id, {status: false});

        const clase = await Clase.findOne({_id: id});
        res.status(200).json({
            msg: 'Clase Eliminada'
        });
    } catch (error) {
        console.error("Error al eliminar al estudiante", error);
        res.status(500).json({error: 'Error en el servidor'})
    }
}

module.exports = {
    claseGet,
    clasePost,
    clasePut,
    getClaseById,
    claseDelete
}