import { Router, Request, Response } from "express";
import { Idea } from "../models";
import mongoose from "mongoose";

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

    private responseError = (res: Response) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong.'
        })
    }

    // [POST] /idea/:submissionId
    private createIdea = async(req: Request, res: Response) => {

        const session = await mongoose.startSession();
        try {
            // Start the transaction
            session.startTransaction();
            const newIdea = new Idea({
                ...req.body,
                submission: req.params.submissionId,
                user: req.session.userId
            })
            await newIdea.save({session})



            res.status(200).json({
                status: 200,
                message: 'Ok'
            })

            // Commit the transaction
            await session.commitTransaction();

        } catch (error) {
            await session.abortTransaction();
            this.responseError(res)
        } finally {
            session.endSession();
        }
    }

    // 
    private updateIdea = async(req: Request, res: Response) => {
        try {
            const categoryId = req.params.id
            const updateResult = await Idea.findByIdAndUpdate(categoryId, { $set: req.body})
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

    private deleteIdea = async(req: Request, res: Response) => {
        try {
            const categoryId = req.params.id
            const deleteResult = await Idea.findByIdAndDelete(categoryId)
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

    private getAllIdea = async(req: Request, res: Response) => {
        try {
            
        } catch (error) {
            this.responseError(res)
        }
    }

    private getOneIdea = async(req: Request, res: Response) => {
        try {
            
        } catch (error) {
            this.responseError(res)
        }
    }
}

export default new IdeaController