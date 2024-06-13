const Expense = require('../models/Expense');

// Get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const { category, amount, desc } = req.body;
    const newExpense = await Expense.create({ category, amount, desc });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Edit an existing expense
exports.editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, amount, desc } = req.body;
    const expense = await Expense.findByPk(id);
    if (expense) {
      expense.category = category;
      expense.amount = amount;
      expense.desc = desc;
      await expense.save();
      res.status(200).json(expense);
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByPk(id);
    if (expense) {
      await expense.destroy();
      res.status(200).json({ message: 'Expense deleted' });
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
