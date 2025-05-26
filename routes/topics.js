const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const topics = [
    { id: 1, name: '前端' },
    { id: 2, name: 'AI' }
  ];
  res.render('pages/topics', { title: '专题列表', topics, pageStyle: 'topics' });
});

module.exports = router;