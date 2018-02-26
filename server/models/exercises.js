const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaOptions = {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: {
        createdAt: 'creation_date', updatedAt: 'updated_date'
    }
};

const ExerciseSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    primary_muscle: [{ type: String, required: true }],
    secondary_muscle: [{ type: String }],
    equipment: { type: String, required: true },
    level: { type: String, require: true },
    calorie_burned: { type: Number, default: 0, required: true },
    addedby: { type: mongoose.SchemaTypes.ObjectId, select: false },
}, schemaOptions);

module.exports = mongoose.model('Exercise', ExerciseSchema);