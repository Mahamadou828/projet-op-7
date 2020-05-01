const fs = require("fs") ;

const pathImage = "/Users/79206/Desktop/cours/openclassroom/projet7/Back-end/images/" ; 

exports.sendImage = (req , res , next) => {
    fs.readFile(pathImage + req.params.nameFile , (error , content) => {
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


exports.registerImage = (req , res , next) => { 
    res.status(201).json({ 
        filename: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` ,
    })
}

exports.updateImageAndSendPath = (req , res , next) => {
    const filename = req.body.oldFiles.split("http://localhost:3030/images/")[1] ; 

    console.log(filename) ;

    fs.unlink(pathImage + filename , (error) => {
        if (error) {
            console.log(error) ;
            res.status(400).json({error:true})
        } else {
            res.status(200).json({
                filename: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` ,
                success: false
            })
        }
    })
}