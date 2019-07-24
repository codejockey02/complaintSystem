module.exports = () => {
  if (process.env.PORT === undefined) {
    process.env.PORT = 8080;
  }
  if (process.env.MONGO_URL === undefined) {
    process.env.MONGO_URL = 'mongodb://admin:admin123@ds233531.mlab.com:33531/vith';
  }
};