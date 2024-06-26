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
  const userId = req.body.userId;
  try {
    let expense = await Expense.findOne({ category, userId });
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
      const amountNumber = Number(amount);
      const newMean =
        (expense.meanAmount * expense.cnt + amountNumber) / (expense.cnt + 1);
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

const getAllCategories = async (req, res) => {
  const userId = req.body.userId; // Assuming userId is available in req.user

  try {
    const categories = await Expense.distinct("category", { userId });
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getUserExpenses = async (req, res) => {
  try {
    // Fetch expenses for the logged-in user
    const expenses = await Expense.find({ userId: req.body.userId });

    // If expenses are found, construct JSON response
    if (expenses.length > 0) {
      let allExpenses = [];
      expenses.forEach((expense) => {
        expense.expenses.forEach((exp) => {
          allExpenses.push({
            category: expense.category,
            amount: exp.amount,
            date: exp.date,
            time: exp.time,
            overspend: exp.overspend
          });
        });
      });

      res.json(allExpenses);
    } else {
      res.status(404).json({ message: "Expenses not found for the user" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = {
  getExpenses,
  createExpense,
  getAllCategories,
  getUserExpenses,
};
