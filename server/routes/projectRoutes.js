import express from 'express';
import { createProject,generateProjectInsights,getMyProjects, getProjectById, updateProjectScript, createProjectFromUpload } from '../controllers/project.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    // Create folder if not exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Unique filename: timestamp + random + original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 500 * 1024 * 1024 } // 500MB limit - adjust as needed
});

export const projectRouter=express.Router();

projectRouter.post('/',isAuthenticated,createProject);
projectRouter.get('/',isAuthenticated,getMyProjects);
projectRouter.get('/:id',isAuthenticated,getProjectById);
projectRouter.put('/:id/script',isAuthenticated,updateProjectScript);
projectRouter.get('/:id/insights',isAuthenticated,generateProjectInsights);
projectRouter.post('/upload', isAuthenticated, upload.single('file'), createProjectFromUpload);