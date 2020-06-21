import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();


router.post('/add', UserController.add);
router.post('/get', UserController.get);
router.post('/validate', UserController.validate);
router.get('/list', UserController.list);
router.put('/update/:id', UserController.update);
router.delete('/delete/:id', UserController.delete);

export default router;