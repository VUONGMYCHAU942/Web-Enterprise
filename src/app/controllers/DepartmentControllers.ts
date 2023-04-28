import { Router } from "express";

class DepartmentController {
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

    private createDepartment = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private updateDepartment = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private deleteDepartment = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getAllDepartment = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getOneDepartment = () => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default new DepartmentController