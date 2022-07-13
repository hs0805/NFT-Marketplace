//Importing config parameters
const { configParamConst } = require("./src/configuration/configurationManager");

// Creating express application 
const express = require('express');

const app = express();

const main = () => {
    try {
        const HTTP_STACK_HOST_IP = configParamConst.HTTP_STACK_HOST_IP;
        const HTTP_STACK_PORT = configParamConst.HTTP_STACK_PORT;

        app.listen(HTTP_STACK_PORT, HTTP_STACK_HOST_IP, () => {   

            console.log(`-------------------------${configParamConst.PRODUCT_NAME} APPLICATION STARTED-----------------------------------`);
            console.log(`server started on ${HTTP_STACK_HOST_IP}:${HTTP_STACK_PORT}...`);

        });
    }
    catch (e) {
        console.error(e);
    }
}

main();