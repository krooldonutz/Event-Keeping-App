const Stats = require("../models/recordStats");
const Categories = require("../models/Category_model");
const Events = require("../models/event");

/**
 * @module StatsController
 */

module.exports = {

    /**
     * Initialize the statistics.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    init: async function (req,res){
        const stat = await Stats.findOne({name: "stats"})

        if (!stat){
            const stat = new Stats({name: "stats"})
            await stat.save()
        }
    },

    /**
     * Update the statistics for a new record addition.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    newRecordAdd : async function (req, res){
        const stat = await Stats.findOneAndUpdate({name: "stats"}, {$inc: {recordsCreated: 1}})
        await stat.save()
    },

    /**
     * Update the statistics for a record deletion.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    newRecordDelete : async function (req, res){
        const stat = await Stats.findOneAndUpdate({name: "stats"}, {$inc: {recordsDeleted: 1}})
        await stat.save()
    },

    /**
     * Update the statistics for a record update.
     * @function
     * @async
     * @param {object} req - Express request object.
     * @param {object} res - Express response object.
     */
    newRecordUpdate : async function (req, res){
        const stat = await Stats.findOneAndUpdate({name: "stats"}, {$inc: {recordsUpdated: 1}})
        await stat.save()
    },

    getRecordCont : async function (req, res){
        let record = await Stats.findOne({name: "stats"});
        res.json(record);
    }
}
