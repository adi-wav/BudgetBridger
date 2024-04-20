const mongoose = require("mongoose");

const expenseDetailSchema = mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Assuming time is stored as a string (e.g., "14:00")
  overspend: { type: Boolean, required: true },
});

const expenseSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  category: { type: String, required: true },
  expenses: [expenseDetailSchema],
  meanAmount: {
    type: Number,
    required: true,
    default: 0, // Initial mean amount, can be updated as expenses are added
  },
  cnt: {
    type: Number,
    required: true,
    default: 0, // Initial mean amount, can be updated as expenses are added
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;