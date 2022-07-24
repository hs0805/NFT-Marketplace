const logger = require("../logger/LoggerConfiguration");

const createNFT = (reqHeaders, reqBody) => {
    let response = {
        "status-code" : "200",
        "description" : "NFT created successfully"
    }
    return response;
}

module.exports = {
    createNFT
}