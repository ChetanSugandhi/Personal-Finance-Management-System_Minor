const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    budgetAmount: {
        type: Number,
        required: true
    },
    period : {
        type : String,
        required : true
    },
    priority : {
        type : String,
        required : true
    },
    notes : {
        type : String,
        // default : ''
    }
});

module.exports = mongoose.model('Budget', budgetSchema);
