const nftSchema  = require("./nft.schema");
const Validator = require('jsonschema').Validator;

const schemaValidator  = new Validator();
schemaValidator.addSchema(nftSchema.createNftSchema, "/createNft");

module.exports = {
    schemaValidator
}