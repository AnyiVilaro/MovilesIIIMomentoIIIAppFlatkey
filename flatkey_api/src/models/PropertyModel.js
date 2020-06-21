import {Schema, model} from 'mongoose';

const PropertySchema = new Schema({
    title: {type: String},
    type: {type: String},
    address: {type: String},
    rooms: {type: Number},
    price: {type: Number},
    area: {type: Number},
    landlord: {type: String}
});

module.exports = model("Property", PropertySchema);
