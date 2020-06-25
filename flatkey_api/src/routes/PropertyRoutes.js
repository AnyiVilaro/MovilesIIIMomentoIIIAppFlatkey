import { Router } from 'express';
import PropertyController from '../controllers/PropertyController';

const router = Router();


router.post('/add', PropertyController.add);
router.post('/get', PropertyController.get);
router.get('/listByUser', PropertyController.listByUser);
router.get('/listSortedByUser', PropertyController.listSortedByUser);
router.get('/list', PropertyController.list);
router.get('/listSorted', PropertyController.listSorted);
router.put('/update/:id', PropertyController.update);
router.delete('/delete/:id', PropertyController.delete);

export default router;