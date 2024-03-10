const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController.js");
router.post("/user/register",controller.userregister);
router.post("/user/sendotp",controller.userotpSend);
router.post("/user/login",controller.userLogin);
module.exports = router;