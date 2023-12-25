import express from 'express';
import { UserController } from '../controllers';
import { createUserValidator } from '../middlewares';

export default () => {
    const router= express.Router();

    const userController = new UserController();

    router.post('/createUser', createUserValidator, userController.createUser)

    return router;
}