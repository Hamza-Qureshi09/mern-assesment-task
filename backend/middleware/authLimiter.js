
const rateLimit = require('express-rate-limit')

// limiting each ip to send limited  requests
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 5 minute
    max: 30, // Limit each IP to 30 requests per `window` (here, per 5 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = limiter