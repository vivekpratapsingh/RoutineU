const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FoodSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: [{
        serving_size: {
            size: {
                amount: { type: Number, require: true, default: 1 },
                unit: { type: String, required: true, default: 'gm' }
            },
            calories: { type: Number, require: true, default: 0 },
            fat: {
                amount: { type: Number, default: 0, },
                types: {
                    saturated: { type: Number, default: 0 },
                    polysaturated: { type: Number, default: 0 },
                    monosaturated: { type: Number, default: 0 },
                    trans: { type: Number, default: 0 }
                }
            },
            cholesterol: { type: Number, require: true, default: 0 },
            sodium: { type: Number, require: true, default: 0 },
            potassium: { type: Number, require: true, default: 0 },
            carbohydrates: { type: Number, require: true, default: 0 },
            dietry_fiber: { type: Number, require: true, default: 0 },
            sugar: { type: Number, require: true, default: 0 },
            protein: { type: Number, require: true, default: 0 },
            vitamin_a: { type: Number, require: true, default: 0 },
            vitamin_c: { type: Number, require: true, default: 0 },
            calcium: { type: Number, require: true, default: 0 },
            iron: { type: Number, require: true, default: 0 }
        }
    }],
    _users: {
        type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true }],
        select: false
    }
}, { toJSON: { virtuals: true } });

FoodSchema.index({name : 'text',brand : 'text'});

module.exports = mongoose.model('Food', FoodSchema);