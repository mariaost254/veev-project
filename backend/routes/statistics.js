const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/projectsController');


router.get('/', ProjectsController.statistics); 
router.get('/status/:status', ProjectsController.statisticsPerRangePerBudget);
router.get('/completed', ProjectsController.statisticsCompleted); 
router.get('/daily', ProjectsController.dailyStatistics);

module.exports = router;
