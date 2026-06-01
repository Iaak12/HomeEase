const mongoose = require('mongoose');
const dns = require('dns');

// Force Google DNS to bypass local ISP blocking of MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const connectDB = async () => {
  const tryConnect = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        family: 4, // Force IPv4
      });
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`❌ MongoDB connection error: ${error.message}`);
      console.warn('⚠️  Server will keep running — retrying MongoDB in 5 seconds...');
      setTimeout(tryConnect, 5000);
    }
  };

  await tryConnect();
};

module.exports = connectDB;
