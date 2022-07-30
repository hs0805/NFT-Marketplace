const { insertRecordWithId, getRecordById, updateFieldForRecord } = require("../database/mogodb.operations");
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

const updateNFT = async(reqHeaders, reqBody) => {
    let response;
    try {
        let searchFieldName = "college";
        let searchFieldValue = reqBody["college"];
        // let newFieldName = "university"; // If you want to add a field
        let newFieldValue = reqBody["university"];
        // If you want to add a field in the document then pass the new fieldname instead of oldFi
        let isUpdated = await updateFieldForRecord("nftdb", "nft-collection", searchFieldName, searchFieldValue, searchFieldName, newFieldValue);
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