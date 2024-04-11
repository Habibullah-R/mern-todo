const express = require('express')
const { deleteAcc  } = require("../controller/user.controller.js")
const { verifyToken } = require('../utills/verifyUser.js')

const router = express.Router();


router.delete('/deleteAcc/:id',verifyToken,deleteAcc)


module.exports = router