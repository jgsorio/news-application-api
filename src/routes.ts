import { Router } from "express";
import NewsController from "./controllers/NewsController";
import Auth from "./middlewares/Auth";
import UserController from "./controllers/UserController";
import LoginController from "./controllers/LoginController";
import { config } from 'dotenv';
import multer from 'multer';
import storage from './helpers/storage';

config();

const router = Router();

const upload = multer({ storage: storage });

router.post('/register', UserController.create);
router.post('/login', LoginController.login);

router.get('/news', Auth, NewsController.getAll);
router.get('/news/:id', Auth, NewsController.getById);    
router.post('/news', Auth, upload.single('image'),  NewsController.create);    
router.put('/news/:id', Auth, NewsController.update); 
router.delete('/news/:id', Auth, NewsController.delete);

export default router;
