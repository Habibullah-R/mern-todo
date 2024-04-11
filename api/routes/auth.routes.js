 const express = require("express")
const { registerUser , loginUser , signOutUser  } =  require("../controller/auth.controler.js")

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get('/signout',signOutUser)


module.exports = router