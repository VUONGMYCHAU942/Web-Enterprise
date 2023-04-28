import { Router } from "express";

class SubmissionController {
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

    private createSubmission = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private updateSubmission = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private deleteSubmission = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getAllSubmission = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getOneSubmission = () => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default new SubmissionController