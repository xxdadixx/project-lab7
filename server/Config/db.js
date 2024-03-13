const mongoose = require('mongoose');

const username = 'xxdadixx';
const password = 'G2cbjG4pUatpPF90';

const connectString = `mongodb+srv://${username}:${password}@cluster0.jzgwmsx.mongodb.net/
?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  mongoose.connect(connectString)
  .then(() => {
    console.log('Successfully connected to MongoDB!');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
}

module.exports = connectDB