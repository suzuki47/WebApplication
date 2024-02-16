const express = require('express');
const router = express.Router();
const Opinion = require('../models/Opinion');

// ダミーの意見データ
let opinions = [
  { id: 1, content: "もっと休憩時間がほしいです。" },
  { id: 2, content: "オフィスの環境が快適でとても良いです。" },
  // その他の意見データ
];

router.post('/', async (req, res) => {
  try {
    const opinion = new Opinion({
      content: req.body.content
    });
    const savedOpinion = await opinion.save();
    res.status(201).json(savedOpinion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  // パスワードがクエリパラメータから提供されると仮定
  const password = req.query.password;
  if (password !== '7777') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const opinions = await Opinion.find();
    res.json(opinions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
