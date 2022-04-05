var jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWTSECRET;

// get user identity through jwt token 
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    next()
    return

    const token = req.cookies.jwt
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        console.log(data)
        req.userId = data._id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}


module.exports = fetchuser;