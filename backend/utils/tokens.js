const jwt = require("jsonwebtoken");


module.exports = (userId, secret, algorithum, audience, issuer, expireTime) => {
    return jwt.sign({ _id: userId }, secret, {
        algorithm: algorithum,
        audience: audience,
        issuer: issuer,
        expiresIn: expireTime
    });
}