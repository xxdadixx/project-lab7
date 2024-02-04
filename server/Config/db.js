// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb://localhost:27017/crud_class";
const mongoose = require('mongoose')

const connectDB = async () => {
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/crud_class')
    console.log('MongoDB Connected')
  }catch(err){
    console.log(err)
  }
}

module.exports = connectDB
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     poolSize: 10,
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
//   socketTimeoutMS: 30000, // Example: Increase socket timeout to 30 seconds
//   connectTimeoutMS: 30000, // Example: Increase connect timeout to 30 seconds
// });



// async function run() {
//   try {
//     await client.connect();
//     const adminDB = client.db("crud_class");
//     await adminDB.command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error; // Rethrow the error to handle it in the calling function (startServer)
//   }
// }

// module.exports = run
