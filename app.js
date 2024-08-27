// Setting-up Express.js:
const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

// Port:
const PORT = process.env.PORT;

// Middlewares:
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MongoDB Connection:
const { connectToMongoDB } = require("./connection");
connectToMongoDB(`mongodb+srv://${process.env.DBUsername}:${process.env.DBPassword}@dashoff.gygar.mongodb.net/`);

// Routes:
const { staticRouter } = require("./routes/staticRoutes");
const { testRouter } = require("./routes/testRoutes");
app.use("/", staticRouter);
app.use("/test", testRouter);

// Server Listen:
app.listen(PORT, () => console.log("Server started at Port:", PORT));