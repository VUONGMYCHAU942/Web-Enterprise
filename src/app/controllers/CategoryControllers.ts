import {Router} from 'express'

class CategoryController {
    router = Router();

    constructor() {
        this.router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.route('/:id')
            .get()
            .patch()
            .delete()
        this.router.route('/')
            .get()
            .post()
    }

    private createCategory = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private updateCategory = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private deleteCategory = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getAllCategory = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getOneCategory = () => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default new CategoryController()