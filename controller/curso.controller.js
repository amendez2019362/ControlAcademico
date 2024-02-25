const {response, json} = require('express');
const bcryptjs = require('bcryptjs');
const Curso = require('../models/curso');

const cursoGet = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
};

const getCursoById = async (req, res) => {
    const {id} = req.params;
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        curso
    });
}

const cursoPost = async (req, res) => {
    const {nombre} = req.body;
    try {
        const curso = new Curso({
            nombre
        });

        await curso.save();
        res.status(200).json({
            curso
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ msg: 'No se pudo crear el curso'});
    }
}

const cursoPut =  async (req, res) => {
    const{id} = req.params;
    const{_id, estado, ...resto} = req.body;
    await Curso.findByIdAndUpdate(id, resto);
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        msg: 'Curso actualizado exitosamente',
        curso
    });
}

const cursoDelete = async (req, res) => {
    const{id} = req.params;
    await Curso.findByIdAndUpdate(id, {estado: false});
    const curso = await Curso.findOne({_id: id});

    res.status(200).json({
        msg: 'Se elimino el curso'
    });
}

module.exports = {
    cursoGet,
    getCursoById,
    cursoPost,
    cursoPut,
    cursoDelete
}