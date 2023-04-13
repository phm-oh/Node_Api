const express = require('express');
const router = express.Router();
const company = require('../controllers/companyController');



/* GET users listing. */
/** http://localhost:3000/users */
router.get('/',company.index );





module.exports = router;
