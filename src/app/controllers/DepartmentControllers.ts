import { Router, Request, Response } from "express";
import { Department } from "../models";

class DepartmentController {
    router = Router();

    constructor() {
        this.router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.route('/:id')
            .get(this.getOneDepartment)
            .patch(this.updateDepartment)
            .delete(this.deleteDepartment)
        this.router.route('/')
            .get(this.getAllDepartment)
            .post(this.createDepartment)
    }

    private responseError = (res: Response) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong.'
        })
    }

    // [POST] /department
    private createDepartment = async(req: Request, res: Response) => {
        try {
            const newDepartment = new Department(req.body)
            await newDepartment.save()
            res.status(200).json({
                status: 200,
                message: 'Ok'
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [PATCH] /department/:id
    private updateDepartment = async(req: Request, res: Response) => {
        try {
            const departmentId = req.params.id
            const updateResult = await Department.findByIdAndUpdate(departmentId, { $set: req.body})
            if(updateResult) {
                console.log('test')
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

    // [DELETE] /department/:id
    private deleteDepartment = async(req: Request, res: Response) => {
        try {
            const departmentId = req.params.id
            const deleteResult = await Department.findByIdAndDelete(departmentId)
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


    // [GET] /department
    private getAllDepartment = async(req: Request, res: Response) => {
        try {
            const departmentResult = await Department.find()
            res.status(200).json({
                status: 200,
                data: departmentResult
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [GET] /department/:id
    private getOneDepartment = async(req: Request, res: Response) => {
        try {
            const departmentId = req.params.id
            const departmentResult = await Department.findById(departmentId)
            res.status(200).json({
                status: 200,
                data: departmentResult
            })
        } catch (error) {
            this.responseError(res)
        }
    }
}

export default new DepartmentController