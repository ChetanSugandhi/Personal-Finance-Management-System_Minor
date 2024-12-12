const Budget = require('../models/Budget');

// Add a budget
exports.addBudget = async (req, res) => {
    const { category, budgetAmount, spentAmount, remainingAmount, dateRange } = req.body;

    try {
        const newBudget = new Budget({
            category,
            budgetAmount,
            spentAmount,
            remainingAmount,
            dateRange
        });

        await newBudget.save();
        res.status(201).json({ message: 'Budget created successfully', budget: newBudget });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create budget', error: err });
    }
};

// Get all budgets
exports.getAllBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find();
        res.status(200).json(budgets);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch budgets', error: err });
    }
};
