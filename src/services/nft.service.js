const { insertRecordWithId, getRecordById, updateFieldForRecord, updateMultipleFieldsForRecord, updateMultipleFieldsOfMultipleRecords, getRecordsWithMultipleFilterProjectionOffsetLimit } = require("../database/mogodb.operations");
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
        //CASE 1:
        // let fieldName = "_id";
        // let fieldValue = `${reqBody["nft-contract-address"]}_${reqBody["token-id"]}`;
        // let data = await getRecordById("nftdb", "nft-collection", fieldName, fieldValue);
        let filterJson = reqBody["filter-json"];
        let projectionJson = reqBody["projection"]
        let sortedFieldName = reqBody["sorted-field-name"];
        let offset = reqBody["offset"];
        let limit = reqBody["limit"];
        let resultArr = await getRecordsWithMultipleFilterProjectionOffsetLimit("nftdb", "nft-collection", filterJson, 
        projectionJson, sortedFieldName, offset, limit);
  
        response = {
            "status-code" : "200",
            "description" : "NFT retrieved successfully",
            "data": resultArr
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
        // CASE 1 : UPDATE SINGLE FIELD OF A DOCUMENT
        // let newFieldName = reqBody["newfieldkey"];
        // let newFieldValue = reqBody["newfieldvalue"];
        // let isUpdated = await updateFieldForRecord("nftdb", "nft-collection", searchFieldName, searchFieldValue, newFieldName, newFieldValue);

        // CASE 2 : UPDATE MULTIPLE FIELDS OF A DOCUMENT
        // let updateFieldsJson = reqBody["new-data"];
        // let isUpdated = await updateMultipleFieldsForRecord("nftdb", "nft-collection", searchFieldName, searchFieldValue, updateFieldsJson);
        
        // CASE 3 : UPDATE MULTIPLE FIELDS OF MULTIPLE DOCUMENTS based on Filter
        let filterJson = reqBody["filter-json"];
        let updateFieldsJson = reqBody["new-data"];
        let isUpdated = await updateMultipleFieldsOfMultipleRecords("nftdb", "nft-collection", filterJson, updateFieldsJson);

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