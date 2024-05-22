import { Router } from "express";
import NewsController from "./controllers/NewsController";

const router = Router();

router.get('/news', NewsController.getAll);
router.get('/news/:id', NewsController.getById);    
router.post('/news', NewsController.create);    
router.put('/news/:id', NewsController.update); 
router.delete('/news/:id', NewsController.delete);


export default router;
