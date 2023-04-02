const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');
const request = require("supertest");

const app = require("../app");
exports.agent = request.agent(app.app);

exports.connect = async () => {
    let mongod = await MongoMemoryServer.create();
  mongoose
  .connect(mongod.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to %s", MONGODB_URL);
    console.log(`App is running on...\n`);
  })
  .catch((err) => {
    console.error("App starting error:", err.message);
  });
}

exports.close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
  };
  
  exports.clear = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
  };
