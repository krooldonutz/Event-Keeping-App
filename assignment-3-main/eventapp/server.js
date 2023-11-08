const mongoose = require("mongoose");
const express = require("express");
const categoryRouter = require("./Routes/category_router");
const eventRouter = require("./Routes/event-route");
const statsRouter = require("./Routes/stats-router");
const Stat = require("./controllers/stats_controller");
const path = require('path');

const app = express();
const { Translate } = require("@google-cloud/translate").v2;
const server = require('http').Server(app);
const io = require('socket.io')(server);

const fs = require('fs');

// const server = require('http').Server(app);
//app.listen(8080);

const url = "mongodb://localhost:27017/assignment3"

app.use("/", express.static(path.join(__dirname, "dist/eventapp")));


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
app.use(express.static("src/app/text-to-speech"));

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
app.use("/", statsRouter);

/**
 * Initialize the statistics controller.
 * @function
 * @name init
 * @memberof Stat
 */
Stat.init();

// Imports the Google Cloud client library
const textToSpeech = require("@google-cloud/text-to-speech");

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

io.on("connection", socket => {
    console.log("new connection made from client with ID=" + socket.id);

    socket.on("newMsg", data => {
        const translateId = socket.id;
        
        const translate = new Translate({ translateId: translateId });

        const text = data.text;
        let targetLanguage; 

        if (data.target == "French") {
          targetLanguage = "fr";
        }
        else if (data.target == "Chinese") {
            targetLanguage = "zh";
        }
        else if (data.target == "Japanese") {
            targetLanguage = "ja";
        }

        translate
        .translate(text, targetLanguage)
        .then(results => {
          const translation = results[0];
          const resultX = {
            text: text,
            target: targetLanguage,
            translation: translation
          };
          io.emit("translate", resultX);
        });
    });

    socket.on('textToSpeech', async (data) => {
      const text = data.text;
  
      // Construct the request for text-to-speech
      const request = {
        input: { text },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
      };
  
      try {
        client.synthesizeSpeech(request, (err, response) => {
            if (err) {
                console.error("ERROR:", err);
                return;
            }
            const filePath = path.join('./', 'src','app', 'text-to-speech', 'output.mp3');
            // Write the binary audio content to a local file
            fs.writeFile(filePath, response.audioContent, "binary", (err) => {
                if (err) {
                    console.error("ERROR:", err);
                    return;
                }
                socket.emit("speechOutput", filePath.split('/')[3])
            });
        }
        
    )} catch (error) {
        console.error('Text-to-speech error:', error);
      }
    });
});


  server.listen(8080)
