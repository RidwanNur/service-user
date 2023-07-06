const express = require('express');
const tokenController = require('../controller/token/tokenController');

const router = express.Router();

router.post("/createToken", tokenController.createToken);
router.get("/getToken", tokenController.getToken);

module.exports = router;
