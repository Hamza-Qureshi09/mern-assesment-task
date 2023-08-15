require('dotenv').config()
const express = require("express")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth')
const carRoutes = require('./routes/car')
const conversationRoutes = require('./routes/conversation')
const errorHandlerMiddleware = require('./middleware/catchErrors')
const app = express()

const Port = process.env.PORT || 6002

// Db connection
require('./src/conn/connection')

// @MODE:- Cors setup
// handling cors error providing access
app.use(cors({
    credentials: true,
    origin: process.env.RESOURCE_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept']
}))
// @MODE:- Middlewares
// handling some security & other rules
app.use(helmet.frameguard({ action: "deny", }));
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter({}));
app.use(helmet.xXssProtection({ mode: 'block' }));
app.use(helmet.dnsPrefetchControl({ allow: true }));
app.use(cookieParser({ limit: '2mb' }));
app.use(express.json());
app.use(morgan('common'));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.set('cross-origin-resource-policy', process.env.RESOURCE_ORIGIN);
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('X-XSS-Protection', process.env.XSS_PROTECTION)
    next()
});

// Api Routes
app.use("/api", authRoutes)
app.use("/api", carRoutes)
app.all("*", (req, res) => {
    if (req.accepts('json')) {
        return res.status(404).json({ message: "Not Found!" })
    } else {
        return res.status(404).type('txt').send('Not Found!')
    }
})


const server = app.listen(Port, () => console.log(`sever is running on port ${Port} and for the tasks Worker:- ${process.pid} is assigned.`));

// error handler
app.use(errorHandlerMiddleware)

// @MODE:- Common Error Handling
// handling uncaught exception
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`server is shutting down due to handling uncaught exception`);
    process.exit(1)
})
// unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err}`);
    console.log(`server is shutting down due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1)
    })
})