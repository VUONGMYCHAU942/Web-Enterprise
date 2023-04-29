import { Router, Request, Response } from "express";
import { Submission, Media } from "../models";
import mongoose from 'mongoose'
import googleDrive from '../../utils/google/drive'

class SubmissionController {
    router = Router();

    constructor() {
        this.router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.route('/:id')
            .get(this.getOneSubmission)
            .patch(this.updateSubmission)
            .delete(this.deleteSubmission)
        this.router.route('/')
            .get(this.getAllSubmission)
            .post(this.createSubmission)
    }

    private responseError = (res: Response) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong.'
        })
    }

    // [POST] /submission
    private createSubmission = async(req: Request, res: Response) => {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const { name } = req.body
            const folderResult = await googleDrive.createFolder(name)!
            const folderIdDrive = folderResult?.id 

            // Generate public path of folder
            const generateResult = await googleDrive.generatePublicUrl(folderIdDrive!)
            const publicFolder = generateResult?.webViewLink
            
            const newMedia = new Media({
                folderDriveId: folderIdDrive!,
                folderDrivePath: publicFolder!,
            })
            const savedMedia = await newMedia.save()

            const newSubmission = new Submission({
                name: req.body.name,
                description: req.body.description,
                closureDate: req.body.closureDate,
                finalClosureDate: req.body.finalClosureDate,
                media: savedMedia['_id']
            })
            await newSubmission.save({session})
            
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

    // [PATCH] /submission/:id
    private updateSubmission = async(req: Request, res: Response) => {
        try {
            const {name, description, closureDate, finalClosureDate} = req.body
            const submissionId = req.params.id
            const updateResult = await Submission.findByIdAndUpdate(submissionId, { $set: {
                ...(name && { name }),
                ...(description && {description}),
                ...(closureDate && {closureDate}),
                ...(finalClosureDate && {finalClosureDate}),
            }})
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

    // [DELETE] /submission/:id
    private deleteSubmission = async(req: Request, res: Response) => {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            const submissionId = req.params.id
            const submission = await Submission.findById(submissionId).populate('media')
            const deleteMediaResult = await Media.findByIdAndDelete(submission?.media, {session})
            if(!deleteMediaResult) {
                await session.abortTransaction();
                return res.status(200).json({
                    status: 400,
                    message: 'Delete Failed'
                })
            }

            const deleteSubmissionResult = await Submission.findByIdAndDelete(submissionId, {session})
            if(!deleteSubmissionResult) {
                await session.abortTransaction();
                return res.status(200).json({
                    status: 400,
                    message: 'Delete Failed'
                })
            }

            const folderDriveId = (submission?.media as any).folderDriveId 
            const removeFolderDrive = await googleDrive.removeFile(folderDriveId)
            if(removeFolderDrive !== 204) {
                await session.abortTransaction();
                return res.status(200).json({
                    status: 400,
                    message: 'Delete Failed'
                })
            }

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

    // [GET] /submission
    private getAllSubmission = async(req: Request, res: Response) => {
        try {
            const submissionResult = await Submission.find()
            res.status(200).json({
                status: 200,
                data: submissionResult
            })
        } catch (error) {
            this.responseError(res)
        }
    }

    // [GET] /submission/:id
    private getOneSubmission = async(req: Request, res: Response) => {
        try {
            const submissionId = req.params.id
            const submissionResult = await Submission.findById(submissionId)
            res.status(200).json({
                status: 200,
                data: submissionResult
            })
        } catch (error) {
            this.responseError(res)
        }
    }
}

export default new SubmissionController