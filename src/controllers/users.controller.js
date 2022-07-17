const logger = require("../logger/LoggerConfiguration");

const handleGetRequest = (req, res) => {
    logger.info('Received POST request for users');
    res.status(200).json( {"method":"GET"} );
}

const handlePostReqest =  (req, res) => {
    logger.info('Received POST request');
    res.status(200).json( {"method":"POST"} );
}

const handlePutReqest = (req, res) => {
    logger.info('Received PUT request');
    res.status(200).json( {"method":"PUT"} );
}

const handleDeleteReqest = (req, res) => {
    logger.info('Received DELETE request');
    res.status(200).json( {"method":"DELETE"} );
}

module.exports = {
    handleGetRequest,
    handlePostReqest,
    handlePutReqest,
    handleDeleteReqest
}