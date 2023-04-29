import { Router, Request, Response } from "express";
import {Comment} from '../models'
import mongoose from "mongoose";

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
            .post(this.createComment)
    }

    private responseError = (res: Response) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong.'
        })
    }

    private createComment = async(req: Request, res: Response) => {

        const session = await mongoose.startSession();
        try {
            // Start the transaction
            session.startTransaction();

            const {content, anonymousMode, ideaId, commentIdOrigin} = req.body
            const newComment = new Comment({
                content: content,
                anonymousMode: anonymousMode,
                user: req.session.userId,
                idea: ideaId
            })

            if(commentIdOrigin) {
                const savedComment = await newComment.save({ session })

                const updateResult = await Comment.findByIdAndUpdate(commentIdOrigin as string, {
                    $push: { replier: savedComment['_id']  }
                }, { session })

                if(!updateResult) {
                    await session.abortTransaction();
                    return res.status(400).json({
                        status: 400,
                        message: 'Create Comment Failed.'
                    })
                }
            } else {
                await newComment.save({ session })
            }

            // Commit the transaction
            await session.commitTransaction();

            res.status(200).json({
                status: 200,
                message: 'Ok'
            })
        } catch (error) {
            await session.abortTransaction();
            this.responseError(res)
        } finally {
            session.endSession();
        }
    }

    private updateComment = async(req: Request, res: Response) => {
        try {
            const commentId = req.params.id
            const updateResult = await Comment.findByIdAndUpdate(commentId, )
        } catch (error) {
            
        }
    }

    private deleteComment = async(req: Request, res: Response) => {
        try {
            
        } catch (error) {
            
        }
    }

    private getAllComment = async(req: Request, res: Response) => {
        try {
            
        } catch (error) {
            
        }
    }

    private getOneComment = async(req: Request, res: Response) => {
        try {
            
        } catch (error) {
            
        }
    }
}

export default new CommentController