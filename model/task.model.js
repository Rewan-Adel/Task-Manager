const e = require('express');
const { string } = require('joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: 'incomplete',
        enum: ['completed', 'incomplete']
    },
    description: {
        type: String
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);