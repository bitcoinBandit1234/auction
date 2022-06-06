const session = require('express-session')
const connectRedis = require('connect-redis')
const RedisClient = require('../config/cache')
const dotenv = require("dotenv")

dotenv.config()

const RedisStore = connectRedis(session);

const expressSession = session({
    store: new RedisStore({client: RedisClient}),
    name: "sid",
    secret: process.env.COOKIE_SECRET,  
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: "auto", // If true: only transmit cookie over https
        httpOnly: true, 
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24*  2 // Measured in milliseconds
    }
})

const sessionWrap = expressMiddleware => (socket, next) => expressMiddleware(socket.request, {}, next);

const corsConfig = {
    origin: "http://localhost:3000",
    credentials: true
}

module.exports = { expressSession, corsConfig, sessionWrap }