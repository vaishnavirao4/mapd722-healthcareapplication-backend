var http = require("http");
var express = require("express");
require("dotenv").config();
var apiRouter = require("./routes/api");
var apiResponse = require("./helpers/apiResponse");
var cors = require("cors");
var port = process.env.PORT || "3000";


// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV != "test") {
  console.log('callll')
  mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to %s", MONGODB_URL);
      console.log(`App is running on...\n`);
    })
    .catch((err) => {
      console.error("App starting error:", err.message);
      process.exit(1);
    });
}

const app = express();

exports.app = app;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function (req, res) {
  console.log(req.url);
  return apiResponse.notFoundResponse(res, "API not found");
});

app.use((err, req, res) => {
  if (err.name == "UnauthorizedError") {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

if(process.env.NODE_ENV != 'test'){
  server.listen(port);
}

server.on("error", onError);
server.on("listening", onListening);
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
