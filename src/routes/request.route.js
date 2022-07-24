const express = require('express');

const router = express.Router();

const nftController = require("../controllers/nft.controller");
const usersController = require("../controllers/users.controller");


// way 1
router
    .route("/nfts")
    .get(nftController.handleGetRequest)
    .post(nftController.handlePostReqest);

// way2
router
    .post(["/product/:id", "/product/:name"], nftController.handlePostReqest)    

router
    .route("/users")
    .get(usersController.handleGetRequest)
    .post(usersController.handlePostReqest);




module.exports = router;