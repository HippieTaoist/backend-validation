var express = require('express');
var router = express.Router();
const {
  createUser
} = require("../controller/userController-v1")
const {
  getUsers
} = require("../controller/userController")
const {
  userLogin
} = require("../controller/userController")


/* GET users listing. */
router.get('/', getUsers);

router.post('/create-user', createUser)

router.post('/login', userLogin);

module.exports = router;