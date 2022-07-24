const errorHandler = (err, req, res, next) => {
    console.log("error handler triggered");
    const response = {
        "status-code": "500",
        "description": "Internal server error", 
    }
    // console.log(`req : ${req} \n res : ${res} \n err : ${err} \n next: ${next}`)
    return res.status(500).json(response);   //same as res.send(response);
}

module.exports = errorHandler;