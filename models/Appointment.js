const mongoose = require('mongoose');

const Appointment =  new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,

    // Salvaremos a hora como string
    time: String
});

module.exports = Appointment;