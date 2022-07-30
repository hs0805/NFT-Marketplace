const { insertRecordWithId, getRecordById, updateFieldForRecord, updateMultipleFieldsForRecord } = require("../database/mogodb.operations");
const logger = require("../logger/LoggerConfiguration");

const createNFT = async (reqHeaders, reqBody) => {
    let response;
    try {
        let _id = `${reqBody["nft-contract-address"]}_${reqBody["token-id"]}`;
        await insertRecordWithId(_id, "nftdb", "nft-collection", reqBody);
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
        let fieldValue = `${reqBody["nft-contract-address"]}_${reqBody["token-id"]}`;
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

const updateNFT = async(reqHeaders, reqBody) => {
    let response;
    try {
        let searchFieldName = "_id";
        let searchFieldValue = `${reqBody["nft-contract-address"]}_${reqBody["token-id"]}`;
        let newFieldName = reqBody["newfieldkey"];
        let newFieldValue = reqBody["newfieldvalue"];
        let isUpdated = await updateFieldForRecord("nftdb", "nft-collection", searchFieldName, searchFieldValue, newFieldName, newFieldValue);
        if (isUpdated) {
            response = {
                "status-code" : "200",
                "description" : "NFT Updated successfully",
                "isSuccess": isUpdated
            }
        } else {
            response = {
                "status-code" : "400",
                "description" : "Failed to update NFT details",
                "isSuccess": isUpdated
            }
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
    viewNFT,
    updateNFT
}