const { insertRecordWithId } = require("../database/mogodb.operations");
const logger = require("../logger/LoggerConfiguration");

const createNFT = async (reqHeaders, reqBody) => {
    let response;
    try {
        await insertRecordWithId("nftdb", "nft-collection", reqBody);
        response = {
            "status-code" : "200",
            "description" : "NFT created successfully"
        }
    } catch(err) {
        response = {
            "status-code" : "500",
            "description" : "Internal server error"
        }   
    }
    return response;
}

module.exports = {
    createNFT
}