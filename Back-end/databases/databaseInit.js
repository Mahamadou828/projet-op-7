const User = require('./UserSchema');
const Post = require('./PostSchema');

Post.belongsTo(User);
User.hasMany(Post);

module.exports = {
  Post,
  User,
};
