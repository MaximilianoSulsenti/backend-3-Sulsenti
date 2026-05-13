import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();


router.get('/', usersController.getAllUsers);
router.get('/:uid', usersController.getUser);
router.post('/', usersController.createUser); // Nueva ruta para crear usuario
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);


export default router;