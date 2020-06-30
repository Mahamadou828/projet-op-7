const defaultUser = {
  name: '',
  surname: '',
  photo: '',
  description: '',
};

const defaultPost = {
  title: '',
  description: '',
  image: '',
  content: '',
  numLike: 0,
  numDislike: 0,
};

const defaultConnect = {
  jwt: '',
  access: false,
  error: 'Error we can create your account',
};

const defaultAppreciationPost = {
  like: false,
  dislike: false,
};

module.exports = {
  defaultConnect,
  defaultPost,
  defaultUser,
  defaultAppreciationPost,
};
