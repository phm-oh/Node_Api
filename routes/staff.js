const express = require('express');
const router = express.Router();
const staff = require('../controllers/staffController');



/* GET users listing. */
/** http://localhost:3000/staff/ */
router.get('/',staff.index);


/* GET by id*/
/** http://localhost:3000/staff/xxxxxx */
router.get('/:id',staff.show);


/* delete by id*/
/** http://localhost:3000/staff/xxxxxx */
router.delete('/:id',staff.destroy);


router.put('/:id',staff.update);


router.post('/',staff.insert);






module.exports = router;
