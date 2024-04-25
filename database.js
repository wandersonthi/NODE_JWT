const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://wandersonthi:10Demaiovida@cluster0.fz4ytuw.mongodb.net', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado ao banco de dados');
  } catch(error) {
    console.error('Falha na conexão com o mongo db', error.message);
    process.exit(1);
  }
}
module.exports = connectDB;