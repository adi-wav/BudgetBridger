const Expense = require("../models/expense.js");

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createExpense = async (req, res) => {
  const { category, amount, date, time } = req.body;
  const userId=req.body.userId;
  try {
    let expense = await Expense.findOne({ category,userId });
    if (!expense) {
      const newExpense = new Expense({
        userId,
        category,
        expenses: [{ amount, date, time, overspend: false }],
        meanAmount: amount,
        cnt: 1,
      });
      await newExpense.save();
      res.status(201).json(newExpense);
    } else {
      const newMean =
        (expense.meanAmount * expense.cnt + amount) / (expense.cnt + 1);
      const overspend = newMean > expense.meanAmount * 1.15;
      expense.expenses.push({ amount, date, time, overspend });
      if (!overspend) {
        expense.meanAmount = newMean;
        expense.cnt += 1;
      }
      await expense.save();
      res.status(201).json(expense);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getExpenses, createExpense };