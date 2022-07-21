//Importing config parameters
const { configParamConst } = require("./src/configuration/configurationManager");
const logger = require("./src/logger/LoggerConfiguration");
const requestRouter = require("./src/routes/request.route");
const invalidUrl = require("./src/middleware/invalidUrl");

// Creating express application 
const express = require('express');

const app = express();

// Setup middleware
app.use(express.json());

// API Route Middleware
// app.use("/nftmarketplace", requestRouter);
// app.use("")
// Middleware to handle invalid url requests
// app.use(invalidUrl);

const middleware1 = (req, res, next) => {
    console.log("middleware1");
    next();
}

const middleware2 = (req, res, next) => {
    console.log("middleware2");
    next();
}

const middleware3 = (req, res) => {
    console.log("middleware3");
    res.send("Middleware3");
}

// app.get("/", [middleware1, middleware2, middleware3]); // Using as array OR
// app.get("/", middleware1, middleware2, (req, res) => {  // OR
//     // console.log("middleware3")
//     res.send("Middleware3");
// })

app.get("/", (req, res, next) => {
    console.log("middleware1");
    next();
}, (req, res, next) => {
    console.log("middleware2");
    next();
}, (req, res) => {
    console.log("middleware3")
    res.send("Middleware3");
});

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