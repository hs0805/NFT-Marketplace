const { request } = require("express");
const logger = require("../logger/LoggerConfiguration");
const nftService = require("../services/nft.service");

const handleGetRequest = (req, res) => {
    let response;
    const eventName = req.get("X-Event-Name");    // console.log(req.headers["happy"]);
    const reqHeaders = req.headers;
    const reqBody = req.body;
    logger.info(`Received request for Event : ${(eventName)} \nHeaders : ${JSON.stringify(reqHeaders)} \nBody : ${JSON.stringify(reqBody)}`);
    switch(eventName) {
        case "create_nft":
            response = nftService.createNFT(reqHeaders, reqBody);
            break;
        default:
            response = {
                "status-code" : "400",
                "description" : "bad request"
            }
            break;
    }
    res.status(200).json( response );
}

const handlePostReqest =  (req, res) => {
    logger.info('Received POST request for nfts');
    res.status(200).json( {"method":"POST"} );
}

module.exports = {
    handleGetRequest,
    handlePostReqest,
}