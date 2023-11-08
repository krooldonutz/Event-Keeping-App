/**
 * Represents an event category.
 * @class
 */
class EventCategory {
  /**
   * Create an event category.
   * @constructor
   * @param {string} name - The name of the category.
   * @param {string} image - The image path of the category.
   * @param {string} desc - The description of the category.
   */
  constructor(name, image, desc) {
    /**
     * The unique identifier of the category.
     * @member {string}
     */
    this.id = generateAlphanumericCategory();
    /**
     * The name of the category.
     * @member {string}
     */
    this.name = name;
    /**
     * The image path of the category.
     * @member {string}
     */
    this.image = '/' + image;
    /**
     * The description of the category.
     * @member {string}
     */
    this.desc = desc;
    /**
     * The creation date of the category.
     * @member {Date}
     */
    this.createdAt = new Date();
    console.log(this.image);
  }
}

/**
 * Generates a random alphanumeric category identifier.
 * @function
 * @returns {string} The generated category identifier.
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

/**
 * Exports the EventCategory class.
 */
module.exports = EventCategory;
