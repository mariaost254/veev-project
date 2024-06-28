const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../databases/projects.json');
const statuses = ["planning", "completed", "force-closed", "in-progress"];

const readProjectsFromFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

const writeProjectsToFile = (projects) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(projects, null, 2), 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

const calculateProjectCosts = (project) => {
  const currentDate = new Date();
  const startDate = new Date(project.startDate);
  const days = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
  const cost = project.startingBudget * 0.1; 
  project.currentCost = cost * days;

  const endDate = new Date(project.endDate);
  const daysTotal = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
  project.dailyEstimatedCost = cost;
  project.warning = cost * daysTotal > project.startingBudget ? "Not enough budget" : "";
};

const getAllProjects = () => {
  return readProjectsFromFile().then(projects => {
    projects.forEach(project => calculateProjectCosts(project));
    return projects;
  });
};

const getProjectById = (projectId) => {
  return getAllProjects().then(projects => {
    const project = projects.find(project => project.id === projectId);
    if (project && project.status.toLowerCase() !== "completed" && project.status.toLowerCase() !== "force-closed") {
      calculateProjectCosts(project);
    }
    return project;
  });
};

const saveProject = (updatedProject) => {
  if (!statuses.includes(updatedProject.status)) {
    throw new Error(`Invalid status: ${updatedProject.status}`);
  }
  return getAllProjects().then(projects => {
    const index = projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      projects[index] = updatedProject;
    } else {
      projects.push(updatedProject);
    }
    return writeProjectsToFile(projects);
  });
};

const addProject = (newProject) => {
  if (!statuses.includes(newProject.status)) {
    throw new Error(`Invalid status: ${newProject.status}`);
  }
  return getAllProjects().then(projects => {
    projects.push(newProject);
    return writeProjectsToFile(projects);
  });
};


module.exports = {
  getAllProjects,
  getProjectById,
  saveProject,
  addProject
};