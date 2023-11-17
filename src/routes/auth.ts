import { registerValidation, loginValidation } from '../helpers/user-validator';
import { register, login } from '../controllers/auth';
import { Router } from 'express';
const router = Router();



// rigister => post

router.post('/register', registerValidation, register);

// login => post
router.post('/login', loginValidation, login);

export default router;
