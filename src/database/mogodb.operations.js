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

async function updateFieldForRecord(dbName, collectionName, oldFieldName, oldFieldValue, newFieldName, newFieldValue) {
    let result;
    let isUpdated = false;
    try {
        result = await mongoClient.db(dbName).collection(collectionName).updateOne( {[oldFieldName]: oldFieldValue}, {$set: {[newFieldName]: newFieldValue}} ); 
        if(result.modifiedCount > 0){
            isUpdated = true;
            logger.info(`Document updated successfully`);
        }
        else {
            logger.info(`Failed to update document`);
        }
    } catch(e) {
        logger.error(e);
    }
    return isUpdated;
}

async function updateMultipleFieldsForRecord(dbName, collectionName, searchFieldName, searchFieldValue, fieldsToUpdateJson) {
    let result;
    let isUpdated = false;
    try {
        result = await mongoClient.db(dbName).collection(collectionName).updateOne( {[searchFieldName]: searchFieldValue}, {$set: (fieldsToUpdateJson)} ); 
        if(result.modifiedCount > 0){
            isUpdated = true;
            logger.info(`Document updated successfully`);
        }
        else {
            logger.info(`Failed to update document`);
        }
    } catch(e) {
        logger.error(e);
    }
    return isUpdated;
}

module.exports = {
    insertRecordWithId,
    getRecordById,
    updateFieldForRecord,
    updateMultipleFieldsForRecord
}