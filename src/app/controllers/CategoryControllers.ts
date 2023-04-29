import {Router, Request, Response} from 'express'
import {Category} from '../models'

class CategoryController {
    router = Router();

    constructor() {
        this.router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.route('/:id')
            .get(this.getOneCategory)
            .patch(this.updateCategory)
            .delete(this.deleteCategory)
        this.router.route('/')
            .get(this.getAllCategory)
            .post(this.createCategory)
    }

    private responseError = (res: Response) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong.'
        })
    }

    // [POST] /category
    private createCategory = async(req: Request, res: Response) => {
        try {
            const newCategory = new Category(req.body)
            await newCategory.save()
            res.status(200).json({
                status: 200,
                message: 'Ok'
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [PATCH] /category/:id
    private updateCategory = async(req: Request, res: Response) => {
        try {
            const categoryId = req.params.id
            const updateResult = await Category.findByIdAndUpdate(categoryId, { $set: req.body})
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

    // [DELETE] /category/:id
    private deleteCategory = async(req: Request, res: Response) => {
        try {
            const categoryId = req.params.id
            const deleteResult = await Category.findByIdAndDelete(categoryId)
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

    // [GET] /category
    private getAllCategory = async(req: Request, res: Response) => {
        try {
            const categoryResult = await Category.find()
            res.status(200).json({
                status: 200,
                data: categoryResult
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [GET] /category/:id
    private getOneCategory = async(req: Request, res: Response) => {
        try {
            const categoryId = req.params.id
            const categoryResult = await Category.findById(categoryId)
            res.status(200).json({
                status: 200,
                data: categoryResult
            })
        } catch (error) {
            this.responseError(res)
        }
    }
}

export default new CategoryController()