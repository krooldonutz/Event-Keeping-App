/**
 * Represents an event.
 * @class
 */
class Event {
  /**
   * Create an event.
   * @constructor
   * @param {string} name - The name of the event.
   * @param {string} [description=''] - The description of the event.
   * @param {Date} startDateTime - The start date and time of the event.
   * @param {number} duration - The duration of the event in minutes.
   * @param {boolean} [isActive=true] - Indicates if the event is active.
   * @param {string} image - The image path of the event.
   * @param {number} [capacity=1000] - The maximum capacity of the event.
   * @param {number} [ticketsAvailable=capacity] - The number of available tickets for the event.
   * @param {string} categoryId - The ID of the event's category.
   */
  constructor(
    name,
    description = '',
    startDateTime,
    duration,
    isActive = true,
    image,
    capacity = 1000,
    ticketsAvailable = capacity,
    categoryId
  ) {
    /**
     * The unique identifier of the event.
     * @member {string}
     */
    this.id = generateAlphanumericEvents();
    /**
     * The name of the event.
     * @member {string}
     */
    this.name = name;
    /**
     * The description of the event.
     * @member {string}
     */
    this.description = description;
    /**
     * The start date and time of the event.
     * @member {Date}
     */
    this.startDateTime = startDateTime;
    /**
     * The duration of the event in minutes.
     * @member {number}
     */
    this.duration = duration;
    /**
     * Indicates if the event is active.
     * @member {boolean}
     */
    this.isActive = isActive;
    /**
     * The image path of the event.
     * @member {string}
     */
    this.image = '/' + image;

    // Set default capacity if not provided
    if (capacity === '') {
      this.capacity = 1000;
    } else {
      this.capacity = capacity;
    }

    // Set default tickets available if not provided
    if (ticketsAvailable === '') {
      this.ticketsAvailable = this.capacity;
    } else {
      this.ticketsAvailable = ticketsAvailable;
    }

    /**
     * The ID of the event's category.
     * @member {string}
     */
    this.categoryId = categoryId;
  }
}


/**
 * Generates a random alphanumeric event identifier.
 * @function
 * @returns {string} The generated event identifier.
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
 * Exports the Event class.
 */
module.exports = Event;
