import { Router, Request, Response } from "express";
import { Category, Submission, User } from "../models";
import { Role } from "../../constant/role";

class ManagerRenderController {
    router = Router();

    constructor() {
        this.router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/dashboard', this.dashboard)
        this.router.get('/category', this.category)
        this.router.get('/submission', this.submission)
        this.router.get('/accounts', this.account)
        this.router.get('/', (req: Request, res: Response) => {
            res.redirect('/manager/dashboard')
        })
    }

    // [GET] /manager/dashboard
    private dashboard(req: Request, res: Response) {
        try {
            res.status(200).render('pages/dashboard-manager', {
                layout: 'layout/index',
                role: 'manager',
                title: 'Dashboard',
                homePath: '/manager',
                active: 'dashboard',
                user: req.session.email
            });
        } catch (error) {
            console.log(error)
        }
    }
    
    // [GET] /manager/category
    private async category(req: Request, res: Response) {
        try {
            const category = await Category.find()
            res.status(200).render('pages/category', {
                layout: 'layout/index',
                role: 'manager',
                title: 'Category',
                homePath: '/manager',
                active: 'category',
                actionHeader: 'manager-category',
                data: category
            })
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /manager/submission
    private async submission(req: Request, res: Response) {
        try {
            const submission = await Submission.find().populate('media')
            res.status(200).render('pages/submission', {
                layout: 'layout/index',
                role: 'manager',
                title: 'Submission',
                homePath: '/manager',
                active: 'submission',
                actionHeader: 'manager-submission',
                data: submission
            })
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /manager/accounts
    private async account(req: Request, res: Response) {
        try {
            const accounts = await User.find({role: Role['QACoordinator']})
            res.status(200).render('pages/account-manager', {
                layout: 'layout/index',
                role: 'manager',
                title: 'Coordinator Accounts',
                homePath: '/manager',
                active: 'accounts',
                actionHeader: 'manager-accounts',
                data: accounts
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default new ManagerRenderController