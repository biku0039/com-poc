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

function mp3totext(req, res, next){      
    console.log("mp3 :" + req.files.uploads[0].path);
    const spawn = require("child_process").spawn;
    const process = spawn('python', ["./filetotext.py", req.files.uploads[0].path]);
    process.stdout.on('data', function (data) {
        res.setHeader("Content-Type", "text/html");
        console.log(data.toString());
        res.json(data.toString());
    })
}


// router.get("/", multipartMiddleware, mp3towav, wavtotext)

//file upload
router.post("/api/upload", multipartMiddleware, mp3totext);

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
