import { Router } from "express";

class UserController {
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

    private createUser = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private updateUser = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private deleteUser = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getAllUser = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getOneUser = () => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default new UserController