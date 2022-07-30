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