//Importing config parameters
const { configParamConst } = require("./src/configuration/configurationManager");
const logger = require("./src/logger/LoggerConfiguration");

// Creating express application 
const express = require('express');

const app = express();

//Setup middleware
app.use(express.json());

const main = () => {
    try {
        const HTTP_STACK_HOST_IP = configParamConst.HTTP_STACK_HOST_IP;
        const HTTP_STACK_PORT = configParamConst.HTTP_STACK_PORT;

        // context/routepath/:query params,  "middleware", callback function
        app.get('/NFT/retrieveUser/:roll/:name/', (req, res) => {
            logger.info('Received GET request');
            console.log(req.params);
            console.log(req.body);
            // console.log(req.headers["event-name"]);
            // console.log(req.headers.event-name);    It won;t work
            // res.status(200).json({ "ERR_CODE":"900"});
            // res.send( {"jfkasd" : "fjkadsl"} )
            res.send('<h1>This is GET response</h1>');
        });

        app.get('/NFT/retrieveUser1', (req, res) => {
            logger.info('Received GET 1 request');
            res.send('<h1>This is GET 1 response</h1>');
        });

        app.post('/NFT/createUser', (req, res) => {
            logger.info('Received POST request');
            res.send('<h1>This is POST response</h1>');
        });

        app.put('/NFT/updateUser', (req, res) => {
            logger.info('Received PUT request');
            res.send('<h1>This is PUT response</h1>');
        });
        
        app.delete('/NFT/deleteUser', (req, res) => {
            logger.info('Received DELETE request');
            res.send('<h1>This is DELETE response</h1>');
        });


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