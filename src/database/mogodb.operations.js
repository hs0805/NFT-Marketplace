const { client } = require("./mongodb.client");
const logger = require("../logger/LoggerConfiguration");

async function insertRecordWithId(dbName, collectionName, jsonData) {
    let isInserted = false;
    try {
        const result = await client.db(dbName).collection(collectionName).insertOne(jsonData); 
        if(result.acknowledged){
            isInserted = true;
            logger.info(`Document inserted successfully in ${collectionName} with id ${result.insertedId}`);
        }
        else {
            logger.info(`Failed to insert Document in ${collectionName} with id ${result.insertedId}`);
        }
    } catch(e) {
        logger.error();
    }
}

module.exports = {
    insertRecordWithId
}