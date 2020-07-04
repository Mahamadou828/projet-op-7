const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'video/mp4': 'mp4',
  'video/mov': 'mov',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const extension = file.mimetype.split('/')[1];
    const video = ['mov', 'mp4'];
    const image = ['jpg', 'jpeg', 'png'];
    console.log(extension);
    if (video.includes(extension)) {
      callback(null, 'Back-end/file/video');
    } else if (image.includes(extension)) {
      callback(null, 'Back-end/file/image');
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

module.exports = multer({ storage: storage }).single('images');
