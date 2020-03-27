const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');


// Middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());

app.set('port', process.env.PORT || 3000);


// Routes
app.use(require('./routes/routes'));



https.createServer({
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
    passphrase: 'asbacco'
}, app).listen(3443);


// app.listen(app.get('port'), () => {
//     console.log('Servidor escuchando en el puerto: ', app.get('port'));
// });