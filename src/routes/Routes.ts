import { Router } from 'express';
import CarController from '../controllers/CarController';
import Validation from '../middlewares/Validation';

const router = Router();

router.get('/cars', CarController.index);
router.get('/cars/search', CarController.search);


router.get('/car/:id', CarController.findById);
router.post('/car/create', Validation, CarController.create);
router.put('/car/update/:id', CarController.update);
router.delete('/car/delete/:id', CarController.delete);

export default router;
