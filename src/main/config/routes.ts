import express, {Express} from 'express';
import userRoutes from '../../app/features/users/presentation/routes/user.routes';
import loginRoutes from '../../app/features/authentication/presentation/routes/login.routes';


export default (app: Express) => {
    app.get('/', (req, res) => res.status(200).json('API running...')  )
    app.use(userRoutes());
    app.use(loginRoutes());
};