const express = require("express");

const { createExpense } = require("../controllers/expenseController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/update",authMiddleware ,createExpense);

module.exports = router;