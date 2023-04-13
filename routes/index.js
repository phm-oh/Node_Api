const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) =>{
  // res.render('index', { title: 'Express' });
  res.status(200).jason({
    message:'Hello Index'
  })
});

module.exports = router;
