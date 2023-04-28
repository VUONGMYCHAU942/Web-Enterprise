import { Router } from "express";

class IdeaController {
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

    private createIdea = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private updateIdea = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private deleteIdea = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getAllIdea = () => {
        try {
            
        } catch (error) {
            
        }
    }

    private getOneIdea = () => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default new IdeaController