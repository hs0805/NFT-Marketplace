//Importing config parameters
const { configParamConst } = require("./src/configuration/configurationManager");
const logger = require("./src/logger/LoggerConfiguration");
const requestRouter = require("./src/routes/request.route");
const invalidUrl = require("./src/middleware/invalidUrl");
const nftMiddleware = require("./src/middleware/nft.middleware")

// Creating express application 
const express = require('express');

const app = express();

// Setup middleware
app.use(express.json());
app.use(nftMiddleware.appLogger);  // Application level middlware. works on every route
// app.use("/about", nftMiddleware);
// API Route Middleware
app.use('/nftmarketplace', nftMiddleware.nftsLogger);
app.use("/nftmarketplace", requestRouter);
// app.use("")
// Middleware to handle invalid url requests
app.use(invalidUrl);

const main = () => {
    try {
        const HTTP_STACK_HOST_IP = configParamConst.HTTP_STACK_HOST_IP;
        const HTTP_STACK_PORT = configParamConst.HTTP_STACK_PORT;


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