const express = require('express');
const bodyParser = require("body-parser");
const qr = require('qr-image');
const ejs = require('ejs')
const fs = require('fs');

const app = express();

// Set view engine
app.set('view engine', 'ejs')

// Set static folder
app.use(express.static('./public'))

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/', (req, res, next) => {
    res.render('index')
})

app.get('/login', (req, res, next) => {
    res.render('login')
})
app.post('/qrcode', (req, res, next) => {
    // Get the text to generate QR code
    let qr_txt = req.body.qr_text;
    
    // Generate QR Code from text
    var qr_png = qr.imageSync(qr_txt,{ type: 'png'})

    // Generate a random file name 
    let qr_code_file_name = new Date().getTime() + '.png';

    fs.writeFileSync('./public/qr/' + qr_code_file_name, qr_png, (err) => {
        if(err){
            console.log(err);
        }
        
    })

    // Send the link of generated QR code
    res.send({
        'qr_img': "qr/" + qr_code_file_name
    });

});

var mysql = require('mysql'),
    fileUpload = require('express-fileupload'),
    routes = require('./routes'),
    path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'test2'
});
 
connection.connect();
 
global.db = connection;
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
 
// development only
 
app.get('/', routes.index);//call for main index page
app.post('/', routes.index);//call for signup post 
app.get('/login/:id',routes.profile);//to render users profile

app.listen('3000', () => console.log('Server started at port 3000'))