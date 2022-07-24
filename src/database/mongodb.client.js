const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://happy:123456%40123456@nftcluster.53nzlzp.mongodb.net/nftdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function connectToCluster() {
    await client.connect().then ( () => 
        console.log("connection success")
    ).catch (err => {
        console.log("Error caught here");
    })
};

module.exports = {
    connectToCluster, 
    client
}

