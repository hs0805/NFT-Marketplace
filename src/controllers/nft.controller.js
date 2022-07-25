const { request } = require("express");
const logger = require("../logger/LoggerConfiguration");
const catchAsync = require("../middleware/nft.middleware");
const nftService = require("../services/nft.service");

const handleGetRequest = catchAsync( async (req, res) => {
    let response;
    const eventName = req.get("X-Event-Name");    // console.log(req.headers["happy"]);
    const reqHeaders = req.headers;
    const reqBody = req.body;
    logger.info(`Received request for Event : ${(eventName)} \nHeaders : ${JSON.stringify(reqHeaders)} \nBody : ${JSON.stringify(reqBody)}`);
    switch(eventName) {
        case "create_nft":
            // throw new Error("code phatt gaya");
            response = await nftService.createNFT(reqHeaders, reqBody);
            break;
        case "view_nft":
            response = await nftService.viewNFT(reqHeaders, reqBody);
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
);

const handlePostReqest =  (req, res) => {
    logger.info('Received POST request for nfts');
    res.status(200).json( {"method":"POST"} );
}

module.exports = {
    handleGetRequest,
    handlePostReqest,
}

