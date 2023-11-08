const EventModel = require("../models/event");
const CategoryModel = require("../models/Category_model");
const StatModel = require("../models/recordStats");
const Stat = require("./stats_controller");

/**
 * @module EventController
 */

module.exports = {

    /**
     * Create a new event.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    createEvent: async function (req, res) {
        try {
            let input = req.body;

            let aEvent = new EventModel({
                name: input.name,
                description: input.description,
                startDateTime: input.startDateTime,
                duration: parseInt(input.duration),
                capacity: parseInt(input.capacity),
                categoryId: input.categoryId,
                image: input.image
            });

            // Save the event
            await aEvent.save();
            Stat.newRecordAdd()
            const categoryIdArr = input.categoryId.split(',');

            // Iterate through the category IDs and put reference inside categoryList
            for (let i = 0; i < categoryIdArr.length; i++) {
                const categoryReference = await CategoryModel.findOne({ categoryID: categoryIdArr[i] });
                if (categoryReference) {
                    aEvent.categoryList.push(categoryReference._id);
                }
            }

            // Save the event after all associations are made
            await aEvent.save();

            for (let i = 0; i < categoryIdArr.length; i++) {
                let thisCategoryId = categoryIdArr[i];
                let theCategory = await CategoryModel.findOne({ categoryID: thisCategoryId });

                if (theCategory != null) {
                    theCategory.eventsList.push(aEvent._id);
                    await theCategory.save();
                } else {
                    // If a category doesn't exist, you may want to log it or handle it differently.
                    console.log(`Category ID ${thisCategoryId} not found.`);
                }
            }

            // Send a response after all operations are complete
            res.status(200).json({ eventId: aEvent.eventId });

        } catch (error) {
            // Handle errors
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    },

    /**
     * Get all events with category information.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    getAll: async function (req, res) {
        let Events = await EventModel.find().populate("categoryList");
        res.json(Events);
    },

    /**
     * Delete an event by its ID and update associated categories.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    deleteById: async function (req, res) {
        let thisEventId = req.body.eventId;
        let theEvent = await EventModel.findOne({ eventId: thisEventId });

        if (theEvent != null) {
            let _id = theEvent._id;
            let responseObject = await EventModel.deleteOne(_id);

            let thisCategoryId = theEvent.categoryId;
            const categoryIdArr = thisCategoryId.split(',');

            for (let i = 0; i < categoryIdArr.length; i++) {
                let thisCategoryId = categoryIdArr[i];
                let theCategory = await CategoryModel.findOne({ categoryID: thisCategoryId });

                if (theCategory != null) {
                    await theCategory.eventsList.pull(_id);
                    await theCategory.save();
                } else {
                    // If a category doesn't exist, you may want to log it or handle it differently.
                    console.log(`Category ID ${thisCategoryId} not found.`);
                }
            }
            Stat.newRecordDelete()
            res.status(200).json(responseObject);
        }
        else{
            res.status(500).json("Event Id not Exists");
        }
    },

    /**
     * Update an event by its ID.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    updateById: async function (req, res) {
        let thisEventId = req.body.eventId;
        let idExists = await EventModel.findOne({ eventId: thisEventId });

        if (idExists != null) {
            let updateData = {
                name: req.body.name,
                capacity: parseInt(req.body.capacity),
            }
            await EventModel.updateOne({ eventId: thisEventId }, updateData)
            let responseObject = {
                "status": "updated successfully"
            }
            res.status(200).json(responseObject);
            Stat.newRecordUpdate()
        }
        else{
            res.status(500).json("Event Id not Exists");
        }
    },

    // assignment 1 endpoints

    /**
     * Render the index page with event and category statistics.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    index: async function (req, res) {
        let eventCounter = await EventModel.count();
        let categoryCounter = await CategoryModel.count();
        let counter = await StatModel.findOne({name: "stats"});
        res.render("index", { eventNumber: eventCounter, categoryNumber: categoryCounter, recordsCounter: counter });
    },

    /**
     * Render the add event form (GET request).
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    addEventGet: async function (req, res) {
        res.render('add-events'); 
    },

    /**
     * Handle adding an event (POST request).
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    addEventPost: async function (req, res) {
        let input = req.body;
        let aEvent = new EventModel({ 
            name: input.name, 
            description: input.description, 
            startDateTime: input.startDateTime, 
            duration: input.duration, 
            isActive: Boolean(input.isActive), 
            image: input.picture, 
            capacity: input.capacity, 
            ticketsAvailable: input.ticketsAvailable || (input.ticketsAvailable == '0' ? input.ticketsAvailable : input.capacity),
            categoryId: input.categoryId });

        const categoryIdArr = input.categoryId.split(',');

        // Iterate through the category IDs and put reference inside categoryList
        for (let i = 0; i < categoryIdArr.length; i++) {
            const categoryReference = await CategoryModel.findOne({ categoryID: categoryIdArr[i] });
            if (categoryReference) {
                aEvent.categoryList.push(categoryReference._id);
            }
        }
        await aEvent.save();
        
        for (let i = 0; i < categoryIdArr.length; i++) {
            let thisCategoryId = categoryIdArr[i];
            let theCategory = await CategoryModel.findOne({ categoryID: thisCategoryId });

            if (theCategory != null) {
                theCategory.eventsList.push(aEvent._id);
                await theCategory.save();
            } else {
                // If a category doesn't exist, you may want to log it or handle it differently.
                console.log(`Category ID ${thisCategoryId} not found.`);
            }
        }
        Stat.newRecordAdd()
        res.redirect('/cherylyn/event/listall');
    },

    /**
     * Render the list of all events.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    listEvent: async function (req, res) {
        let db = await EventModel.find();
        res.render('list-event', { events: db }); 
    },

    /**
     * Render the list of sold-out events.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    soldOutEvent: async function (req, res) {
        let soldOutDb = await EventModel.find({ 'ticketsAvailable': 0 });
        res.render('sold-out-event', { events: soldOutDb });
    },

    /**
     * View events belonging to a specific category.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    viewEvent: async function (req, res) {
        let events = []
        let catID = req.params.categoryID;
        let theCategory = await CategoryModel.findOne({ categoryID: catID });

        if (theCategory != null) {
            for (let i = 0; i < theCategory.eventsList.length; i++) {
                events.push(await EventModel.findOne({ _id: theCategory.eventsList[i]}));
            }
            res.render('category-detail', { category: theCategory, records: events });
        }
        else{
            // If no category with the given ID is found, send a 404 error
            res.status(404).send('Category not found.');
        }
    },

    /**
     * Render the delete event form (GET request).
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    deleteEventGet: async function (req, res) {
        let idDelete = req.query.id;
        if (idDelete){
            // Attempt to delete the event
            const result = await EventModel.deleteOne({ eventId: idDelete });
            // Successfully deleted, update statistics
            Stat.newRecordDelete();
            return res.redirect('/cherylyn/event/listall')
        }
        else{
            // No ID specified, send a 404 error
            return res.status(404).send("No ID specified");
        }
    }      
};
