const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')
// const bodyParser = require('body-parser');

const app = express()

// com next executa o middleware sem travar a aplicação
const logMiddleware = (req, res, next) => {
  console.log(
    `HOST: ${req.headers.host} | URL: ${req.url} | URL: ${req.method}`
  )
  req.appName = 'Go Node'
  return next()
}

nunjucks.configure('views-njk', {
  autoescape: true,
  express: app,
  watch: true
})

// usando em apenas uma rota
// app.get('/', logMiddleware, (req, res) => {
// para todos as rotas
app.use(logMiddleware)

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'njk')
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'))

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }))

const users = ['Danyllo', 'Valente', 'Silva']

app.get('/', logMiddleware, (req, res) =>
  // res.render('index', { isLogged: true, name: 'Diego' });

  // NJK
  // res.render('list', { isLogged: true, name: 'Diego' });
  res.render('list', { users })
)

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/create', (req, res) => {
  // console.log(req.body);
  users.push(req.body.user)
  res.redirect('/')
})

app.post('/login', (req, res) => {
  res.send(`Bem vindo ao  ${req.appName}, ${req.body.username}`)
})

app.get('/', (req, res) => {
  res.send(`Bem vindo ao  ${req.appName}, '${req.query.name}'`)
})

app.get('/nomeJson/:name', (req, res) =>
  res.json({
    message: `Welcome, ${req.params.name} `
  })
)

app.get('/nome/:name', (req, res) => {
  res.send(`Bem vindo ao  ${req.appName}, '${req.params.name}'`)
})

app.listen(3000)
