const fs = require('fs');

const pathImage = './Back-end/file/image/';
const pathVideo = './Back-end/file/video/';

exports.sendImage = (req, res, next) => {
  fs.readFile(pathImage + req.params.nameFile, (error, content) => {
    if (error) {
      res.writeHead(400, { 'Content-type': 'text/html' });
      res.end('No such image');
    } else {
      //specify the content type in the response will be an image
      res.writeHead(200, { 'Content-type': 'image/jpg' });
      res.end(content);
    }
  });
};

exports.sendVideo = (req, res, next) => {
  fs.readFile(pathVideo + req.params.nameFile, (error, content) => {
    if (error) {
      res.writeHead(400, { 'Content-type': 'text/html' });
      res.end('No such image');
    } else {
      //specify the content type in the response will be an image
      res.writeHead(200, { 'Content-type': 'image/jpg' });
      res.end(content);
    }
  });
};

exports.registerFile = (req, res, next) => {
  const fileType = req.file.mimetype.split('/')[0];
  console.log(fileType);
  res.status(201).json({
    filename: `${req.protocol}://${req.get('host')}/file/${fileType}/${
      req.file.filename
    }`,
  });
};
