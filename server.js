const app = require('./src/app');
const config = require('./src/config/config');

const PORT = config.port || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
