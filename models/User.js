/** @module User */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * <pre>
 * email, password, name, token의 type과 존재한다는것을 어디서나 알수있게 해주는
 * Schema
 * </pre>
 * @constant UserSchema
 */

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    token : {
        type: String,
        required: true
    },
    frendship : [{
        type: Array,
        required: true
    }],
});

module.exports = User = mongoose.model('users', UserSchema);