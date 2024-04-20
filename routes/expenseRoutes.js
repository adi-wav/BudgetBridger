const express = require("express");

const {
  createExpense,
  getAllCategories,
  getUserExpenses,
} = require("../controllers/expenseController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/update", authMiddleware, createExpense);
router.get("/categories", authMiddleware, getAllCategories);
router.get("/expenses", authMiddleware, getUserExpenses);
module.exports = router;
