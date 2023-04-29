import {Router, Request, Response} from 'express'
import { Department, User } from '../models';
import { Role } from '../../constant/role';

class CoordinatorRenderController {
    router = Router();

    constructor() {
        this.router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/dashboard', this.dashboard)
        this.router.get('/department', this.department)
        this.router.get('/accounts', this.account)
        this.router.get('/', (req: Request, res: Response) => {
            res.redirect('/coordinator/dashboard')
        })
    }

    // [GET] /coordinator/dashboard
    private dashboard(req: Request, res: Response) {
        try {
            res.status(200).render('pages/dashboard-coordinator', {
                layout: 'layout/index',
                role: 'coordinator',
                title: 'Dashboard',
                homePath: '/coordinator',
                active: 'dashboard',
                user: req.session.email
            });
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /coordinator/department
    private async department(req: Request, res: Response) {
        try {
            const department = await Department.find()
            res.status(200).render('pages/department', {
                layout: 'layout/index',
                role: 'coordinator',
                title: 'Department',
                homePath: '/coordinator',
                active: 'department',
                actionHeader: 'coordinator-department',
                data: department
            });
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /coordinator/accounts
    private async account(req: Request, res: Response) {
        try {
            const accounts = await User.find({role: Role['Staff']}).populate('department')
            console.log(accounts)
            const department = await Department.find()
            res.status(200).render('pages/account-coordinator', {
                layout: 'layout/index',
                role: 'coordinator',
                title: 'Staff Accounts',
                homePath: '/coordinator',
                active: 'accounts',
                actionHeader: 'coordinator-accounts',
                data: accounts,
                department
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export default new CoordinatorRenderController