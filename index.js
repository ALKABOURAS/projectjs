const express = require('express');
const app = express();
const {engine} = require('express-handlebars');

app.engine('handlebars', engine({defaultLayout: 'main', layoutsDir: 'views/layouts/'}));
app.set('view engine', 'handlebars');

//Routes
app.get('/', (req, res) => {
    res.render('index', {title: 'Home'});
} );

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

