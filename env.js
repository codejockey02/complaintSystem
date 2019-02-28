module.exports = () => {
  if (process.env.PORT === undefined) {
    process.env.PORT = 8080;
  }
  if (process.env.MONGO_URL === undefined) {
    process.env.MONGO_URL = 'mongodb://priyeshs2:Priyesh123@ds155815.mlab.com:55815/complaintportal';
  }
};