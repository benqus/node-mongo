/**
 * Created by Bence Kormos on 09/02/2017.
 */
const mongoose = require('mongoose');

const Promise = require('bluebird');
mongoose.Promise = Promise;

/**
 * @param {function} onOpen
 */
module.exports = (onOpen) => {
    mongoose.connect('mongodb://ds145009.mlab.com:45009/node-mongo', {
        user: 'root',
        pass: 'Abcabc123!'
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console));
    db.once('open', onOpen);
};
