import {Schema, model} from 'mongoose';

var validateEmail = email => {
    var response = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return response.test(email);
}

const UserSchema = new Schema({
    name: {type: String},
    lastname: {type: String},
    email: {
        type: String, 
        lowercase: true,
        validate: [validateEmail, 'Ingrese un correo válido'],
    },
    password: {type: String},
    date: {type: Date, default: Date.now}
});

module.exports = model("User", UserSchema);
