const createApp = require('./app');
const connectDB = require('./database');
const PORT = 4000;

async function startServer() {
    await connectDB(); // Ensure database is connected before starting the server
    const app = createApp();
    app.listen(PORT, () => {
        console.log(`Server is running on Port: ${PORT}`);
    });
}

startServer();