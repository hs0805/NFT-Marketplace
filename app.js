//Importing config parameters
const { configParamConst } = require("./src/configuration/configurationManager");
const logger = require("./src/logger/LoggerConfiguration");
const requestRouter = require("./src/routes/request.route");
const invalidUrl = require("./src/middleware/invalidUrl");
const errorHandler = require("./src/middleware/nft.errorhandler");
const {connectToMongoCluster} = require("./src/database/mongodb.client");

// Creating express application 
const express = require('express');

const app = express();

// Setup middleware
app.use(express.json());
// API Route Middleware
app.use("/nftmarketplace", requestRouter);
// Middleware to handle invalid url requests
app.use(invalidUrl);
// Middleware to handle app errors
app.use(errorHandler);

const main = async () => {
    try {
        const HTTP_STACK_HOST_IP = configParamConst.HTTP_STACK_HOST_IP;
        const HTTP_STACK_PORT = configParamConst.HTTP_STACK_PORT;
        
        // Setting up db connection
        await connectToMongoCluster();

        app.listen(HTTP_STACK_PORT, HTTP_STACK_HOST_IP, () => {   

            logger.info(`-------------------------${configParamConst.PRODUCT_NAME} APPLICATION STARTED-----------------------------------`);
            logger.info(`server started on ${HTTP_STACK_HOST_IP}:${HTTP_STACK_PORT}...`);
            });
    }
    catch (e) {
        logger.error("-------------------------Failed to start NFT Marketplace-------------------------", e);
    }
}

main();