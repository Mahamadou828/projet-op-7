const fs = require('fs');

const pathImage =
  '/Users/79206/Desktop/cours/openclassroom/projet7/Back-end/file/image/';

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

exports.registerImage = (req, res, next) => {
  res.status(201).json({
    filename: `${req.protocol}://${req.get('host')}/file/image/${
      req.file.filename
    }`,
  });
};
