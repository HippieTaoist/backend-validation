const User = require("../model/User")
var validator = require('validator');
const bcrypt = require('bcryptjs');

async function createUser(req, res) {
    const {
        firstName,
        lastName,
        username,
        email,
        password
    } = req.body;
    let body = req.body;
    let errObj = {};

    for (let key in body) {
        if (validator.isEmpty(body[key])) {
            errObj[`${key}`] = `${key} cannot be empty`;
        }
    }

    if (!validator.isAlpha(firstName)) {
        errObj.firstName = "First Name cannot have special characters or numbers";
    }

    if (!validator.isAlpha(lastName)) {
        errObj.lastName = "Last Name cannot have special characters or numbers";
    }

    if (!validator.isAlphanumeric(username)) {
        errObj.username = "Username cannot have special characters";
    }

    if (!validator.isEmail(email)) {
        errObj.email = "please enter a valid email";
    }

    if (!validator.isStrongPassword(password)) {
        errObj.password =
            "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and at least 8 characters long";
    }

    if (Object.keys(errObj).length > 0) {
        //How would you validate firstName to make sure only alphabet is allowed
        return res.status(500).json({
            message: "error",
            error: errObj,
        });
    }

    try {
        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);

        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashed,
        });

        let savedUser = await createdUser.save();

        res.json({
            message: "success",
            payload: savedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "error",
            error: error.message
        });
    }
}

async function isPasswordMatch(email, password) {
    let errObj = {};
    const account = await User.findOne({
        email
    });

    if (!account) {


        errObj.email = "Email not found, please check spelling."

    } else {

        if (!bcrypt.compareSync(password, account.password)) {
            errObj.password = "Password incorrect, please try again.";
        }
    }
    if (errObj.length > 0) {
        return errObj
    } else {
        return errObj;
    }
}

async function userLogin(req, res) {

    const {
        email,
        password
    } = req.body;

    let authenticate = await isPasswordMatch(email, password);

    console.log("Line 116 - authenticate -", authenticate)

    if (Object.keys(authenticate).length > 0) {

        return res.status(500).json({
            message: "error",
            error: authenticate,
        });
    }


    try {


        res.json({
            message: "Successful login!",
        })
    } catch (error) {
        res.status(500).json({
            message: "error",
            error: error.message
        });
    }

}

module.exports = {

    createUser,
    userLogin

}