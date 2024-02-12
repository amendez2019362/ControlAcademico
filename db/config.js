const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {})
        console.log('Se conecto exitosamente');
    } catch (e) {
        throw new Error('Error al conectar', e)
    }
};

module.exports = {
    dbConnection
}