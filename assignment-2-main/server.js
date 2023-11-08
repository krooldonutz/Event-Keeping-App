const mongoose = require("mongoose");
const express = require("express");
const categoryRouter = require("./routes/category_router");
const eventRouter = require("./routes/event-route");
const Stat = require("./controllers/stats_controller");

const app = express();
app.listen(8080);

const url = "mongodb://localhost:27017"

/**
 * Middleware for parsing JSON payloads in incoming requests.
 * @function
 * @name use
 * @memberof app
 */
app.use(express.json());

/**
 * Middleware for parsing URL-encoded data in incoming requests with extended mode.
 * @function
 * @name use
 * @memberof app
 */
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static("node_modules/bootstrap/dist/css"));
app.use(express.static("images"));

/**
 * Set the rendering engine for HTML files.
 * @function
 * @name engine
 * @memberof app
 */
app.engine("html", require("ejs").renderFile);

/**
 * Set the view engine to HTML.
 * @function
 * @name set
 * @memberof app
 */
app.set("view engine", "html");

/**
 * Connect to the MongoDB database.
 * @function
 * @name connect
 * @param {string} url - The URL of the MongoDB database.
 * @returns {Promise<string>} - A promise that resolves to a success message.
 */
async function connect(url) {
    await mongoose.connect(url);
    return "Connected Successfully";
}

/**
 * Start the MongoDB connection and log the result.
 * @function
 * @name then
 * @memberof connect(url)
 * @param {function} console.log - The function to log the connection status.
 */
connect(url)
    .then(console.log)
    .catch((err) => console.log(err));

/**
 * Use the categoryRouter for handling category-related routes.
 * @function
 * @name use
 * @memberof app
 * @param {string} path - The URL path at which the categoryRouter should be mounted.
 * @param {object} categoryRouter - The router for category-related routes.
 */
app.use("/", categoryRouter);

/**
 * Use the eventRouter for handling event-related routes.
 * @function
 * @name use
 * @memberof app
 * @param {string} path - The URL path at which the eventRouter should be mounted.
 * @param {object} eventRouter - The router for event-related routes.
 */
app.use("/", eventRouter);

/**
 * Initialize the statistics controller.
 * @function
 * @name init
 * @memberof Stat
 */
Stat.init();
