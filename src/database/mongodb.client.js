const { MongoClient, ServerApiVersion } = require('mongodb');
const { configParamConst } = require("../configuration/configurationManager");
const logger = require('../logger/LoggerConfiguration');

const DB_HOST_PORT = configParamConst.DB_HOST_PORT;
const DB_NAME = configParamConst.DB_NAME;
const DB_USERNAME = configParamConst.DB_USERNAME;
const DB_PASSWORD = configParamConst.DB_PASSWORD;

const URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST_PORT}/${DB_NAME}?retryWrites=true&w=majority`;

const mongoClient = new MongoClient(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    serverApi: ServerApiVersion.v1 }
);

async function connectToMongoCluster() {
    logger.info("Initiating connection with MondoDB cluster...");
        await mongoClient.connect().then ( () => 
            logger.info("Connection successfully established with MongoDB cluster")
        ).catch (err => {
        logger.error("Database connection error : ", err);
    })
};

module.exports = {
    connectToMongoCluster, 
    mongoClient
}

