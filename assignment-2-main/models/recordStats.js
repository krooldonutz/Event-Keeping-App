const mongoose = require("mongoose");

/**
 * @module StatsModel
 */

/**
 * Mongoose schema for Stats.
 * @class
 */
const statsSchema = new mongoose.Schema({
    /**
     * Name of the statistics record (required).
     * @type {string}
     */
    name: {
        type: String,
        required: true,
    },

    /**
     * Number of records created (default is 0).
     * @type {number}
     * @default 0
     */
    recordsCreated: {
        type: Number,
        default: 0,
    },

    /**
     * Number of records deleted (default is 0).
     * @type {number}
     * @default 0
     */
    recordsDeleted: {
        type: Number,
        default: 0,
    },

    /**
     * Number of records updated (default is 0).
     * @type {number}
     * @default 0
     */
    recordsUpdated: {
        type: Number,
        default: 0,
    },
});


module.exports = mongoose.model("Stats", statsSchema);
