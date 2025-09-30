require('dotenv').config();
const server = require('./src/app');
const dbConnection = require('./src/config/dbConnection')

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('unCaught rejection caught shutting down');
})

const Port = process.env.PORT

dbConnection()


server.listen(Port, () => {
    console.log(Port, "server is listning on Port");
})

// if any unhandledRejection ,promise happen this will shut down the app
process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('unhandled rejection caught shutting down', err)
    server.close(() => { process.exit(1) })
})