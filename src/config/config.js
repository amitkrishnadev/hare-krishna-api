const dotenv = require('dotenv');

/* load .env but keep it quiet */
dotenv.config({ quiet: true });

const config = {
	port: process.env.PORT || 8000,
	env: process.env.NODE_ENV || 'development',
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
	},
	jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
