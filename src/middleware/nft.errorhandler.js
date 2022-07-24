const errorHandler = (req, res, err, next) => {
    const response = {
        "status-code": "500",
        "description": "Internal server error", 
    }
    return res.status(500).json(response);   //same as res.send(response);
}

module.exports = errorHandler;