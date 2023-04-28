import { Application } from 'express';
import apiRouter from './api';
// import adminRouter from './admin';

const routes = (app: Application) => {

    app.use('/api', apiRouter)

    // app.use('/admin', adminRouter)

    // app.use('/', )

    // app.use('*', )
};

export default routes;