const express = require('express');
const { body, validationResult } = require('express-validator');
const expenseController = require('../controllers/expenseController');
const router = express.Router();

router.post('/add', [
    body('name').notEmpty().withMessage('Expense name is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('category').notEmpty().withMessage('Category is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    expenseController.addExpense(req, res);
});

router.get('/', expenseController.getAllExpenses);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
