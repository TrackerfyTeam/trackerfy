const express = require('express');
const app = express();
const routes = require('./routes');


app.use(express.urlencoded({ extended: true}));

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use(routes);

app.listen(3000, () => {
    console.log('aplication running!');
});