const express = require("express");
const cors = require("cors"); // CORS(Cross-Origin Resource Sharing)
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoDbUri = process.env.ATLAS_URI;

mongoose.connect(mongoDbUri, { useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection established successfuly");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);
app.use("/exercises", exercisesRouter);
app.use("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
