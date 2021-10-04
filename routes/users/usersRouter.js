var express = require('express');
var router = express.Router();
const {
  createUser,
  getUsers,
  userLogin
} = require("../controller/userController-v1")


/* GET users listing. */
// router.get('/', getUsers);

router.post('/create-user', createUser)

router.post('/login', userLogin);

module.exports = router;