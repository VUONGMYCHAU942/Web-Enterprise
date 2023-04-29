import { Router, Request, Response } from "express";
import { User } from "../models";
import bcrypt from 'bcryptjs'
import { Role } from "../../constant/role";

class UserController {
    router = Router();

    constructor() {
        this.router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/coordinator', this.getAllUserByCoordinator)
        this.router.get('/manager/:role', this.getAllUserByManger)
        this.router.route('/:id')
            .get(this.getOneUser)
            .patch(this.updateUser)
            .delete(this.deleteUser)
        this.router.route('/')
            .post(this.createUser)
    }

    private responseError = (res: Response) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong.'
        })
    }

    // [POST] /user
    private createUser = async(req: Request, res: Response) => {
        try {
            const salt = bcrypt.genSaltSync(10)
            const newUser = new User({
                username: req.body.username as string,
                email: req.body.email as string,
                fullname: req.body.fullname,
                role: req.body.role as number,
                password: bcrypt.hashSync(req.body.password, salt),
                department: req.body.department as string
            })
            await newUser.save()
            res.status(200).json({
                status: 200,
                message: 'Ok'
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [POST] /user/coordinator
    private createUserCoordinator = async(req: Request, res: Response) => {
        try {
            const salt = bcrypt.genSaltSync(10)
            const newCategory = new User({
                username: req.body.username as string,
                email: req.body.email as string,
                fullname: req.body.fullname,
                role: Role['QACoordinator'],
                password: bcrypt.hashSync(req.body.password, salt),
            })
            await newCategory.save()
            res.status(200).json({
                status: 200,
                message: 'Ok'
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [POST] /user/staff
    private createUserStaff = async(req: Request, res: Response) => {
        try {
            const salt = bcrypt.genSaltSync(10)
            const newUser = new User({
                username: req.body.username as string,
                email: req.body.email as string,
                fullname: req.body.fullname,
                role: Role['Staff'],
                password: bcrypt.hashSync(req.body.password, salt),
                department: req.body.department as string
            })
            await newUser.save()
            res.status(200).json({
                status: 200,
                message: 'Ok'
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [PATCH] /user/:id
    private updateUser = async(req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const {username, email, fullname, password, department} = req.body
            const salt = bcrypt.genSaltSync(10)
            const updateResult = await User.findByIdAndUpdate(userId, { $set: {
                ...(username && { username }),
                ...(email && {email}),
                ...(fullname && {fullname}),
                ...(department && {department}),
                ...(password && {password: bcrypt.hashSync(password, salt)})
            }})
            if(updateResult) {
                return res.status(200).json({
                    status: 200,
                    message: 'Oke'
                })
            }
            res.status(400).json({
                status: 400,
                message: 'Update Failed'
            })
        } catch (error) {
            this.responseError(res)
        }
    }


    // [DELETE] /user/:id
    private deleteUser = async(req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const deleteResult = await User.findByIdAndDelete(userId)
            if(deleteResult) {
                return res.status(200).json({
                    status: 200,
                    message: 'Ok'
                })
            }
            res.status(400).json({
                status: 400,
                message: 'Delete Failed'
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [GET] /user/manager/:role
    private getAllUserByManger = async(req: Request, res: Response) => {
        try {
            let query
            const userRole = req.params.role
            if(userRole === 'coordinator') query = {role: Role['QACoordinator']}
            if(userRole === 'staff') query = {role: Role['Staff']}
            query = {role: { $in: [Role['QACoordinator'], Role['Staff']] }}
            const userResult = await User.find(query)
            res.status(200).json({
                status: 200,
                data: userResult
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [GET] /user/coordinator
    private getAllUserByCoordinator = async(req: Request, res: Response) => {
        try {
            const userResult = await User.find({role: Role['Staff']})
            res.status(200).json({
                status: 200,
                data: userResult
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [GET] /user/:id
    private getOneUser = async(req: Request, res: Response) => {
        try {
            const userId = req.params.id
            const userResult = await User.findById(userId)
            res.status(200).json({
                status: 200,
                data: userResult
            })
        } catch (error) {
            this.responseError(res)
        }
    }
}

export default new UserController