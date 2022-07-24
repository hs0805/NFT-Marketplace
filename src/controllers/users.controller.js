const logger = require("../logger/LoggerConfiguration");

const handleGetRequest = (req, res) => {
    logger.info('Received POST request for users');
    res.status(200).json( {"method":"GET"} );
}

const handlePostReqest =  (req, res) => {
    logger.info('Received POST request');
    res.status(200).json( {"method":"POST"} );
}

module.exports = {
    handleGetRequest,
    handlePostReqest,
}