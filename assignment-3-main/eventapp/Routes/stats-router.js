const express = require('express');
const stats = require('../controllers/stats_controller');
const router = express.Router();

router.get("/cherylyn/g2/count", stats.getRecordCont);

module.exports = router;

