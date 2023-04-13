const express = require('express');
const router = express.Router();
const shop = require('../controllers/shopController');

router.get('/' , shop.index);

router.get('/menu' , shop.menu);
router.get('/:id' , shop.getShopWithMenu);


module.exports = router;