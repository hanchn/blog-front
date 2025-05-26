import { Router } from 'express';
import homeRouter from './home.js';
import articlesRouter from './articles.js';
import topicsRouter from './topics.js';
import userRouter from './user.js';
import articleRouter from './article.js';

const router = Router();

router.use('/', homeRouter);
router.use('/articles', articlesRouter);
router.use('/topics', topicsRouter);
router.use('/user', userRouter);
router.use('/article', articleRouter);

export default router;