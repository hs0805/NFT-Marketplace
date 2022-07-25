const { insertRecordWithId, getRecordById } = require("../database/mogodb.operations");
const logger = require("../logger/LoggerConfiguration");

const createNFT = async (reqHeaders, reqBody) => {
    let response;
    try {
        await insertRecordWithId(reqBody["roll-no"], "nftdb", "nft-collection", reqBody);
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

const viewNFT = async(reqHeaders, reqBody) => {
    let response;
    try {
        let fieldName = "_id";
        let fieldValue = reqBody["roll-no"]
        let data = await getRecordById("nftdb", "nft-collection", fieldName, fieldValue);
        response = {
            "status-code" : "200",
            "description" : "NFT retrieved successfully",
            "data": data
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
    createNFT,
    viewNFT
}