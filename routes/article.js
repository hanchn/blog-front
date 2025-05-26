const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  const article = {
    id: req.params.id,
    title: '示例文章标题',
    author: '小明',
    date: '2024-06-01',
    content: '<p>这里是文章内容。</p>',
    tags: ['前端', 'AI']
  };
  res.render('pages/article', { title: article.title, article, pageStyle: 'article' });
});

module.exports = router;