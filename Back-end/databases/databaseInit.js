const User = require('./UserSchema');
const Post = require('./PostSchema');
const Comment = require('./CommentSchema');
const PostAppreciation = require('./PostAppreciation');
const Contact = require('./ContactSchema');
const Message = require('./MessageSchema');
// const { Op } = require('sequelize');
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

//User-Contact Relation
User.hasMany(Contact);
Contact.belongsTo(User);

//User-Message Relation
User.hasMany(Message);
Message.belongsTo(User);
// Connection.sync({ force: true });
// Connection.sync({ alter: true });

// Post.update({ numLike: 0, numDislike: 0 }, { where: { id: '20' } }).then(
//   (update) => {
//     console.log(update);
//   }
// );

require('./Hooks/PostAppreciationHook');

module.exports = {
  Post,
  User,
  Comment,
  PostAppreciation,
  Contact,
  Message,
};
