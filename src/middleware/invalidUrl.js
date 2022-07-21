const logger = require("../logger/LoggerConfiguration")

const invalidUrl = (req, res) => {
    logger.error("INVALID URL RECEIVED");
    const response = {
        "status-code" : "5000",
        "http-status-code" : "404",
        "description" : "Invalid url"
    }
    return res.status(404).json(response);
}

module.exports = invalidUrl;