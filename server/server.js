const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const router = express.Router();
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// app.post('/api/upload', multipartMiddleware, (req, res) => {
//     console.log(req.files);
//     res.json({
//         'message': 'File uploaded succesfully.'
//     });
// });
//file upload
router.post("/api/upload", multipartMiddleware, (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
}, (req, res, next) => {
    // console.log('Request Type:', req)
    console.log(req.files.uploads[0].path);
    next()
}, (req, res) => {
    res.json({
        message: "File Uploaded successfully"
    })
})

// coommunicate with python script
// app.get('/name', callName);

// function callName(req, res) {

//     var spawn = require("child_process").spawn;

 
//     var process = spawn('python', ["./filetotext.py"]);


//     process.stdout.on('data', function (data) {
//         res.send(data.toString());
//     })
// } 


//calls the method on the python object
// app.invoke("hello", "World", function (error, reply, streaming) {
//     if (error) {
//         console.log("ERROR: ", error);
//     }
//     console.log(reply);
// });

app.use('/', router)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
