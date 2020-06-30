const User = require('./UserSchema');
const Post = require('./PostSchema');
const Comment = require('./CommentSchema');
const PostAppreciation = require('./PostAppreciation');
// const Connection = require('../databaseConnection');

//User-Post Relation
Post.belongsTo(User);
User.hasMany(Post);

//Comment-Post Relation
Post.hasMany(Comment);
Comment.belongsTo(Post);

//User-Comment Realtion
Comment.belongsTo(User);
User.hasMany(Comment);

//PostAppreciation-User Relation
PostAppreciation.belongsTo(User);
User.hasMany(PostAppreciation);

//PostAppreciation-Post Relation
PostAppreciation.belongsTo(Post);
Post.hasMany(PostAppreciation);

// Connection.sync({ force: true });
// Connection.sync({ alter: true });

module.exports = {
  Post,
  User,
  Comment,
  PostAppreciation,
};
