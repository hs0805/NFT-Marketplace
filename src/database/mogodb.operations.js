const { mongoClient } = require("./mongodb.client");
const logger = require("../logger/LoggerConfiguration");

async function insertRecordWithId(id, dbName, collectionName, jsonData) {
    let isInserted = false;
    try {
        jsonData._id = id;
        const result = await mongoClient.db(dbName).collection(collectionName).insertOne(jsonData); 
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

async function getRecordById(dbName, collectionName, fieldName, fieldValue) {
    let document;
    try {
        document = await mongoClient.db(dbName).collection(collectionName).findOne( {[fieldName]: fieldValue} ); 
        if(document){
            logger.info(`Document retrieved successfully`);
        }
        else {
            logger.info(`Failed to retrieve document`);
        }
    } catch(e) {
        logger.error(e);
    }
    return document;
}


module.exports = {
    insertRecordWithId,
    getRecordById
}