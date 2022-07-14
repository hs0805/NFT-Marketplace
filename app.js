//Importing config parameters
const { configParamConst } = require("./src/configuration/configurationManager");
const logger = require("./src/logger/LoggerConfiguration");

// Creating express application 
const express = require('express');

const app = express();

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