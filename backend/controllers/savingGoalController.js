const SavingGoal = require('../models/SavingGoal');

// Add a saving goal
exports.addSavingGoal = async (req, res) => {
    const { goalName, targetAmount, currentSavings, deadline, notes } = req.body;

    if (currentSavings > targetAmount) {
        return res.status(400).json({ message: 'Current savings cannot exceed target amount' });
    }

    try {
        const newGoal = new SavingGoal({
            goalName,
            targetAmount,
            currentSavings,
            deadline,
            notes
        });

        await newGoal.save();
        res.status(201).json({ message: 'Saving goal created successfully', goal: newGoal });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create saving goal', error: err });
    }
};

// Get all saving goals
exports.getAllSavingGoals = async (req, res) => {
    try {
        const goals = await SavingGoal.find();
        res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch saving goals', error: err });
    }
};
