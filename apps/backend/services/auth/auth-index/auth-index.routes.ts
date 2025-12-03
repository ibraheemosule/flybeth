import { Router } from 'express';
import { userRoutes } from '../auth-user/auth-user.routes';
import { businessRoutes } from '../auth-business/auth-business.routes';
import { adminRoutes } from '../auth-admin/auth-admin.routes';

const router = Router();

// Mount feature-specific routes
router.use('/user', userRoutes);
router.use('/business', businessRoutes);
router.use('/admin', adminRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth service is healthy',
    features: {
      user: '/api/auth/user/*',
      business: '/api/auth/business/*',
      admin: '/api/auth/admin/*'
    }
  });
});

export default router;