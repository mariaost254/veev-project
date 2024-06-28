const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/projectsController');
const apicache = require('apicache');
let cache = apicache.middleware;
const checkAuth = require('../middleware/auth');


router.get('/',cache('2 minutes'), ProjectsController.getAll); //cached
router.get('/:projectId', ProjectsController.getProjectById);
router.patch('/:projectId', ProjectsController.updateProject);
router.post('/', checkAuth, ProjectsController.addProject); // jwt protected

router.get('/statistics', ProjectsController.statistics);
router.get('/statistics/status', ProjectsController.statisticsPerRangePerBudget);
router.get('/statistics/completed', ProjectsController.statisticsCompleted);
router.get('/statistics/daily', ProjectsController.dailyStatistics);

module.exports = router;
