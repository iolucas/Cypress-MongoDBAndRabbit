const { MongoClient } = require("mongodb");

const mongoUri =
  "mongodb+srv://lucasantunes:xperience@cluster0.pssgvkq.mongodb.net/markdb?retryWrites=true&w=majority";

const client = new MongoClient(mongoUri);

async function connect() {
  await client.connect();
  return client.db("markdb");
}
async function disconnect() {
  await client.close();
}

module.exports = { connect, disconnect };



