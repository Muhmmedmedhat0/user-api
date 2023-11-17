import { Router } from 'express';
import { verifyUser } from '../middleware/verify-token';
import { getUser } from '../controllers/user';
const router = Router();

// get user => get
router.get('/:id', verifyUser, getUser);



export default router;
