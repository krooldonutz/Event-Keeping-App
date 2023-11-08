const mongoose = require("mongoose");

/**
 * @module EventModel
 */

/**
 * Mongoose schema for Event.
 * @class
 */
const eventSchema = mongoose.Schema({
    /**
     * Unique event ID, generated using generateAlphanumericEvents function.
     * @type {string}
     */
    eventId: {
        type: String,
        default: generateAlphanumericEvents,
    },

    /**
     * Name of the event (alphanumeric and required).
     * @type {string}
     */
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Use a regular expression to check if the value is alphanumeric
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Name must be alphanumeric',
        },
    },

    /**
     * Description of the event.
     * @type {string}
     */
    description: {
        type: String,
    },

    /**
     * Start date and time of the event (required).
     * @type {Date}
     */
    startDateTime: {
        type: Date,
        required: true,
    },

    /**
     * Duration of the event in minutes (required).
     * @type {number}
     */
    duration: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: "Duration must be a positive number",
        },
    },

    /**
     * Indicates whether the event is active (default is true).
     * @type {boolean}
     */
    isActive: {
        type: Boolean,
        default: true,
    },

    /**
     * URL of the image for the event (default is '/images/default.jpg').
     * @type {string}
     */
    image: {
        type: String,
        default: 'images/deftones.jpg'
    },

    /**
     * Maximum capacity of the event (default is 1000, must be between 10 and 2000).
     * @type {number}
     */
    capacity: {
        type: Number,
        default: 1000,
        validate: {
            validator: function (value) {
                return value >= 10 && value <= 2000;
            },
            message: "Capacity must be between 10 and 2000",
        },
    },

    /**
     * Number of tickets available for the event (default is the same as capacity).
     * @type {number}
     */
    ticketsAvailable: {
        type: Number,
        default: function () {
            if (this.ticketsAvailable === 0) {
                return this.capacity;
            }
        },
    },

    /**
     * Category ID associated with the event (required).
     * @type {string}
     */
    categoryId: {
        type: String,
        required: true,
    },

    /**
     * List of category references associated with the event.
     * @type {Array}
     */
    categoryList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
    ],
});

/**
 * Middleware function to add a '/' before the image URL.
 * @function
 * @name pre
 */
// eventSchema.pre('save', function(next) {
//     // Check if the image URL does not already contain a backslash
//     this.image = '/' + this.image;
//     next();
// });

/**
 * Generate a unique alphanumeric event ID.
 * @function
 * @name generateAlphanumericEvents
 * @returns {string} - Alphanumeric event ID.
 */
function generateAlphanumericEvents() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Generate two random characters
    const randomChars =
        characters[Math.floor(Math.random() * characters.length)] +
        characters[Math.floor(Math.random() * characters.length)];

    // Generate a random 4-digit number
    const randomNumber = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");

    // Combine the parts to form the final alphanumeric string
    const alphanumeric = `E${randomChars}-${randomNumber}`;

    return alphanumeric;
}

/**
 * Mongoose model for Event.
 * @type {object}
 */
module.exports = mongoose.model("Event", eventSchema);
