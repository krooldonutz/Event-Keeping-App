const express = require("express");
const categoryCont = require("../controllers/category_controller");
const Categories = require("../models/Category_model");
const Events = require("../models/event");

const router = express.Router();

/**
 * @module CategoryRoutes
 */

/**
 * Get a list of categories.
 * @function
 * @name GET /category/32578393/list-category
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/category/32578393/list-category", categoryCont.list);

/**
 * Render the form to add a new category (GET request).
 * @function
 * @name GET /category/32578393/add-category
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/category/32578393/add-category", categoryCont.addA1Get);

/**
 * Add a new category (POST request).
 * @function
 * @name POST /category/32578393/add-category
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.post("/category/32578393/add-category", categoryCont.addA1Post);

/**
 * Render the form to delete a category (GET request).
 * @function
 * @name GET /category/32578393/delete-category
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/category/32578393/delete-category", categoryCont.delA1Get);

/**
 * Delete a category (POST request).
 * @function
 * @name POST /category/32578393/delete-category
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.post("/category/32578393/delete-category", categoryCont.delA1Post);

/**
 * Get a list of categories with a specific keyword.
 * @function
 * @name GET /category/32578393/list-keyword/:keyword
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/category/32578393/list-keyword/:keyword", categoryCont.keywordGET);

/**
 * View details of a specific event.
 * @function
 * @name GET /category/32578393/view-event/:eventId
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/category/32578393/view-event/:eventId", categoryCont.viewEvent);

// Assignment 2

/**
 * Create a new category (POST request).
 * @function
 * @name POST /api/v1/category/32578393/add
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.post("/api/v1/category/32578393/add" , categoryCont.addPost );

/**
 * Get a list of categories (GET request).
 * @function
 * @name GET /api/v1/category/32578393/list
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.get("/api/v1/category/32578393/list" , categoryCont.listGet );

/**
 * Delete a category (DELETE request).
 * @function
 * @name DELETE /api/v1/category/32578393/delete
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.delete("/api/v1/category/32578393/delete" , categoryCont.delete);

/**
 * Update a category (PATCH request).
 * @function
 * @name PATCH /api/v1/category/32578393/update
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
router.patch("/api/v1/category/32578393/update", categoryCont.update);

router.get("/api/v1/category/32578393/count", categoryCont.numOfCateg)

module.exports = router;
