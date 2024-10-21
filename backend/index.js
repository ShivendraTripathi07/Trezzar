const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware for CORS
app.use(
  cors({
    origin: 'https://superb-kheer-3d6fe2.netlify.app',
    credentials: true,
  })
);

// JSON and cookie parser middleware
app.use(express.json({ limit: "20mb" })); // adjust as needed
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use(cookieParser());

// Define routes
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Connect to the database and start the server
const PORT = process.env.PORT || 8080;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connected to db");
    console.log(`server is running on ${PORT}`);
  });
});
