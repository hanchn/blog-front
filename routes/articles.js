const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const articles = [
    { id: 1, title: '第一篇文章', date: '2024-06-01', author: '小明' },
    { id: 2, title: '第二篇文章', date: '2024-06-02', author: '小红' }
  ];
  res.render('pages/articles', { title: '全部文章', articles, pageStyle: 'articles' });
});

module.exports = router;