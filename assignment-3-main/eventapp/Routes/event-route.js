const express = require('express');
const eventCont = require('../controllers/event-controller');
const router = express.Router();

/**
 * @module EventRoutes
 */

// Assignment 2 endpoints

/**
 * Create a new event.
 * @function
 * @name POST /cherylyn/api/v1/createEvent
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.post("/cherylyn/api/v1/createEvent", eventCont.createEvent);

/**
 * Get a list of all events.
 * @function
 * @name GET /cherylyn/api/v1/getAll
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/cherylyn/api/v1/getAll", eventCont.getAll);

/**
 * Delete an event by its ID.
 * @function
 * @name DELETE /cherylyn/api/v1/deleteById
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.delete("/cherylyn/api/v1/deleteById", eventCont.deleteById);

/**
 * Update an event by its ID.
 * @function
 * @name PUT /cherylyn/api/v1/updateById
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.put("/cherylyn/api/v1/updateById", eventCont.updateById);

// Assignment 1 endpoints

/**
 * Render the index page.
 * @function
 * @name GET /
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/", eventCont.index);

/**
 * Render the form to add a new event (GET request).
 * @function
 * @name GET /cherylyn/event/add
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/cherylyn/event/add", eventCont.addEventGet);

/**
 * Add a new event (POST request).
 * @function
 * @name POST /cherylyn/event/add
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.post("/cherylyn/event/add", eventCont.addEventPost);

/**
 * Render the list of all events.
 * @function
 * @name GET /cherylyn/event/listall
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/cherylyn/event/listall", eventCont.listEvent);

/**
 * Render the list of sold-out events.
 * @function
 * @name GET /cherylyn/event/soldout
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/cherylyn/event/soldout", eventCont.soldOutEvent);

/**
 * View events belonging to a specific category.
 * @function
 * @name GET /cherylyn/category/:categoryID
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/cherylyn/category/:categoryID", eventCont.viewEvent);

/**
 * Render the delete event form (GET request).
 * @function
 * @name GET /cherylyn/event/remove/
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/cherylyn/event/remove/", eventCont.deleteEventGet);

router.get("/cherylyn/event/count", eventCont.numOfEvent);

module.exports = router;
