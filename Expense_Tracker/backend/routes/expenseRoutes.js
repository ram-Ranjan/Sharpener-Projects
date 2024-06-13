const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.get('/', expenseController.getAllExpenses);
router.post('/', expenseController.addExpense);
router.put('/:id', expenseController.editExpense); // Edit route added
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
