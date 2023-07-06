const express = require('express');
const RegisterLoginController = require('../controller/registerLoginController');
const ProfileController = require('../controller/profileController');

const router = express.Router();

router.get("/getUsers", ProfileController.GetListUsers);
router.get("/getUser/:userId", ProfileController.Getuser); //By ID
router.post("/register", RegisterLoginController.Register);
router.post("/login",RegisterLoginController.Login);
router.put("/updateProfile/:userId", ProfileController.UpdateUser);
router.post("/logout", RegisterLoginController.Logout);

module.exports = router;
