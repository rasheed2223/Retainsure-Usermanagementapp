import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Public routes
router.post('/login', UserController.login);
router.post('/users', UserController.createUser);

// Protected routes (require authentication)
router.get('/users', authenticateToken, UserController.getAllUsers);
router.get('/user/:id', authenticateToken, UserController.getUserById);
router.put('/user/:id', authenticateToken, UserController.updateUser);
router.delete('/user/:id', authenticateToken, UserController.deleteUser);
router.get('/search', authenticateToken, UserController.searchUsers);

export default router;