const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './uploads'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//file upload
app.post('/api/upload', multipartMiddleware, (req, res) => {
    console.log(req);
    res.json({
        'message': 'File uploaded succesfully.'
    });
});

//coommunicate with python script
app.get('/name', callName);

function callName(req, res) {

    var spawn = require("child_process").spawn;

 
    var process = spawn('python', ["./hello.py"]);


    process.stdout.on('data', function (data) {
        res.send(data.toString());
    })
} 


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
