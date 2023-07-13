const express = require("express");

const { connection } = require("./config/db");
const { user } = require("./routes/user.routes");
const { blog } = require("./routes/blog.routes");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

//user route
app.use("/user", user);

//blog route
app.use("/blog", blog);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to db");
  } catch (err) {
    console.log(err);
    console.log("Error connecting in database");
  }

  console.log(`Server is running at port ${process.env.port}`);
});
