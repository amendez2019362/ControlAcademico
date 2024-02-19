const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {});
        console.log('Si se conecto la base de datos');
    } catch (e) {
        throw new Error('Error al conectar', e);
    }
};

module.exports = {
    dbConnection
};