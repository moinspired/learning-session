//require my npm models
let express = require('express');
let bodyParser = require('body-parser');
let session = require('express-session');
let port = 8000;

let app = express()
//set up the middleware
app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");


//static contetn
app.use(express.static(__dirname + '/static'))

//POST request helper
app.use(bodyParser.urlencoded({ extended: true}));

//session
app.use(session({
  secret: ' somethinglsglkasdljtlwerlajsdfalsdfadfadsadf',
  resave: false,
  saveUnitialized: true
}))


//routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/showUser', (req, res) => {
  if('count' in req.session){
    req.session.count++;
  }
  else {
    req.session.count = 1;
  }
  return res.render('showUser', { user: req.session.user, count: req.session.count })
})

app.post('/login', (req, res) => {
  //take the data form the form
  //form data is alsays avaiable at reg.bodyParser
  console.log(req.body)
  req.session.user = req.body.name
  return res.redirect('/showUser')
  //save it into sessions
})

//must be at the bottom of the document
app.listen(port, () => console.log(`listening on port ${port}...`));
