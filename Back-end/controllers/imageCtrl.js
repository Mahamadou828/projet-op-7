const fs = require("fs") ;

exports.sendImage = (req , res , next) => {
    fs.readFile("/Users/79206/Desktop/cours/openclassroom/projet7/Back-end/images/" + req.params.nameFile , (error , content) => {
        if (error) {
            res.writeHead(400, {'Content-type':'text/html'})
            console.log(error);
            res.end("No such image");    
        } else {
            //specify the content type in the response will be an image
            res.writeHead(200,{'Content-type':'image/jpg'});
            res.end(content);
        }
    })
}