import pg from "pg"

const client = new pg.Client({
    user: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORTNUMBER,
	database: process.env.DB_DATABASE
})

export default client