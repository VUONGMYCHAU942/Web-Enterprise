import { Router, Request, Response } from "express";

class MediaController {
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

    private responseError = (res: Response) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong.'
        })
    }

    private createMedia = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private updateMedia = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private deleteMedia = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getAllMedia = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getOneMedia = () => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default new MediaController