import {Router} from 'express'
import categoryControllers from '../app/controllers/CategoryControllers'
import commentControllers from '../app/controllers/CommentControllers'
import ideaControllers from '../app/controllers/IdeaControllers'
import departmentControllers from '../app/controllers/DepartmentControllers'
import mediaControllers from '../app/controllers/MediaControllers'
import submissionControllers from '../app/controllers/SubmissionControllers'
import userControllers from '../app/controllers/UserControllers'

const apiRouter = Router()

apiRouter.use('/category', categoryControllers.router)
apiRouter.use('/idea', ideaControllers.router)
apiRouter.use('/comment', commentControllers.router)
apiRouter.use('/user', userControllers.router)
apiRouter.use('/media', mediaControllers.router)
apiRouter.use('/department', departmentControllers.router)
apiRouter.use('/submission', submissionControllers.router)

export default apiRouter