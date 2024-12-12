const express = require('express');
const budgetController = require('../controllers/budgetController');
const router = express.Router();

router.post('/add', budgetController.addBudget);
router.get('/', budgetController.getAllBudgets);

module.exports = router;
