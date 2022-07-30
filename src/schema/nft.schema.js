//Reference : https://www.liquid-technologies.com/online-json-to-schema-converter

const createNftSchema = 
{
    "id": "/createNft",
    "type": "object",
    "properties": {
      "token-id": {
        "type": "integer"
      },
      "token-name": {
        "type": "string"
      },
      "blockchain": {
        "type": "string"
      },
      "token-standard": {
        "type": "string"
      },
      "nft-contract-address": {
        "type": "string"
      },
      "owner-address": {
        "type": "string"
      },
      "collection-name": {
        "type": "string"
      },
      "category-name": {
        "type": "string"
      },
      "quantity": {
        "type": "integer"
      },
      "image-uri": {
        "type": "string"
      },
      "token-uri": {
        "type": "string"
      },
      "timestamp": {
        "type": "integer"
      }
    },
    "required": [
      "token-id",
      "token-name",
      "blockchain",
      "token-standard",
      "nft-contract-address",
      "owner-address",
      "collection-name",
      "category-name",
      "quantity",
      "image-uri",
      "token-uri",
      "timestamp"
    ],
    "additionalProperties": false
  }

  module.exports = {
    createNftSchema
  }