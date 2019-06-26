import express from 'express';

import { ideaApiPrefix } from '../helpers/defaults';
import IdeaController from '../controllers/Idea';
import authenticate from '../middlewares/auth';

const ideaRoutes = express.Router();

ideaRoutes.post(`${ideaApiPrefix}`, authenticate, IdeaController.createIdea);

ideaRoutes.get(`${ideaApiPrefix}`, authenticate, IdeaController.getAllIdeas);
ideaRoutes.get(`${ideaApiPrefix}/:ideaId`, authenticate, IdeaController.getIdea);

ideaRoutes.put(`${ideaApiPrefix}/:ideaId`, authenticate, IdeaController.updateIdea);

ideaRoutes.delete(`${ideaApiPrefix}/:ideaId`, authenticate, IdeaController.deleteIdea);

export default ideaRoutes;
