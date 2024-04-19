const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT;
app.use(express.json());

app.use("/api/v1/user", require("./routes/userRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
