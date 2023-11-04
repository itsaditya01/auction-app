const express = require("express");
const http = require("http");
const app = express();
const { connectToMongo } = require("./src/database/connection");
const errorhandler = require("./src/utils/errorHandler");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path')

const socketConnection = require("./src/socket/socketConfig");
const scheduleAuctionTasks = require("./src/helpers/cron");

const server = http.createServer(app);
//middlewares
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require("dotenv").config();

const port = 3022 || process.env.PORT;

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

//routes
app.use("/api", require("./src/routes/index"));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Not Found");
  error.code = 404;
  next(error);
});

// Error handler for all the errors
app.use(errorhandler);

//function to start the server
const startServer = async () => {
  try {
    await connectToMongo();
    server.listen(port, () => {
      console.log("Server is listening to port 3000!");
    });
    scheduleAuctionTasks();
    socketConnection(server);
  } catch (error) {
    console.log("Error in connecting database.", error);
  }
};

startServer();
