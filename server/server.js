const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
// const zerorpc = require("zerorpc");
// const client = new zerorpc.Client();
// client.connect(port);
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//file upload
app.post('/api/upload', multipartMiddleware, (req, res) => {
    console.log(req.files);
    res.json({
        'message': 'File uploaded succesfully.'
    });
});

// coommunicate with python script
app.get('/name', callName);

function callName(req, res) {

    var spawn = require("child_process").spawn;

 
    var process = spawn('python', ["./hello.py"]);


    process.stdout.on('data', function (data) {
        res.send(data.toString());
    })
} 


//calls the method on the python object
// app.invoke("hello", "World", function (error, reply, streaming) {
//     if (error) {
//         console.log("ERROR: ", error);
//     }
//     console.log(reply);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
