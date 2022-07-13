// Creating express application 
const express = require('express');

const app = express();


app.listen(3000, "127.0.0.1" , ()=> {    // HTTP stack port, HTTP host ip, callback function
    console.log("server listening on port 3000...");
});
