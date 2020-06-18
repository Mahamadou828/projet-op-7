const User = require('./UserSchema');
const Post = require('./PostSchema');
// const Connection = require('../databaseConnection');

Post.belongsTo(User);
User.hasMany(Post);

// Connection.sync({ force: true });

module.exports = {
  Post,
  User,
};
