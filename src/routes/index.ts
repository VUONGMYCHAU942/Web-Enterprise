import { Application, Request, Response } from 'express';
import apiRouter from './api';
import managerRenderControllers from '../app/controllers/ManagerRenderControllers';
import coordinatorRenderController from '../app/controllers/CoordinatorRenderController';
import staffRenderControllers from '../app/controllers/StaffRenderControllers';
import auth from '../middleware/auth'
import authControllers from '../app/controllers/AuthControllers';

const routes = (app: Application) => {

    app.use('/login', (req: Request, res: Response) => {
        res.status(200).render('pages/login', {layout: false})
    })

    app.use('/auth', authControllers.router)

    app.use('/api', auth.requireAuth, apiRouter)

    app.use('/manager', auth.requireAuth, auth.accessByRole('QAManager'), managerRenderControllers.router)

    app.use('/coordinator', auth.requireAuth, auth.accessByRole('QACoordinator'), coordinatorRenderController.router)

    app.use('/', auth.requireAuth, auth.accessByRole('Staff'), staffRenderControllers.router)

    app.use('*', (req: Request, res: Response) => {
        res.status(404).json({
            status: 404,
            message: 'dsdas'
        })
    })
};

export default routes;