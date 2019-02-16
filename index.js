const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index', { isLogged: true, name: 'Diego' });
});

app.post('/login', (req, res) => {
  res.send(`Bem vindo ${req.body.username}`);
});

app.get('/', (req, res) => {
  res.send(`Bem vindo, '${req.query.name}'`);
});

app.get('/nomeJson/:name', (req, res) =>
  res.json({
    message: `Bem vindo, ${req.params.name} `,
  }));

app.get('/nome/:name', (req, res) => {
  res.send(`Bem vindo, '${req.params.name}'`);
});

app.listen(3000);
