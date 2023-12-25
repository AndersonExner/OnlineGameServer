import express from 'express';
import { loginValidation } from '../middlewares/login-validation.middleware';
import { AuthenticantionController } from '../controllers';


export default () => {
    const router = express.Router();

    const authController = new AuthenticantionController();

    router.post('/login', loginValidation, authController.login);

    return router;
};