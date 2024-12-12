const Expense = require('../models/Expense');

// Add an expense
exports.addExpense = async (req, res) => {
    const { name, amount, category, paymentMethod, notes } = req.body;

    try {
        const newExpense = new Expense({
            name,
            amount,
            category,
            paymentMethod,
            notes
        });

        await newExpense.save();
        res.status(201).json({ message: 'Expense added successfully', expense: newExpense });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add expense', error: err });
    }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch expenses', error: err });
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete expense', error: err });
    }
};
