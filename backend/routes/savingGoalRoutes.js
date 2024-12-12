const express = require('express');
const savingGoalController = require('../controllers/savingGoalController');
const router = express.Router();

router.post('/add', savingGoalController.addSavingGoal);
router.get('/', savingGoalController.getAllSavingGoals);

module.exports = router;
