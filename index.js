// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
var QRCode = require('qrcode');

// Initialize express app
const app = express();

// Use body-parser middleware to handle JSON payloads
app.use(bodyParser.json());

// Define a simple GET endpoint
app.get('/qr', (req, res) => {
    if(req.query.string) {
        let width = 250;
        let margin = 0;
        if(req.query.width && Number.isInteger(parseInt(req.query.width))) width = req.query.width;
        if(req.query.margin && Number.isInteger(parseInt(req.query.margin))) margin = req.query.margin;
        var string = req.query.string;
        const options = { errorCorrectionLevel: 'H',
                        type: 'image/png',
                        quality: 0.3,
                        width: width,
                        margin: margin};
        QRCode.toDataURL(string, options, function (err, base64Str) {
            var imgUri = base64Str.split(';base64,').pop()
            var img = Buffer.from(imgUri, 'base64');
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
              });
              res.end(img);
        });
    } else {
        res.json({ message: 'No string provided!' });
    }
},function(err){
    res.err(err);
    console.log(err);
});

// Define a simple POST endpoint
app.post('/', (req, res) => {
    // Log the request body
    console.log(req.body);

    // Respond with a success message
    res.json({ message: 'Data received!' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});