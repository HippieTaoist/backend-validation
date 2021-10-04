const User = require("../model/User")
const bcrypt = require('bcryptjs');


async function getUsers(req, res) {

    try {
        let payload = await User.find(req.body);

        res.json({
            message: "Successful Fetch",
            payload: payload
        })

    } catch (err) {

        res.status(500).json({
            message: "Failure fetching",
            error: err.message
        })

    }
}

function checkEmailFormat(target) {

    if (target.match(/\S+@\S+\.\S+/)) {
        return true
    } else {
        return false
    }
}

function checkForSymbol(target) {
    if (target.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
        return true;
    } else {
        return false;
    }
}


function checkForNumberAndSymbol(target) {
    if (target.match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/)) {
        return true;
    } else {
        return false;
    }
}

function isEmpty(target) {
    if (target.length > 0) {
        return false
    } else {
        return true;
    }
}

function isLess8Char(target) {
    if (target.length >= 8) {
        return false;
    } else {
        return true;
    }

}


function checkPaswordStrength(target) {
    var strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#$%^=-{}[]&*|:;'?.<>`~])(?=.{8,})"
    );
    return !strongRegex.test(target);
}



function checkForNumber(target) {

    if (target.match(/\d/)) {
        return true;
    } else {
        return false;
    }
}


async function createUser(req, res) {
    const {
        firstName,
        lastName,
        username,
        email,
        password
    } = req.body

    let body = req.body;
    let errObj = {};

    for (let key in body) {
        if (isEmpty(body[key])) {
            errObj[`${key}`] = `${key} cannot be empty`

            console.log("%ctest message", "color:yellow;background-color:blue")
        }
    }
    console.log("This is %cMy stylish message", "color: yellow; font-style: italic; background-color: blue;padding: 2px");


    if (checkForSymbol(username)) {
        errObj[`${username}`] = `${username} cannot have special charcters in it`
    }

    if (!checkEmailFormat(email)) {
        errObj.email = `${email} is in the incorrect format. no special characters besides _,., @`
    }


    if (checkForNumberAndSymbol(firstName)) {
        errObj.firstName = 'Please Use Only Letters For Your FIRST Name No Numbers and Special Characters';
    }

    if (checkForNumberAndSymbol(lastName)) {
        errObj.lastName = 'Please Use Only Letters For Your LAST Name No Numbers and Special Characters'
    }

    if (isEmpty(firstName)) {
        errObj.firstName = 'No Empty Values...'
    }

    if (isEmpty(lastName)) {
        errObj.lastName = 'No Empty Values...'
    }

    if (isLess8Char(password)) {
        errObj.password = 'Password needs to be 8 characters long'
    }

    if (!checkForSymbol(password)) {
        errObj.password += '\nPassword needs to be to have special character symbols'
    }

    if (!checkForNumberAndSymbol(password)) {
        errObj.password += ('\nPassword needs to be numbers AND symbols')
    }

    if (!checkForNumber(!password)) {
        errObj.password += '\n Password needs to have nubmers'
    }



    if (Object.keys(errObj).length > 0) {
        return res
            .status(500)
            .json({
                message: "error",
                error: errObj,
            })
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
        })




        var hash = bcrypt.hashSync(password, 10)
        password = hash
        console.log("Line XXX - HASH -", hash)
        let savedUser = await createdUser.save()

        res.json({
            message: "success",
            payload: savedUser
        })

    } catch (err) {

        res.status(500).json({
            message: "Please Use Only Letters For Your FIRST Name No Numbers and Special Characters",
            errors: err.errors,
            err
        })


        // res.status(501).json({
        //     message: "Please Use Only Letters For Your LAST Name No Numbers and Special Characters",
        //     error501: err.message
        // })


    }
}




module.exports = {
    getUsers,
    createUser
}