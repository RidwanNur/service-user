const express = require('express');
const UserRouter = require('./users');
const TokenRouter = require('./tokens');
const router = express.Router();

//RegisterLogin User Router
router.use("/users", UserRouter);
router.use("/refreshTokens", TokenRouter);

module.exports = router;
