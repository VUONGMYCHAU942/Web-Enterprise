import { Router, Request, Response } from "express";
import { User } from "../models";
import bcrypt from 'bcryptjs'
import { Role } from "../../constant/role";

class AuthController {
    private QA_MANAGER_PATH = '/manager'
    private QA_COORDINATOR_PATH = '/coordinator'
    private STAFF_PATH = '/'
    private LOGIN_REDIRECT = '/login'
    router = Router();

    constructor() {
        this.router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/login', this.login)
        this.router.get('/logout', this.logout)
    }

    private responseInvalid = (res: Response) => {
        res.status(401).json({
            status: 401,
            message: 'Username or password is incorrect'
        }) 
    }

    private responseError = (res: Response) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong.'
        })
    }

    private login = async(req: Request, res: Response) => {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username: username})
            if(!user) return this.responseInvalid(res)

            const hashedPassword = user.password!
            const check = bcrypt.compareSync(password, hashedPassword)
            if(!check) return this.responseInvalid(res);

            const role = user.role

            req.session.email = user['email']
            req.session.fullname = user['fullname']
            req.session.userId = String(user['_id'])

            // QA Manager
            if(role === Role['QAManager']) {
                req.session.role = Role['QAManager']
                req.session.department = null
                return res.redirect(this.QA_MANAGER_PATH)
            }

            // QA Coordinator
            if(role === Role['QACoordinator']) {
                req.session.role = Role['QACoordinator']
                req.session.department = null
                return res.redirect(this.QA_COORDINATOR_PATH)
            }

            // Staff
            if(role === Role['Staff']){
                req.session.role = Role['Staff']
                req.session.department = String(user['department'])
                return res.redirect(this.STAFF_PATH)
            }
            
            return res.redirect(this.LOGIN_REDIRECT)
        } catch (error) {
            this.responseError(res)
        }
    }

    private logout = async(req: Request, res: Response) => {
        if (req.session) {
            return req.session.destroy((err) => {
              if (err) return res.status(400).json('Unable to log out');
              return res.redirect(this.LOGIN_REDIRECT);
            });
        }
        return res.end();
    }
}

export default new AuthController