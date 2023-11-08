const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @module CategoryModel
 */

/**
 * Mongoose schema for Category.
 * @class
 */
const category_schema = new Schema({
    /**
     * Unique category ID, generated using generateAlphanumericCategory function.
     * @type {string}
     */
    categoryID: { type: String, default: generateAlphanumericCategory },

    /**
     * Name of the category (alphanumeric and required).
     * @type {string}
     */
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.match(/^[0-9a-zA-Z]+$/);
            },
            message: "Name must be Alphanumeric",
        },
    },

    /**
     * URL of the image for the category (required).
     * @type {string}
     */
    image: { type: String, required: true },

    /**
     * Description of the category (required).
     * @type {string}
     */
    desc: { type: String, required: true },

    /**
     * Date of creation.
     * @type {Date}
     */
    createdAt: {
        type: Date,
        default: Date.now,
    },

    /**
     * List of events associated with the category.
     * @type {Array}
     */
    eventsList: Array,
});

/**
 * Middleware function to add a '/' before the image URL.
 * @function
 * @name pre
 */
category_schema.pre('save', function(next) {
    // Check if the image URL does not already contain a backslash
    this.image = '/' + this.image;
    next();
});

/**
 * Generate a unique alphanumeric category ID.
 * @function
 * @name generateAlphanumericCategory
 * @returns {string} - Alphanumeric category ID.
 */
function generateAlphanumericCategory() {
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
    const alphanumeric = `C${randomChars}-${randomNumber}`;

    return alphanumeric;
}


module.exports = mongoose.model("Category", category_schema);
