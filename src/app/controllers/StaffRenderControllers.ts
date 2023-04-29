import {Router, Response, Request} from 'express'
import {Submission, Idea, Category} from '../models'

class StaffRenderController {
    router = Router();

    constructor() {
        this.router;
        this.initRoutes();
    }

    private initRoutes() {
        this.router.get('/sharing', this.sharing)
        this.router.get('/history', this.history)
        this.router.get('/sharing/:submissionId', this.getAnIdeaSubmission)
        this.router.get('/', (req: Request, res: Response) => {
            res.redirect('/sharing')
        })
    }

    // [GET] /sharing
    private async sharing(req: Request, res: Response) {
        try {
            const submisison = await Submission.find()
            res.status(200).render('pages/sharing', {
                layout: 'layout/index',
                role: 'staff',
                title: 'Idea Sharing',
                homePath: '/',
                active: 'sharing',
                data: submisison,
                user: req.session.email
            });
        } catch (error) {
            console.log(error)
        }
    }
    
    // [GET] /history
    private history(req: Request, res: Response) {
        try {
            res.status(200).render('pages/history', {
                layout: 'layout/index',
                role: 'staff',
                title: 'History',
                homePath: '/',
                active: 'history',
                user: req.session.email
            })
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /sharing/:submissionId
    private async getAnIdeaSubmission(req: Request, res: Response) {
        try {
            const submissionId = req.params.submissionId
            const submission = await Submission.findById(submissionId)
            const category = await Category.find()
            res.status(200).render('pages/idea-submission', {
                layout: 'layout/index',
                role: 'staff',
                title: submission?.name,
                subBreadCrumb: '/sharing',
                actionHeader: 'idea-submission',
                category,
                homePath: '/',
                active: 'sharing',
                user: req.session.email
            })
        } catch (error) {
            console.log(error)
        }
    }

    // [GET] /sharing/:slug/:ideaId
    private async showIdeasOfSubmission(req: Request, res: Response) {
        try {
            const ideaId = req.params.ideaId
            const idea = await Idea.findById(ideaId).populate('submission')
            res.status(200).render('pages/idea-submission', {
                layout: 'layout/index',
                role: 'staff',
                title: idea?.title,
                subBreadCrumb: '/sharing',
                subBreadCrumbNext: {
                    link: `/sharing/${idea?.submission}`,
                    title: (idea?.submission as any).name
                },
                homePath: '/',
                active: 'sharing',
                user: req.session.email
            })
        } catch (error) {
            console.log(error)
        }
    }


}

export default new StaffRenderController