import express from 'express';
import { createProject,generateProjectInsights,getMyProjects, getProjectById, updateProjectScript } from '../controllers/project.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

export const projectRouter=express.Router();

projectRouter.post('/',isAuthenticated,createProject);
projectRouter.get('/',isAuthenticated,getMyProjects);
projectRouter.get('/:id',isAuthenticated,getProjectById);
projectRouter.put('/:id/script',isAuthenticated,updateProjectScript);
projectRouter.get('/:id/insights',isAuthenticated,generateProjectInsights);