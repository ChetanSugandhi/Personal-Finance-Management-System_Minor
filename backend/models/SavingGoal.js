const mongoose = require('mongoose');

const savingGoalSchema = new mongoose.Schema({
    goalName: {
        type: String,
        required: true
    },
    targetAmount: {
        type: Number,
        required: true
    },
    currentSavings: {
        type: Number,
        default: 0
    },
    deadline: {
        type: Date,
        default: null
    },
    notes: {
        type: String,
        default: ''
    },
    remainingAmount: {
        type: Number,
        default: function() {
            return this.targetAmount - this.currentSavings;
        }
    }
});

module.exports = mongoose.model('SavingGoal', savingGoalSchema);
