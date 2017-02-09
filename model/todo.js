/**
 * Created by Bence Kormos on 09/02/2017.
 */
const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    text: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('todos', schema);
