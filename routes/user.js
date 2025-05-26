import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  const user = {
    name: '小明',
    avatar: '/images/avatar.png',
    email: 'xiaoming@example.com',
    registerDate: '2024-01-01',
    articles: [
      { id: 1, title: '我的第一篇文章', date: '2024-06-01' }
    ]
  };
  res.render('pages/user', { title: '个人中心', user, pageStyle: 'user' });
});

export default router;