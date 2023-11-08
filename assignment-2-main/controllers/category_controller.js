const Category = require("../models/Category_model");
const Event = require("../models/event");
const StatModel = require("../models/recordStats");
const Stat = require("./stats_controller");

/**
 * @module CategoryController
 */

module.exports = {

    /**
     * List all categories.
     * @function
     * @async
     * @param {object} request - Express request object.
     * @param {object} response - Express response object.
     */
    list: async function (request, response) {
        let db = await Category.find()
        response.render("list-category", { records: db });
    },

    /**
     * Render the add category form (GET request).
     * @function
     * @async
     * @param {object} request - Express request object.
     * @param {object} response - Express response object.
     */
    addA1Get: async function (request, response) {
        let db = await Category.find()
        response.render("add-category",{ records: db });
    },

    /**
     * Handle adding a category (POST request).
     * @function
     * @async
     * @param {object} request - Express request object.
     * @param {object} response - Express response object.
     */
    addA1Post: async function (request, response){
        let body = request.body
        let category = new Category({
            name: body.name,
            image: body.picture, 
            desc: body.desc
        });
        console.log(body.picture)
        await category.save()
        Stat.newRecordAdd()
        response.redirect("/category/32578393/list-category")
    },

    /**
     * Render the delete category form (GET request).
     * @function
     * @async
     * @param {object} request - Express request object.
     * @param {object} response - Express response object.
     */
    delA1Get: async function (request, response) {
        let db = await Category.find()
        response.render("delete-category", { records: db })
    },

    /**
     * Handle deleting a category (POST request).
     * @function
     * @async
     * @param {object} request - Express request object.
     * @param {object} response - Express response object.
     */
    delA1Post: async function (request, response){
        try {
            let body = request.body
    
            let del_category = {
                categoryID : body.id
            }
            const delEvent = await Event.deleteMany({categoryId : body.id})
            const JSONresp = await Category.deleteMany({categoryID: body.id})
            Stat.newRecordDelete()
            response.redirect("/category/32578393/list-category")
            
        } catch (err) {
            console.error(err);
            response.redirect("/category/32578393/list-category")
          }
    },

    /**
     * Get categories containing a keyword.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    keywordGET: async function(req,res){
        let db = await Category.find()
        let keyword = req.params.keyword
        ret = []
        console.log(db)
        for (let i = 0; i < db.length; i++){
            if (db[i].desc.includes(keyword)){
                ret.push(db[i])
            }
        }
        console.log(ret, keyword)
        res.render("list-category-keyword", {records: ret, text: keyword})
    },

    /**
     * View details of a specific event.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    viewEvent: async function(req, res){
        const event = await Event.findOne({eventId: req.params.eventId})
        res.render("view-event", {event: event});
    },

    // ASSIGNMENT 2

    /**
     * Handle adding a category (POST request) for assignment 2.
     * @function
     * @async
     * @param {object} request - Express request object.
     * @param {object} response - Express response object.
     */
    addPost: async function (request, response) {
        try {
            let body = request.body;
            console.log(body)
            let category = new Category({
                name: body.name,
                image: body.image,
                desc: body.desc,
            });
    
            await category.save();
            Stat.newRecordAdd()
            response.json({ id: category.categoryID });
    
            
        } catch (err) {
            console.log(err);
            // Handle the error appropriately here
            response.status(500).send(err);
        }
    },


    /**
     * List all categories (GET request) for assignment 2.
     * @function
     * @async
     * @param {object} request - Express request object.
     * @param {object} response - Express response object.
     */
    listGet: async function (request, response) {
        try {
            const categories = await Category.find();
            response.json(categories);
          } catch (err) {
            console.error(err);
            response.status(500).json({ error: "Internal Server Error" });
          }
    },


    /**
     * Handle deleting a category (POST request) for assignment 2.
     * @function
     * @async
     * @param {object} request - Express request object.
     * @param {object} response - Express response object.
     */
    delete: async function (request, response) {
        try {
            let body = request.body
    
            let del_category = {
                categoryID : body.categoryID
            }
            const delEvent = await Event.deleteMany({categoryId : body.categoryId})
            const JSONresp = await Category.deleteMany(del_category)
            Stat.newRecordDelete()
            response.json(JSONresp)
            
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: "Internal Server Error" });
          }
    },

    /**
     * Handle updating a category (POST request) for assignment 2.
     * @function
     * @async
     * @param {object} request - Express request object.
     * @param {object} response - Express response object.
     */
    update: async function (request, response) {
        try {
            let body = request.body

            const JSONresp = await Category.updateOne({ categoryID : body.categoryID}, { name : body.name, desc: body.desc})
            if (JSONresp.modifiedCount == 0){
                response.status(500).json({ error: "Category not found" });
            }
            else{
                Stat.newRecordUpdate()
                response.json(JSONresp)
            }
            
        } catch (err) {
            console.error(err);
            response.status(500).json({ error: "Category not found" });
          }
       
    },
}
