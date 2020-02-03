const express = require('express');
const app = express();


// Middlewares
app.use(express.json());

app.set('port', process.env.PORT || 3000);


// Routes
app.use(require('./routes/routes'));



app.listen(app.get('port'), () => {
    console.log('Servidor escuchando en el puerto: ', app.get('port'));
});