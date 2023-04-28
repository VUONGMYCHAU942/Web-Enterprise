import { Router } from "express";

class CommentController {
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

    private createComment = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private updateComment = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private deleteComment = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getAllComment = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getOneComment = () => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default new CommentController