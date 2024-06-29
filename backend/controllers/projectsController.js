const Project = require('../models/project');
const { NotFoundError } = require('../middleware/errors');
const { v4: uuidv4 } = require('uuid');

const formatProjectResponse = (project) => {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    startDate: project.startDate,
    endDate: project.endDate,
    startingBudget: project.startingBudget,
    currentCost: project.currentCost,
    status: project.status,
    dailyEstimatedCost: project.dailyEstimatedCost,
    warning: project.warning
  };
};

exports.getAll = async (req, res, next) => {
  try {
    const projects = await Project.getAllProjects();

    if (!projects.length) {
      throw new NotFoundError('Could not find any projects.');
    }

    const response = {
      projects: projects.map(formatProjectResponse)
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const { status, currentCost } = req.body;

    const projects = await Project.getAllProjects();
    const project = projects.find(p => p.id === projectId);

    if (!project) {
      throw new NotFoundError('Could not find project.');
    }

    if (status) {
      project.status = status;
    }

    // If current cost was manually updated 
    if (currentCost) {
      if (project.currentCost + currentCost > project.startingBudget * 0.5) {
        project.status = 'Forced-Closed';
      } else {
        project.currentCost = project.currentCost + currentCost;
      }
    }

    await Project.saveProject(project);

    res.status(200).json({ message: 'Project updated', project: formatProjectResponse(project) });
  } catch (err) {
    next(err);
  }
};

exports.getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.getProjectById(projectId);

    if (!project) {
      throw new NotFoundError('Could not find project.');
    }

    res.status(200).json(formatProjectResponse(project));
  } catch (err) {
    next(err);
  }
};

exports.addProject = async (req, res, next) => {
  try {
    const { name, description, startDate, endDate, startingBudget, currentCost, status } = req.body;

    const newProject = {
      id: uuidv4(),
      name,
      description,
      startDate,
      endDate,
      startingBudget,
      currentCost,
      status: status || 'Planning'
    };

    await Project.addProject(newProject);

    res.status(201).json({ message: 'Project added', project: formatProjectResponse(newProject) });
  } catch (err) {
    next(err);
  }
};

exports.statistics = async (_, res, next) => {
  try {
    const projects = await Project.getAllProjects();
    const statuses = ["planning", "completed", "forced-closed", "in-progress"];

    const projectsByStatus = statuses.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    projects.forEach(proj => {
      const status = proj.status.toLowerCase();
      if (projectsByStatus.hasOwnProperty(status)) {
        projectsByStatus[status]++;
      }
    });

    res.status(200).json({
      success: true,
      data: projectsByStatus
    });

  } catch (err) {
    next(err);
  }
};

exports.statisticsPerRangePerBudget = async (req, res, next) => {
  try {
    const status = req.params.status;
    console.log(`Received status: ${status}`);
    const projects = await Project.getAllProjects();
    const budgetProjects = projects.filter(proj => proj.status.toLowerCase() == status);
    const ranges = ["0-19999", "20000-1000000"];

    const projectsByBudgetRange = ranges.reduce((acc, range) => {
      acc[range] = 0;
      return acc;
    }, {});

    budgetProjects.forEach(proj => {
      const budget = proj.startingBudget;
      ranges.forEach(range => {
        const [min, max] = range.split('-').map(Number);
        if (budget >= min && budget <= max) {
          projectsByBudgetRange[range]++;
        }
      });
    });

    res.status(200).json({
      success: true,
      data: projectsByBudgetRange
    });

  } catch (err) {
    next(err);
  }
};

exports.statisticsCompleted = async (req, res, next) => {
  try {
    const projects = await Project.getAllProjects();
    const comProjects = projects.filter(proj => proj.status.toLowerCase() == "completed")
    const statuses = ["over-budget", "budget", "remained"];

    const projectsByStatus = statuses.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});

    comProjects.forEach(proj => {
      const { startingBudget, currentCost, dailyEstimatedCost, startDate, endDate } = proj;
      const projectDuration = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
      const estimatedTotalCost = projectDuration * dailyEstimatedCost;

      if (currentCost > startingBudget) {
        projectsByStatus["over-budget"]++;
      } else if (currentCost <= startingBudget && currentCost >= estimatedTotalCost * 0.1) {
        projectsByStatus["budget"]++;
      } else {
        projectsByStatus["remained"]++;
      }
    });

    res.status(200).json({
      success: true,
      data: projectsByStatus
    });

  } catch (err) {
    next(err);
  }
};

//have a db with daily used budget and currently spent budget
exports.dailyStatistics = async (req, res, next) => {
  try {
    const projectId = req.params.projectId; 
    const project = await Project.getProjectById(projectId);

    //assume this is the project having a daily hits of a daily used budget
    const exmaple = {
      id: project.id,
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      startingBudget: project.startingBudget,
      currentCost: project.currentCost,
      dailyCost: [project.dailyEstimatedCost, project.dailyEstimatedCost, "30000", project.dailyEstimatedCost],
      status: project.status,
      dailyEstimatedCost : project.dailyEstimatedCost,
      warning: project.warning
    };

    res.status(200).json({
      success: true,
      data: exmaple
    });

  } catch (err) {
    next(err);
  }
};