const express = require("express");
const app = express();
const path = require("path");
const Event_category = require("./models/event_category");
const Event = require("./models/Event");

// Setting global variables
global.__basedir = __dirname;
const VIEWS_PATH = path.join(__dirname, "/views/"); 
const PORT_NUMBER = 8080;
let db = [];
let eventDb = [];

// Middleware for serving static files
app.use(express.static("node_modules/bootstrap/dist/css"))
app.use(express.static("images"))

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.urlencoded({ extended: true }));

/**
 * Start the server on the specified port.
 * @callback
 */
app.listen(PORT_NUMBER, () => {
	console.log(`Listening on port ${PORT_NUMBER}`);
});

/**
 * Render the index page.
 * @name GET-Homepage
 * @function
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */
app.get("/", function (request, response) {
	response.render("index");
});

/**
 * Renders the page for listing categories.
 * @name GET-ListCategories
 * @function
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */
// list category
app.get("/category/32578393/list-category", function (request, response) {
	response.render("list-category", { records: db });
});

/**
 * Renders the page for adding a new category.
 * @name GET-AddCategoryPage
 * @function
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */
app.get("/category/32578393/add-category", function (request, response) {
	response.render("add-category",{ records: db });
});

/**
 * Adds a new category to the database.
 * @name POST-AddCategory
 * @function
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */
app.post("/category/32578393/add-category" , function (request, response){
    let body = request.body
    console.log(body.picture)
    let newCategory = new Event_category(body.name, body.picture, body.desc)
    db.push(newCategory)
    response.redirect("/category/32578393/list-category")
})

/**
 * Renders the page for deleting a category.
 * @name GET-DeleteCategoryPage
 * @function
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */
app.get("/category/32578393/delete-category" , function (request, response) {
    response.render("delete-category", { records: db })
})

/**
 * Deletes a category from the database.
 * @name POST-DeleteCategory
 * @function
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 */
app.post("/category/32578393/delete-category", function (request, response){
    let idDelete = request.body.id
    let updateDb = db.filter(function(elem) {return elem.id != idDelete})

    db = updateDb
    console.log(db)
    response.redirect("/category/32578393/list-category")
})

/**
 * Renders the page to view details of a specific event.
 * @name GET-ViewEventPage
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get("/category/32578393/view-event/:eventId", function(req, res) {
    let eventId = req.params.eventId;
    let event = eventDb.find(event => event.id === eventId);

    if (event) {
        res.render('view-event', { event: event });
    } else {
        res.status(404).send('Event not found.');
    }
});

/**
 * Lists categories matching a given keyword.
 * @name GET-ListCategoriesByKeyword
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get("/category/32578393/list-keyword/:keyword", function(req,res){
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
})

/**
 * Adds a new event to the event database.
 * @name POST-AddEvent
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.post('/cherylyn/event/add', function(req, res){
    let reqBody = req.body;
    let newEvent = new Event(reqBody.name, reqBody.description, reqBody.startDateTime, reqBody.duration, reqBody.isActive, reqBody.picture, reqBody.capacity, reqBody.ticketsAvailable, reqBody.categoryId);

    console.log(newEvent);
    eventDb.push(newEvent);
    res.redirect('/cherylyn/event/listall');

});

/**
 * Renders the page for adding a new event.
 * @name GET-AddEventPage
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/cherylyn/event/add', function(req, res) {
    res.render('add-events', { records: db }); 
});

/**
 * Lists all events in the event database.
 * @name GET-ListAllEvents
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/cherylyn/event/listall', function(req, res) {
    res.render("list-event", {events: eventDb});
});

/**
 * Lists sold-out events.
 * @name GET-SoldOutEvents
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
let soldOutDb = [];
app.get('/cherylyn/event/soldout', function(req, res) {
    for (let i = 0; i < eventDb.length; i++) {
        if (eventDb[i].ticketsAvailable == 0) {
            soldOutDb.push(eventDb[i]);  
        }
    }
    res.render("sold-out-event", { events: soldOutDb });
});

/**
 * View events within a specific category.
 * @name GET-ViewCategory
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get("/cherylyn/category/:categoryID", function(req, res) {
    let catID = req.params.categoryID;
    let catEvent = []

    for (let i = 0; i < eventDb.length; i++){
        if (eventDb[i].categoryId == catID){
            catEvent.push(eventDb[i])
        }
    }
    for (let i = 0; i < db.length; i++) {
        if (db[i].id == catID) {
            res.render('category-detail', { category: db[i], records: catEvent });
            return; // Return after rendering to avoid additional processing
        }
    }

        // If no category with the given ID is found, send a 404 error
        res.status(404).send('Category not found.');
});

/**
 * Removes an event from the event database.
 * @name GET-RemoveEvent
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/cherylyn/event/remove/', function(req, res){
    let idDelete = req.query.id

    // the function filters out the id that != idDelete then create a new database
    let updateDb = eventDb.filter(function(elem) {return elem.id != idDelete});

    eventDb = updateDb;

    res.redirect('/cherylyn/event/listall')

});

