import { Request, Response, NextFunction } from "express"
import { Role } from "../constant/role"

class Auth {

    public requireAuth(req: Request, res: Response, next: NextFunction) {
        if (!req.session.userId) return res.redirect('/login');
        return next();
    }

    public accessByRole = (role: 'QAManager' | 'QACoordinator' | 'Staff') => (req: Request, res: Response, next: NextFunction) => {
        if (!req.session.userId) return res.redirect('/login');
        if (req.session.role === Role[role]) return next()
        return res.redirect('back')
    }
}

export default new Auth