const express = require("express")
const router = express.Router();

router.use("/reg",require("./register/register"))
router.use("/login",require("./login/login"))
router.use("/user",require("./user/user"))
module.exports = router;