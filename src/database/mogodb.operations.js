const { mongoClient } = require("./mongodb.client");
const logger = require("../logger/LoggerConfiguration");

//INSERT Query
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
        logger.error(e);
    }
}

async function insertRecord(dbName, collectionName, jsonData) {
    let isInserted = false;
    try {
        const result = await mongoClient.db(dbName).collection(collectionName).insertOne(jsonData); 
        if(result.acknowledged){
            isInserted = true;
            logger.info(`Document inserted successfully in ${collectionName} with id ${result.insertedId}`);
        }
        else {
            logger.info(`Failed to insert Document in ${collectionName} with id ${result.insertedId}`);
        }
    } catch(e) {
        logger.error(e);
    }
}

async function insertMultipleRecords(dbName, collectionName, jsonData) { //insert list of records
    try {
        const result = await mongoClient.db(dbName).collection(collectionName).insertMany(jsonData); 

        logger.info(`List of Documents inserted successfully in ${collectionName} with id ${result.insertedId}`);
    } catch(e) {
        logger.error(e);
    }
}


//RETRIEVE Query
async function getSingleRecord(dbName, collectionName, fieldName, fieldValue) {
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

async function getRecordById(id, dbName, collectionName) {
    let document;
    try {
        document = await mongoClient.db(dbName).collection(collectionName).findOne( {_id: id} ); 
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

async function getAllRecords(dbName, collectionName) {
    let documentArr;
    try {
        documentArr = await mongoClient.db(dbName).collection(collectionName).find().toArray(); 
        if(documentArr.length > 0){
            logger.info(`Document retrieved successfully`);
        }
        else {
            logger.info(`Failed to retrieve document`);
        }
    } catch(e) {
        logger.error(e);
    }
    return documentArr;
}

async function getSingleRecordWithMultipleFilters(dbName, collectionName, filterJson) {
    let document;
    try {
        document = await mongoClient.db(dbName).collection(collectionName).findOne(filterJson); 
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

async function getRecordsWithOffsetLimit(dbName, collectionName, fieldName, fieldValue, sortedFieldName, offset, limit) {
    let documentArr;
    try {
        documentArr = await mongoClient.db(dbName).collection(collectionName).find({[fieldName]: fieldValue}).sort({ [sortedFieldName]: -1 })
        .skip(offset).limit(limit).toArray(); 
        if(documentArr.length > 0){
            logger.info(`Document retrieved successfully`);
        }
        else {
            logger.info(`Failed to retrieve document`);
        }
    } catch(e) {
        logger.error(e);
    }
    return documentArr;
}

async function getRecordsWithProjectionOffsetLimit(dbName, collectionName, fieldName, fieldValue, projectionJson, sortedFieldName, offset, limit) {
    let documentArr;
    try {
        documentArr = await mongoClient.db(dbName).collection(collectionName).find({[fieldName]: fieldValue}).project(projectionJson).sort({ [sortedFieldName]: -1 })
        .skip(offset).limit(limit).toArray(); 
        if(documentArr.length > 0){
            logger.info(`Document retrieved successfully`);
        }
        else {
            logger.info(`Failed to retrieve document`);
        }
    } catch(e) {
        logger.error(e);
    }
    return documentArr;
}

async function getRecordsWithMultipleFilterProjectionOffsetLimit(dbName, collectionName, filterJson, projectionJson, sortedFieldName, offset, limit) {
    let documentArr;
    try {
        documentArr = await mongoClient.db(dbName).collection(collectionName).find(filterJson).project(projectionJson).sort({ [sortedFieldName]: -1 })
        .skip(offset).limit(limit).toArray(); 
        if(documentArr.length > 0){
            logger.info(`Document retrieved successfully`);
        }
        else {
            logger.info(`Failed to retrieve document`);
        }
    } catch(e) {
        logger.error(e);
    }
    return documentArr;
}

async function getAllRecordsWithOffsetLimit(dbName, collectionName, sortedFieldName, offset, limit) {
    let documentArr;
    try {
        documentArr = await mongoClient.db(dbName).collection(collectionName).find().sort({ [sortedFieldName]: -1 })
        .skip(offset).limit(limit).toArray(); 
        if(documentArr.length > 0){
            logger.info(`Document retrieved successfully`);
        }
        else {
            logger.info(`Failed to retrieve document`);
        }
    } catch(e) {
        logger.error(e);
    }
    return documentArr;
}



// UPDATE Queries
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

async function updateMultipleFieldsOfMultipleRecords(dbName, collectionName, filterJson, fieldsToUpdateJson) {
    let result;
    let isUpdated = false;
    try {
        result = await mongoClient.db(dbName).collection(collectionName).updateMany( filterJson, {$set: (fieldsToUpdateJson)} ); 
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


//DELETE Queries

async function deleteRecordById(id, dbName, collectionName) {
    let isDeleted = false;
    let document;
    try {
        document = await mongoClient.db(dbName).collection(collectionName).deleteOne( {_id: id} ); 
        if(document.deletedCount > 0){
            isDeleted = true;
            logger.info(`Document deleted successfully`);
        }
        else {
            logger.info(`Failed to delete document`);
        }
    } catch(e) {
        logger.error(e);
    }
    return isDeleted;
}

module.exports = {
    insertRecord,
    insertRecordWithId,
    insertMultipleRecords,
    
    getSingleRecord,
    getRecordById,
    getAllRecords,
    getSingleRecordWithMultipleFilters,
    getRecordsWithOffsetLimit,
    getRecordsWithProjectionOffsetLimit,
    getRecordsWithMultipleFilterProjectionOffsetLimit,
    getAllRecordsWithOffsetLimit,

    updateFieldForRecord,
    updateMultipleFieldsForRecord,
    updateMultipleFieldsOfMultipleRecords,

    deleteRecordById
}