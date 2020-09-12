const log = require('./utils/logger');
const mongoose = require('mongoose');

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    log.info(`MongoDB connected at: ${conn.connection.host}`);
  } catch (err) {
    log.error(err);
    process.exit(1);
  }
};
