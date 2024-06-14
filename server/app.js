// Base Module
import express from "express"

// Security Modules
import cors from "cors"
import helmet from "helmet"
import csp from "helmet-csp"
import expressRateLimiter from "express-rate-limit"

// Environment configuration
import dotenv from "dotenv"

// Request handlers
import bodyParser from "body-parser"
import compress from "compression"

// Database connector

// Routers
import listItemRouter from "./routers/listitem.router"

// app configuration
dotenv.config()
const configuredBodyParserJSON = bodyParser.json()
const configuredBodyParserURLEncoding = bodyParser.urlencoded({ extended: true })   
const configuredCompress = compress()

// Security Configurations
const configuredHelmet = helmet({ crossOriginResourcePolicy: false })
const configuredCSP = csp({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self' 'unsafe-inline' https://cdn.jsdelivr.net"],
        styleSrc: ["'self' 'unsafe-inline' https://cdn.jsdelivr.net"],
        imgSrc: ["'self' 'unsafe-inline' https://encrypted-tbn0.gstatic.com/ https://encrypted-tbn1.gstatic.com/ https://encrypted-tbn2.gstatic.com/ https://encrypted-tbn3.gstatic.com/ https://apod.nasa.gov/"]
    }
})
const configuredCors = cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: process.env.CORS_CREDENTIALS
})
const configuredRateLimiter = expressRateLimiter({
    window: process.env.RATE_WINDOW,
    max: process.env.RATE_MAX,
    message: process.env.RATE_MESSAGE,
    Headers: true,
    keyGenerator: (req, res) => {
        return req.ip
    }
})

// App initialization
const app = express()
app.use(configuredBodyParserJSON)
app.use(configuredBodyParserURLEncoding)
app.use(configuredCompress)
app.use(configuredHelmet)
app.use(configuredCSP)
app.use(configuredCors)
app.use(configuredRateLimiter)
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Database connection

app.get('/', (req, res) => {
    res.send("index.html")
})

// Routes
app.use("/api/v1/listItems", listItemRouter)

// Export
export default app