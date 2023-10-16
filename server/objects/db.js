const dotenv = require("dotenv");

dotenv.config();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.DB_URI; //lấy từ file uri
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  //connect to mongodb
  try {
    await client.connect();
    await client.db("Tung").command({ ping: 1 });
    console.log("Connected to mongoDB");
  } finally {
    await client.close();
  }
}

async function addDoc(collectionName, docs) {
  //add documents to a collection
  const myDB = client.db("Tung");
  const myColl = myDB.collection(collectionName);

  const insertManyresult = await myColl.insertMany(docs); //add documents
}

module.exports = {
  run,
};
