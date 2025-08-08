import { Router } from 'express';
import requestValidator from '../../middlewares/requestValidator';
import { UserControllers } from './user.controller';
import { createUserZodSchema } from './user.validator';

const router = Router();

router.post(
    '/register',
    requestValidator(createUserZodSchema),
    UserControllers.createUser
);
router.get('/', UserControllers.getUsers);

export const UserRoutes = router;
